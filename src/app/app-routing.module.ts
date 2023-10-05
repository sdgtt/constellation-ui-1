import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { KuiperlinuxciComponent } from './pages/kuiperlinuxci/kuiperlinuxci.component';
import { ScorecardComponent } from './pages/scorecard/scorecard.component';
import { PlugandtestComponent } from './pages/plugandtest/plugandtest.component';
import { SelectedboardComponent } from './pages/selectedboard/selectedboard.component'

export const routes: Routes = [
  { path: '', redirectTo: '/kuiperlinuxci', pathMatch: 'full' },
  {
    path: 'kuiperlinuxci',
    component: KuiperlinuxciComponent,
  },
  {
    path: 'scorecard',
    component: ScorecardComponent,
  },
  {
    path: 'plugandtest',
    component: PlugandtestComponent,
  },
  {
    path: 'selectedboard/:boardName',
    component: SelectedboardComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
