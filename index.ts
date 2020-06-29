import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();
server.on('request', (request:IncomingMessage, response:ServerResponse) => {
    console.log(request.method)
    console.log(request.url)
    console.log(request.headers)
    response.end('ended')
})
server.listen('8888')
