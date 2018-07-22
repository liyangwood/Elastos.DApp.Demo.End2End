import { Component } from '@angular/core';
import Base from '../Base';

import HomePage from '../home/home';

@Component({
  selector: 'page-first',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  goTo(name){
    let select;
    if(name === 'ditto'){
      select = 0;
    }
    else if(name === 'ipfs'){
      select = 1;
    }
    else if(name === 'wallet'){
      select = 2;
    }

    this.navCtrl.push(HomePage, {select});
  }
}
