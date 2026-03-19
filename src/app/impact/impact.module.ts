import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpactPageRoutingModule } from './impact-routing.module';

import { ImpactPage } from './impact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpactPageRoutingModule
  ],
  declarations: [ImpactPage]
})
export class ImpactPageModule {}
