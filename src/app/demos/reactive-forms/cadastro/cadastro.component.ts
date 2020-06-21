import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { __decorate } from "tslib";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      confirmeSenha: ['']
    })

  }

  adicionarUsuario() {
    let x = this.cadastroForm.value
    console.log('Resultado: ', x);

  }

}
