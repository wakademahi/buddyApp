import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';

/**
 * Generated class for the TransportationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transportation',
  templateUrl: 'transportation.html',
})
export class TransportationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportationPage');
  }
  gotoPage(){
    this.navCtrl.push(ExplorePage);
  }

}
