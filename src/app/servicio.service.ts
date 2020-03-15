import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  //Conexión a API-HUBRE de ejemplo en heroku//
  api_url='http://apihubre.herokuapp.com/api/clientes';
  constructor(protected http: HttpClient) { }
  getUsers() {
    //return this.http.get('https://randomuser.me/api/?results=5');
    return this.http.get(this.api_url);
  }

}
