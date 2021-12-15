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
  },
  {
    path: 'currencyset',
    loadChildren: () => import('../currencyset/currencyset.module').then( m => m.CurrencysetPageModule)
  },
  {
    path: 'ppolicy',
    loadChildren: () => import('../ppolicy/ppolicy.module').then( m => m.PpolicyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersettingPageRoutingModule {}
