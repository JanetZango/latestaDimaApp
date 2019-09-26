import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { PayPage } from '../pay/pay';
import { AdimaProvider } from '../../providers/adima/adima';
import { PayPage } from '../pay/pay';

/**
 * Generated class for the MakePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-makepayment',
  templateUrl: 'makepayment.html',
})
export class MakepaymentPage {
  displayuserArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public dima :AdimaProvider) {
    this.dima.getAllUsers().then((data: any) => {
      this.displayuserArr.length =0;
      this.displayuserArr =[];
      this.displayuserArr.reverse();
      this.displayuserArr = data
      console.log(this.displayuserArr)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakePaymentPage');
  }

  gottoRequest(name){
    // console.log(this.orgArray)
    for (var x = 0; x < this.displayuserArr.length; x++) {
     if (name == this.displayuserArr[x].name) {
       this.navCtrl.push(PayPage, { orgObject: this.displayuserArr[x] });
       break;
     }
   }
}

}