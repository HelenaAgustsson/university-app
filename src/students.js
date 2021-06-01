import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { programService, studentService } from './service';

export class StudentList extends Component {
  students = [];
  render() {
    return (
      <div>
        <ul>
          {this.students.map((student, id) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

export class StudentDetails extends Component {
  student = null;
  programName = '';
  render() {
    if (!this.student) return null;
    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>Program name: {this.programName}</li>
      </ul>
    );
  }
  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      programService.getProgram(this.student.program_id, (program) => {
        this.programName = program.name;
      });
    });
  }
}
