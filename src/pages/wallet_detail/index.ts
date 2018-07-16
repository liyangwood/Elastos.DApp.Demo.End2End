import { Component, ViewChild } from '@angular/core';
import Base from '../Base';

@Component({
  selector: 'page-wallet_detail',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private walletId;
  
  goBack(){
    this.navCtrl.pop();
  }
  async ionViewDidLoad_AfterLogin(){
    this.walletId = this.navParam.get('walletId');

    // await this.wallet_execute('getGenesisAddress', this.walletId);
    await this.wallet_execute('getBalance', this.walletId);
    await this.wallet_execute('getBalanceInfo', this.walletId);
  }

  

}