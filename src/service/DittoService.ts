import {Base} from './Base';
import * as _ from 'lodash';
import createClient from 'webdav-fs';

import C from '../config';

declare var Buffer;


const config = C.ditto;

let _instance = null;
export class DittoService extends Base {
    private client;

    static get(){
        if(!_instance){
            _instance = new DittoService();
        }

        return _instance;
    }

    _init(){
        this.client = createClient(encodeURI(config.url), config.username, config.password);
        console.log('init Ditto Service');

    }

    _promise(fn, args, endArgs=[]){
        return new Promise((resolve, reject)=>{
            this.client[fn](...args, (err, rs)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(rs);
                }
            }, ...endArgs);
        }).catch((e)=>{
            console.error(e);
            throw fn+' error : '+e.message;
        });
    }

    async fetchList(path: string): Promise<any[]>{
        const rs = await this._promise('readdir', [path], ['stat']);
        const list = _.map(rs, (item: any)=>{
            item.type = item.isFile() ? 'file' : 'dir';
            return item;
        });
        return _.sortBy(list, ['type']);
    }


    // create dir with path
    async createFoler(path: string): Promise<any>{
        const rs = await this._promise('mkdir', [path]);
        return rs;
    }

    // rename a folder or file
    async rename(path: string, newPath: string): Promise<any>{
        const rs = await this._promise('rename', [path, newPath]);
        return rs;
    }

    async writeFileByBuffer(path: string, dataOrBuffer): Promise<any>{
        return await this._promise('writeFile', [path, dataOrBuffer]);
    }


    // fetch a file
    async fetchFile(path: string): Promise<any>{
        return this._promise('readFile', [path, 'utf8']);
    }

    // fetch a file, return stream
    async fetchFileByBuffer(path: string): Promise<any>{
        const data = await this._promise('readFile', [path, 'binary']);
        return Buffer.from(data);
    }

    // delete a folder or file
    async delete(path: string): Promise<any>{
        return await this._promise('unlink', [path]);
    }
}