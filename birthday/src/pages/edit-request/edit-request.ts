import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowmyRequestPage } from '../showmy-request/showmy-request';
import { AdimaProvider } from '../../providers/adima/adima';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
/**
 * Generated class for the EditRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-request',
  templateUrl: 'edit-request.html',
})
export class EditRequestPage {
  orgArray = new Array();
  imageArr = new Array();
  Amount;
  PO_no;
  companyName;
  purpose;
  downloadurl;
  d =1;
  key;
  Supplier_no;
  CSD_no;
  province;
  department;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dima :AdimaProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  
    this.orgArray.push(this.navParams.get('orgObject'));
    console.log(this.orgArray);
    this.Amount = this.orgArray[0].Amount;
    this.PO_no = this.orgArray[0].PO_no;
    this.Supplier_no = this.orgArray[0].Supplier_no;
    this.province = this.orgArray[0].province;
    this.CSD_no = this.orgArray[0].CSD_no;
    this.department = this.orgArray[0].department;
    this.purpose = this.orgArray[0].purpose;
    this.downloadurl = this.orgArray[0].downloadurl;
    this.key = this.orgArray[0].key;
  }

  ngOnInit() {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRequestPage');
    // this.orgArray.push(this.navParams.get('orgObject'));
    // console.log(this.orgArray);
    // this.Amount = this.orgArray[0].Amount;
    // this.PO_no = this.orgArray[0].PO_no;
    // this.companyName = this.orgArray[0].companyName;
    // this.purpose = this.orgArray[0].purpose;
    // this.downloadurl = this.orgArray[0].downloadurl;
    // this.key = this.orgArray[0].key;
  }

  GoToProfile(){
    this.navCtrl.push(ShowmyRequestPage)
  }

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
      
      this.dima.updaterequest(this.Amount, this.PO_no, this.CSD_no, this.downloadurl, this.purpose, this.key,this.Supplier_no,this.department,this.province).then((data) => {
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
 

}
