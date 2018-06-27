import { Component } from '@angular/core';

import { LoadingController, NavController, NavParams } from 'ionic-angular';

import DIDService from '../service/DIDService';
import DittoService from '../service/DittoService';
import WalletService from '../service/WalletService';
import UserService from '../service/UserService';

@Component({})
export default class Page {
  private _loading;
  protected didService: DIDService;
  protected dittoService: DittoService;
  protected walletService: WalletService;

  protected userService: UserService;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParam: NavParams
  ){
    this.buildDIDService();
    this.buildDittoService();
    this.buildWalletService();
    this.userService = new UserService();

    this._init();
  }

  _init(){

  }

  protected showLoading(str: string = 'fetch data...'): void{
    this._loading = this.loadingCtrl.create({
      content : str
    });
    this._loading.present();
  }
  protected hideLoading(): void{
    if(this._loading){
      this._loading.dismiss();
    }
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
};