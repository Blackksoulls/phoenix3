import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { Home } from '../pages/home/home';
import { Database } from '../pages/database/database';
import { Add_entry } from '../pages/addentry/addentry';
import { Edit_entry } from '../pages/editentry/editentry'
import { Options } from '../pages/option/option';
import { About } from '../pages/about/about';
import { Test } from '../pages/test/test';

import { Data } from '../providers/data';
import { Translate } from '../providers/translate'

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });// optional config);
}

@NgModule({
  declarations: [
    MyApp,
    Home,
    Database,
    Add_entry,
    Edit_entry,
    Options,
    About,
    Test
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Database,
    Add_entry,
    Edit_entry,
    Options,
    About,
    Test
  ],
  providers: [Storage, Data, Translate, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
