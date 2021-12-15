import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalsetPage } from './personalset.page';
const routes: Routes = [
  {
    path: '',
    component: PersonalsetPage
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
export class PersonalsetPageRoutingModule {}
