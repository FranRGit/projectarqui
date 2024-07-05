import { Component } from '@angular/core';
import { InformacionComponent } from './components/informacion/informacion.component';
import { GraficoComponent } from './components/grafico/grafico.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [InformacionComponent,GraficoComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss'
})
export class TableroComponent{

}
