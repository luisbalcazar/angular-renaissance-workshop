import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLogin } from '../../interfaces/auth-login.interface';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styles: ``,
})
export class LoginForm {
  sendLogin = output<AuthLogin>();
  private readonly formBuilder = inject(FormBuilder);
  message = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginFormGroup.valid) {
      this.sendLogin.emit(this.loginFormGroup.value);
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }
}
