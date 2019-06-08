import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'launch', loadChildren: './launch/launch.module#LaunchPageModule' },
  { path: 'static', loadChildren: './static/static.module#StaticPageModule' },
  { path: 'static/:any', loadChildren: './static/static.module#StaticPageModule' },
  { path: 'wall', loadChildren: './wall/wall.module#WallPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'share-module', loadChildren: './share-module/share-module.module#ShareModulePageModule' },
  { path: 'draft-posts', loadChildren: './draft-posts/draft-posts.module#DraftPostsPageModule' },
  { path: 'draft-posts/:any', loadChildren: './draft-posts/draft-posts.module#DraftPostsPageModule' },  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
