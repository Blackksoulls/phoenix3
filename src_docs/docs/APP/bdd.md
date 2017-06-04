title: APP - Database

# Page affichage base de donnée
## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/prod/phoenix/src/pages/database/database.ts) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en typescript, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà de ^^bonnes^^ bases en programmation) [TypeScript in Ymin](https://learnxinyminutes.com/docs/typescript/)*

### Constructeur
```typescript
events.subscribe('dbReloader', () => {
  this.dataService.showDB(true);
  this.navCtrl.insert(0,Database).then(()=>{
    this.navCtrl.pop();
  });
});
```

* `:::typescript events.subscribe('dbReloader', () => {` écoute les appels de l'évenement ==dbReloader== et execute la fonction suivante si appelé
* `:::typescript this.dataService.showDB(true);` actualise la base de donnée locale
* `:::typescript this.navCtrl.insert(0,Database).then(()=>{this.navCtrl.pop();});` ajoute la page *Database* en premier donc sous la page actuelle et enlève la page actuelle (ici *Database* aussi)

### ionViewWillLoad
```typescript
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
```

* `:::typescript this.items = this.dataService.items;` actualise la variable ==items== de la page avec la variable ==items== du gestionnaire de données ==dataService==
* `:::typescript this.storage.get('trigger').then((data)=>{` permet de récuperer la valeur de ==trigger== stocké en local. Grace à la promise retournée par ^^storage.get^^

### ionViewDidLoad
```typescript
ionViewDidLoad() {
  this.dataService.showDB(true);
  this.search();
  this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.search();
  });
}
search() {
  this.items = this.dataService.filterItems(this.searchTerm);
}
```

* Cette fonction est appelée une fois lorsque la page est chargée en cache
* `:::typescript this.items = this.dataService.filterItems(this.searchTerm);` assigne à la variable ==items== la valeur retournée par le gestionnaire de données en filtrant en fonction du terme entré
* `:::typescript this.searchControl.valueChanges.debounceTime(700).subscribe(search => {` en cas de changement sur la variable ==searchControl== execute le code suivant, en ignorant tout les changement durant les prochaines 700ms (pour eviter la surcharge d'appels sur la fonction)

### Context menu
```typescript
showAction(item, itemC) {
  this.itemChoosed = itemC;
 	let actionSheet = this.actionSheetCtrl.create({
   	title: 'texte nommant le menu',
   	buttons: [
   	{
       	text: 'texte sur le bouton',
       	handler: () => {
         	//something to execute
       	}
     	}
     	}]
 	});
  actionSheet.present();
}
```

* `:::typescript actionSheet.present();` permet d'activer *l'actionSheet*
