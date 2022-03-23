import { Component, ElementRef, ViewChild, } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  /**
   * @ViewChild : este se importa de angular/core
   * dentro del parentesis se pone el nombre del elemento que queremos buscar
   */
  /**
   * (!:) este elemento siempre va a traer un elemento nuesca va hacer null
   * txtBuscar no se a inicializado por eso manda error por eso se agrega !
   */

  /** BUSCAR **********************************************************/
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /**
   * constructor hacemos llamar nuestros atributos de clase padre 
   * @param gifsService arreglo basio para insertar  
   */
  constructor(
    private gifsService: GifsService //proviene de gifs.service.ts
  ) { }

  /**
   * .trim : Limpiar espacios, adelante y atras.
   * .length : para saber el numero.
   */
  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = ""; // Para dejar basio la caja de texto del input al dar enter
  }
  /** END BUSCAR *****************************************************/

}
