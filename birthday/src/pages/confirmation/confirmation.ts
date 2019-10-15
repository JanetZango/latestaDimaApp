import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
// import SignupPage from '../signup/signup';
import { ChoosePage } from '../choose/choose';
import * as firebase from 'firebase';
/**
 * Generated class for the ConfirmationPage page.
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




@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public adima :AdimaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  gotoRegister(){
    this.navCtrl.push(SigninPage)
  }

  afterViewInit() {
    setTimeout(function () {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    },1000)
  }


  signIn(phoneNumber: any, appVerifier: any) {
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
           let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
                .then(function (result) {
                  // User signed in successfully.
                  console.log(result.user);
                  // ...
                }).catch(function (error) {
                  // User couldn't sign in (bad verification code?)
                  // ...
                });
            }
          } 
        ]
      });
      prompt.present();
        console.log(confirmationResult);
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

}
