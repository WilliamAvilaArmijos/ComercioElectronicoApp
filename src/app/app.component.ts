import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nombreComponent:string = 'William';
  apellidoComponent:string = 'Avila';
  respuesta:string = '';
  title = 'ComercioElectronicoApp';

  onSaludar(mensaje:string){
    console.log(mensaje);
    this.respuesta=mensaje;
  }
}
