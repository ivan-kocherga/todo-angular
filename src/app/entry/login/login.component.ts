import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  checkedPassword: boolean = false

  @ViewChild('password') password: ElementRef

  private User = JSON.parse(localStorage.getItem('user'))

  constructor(private fb: FormBuilder, private router: Router, private entry: EntryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name_email: new FormControl('', [Validators.required, this.entry.checkNameEmail(this.User.name, this.User.email)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(8), this.entry.checkPassword(this.User.password)]),
    })
  }

  showPassword(): void {
    this.checkedPassword = !this.checkedPassword;
    if(this.checkedPassword){
      this.password.nativeElement.type = 'text'
    }else{
      this.password.nativeElement.type = 'password'
    }
  }

  autoEntrance(): void {
    this.User.autoEntrance = !this.User.autoEntrance
  }

  submit(): void {
    if(this.User.autoEntrance){
      localStorage.removeItem('isUserFirstTime')
    }else {
      localStorage.setItem('isUserFirstTime', '1')
    }
    localStorage.setItem('user', JSON.stringify(this.User))
    this.router.navigate(['/'])
  }

}


