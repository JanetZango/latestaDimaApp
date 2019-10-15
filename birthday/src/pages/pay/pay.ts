import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { Stripe } from '@ionic-native/stripe';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { FCM } from '@ionic-native/fcm';
import { MakepaymentPage } from '../makepayment/makepayment';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, public alertCtrl: AlertController, private stripe: Stripe,private fcm: FCM) {
    this.makeRequest.push(this.navParams.get('orgObject'));
    console.log(this.makeRequest);
    this.name = this.makeRequest[0].name;
    this.email = this.makeRequest[0].email;
    this.key = this.makeRequest[0].id
    console.log(this.name, this.email, this.key)

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


  SendRequest() {
    console.log(this.key)
    this.stripe.setPublishableKey(this.stripe_key);
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Payment',
      message: "Enter your details to make payment",
      inputs: [
        {
          name: 'number',
          placeholder: 'Enter AccNO'
        },
        {
          name: 'expMonth',
          placeholder: 'Exp Month'
        },
        {
          name: 'expYear',
          placeholder: 'Exp Year'
        },
        {
          name: 'cvc',
          placeholder: 'Cvc'
        },
        {
          name: 'Amount',
          placeholder: 'Enter Amount'
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            let card = {
              number: data.number,
              expMonth: data.expMonth,
              expYear: data.expYear,
              cvc: data.cvc,
            };
            this.stripe.createCardToken(card)
              .then(token => {
                this.getProjectDetails.push(this.makeRequest[0].token = token)
                console.log(token)
                console.log(this.getProjectDetails)
                console.log('Payment successful')
                const alert = this.alertCtrl.create({
                  cssClass: "myAlert",
                  title: 'Confirmation',
                  subTitle: "The Payment has been made",
                  buttons: ['OK']
                });
                alert.present();
                this.dima.updateStudent(data.Amount, token, this.key,this.key1,this.currentloggedinName,this.img).then((data) => {
                  console.log('updated')
                  console.log(this.key)
                  this.getProjectDetails.length = 0;
                  this.navCtrl.push(MakepaymentPage)
                })

              })
              .catch(error =>
                console.error(error));
          }
        }
      ]
    });
    prompt.present();
  }




}
 


