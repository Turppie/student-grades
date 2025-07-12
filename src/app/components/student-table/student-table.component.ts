import { NgFor, NgIf } from "@angular/common";
import { Student } from "../../models/student.model";
import { StudentService } from "../../services/student.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'app-student-table',
    standalone: true,
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.css'],
    imports:[NgFor, NgIf]
})

export class StudentTable {
    students: Student[] = [];

    constructor(
        private studentService: StudentService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.students = this.studentService.getStudents();
        console.log(this.students);
    }

    goToStudentForm(): void {
        this.router.navigate(['/register-student']);
    }

    onDeleteStudent(id: number): void {
        this.studentService.deleteStudentById(id);
    }
}