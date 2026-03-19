import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolutionsPageRoutingModule } from './solutions-routing.module';

import { SolutionsPage } from './solutions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolutionsPageRoutingModule
  ],
  declarations: [SolutionsPage]
})
export class SolutionsPageModule {}
