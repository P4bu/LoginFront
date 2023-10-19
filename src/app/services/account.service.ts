import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { sitLaboral } from '../models/sit-laboral';

const URL = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient, private router:Router) { }

  //enviar las respuestas por el formulario
    answer(){}

  register(userRegister:any){

    this.http.post(`${URL}/api/Account/register`, userRegister).subscribe({
      next: (resp:any) => {
        this.router.navigate(['/'])
        console.log(resp);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  loginUser(userLogin:any){
    return this.http.post(`${URL}/api/Account/login`, userLogin)
  }

  checkToken(){
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this.http.get(`${URL}/api/Account/user`, {headers}).subscribe({
      next: (resp:any) => {
        if(!resp.ok){
          this.router.navigate(['/']);
        }
      },
      error: error => {
        this.router.navigate(['/']);
      }
    })
  }

  getSitLaboral(){

    return this.http.get(`${URL}/api/Account/getSitLaboral`)

  }

  getModalidades(){

    var resp = this.http.get(`${URL}/api/Account/getModalidades`)
    console.log(resp)
    return resp

  }

  getComunasRes(){

    return this.http.get(`${URL}/api/Account/getComunasRes`)

  }

  getComunasTra(){

    return this.http.get(`${URL}/api/Account/getComunasTra`)

  }
}


