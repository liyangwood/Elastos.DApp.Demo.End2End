import { Component, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import Base from '../Base';
import WalletDetailPage from '../wallet_detail';
import WalletSendPage from '../wallet_send';

@Component({
  selector: 'page-wallet_info',
  templateUrl: 'main.html'
})
export default class Page extends Base {
  private master_wallet_id = '';
  private wallet_list : any[] = [];
  private wallet_map : any = {};

  private memo: string[] = [];
  private execute;

  private isCreate = false;
  private create_master_param = {
    phrase_password : '',
    pay_password : ''
  };

  _init(){
    this.execute = this.wallet_execute;
  }

  showAddPrompt(){
    const alert = this.alertCtrl.create({
      title : 'Add Address',
      inputs : [
        {
          name : 'address',
          placeholder : 'Input new ela address'
        }
      ],
      buttons : [


        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Save',
          handler : (data)=>{
            this.addNewAddress(data.address).then(()=>{});
          }
        }
      ]
    });
    alert.present();
  }

  async addNewAddress(address){
    
  }

  async importWithMemo(){
    // 努 镜 兼 焦 改 狠 神 鬼 巡 微 星 率
    // const mem = this.normalizeMnemonic(this.memo);
    // this.walletService.importWalletWithMnemonic('100', this.memo, 'password1', 'password2', 'english', (data)=>{
    //   console.log(999999)
    //   console.log(JSON.stringify(data));
    //   console.log(999999)
    // })
  }

  async ionViewDidLoad_AfterLogin(){
    await this.init();
  }

  async init(){
    this.showLoading();
    const rs: any = await this.wallet_execute('getAllMasterWallets');
    this.master_wallet_id = rs.walletid;
    if(!this.master_wallet_id){
      this.hideLoading();
      return;
    }

    const sub = await this.wallet_execute('getAllSubWallets');
    this.wallet_list = _.values(sub);
    this.wallet_map = sub;
    this.hideLoading();
  }

  // syncWallet(){
  //   this.wallet_list = this.userService.current.wallet;
  // }

  goDetailPage(item){
    this.navCtrl.push(WalletDetailPage, {
      walletId : item
    });
  }

  private normalizeMnemonic(words: string): string {
    if (!words || !words.indexOf) return words;
    let isJA = words.indexOf('\u3000') > -1;
    let wordList = words.split(/[\u3000\s]+/);

    return wordList.join(isJA ? '\u3000' : ' ');
  }  

  async createSubWallet(){
    const alert = this.alertCtrl.create({
      title : 'Create sub wallet',
      inputs : [
        {
          name : 'name',
          placeholder : 'Name'
        },
        {
          name : 'pay_password',
          placeholder : 'Pay Password'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Confirm',
          handler : (data)=>{
            this.showLoading();
            this.execute('createSubWallet', data.name, data.pay_password, true, 500).then(async (d)=>{
              if(d === data.name){
                this.toast('success');
                const sub = await this.wallet_execute('getAllSubWallets');
                this.wallet_list = _.values(sub);
                this.wallet_map = sub;
              }
              else{
                this.warning(JSON.stringify(d));
              }
              this.hideLoading();
            });
          }
        }
      ]
    });
    alert.present();
    
  }

  async importMasterWalletWithKeystore(){
    const s = {"iv":"ugAfgukvXFaYmDYsHBiIew==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"ys6oTOoJer0=","ct":"oGM4GiUVD3hqeeu2yCUrCn2NArs2v+KkO9Ax9eMgiEmRccSl5kDd2SDzx5cZB7on5vLtKtCdzTkfLmkMa0KRugaAsFSM8dB97ewvQ52ETqYLwvrdH1zjmJQfQJqDUvWBE4YH2iLk3DhpW3N1//d5PTU7+Qp+UbTBWoyAQ0bx4+/Hs9ZT5VpB/S58PisxdTrXhiRSC+5HtPdQlajgGyTrtAIks9ixYTSxXdf8AncWARCqfVXz+Y+dVyh91qo/kNbfX8kIoOnUyNOm7HwjoGVFZ2VBNT5XUiwulLPzCOJTnevvP7osdax/BLiSSy/VJxpNHEGnpoy0Fxj5Us/+lFZWPl+dvmimAoQb8YTMbgb0z96421/5Dv9zvEGrbTKqAGv982aL5xNBx6yBBDYrzMNH6hZWBMEoSEWpBJd7XkKNTg46ImGWzHb3eOGVTTw5H3vFV7oYiegQL1vsInxV32BASf8kb2UjbKm6BlRkm0LOwZF36LGq8cvaMrVoLF/Vk+49l59kiA+NKwCoLNUDz7vctg7o396M2mseTmYjto4hhA5gHW0JsC7Xx5/2jPJ4IZeAKhorPc2TE4L5H2qzVw3YRVSz5n58ABOMpi52SLecenN+JOXVYnPSAgZpLIyycwrnTK8SgAw5bnygTgiQ9HQc8WoSbS83DA3BU935SvopyzheewqqE+YLkhtF072H0S6p+jk9q+WVqvQwFqqbLoulnApfjERaq25zwh3tw+4z/sEXUmEy0pltGIKsZjFWXLLBBAeIgpkUisNfjp/k32fkYXBqQuxaKYY+DQ1wgOKY3/k+gLUj3vlV6f5qjdFKRI2EoY0JmdPyEbZNSKMocFyVGCef22HnEmEMajAUUU0zwIaWPFREMUz0nWITG0X8FjM39l7SxiCAuAalJMnT4AYGIO2I9tnnr59v5JfvTjuD6LeeP847VF15G8cFMYvyfOGlN99QJsgA7nmf8w/bK6WnxePqen+bOj8agurwKQL95zlsvVHOD+w4veCyndo3BzS2di+scyLGvGB758qPsyPLK6JOTMdNRYvXxxvm34MbR8asFyLoUBvPeIvKkXlPBaFfaVeXU4V5bhYfEblJsgX5UknDMsRbMi4WW1iZnCWNC8i1wbcmOZYdmlstKkzxMTAVU4FfEgk7IY3iEffbBa92Zj9xNUTb6ebLh+dbgzEHvTbrkRwBsgKkvCQDywIjupn9oFQkbIS9pLeIHsCH1qTQ388avipKhPtikxb3SY/myPStLZGMdxoNQ7v4bJ4wvsWWQP/+BkFEBiVJCjshEOX6YFVL176jc0+eTk9Jtrr96IaPjxi5G7/k8PAIM4f2kZBL6rkpUKksJydKUhGHier7wOEJ0jOL2ayNMasc+p8Fct0goLYhG8MRSfC9Qe51Z3HhNt2CcNjgsUtJm0/Pq78kqydoHbT/ihAA34Tb2I+B4rYxtINzsu4ceVPWszo/PfmXVs+KRlZxy5czjm6z/D36KPwmB92N3IfNfGF2Gu8mTQWl+NvhakSGB4JE7URAUOfWrbG2lEVT2zZZYdajYw76rl+5H6UUjWx8L3JCe8hBYBivmiHQRQaisunXkytyOyTgUSh8rsmrgOdolR5m3Y+A/l1A2r6hzRW/2QXx9G8wVke0TX+8AFR6SQHVW8vHcm6efVEZdvTeWGfPz1kQqCxpjx0GQdrK/MpY3PpLD9USZL2svmaLNsj1ulZ6G8RiA7oyLGlDo5tyFtz909m5KZ75ed4FW42koO5ZKPG2cYW+I5X7WNfUevF55SSxdtcI2zvXLA=="};
    // const rs = await this.execute('importWalletWithKeystore', '1', JSON.stringify(s), '111qqq,,,', 'zhangying', '');
    await this.execute('getAllMasterWallets');
    
    // return rs;
  }

  async createNewMasterWallet(){
    this.showLoading();
    this.isCreate = true;
    let rs = await this.execute('generateMnemonic', 'english');
    this.memo = rs.mnemonic.toString().split(/[\u3000\s]+/);

    this.hideLoading();
    
  }
  async clickCreateWallet(){
    if(!this.create_master_param.phrase_password){
      this.warning('invalide phrase password');
      return false;
    }
    if(!this.create_master_param.pay_password){
      this.warning('invalide pay password');
      return false;
    }

    this.showLoading();
    const rs = await this.execute('createMasterWallet', 'Ela Wallet', this.memo.join(' '), this.create_master_param.phrase_password, this.create_master_param.pay_password, 'english');
    if(rs === 'OK'){
      this.toast('success');
      this.isCreate = false;
      await this.init();
    }
    else{
      this.warning(JSON.stringify(rs));
      this.hideLoading();
    }
  }

  async removeMasterWallet(){
    this.showLoading();
    const rs = await this.execute('destroyWallet', 'Ela Wallet');
    if(rs === 'OK'){
      this.toast('success');
      this.wallet_list = [];
      this.wallet_map = {};
      this.master_wallet_id = '';
    }
    else{
      this.warning(JSON.stringify(rs));
    }
    this.hideLoading();
  }

}
