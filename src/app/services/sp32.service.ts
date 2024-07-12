import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sp32Service {

  constructor(private http:HttpClient) {}

  capturarDato(): Observable<string> {
    return this.http.get("http://192.168.5.240/sensor", { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  }

  datoRegistrado():Observable<string> {
    return this.http.get("http://192.168.5.240/registroExitoso", { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  } 

  turnosActuales(numero: number): Observable<string> {
    const params = new HttpParams().set('numero', numero.toString());
    return this.http.get("http://192.168.5.240/numeroTurnos", { params, responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  }
}
