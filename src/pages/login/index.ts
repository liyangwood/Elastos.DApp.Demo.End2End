import { Component } from '@angular/core';
import Base from '../Base';
import HomePage from '../home/home';
import * as _ from 'lodash';

@Component({
  selector: 'page-login',
  templateUrl: 'main.html'
})
export default class Page extends Base {



  actionDidLogin(){
    this.showLoading('login ...');
    _.delay(()=>{
      this.userService.login({
        name : 'jacky.li'
      });
      this.hideLoading();

      this.navCtrl.push(HomePage);
    }, 2000);

    
  }

}
