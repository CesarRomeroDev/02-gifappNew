import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPegeComponent } from './gifs-pege/gifs-pege.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPegeComponent,
    BusquedaComponent,
    ResultadosComponent
  ],
  exports: [
    GifsPegeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
