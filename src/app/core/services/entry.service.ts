import { Injectable, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IReturnType<Type> {
  (a: FormControl): Type;
}

type TControl =
  | { NameEmail_notequally: boolean }
  | { password_notequally: boolean }
  | null;

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor() {}

  checkPassword(password: string): IReturnType<TControl> {
    return (control: FormControl): TControl => {
      if (control.value !== password) {
        return { password_notequally: true };
      }
      return null;
    };
  }

  checkNameEmail(name: string, email: string): IReturnType<TControl> {
    return (control: FormControl): TControl => {
      if (control.value == name) {
        return null;
      } else if (control.value == email) {
        return null;
      }
      return { NameEmail_notequally: true };
    };
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ): (group: FormGroup) => any {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
