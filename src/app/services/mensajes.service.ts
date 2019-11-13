import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient,) { }

  async  enviarMensaje(mensaje: string){

    let msj =  {
      "app_id": "3e4701e1-60f8-438a-9b8a-30f1670987ca",
      "included_segments": ["All"],
      "data": {"mensaje": mensaje},
      "contents": {"en": mensaje}
    };

    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic M2JhNzA3MDItMGY1Yi00MDM0LWI0N2ItNThhNGI2OTJhYTIz"
    };

    return new Promise( resolve => {

      this.http.post(`https://onesignal.com/api/v1/notifications`, msj, { headers })
        .subscribe( resp => {
          console.log('me llega de respuesta', resp)
          
          resolve(true);
        });
    });

  }




}
