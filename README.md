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
```