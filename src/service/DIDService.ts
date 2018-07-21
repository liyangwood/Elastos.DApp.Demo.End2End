import Base from './Base';
import * as _ from 'lodash';
import WalletService from './WalletService';
import C from '../config';

declare var cordova: any;

const config = C.did;
let _instance = null;
export default class DIDService extends Base {
    static get(isCordova){
        if(!_instance){
            _instance = new DIDService();
            _instance.setIsNative(isCordova);
        }
    
        return _instance;
    }

    private ws = null;
    private isNative = false;

    private didname: string;

    setIsNative(flag=false){
        this.isNative = flag;
        this.ws = WalletService.get(flag);
    
        console.log('init DID Service');
    }

    getRootKey(){
        return config.key;
    }

    async getDidName(){
        if(!this.didname){
            const rs:any = await this.execute('createDID', this.getRootKey());
            this.didname = rs.didname;
        }

        return this.didname;
    }
    
    // login with DID
    requestLogin(uuid: string): any{
        // TODO 
        
        return {
            profile : {
                name : 'jacky.li'
            }
        };
    }

    // verify the DID
    requestVerify(uuid: string): any{
        // TODO

        return {
            role : 'user',
            permisson : 'all'
        };
    }

    public async execute(fnName, ...args): Promise<any>{
        return new Promise((resolve, reject)=>{
            this.ws[fnName](...args, (data: any)=>{
                console.log('WalletService => '+fnName + ' ----- start');
                const arg = _.map([args], (x)=>{
                    return x.toString();
                })
                console.log('args => ' + arg.join(' | '));
                console.log(JSON.stringify(data));
                console.log('WalletService => '+fnName + ' ----- end');
                if(data.ERRORCODE){
                    reject(data.ERRORCODE);
                }
                else{
                    resolve(data);
                }
                
            });
        });
    }

    async test(){
        let rs:any = await this.execute('createDID', '');
        await this.execute('getDIDList');

        const did = rs.didname;
    
        const obj = {};
        let n = 100;
        obj[did.length] = {
          date : n++
        };
     
        await this.execute('didSetValue', did, 'root', JSON.stringify(obj));
        await this.execute('didGetValue', did, 'root');
        await this.execute('didSetValue', did, 'root', JSON.stringify(obj));
        await this.execute('didGetValue', did, 'root');
        await this.execute('didGetHistoryValue', did, 'root');
    }

    async saveData(key, data){
        const did = await this.getDidName();
        alert(did);
        await this.execute('didSetValue', did, key, JSON.stringify({
            '100' : data
        }));
        await this.execute('didGetValue', did, key);

        return true;
    }

    async getData(key){
        const did = await this.getDidName();
        alert(did);
        const rs: any = await this.execute('didGetValue', did, key);
        if(!rs.value){
            return null;
        }
        const d = JSON.parse(rs.value)['100'];
        if(!d){
            return null;
        }
        return d;
    }



    
    
}