title: APP - Parametres

# Page des parametres
## Code source
Lien du raw sur [github](https://raw.githubusercontent.com/Blackksoulls/phoenix3/prod/phoenix/src/pages/option/option.ts) *(Pour le telecharger voir dans la partie [Support](../help.md) de la doc)*

## Explication du fonctionnement
*Le code est en typescript, pour vous remettre dedans ou pour débuter rapidement (si vous avez déjà de ^^bonnes^^ bases en programmation) [TypeScript in Ymin](https://learnxinyminutes.com/docs/typescript/)*

### ionViewDidLoad
```typescript
ionViewDidLoad() {
  this.loadStorage();
  this.langSelected();
}
```
Lorsque la page charge en cache, actualise la langue selectionnée et les différents parametres existants

### saveData
```typescript
saveData() {
  this.storage.set('langSwitch', this.langSwitch);
  this.storage.set('theme', this.theme);
}
```
Enregistre la langue et le thème en local

### loadStorage
```typescript
loadStorage() {
  this.storage.get('variablelocale').then((data)=>{this.variablelocale=data;});

  if (this.variablelocale == 'undefined') {
    this.variablelocale = 'default';
    this.storage.set('variablelocale', this.variablelocale);
  } else {
    this.storage.get('variablelocale').then((data)=>{this.variablelocale=data;});
  }
}
```
Voilà comment sauvegarder les données à l'écran, charge la variable locale, puis regarde sa valeur si `:::typescript undefined` alors la met à sa valeur par défaut et la sauvegarde en local. Sinon actualise la variable a l'écran

### saveDBLogin
```typescript
saveDBLogin() {
  this.storage.set('dburl', this.dburl);
  this.storage.set('dbtable', this.dbtable);
  this.storage.set('dbuser', this.dbuser);
  this.storage.set('dbdb', this.dbdb);
  this.storage.set('dbpass', this.dbpass);
}
```
Stocke les variables à l'écran en local

### langSelected (non exploité pour le moment)
```typescript
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
```

* `:::typescript if (this.langSwitch == 'default') {...}` si l'option de langue est à défaut, utilise la langue du sytème
* `:::typescript if (this.langState == 'en-US' || this.langState == 'en-UK') {...}` en fonction du code de langue du système définie ==langState== à soit ^^fr^^ soit ^^en^^
* `:::typescript this.trans.langChoose(this.langState);` définie les traductions à utiliser en fonction de ==langState== qui est soit à ^^fr^^ soit à ^^en^^
