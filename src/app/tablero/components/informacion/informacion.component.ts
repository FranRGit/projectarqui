import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/Interfaces/Cliente';
import { DataConnectionService } from 'src/app/services/DataConnection/data-connection.service';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {
  //HTTP
  private ESP32_IP = '192.168.50.240';
  private ESP32_URL = `http://${this.ESP32_IP}`;

  //Variables BD
  datoSensor= "";
  selectedCliente:Cliente | null = null;
  clientes:Cliente[] = [];
  Nombre="";
  Apellido="";
  Telefono="";
  Email="";

  //Constructor
  constructor(private http: HttpClient, private firebase:DataConnectionService) {}

  //Inicialización
  ngOnInit(): void {
    this.firebase.getClientes().subscribe((clientes:Cliente[]) => {
      console.log(clientes);
      this.clientes=clientes;
    })
    
  }

  //Datos del Cliente
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedID = selectElement.value;
    this.selectedCliente = this.clientes.find(cliente => cliente.ID === selectedID) || null;
  }



  //HTML SENSOR
  sensor(){
    this.http.get("http://192.168.50.240/sensor", {responseType: 'text'}).subscribe(response => {
      this.datoSensor = response;
    });
  }
}
