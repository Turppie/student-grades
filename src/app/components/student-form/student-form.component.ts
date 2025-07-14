import { NgIf, NgFor } from "@angular/common";
import { Student } from "../../models/student.model";
import { Course } from "../../models/course.enum";
import { StudentService } from "../../services/student.service";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-student-form',
    standalone: true,
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.css'],
    imports: [FormsModule, NgIf, NgFor]

})

export class RegisterStudent {
    studentName = '';
    studentScore: number = 0;
    selectedCourse: Course = Course.MATEMATICAS;
    error = '';
    courses = Object.values(Course);

    constructor(
        private studentService: StudentService,
        private router: Router,
    ) {}

    async onRegisterStudent(){
        if (!this.studentName.trim()){
            this.error = 'El nombre de estudiante es obligatorio';
            return;
        }
        if (this.studentScore<0 || this.studentScore>20){
            this.error = 'La nota debe estar entre 0 y 20';
            return;
        }
        this.error = '';

        const id = this.studentService.getNextId();
        const request: Student = {
            id,
            name: this.studentName.trim(),
            score: this.studentScore,
            course: this.selectedCourse
        };

        this.studentService.registerStudent(request)
        this.studentName = '';
        this.studentScore = 0;
        this.selectedCourse = Course.MATEMATICAS;
    }

    goHome(): void{
        this.router.navigate(['']);
    }
}

