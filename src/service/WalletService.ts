import Base from './Base';
import UserService from './UserService';
import * as _ from 'lodash';

export default class extends Base {
  
  async importNewAddress(address){
    const us = new UserService();
    const info = {
      address,
      blance : _.random(100, 500)
    }

    us.setWalletAddress(info);
    return info;
  }

  getAddress(){
    
  }

  // get account info
  getInfo(){
    // TODO

    return {
      address : 'abcde',
      balance : 200.02
    };
  }

  // change metadata
  changeMeta(meta: any): any{
    // TODO

    return true;
  }

  async send(targetAddress: string, amount: number, memo: string): Promise<any>{
    // TODO

    return true;
  }
}