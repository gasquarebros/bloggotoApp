import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShareModulePage } from './share-module.page';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { CommonPostComponent } from './common-post/common-post.component';
import { CommonServicesComponent } from './common-services/common-services.component';
import { CommonProductsComponent } from './common-products/common-products.component';
import { CommonFooterComponent } from './common-footer/common-footer.component';
import { ModelPostComponent } from './model-post/model-post.component';
import { PostPopover } from './common-post/post-popover';
import { YoutubePlayerModule } from 'ng2-youtube-player';

const routes: Routes = [
  {
    path: '',
    component: ShareModulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    YoutubePlayerModule
    // RouterModule.forChild(routes)
  ],
  declarations: [
    ShareModulePage,
    LoginHeaderComponent,
    CommonPostComponent,
    ModelPostComponent,
    PostPopover,
    CommonServicesComponent,
    CommonProductsComponent,
    CommonFooterComponent
  ],
  exports: [
    LoginHeaderComponent,
    CommonPostComponent,
    ModelPostComponent,
    PostPopover,
    CommonServicesComponent,
    CommonProductsComponent,
    CommonFooterComponent
  ],
  entryComponents: [
    PostPopover,
    ModelPostComponent
  ]
})
export class ShareModulePageModule {}
