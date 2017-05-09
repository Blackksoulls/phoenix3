import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/*
  Generated class for the Translate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Translate {

  constructor(public http: Http, public Plat: Platform, public translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  langChoose(langState) {
    if (langState == 'fr') {
      this.translate.use('fr');
    }
    else if (langState == 'en') {
      this.translate.use('en');
    }
  }

}
