import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntryService} from "../../services/entry.service";

export interface IUser {
  name: string,
  email: string,
  password: string,
  autoEntrance: boolean
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup

  checkedPassword: boolean = false
  checkedLogIn: boolean = false

  @ViewChild('password1') password1: ElementRef
  @ViewChild('password2') password2: ElementRef

  constructor(private fb: FormBuilder, private router: Router, private entry: EntryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {validator: this.entry.checkIfMatchingPasswords('password1', 'password2')})
  }

  submit(): void{
    const formValue = this.form.value

    const newUser = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password2,
      autoEntrance: this.checkedLogIn
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    if(!this.checkedLogIn){
      localStorage.setItem('isUserFirstTime', '1')
    }

    this.router.navigate(['/'])
  }

  showPassword(): void{
    this.checkedPassword = !this.checkedPassword;
    if(this.checkedPassword){
      this.password1.nativeElement.type = 'text'
      this.password2.nativeElement.type = 'text'
    }else{
      this.password1.nativeElement.type = 'password'
      this.password2.nativeElement.type = 'password'
    }
  }

  autoEntrance(): void{
    this.checkedLogIn = !this.checkedLogIn;
  }

}
