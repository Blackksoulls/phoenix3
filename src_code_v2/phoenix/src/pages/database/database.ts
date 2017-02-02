import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';


import { Add_entry } from '../addentry/addentry';

@Component({
  	selector: 'page-database',
  	templateUrl: 'database.html'
})
export class Database {

  	items: any;

	constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
	    this.items = [
	    	{ name: "Smth",  price: 20, nb: 2, datevalue: "20/06/2017"},
	    	{ name: "Yay",  price: 10, nb: 40, datevalue: "20/06/2017"},
	    	{ name: "Bruh",  price: 5, nb: 200, datevalue: "20/06/2017"},
	    	{ name: "Nya",  price: 100, nb: 1, datevalue: "20/06/2017"},
	    ];
	}

	showAction(item) {
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
	         	}
	       	},
	       	{
	         	text: 'Delete: ' + item,
	         	role: 'destructive',
	         	handler: () => {
	           		console.log('Delete clicked');
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
