import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

export class ProgramList extends Component {
  programs = [];
  render() {
    return (
      <ul>
        {this.programs.map((program, id) => (
          <li key={program.id}>
            <NavLink to={'/programs/' + program.id}>{program.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }
  mounted() {
    pool.query('SELECT * FROM Programs ', [], (error, results) => {
      if (error) return console.log('error');
      this.programs = results;
    });
  }
}

export class ProgramDetails extends Component {
  program = null;
  render() {
    if (!this.program) return null;
    return (
      <ul>
        <li>Name: {this.program.name}</li>
        <li>Code: {this.program.id}</li>
      </ul>
    );
  }
  mounted() {
    pool.query(
      'SELECT * FROM Programs WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.log('error');
        this.program = results[0];
      }
    );
  }
}

export class MyStudents extends Component {
  myStudents = [];
  render() {
    return <li>{this.mySt.name}</li>;
  }
  mounted() {
    pool.query('SELECT * FROM Students WHERE id=' + this.props.code, [], (error, results) => {
      if (error) return console.log('error');
      this.myProgram = results[0];
      console.log(this.myProgram.name);
    });
  }
}
