# ExpressJS-Typescript-Project-Template
MVC Patterned Typescript - ExpressJS Starter Projector
### Before Start
```bash
$ npm install
```
or 
```bash
$ yarn 
```
### Start
```bash
$ npm start
```
### Build

```bash
$ npm run build
```

## Example
Controller, Actions, Routing, Security Policy All in One 
You don't need to create routing or security policy one by one
```js
import * as express from 'express';
import ApiControllerBase, { ApiController, HttpAction } from '../../core/controller/ApiControllerBase';
import authenticatedMiddleware from '../../policy/authenticatedMiddleware';
import authorizationMiddleware from '../../policy/authorizationMiddleware';

/**
 * If you don't specify any path for this controller, it uses the controller name automatically for path
 * for this controller the path will be '/user'
 */
@ApiController({
    authenticatedMiddleware,
    authorizationMiddleware
    //path:'/user'
})
export default class UserController extends ApiControllerBase {

    //http://localhost:3001/user/userid
    @HttpAction({
        method: 'get',
        path: '/:id'})
    public get(request: express.Request, response: express.Response) {
        response.send('get user by id ');
    }


    //http://localhost:3001/user
    @HttpAction({
        method: 'get',
        path: '/',
        authenticated:true,
        roles:['super']
    })
    public list(request: express.Request, response: express.Response) {
        response.send('Users List');
    }


    //http://localhost:3001/user/userid/posts
    @HttpAction({
        method: 'get',
        path:'/:id/posts',
        authenticated:true,
        roles:['super','admin']
    })
    public userPosts(request: express.Request, response: express.Response) {

        response.send(`User posts for ${request.params.id}`);
    }

    /**
     * If you don't specify any path and action name is equals method, it automatically creates controller base path as a method
     * path will be '/user' for this action
     */
    @HttpAction({method: 'post'})
    public post(request: express.Request, response: express.Response) {
        console.log('Create user', this.path)
    }
}
```