import { Component } from "@angular/core";
import { Student } from "../../models/student.model";
import { StudentService } from "../../services/student.service";
import { StudentTable } from "../student-table/student-table.component";
import { StudentChart } from "../charts/student.chart.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <app-student-table [students]="students" (deleted)="onStudentDeleted()"></app-student-table>
    <app-student-chart [students]="students"></app-student-chart>
    `,
    imports: [StudentTable, StudentChart]
})

export class DashboardComponent {
    students: Student[] = [];
    constructor(private studentService: StudentService){}

    ngOnInit(){
        this.students = this.studentService.getStudents();
    }

    onStudentDeleted(){
        this.students = this.studentService.getStudents();
    }

}