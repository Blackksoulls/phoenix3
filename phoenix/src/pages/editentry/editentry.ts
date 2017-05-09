import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Data } from '../../providers/data';

@Component({
  selector: 'page-editentry',
  templateUrl: 'editentry.html'
})
export class Edit_entry {

  item: any;

  constructor(public events: Events, public dataService: Data, public navCtrl: NavController) {
    this.item = this.dataService.itemtmp;
  }

  ionViewDidLoad() {
      this.item = this.dataService.itemtmp;
      this.item.oldname = this.item.textcontent;
      console.log('oldname: '+ this.item.oldname)
  }

  edit() {
    this.dataService.editentry(this.item);
    this.navCtrl.pop();
  }

}
