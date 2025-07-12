import { NgFor, NgIf } from "@angular/common";
import { Student } from "../../models/student.model";
import { StudentService } from "../../services/student.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Input,Output,EventEmitter } from "@angular/core";


@Component({
    selector: 'app-student-table',
    standalone: true,
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.css'],
    imports:[NgFor, NgIf]
})

export class StudentTable {
    @Input() students: Student[] = [];
    @Output() deleted = new EventEmitter<void>();

    constructor(
        private studentService: StudentService,
        private router: Router,
    ) {}

    goToStudentForm(): void {
        this.router.navigate(['/register-student']);
    }

    onDeleteStudent(id: number): void {
        this.studentService.deleteStudentById(id);
        this.deleted.emit();
    }
}