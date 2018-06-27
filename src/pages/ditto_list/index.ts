import { Component } from '@angular/core';
import Base from '../Base';
import DittoDetailPage from '../ditto_detail';

@Component({
  selector: 'page-ditto_list',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private list: any[];
  private showUpBtn = false;
  private path: string;

  async ionViewDidLoad_AfterLogin(){

    await this.goToDir('root');
  }

  async goToDir(path){
    this.showLoading();
    const list = await this.dittoService.fetchList(path);
    console.log(list);
    this.list = list;
    this.hideLoading();
    
    this.path = path;
    this.showUpBtn = path.indexOf('/') !== -1;
  }
  async goUp(){
    if(this.path){
      const path = this.path.split('/').slice(0, -1).join('/');

      await this.goToDir(path);
    }
  }

  async clickItem(item){
    if(item.type === 'dir'){
      await this.goToDir(item.path);
    }
    else{
      await this.goToFile(item);
    }
  }

  async goToFile(item){
    this.navCtrl.push(DittoDetailPage, item);
  }

}
