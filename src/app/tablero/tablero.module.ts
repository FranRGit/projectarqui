import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoComponent } from './components/grafico/grafico.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { TableroComponent } from './tablero.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule


@NgModule({
  declarations: [
    GraficoComponent,
    InformacionComponent,
    TableroComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports:[
    GraficoComponent,
    InformacionComponent
  ],
})
export class TableroModule { }
