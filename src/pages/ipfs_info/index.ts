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

  async addFolder(){
    const prompt = this.alertCtrl.create({
      title: 'Add Folder',
      message: "Enter a folder name",
      inputs: [
        {
          name: 'title',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (d)=>{}
        },
        {
          text: 'Add',
          handler: async (d)=>{
            const name = d.title;
            if(!name){
              this.warning('invalid name');
              return false;
            }
            this.showLoading();
            try{
              await this.ipfsService.addDir(this.path+'/'+name);
              await this.getListByPath(this.path);
            }catch(e){
              this.warning(e);
            }
            this.hideLoading();
          }
        }
      ]
    });
    prompt.present();
  }

  async showItemMenu(item){
    console.log(item);
    const actionSheet = this.actionSheetCtrl.create({
      title : 'Operation',
      buttons: [
        {
          text : 'rename',
          handler : ()=>{
            const prompt = this.alertCtrl.create({
              title: 'Rename',
              message: "Enter a new name",
              inputs: [
                {
                  name: 'title',
                  placeholder: 'new name'
                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: (d)=>{}
                },
                {
                  text: 'Confirm',
                  handler: async (d)=>{
                    const name = d.title;
                    if(!name){
                      this.warning('invalid name');
                      return false;
                    }
                    this.showLoading();
                    try{
                      await this.ipfsService.getAPI().files.mv(this.path+'/'+item.name, this.path+'/'+name);
                      await this.getListByPath(this.path);
                    }catch(e){
                      this.warning(e);
                    }
                    this.hideLoading();
                  }
                }
              ]
            });
            prompt.present();
          }
        },
        {
          text : 'delete',
          role : 'destructive',
          handler : ()=>{
            this.showLoading();
            this.ipfsService.removeByPath(this.path+'/'+item.name).then(async ()=>{
              await this.getListByPath(this.path);
              this.hideLoading();
            });

          }
        }
      ]
    });

    actionSheet.present();
  }

  
}
