import { Observable, fromEvent, merge } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';

import { __decorate } from "tslib";
import { Usuario } from './models/usuario';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) FormInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = "";
  mask = utilsBr.MASKS;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {}

  constructor(private fb: FormBuilder) {

    this.validationMessages = {
      nome: {
        required: 'Nome é obrigatório',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'CPF é obrigatório',
        cpf: 'CPF inválido'
      },
      email: {
        required: 'E-mail é obrigatório',
        email: 'E-mail inválido'
      },
      senha: {
        required: 'Senha é obrigatório',
        rangeLength: 'A Senha deve possuir entre 6 e 15 caracteres'
      },
      confirmeSenha: {
        required: 'Confirme a Senha é obrigatório',
        rangeLength: 'A Senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

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
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      confirmeSenha: confirmeSenha
    })

  }

  ngAfterViewInit() {

    //Cria uma coleção de observables que são disparadas através do evento blur for disparado
    let controlBlurs: Observable<any>[] = this.FormInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    //Pega todas as coleções de observables e faz o subscribe para todas 
    merge(...controlBlurs).subscribe(() => {
      //Subscribe é chamda toda vez que perde o foco do formuláio (input)
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
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
