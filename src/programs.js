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
      <div>
        <ul>
          <li>Name: {this.program.name}</li>
          <li>Code: {this.program.id}</li>
        </ul>
        <div>Studenter på dette programmet:</div>
        <MyStudents procode={this.program.id} />
      </div>
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
  relStudents = [];
  render() {
    return <ul>{this.relStudents}</ul>;
  }
  mounted() {
    pool.query(
      'SELECT * FROM Students WHERE program_id=' + this.props.procode,
      [],
      (error, results) => {
        if (error) return console.log('error');
        results.map((student) => this.relStudents.push(<li key={student.id}>{student.name}</li>));
      }
    );
  }
}
