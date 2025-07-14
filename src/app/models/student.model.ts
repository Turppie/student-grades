import { Course } from './course.enum';

export interface Student { // export nos permite usar la interfaz fuera de este archivo
    id: number;
    name: string;
    score: number;
    course: Course;
}

