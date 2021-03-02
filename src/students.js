import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';
import { ProgramList, ProgramDetails } from './programs';

export class StudentList extends Component {
  students = [];
  render() {
    return (
      <ul>
        {this.students.map((student, id) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }
  mounted() {
    pool.query('SELECT * FROM Students ', [], (error, results) => {
      if (error) return console.log('error');
      this.students = results;
    });
  }
}

export class StudentDetails extends Component {
  student = null;
  program = null;
  render() {
    if (!this.student) return null;
    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>Program id: {this.student.program_id}</li>
        <MyProgram code={this.student.program_id} />
      </ul>
    );
  }
  mounted() {
    pool.query(
      'SELECT * FROM Students  WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.log('error');
        this.student = results[0];
      }
    );
  }
}

export class MyProgram extends Component {
  myProgram = '';
  render() {
    return <li>{this.myProgram.name}</li>;
  }
  mounted() {
    pool.query('SELECT * FROM Programs WHERE id=' + this.props.code, [], (error, results) => {
      if (error) return console.log('error');
      this.myProgram = results[0];
      console.log(this.myProgram.name);
    });
  }
}
