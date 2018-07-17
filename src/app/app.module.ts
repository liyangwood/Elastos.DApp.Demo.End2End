import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import HomePage from '../pages/home/home';
import LoginPage from '../pages/login';
import DittoListPage from '../pages/ditto_list';
import ProfilePage from '../pages/profile';
import DittoDetailPage from '../pages/ditto_detail';
import WalletInfoPage from '../pages/wallet_info';
import WalletSendPage from '../pages/wallet_send';
import WalletDetailPage from '../pages/wallet_detail';
import IpfsInfoPage from '../pages/ipfs_info';
import FileViewPage from '../pages/file_view';


declare var require;

const Lang = {
  en : require('../assets/i18n/en.json'),
  'zh-cn' : require('../assets/i18n/zh-cn.json')
};

const list = [
  MyApp,
  HomePage,
  LoginPage,
  DittoListPage,
  ProfilePage,
  DittoDetailPage,
  WalletInfoPage,
  WalletSendPage,
  IpfsInfoPage,
  FileViewPage,
  WalletDetailPage
];

export const createTranslateLoader = class implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(Lang[lang]);
  }
}

@NgModule({
  declarations: list,
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode: 'ios'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useClass: createTranslateLoader
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: list,
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    FilePath,
    File,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
