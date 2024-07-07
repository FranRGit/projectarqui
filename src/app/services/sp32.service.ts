import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sp32Service {

  constructor(private http:HttpClient) {}

  capturarDato(): Observable<string> {
    return this.http.get("http://192.168.1.12/sensor", { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  }

  datoRegistrado():Observable<string> {
    return this.http.get("http://192.168.1.12/registroExitoso", { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  } 
}
