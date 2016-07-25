import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  public nbtot: any;
  public nbadd: any;
  public items: any;
  public voidd: boolean;

  constructor(public event: Events, public storage: Storage, public navCtrl: NavController,public dataService: Data) {
    setTimeout(()=>{
      this.dataService.getDBlogin();
      this.dataService.showDB(false);
    }, 700);
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.dataService.getDBlogin();
      this.dataService.showDB(false);
    }, 700);
  }

  ionViewDidEnter() {
    this.nbadd = 0;
    this.nbtot = 0;
    this.storage.get('trigger').then((data)=>{
      if (data) {
        console.log('test home passed');
        this.dataService.showDB(false);
        if (this.dataService.voidReturn == "worked") {
          console.log('IT WORK');
          for (let i in this.dataService.items) {
              this.nbtot ++;
          }
          for (let i in this.dataService.items) {
              this.nbadd = this.nbadd + Number(this.dataService.items[i].nb);
          }
        }
      }
    });
  }
}
