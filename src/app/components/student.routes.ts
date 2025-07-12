import { Routes } from "@angular/router";

export const STUDENT_ROUTES: Routes = [
     {
        path: 'register-student',
        loadComponent: () => import('./student-form/student-form.component').then((m)=>m.RegisterStudent)
    },
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then((m)=>m.DashboardComponent)
    }
]