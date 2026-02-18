import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login-page/login-page')
        .then(m => m.LoginPage)
  },
  {
    path: 'boards',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/boards/board-list-page/board-list-page')
        .then(m => m.BoardListPage)
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full'
  }
];
