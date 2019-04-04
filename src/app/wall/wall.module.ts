import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { IonicModule } from '@ionic/angular';

import { WallPage } from './wall.page';

const routes: Routes = [
  {
    path: '',
    component: WallPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WallPage,
    LoginHeaderComponent
  ],
  exports: [
    LoginHeaderComponent
  ]
})
export class WallPageModule {}
