import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  checkPassword = function (password) {
    return (control) => {
      if(control.value !== password){
        return {"password_notequally": true};
      }
      return null;
    }
  }

  checkNameEmail = function (name, email) {
    return (control) => {
      if(control.value == name){
        return null;
      }else if(control.value == email){
        return null;
      }
      return {"NameEmail_notequally": true};
    }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
