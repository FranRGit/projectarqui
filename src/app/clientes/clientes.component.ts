import { Component, OnInit } from '@angular/core';
import { DataConnectionService } from '../services/data-connection.service';
import { Cliente } from '../Interfaces/Cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{
  constructor(private clienteService:DataConnectionService){}
  clientes:Cliente[] =[];

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes=clientes;
    })
  }
}
