import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url= 'https://identitytoolkit.googleapis.com/v1/accounts:';
private apikey = 'AIzaSyBcYONowUBx6ThdKV-c12cEVjRhQQF4YDc';
private usertoken = null;

  /* crear nuevo usuarop
  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  logearse
  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  */


  constructor(private http: HttpClient, private router: Router) { 
    this.leerToken();
    
  }

logout(){

  localStorage.removeItem('token');
  this.router.navigateByUrl('/login');
}

login(usuario: UsuarioModel){
  const authData = {
    email: usuario.email,
    password: usuario.password,
    returnSecureToken: true

  }

  return this.http.post(` ${this.url}signInWithPassword?key=${this.apikey}`, authData ).pipe(map( resp => {
    this.guardarToken(resp['idToken']);
    
    return resp;
  }));
}

registro(usuario: UsuarioModel){

  const authData = {
    email: usuario.email,
    password: usuario.password,
    returnSecureToken: true

  }

  return this.http.post(` ${this.url}signUp?key=${this.apikey}`, authData ).pipe(map( resp => {
    this.guardarToken(resp['idToken']);
    return resp;
  }));

}


private guardarToken(idtoken: string){

 this.usertoken = idtoken;
 localStorage.setItem('token', idtoken);

 let hoy = new Date();
 //seteo la fecha de xpiracion en una hora
 hoy.setSeconds(3600);

 localStorage.setItem('expira', hoy.getTime().toString());

}

private leerToken(){
  if (localStorage.getItem('token')){
   
    this.usertoken = localStorage.getItem('token');
  } else {
    this.usertoken = '';
    
  }

  return this.usertoken;
}

estaAutenticado(){

   if (this.usertoken.length < 2) {
     return false;
   }

  const expira = Number (localStorage.getItem('expira'));
  const expiraDate = new Date();
  expiraDate.setTime(expira);

  if (expiraDate > new Date()){
    return true;
  } else {
    return false
  }

}

}
