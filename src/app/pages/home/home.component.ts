import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../services/mensajes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  mensaje ='';
  constructor(private mens: MensajesService) { }

  ngOnInit() {

  }

  async mandarMsj(){

    this.loading = true;
    await this.mens.enviarMensaje(this.mensaje).then( ()=>{
      this.loading = false;
    });
    
  }

}
