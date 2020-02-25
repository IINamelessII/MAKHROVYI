import React, {Component} from 'react';

import classes from './Solutions.css';
import Filter from './Filter/Filter';
import {subjectsData} from '../../shared/constants';

class FilterList extends Component {
  state = {
    faculty: null,
    department: null,
    semester: null,
    subject: null,
    departments: null,
    semesters: null,
    subjects: null,
  }

  facultySelect = (faculty) => {
    const departments = Object.keys(subjectsData[faculty]);
    this.setState({
      faculty: faculty,
      departments: departments,
    });
  }

  departmentSelect = (department) => {
    const semesters = Object.keys(subjectsData[this.state.faculty][department]);
    this.setState({
      department: department,
      semesters: semesters,
    });
  }

  semesterSelect = (semester) => {
    const subjects = subjectsData[this.state.faculty][this.state.department][semester];
    this.setState({
      semester: semester,
      subjects: subjects,
    });
  }

  subjectSelect = (subject) => {
    //Sending POST request to API
    alert("You choose: " + this.state.faculty + " " + this.state.department + " " + this.state.semester + " " + subject);
  }

  render() {
    const faculties = Object.keys(subjectsData);
    const facultiesFilter = (
      <Filter 
        items={faculties}
        onSelect={this.facultySelect} />
    );

    let departmentFilter = null;
    if (this.state.departments) {
      departmentFilter = (
        <Filter
          items={this.state.departments}
          onSelect={this.departmentSelect} />
      );
    }

    let semestersFilter = null;
    if (this.state.semesters) {
      semestersFilter = (
        <Filter
          items={this.state.semesters}
          onSelect={this.semesterSelect} />
      );
    }

    let subjectsFilter = null;
    if (this.state.subjects) {
      subjectsFilter = (
        <Filter
          items={this.state.subjects}
          onSelect={this.subjectSelect} />
      );
    }

    return (
      <div className={classes.FilterList}>
        {facultiesFilter}
        {departmentFilter}
        {semestersFilter}
        {subjectsFilter}
      </div>
    );
  }
}

export default FilterList;