import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Options } from '../option/option';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class Test {

  constructor(public navCtrl: NavController, public data: Data) {
  }

  // ionViewDidEnter() {
  //   this.navCtrl.setRoot(Data);
  // }
  nya() {
    this.navCtrl.insert(0,Options).then(()=>{
      this.navCtrl.pop();
    });
  }

}
