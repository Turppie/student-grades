import { Injectable } from "@angular/core";
import { Student } from "../models/student.model";
import { Course } from "../models/course.enum";

@Injectable({providedIn: 'root'})
export class StudentService {
    private key = 'students';

    constructor() {
        this.initializeData();
    }

    private initializeData(): void {
        if (!localStorage.getItem(this.key)) {
            const initialStudents: Student[] = [
                { id: 1, name: 'Ana García', score: 18, course: Course.MATEMATICAS },
                { id: 2, name: 'Carlos López', score: 15, course: Course.FISICA },
                { id: 3, name: 'María Rodríguez', score: 19, course: Course.QUIMICA },
                { id: 4, name: 'Juan Pérez', score: 16, course: Course.MATEMATICAS },
                { id: 5, name: 'Laura Martín', score: 17, course: Course.HISTORIA }
            ];
            this.saveStudents(initialStudents);
            localStorage.setItem('student_id_counter', '5');
        }
    }

    private saveStudents(students: Student[]): void {
        localStorage.setItem(this.key, JSON.stringify(students));
    }

    getNextId(): number {
        const raw = localStorage.getItem('student_id_counter');
        const nextId = raw? parseInt(raw,10) +1 : 1; // se parsea a decimal y se le suma 1, si no hay valor se pone 1 por defecto 
        localStorage.setItem('student_id_counter',nextId.toString());
        return nextId;
    }
    
    getStudents(): Student[] {
        const raw = localStorage.getItem(this.key);
        return raw? JSON.parse(raw): [];
    }

    registerStudent(student: Student): void {
        const current = this.getStudents();
        if (current.some(s=>s.id === student.id)) {
            throw new Error('ID duplicado');
            
        }
        current.push(student);
        this.saveStudents(current);
    }

    deleteStudentByName(name: string): void {
        const updated = this.getStudents().filter(s=>s.name !==name);
        this.saveStudents(updated);
    }

    deleteStudentById(id: number): void {
        const updated = this.getStudents().filter(s=>s.id !==id);
        this.saveStudents(updated);
    }

    updateScoreById(id: number, newScore: number): void {
        const students = this.getStudents();
        const updated = students.map(s => {
            if (s.id === id) {
                return {...s, score: newScore};

            }
            return s;
        });
        
        this.saveStudents(updated);
    }

    updateScoreByName(name: string, newScore: number): void {
        const students = this.getStudents();
        const updated = students.map(s => {
            if (s.name === name) {
                return {...s, score: newScore};

            }
            return s;
        });
        
        this.saveStudents(students);
    }

    

}