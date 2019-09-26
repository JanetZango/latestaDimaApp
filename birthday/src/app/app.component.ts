import { Component } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdimaProvider } from '../providers/adima/adima';
import { SigninPage } from '../pages/signin/signin';
import { initializeApp } from 'firebase';

import { timer } from 'rxjs/observable/timer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;;

  pages: Array<{ title: string, component: any }>;


  showSplash = true;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public admina :AdimaProvider) {
  

      admina.checkstate().then((data: any) => {
        if (data == 1) {
          this.rootPage = ListPage
        }
        else {
          this.rootPage = SigninPage
        }
       })

       this.initializeApp();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      timer(3000).subscribe(()=> this.showSplash = false)
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  

}


}

