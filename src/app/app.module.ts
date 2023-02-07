import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';



//Components
import { NavigationComponent } from './templates/navigation/navigation.component';
import { ScorecardComponent } from './pages/scorecard/scorecard.component';
import { KuiperlinuxciComponent } from './pages/kuiperlinuxci/kuiperlinuxci.component';

//Modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PlugandtestComponent } from './pages/plugandtest/plugandtest.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ScorecardComponent,
    PlugandtestComponent,
    KuiperlinuxciComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NgSelectModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
