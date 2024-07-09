import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TurnoService } from './services/turnos.service';
import { Sp32Service } from './services/sp32.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private intervalId: any;
  private subscription: Subscription = new Subscription();
  numeroTurnos= 0;

  constructor(private turnosService:TurnoService, private sp32Service:Sp32Service){}
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.turnosService.getTurnos().subscribe(turnos => {
        this.numeroTurnos = turnos.length;
      });
      this.subscription.add(
        this.sp32Service.turnosActuales(this.numeroTurnos).subscribe(response => {
          console.log('Respuesta del servidor:', response);
        })
      );
    }, 1000);  }

  title = 'flexy-angular';
}
