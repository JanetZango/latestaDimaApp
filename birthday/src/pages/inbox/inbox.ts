import { Component, style  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { AlertController } from "ionic-angular";
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var firebase;
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  arr = new Array();
  disOffers = new Array();
  makeRequest;
  key;
  downloadurl;
  name;
  person
  terms;
  offer;
  Duration;
  user;
  downloadurl1;
  hasAccepted = true;
  insidekey;
  pathkey;
  message ="You have accepted this offer"
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.makeRequest = this.navParams.get('orgObject');
    console.log(this.makeRequest)
    this.key = this.makeRequest[0].user
    this.name = this.makeRequest[0].name
    this.downloadurl = this.makeRequest[0].downloadurl
    console.log(this.key)

  }


  ngOnInit() {
  // this.ifOrderYes() 
  }

  displayProfile() {
    console.log(this.key)
    this.dima.retrieveOfferingChoose().then((data: any) => {
      this.disOffers = data
      console.log(this.disOffers)
      for (var x = 0; x < data.length; x++) {
        this.person = this.disOffers[x].personOffering
        this.downloadurl1 = this.disOffers[x].downloadurl
        this.offer = this.disOffers[x].offer
        this.terms = this.disOffers[x].terms
        this.Duration = this.disOffers[x].Duration
        this.user = this.disOffers[x].userkey
        this.hasAccepted = this.disOffers[x].hasAccepted
        this.insidekey = this.disOffers[x].insidekey
        this.pathkey = this.disOffers[x].key
      }
    })
  }

  ionViewDidLoad() {
    this.displayProfile();
    ;
   
  }
  GoToProfile(){
    this.navCtrl.pop();
  }


  ifOrderYes() {
    if (this.hasAccepted = true) {
      let btnOrder = document.getElementsByClassName('theStatements') as HTMLCollectionOf<HTMLElement>
      btnOrder[0].style.display = "none";
    }
    }

  accepted() {
    this.dima.createinbox(this.user, this.name, this.downloadurl, this.offer, this.terms, this.Duration, this.key, this.insidekey).then((data) => {
      this.dima.createinbox2(this.key, this.downloadurl1, this.person, this.offer, this.terms, this.Duration, this.user, this.insidekey).then((data) => {
        this.dima.updateoffereddonation(this.key,this.offer,this.insidekey).then((data)=>{
          this.dima.updateofferedmessage(this.key,this.message,this.insidekey)
          console.log(data)
        })    
      })
    })
  }

  

  removeImage(user) {
    console.log(user);
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to reject the offer?',
      cssClass: "myAlert",
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.dima.RemoveOffer(user);
            this.displayProfile();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
   

  }


}
