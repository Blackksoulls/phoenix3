import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Data } from '../../providers/data'

import { Database } from '../database/database'

@Component({
  selector: 'page-addentry',
  templateUrl: 'addentry.html'
})
export class Add_entry {

  add = {};

  constructor(public events: Events, public datacontrol: Data, public navCtrl: NavController) {
  }

  addentry () {
    this.datacontrol.addentry(this.add);
    this.navCtrl.pop();
  }
}
