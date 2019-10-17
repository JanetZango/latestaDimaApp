import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { EditRequestPage } from '../edit-request/edit-request';
import { ProfilePage } from '../profile/profile';
import { AlertController } from "ionic-angular";
/**
 * Generated class for the ShowmyRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showmy-request',
  templateUrl: 'showmy-request.html',
})
export class ShowmyRequestPage {
  myrequest = new Array();
  key;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider,public alertCtrl :AlertController) {
   this.displayProfile();
  }


  displayProfile(){
    this.dima.retrieveAddedRequestIndividual().then((data: any) => {
      this.myrequest.length = 0;
      this.myrequest = data;
      this.myrequest.reverse();
      console.log(this.key)
    })
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowmyRequestPage');
  }

  edit(name){
    for (var i = 0; i < this.myrequest.length; i++) {
      if (name == this.myrequest[i].companyName) {
        this.navCtrl.push(EditRequestPage, { orgObject: this.myrequest[i] })

        break;
      }
    }
  }

  GoToProfile(){
    this.navCtrl.push(ProfilePage)
  }

  removeImage(user) {
    console.log(user);
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to close your request?',
      cssClass: "myAlert",
      buttons: [
        {
          text: 'Close',
          handler: () => {
            this.dima.RemoveOfferRquest(user);
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
