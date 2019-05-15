import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import path from 'path';
import ApiControllerBase from './core/controller/ApiControllerBase';
import createError from 'http-errors';
import config, {isProduction} from './config';

class Main {
    public static app: express.Application;
    public port: number;

    constructor(controllers: ApiControllerBase[], port: number) {
        Main.app = express();
        this.port = port;
        this.config(Main.app);
        this.initConnections();
        this.initializeMiddlewares(Main.app);
        this.initializeControllers(controllers);
        this.initializeErrorhanlder(Main.app);
    }

    private initConnections():void{
        // Database Initiliezed
    }

    private initializeMiddlewares(app:express.Application):void {
        app.use(express.json());
    }

    private initializeErrorhanlder(app:express.Application):void{
        app.use(function(req, res, next) {
            next(createError(404));
        });

        if(isProduction){
            // @ts-ignore
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.send(err.message)
            });
        }
    }

    private initializeControllers(controllers:any[]):void {
        controllers.forEach((controller) => {
            Main.app.use('/', controller.router);
        });
    }

    private config(app:express.Application): void {
        app.use(cors());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.urlencoded({extended: false}));
    }
}

export default Main;