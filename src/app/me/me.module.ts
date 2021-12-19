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
import { UsersettingPageModule } from './usersetting/usersetting.module';
import { PersonalsetPageModule } from './personalset/personalset.module';
import { MytaskPageModule } from './mytask/mytask.module';
import { CurrencysetPageModule } from './currencyset/currencyset.module';
import { PpolicyPageModule } from './ppolicy/ppolicy.module';
import { MesecondpageModule } from '../me-components/mesecondpage/mesecondpage.module';
import { MefirstpageModule } from '../me-components/mefirstpage/mefirstpage.module';
import { MeheaderModule } from '../me-components/meheader/meheader.module';
import { UsermessageModule } from '../me-components/usermessage/usermessage.module';
import { UserdataModule } from '../me-components/userdata/userdata.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MeRoutingModule,
    UsersettingPageModule,
    PersonalsetPageModule,
    MytaskPageModule,
    CurrencysetPageModule,
    PpolicyPageModule,
    MesecondpageModule,
    MefirstpageModule,
    MeheaderModule,
    UsermessageModule,
    UserdataModule,
  ]
})
export class MeModule { }
