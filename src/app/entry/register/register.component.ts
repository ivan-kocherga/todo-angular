import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntryService} from "../../services/entry.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  checkedPassword = false
  checkedLogIn = false

  @ViewChild('password1') password1
  @ViewChild('password2') password2

  constructor(private fb: FormBuilder, private router: Router, private entry: EntryService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {validator: this.entry.checkIfMatchingPasswords('password1', 'password2')})
  }

  submit(){
    const formValue = this.form.value

    const newUser = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password2,
      autoEntrance: this.checkedLogIn
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    this.router.navigate(['/todos'])
  }

  showPassword(){
    this.checkedPassword = !this.checkedPassword;
    if(this.checkedPassword){
      this.password1.nativeElement.type = 'text'
      this.password2.nativeElement.type = 'text'
    }else{
      this.password1.nativeElement.type = 'password'
      this.password2.nativeElement.type = 'password'
    }
  }

  autoEntrance(){
    this.checkedLogIn = !this.checkedLogIn;
  }

}
