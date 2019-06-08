import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DraftPostsPage } from './draft-posts.page';
import { ShareModulePageModule } from '../share-module/share-module.module';

const routes: Routes = [
  {
    path: '',
    component: DraftPostsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ShareModulePageModule
  ],
  declarations: [DraftPostsPage]
})
export class DraftPostsPageModule {}
