import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';


//Components
import { NavigationComponent } from './templates/navigation/navigation.component';
import { HwpipelineComponent } from './pages/hwpipeline/hwpipeline.component';
import { ScorecardComponent } from './pages/scorecard/scorecard.component';

//Modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PlugandtestComponent } from './pages/plugandtest/plugandtest.component';
import {  ModalModule } from 'ngx-bootstrap/modal';
import { BoardComponent } from './pages/board/board.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HwpipelineComponent,
    ScorecardComponent,
    PlugandtestComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
