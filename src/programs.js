import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { programService } from './service';

export class ProgramList extends Component {
  programs = [];
  render() {
    return (
      <div>
        <h4>Bachelor program på NTNU</h4>
        <ul>
          {this.programs.map((program, id) => (
            <li key={program.id}>
              <NavLink to={'/programs/' + program.id}>{program.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  mounted() {
    programService.getPrograms((programs) => {
      this.programs = programs;
      console.log(this.programs);
    });
  }
}

export class ProgramDetails extends Component {
  program = null;
  render() {
    if (!this.program) return null;
    return (
      <div>
        <h4>{this.program.name}</h4>
        <div>Studenter på dette programmet:</div>
        <ProgramStudents programcode={this.program.id} />
      </div>
    );
  }
  mounted() {
    programService.getProgram(this.props.match.params.id, (program) => {
      this.program = program;
    });
  }
}

class ProgramStudents extends Component {
  students = [];
  render() {
    return (
      <ul>
        {this.students.map((student, id) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    );
  }
  mounted() {
    programService.getProgramStudents(this.props.programcode, (students) => {
      this.students = students;
    });
  }
}
