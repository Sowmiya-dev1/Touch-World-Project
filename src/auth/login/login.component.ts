import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      terms: [false, Validators.requiredTrue] 
    });
  }

  login() {
    const { username, password } = this.loginForm.value;

    if (username === 'touchworld' && password === 'touchworldTech') {
      this.router.navigate(['/employee-listing']);
    } else {
      this.errorMessage = 'Invalid Username or Password!';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
