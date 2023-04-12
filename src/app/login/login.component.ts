import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submitLogin() {
    if (this.loginForm.valid) {
      this.isSubmitted = false;
      this.apiService
        .post('users/login', this.loginForm.value)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err && err.message) {
              this.messageService.add({
                detail: err.message,
                severity: 'Error',
                summary: 'Login',
              });
            }
            return of(err);
          })
        )
        .subscribe((data: any) => {
          if(data && data.token){
            this.messageService.add({
              detail: 'Login success',
              severity: 'Success',
              summary: 'Login',
            });
            localStorage.setItem('token', data.token);
            this.router.navigate(['create'])
          }
          console.log(data);
        });
    }
    return (this.isSubmitted = true);
  }
}
