import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from 'path'
import * as url from "url";
// ts-node-dev 监听
const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public') //public绝对路径
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url:path, headers} = request
    if(method!=='GET'){
        response.statusCode=405
        response.end()
        return
    }
    const {pathname,search}=url.parse(path) // 查询参数
    let filename=pathname.slice(1)
    if(filename===''){
        filename='index.html'
    }
            fs.readFile(p.resolve(publicDir, filename), (error, data) => {
                if (error && error.errno===-4058) {
                    response.statusCode=404
                    response.end('404')
                }
                //     else if(error.errno===-4068) {
                //     response.statusCode = 403
                //     response.end('cant get content ')
                // }
                else if(error){
                    response.statusCode=500
                    response.end('server error')
                }else {
                    // 返回文件内容
                    response.setHeader('Cache-Control','public,max-age=31536000') // 设置缓存时间为一年
                    response.end(data)
                }
            })

    }
)
server.listen('8888')
