import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpolicyPage } from './ppolicy.page';

const routes: Routes = [
  {
    path: '',
    component: PpolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpolicyPageRoutingModule {}
