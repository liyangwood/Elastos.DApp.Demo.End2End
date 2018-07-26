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
    let x:any = null;
    const p:any = {};
    const msg = {
      name : 'jacky'
    };
    x = await this.wallet_execute('createDID', '12345678');
    const did = x.didname;
    
    // rs = await this.wallet_execute('registerIdListener', did);

    x = await this.wallet_execute('didGenerateProgram', did, JSON.stringify(msg), '12345678');
    p.json = x.value;
  }


  async test1(){
    const chain = 'IdChain';

    //this.showLoading();
    const p:any = {};
    const msg = {
      name : 'jacky'
    };
    await this.wallet_execute('getSupportedChains');
    const did = await this.didService.getDidName();

    let x:any = null;
    
    x = await this.wallet_execute('createSubWallet', chain, '12345678', false, 0);
    x = await this.wallet_execute('createAddress', chain);
    p.fromAddress = x.address;

    x = await this.wallet_execute('didGenerateProgram', did, JSON.stringify(msg), '12345678');
    p.json = x.value;

    
    x = await this.wallet_execute('createIdTransaction', chain, '', msg, p.json, 'memo', 'remark');
    p.rawTransaction = x['json'].toString();

    x = await this.wallet_execute('calculateTransactionFee', chain, p.rawTransaction, 10000);
    p.fee = x.fee;

    await this.wallet_execute('didGetPublicKey', did);
  }
}
