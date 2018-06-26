import Base from './Base';

export default class extends Base {
  private address: string;

  constructor(address: string){
    super();
    this.address = address;
  }

  getAddress(){
    return this.address;
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