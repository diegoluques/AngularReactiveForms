import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: 'data-binding.component.html'
})
export class DataBindingComponent {

  public contadorClique: number = 0;
  public urlImage: string = "https://angular.io/assets/images/logos/angular/angular.svg";
  public nome: string = "";

  adicionarClique() {
    this.contadorClique += 1;
  }

  zerarContador() {
    this.contadorClique = 0;
  }

  // keyUp(event: any) {
  //   this.nome = event.target.value;
  // }

}
