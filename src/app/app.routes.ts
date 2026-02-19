import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Layout } from './components/layout/layout/layout';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login-page/login-page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register-page/register-page')
        .then(m => m.RegisterPage)
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [

      {
        path: 'boards',
        loadComponent: () =>
          import('./pages/boards/board-list-page/board-list-page')
            .then(m => m.BoardListPage)
      },

      {
        path: 'boards/:id',
        loadComponent: () =>
          import('./pages/boards/board-detail-page/board-detail-page')
            .then(m => m.BoardDetailPage)
      },

      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'boards'
  }

];
