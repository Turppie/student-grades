import { NgFor, NgIf } from "@angular/common";
import { Student } from "../../models/student.model";
import { Course } from "../../models/course.enum";
import { StudentService } from "../../services/student.service";
import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { Input,Output,EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-student-table',
    standalone: true,
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.css'],
    imports:[NgFor, NgIf, FormsModule]
})

export class StudentTable implements OnInit, OnChanges {
    @Input() students: Student[] = [];
    @Output() deleted = new EventEmitter<void>();
    @Output() courseFilterChanged = new EventEmitter<Course | null>();
    
    selectedCourse: Course | null = null;
    courses = Object.values(Course);
    filteredStudents: Student[] = [];

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

    ngOnInit() {
        this.filterStudents();
    }

    ngOnChanges() {
        this.filterStudents();
    }

    filterStudents() {
        if (this.selectedCourse) {
            this.filteredStudents = this.students.filter(student => student.course === this.selectedCourse);
        } else {
            this.filteredStudents = [...this.students];
        }
    }

    onCourseFilterChange() {
        this.filterStudents();
        this.courseFilterChanged.emit(this.selectedCourse);
    }

    clearFilter() {
        this.selectedCourse = null;
        this.filterStudents();
        this.courseFilterChanged.emit(null);
    }
}