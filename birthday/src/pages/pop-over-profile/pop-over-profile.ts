import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { AdimaProvider } from '../../providers/adima/adima';
import { SigninPage } from '../signin/signin';
import { EditprofilePage } from '../editprofile/editprofile';
import { InboxPage } from '../inbox/inbox';
import { ThrowStmt } from '@angular/compiler';
/**
 * Generated class for the PopOverProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;


@IonicPage()
@Component({
  selector: 'page-pop-over-profile',
  templateUrl: 'pop-over-profile.html',
})
export class PopOverProfilePage {
  arr = new Array();
 
  uid;
  user;
  request = "inbox";
  user2: any
  key;
  downloadurl
  currentloggedinName;
  img;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public dima: AdimaProvider,public alertCtrl: AlertController) {
    this.displayProfile();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverProfilePage');
  }

  edit() {
    this.navCtrl.push(EditprofilePage)
  }

  
  inbox() {
    this.navCtrl.push(InboxPage, { orgObject: this.arr });
  }

  logOut() {
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to log out?',
      cssClass: "myAlert",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.dima.logout().then(() => {
              this.navCtrl.push(SigninPage, { out: 'logout' });
            }, (error) => {
              console.log(error.message);
            })
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }


}
