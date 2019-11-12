import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  constructor(private mens: MensajesService) { }

  ngOnInit() {

  }

  async mandarMsj(){

    this.loading = true;
    await this.mens.enviarMensaje('Esto anda bien, 99% hecho').then( ()=>{
      this.loading = false;
    });
    
  }

}
