import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';
import { ProgramList, ProgramDetails } from './programs';
import { StudentDetails, StudentList, StudentNew } from './students';

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>{' '}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>{' '}
        <NavLink to="/programs" activeStyle={{ color: 'darkblue' }}>
          Programs
        </NavLink>{' '}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/new-student" component={StudentNew} />
      <Route exact path="/programs" component={ProgramList} />
      <Route exact path="/programs/:id" component={ProgramDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
