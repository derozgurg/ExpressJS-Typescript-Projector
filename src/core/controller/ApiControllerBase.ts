import * as express from 'express';
import authenticatedMiddleware from '../../policy/authenticatedMiddleware';

export function HttpAction(config: IHttpAction) {
    return function (target: ApiControllerBase, propertyKey: string, descriptor: PropertyDescriptor) {
        const routes = Object.getOwnPropertyDescriptor(target, 'routes');
        let path = '';
        const {method, authenticated, roles} = config;

        if (!config.path && propertyKey === method) {
            path = ''
        } else {
            path = config.path || '/' + propertyKey;
        }

        const action = {name: propertyKey, path, method, authenticated, roles};


        if (routes) {
            routes.value.push(action);
        } else {
            Object.defineProperty(target, 'routes', {
                value: [action]
            });
        }
    }
}

export interface IApiControlelrCofig {
    path?: string
    authenticatedMiddleware?: any
    authorizationMiddleware?: any
}

export interface IObjectListener<T> {
    onObjectCreation(t: T): void;
}

export interface IApiControllerConfig {
    path?: string
}

export function ApiController(config?: IApiControlelrCofig) {
    return function <T extends { new(...args: any[]): any }>(constructorFunction: T) {
        const newConstructorFunction: any = function (...args: any[]) {
            const func: any = function () {
                const initilized = new constructorFunction(...args);
                const {name} = constructorFunction;
                const mainPath = '/' + name.substr(0, name.indexOf('Controller')).toLowerCase();
                initilized.path = (config && config.path || mainPath) || mainPath;
                initilized.routes.forEach((action: IHttpAction) => {
                    const path = `${initilized.path}${action.path}`;
                    const handler = initilized[action.name].bind(initilized);
                    const {roles} = action;
                    const routerMethod = initilized.router[action.method];
                    const params = [path];

                    if (config.authenticatedMiddleware && action.authenticated) {
                        params.push(config.authenticatedMiddleware);
                        if (config.authorizationMiddleware && action.roles) {
                            params.push(config.authorizationMiddleware.bind(roles));
                        }
                    }
                    params.push(handler);

                    routerMethod.call(initilized.router, ...params);
                });

                return initilized;
            };

            func.prototype = constructorFunction.prototype;
            return new func();
        };

        newConstructorFunction.prototype = constructorFunction.prototype;
        return newConstructorFunction;
    };
}

export interface IHttpAction {
    path?: string
    name?: string
    method?: string
    authenticated?: boolean
    roles?: string[]
}

export default abstract class ApiControllerBase {
    public static routes: IHttpAction[] = [];
    public path: string = '';
    public router = express.Router();
    public authorizations = {};
    // public routes: IHttpAction[] = [];
}