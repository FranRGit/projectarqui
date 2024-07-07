import { Component, OnInit } from '@angular/core';
import { GraficoComponent } from '../grafico/grafico.component';
import { InformacionComponent } from '../informacion/informacion.component';
import { Turno } from 'src/app/Interfaces/Turno';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from 'src/app/services/turnos.service';
import { Cliente } from 'src/app/Interfaces/Cliente';

@Component({
  selector: 'app-atencion',
  standalone: true,
  imports: [GraficoComponent,InformacionComponent],
  templateUrl: './atencion.component.html',
  styleUrl: './atencion.component.scss'
})
export class AtencionComponent implements OnInit {
  turnoID="";
  clienteID= "";
  historial: number[] = []
  cliente:Cliente = {} as Cliente;
  turno:Turno = {} as Turno;

  constructor(private route: ActivatedRoute, private turnoService:TurnoService) {
    this.route.queryParams.subscribe(params => {
      this.turnoID=params['id']
    })
  }
  ngOnInit(): void {
    if (this.turnoID) {
      this.turnoService.getTurnoByID(this.turnoID).subscribe(turno => {
        this.turno = turno;
        this.obtenerCliente();
      });
    }
  }

  obtenerCliente(){
    if (this.turno) {
      this.turnoService.getClienteFromTurno(this.turno).subscribe(cliente => {
        this.cliente = cliente
        this.historial = this.cliente.historial;
      });
    }
  }

}
