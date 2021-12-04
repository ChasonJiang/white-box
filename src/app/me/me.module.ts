import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';
import { TestComponent } from '../test/test.component';
import { UserdataComponent } from '../me-components/userdata/userdata.component';
import { UsermessageComponent } from '../me-components/usermessage/usermessage.component';
import { MeheaderComponent } from '../me-components/meheader/meheader.component';
import { MefirstpageComponent } from '../me-components/mefirstpage/mefirstpage.component';
import { MesecondpageComponent } from '../me-components/mesecondpage/mesecondpage.component';
import { MytaskPage } from './mytask/mytask.page';


@NgModule({
  declarations: [MeComponent,TestComponent,UserdataComponent,UsermessageComponent,MeheaderComponent,MefirstpageComponent,MesecondpageComponent,TestComponent,MytaskPage],
  imports: [
    CommonModule,
    MeRoutingModule,
  ]
})
export class MeModule { }
