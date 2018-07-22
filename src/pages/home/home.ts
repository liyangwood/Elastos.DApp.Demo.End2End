import { Component, ViewChild } from '@angular/core';

import Base from '../Base';
import DittoPage from '../ditto_list';
import LoginPage from '../login';
import ProfilePage from '../profile';
import WalletInfoPage from '../wallet_info';
import IpfsInfoPage from '../ipfs_info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export default class Page extends Base {
  private DittoPage;
  private ProfilePage;
  private WalletInfoPage;
  private IpfsInfoPage;

  private select;

  _init(){
    this.DittoPage = DittoPage;
    this.ProfilePage = ProfilePage;
    this.WalletInfoPage = WalletInfoPage;
    this.IpfsInfoPage = IpfsInfoPage;

    this.select = this.navParam.get('select') || 0;
  }
  
  async ionViewDidLoad_BeforeLogin(){
    this.navCtrl.push(LoginPage);
  }


}
