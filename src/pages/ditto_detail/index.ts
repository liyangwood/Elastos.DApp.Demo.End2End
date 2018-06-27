import { Component } from '@angular/core';
import Base from '../Base';

@Component({
  selector: 'page-ditto_detail',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private file: any;

  _init(){
    this.file = {};
  }

  async ionViewDidLoad_AfterLogin(){
    
    this.showLoading();
    this.file = this.navParam.data;
    const content = await this.dittoService.fetchFileContent(this.file);
    this.file.src = content;
    console.log(this.file);
    this.hideLoading();
  }

}
