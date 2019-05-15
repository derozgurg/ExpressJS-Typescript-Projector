import * as express from 'express';
import createError from 'http-errors';

export default function authenticatedMiddleware(request: express.Request, response: express.Response, next: any) {
    /** it return not authenticated by default because I have not written any authentication for now. If I have time later, I will add token base authentication and authorization methods.
     * but you can add your authentication methods token base or cookie base.
     * There are many authentication library like passport.js
     */

    Object.defineProperty(request, 'user', {
        value: {
            name: 'Osman',
            id: '12123123213',
            roles: ['admin']
        }
    });

    //return next();
    return next(new createError.Unauthorized('You must login before using this api'));
}