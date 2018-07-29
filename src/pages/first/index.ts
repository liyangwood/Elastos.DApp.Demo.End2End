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
    const pwd = '12345678';
    const data = {
      name : 'jacky'
      // DataHash : 'slkfjdlsjflsjfdsldf',
      // Sign : 'lsjdflsjfldsfjlsfsfds',
      // Proof : 'lsdjflksjf'
    };
    await this.wallet_execute('getAllSubWallets');
    x = await this.wallet_execute('createDID', '12345678');
    const did = x.didname;

    x = await this.wallet_execute('didSign', did, JSON.stringify(data), pwd);
    p.sign = x.value;
    // rs = await this.wallet_execute('registerIdListener', did);

    const msg = {
      // data,
      Id: did,
      Path: '',
      Proof : '',
      DataHash : this.didService.hash(JSON.stringify(data)),
      Sign : p.sign
    };

    x = await this.wallet_execute('didGenerateProgram', did, JSON.stringify(msg), '12345678');
    p.json = x.value;

    x = await this.wallet_execute('createIdTransaction', 'IdChain', '', msg, p.json, '', '');
    p.transcation = x['json'].toString()
    x = await this.wallet_execute('calculateTransactionFee', 'IdChain', p.transcation, 10000);

  }


  async test1(){
    const chain = 'IdChain';

    //this.showLoading();
    const p:any = {};
    const msg = {
      name : 'jacky',
      DataHash : 'slkfjdlsjflsjfdsldf',
      Sign : 'lsjdflsjfldsfjlsfsfds',
      Proof : 'lsdjflksjf'
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
