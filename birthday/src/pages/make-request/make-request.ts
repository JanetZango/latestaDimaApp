
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { AssociatePage } from '../associate/associate';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the MakeRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-request',
  templateUrl: 'make-request.html',
})
export class MakeRequestPage {
  makeRequest = new Array();
  currentLoggedin = new Array();
  getProjectDetails = new Array();

  name;
  email;
  currentloggedinName;
  stripe_key = "pk_test_n47qQgW5Mf80nl9atiVSPSwC00uTrPCLVS"
  number;
  expMonth;
  expYear;
  cvc;
  Amount;
  key;
  key1;
  img;
  balance;
  downloadurl;
  offer;
  purpose;
  PO_no ;
  outstanding;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.makeRequest.push(this.navParams.get('orgObject'));
    console.log(this.makeRequest);
    this.Amount = this.makeRequest[0].Amount;
    this.PO_no = this.makeRequest[0].PO_no;
    this.balance = this.makeRequest[0].balance
    this.downloadurl = this.makeRequest[0].downloadurl
    this.purpose = this.makeRequest[0].purpose
    this.offer = this.makeRequest[0].offer
    console.log(this.Amount, this.offer, this.purpose)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRequestPage');
    this.dima.getCurrentLoggedinPerson().then((data: any) => {
      console.log(data.name)
      this.currentloggedinName = data.name;
      this.img = data.downloadurl
      this.key1 = data.user
      console.log(this.currentloggedinName)
      console.log(this.key1)
    })
  }




}
