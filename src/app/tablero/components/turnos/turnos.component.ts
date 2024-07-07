import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Turno } from 'src/app/Interfaces/Turno';
import { DataConnectionService } from 'src/app/services/data-connection.service';
import { TurnoService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {
  
  //---DEFINICION--
  //Constructor
  constructor(private router:Router, private turnoService:TurnoService, private clienteService:DataConnectionService){}

  //Turno
  turnos:Turno[] =[];
  
  //Inicializador
  ngOnInit(): void {
    this.turnoService.getTurnosPorEstado("Por atender").subscribe((turnos:Turno[]) => {
      this.turnos=turnos;
    })
  }

  //--PRUEBA--
  siguienteTurno(idTurno:string){
    this.turnoService.removeTurno(idTurno);  
  }
  //RUTAS
  //Ir al componente de atención
  irAAtencion(turno:Turno){
    if(turno == null){
      console.error("No hay turnos reservados") 
    } else{
      this.router.navigate(['tablero/atencion'], { queryParams: { id: turno.ID } });
    }
  }
}
