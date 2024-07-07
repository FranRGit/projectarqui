import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Interfaces/Cliente';
import { AuthService } from 'src/app/services/auth.service';
import { DataConnectionService } from 'src/app/services/data-connection.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  email= ""
  password= "";
  nombre= "";
  apellido= "";
  telefono= "";
  nuevoCliente:Cliente = {} as Cliente;

  constructor(private userService: AuthService, private clienteService:DataConnectionService, private router:Router){}

  register() {
    // Realizar la autenticación
    this.userService.register(this.email,this.password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid;
        // Autenticación exitosa, ahora guardar en la base de datos
        this.nuevoCliente = {
          ID:userId,
          nombre: this.nombre,
          apellido: this.apellido,
          telefono: this.telefono,
          historial:[],
          email: this.email 
        };
        return this.clienteService.addClientes(this.nuevoCliente)
      })
      .then(() => {
        this.limpiarFormulario();
        alert('Registro exitoso!');
        this.router.navigate(['/usuario']) 
      })
      .catch(error => {
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro. Por favor, inténtalo nuevamente.');
      });
  }

  limpiarFormulario() {
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
  }

}
