import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdimaProvider } from '../providers/adima/adima';
import { SigninPage } from '../pages/signin/signin';
import { initializeApp } from 'firebase';

import { timer } from 'rxjs/observable/timer';
import { ProfilePage } from '../pages/profile/profile';
import { DonationPage } from '../pages/donation/donation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;;

  pages: Array<{ title: string, component: any }>;


  showSplash = true;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public admina: AdimaProvider) {


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

    this.pages = [
      { title: 'Home', component: ListPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Add request', component: DonationPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false)
    });
  }


  openPageP(page) {
    this.nav.push(ProfilePage);
  }
  openPageL(page) {
    this.nav.push(ListPage);
  }
  openPageD(page) {
    this.nav.push(DonationPage);
  }


}

