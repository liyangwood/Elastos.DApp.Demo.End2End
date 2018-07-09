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

import { MyApp } from './app.component';
import HomePage from '../pages/home/home';
import LoginPage from '../pages/login';
import DittoListPage from '../pages/ditto_list';
import ProfilePage from '../pages/profile';
import DittoDetailPage from '../pages/ditto_detail';
import WalletInfoPage from '../pages/wallet_info';
import WalletSendPage from '../pages/wallet_send';
import IpfsInfoPage from '../pages/ipfs_info';
import FileViewPage from '../pages/file_view';

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
  FileViewPage
];

export const createTranslateLoader = function(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: list,
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: list,
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
