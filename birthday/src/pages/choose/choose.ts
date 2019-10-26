import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';
import { SigupwithphonePage } from '../signupwithphone/signupwithphone';



/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
})
export class ChoosePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }
  email(){
    this.navCtrl.push(SignupPage)
  }
  phone(){
    this.navCtrl.push(SigupwithphonePage)
  }

  gotoRegister(){
    this.navCtrl.push(SigninPage)
  }

}
