import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { AssociatePage } from '../associate/associate';
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from "ionic-angular";
import { InboxPage } from '../inbox/inbox';
/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var firebase;

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  offerAmount;
  terms;
  key;
  offer;
  Amount;
  balance;
  user;
  makeOfferArr = new Array();
  arr = new Array();
  name;
  useridkey
  downloadurl;
  Duration;
  knobValues;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, public toastCtrl: ToastController, private localNotifications: LocalNotifications, public platform: Platform, public alertCtrl: AlertController) {
    this.makeOfferArr.push(this.navParams.get('offerObject'));
    console.log(this.makeOfferArr)
    console.log(this.makeOfferArr[0].offer)
    this.key = this.makeOfferArr[0].key
    this.user = this.makeOfferArr[0].user
    this.offerAmount = this.makeOfferArr[0].offer
    this.Amount = this.makeOfferArr[0].Amount
    this.balance = this.makeOfferArr[0].balance
    console.log(this.user)
    console.log(this.key)

    this.displayProfile();
    this.platform.ready().then((rdy) => {
      this.localNotifications.on('click').subscribe(notification => {
        let json = JSON.parse(JSON.stringify(notification.data));
        let alert = this.alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata,
          buttons: [
            {
              text: 'View',
              handler: data => {
                console.log('Saved clicked');
                this.navCtrl.push(InboxPage, { orgObject: this.makeOfferArr })
              }
            }
          ]
        });
        alert.present();
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

  displayProfile() {
    let userID = firebase.auth().currentUser;
    firebase.database().ref("App_Users/" + userID.uid).on('value', (data: any) => {
      let details = data.val();
      console.log(data.val());

      let obj = {
        name: details.name,
        downloadurl: details.downloadurl,
        useridkey: userID.uid
      }
      console.log(obj)
      this.arr.push(obj);

      this.name = this.arr[0].name
      this.useridkey = this.arr[0].useridkey
      this.downloadurl = this.arr[0].downloadurl
      // console.log(this.arr)

      console.log(this.useridkey)
    });
  }

  makeoffer() {
    const toast = this.toastCtrl.create({
      message: 'You have succesfully offered your donation!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
    console.log(this.user)
    this.dima.makeOffer(this.user, this.offerAmount, this.knobValues, this.name, this.useridkey, this.downloadurl, this.Duration, this.key).then((data) => {
      console.log(data)

    })
    this.platform.ready().then(() => {
      this.localNotifications.schedule({
        id: 1,
        title: 'Offer',
        text: this.name + ' ' + 'has made you an offer',
        trigger: { at: new Date(new Date().getTime() + 5 * 1000) },
        led: 'FF0000',
        data: { mydata: 'Offer Amount:' + " " + this.offerAmount }
      });
    });
  }

  gotoass(){
    this.navCtrl.push(AssociatePage)
  }

}

