import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any={ 
  required: 'No debe estar vacío',
  email:'El correo no es válido'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent  implements OnInit, OnChanges{
  
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMesages: string[] = [];


  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  
  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
    this.checkValidation()}
    )
    this.control.valueChanges.subscribe(() =>{
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMesages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMesages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}
