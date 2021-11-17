import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent }from './navigation.component';

const routes:Routes=[
    {
        path:"navigation",
        component:NavigationComponent,
        children:[
        {
            path: 'home', 
            loadChildren:()=>import("../home/home.module").then(m=>m.HomeModule)
        },
        {
            path: 'community', 
            loadChildren:()=>import("../community/community.module").then(m=>m.CommunityModule)
        },
        {
            path: 'store', 
            loadChildren:()=>import("../store/store.module").then(m=>m.StoreModule)
        },
        {
            path: 'me', 
            loadChildren:()=>import("../me/me.module").then(m=>m.MeModule)
        },
        {
            path: '',
            redirectTo: '/navigation/home',
            pathMatch:"full"
        }
        ]
    },
    {
        path: '',
        redirectTo: '/navigation/home',
        pathMatch:"full"
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class NavigationRoutingModule{}