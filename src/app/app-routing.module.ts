import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { KuiperLinucCIComponent } from './pages/hwpipeline/hwpipeline.component';
import { ScorecardComponent } from './pages/scorecard/scorecard.component';
import { PlugandtestComponent } from './pages/plugandtest/plugandtest.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hwpipeline', pathMatch: 'full' },
  {
    path: 'hwpipeline',
    component: KuiperLinucCIComponent,
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
    path: 'board',
    component: BoardComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
