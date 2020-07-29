import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntryService} from "../../services/entry.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  checkedPassword = false

  @ViewChild('password') password

  private User = JSON.parse(localStorage.getItem('user'))

  constructor(private fb: FormBuilder, private router: Router, private entry: EntryService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name_email: new FormControl('', [Validators.required, this.entry.checkNameEmail(this.User.name, this.User.email)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(8), this.entry.checkPassword(this.User.password)]),
    })
  }

  showPassword(){
    this.checkedPassword = !this.checkedPassword;
    if(this.checkedPassword){
      this.password.nativeElement.type = 'text'
    }else{
      this.password.nativeElement.type = 'password'
    }
  }

  autoEntrance(){
    this.User.autoEntrance = !this.User.autoEntrance
  }

  submit() {
    localStorage.setItem('user', JSON.stringify(this.User))
    this.router.navigate(['/todos'])
  }

}


