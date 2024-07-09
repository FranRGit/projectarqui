import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/Interfaces/Cliente';
import { DataConnectionService } from 'src/app/services/data-connection.service';
import { Router, RouterModule } from '@angular/router';
import { Turno } from 'src/app/Interfaces/Turno';
import { TurnoService } from 'src/app/services/turnos.service';
import { Sp32Service } from 'src/app/services/sp32.service';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {
  
  //Variables BD
  datoSensor= "";
  @Input() turnoID="";
  turno: Turno = {} as Turno;
  cliente:Cliente ={} as Cliente;


  //Constructor
  constructor(private sp32Service:Sp32Service, private clienteService:DataConnectionService, private router:Router, private turnoService: TurnoService) {}
  

  //OBTENER CLIENTE
  ngOnInit(): void {
    if (this.turnoID) {
      this.turnoService.getTurnoByID(this.turnoID).subscribe(turno => {
        this.turno = turno;
        console.log(this.turno)
        this.obtenerCliente();
      });
    }
  }

  obtenerCliente(){
    if (this.turno) {
      this.turnoService.getClienteFromTurno(this.turno).subscribe(cliente => {
        this.cliente = cliente;
      });
    }
  }

  //CAPTURAR DATOS DEL SENSOR
  capturarDatosSensor(){
    this.sp32Service.capturarDato().subscribe(response => {
      this.datoSensor= response;
    })
  }


  //REGISTRAR
  registrar(){
    if(this.turno){
      let altura: number = parseFloat(this.datoSensor);
      this.clienteService.updateCliente(this.cliente,altura);
      this.turnoService.updateTurnoEstado(this.turno.ID);
      this.sp32Service.datoRegistrado().subscribe(response => {
      })
    }
    else{
      alert("Turno cancelado")
    }
    this.irATurnos();
  }

  //REGRESAR PANEL TURNOS
  irATurnos(){
    this.router.navigate(['tablero/turnos']) 
  }

  
}
