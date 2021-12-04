import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersettingPage } from './usersetting.page';

const routes: Routes = [
  {
    path: '',
    component: UsersettingPage
  },
  {
    path: 'personalset',
    loadChildren: () => import('../personalset/personalset.module').then( m => m.PersonalsetPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('../test/test.module').then( m => m.TestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersettingPageRoutingModule {}
