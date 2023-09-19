import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signup/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.value = 'Seu email aqui';
    this.passwordInputRef.nativeElement.value = 'Sua senha aqui';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();

              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response?.name}!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer o login!`,
              life: 2000,
            });
            console.error(err);
          },
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário criado com sucesso!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao criar usuário!`,
              life: 2000,
            });
            console.error(err);
          },
        });
    }
  }
}
