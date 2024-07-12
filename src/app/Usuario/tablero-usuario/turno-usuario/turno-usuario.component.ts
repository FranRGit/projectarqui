import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Interfaces/Cliente';
import { Turno } from 'src/app/Interfaces/Turno';
import { AuthService } from 'src/app/services/auth.service';
import { DataConnectionService } from 'src/app/services/data-connection.service';
import { Sp32Service } from 'src/app/services/sp32.service';
import { TurnoService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turno-usuario.component.html',
  styleUrl: './turno-usuario.component.scss'
})
export class TurnoUsuarioComponent {

  user:User | null;
  clientesEnCola: string | number = "Cargando..."; ;
  cliente:Cliente = {} as Cliente;
  turnos:Turno[] = [];
  turno:Turno | null = {} as Turno;
  clienteReference: DocumentReference  = {} as DocumentReference;
  estadoTurno="";

  constructor(private userService:AuthService, private router:Router, private clienteService:DataConnectionService, private turnoService:TurnoService, private sp32Service:Sp32Service){
    this.user = this.userService.getCurrentUser();
  }


  ngOnInit(): void {
      if (this.user) {
        this.clienteService.getClienteByID(this.user.uid).subscribe(cliente => {
          this.cliente = cliente
          this.obtenerTurno();
          this.turnoService.getTurnosPorEstado("Por atender").subscribe((turnos: Turno[]) => {
            this.turnos = turnos;
            this.clientesEnCola = this.calcularClientesFaltantes();
            if(this.clientesEnCola==0){
              this.clientesEnCola="Esperando resultados..."
            }
          });
  
        });
      }
  }

  obtenerTurno(){
      this.turnoService.getTurnoByCliente(this.cliente.ID).subscribe(turno => {
          this.turno = turno;       
      })
  }
  

  calcularClientesFaltantes(): number {
    let indexClienteActual = -1;
  
    for (let i = 0; i < this.turnos.length; i++) {
      const turno = this.turnos[i];
      
      if (turno.cliente.path == this.turno?.cliente.path) {
        indexClienteActual = i;
        break; 
      }
    }
  
    return indexClienteActual;
  }


  cancelarTurno(){
    if(this.turno){
      this.turnoService.removeTurno(this.turno?.ID)
      this.router.navigate(['/usuario']) 
    }
  }
  
  salirSesion(){
    this.userService.logout();
  }
}
