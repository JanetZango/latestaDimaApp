import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { AdimaProvider } from '../providers/adima/adima';
import { ListPage } from '../pages/list/list';
import { ChoosePage } from '../pages/choose/choose';
import { PayPage } from '../pages/pay/pay';
import { MakeRequestPage } from '../pages/make-request/make-request';
import { MakepaymentPage } from '../pages/makepayment/makepayment';
import { AssociatePage } from '../pages/associate/associate';
import { OfferPage } from '../pages/offer/offer';
import { FCM } from '@ionic-native/fcm';
import { Stripe } from '@ionic-native/stripe';
import { Contacts,ContactFieldType, IContactFindOptions } from '@ionic-native/contacts'
import { ShowcontactsPage } from '../pages/showcontacts/showcontacts';
import { DonationPage } from '../pages/donation/donation';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SigupwithphonePage } from '../pages/signupwithphone/signupwithphone';
import { WindowProvider } from '../providers/window/window';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { InboxPage } from '../pages/inbox/inbox';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    ListPage,
    ChoosePage,
    PayPage,
    MakeRequestPage,
    MakepaymentPage,
    ChoosePage,
    AssociatePage,
    OfferPage,
    ShowcontactsPage,
    DonationPage,
    ProfilePage,
    SignupPage,
    SigupwithphonePage,
    EditprofilePage,
    InboxPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ListPage,
    ChoosePage,
    InboxPage,
    EditprofilePage,
    PayPage,
    DonationPage,
    MakeRequestPage,
    MakepaymentPage,
    ChoosePage,
    OfferPage,
    AssociatePage,
    ShowcontactsPage,
    ProfilePage,
    SignupPage,
    SigupwithphonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    Stripe,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdimaProvider,
    WindowProvider,
    LocalNotifications
  ]
})
export class AppModule {}
