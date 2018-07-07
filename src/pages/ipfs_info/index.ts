import { Component } from '@angular/core';
import Base from '../Base';
import FileViewPage from '../file_view';


@Component({
  selector: 'page-ipfs_info',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private list: any[];
  private api: any;
  private path;

  _init(){
    this.api = this.ipfsService.getAPI();
  }

  async getListByPath(path){
    this.path = path;
    this.showLoading();
    const list = await this.ipfsService.fetchListByPath(path);
    this.list = list;
    this.hideLoading();
  }
  
  async ionViewDidLoad_AfterLogin(){

    await this.getListByPath('/');

    const api = this.ipfsService.getAPI();

    // api.files.mkdir('/abc', (err, rs)=>{
    //   console.log(5, err, rs);
    // })
  }

  async clickItem(item){
    if(item.type !== 'file'){
      await this.getListByPath(this.path+'/'+item.name);
    }
    else{
      // const rs = await this.ipfsService.getFileBuffer(item.hash);
      // console.log(rs.toString('utf8'));
      const modal = this.modalCtrl.create(FileViewPage, {
        item,
      });
      modal.present();
    }
  }
  async goUp(){
    if(this.path){
      const path = this.path.split('/').slice(0, -1).join('/');
      await this.getListByPath(path);
    }
    
  }

  selectFile(elem){
    elem.click();
  }

  async addFile(elem){
    console.log(elem.files);
    const file = elem.files[0];
    if(!file){
      this.warning('invalid file');
      return false;
    }

    const fs = new FileReader();
    fs.onload = async (e)=>{
      const buf = e.target.result;
      
      try{
        this.showLoading();
        await this.ipfsService.addFileToPath(this.path+'/'+file.name, buf);
        await this.getListByPath(this.path);
        elem.value = '';
        this.hideLoading();
      }catch(e){
        this.warning(e);
      }
      
    };
    fs.readAsArrayBuffer(elem.files[0]);
  }

  
}
