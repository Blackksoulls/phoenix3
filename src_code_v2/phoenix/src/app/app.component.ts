import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page2 } from '../pages/page2/page2';
import { Home } from '../pages/home/home';
import { Database } from '../pages/database/database';
import { Options } from '../pages/option/option';
import { About } from '../pages/about/about';
import { Test } from '../pages/test/test';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page Two', component: Page2 },
      { title: 'Accueil', component: Home },
      { title: 'BDD', component: Database },
      { title: 'Parametres', component: Options },
      { title: 'A propos', component: About },
      { title: 'Test Area', component: Test}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
