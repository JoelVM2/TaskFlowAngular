import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule,RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  error = '';
  isLoading = false;

   register() {
  if (!this.username || !this.email || !this.password) return;

  this.isLoading = true;

  this.authService.register({
    username: this.username,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      this.isLoading = false; 
      this.cdr.detectChanges();
      this.router.navigate(['/login']);
    },
    error: err => {
      this.error = err.error || 'Error al registrarse';
      this.isLoading = false;
    }
  });
}

}

