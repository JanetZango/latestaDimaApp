import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { MakeRequestPage } from '../make-request/make-request';
import { OfferPage } from '../offer/offer';
// import { timingSafeEqual } from 'crypto';
/**
 * Generated class for the AssociatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-associate',
  templateUrl: 'associate.html',
})
export class AssociatePage {
  displayuserArr = new Array();


  //variables;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider) {
    this.dima.retrieveAddedRequest().then((data: any) => {
      this.displayuserArr.length =0;
      this.displayuserArr =[];
      this.displayuserArr = data;
      this.displayuserArr.reverse();
   
      console.log(this.displayuserArr)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssociatePage');
  }
  gottoRequest(name) {
    for (var x = 0; x < this.displayuserArr.length; x++) {
      if (name == this.displayuserArr[x].name) {
        this.navCtrl.push(MakeRequestPage, { orgObject: this.displayuserArr[x] });
      }
    }
  }

  gotoOffer(name) {
    for (var x = 0; x < this.displayuserArr.length; x++) {
      if (name == this.displayuserArr[x].name) {
        this.navCtrl.push(OfferPage, { offerObject: this.displayuserArr[x] });
        break;
      }
    }
  }
}


