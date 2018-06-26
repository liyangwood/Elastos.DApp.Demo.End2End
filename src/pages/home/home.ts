import { Component, ViewChild } from '@angular/core';

import Base from '../Base';
import DittoPage from '../ditto_list';
import LoginPage from '../login';
import ProfilePage from '../profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export default class Page extends Base {
  private DittoPage;
  private ProfilePage;



  _init(){
    this.DittoPage = DittoPage;
    this.ProfilePage = ProfilePage;
  
  }
  
  async ionViewDidLoad_BeforeLogin(){
    this.navCtrl.push(LoginPage);
  }


}
