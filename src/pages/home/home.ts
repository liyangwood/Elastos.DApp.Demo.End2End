import { Component } from '@angular/core';

import Base from '../Base';
import DittoPage from '../ditto_list';
import LoginPage from '../login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export default class Page extends Base {
  private DittoPage;
  private LoginPage;
  _init(){
    this.DittoPage = DittoPage;
    // this.LoginPage = LoginPage;
  
  }
  
  async ionViewDidLoad_BeforeLogin(){
    this.navCtrl.push(LoginPage);
  }
}
