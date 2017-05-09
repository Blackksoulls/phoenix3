import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Data } from '../../providers/data';
import 'rxjs/add/operator/debounceTime';
import { Storage } from '@ionic/storage';

import { Add_entry } from '../addentry/addentry';
import { Edit_entry } from '../editentry/editentry';
import { Test } from '../test/test';

@Component({
  	selector: 'page-database',
  	templateUrl: 'database.html'
})
export class Database {

    searchTerm: string = '';
    searchControl: FormControl;
  	items: any;
    itemChoosed: any;

	constructor(public view: ViewController, public storage: Storage, public events: Events, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public dataService: Data) {
    setTimeout(this.dataService.getDBlogin(),5);
    setTimeout(this.checkItem(),10);

      events.subscribe('dbReloader', () => {
        this.dataService.showDB(true);
        this.navCtrl.insert(0,Database).then(()=>{
          this.navCtrl.pop();
        });
      });
	}
  checkItem() {
    this.items = this.dataService.items;
  }

  ionViewWillLoad() {
    this.dataService.showDB(false);
    this.items = this.dataService.items;
    this.storage.get('trigger').then((data)=>{
      if (!data) {
        this.navCtrl.insert(0,Test).then(()=>{
          this.navCtrl.pop();
        });
      } else if (this.dataService.voidReturn == "error"){
        this.navCtrl.insert(0,Test).then(()=>{
          this.navCtrl.pop();
        });
      }
    });
  }

  ionViewDidLoad() {
      this.dataService.showDB(true);
      this.search();
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.search();
      });
      // if (this.dataService.items.length == 0) {
      //   this.navCtrl.insert(0, Test);
      //   this.navCtrl.pop();
      // }..
  }

  search() {
      this.items = this.dataService.filterItems(this.searchTerm);
  }

	showAction(item, itemC) {
      this.itemChoosed = itemC;
	   	let actionSheet = this.actionSheetCtrl.create({
	     	title: 'Edit the database',
	     	buttons: [
	     	{
	         	text: 'Add an entry',
	         	handler: () => {
	           		console.log('Add clicked');
	           		this.navCtrl.push(Add_entry);
	         	}
	       	},
	       	{
	         	text: 'Edit: ' + item,
	         	handler: () => {
	           		console.log('Edit clicked');
                console.log(this.itemChoosed)
                this.dataService.itemChoose(this.itemChoosed);
                this.navCtrl.push(Edit_entry);
	         	}
	       	},
	       	{
	         	text: 'Delete: ' + item,
	         	role: 'destructive',
	         	handler: () => {
              this.dataService.eradication(this.itemChoosed.textcontent);
	        	}
	       	},
	       	{
	         	text: 'Cancel',
	         	role: 'cancel',
	         	handler: () => {
	           		console.log('Cancel clicked');
	         	}
	       	}]
	   	});

		actionSheet.present();
	}
}
