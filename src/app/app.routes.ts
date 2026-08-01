import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home').then((m) => m.Home);
    }
  },
  {
    path: 'todos',
    loadComponent: () => {
      return import('./todos/todos').then((m) => m.Todos);
    }
  },
  {
    path: 'aaronsgame',
    loadComponent: () => {
      return import('./components/aarons-game/aarons-game').then((m) => m.AaronsGame);
    }
  },
];
