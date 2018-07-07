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



  _init(){
    this.DittoPage = DittoPage;
    this.ProfilePage = ProfilePage;
    this.WalletInfoPage = WalletInfoPage;
    this.IpfsInfoPage = IpfsInfoPage;
  }
  
  async ionViewDidLoad_BeforeLogin(){
    this.navCtrl.push(LoginPage);
  }


}
