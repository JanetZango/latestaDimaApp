import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts,ContactFieldType, IContactFindOptions } from '@ionic-native/contacts'
import { AdimaProvider } from '../../providers/adima/adima';
/**
 * Generated class for the ShowcontactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showcontacts',
  templateUrl: 'showcontacts.html',
})
export class ShowcontactsPage {
  ourtype: ContactFieldType[] = ["displayName"];
  contactsFound = [];
  databaseContacts = new Array();
  newArr = new Array();
  phoneNumber;
  acutalNumber
  constructor(public navCtrl: NavController, public navParams: NavParams, public contacts :Contacts,public dima:AdimaProvider) {
    this.search('');

    this.dima.getAllRegisteredPeople().then((data:any)=>{
      // console.log(data)
      this.databaseContacts = data
      console.log(this.databaseContacts)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowcontactsPage');
  }

  search(q){
    var tempArray = new Array();
    const option: IContactFindOptions ={
      filter: q
    }
    this.contacts.find(this.ourtype,option).then(conts =>{
      this.contactsFound = conts
      for(var x =0; this.databaseContacts.length;x++){
        if(this.databaseContacts[x].actualnumber == this.contactsFound[x].phoneNumbers){
          tempArray.push(this.contactsFound[x])
          console.log(tempArray)
        }
      }
    })
  }
}
