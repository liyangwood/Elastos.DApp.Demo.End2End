import { Component, ViewChild } from '@angular/core';

import Base from '../Base';
import { shiftInitState } from '@angular/core/src/view';
import C from '../../config';

const config = C.wallet;

@Component({
  selector: 'page-wallet_send',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private info;
  private target;
  private send_amount;

  private send_ready = false;
  private param:any = {};

  _init(){
    this.reset();
  }

  async ionViewDidLoad_AfterLogin(){
    const address = this.navParam.get('address');
    const balance = this.navParam.get('balance');
    this.info = {
      address,
      balance,
      walletId : this.navParam.get('walletId')
    };
  }

  async create(){
    
  }

  async prepearForSend(){
    let res:any = await this.wallet_execute('createTransaction', 
      this.info.walletId, 
      '', //this.info.address, 
      this.target.address,
      parseFloat(this.send_amount) * config.SELA,
      0,
      this.target.memo,
      ''
    );
    this.param.transaction = res.transactionId.toString();
    console.log(this.param.transaction)
    res = await this.wallet_execute('calculateTransactionFee',
      this.info.walletId, 
      this.param.transaction,
      10000
    );
    this.param.fee = res.fee;

    this.send_ready = true;
  }
  async confirmSend(){
    this.showLoading();
    let res:any = await this.wallet_execute('sendRawTransaction', this.info.walletId, this.param.transaction, this.param.fee, '12345678');
    console.log(res);
    this.param.txId = res["json"]["txHash"];
    res = await this.wallet_execute('registerWalletListener', this.info.walletId);
    console.log(res);
    if(res.confirms === 1){
      this.toast('success');
      this.reset();
    }

    this.hideLoading();
  }

  reset(){
    this.info = {};
    this.target = {
      address : 'ENL464Vd5bvbMjTWWtHybsd13RXn7XXnGf',
      memo : ''
    };
    this.send_amount = '';
    this.param = {};
    this.send_ready = false;
  }

  

}
