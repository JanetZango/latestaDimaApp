import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { WindowProvider } from '../../providers/window/window';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { WindowProvider } from '../../providers/window/window';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the SigupwithphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var firebaseConfig = {
  apiKey: "AIzaSyD6QzeWFfMoXDUazrnZAlLOxy3K_Ka778U",
  authDomain: "adimaapp.firebaseapp.com",
  databaseURL: "https://adimaapp.firebaseio.com",
  projectId: "adimaapp",
  storageBucket: "adimaapp.appspot.com",
  messagingSenderId: "246207647956",
  appId: "1:246207647956:web:42a0f2709e3b12b0"
};
// firebase.initializeApp(firebaseConfig);  







@Injectable()
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  name;
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}


@Component({
  selector: 'page-signupwithphone',
  templateUrl: 'signupwithphone.html',
})
export class SigupwithphonePage {
  windowRef: any;
  phoneNumber = new PhoneNumber;
  verificationCode: string;
  arr = new Array();
  user: any;
  config: any
  name;
  password;
  email;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public toastCtrl: ToastController, public win: WindowProvider,public loadingCtrl: LoadingController,) {
  }

  ionViewDidEnter() {
    this.windowRef = this.win.windowRef
    console.log(this.win)
    // var window;
    var defaultApp = firebase.initializeApp(firebaseConfig);
    setTimeout(function () {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function (response) {
          console.log("success", response);
        },
        'expired-callback': function () {
          console.log("expired-callback");
        }
      });

      this.recaptchaVerifier.render().then(function (widgetId) {
        // this.windowRef.recaptchaWidgetId = widgetId;
        console.log(widgetId)
      });

    }, 1000);

  }


  sendCode() {
    console.log(this.phoneNumber)
    const appVerifier = this.windowRef.recaptchaVerifier;
    let num = this.phoneNumber.e164;
    console.log(num)
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        this.arr.push(result)
        console.log('sms conf', result)
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: 'We have sent you an Sms to verfity your Phone Number',
          buttons: ['OK']
        });
        alert.present();

      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
      });

  }


  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
      var user = firebase.auth().currentUser
      firebase.database().ref("App_Users/" + user.uid).set({
        name: this.name,
        downloadurl: "../../assets/download.png",
        ContactDetails: this.phoneNumber.e164,
        password: this.password,
        email: "",
        token: "",
        AccountNo: "",
        Address: "",

      })
      this.user = result.user;
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Signing in...',
        duration: 40000
      });
      loading.present();
      this.navCtrl.push(ListPage)
    })
      .catch(error => {
        const alert = this.alertCtrl.create({
          subTitle: error,
          buttons: ['OK']
        });
        alert.present()
      });
  }
  gotoSignin() {
    this.navCtrl.push(SigninPage)
  }

}
