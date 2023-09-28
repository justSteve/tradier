"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
//import express, { Application } from "express";
const logger_1 = require("./logger/logger");
const routes_1 = __importDefault(require("./routes/routes"));
const path = require('path');
// Export the class instead of an instance
class App {
    constructor() {
        console.log("App constructor is being called.");
        this.express = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.users = [];
        this.logger = new logger_1.Logger();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express_1.default.static(process.cwd() + "/my-app/dist/"));
    }
    routes() {
        this.express.get("/", (req, res, next) => {
            res.sendFile(process.cwd() + "/app-ui/dist/index.html");
        });
        // user route
        this.express.use("/api", routes_1.default);
        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!");
        });
    }
}
exports.default = App;
//export default new App().express;
//# sourceMappingURL=app.js.map