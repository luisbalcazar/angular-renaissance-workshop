import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLogin } from '../../interfaces/auth-login.interface';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styles: ``,
})
export class RegisterForm {
  sendRegister = output<AuthLogin>();
  private readonly formBuilder = inject(FormBuilder);
  message = '';

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const register: AuthLogin = this.registerForm.value;
      this.sendRegister.emit(register);
    }
  }
}
