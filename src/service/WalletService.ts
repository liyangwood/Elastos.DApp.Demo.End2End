import Base from './Base';
import UserService from './UserService';
import * as _ from 'lodash';

export default class extends Base {
  
  // get account info
  async getInfo(address: string){
    // TODO

    return {
      address,
      blance : _.random(100, 500)
    };
  }

  // change metadata
  changeMeta(meta: any): any{
    // TODO

    return true;
  }

  // send ela to another address
  async send(source:any, target:any, amount): Promise<any>{
    // TODO

    const s_address = source.address;
    const s_amount = source.amount;

    const t_address = target.address;
    const t_memo = target.memo;

    if(amount > s_amount){
      throw 'not enough ela to send';
    }

    return {
      ...source,
      amount : s_amount-amount
    } 
  }
}