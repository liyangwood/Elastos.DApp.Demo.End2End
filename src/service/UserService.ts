import Base from './Base';

export default class extends Base {
  public current;
  public isLogin;

  _init(){
    const ls = localStorage.getItem('current_user');
    if(ls){
      const user = JSON.parse(ls);

      this.isLogin = true;
      this.current = user;
    }
  }

  login(user){
    this.current = user;
    this.isLogin = true;

    localStorage.setItem('current_user', JSON.stringify(this.current));
  }

  logout(){
    this.current = null;
    this.isLogin = false;

    localStorage.removeItem('current_user');
  }
}