import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => this.router.navigate(['/boards']),
        error: () => this.error = 'Credenciales incorrectas'
      });
  }
}
