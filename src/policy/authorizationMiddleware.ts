/**
 * Created by Ozgur Cimen on 15-May-19.
 */
import * as express from 'express';
import createError from 'http-errors';

export default function authorizationMiddleware({user}: any, response: express.Response, next: any) {
    if (user && this.some((x: any) => user.roles.includes(x))) {
        return next();
    }
    return next(new createError.Forbidden('User is not authorized to use this api'));
}