import { Routes } from "@angular/router";

export const STUDENT_ROUTES: Routes = [
     {
        path: 'register-student',
        loadComponent: () => import('./student-form/student-form.component').then((m)=>m.RegisterStudent)
    },
    {
        path: '',
        loadComponent: () => import('./student-table/student-table.component').then((m)=>m.StudentTable)
    }
]