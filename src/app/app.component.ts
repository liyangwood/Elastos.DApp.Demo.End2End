import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import Log from '../utility/Log';

import HomePage from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      Log.info('platforms', platform.platforms());
      // console.log(translateService.getBrowserCultureLang())
      translateService.setDefaultLang('en');

      let lang = localStorage.getItem('current_lang');
      if(!lang){
        lang = 'en'
        localStorage.setItem('current_lang', lang);
      }
      translateService.use(lang)
    });
  }
}

