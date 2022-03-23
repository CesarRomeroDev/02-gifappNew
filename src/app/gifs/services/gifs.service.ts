import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'pI9n7APMJPo0BNPF0YhLw2xdjBfXWqsq'; //url
  private servicioUrl: string = 'https://api.giphy.com/v1/stickers'; //url
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  /**
   * hacer peticiones https
   * @param http hacemos llamar a nuestro modulo que nos ofrece angular httpClient
   */
  constructor(
    private http: HttpClient
  ) {
    //para almacenar informacion en el navegador, di carga la pagina, no se pierden resultados.
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  /**
   * unshift: inserta al ultimo de la cola un elemento o puede ser con push tambien 
   * push al inicio.
   */
  buscarGifs(query: string) {

    /**
     * trim : para quitar espacios adelante y atras
     * .tolocaleLowerCase : para tener entradas solo en minuscular
     */

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) { //include : si existe o se incluye "!" si no lo incluye insertalo, si lo incluye no insertes
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10); //para cortar el historial solo se viasualizan 10
      /** JSON.strinify : toma cualquier ojbeto y lo hace string */
      localStorage.setItem('historial', JSON.stringify(this._historial)); //para guardar historial en pagina web si 
    }

    //params de la url
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    //antes de utilizar rl http tenemos que importar el modulo a nuestro modulo raiz.
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        /** JSON.strinify : toma cualquier ojbeto y lo hace string */
        localStorage.setItem('resultados', JSON.stringify(this.resultados)); //para guardar historial en pagina web si 
      })

    /**
     * fetch : proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP
     * .then regresa una promesa( obtendriamos la respuesta  )
     * de la respuesta se pasa al .json, otra promesa que tiene su .then( data y hacemos el consolo de data )
     * Así se haría una petición http con java script
     */
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=pI9n7APMJPo0BNPF0YhLw2xdjBfXWqsq&q=Dragon').then(resp => {
    //   resp.json().then(data => console.log(data))
    // })
  }
}
