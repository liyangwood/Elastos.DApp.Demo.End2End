import {Base} from './Base';
import * as _ from 'lodash';
import {randomBytes, createHash} from 'crypto-browserify';
import {WalletService} from './WalletService';
import C from '../config';

declare var cordova: any;

const config = C.did;
let _instance = null;
export class DIDService extends Base {
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
    private key_map: any = {};

    setIsNative(flag=false){
        this.isNative = flag;
        this.ws = WalletService.get(flag);
    
        console.log('init DID Service');
    }

    getRootKey(){
        return config.key;
    }

    async getDidName(){
        const key = await this.getPubKey();
        if(this.key_map[key]){
            this.didname = this.key_map[key];
        }
        else{
            const rs:any = await this.execute('createDID', this.getRootKey());
            this.didname = rs.didname;   
            this.key_map[key] = rs.didname;
        }

        return this.didname;
    }

    async getPubKey(){
        const rs: any = await this.execute('getPublicKey');
        return rs.publickey;
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
        // let rs:any = await this.execute('createDID', '12345678');
        
        // await this.execute('createDID', '222222222');
        // await this.execute('createDID', '12345678');
        // await this.execute('createDID', '222222222');
        // await this.execute('getDIDList');
        // const did = rs.didname;
        // // await this.execute('didGetValue', did, 'root');
        let n = 100;
        const obj = ()=>{
            const x = {}
            x[did.length] = {
              date : n++
            };
            return x;
        };
        
        const did = 'aaabbbcccdddeeefffggghhhiiijjj';
        // await this.execute('didSetValue', did, 'root', JSON.stringify(obj()));
        await this.execute('didGetValue', did, 'root');
        await this.execute('didSetValue', did, 'root', JSON.stringify(obj()));
        // await this.execute('didGetValue', did, 'root');
        // await this.execute('didGetAllKeys', did, 0, 100);
        await this.execute('didGetHistoryValue', did, 'root');
    }

    async saveData(key, data){
        const did = await this.getDidName();

        await this.execute('didSetValue', did, key, JSON.stringify({
            '100' : data
        }));
        await this.execute('didGetValue', did, key);

        return true;
    }

    async getData(key){
        if(!this.isNative){
            return null;
        }
        const did = await this.getDidName();
      
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

    async startSyncNode(){
        // just run once for install
        // const x = localStorage.getItem('SYNC-NODE');
        // alert(x);
        // if(x){
        //     await this.getDidName();
        //     return false;
        // }

        try{
        //     localStorage.setItem('SYNC-NODE', 'Y');
        //     const ss = localStorage.getItem('SYNC-NODE');
        // alert(ss);
            // const rs: any = await this.execute('generateMnemonic', 'english');
            // const memo = rs.mnemonic.toString();
            // await this.execute('createMasterWallet', 'TEST', memo, 'aaaaaaaa', 'aaaaaaaa', 'english');
            // await this.execute('destroyWallet', 'TEST');
            
            const mem = 'couple advice soldier cherry thunder huge wisdom fun wrist hill girl right';
            
            await this.execute('importWalletWithMnemonic', 'Wallet-Mnemonic', mem, '12345678', '12345678', 'english'),

            await this.getDidName();
        }catch(e){
            console.error(e);
        }
        
    }



    hash(msg){
        return createHash('sha256').update(msg).digest('hex');
    }
    
}