import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { __decorate } from "tslib";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.cadastroForm = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl(''),
      confirmeSenha: new FormControl('')
    })

  }

  adicionarUsuario() {
    let x = this.cadastroForm.value
    console.log('Resultado: ', x);

  }

}
