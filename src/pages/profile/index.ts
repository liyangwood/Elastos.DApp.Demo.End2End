import { Component } from '@angular/core';
import Base from '../Base';
import * as _ from 'lodash';

@Component({
  selector: 'page-profile',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  
  logout(){
    this.userService.logout();

    location.reload();
  }

}
