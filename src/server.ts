import Main from "./App";
import UserController from './controller/user/UserController';

const PORT  = process.env.PORT || 3000;


const app = new Main([
    new UserController()

], Number(PORT));

Main.app.listen(PORT, () => {
    console.log('Listenning port : ', PORT);
});

/*
"watch-node": "cross-env NODE_ENV=development PORT=3001 DEBUG=express:* nodemon --inspect ./dist/server.js",
*/