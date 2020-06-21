import { Usuario } from './models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { __decorate } from "tslib";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;

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
    //Objeto tipado
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)

    console.log('Resultado: ', this.usuario);

  }

}
