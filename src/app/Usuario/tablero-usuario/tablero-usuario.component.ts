import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { Cliente } from 'src/app/Interfaces/Cliente';
import { Turno } from 'src/app/Interfaces/Turno';
import { AuthService } from 'src/app/services/auth.service';
import { DataConnectionService } from 'src/app/services/data-connection.service';
import { Sp32Service } from 'src/app/services/sp32.service';
import { TurnoService } from 'src/app/services/turnos.service';
import { GraficoComponent } from 'src/app/tablero/components/grafico/grafico.component';


@Component({
  selector: 'app-tablero-usuario',
  standalone: true,
  imports: [CommonModule,GraficoComponent,RouterModule],
  templateUrl: './tablero-usuario.component.html',
  styleUrl: './tablero-usuario.component.scss'
})
export class TableroUsuarioComponent implements OnInit{

  user:User | null;
  historial:number[]=[];
  constructor(private userService: AuthService,private router:Router, private clienteService:DataConnectionService, private turnoService:TurnoService, private sp32Service:Sp32Service) {
    this.user = this.userService.getCurrentUser();
  }
  cliente:Cliente = {} as Cliente

  ngOnInit(): void {
    if (this.user) {
      this.clienteService.getClienteByID(this.user.uid).subscribe(cliente => {
        this.cliente = cliente;
        this.historial=this.cliente.historial
    });
    }
  }
  

  salirSesion(){
    this.userService.logout();
  }

  solicitarTurno(){
    if(this.user){
      const id=this.user?.uid;
      const clienteDocRef=this.clienteService.getClienteDocumento(id);
        const nuevoTurno: Turno = {
        ID: '', 
        timestamp: new Date(), 
        estado: 'Por atender',
        cliente: clienteDocRef 
      };
      this.turnoService.addTurno(nuevoTurno,clienteDocRef)
      this.router.navigate(['/turno']) 
    }
  }


}
