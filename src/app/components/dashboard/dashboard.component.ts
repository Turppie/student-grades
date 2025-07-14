import { Component, OnInit } from "@angular/core";
import { Student } from "../../models/student.model";
import { Course } from "../../models/course.enum";
import { StudentService } from "../../services/student.service";
import { StudentTable } from "../student-table/student-table.component";
import { StudentChart } from "../charts/student.chart.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <app-student-table 
        [students]="students" 
        (deleted)="onStudentDeleted()"
        (courseFilterChanged)="onCourseFilterChanged($event)"
    ></app-student-table>
    <app-student-chart 
        [students]="students"
        [selectedCourse]="selectedCourse"
    ></app-student-chart>
    `,
    imports: [StudentTable, StudentChart]
})

export class DashboardComponent implements OnInit {
    students: Student[] = [];
    selectedCourse: Course | null = null;
    constructor(private studentService: StudentService){}

    ngOnInit(){
        this.students = this.studentService.getStudents();
    }

    onStudentDeleted(){
        this.students = this.studentService.getStudents();
    }

    onCourseFilterChanged(course: Course | null) {
        this.selectedCourse = course;
    }

}