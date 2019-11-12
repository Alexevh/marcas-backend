import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  usuario: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();
    
   }


   onSubmit(form: NgForm){

    if (form.invalid){
      return;
    }

    this.auth.registro(this.usuario).subscribe( resp => {
      this.router.navigateByUrl('/home');
        
    }, (err)=> {

      Swal.fire({
        title: 'Error!',
        text:  err.error.error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })

    });

   }


}
