
import { Injectable, NgZone, keyframes } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { firestore } from 'firebase';



declare var firebase;
/*
  Generated class for the ADimaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdimaProvider {
  //variable
  stayLoggedIn;
  name;
  getusers = new Array();
  getcreate = new Array();
  getcreate2 = new Array();
  getresquestArr = new Array();
  getpaymentArr = new Array();
  getaddedRequests = new Array();
  RegisteredPeople = new Array();
  paymentmade = new Array();
  paymentRecieved = new Array();
  offerArr = new Array();
  offerings = new Array();
  disArr = new Array();
  Amount;
  offer;
  outstanding;
  balance
  constructor(public ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello ADimaProvider Provider');
  }

  // onNotifications() {
  //   return this.firebase.onNotificationOpen();
  // }

  ///checking authhstate
  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }


  getProfile() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.database().ref("App_Users/" + user.uid).on('value', (data: any) => {
              let details = data.val();
              if (data.val() != null || data.val() != undefined) {
                console.log(details)
                accpt(details.downloadurl)
                console.log(details.downloadurl)
              }
              else {
                details = null
              }
            })
          } else {
          }
        });
      })
    })
  }

  getAllUsers() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.database().ref("App_Users").on('value', (data: any) => {
          this.getusers.length = 0;
          let details = data.val();
          console.log(details)
          let key = Object.keys(details)
          console.log(key)
          for (var x = 0; x < key.length; x++) {
            let k = key[x]
            console.log(k)
            let obj = {
              name: details[k].name,
              downloadurl: details[k].downloadurl,
              email: details[k].email,
              id: key[x]
            }
            console.log(obj)
            this.getusers.push(obj);
            console.log(this.getusers)

          }
        })
        accpt(this.getusers)
      })
    })
  }



  updateStudent(offer, token, id, user, name, downloadurl) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("PaymentMade/" + id).set({
        offer: offer,
        token: token,
        user: user,
        name: name,
        downloadurl: downloadurl,
        message: "Has made a payment"
      })
    })
  }


  updateOffer(offer, token, id, user, name, downloadurl) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("OfferedPayment/" + id).set({
        offer: offer,
        token: token,
        user: user,
        name: name,
        downloadurl: downloadurl,
        message: "Payment has been recieved"

      })
    })
  }

  updateOfferRecieved(offer, token, id, user, name, downloadurl) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("OfferedPaymentRecieved/" + id).set({
        offer: offer,
        token: token,
        user: user,
        name: name,
        downloadurl: downloadurl,
        message: "Payment has been made"
      })
    })
  }



  getupdateOffer() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("OfferedPaymentRecieved/" + user.uid).on('value', (data: any) => {
        let proDetails2 = data.val();
        console.log(proDetails2)
        if (data.val() != null || data.val() != undefined) {
          let obj = {
            Amount: proDetails2.offer,
            name: proDetails2.name,
            downloadurl: proDetails2.downloadurl,
            message: proDetails2.message,
            insidekey: proDetails2.insidekey,
          }
          console.log(obj)
          this.paymentmade.push(obj)
          console.log(this.paymentmade)
        }
      })
      accept(this.paymentmade)

    })
  }


  getupdateOfferRecieved() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("OfferedPayment/" + user.uid).on('value', (data: any) => {
        let proDetails2 = data.val();
        console.log(proDetails2)
        if (data.val() != null || data.val() != undefined) {
          let obj = {
            Amount: proDetails2.offer,
            name: proDetails2.name,
            downloadurl: proDetails2.downloadurl,
            message: proDetails2.message,
            insidekey: proDetails2.insidekey,
            userkeyPerson: user.uid
          }
          console.log(obj)
          this.paymentRecieved.push(obj)
          console.log(this.paymentRecieved)
        }
      })
      accept(this.paymentRecieved)
    })
  }


  getCurrentLoggedinPerson() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users/" + user.uid).on('value', (data: any) => {
          var details = data.val();
          let key = Object.keys(details)
          console.log(key)
          let obj = {
            name: details.name,
            downloadurl: details.downloadurl,
            user: user.uid
          }
          console.log(obj)
          accpt(obj)
        })
      })
    })
  }


  getAllRegisteredPeople() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users").on('value', (data: any) => {
          var details = data.val();
          console.log(details)
          let keys = Object.keys(details)
          console.log(keys)
          for (var x = 0; x < keys.length; x++) {
            let obj = {
              phoneNumber: details[keys[x]].phoneNumber
            }
            this.RegisteredPeople.push(obj)
            console.log(this.RegisteredPeople)
          }
          accpt(this.RegisteredPeople)
        })
      })
    })
  }

  addRequestFunding(id, Amount, purpose, PO_no, downloadurl, name, province, department, Supplier_no, CSD_no) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("AddRequestFundings/" + id).push({
        Amount: Amount,
        purpose: purpose,
        PO_no: PO_no,
        downloadurl: downloadurl,
        name: name,
        offer: 0,
        balance: 0,
        province: province,
        department: department,
        Supplier_no: Supplier_no,
        CSD_no: CSD_no

      })
    })
  }



  displayProfile() {
    return new Promise((accpt, rej) => {
      let userID = firebase.auth().currentUser;
      this.offerArr.length = 0;
      firebase.database().ref("App_Users/" + userID.uid).on('value', (data: any) => {
        let details = data.val();
        this.offerArr.length = 0;
        console.log(details);
        let obj = {
          user: userID.uid,
          AccountNo: details.AccountNo,
          ContactDetails: details.ContactDetails,
          downloadurl: details.downloadurl,
          email: details.email,
          Address: details.Address,
          cell: details.cell,
          name: details.name

        }
        console.log(obj)
        this.offerArr.push(obj)
        console.log(this.offerArr)

        accpt(this.offerArr)
      })

    });
  }


  retrieveOfferingChoose() {
    return new Promise((accpt, rej) => {
      let userID = firebase.auth().currentUser;
      console.log(userID.uid)
      firebase.database().ref("Offers/" + userID.uid).on("value", (data: any) => {
        let getoffers = data.val();
        console.log(getoffers)
        this.disArr.length = 0;
        console.log(getoffers)
        if (data.val() != null || data.val()) {
          let key1 = Object.keys(getoffers)
          for (var i = 0; i < key1.length; i++) {
            let obj = {
              user: userID.uid,
              offer: getoffers[key1[i]].offer,
              personOffering: getoffers[key1[i]].personOffering,
              downloadurl: getoffers[key1[i]].downloadurl,
              userkey: getoffers[key1[i]].userkey,
              Duration: getoffers[key1[i]].Duration,
              terms: getoffers[key1[i]].terms,
              hasAccepted: getoffers[key1[i]].hasAccepted,
              insidekey: getoffers[key1[i]].insidekey,
              key: key1[i]

            }
            console.log(obj)
            this.disArr.push(obj)
            console.log(this.disArr)
          }
        }


        accpt(this.disArr)
      })
    })
  }







  retrieveAddedRequest() {
    return new Promise((accpt, rej) => {
      var user = firebase.currentUser;
      this.getaddedRequests.length = 0;
      firebase.database().ref("AddRequestFundings").on("value", (data) => {
        let requestDetails = data.val();
        console.log(requestDetails)
        let keys1 = Object.keys(requestDetails)
        console.log(keys1)
        this.getaddedRequests.length = 0;
        for (var x = 0; x < keys1.length; x++) {
          firebase.database().ref("AddRequestFundings/" + keys1[x]).on("value", (data2) => {
            let requestDetails2 = data2.val();
            console.log(requestDetails2)
            let keys2 = Object.keys(requestDetails2)
            console.log(keys2)

            for (var z = 0; z < keys2.length; z++) {
              if(this.offer != 0 ){
                if(this.balance == this.outstanding){
                  this.balance =  requestDetails2[keys2[z]].Amount - requestDetails2[keys2[z]].offer
                }
              }
            let obj = {
                Amount: requestDetails2[keys2[z]].Amount,
                PO_no: requestDetails2[keys2[z]].PO_no,
                balance: this.balance,
                downloadurl: requestDetails2[keys2[z]].downloadurl,
                offer: requestDetails2[keys2[z]].offer,
                purpose: requestDetails2[keys2[z]].purpose,
                name: requestDetails2[keys2[z]].name,
                CSD_no: requestDetails2[keys2[z]].CSD_no,
                Supplier_no: requestDetails2[keys2[z]].Supplier_no,
                department: requestDetails2[keys2[z]].department,
                province: requestDetails2[keys2[z]].province,
                key: keys2[z],
                user: keys1[x]
              }
           
              console.log(this.balance)
              console.log(obj)
              this.getaddedRequests.push(obj)
              console.log(this.getaddedRequests)
            }


          })
          accpt(this.getaddedRequests)

        }
      })
    })
  }

  retrieveAddedRequestIndividual() {
    return new Promise((accpt, rej) => {
      let user = firebase.auth().currentUser;
      this.getaddedRequests.length = 0;
      firebase.database().ref("AddRequestFundings/" + user.uid).on("value", (data2) => {
        let requestDetails2 = data2.val();
        console.log(requestDetails2)
        if(data2.val() != null || data2.val()!= undefined){
          let keys2 = Object.keys(requestDetails2)
          console.log(keys2)
          this.getaddedRequests.length = 0;
          for (var z = 0; z < keys2.length; z++) {
            let obj = {
              Amount: requestDetails2[keys2[z]].Amount,
              PO_no: requestDetails2[keys2[z]].PO_no,
              balance: requestDetails2[keys2[z]].balance,
              downloadurl: requestDetails2[keys2[z]].downloadurl,
              offer: requestDetails2[keys2[z]].offer,
              purpose: requestDetails2[keys2[z]].purpose,
              name: requestDetails2[keys2[z]].name,
              department: requestDetails2[keys2[z]].department,
              CSD_no: requestDetails2[keys2[z]].CSD_no,
              Supplier_no: requestDetails2[keys2[z]].Supplier_no,
              province: requestDetails2[keys2[z]].province,
  
              key: keys2[z],
              user: user.uid
  
            }
            console.log(obj)
            this.getaddedRequests.push(obj)
            console.log(this.getaddedRequests)
          }
        }
      })
      accpt(this.getaddedRequests)

    })
  }

  makeOffer(key, offer, terms, name, userkey, downloadurl, Duration, insidekey) {
    return new Promise((accpt, rej) => {
      console.log(key)
      firebase.database().ref("Offers/" + key).push({
        offer: offer,
        terms: terms + "%interest",
        personOffering: name,
        userkey: userkey,
        downloadurl: downloadurl,
        Duration: Duration,
        hasAccepted: false,
        message: "",
        insidekey: insidekey
      })
    })
  }

  storeAaccetedRequest(key) {
    let user = firebase.auth().currentUser
    return new Promise((accpt, rej) => {
      console.log(user.uid)
      console.log(key)
      firebase.database().ref("AcceptedRequests/" + user.uid + "/" + key).set({
        accept: "accepted",
        key: key
      })
    })
  }


  GetAaccetedRequest() {
    let user = firebase.auth().currentUser
    return new Promise((accpt, rej) => {
      firebase.database().ref("AcceptedRequests/" + user.uid).on('value', (data: any) => {
        let proDetails = data.val();
        console.log(proDetails)
        if (data.val() != null || data.val() != undefined) {
          let keys2 = Object.keys(proDetails)
          console.log(keys2)
          for (var x = 0; x < keys2.length; x++) {
            let obj = {
              accept: proDetails[keys2[x]].accept,
              key: keys2[x]
            }
            console.log(obj)
            this.getresquestArr.push(obj)
            console.log(this.getresquestArr)
          }
        }
        else {
          this.getresquestArr == null
        }
      })
    })
  }


  checkAuthState() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            accpt(true)
          } else {
            accpt(false)
          }
        });
      });
    });
  }


  //signing
  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  SignInNumber(number, password) {
    return firebase.auth().signInWithPhoneNumber(number, password);
  }



  signupPhone(number) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithPhoneNumber(number).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    })
  }

  update(name, downloadurl, Address, AccountNo, ContactDetails) {
    // this.ProfileArr.length = 0;
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        console.log(user.uid)
        firebase.database().ref("App_Users/" + user.uid).update({
          name: name,
          downloadurl: downloadurl,
          Address: Address,
          AccountNo: AccountNo,
          ContactDetails: ContactDetails,

        });
      })
    })
  }


  updaterequest(Amount, PO_no, CSD_no, downloadurl, purpose, key,Supplier_no,department,province) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        console.log(user.uid)
        firebase.database().ref("AddRequestFundings/" + user.uid + "/" + key).update({
          Amount: Amount,
          PO_no: PO_no,
          CSD_no: CSD_no,
          downloadurl: downloadurl,
          purpose: purpose,
          Supplier_no:Supplier_no,
          department:department,
          province:province

        });
      })
    })
  }



  uploadProfilePic(pic, name) {
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
          accpt(name);
          console.log(name);
        }, Error => {
          rejc(Error.message)
        })
      })
    })
  }

  //registration
  Signup(email, password, name) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Signing up...',
          duration: 4000000
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("App_Users/" + user.uid).set({
            name: name,
            email: email,
            downloadurl: "../../assets/download.png",
            token: "",
            AccountNo: "",
            Address: "",
            ContactDetails: "",

          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          loading.dismiss();
        }).catch((error) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            cssClass: 'myAlert',
            subTitle: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  // console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          // console.log(error);
        })
      })
    })
  }

  retrieve() {
    let userID = firebase.auth().currentUser;
    return firebase.database().ref("App_Users/" + userID.uid)
  }






  //forgot paswword
  forgetPassword(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
      })

    })

  }
  //check verification
  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user.emailVerified == false) {
          this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  requestSent(key, user, name, img) {
    return new Promise((resolve, reject) => {
      // var user = firebase.auth().currentUser
      firebase.database().ref("Requests/" + key).push({
        message: "they have sent you a request",
        name: name,
        user: user,
        img: img
      })
    })
  }


  //check phonumber


  //logging out
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }




  retriveRequest() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("Requests/" + user.uid).on('value', (data: any) => {
        let proDetails = data.val();
        console.log(proDetails)
        if (data.val() != null || data.val() != undefined) {
          let keys2 = Object.keys(proDetails)
          console.log(keys2)
          for (var x = 0; x < keys2.length; x++) {
            let obj = {
              message: proDetails[keys2[x]].message,
              user: proDetails[keys2[x]].user,
              name: proDetails[keys2[x]].name,
              img: proDetails[keys2[x]].img,
              key: keys2[x]
            }
            console.log(obj)
            this.getresquestArr.push(obj)
            console.log(this.getresquestArr)
          }
        }
        else {
          this.getresquestArr == null
        }
      })
      accept(this.getresquestArr)
    })
  }

  retrivePayment() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("PaymentMade/" + user.uid).on('value', (data: any) => {
        let proDetails2 = data.val();
        console.log(proDetails2)
        if (data.val() != null || data.val() != undefined) {
          let obj = {
            Amount: proDetails2.Amount,
            name: proDetails2.name,
            downloadurl: proDetails2.downloadurl,
            message: proDetails2.message
          }
          console.log(obj)
          this.getpaymentArr.push(obj)
          console.log(this.getpaymentArr)
        }
      })
      accept(this.getpaymentArr)
    })
  }



  retriveOfferedPayment() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("OfferedPayment/" + user.uid).on('value', (data: any) => {
        let proDetails2 = data.val();
        console.log(proDetails2)
        if (data.val() != null || data.val() != undefined) {
          let obj = {
            Amount: proDetails2.Amount,
            name: proDetails2.name,
            downloadurl: proDetails2.downloadurl,
            message: proDetails2.message
          }
          console.log(obj)
          this.getpaymentArr.push(obj)
          console.log(this.getpaymentArr)
        }
      })
      accept(this.getpaymentArr)
    })
  }




  // async getToken() {
  //   this.fcm.getToken().then(token => {
  //     console.log(token);
  //     // alert(token)
  //     var uid = firebase.auth().currentUser.uid;
  //     firebase.database().ref('App_Users/' + uid).update({
  //       token: token,
  //       uid: uid
  //     })

  //   }, (err) => {
  //     console.log(err);
  //     // alert(err)
  //   });
  //   this.fcm.onNotification().subscribe(data => {
  //     if(data.wasTapped){
  //       console.log("Received in background");
  //     } else {
  //       console.log("Received in foreground");
  //     };
  //   });
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     console.log(token);
  //     // alert(token)
  //   }, (err) => {
  //     console.log(err);
  //     // alert(err)
  //   });
  // }


  RemoveOffer(key) {
    console.log(key)
    return new Promise((accpt, rej) => {
      var user = firebase.auth().currentUser
      console.log(key)
      console.log(user.uid)
      this.ngzone.run(() => {
        firebase.database().ref("Offers/" + user.uid + "/" + key).remove();
        accpt("student deleted");
      });
    });
  }

  RemoveOfferRquest(key) {
    console.log(key)
    return new Promise((accpt, rej) => {
      var user = firebase.auth().currentUser
      console.log(key)
      console.log(user.uid)
      this.ngzone.run(() => {
        firebase.database().ref("AddRequestFundings/" + user.uid + "/" + key).remove();
        accpt("student deleted");
      });
    });
  }



  createinbox(key, name, downloadurl, offer, terms, Duration, user, insidekey) {
    return new Promise((accpt, rej) => {
      firebase.database().ref('AcceptedOfferbyoffee/' + key).push({
        name: name,
        downloadurl: downloadurl,
        offer: offer,
        terms: terms,
        Duration: Duration,
        message: "they have accepted your offer",
        user: user,
        insidekey: insidekey
      });
      accpt('inbox sent');
    });
  }

  createinbox2(user, downloadurl1, person, offer, terms, Duration, key, insidekey) {
    return new Promise((accpt, rej) => {
      firebase.database().ref('AcceptedOfferbyOwner/' + user).push({
        downloadurl: downloadurl1,
        person: person,
        offer: offer,
        terms: terms,
        Duration: Duration,
        message: "Accepted",
        key: key,
        insidekey: insidekey
      });
      accpt('inbox sent');
    });
  }


  getcreateinbox() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("AcceptedOfferbyoffee/" + user.uid).on('value', (data: any) => {
        let accDeatils = data.val();
        this.getcreate.length = 0;
        console.log(accDeatils)
        if (data.val() != null || data.val() != undefined) {
          // this.getcreate.length=0;
          let keys2 = Object.keys(accDeatils)
          console.log(keys2)
          // this.getcreate.length=0;
          for (var x = 0; x < keys2.length; x++) {
            let obj = {
              Duration: accDeatils[keys2[x]].Duration,
              name: accDeatils[keys2[x]].name,
              downloadurl: accDeatils[keys2[x]].downloadurl,
              offer: accDeatils[keys2[x]].offer,
              user: accDeatils[keys2[x]].user,
              terms: accDeatils[keys2[x]].terms,
              message: accDeatils[keys2[x]].message,
              insidekey: accDeatils[keys2[x]].insidekey,
              UserKey: user.uid
            }
            console.log(obj)
            this.getcreate.push(obj)
            console.log(this.getcreate)
          }

        }

        accept(this.getcreate)
      })

    })
  }


  getcreateinbox2() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("AcceptedOfferbyOwner/" + user.uid).on('value', (data: any) => {
        let accDeatils = data.val();
        console.log(accDeatils)
        this.getcreate.length = 0;
        if (data.val() != null || data.val() != undefined) {
          let keys2 = Object.keys(accDeatils)
          this.getcreate2.length = 0;
          console.log(keys2)
          for (var x = 0; x < keys2.length; x++) {
            let obj = {
              Duration: accDeatils[keys2[x]].Duration,
              name: accDeatils[keys2[x]].person,
              downloadurl: accDeatils[keys2[x]].downloadurl,
              offer: accDeatils[keys2[x]].offer,
              terms: accDeatils[keys2[x]].terms,
              message: accDeatils[keys2[x]].message,
              key: accDeatils[keys2[x]].key,
              insidekey: accDeatils[keys2[x]].insidekey,
            }
            console.log(obj)
            this.getcreate2.push(obj)
            console.log(this.getcreate2)
          }

        }

      })
      accept(this.getcreate2)
    })
  }


  updateoffereddonation(userkeyPerson, offer, insidekey) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        console.log(user.uid)
        firebase.database().ref("AddRequestFundings/" + userkeyPerson + "/" + insidekey).update({
          offer: offer
        });
      })
    })
  }

  updateofferedmessage(userkeyPerson, message, insidekey) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        console.log(user.uid)
        firebase.database().ref("Offers/" + userkeyPerson + "/" + insidekey).update({
          message: message
        });
      })
    })
  }


}
