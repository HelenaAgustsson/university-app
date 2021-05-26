import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';
import { ProgramList, ProgramDetails } from './programs';

export class HospitalsList extends Component {
  programs = [];
  hospitals = [];
  render() {
    return (
      <table>
        <tbody>
          {this.hospitals.map((hospital) => (
            <tr key={hospital.Hospital}>
              <td>{hospital.Hospital}</td>
              <td>{hospital.City}</td>
              <td>{hospital.Postcode}</td>
              <td>{hospital.Region}</td>
              <td>
                <a href={hospital.Region}>Link</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  mounted() {
    pool.query('SELECT * FROM Hospitals ', [], (error, results) => {
      if (error) return console.log('error');
      this.hospitals = results;
    });
  }
}
