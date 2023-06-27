import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { SelectedboardComponent } from './pages/selectedboard/selectedboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ScorecardComponent,
    PlugandtestComponent,
    KuiperlinuxciComponent,
    SelectedboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule ,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot()

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
