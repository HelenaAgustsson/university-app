import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { programService, studentService } from './service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class StudentList extends Component {
  students = [];
  render() {
    return (
      <div>
        <h4>Studenter på NTNU</h4>
        <ul>
          {this.students.map((student, id) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.new}>
          Add new student
        </button>
      </div>
    );
  }
  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
  new() {
    history.push('/new-student');
  }
}

export class StudentDetails extends Component {
  student = null;
  program = '';
  render() {
    if (!this.student) return null;
    return (
      <div>
        <h4>Student informasjon</h4>
        <ul>
          <li>Name: {this.student.name}</li>
          <li>Email: {this.student.email}</li>
          <li>Program: {this.program}</li>
        </ul>
        <button type="button" onClick={this.edit}>
          Edit
        </button>{' '}
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }
  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      // join statement??
      studentService.getStudentsProgram(this.student.program_id, (program) => {
        this.program = program;
      });
    });
  }
  delete() {
    studentService.deleteStudent(this.student.id, () => {
      history.push('/students');
    });
  }
  edit() {}
}

export class StudentNew extends Component {
  student = { name: '', email: '', program_id: '' };
  programs = [];
  render() {
    return (
      <div>
        <h4>Legg til ny student:</h4>
        <ul>
          <li>
            Name:{' '}
            <input
              type="text"
              value={this.student.name}
              onChange={(event) => (this.student.name = event.currentTarget.value)}
            />
          </li>

          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event) => (this.student.email = event.currentTarget.value)}
            />
          </li>
          <li>
            Studieprogram:{this.student.program_id}
            <select
              value={this.student.program_id}
              onChange={(event) => {
                this.student.program_id = event.currentTarget.value;
              }}
            >
              <option>--</option>
              {this.programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <button type="Add" onClick={this.add}>
          Add
        </button>
      </div>
    );
  }

  mounted() {
    programService.getPrograms((programs) => (this.programs = programs));
  }

  add() {
    studentService.addStudent(this.student, () => {
      history.push('/students');
    });
  }
}

export class StudentEdit extends Component {
  student = null;
  programs = [];
  programName = '';

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>
            Name:{' '}
            <input
              value={this.student.name}
              onChange={(event) => {
                this.student.name = event.currentTarget.value;
              }}
            />
          </li>
          <li>Student ID:{this.student.id} </li>
          <li>
            Email:{' '}
            <input
              value={this.student.email}
              onChange={(event) => {
                this.student.email = event.currentTarget.value;
              }}
            />{' '}
          </li>
          <li>
            Studieprogram:{''}
            <select
              value={this.student.program_id}
              onChange={(event) => {
                this.student.program_id = event.currentTarget.value;
              }}
            >
              <option>--</option>
              {this.programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => {
            studentService.updateStudent(this.student, () => {
              history.push('/students/' + this.student.id);
            });
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            studentService.deleteStudent(this.student.id, () => {
              //StudentDetails.instance().mounted();
              //StudentList.instance().mounted();
            });
          }}
        >
          Delete
        </button>
      </div>
    );
  }
  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      programService.getProgram(this.student.program_id, (program) => (this.programName = program));
    });

    programService.getPrograms((programs) => {
      this.programs = programs;
    });
  }
  save() {
    studentService.updateStudent(this.student, () => {
      //history.push('/students/' + this.student.id);
    });
  }
  delete() {
    studentService.deleteStudent(this.student.id, () => history.push('/students'));
  }
}
