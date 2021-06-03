import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.log(error);
      success(results);
    });
  }
  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results[0]);
    });
  }
  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success();
    });
  }

  addStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, program_id) VALUES (?,?,?)',
      [student.name, student.email, student.program_id],
      (error, results) => {
        if (error) return console.error(error);
        success(results.insertId);
      }
    );
  }

  getStudentsProgram(id, success) {
    pool.query('SELECT * FROM Programs WHERE id=?', [id], (error, results) => {
      if (error) return console.log('error');
      if (results[0] == null) {
        success('None');
      } else {
        success(results[0].name);
      }
    });
  }
}

class ProgramService {
  getPrograms(success) {
    pool.query('SELECT * FROM Programs', (error, results) => {
      if (error) return console.log(error);
      success(results);
    });
  }
  getProgram(id, success) {
    pool.query('SELECT * FROM Programs WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results[0]);
    });
  }
  getProgramStudents(id, success) {
    pool.query('SELECT * FROM Students WHERE program_id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
}

export let studentService = new StudentService();
export let programService = new ProgramService();
