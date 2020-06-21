import { Usuario } from './models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { __decorate } from "tslib";
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = "";
  masks = utilsBr.MASKS;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let confirmeSenha = new FormControl('',
      [
        Validators.required,
        CustomValidators.rangeLength([6, 15]),
        CustomValidators.equalTo(senha)
      ]
    );

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      confirmeSenha: confirmeSenha
    })

  }

  adicionarUsuario() {

    if (this.cadastroForm.dirty && this.cadastroForm.valid) {

      //Objeto tipado
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)

      this.formResult = JSON.stringify(this.cadastroForm.value);

      console.log('Resultado: ', this.usuario);
    }
    else {
      this.formResult = "Não submeteu!";
    }

  }

}
