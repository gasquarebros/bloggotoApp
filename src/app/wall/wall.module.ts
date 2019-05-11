import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { IonicModule } from '@ionic/angular';
import { PostPopover } from './post-popover';
import { ModelPostComponent } from '../wall/model-post/model-post.component';
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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WallPage,
    PostPopover,
    ModelPostComponent,
    LoginHeaderComponent
  ],
  exports: [
    // LoginHeaderComponent
  ],
  entryComponents: [
    PostPopover,
    ModelPostComponent
  ]
})
export class WallPageModule {}
