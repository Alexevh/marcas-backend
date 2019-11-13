import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

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
