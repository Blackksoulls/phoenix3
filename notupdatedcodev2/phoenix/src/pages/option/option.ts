import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Translate } from '../../providers/translate'

@Component({
  selector: 'page-option',
  templateUrl: 'option.html'
})
export class Options {
  public langState: any;
  public langSwitch: any;
  public theme: any;
  public dburl: any;
  public dbtable: any;
  public dbuser: any;
  public dbpass: any;
  public dbdb: any;

  constructor(public navCtrl: NavController, public trans: Translate, public Plat: Platform, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.loadStorage();
    this.langSelected();
  }
  saveData() {
    console.log('SAVEDATA CALLED')
    this.storage.set('langSwitch', this.langSwitch);
    this.storage.set('theme', this.theme);
  }

  loadStorage() {
    this.storage.get('langSwitch').then((data)=>{this.langSwitch=data;});
    this.storage.get('theme').then((data)=>{this.theme=data;});
    this.storage.get('dburl').then((data)=>{this.dburl=data;});
    this.storage.get('dbtable').then((data)=>{this.dburl=data;});
    this.storage.get('dbdb').then((data)=>{this.dbdb=data;});
    this.storage.get('dbuser').then((data)=>{this.dbuser=data;});
    this.storage.get('dbpass').then((data)=>{this.dbpass=data;});

    if (this.langSwitch == 'undefined') {
      this.langSwitch = 'default';
      this.storage.set('langSwitch', this.langSwitch);
    } else {
      this.storage.get('langSwitch').then((data)=>{this.langSwitch=data;});
    }

    if (this.theme == 'undefined') {
      this.theme = 'false';
      this.storage.set('theme', this.theme);
    } else {
      this.storage.get('theme').then((data)=>{this.theme=data;});
    }

    if (this.dburl == 'undefined') {
      this.dburl = '';
      this.storage.set('dburl', this.dburl);
      console.log('dburl not set')
    } else {
      this.storage.get('dburl').then((data)=>{this.dburl=data;});
      this.storage.get('dburl').then((data)=>{console.log("dburl "+data);});
    }

    if (this.dbtable == 'undefined') {
      this.dbtable = '';
      this.storage.set('dbtable', this.dbtable);
      console.log('dbtable not set');
    } else {
      this.storage.get('dbtable').then((data)=>{this.dbtable=data;})
      this.storage.get('dbtable').then((data)=>{console.log("dbtable "+data);});
    }

    if (this.dbdb == 'undefined') {
      this.dbdb = '';
      this.storage.set('dbdb', this.dbdb);
      console.log('dbdb not set');
    } else {
      this.storage.get('dbdb').then((data)=>{this.dbdb=data;})
      this.storage.get('dbdb').then((data)=>{console.log("dbdb "+data);});
    }

    if (this.dbuser == 'undefined') {
      this.dbuser = '';
      this.storage.set('dbuser', this.dbuser);
      console.log('dbuser not set')
    } else {
      this.storage.get('dbuser').then((data)=>{this.dbuser=data;});
      this.storage.get('dbuser').then((data)=>{console.log("dbuser "+data);});
    }

    if (this.dbpass == 'undefined' || this.dbpass == '') {
      this.dbpass = '';
      this.storage.set('dbpass', this.dbpass);
      console.log('dbpass not set')
    } else {
      this.storage.get('dbpass').then((data)=>{this.dbpass=data;});
      this.storage.get('dbpass').then((data)=>{console.log("dbpass "+data);});
    }
  }

  saveDBLogin() {
    console.log('SAVEDBLOGIN CALLED')
    this.storage.set('dburl', this.dburl);
    this.storage.set('dbtable', this.dbtable);
    this.storage.set('dbuser', this.dbuser);
    this.storage.set('dbdb', this.dbdb);
    this.storage.set('dbpass', this.dbpass);
  }

  langSelected() {
    this.storage.get('langSwitch').then((data)=>{
      this.langSwitch=data;

      if (this.langSwitch == 'default') {
        this.langState = this.Plat.lang();
        if (this.langState == 'en-US' || this.langState == 'en-UK') {
          this.langState = 'en';
        }
        else if (this.langState == 'fr-FR' || this.langState == 'fr-CA') {
          this.langState = 'fr';
        }
        else {
          this.langState = 'en';
        }
      }

      if (this.langSwitch == 'fr') {
        this.langState = 'fr';
      }
      if (this.langSwitch == 'en') {
        this.langState = 'en';
      }
      this.trans.langChoose(this.langState);
    });
  }
}
