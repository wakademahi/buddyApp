import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public auth: AuthProvider, public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ShowOtp = false;
  showOtpDiv = false;
  otp: any;
  checkNumber(val) {
    if (val.length == 10) {
      this.ShowOtp = true
    } else {
      this.ShowOtp = false;
    }
  }
  tempId;
  sendOtp(val) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: false,
      dismissOnPageChange: true
    });
    loader.present();
    this.auth.authenticate(val).then((data: any) => {
      console.log(data);
      if (data.status == 'Sent OTP') {
        loader.dismiss();
      // this.otp = data.signInOTPList.otp;
        this.tempId = data.user_id;
        this.showOtpDiv = true;
        this.ShowOtp = false;
      } else {
        loader.dismiss();
        this.showOtpDiv = false;
        this.ShowOtp = true;
      }
    });
  }

  next(el) {
    el.setFocus();
  }
  otpAdd = [];
  res = [];
  verify(val) {
    let newOtp = val.otp1 + '' + val.otp2 + '' + val.otp3 + '' + val.otp4;
    // this.navCtrl.push(HomePage);
    console.log(newOtp + '==' + this.otp);
    this.auth.verify(newOtp,this.tempId).then((data: any) => {
      if (data.status == 'success') {
        localStorage.setItem('userId', this.tempId);
        this.auth.getCards(1, '').then((data: any) => {
          if (data.cardDetails != null) {
            this.res.push(data);
            localStorage.setItem('cards', JSON.stringify(this.res));
            setTimeout(() => {
              this.navCtrl.push(HomePage);
            }, 100);
          }
        });
      } else { }
    });
  }

}

