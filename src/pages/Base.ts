import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { 
  LoadingController, NavController, NavParams, 
  AlertController, ToastController, ActionSheetController, ModalController, ViewController
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HTTP } from '@ionic-native/http';

import DIDService from '../service/DIDService';
import DittoService from '../service/DittoService';
import WalletService from '../service/WalletService';
import UserService from '../service/UserService';
import IpfsService from '../service/IpfsService';

import * as _ from 'lodash';

@Component({})
export default class Page {
  private _loading;
  private _loading_show: boolean = false;
  protected didService: DIDService;
  protected dittoService: DittoService;
  protected walletService: WalletService;
  protected ipfsService: IpfsService;

  protected userService: UserService;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParam: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public _http: HTTP,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public _sanitizer: DomSanitizer
  ){
    this.buildDIDService();
    this.buildDittoService();
    this.buildWalletService();
    this.userService = new UserService();
    this.ipfsService = new IpfsService();

    this._init();
  }

  _init(){

  }

  protected showLoading(str: string = 'fetch data...'): void{
    if(this._loading_show){
      return;
    }
    this._loading = this.loadingCtrl.create({
      content : str
    });
    this._loading.present();
    this._loading_show = true;
  }
  protected hideLoading(): void{
    if(!this._loading_show){
      return;
    }
    if(this._loading){
      this._loading.dismiss();
    }
    this._loading_show = false;
  }

  protected buildDIDService(): DIDService{
    if(!this.didService){
      this.didService = new DIDService();
    }
    return this.didService;
  }
  protected buildDittoService(): DittoService{
    if(!this.dittoService){
      this.dittoService = new DittoService();
    }
    return this.dittoService;
  }
  protected buildWalletService(): WalletService{
    if(!this.walletService){
      this.walletService = new WalletService();
    }

    return this.walletService;
  }

  async ionViewDidLoad(){
    if(this.userService.isLogin){
      await this.ionViewDidLoad_AfterLogin();
    }
    else{
      await this.ionViewDidLoad_BeforeLogin();
    }
  }
  ionViewWillEnter(){}
  ionViewDidEnter(){}
  ionViewWillLeave(){}
  ionViewDidLeave(){}
  ionViewWillUnload(){}
  ionViewCanEnter(){}
  ionViewCanLeave(){}

  async ionViewDidLoad_AfterLogin(){}
  async ionViewDidLoad_BeforeLogin(){}

  protected warning(msg){

    const alert = this.alertCtrl.create({
      title : 'Warning',
      subTitle : msg,
      buttons : ['Dismiss']
    });
    alert.present();
  }

  protected toast(msg){
    const toast = this.toastCtrl.create({
      message : msg,
      duration : 3000,
      position : 'bottom'
    });
    toast.present();
  }

  protected getLang(key){
    return _.get(this.translateService.get(key), 'value');
  }

  protected sanitize(url){
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
};