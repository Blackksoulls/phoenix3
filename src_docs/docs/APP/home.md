title: APP - Main page

# Acceuil
## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/prod/phoenix/src/pages/home/home.ts) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en typescript, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà de ^^bonnes^^ bases en programmation) [TypeScript in Ymin](https://learnxinyminutes.com/docs/typescript/)*

### ionViewDidEnter
```typescript
ionViewDidEnter() {
    this.nbadd = 0;
    this.nbtot = 0;
    this.storage.get('trigger').then((data)=>{
      if (data) {
        this.dataService.showDB(false);
        if (this.dataService.voidReturn == "worked") {
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
```

* `:::typescript ionViewDidEnter() {` permet que lorsque la page est chargé et l'utilisateur dessus executer la fonction
* `:::typescript this.storage.get('trigger').then((data)=>{` permet de récuperer la valeur de ==trigger== stocké en local. Grace à la promise retournée par ^^storage.get^^
* `:::typescript this.dataService.showDB(false);` vas actualiser la base de donnée locale
* `:::typescript if (this.dataService.voidReturn == "worked") {` si la valeur ==voidReturn== du gestionnaire ==dataService== est égale à *worked* alors execute la fonction
* `:::typescript for (let i in this.dataService.items) {this.nbtot ++;}` pour chaque élément dans le tableau ==items== du gestionnaire de données (dataService) augmente le total d'éléments différents
* `:::typescript for (...){this.nbadd = this.nbadd + Number(this.dataService.items[i].nb);}` pour chaque élément dans le tableau ==items== du gestionnaire de données ajoute au nombre total d'éléments la valeur convertie en nombre de la clé nb de l'élément itéré par la boucle **for**
