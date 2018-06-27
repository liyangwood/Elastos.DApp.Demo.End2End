import { Component, ViewChild } from '@angular/core';

import Base from '../Base';


@Component({
  selector: 'page-wallet_info',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private wallet_list : any[];


  async addNewAddress(){
    await this.walletService.importNewAddress('aaaa');
    this.syncWallet();
  }

  async ionViewDidLoad_AfterLogin(){
    this.syncWallet();
  }

  syncWallet(){
    this.wallet_list = this.userService.current.wallet;
  }

}
