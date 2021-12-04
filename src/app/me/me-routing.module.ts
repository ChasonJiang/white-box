import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from './me.component'

const routes: Routes = [
    { 
        path: '', 
        component:MeComponent
    },
  {
    path: 'usersetting',
    loadChildren: () => import('./usersetting/usersetting.module').then( m => m.UsersettingPageModule)
  },  {
    path: 'personalset',
    loadChildren: () => import('./personalset/personalset.module').then( m => m.PersonalsetPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'mytask',
    loadChildren: () => import('./mytask/mytask.module').then( m => m.MytaskPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }


]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeRoutingModule {}