import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Database } from '../pages/database/database'
import { Storage } from '@ionic/storage';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  public items: any;
  itemtmp: any;
  public voidReturn:any;
  public login:any;
  public output:any;
  public trigger:boolean;

  constructor(public events: Events, public http: Http, public alertCtrl: AlertController, public storage: Storage) {
    this.showDB(false);
    this.getDBlogin();
  }

  itemChoose(item) {
    this.itemtmp = item;
  }

  filterItems(searchTerm){
      return this.items.filter((item) => {
          return item.textcontent.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
  }

  getDBlogin() {
    var dburlPromise = this.storage.get('dburl');
    var dbtablePromise = this.storage.get('dbtable');
    var dbuserPromise = this.storage.get('dbuser');
    var dbpassPromise = this.storage.get('dbpass');
    var dbdbPromise = this.storage.get('dbdb');

    Promise.all([dburlPromise,dbtablePromise,dbuserPromise,dbpassPromise,dbdbPromise]).then(([r0,r1,r2,r3,r4])=> {
      console.log('r0',r0); //host
      console.log('r1',r1); //table
      console.log('r2',r2); //user
      console.log('r3',r3); //pass
      console.log('r4',r4); //dbname

      if (r0 == "" || r0 == undefined) {
        console.log(r0);
        this.storage.set('trigger', false);
      } else {
        this.storage.set('trigger', true);
      }
      this.storage.get('trigger').then((data)=>{
        if (r1 == "" || r1 == undefined || !data) {
          console.log(r1);
          this.storage.set('trigger', false);
        }
      });
      this.storage.get('trigger').then((data)=>{
        if (r2 == "" || r2 == undefined || !data) {
          console.log(r2);
          this.storage.set('trigger', false);
        }
      });
      this.storage.get('trigger').then((data)=>{
        if (r4 == "" || r4 == undefined || !data) {
          console.log(r4);
          this.storage.set('trigger', false);
        }
      });
      this.storage.get('trigger').then((data)=>{
        if (data) {
          this.storage.set('trigger', true);
        }
        console.log('DATA',data);
      });
    });
  }

  showDB(test) {
    console.log('SHOWDB CALLED')

    this.getDBlogin();

    var dburlPromise = this.storage.get('dburl');
    var dbtablePromise = this.storage.get('dbtable');
    var dbuserPromise = this.storage.get('dbuser');
    var dbpassPromise = this.storage.get('dbpass');
    var dbdbPromise = this.storage.get('dbdb');

    if (test == true || this.items == undefined) {
      this.items = [{}];
    }
    this.storage.get('trigger').then((data)=>{
      if (data) {
        console.log('test passed')
        Promise.all([dburlPromise,dbtablePromise,dbuserPromise,dbpassPromise,dbdbPromise]).then(([dburl,dbtable,dbuser,dbpass,dbdb])=> {
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let body = {
            host: dburl,//'localhost',
            table: dbtable,//'item_database',
            username: dbuser,//'root',
            password: dbpass,//'',
            dbdb: dbdb,//'phoenix3',
            show:'all'
          };
          console.log(body);

          this.http.post('http://localhost/phoenix3/show.php', JSON.stringify(body), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
              if (data == "error") {
                this.voidReturn = "error";
              } else {
                for (let i in data) {
                  this.items[i] = data[i];
                }
                this.voidReturn = "worked";
              }
            });
        });
      } else {
        this.voidReturn = "error";
      }
    });
  }

  eradication(name) {
    let data = this.getDBlogin();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = {
      host: 'localhost',
      table: 'item_database',
      username: 'root',
      password: '',
      dbdb: 'phoenix3',
      item_name: name,
    };
    console.log(body);

    this.http.post('http://localhost/phoenix3/delete.php', JSON.stringify(body), {headers: headers})
      .subscribe(data => {
        if(data){
          this.popup("Entry Deleted Successfully!")
        }
        else{
          this.popup("Can not Delete Entry")
        }
      });
      setTimeout(this.showDB(true),500);
  }

  addentry(data) {
    if (data != undefined) {
      if ((data.textcontent == undefined) || (data.price == undefined) || (data.nb == undefined) || (data.datevalue == undefined)) {
        this.popup('Please fill all the form');
        return 0;
      } else {
        if (data.pic == undefined || data.pic == "") {
          data.pic = 'http://blackksoulls.github.io/src/pp.png';
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = {
          host: 'localhost',
          table: 'item_database',
          username: 'root',
          password: '',
          dbdb: 'phoenix3',
          textcontent: data.textcontent,
          price: data.price,
          nb: data.nb,
          datevalue: data.datevalue,
          pic: data.pic,
        };

        this.http.post('http://localhost/phoenix3/addentry.php', JSON.stringify(body), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            if(data == "1"){
              this.popup("Entry Created Successfully!")
            }
            else if(data == "2"){
              this.popup("Can not Create Entry")
            }
            else if(data == "0") {
              this.popup("Entry name Already Exists")
            }
            setTimeout(this.showDB(true),500);
          });
        }
      }
    }

    editentry(data) {
      this.getDBlogin();
      if (data != undefined) {
        if ((data.textcontent == undefined) || (data.price == undefined) || (data.nb == undefined) || (data.datevalue == undefined)) {
          this.popup('Please fill all the form');
          return 0;
        } else {
          if (data.pic == undefined) {
            data.pic = 'http://git.kuro.ml/sample.jpg';
          }

          let db = this.getDBlogin();

          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          let body = {
            host: 'localhost',
            table: 'item_database',
            username: 'root',
            password: '',
            dbdb: 'phoenix3',
            textcontent: data.textcontent,
            price: data.price,
            nb: data.nb,
            datevalue: data.datevalue,
            pic: data.pic,
            oldname: data.oldname,
          };

          this.http.post('http://localhost/phoenix3/editentry.php', JSON.stringify(body), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
              console.log('edit data: '+data)
              if(data == "1"){
                this.popup("Entry Edited Successfully!")
              }
              else {
                this.popup("Can not Edit Entry")
              }
              setTimeout(this.showDB(true),500);
            });
          }
        }
      }

    popup(text) {
      let alert = this.alertCtrl.create({
        title: 'Info!',
        subTitle: text,
        buttons: ['ok ~ ♫']
      });
      alert.present();
    }
}
