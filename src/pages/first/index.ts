import { Component } from '@angular/core';
import {Base} from '../Base';

import {HomePage} from '../home/home';

@Component({
  selector: 'page-first',
  templateUrl: 'main.html'
})
export class FirstPage extends Base {
  goTo(name){
    let select;
    if(name === 'ditto'){
      select = 0;
    }
    else if(name === 'ipfs'){
      select = 1;
    }
    else if(name === 'wallet'){
      select = 2;
    }

    this.navCtrl.push(HomePage, {select});
  }

  async test(){
    // let x:any = null;
    // const p:any = {};
    // const pwd = '12345678';
    // const data = {
    //   fullName:'jacky',
    //   identityNumber:'410426198811151012'
    // };
    // const did = await this.didService.getDidName();

    // x = await this.wallet_execute('didSign', did, JSON.stringify(data), pwd);
    // p.sign = x.value;
    // // rs = await this.wallet_execute('registerIdListener', did);

    // const msg = {
    //   data,
    //   Id: did,
    //   Path: 'xxxx',
    //   Proof : '',
    //   DataHash : this.didService.hash(JSON.stringify(data)),
    //   Sign : p.sign
    // };

    // x = await this.wallet_execute('didGenerateProgram', did, JSON.stringify(msg), '12345678');
    // p.json = x.value;

    // x = await this.wallet_execute('createIdTransaction', 'IdChain', '', msg, p.json, '', '');
    // p.transcation = x['json'].toString()
    // x = await this.wallet_execute('calculateTransactionFee', 'IdChain', p.transcation, 10000);
    // p.fee = x.fee;
    // x = await this.wallet_execute('sendRawTransaction', 'IdChain', p.transcation, p.fee, '12345678');

    // this.walletService.registerIdListener('IdChain', (d)=>{
    //   console.log(d);
    //   alert(JSON.stringify(d));
    // });
  }

  async ionViewDidLoad_AfterLogin(){
    // await this.wallet_execute('getAllMasterWallets');
    // await this.wallet_execute('getAllSubWallets');
  }

  async test1(){

    // await this.wallet_execute('getDIDList');
    // const did = await this.didService.getDidName();
    

    // await this.wallet_execute('getDIDList');
    // await this.wallet_execute('didGetAllKeys', did, 0, 100);
    // await this.wallet_execute('didGetHistoryValue', did, 'Id')
    // await this.wallet_execute('didGetHistoryValue', did, 'Path')
    // await this.wallet_execute('didGetHistoryValue', did, 'DataHash')
    // await this.wallet_execute('didGetHistoryValue', did, 'PayLoad')

 
  }
}
