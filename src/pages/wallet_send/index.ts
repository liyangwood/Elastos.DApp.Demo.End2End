import { Component, ViewChild } from '@angular/core';

import Base from '../Base';
import { shiftInitState } from '@angular/core/src/view';


@Component({
  selector: 'page-wallet_send',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private info;
  private target;
  private send_amount;

  _init(){
    this.info = {};
    this.target = {
      address : '',
      memo : ''
    };
    this.send_amount = '';
  }

  async ionViewDidLoad_AfterLogin(){
    const address = this.navParam.data.address;
    this.info = this.userService.getWalletByAddress(address);
  }

  async send(){
    try{
      const res = await this.walletService.send({
        address : this.info.address,
        amount : this.info.blance
      }, {
        address : this.target.address,
        memo : this.target.memo
      }, this.send_amount);
      this.toast('send success');

      this.info.blance = res.amount;
      this.reset();
    }catch(e){
      this.warning(e);
    }
  
  }

  reset(){
    this.target.address = '';
    this.target.memo = '';
    this.send_amount = '';
  }

  

}
