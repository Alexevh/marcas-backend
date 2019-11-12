import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  constructor(private auth: AuthService, private router: Router) { }
  loading = false;
  recordarme = false;

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }


  login(form: NgForm){

    this.loading= true;

    if (form.invalid){
      this.loading = false;
      return;
    }

    this.auth.login(this.usuario).subscribe(resp => {
  ;
      this.loading = false;

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      
      this.router.navigateByUrl('/home');
    }, (err)=> {
      console.log(err.error.error.message);
      this.loading = false;
      Swal.fire({
        title: 'Error!',
        text:  err.error.error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })

    })

  }

}
