import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/student-form/student-form.component').then((m)=>m.RegisterStudent)
    }
];
