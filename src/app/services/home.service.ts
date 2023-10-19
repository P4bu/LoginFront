import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient, private router:Router ) { }

  getIdUser(){
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get('https://localhost:44300/api/Home/getUsuario', {headers});
  }

  getTransportes(){
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get('https://localhost:44300/api/Home/getTransportes', {headers});
  }

  getTipoTransportes(){
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get('https://localhost:44300/api/Home/getTipoTransportes', {headers});
  }

  submitEncuesta(encuestaDTO: any, Id: string, esCompartido: boolean):Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestData = {
      _encuestaDTO: encuestaDTO,
      Id: Id,
      esCompartido: esCompartido
    };

    return this.http.post(`https://localhost:44300/api/Home/submitEncuesta`, requestData, {headers: headers});
  }
}
