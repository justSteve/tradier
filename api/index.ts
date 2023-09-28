import * as http from "http";
import AppClass from "./app";
import { Logger } from "./logger/logger";


const port = 3080;
const appInstance = new AppClass();
console.log (typeof appInstance.express);
console.log('Type:', typeof appInstance.express);
console.log('Value:', appInstance.express);
appInstance.express.set("port", port);
const server = http.createServer(appInstance.express);
server.listen(port);

const logger = new Logger();

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
 });

module.exports = appInstance.express;