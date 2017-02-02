import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { Home } from '../pages/home/home';
import { Database } from '../pages/database/database';
import { Database_item } from '../pages/dbitem/dbitem';
import { Add_entry } from '../pages/addentry/addentry';
import { Options } from '../pages/option/option';
import { About } from '../pages/about/about';
import { Test } from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp,
    Page2,
    Home,
    Database,
    Database_item,
    Add_entry,
    Options,
    About,
    Test
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    Home,
    Database,
    Database_item,
    Add_entry,
    Options,
    About,
    Test
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
