title: APP - Gestion des données

# Gestion des données
## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/prod/phoenix/src/providers/data.ts) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en typescript, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà de ^^bonnes^^ bases en programmation) [TypeScript in Ymin](https://learnxinyminutes.com/docs/typescript/)*

### Imports
```typescript
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Database } from '../pages/database/database'
import { Storage } from '@ionic/storage';
```

* ^^L'ensemble^^ permet d'importer les composants nécessaires à la suite du code (les libs)
* `:::typescript import { Database } from '../pages/database/database'` pour permettre de rediriger l'utilisateur sur la page *Database*

### Déclarations
```typescript
export class Data {
  public items: any;
  itemtmp: any;
  public voidReturn:any;
  public login:any;
  public output:any;
  public trigger:boolean;
```

* `:::typescript export class Data {` permet de déclarer la classe Data qui ici définie le module de gestion des données
* `:::typescript public` ou `:::typescript private` *(si la variable est accessible partout ou pas)* suivi du nom de la variable et de son type `:::typescript nomvariable: type;`

### Construisons les modules exploités par la classe
```typescript
constructor(public events: Events, public http: Http, public alertCtrl: AlertController, public storage: Storage) {
  this.showDB(false);
}
```

* `:::typescript constructor(public nomModule: nomImporte,...){` permet de définir un surnom pour les modules utilisés dans la classe
* `:::typescript this.showDB(false);` appelle la fonction ==showDB== de la classe actuelle, avec le parametre ==false== pour ne pas réinitialiser le tableau des données (*a voir après*)

### Définition des fonctions
#### itemChoose
```typescript
itemChoose(item) {
  this.itemtmp = item;
}
```

* `:::typescript this.itemtmp = item` transforme le parametre item en variable globale appartenant à la classe ==Data==
* *C'est une petite astuce pour sortir une variable d'une promise (^^ne fonctionne pas tout le temps^^ et est ^^déconseillé^^)*

#### filterItems
```typescript
filterItems(searchTerm){
    return this.items.filter((item) => {
        return item.textcontent.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}
```

* `:::typescript return this.items.filer((item) => {` retourne un nouveau tableau contenant les éléments qui passent le teste de la Promise
* `:::typescript return item.textcontent.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;` valide la promise pour les éléments où ==textcontent== *(peut importe majuscule ou miniscule)* est égal à ==searchTerm== *(toujours peut importe maj ou min)*

#### showDB
==**Le code source étant trop grand a mettre ici, il a été déplacé [ici](https://gist.github.com/Blackksoulls/81c1a5dab8bb2cc5b6abed38245abd05#file-showdb-js)**==

##### Partie 1 - recuperer les données
```typescript
function showDB(test) {
  let voidReturn = "";
  let items = [{}];
  var dburlPromise = this.storage.get('dburl');
  var dbtablePromise = this.storage.get('dbtable');
  var dbuserPromise = this.storage.get('dbuser');
  var dbpassPromise = this.storage.get('dbpass');
  var dbdbPromise = this.storage.get('dbdb');

  if (test == true || this.items == undefined) {
    this.items = [{}];
  }
```

* `:::typescript var promiseName = this.storage.get('variable');` associe la promise retournée par `:::typescript this.storage.get('var');` *(qui récupère la valeur de ==var== dans les données locales de l'application)* à une variable plus facile à manipuler
* `:::typescript if(test == true || this.items == undefined) { this.items = [{}]; }` si le parametre de ==showDB== est ^^true^^ ou que ==this.items== n'a pas de valeur ; définie ==this.items== à un tableau vide.

##### Partie 2 - Se préparer à communiquer
```typescript
this.storage.get('trigger').then((trigger)=>{
  if (trigger == true) {
    Promise.all([dburlPromise,dbtablePromise,dbuserPromise,dbpassPromise,dbdbPromise]).then(([dburl,dbtable,dbuser,dbpass,dbdb])=> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let body = {
        host: dburl,
        table: dbtable,
        username: dbuser,
        password: dbpass,
        dbdb: dbdb,
        show:'all'
      };
```

* `:::typescript this.storage.get('trigger').then((trigger)=>{` récupère la valeur locale de ==trigger== et execute après avoir récupéré la valeur, les fonctions suivantes.
* `:::typescript Promise.all([promisesList]).then(([promisesResult])=> {` rassemble toutes les promises et leurs résultats en une fonction.
* `:::typescript headers.append('Content-Type', 'application/x-www-form-urlencoded');` définie dans le header de la requete POST que les parametre sont passés dans un ^^string géant^^ dans l'url sous la forme *key1=value1&key2=value2&key3=...*
* `:::typescript let body = {host: dburl,...};` assigne les résultats des promises à des clés dans le corps de la requete (la construit)

##### Partie 3 - Communiquer avec la BDD
```typescript
this.http.post('https://phoenix3.srv1.rochodc.eu/API/show.php', JSON.stringify(body), {headers: headers})
  .map(res => res.json())
  .subscribe(data => {
    if (data == "error") {
      voidReturn = "error2";
    } else {
      let tmp = 0;
      for (let i of data) {
        items[tmp] = i;
        tmp ++;
      }
      voidReturn = "worked";
    }
  });
});
```

* `:::typescript this.http.post('https://phoenix3.srv1.rochodc.eu/API/show.php', JSON.stringify(body), {headers: headers})` Execute une requete POST sur l'url donnée avec les données contenues dans ==body== encodées en JSON, et le header spécifié dans la variable ==headers==
* `:::typescript .map(res => res.json())` transforme la réponse de la requete en json
* `:::typescript .subscribe(data => {` exploite le résultat en json

#### eradication
==**Le code source étant trop grand a mettre ici, il a été déplacé [ici](https://gist.github.com/Blackksoulls/81c1a5dab8bb2cc5b6abed38245abd05#file-eradication-js)**==

Une grande partie du principe est le meme que pour [showDB](#showdb)

#### addentry
==**Le code source étant trop grand a mettre ici, il a été déplacé [ici](https://gist.github.com/Blackksoulls/81c1a5dab8bb2cc5b6abed38245abd05#file-addentry-js)**==

Une grande partie du principe est le meme que pour [showDB](#showdb)

```typescript
if ((data.textcontent == undefined) || (data.price == undefined) || (data.nb == undefined) || (data.datevalue == undefined)) {
  this.popup('Please fill all the form');
  return 0;
} else {
  if (data.pic == undefined || data.pic == "") {
    data.pic = 'http://git.kuro.ml/sample.jpg';
  }
```
Cette partie teste si les parametre sur la page sont définis ou pas et si la photo n'est pas précisée en rajoute une de test.

#### editentry
==**Le code source étant trop grand a mettre ici, il a été déplacé [ici](https://gist.github.com/Blackksoulls/81c1a5dab8bb2cc5b6abed38245abd05#file-editentry-js)**==

Une grande partie du principe est le meme que pour [showDB](#showdb)
