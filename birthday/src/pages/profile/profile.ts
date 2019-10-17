import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { SigninPage } from '../signin/signin';
import { EditprofilePage } from '../editprofile/editprofile';
import { InboxPage } from '../inbox/inbox';
import { Stripe } from '@ionic-native/stripe';
import { FCM } from '@ionic-native/fcm';
import { ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopOverProfilePage } from '../pop-over-profile/pop-over-profile';

declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  arr = new Array();
  requestArr = new Array();
  getProjectDetails = new Array();
  paymentArr = new Array();
  recieveArr = new Array();
  getinbox = [];
  getinbox2 = new Array();
  uid;
  user;
  request = "inbox";
  user2: any
  key;
  downloadurl
  currentloggedinName;
  img;
  offerPerson;
  Amount
  AmountRecieved;
  offerkey;
  userkeyPerson;
  offer;
  insidekey;
  stripe_key = "pk_test_n47qQgW5Mf80nl9atiVSPSwC00uTrPCLVS"
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController,public navParams: NavParams, public dima: AdimaProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private stripe: Stripe,private fcm: FCM,public toastCtrl: ToastController) {
    this.displayProfile();
    this.getcreateinbox(); 
    this.getcreateinbox2();
  }
 
  // ionViewDidEnter() {
  //   this.getcreateinbox(); 
  //   this.getcreateinbox2();
   
  // }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopOverProfilePage);
    popover.present();
  }

  displayProfile() {
    this.dima.displayProfile().then((data: any) => {
      console.log(data)
      this.arr.length = 0
      this.arr = data;
      this.user = this.arr[0].user
      this.img = this.arr[0].downloadurl
      this.currentloggedinName = this.arr[0].name
      console.log(this.arr)
    })
  }


  getcreateinbox() {
    this.dima.getcreateinbox().then((data: any) => {
      this.getinbox.length =0;
      this.getinbox.reverse();
      this.getinbox = data
      console.log(this.getinbox)
      for(var x = 0; x < data.length;x++) {
        this.offerPerson = this.getinbox[x].user
        this.offerkey= this.getinbox[x].name
        this.insidekey= this.getinbox[x].insidekey
        console.log(this.getinbox)
      }
      
   
    })
  }





  getcreateinbox2() {
    this.dima.getcreateinbox2().then((data: any) => {
      this.getinbox2.length = 0;
      this.getinbox2 = data;
      this.getinbox2.reverse();
      this.key = data.key
      console.log(this.getinbox2)
    })
  }



  callRequest() {
    this.dima.retriveRequest().then((data: any) => {
      this.requestArr = data;
      this.requestArr.reverse();
      this.requestArr.length = 0;
      console.log(this.requestArr)
    })
  }


 
  inbox() {
    this.navCtrl.push(InboxPage, { orgObject: this.arr });
  }
  acceptedReq(key) {
    for (var x = 0; x < this.requestArr.length; x++) {
      if (key == this.requestArr[x].key) {
        this.dima.storeAaccetedRequest(key).then((data) => {
          console.log(data)
        })
        break;
      }
    }
  }

  ionViewDidLoad() {

    // this.getcreateinbox(); 
    // this.getcreateinbox2();


    this.dima.retrivePayment().then((data: any) => {
      this.paymentArr = data
      this.paymentArr.length = 0;
      console.log(this.paymentArr)
    })

    this.dima.getupdateOffer().then((data :any)=>{
      this.paymentArr = data
      this.paymentArr.length = 0;
      console.log(data)
    })

    this.dima.getupdateOfferRecieved().then((data:any)=>{
      this.recieveArr = data
      console.log(this.recieveArr)
      for(var z = 0; z < data.length;z++) {
        this.userkeyPerson = this.recieveArr[z].userkeyPerson
        this.offer = this.recieveArr[z].offer
        this.insidekey = this.recieveArr[z].insidekey
        console.log(this.recieveArr)
      }
 
    })

    this.dima.GetAaccetedRequest().then((data) => {
      console.log(data)
    })
    console.log('ionViewDidLoad ProfilePage');

    this.callRequest();




  }

  accepted() {
    console.log(this.user)
    this.stripe.setPublishableKey(this.stripe_key);
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Payment',
      message: "Enter your details to pay the payment",
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
                this.getProjectDetails.push(this.getinbox[0].token = token)             
                this.dima.updateOffer(data.Amount, token, this.offerPerson, this.user, this.currentloggedinName, this.img).then((data:any) => {
                  this.getProjectDetails.length = 0;
                  this.navCtrl.push(ProfilePage)
                  })
                  this.dima.updateOfferRecieved(data.Amount, token, this.user, this.offerPerson, this.offerkey, this.img).then((data2:any) => {
              
                  this.getProjectDetails.length = 0;
                  this.navCtrl.push(ProfilePage)
                
                
                })
                const toast = this.toastCtrl.create({
                  message: 'Your payment has successful!',
                  duration: 3000
                });
                toast.present();
                       
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
