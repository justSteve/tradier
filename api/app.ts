import * as bodyParser from "body-parser";
import express, { Application } from "express";
//import express, { Application } from "express";
import { Logger } from "./logger/logger";
import Routes from "./routes/routes";
const path = require('path');

// Export the class instead of an instance
export default class App {
    public express: Application;
    public logger: Logger;

    // array to hold users
    public users: any[];

    constructor() {
        console.log("App constructor is being called.");
        this.express = express();
        this.middleware();
        this.routes();
        this.users = [];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(process.cwd() + "/my-app/dist/"));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.sendFile(process.cwd() + "/app-ui/dist/index.html");
        });

        // user route
        this.express.use("/api", Routes);

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!");
        });
    }
}

//export default new App().express;