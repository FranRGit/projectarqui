import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    email= ""
    password= "";

    constructor(private userService: AuthService, private router:Router) {}
    login(){
      this.userService.login(this.email,this.password)
      .then(() => {       
        alert('Inicio de sesion exitoso!');
        this.router.navigate(['/usuario']) 
      })
      .catch(error => {
        this.limpiarFormulario();
        alert('Hubo un error en el inicio de sesión. Por favor, inténtalo nuevamente.');
      });  
    }

    limpiarFormulario() {
      this.email = '';
      this.password = '';
    }
}
