import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { PolicyPage } from '../pages/policy/policy';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GiftVoucherPage } from '../pages/gift-voucher/gift-voucher';
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
  ) {
    this.initializeApp();
    //localStorage.setItem('token', '4141');
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Explore', component: ExplorePage },
      { title: 'SignUp', component: SignupPage },
      { title: 'About', component: AboutPage },
      { title: 'Gift', component: GiftVoucherPage },
    ];
    splashScreen.show();
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 2000);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      let userId = localStorage.getItem('userId');
      if (userId != '' && userId != undefined) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = SignupPage;
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
