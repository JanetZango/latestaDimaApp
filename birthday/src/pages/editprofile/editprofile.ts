import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage  implements OnInit {
  Address;
  AccountNo;
  ContactDetails;
  downloadurl;
  name;
  d=1;
  imageArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public dima :AdimaProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ngOnInit() {
    this.dima.retrieve().on('value', (data: any) => {
      let details = data.val();
      this.ContactDetails = details.ContactDetails;
      this.Address = details.Address;
      this.name = details.name
      this.AccountNo = details.AccountNo;
      this.downloadurl = details.downloadurl
    })
  }


  GoToProfile(){
    this.navCtrl.pop()
  }
​
  insertpic(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
​
    if (this.d == 1) {
      // opts[0].style.top = "10vh";
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
​
        if (event.target.files[0].size > 1500000) {
          let alert = this.alertCtrl.create({
            title: "Oh no!",
            subTitle: "your photo is too large, please choose a photo with 1.5MB or less.",
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          reader.onload = (event: any) => {
            this.downloadurl = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
​
      }
​
    }
  }


  uploadPicture() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 4000000
    });
    loading.present();
    // this.dima.uploadProfilePic(this.downloadurl, this.name).then(data => {
      console.log('added to db');
      this.dima.update(this.name, this.downloadurl, this.Address, this.AccountNo, this.ContactDetails).then((data) => {
        this.imageArr.push(data);
      });
      console.log(this.imageArr);
      loading.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Profile successfully updated!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
​
    // },
    //   Error => {
    //     loading.dismiss();
    //     const alert = this.alertCtrl.create({
    //       cssClass: "myAlert",
    //       subTitle: Error.message,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
​
  }
 
​

}
