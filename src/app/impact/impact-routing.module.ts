import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpactPage } from './impact.page';

const routes: Routes = [
  {
    path: '',
    component: ImpactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpactPageRoutingModule {}
