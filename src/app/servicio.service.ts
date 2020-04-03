import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from './models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  //Conexión a API-HUBRE de ejemplo en heroku//
  api_GEDI_url='http://localhost:3000/server';
  constructor(private http: HttpClient) { }

  getInstitutos(){
    return this.http.get(this.api_GEDI_url+'/leerInstituto');
  }

  getCarreras(){
    return this.http.get(this.api_GEDI_url+'/leerCarrera');
  }

  getRol(){
    return this.http.get(this.api_GEDI_url+'/leerRol');
  }

  getUsers() {
    //return this.http.get(this.api_url);
    return this.http.get(this.api_GEDI_url+'/leerUsuarios');
  }

  setUser(usuario: Usuarios){
    //console.log('setUsuario:_',usuario);
    return this.http.post(this.api_GEDI_url+'/registrarUsuario',usuario);    
  }

}
