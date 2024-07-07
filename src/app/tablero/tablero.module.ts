import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    DemoFlexyModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule
  ],
  exports:[],
})
export class TableroModule { }
