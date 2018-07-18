import { Component, ViewChild } from '@angular/core';
import Base from '../Base';

import * as _ from 'lodash';

@Component({
  selector: 'page-wallet_detail',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private walletId;
  private address_list  = [];
  private balance = 0;
  
  goBack(){
    this.navCtrl.pop();
  }
  async ionViewDidLoad_AfterLogin(){
    this.showLoading();
    this.walletId = this.navParam.get('walletId');
    await this.setBalance();
    await this.setAddressList();

    // const x: any = await this.wallet_execute('createDID', 'zhangying');
    // const didname = x.didname;
    // // await this.wallet_execute('didGetPublicKey', didname);
    // await this.wallet_execute('getDIDList');
    // await this.wallet_execute('didGetAllKeys', didname, 0, 100);
    // await this.wallet_execute('didGetHistoryValue', didname, 'aaa');
    // await this.wallet_execute('didSetValue', didname, 'aaa', '111');
    // await this.wallet_execute('didSetValue', didname, 'aaa', '222');
    // await this.wallet_execute('didGetAllKeys', didname, 0, 100);
    // await this.wallet_execute('didGetValue', didname, 'aaa');
    // await this.wallet_execute('didGetHistoryValue', didname, 'aaa');
    
    // await this.wallet_execute('generateMultiSignTransaction', this.walletId, this.address_list[0].address, 'ESHevbU8mp7gWLvPhMiySVZQFGJJ4a7BKm', 1, 0.001, '12345678', 'test pay');

    this.hideLoading();
    
    // await this.wallet_execute('getBalance', this.walletId);
    // await this.wallet_execute('getBalanceInfo', this.walletId);
    // await this.wallet_execute('createAddress', this.walletId);
    // await this.wallet_execute('createAddress', this.walletId);
    // await this.wallet_execute('getAllAddress', this.walletId, 0);
  }

  async setBalance(){
    const rs: any = await this.wallet_execute('getBalance', this.walletId);
    await this.wallet_execute('getBalanceInfo', this.walletId);
    this.balance = rs.balance;
  }

  async setAddressList(){
    const rs: any = await this.wallet_execute('getAllAddress', this.walletId, 0);
    this.address_list = _.map(JSON.parse(rs).Addresses, (address)=>{
      return {
        address,
        balance : 0
      };
    });

    _.each(this.address_list, async (item, i)=>{
      const d: any = await this.wallet_execute('getBalanceWithAddress', this.walletId, item.address);
      _.set(this.address_list[i].balance, d.balance, 0);
    });
  }

  

}