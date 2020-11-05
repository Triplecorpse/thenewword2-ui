import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    saveSession: new FormControl(false)
  });

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      this.authenticationService.authenticate(this.loginForm.value)
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
