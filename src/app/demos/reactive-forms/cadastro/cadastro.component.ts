import { Usuario } from './models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { __decorate } from "tslib";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = "";

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmeSenha: ['', Validators.required]
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
