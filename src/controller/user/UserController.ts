import * as express from 'express';
import ApiControllerBase, { ApiController, HttpAction } from '../../core/controller/ApiControllerBase';
import authenticatedMiddleware from '../../policy/authenticatedMiddleware';
import authorizationMiddleware from '../../policy/authorizationMiddleware';

@ApiController({
    authenticatedMiddleware,
    authorizationMiddleware
})
export default class UserController extends ApiControllerBase {
    @HttpAction({
        method: 'get',
        path: '/:id'})
    public get(request: express.Request, response: express.Response) {
        response.send('get user by id ');
    }

    @HttpAction({
        method: 'get',
        path: '/',
        authenticated:true,
        roles:['super']
    })
    public list(request: express.Request, response: express.Response) {
        response.send('Users List');
    }

    @HttpAction({
        method: 'get',
        path:'/:id/posts',
        authenticated:true,
        roles:['super','admin']
    })
    public userPosts(request: express.Request, response: express.Response) {
        //http://localhost:3001/user/TestUserName/posts
        response.send(`User posts for ${request.params.id}`);
    }

    @HttpAction({method: 'post'})
    public post(request: express.Request, response: express.Response) {
        console.log('Create user', this.path)
    }
}