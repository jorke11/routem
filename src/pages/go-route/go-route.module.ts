import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoRoutePage } from './go-route';

@NgModule({
  declarations: [
    GoRoutePage,
  ],
  imports: [
    IonicPageModule.forChild(GoRoutePage),
  ],
})
export class GoRoutePageModule {}
