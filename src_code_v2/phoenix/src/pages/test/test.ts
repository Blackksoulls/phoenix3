import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Add_entry } from '../addentry/addentry';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class Test {

  constructor(public navCtrl: NavController) {
  }
  GotoAddItem() {
  	this.navCtrl.push(Add_entry);
  }

}
