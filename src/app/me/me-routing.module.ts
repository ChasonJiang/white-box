import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from './me.component'

const routes: Routes = [
    { 
        path: '', 
        component:MeComponent
    },
  // {
  //   path: 'usersetting',
  //   loadChildren: () => import('./usersetting/usersetting.module').then( m => m.UsersettingPageModule)
  // },
  // {
  //   path: 'personalset',
  //   loadChildren: () => import('./personalset/personalset.module').then( m => m.PersonalsetPageModule)
  // },
  // {
  //   path: 'mytask',
  //   loadChildren: () => import('./mytask/mytask.module').then( m => m.MytaskPageModule)
  // },
  // {
  //   path: 'currencyset',
  //   loadChildren: () => import('./currencyset/currencyset.module').then( m => m.CurrencysetPageModule)
  // },
  // {
  //   path: 'ppolicy',
  //   loadChildren: () => import('./ppolicy/ppolicy.module').then( m => m.PpolicyPageModule)
  // },



]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeRoutingModule {}