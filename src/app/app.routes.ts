import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/student.routes').then(m=>m.STUDENT_ROUTES)
    }
];
