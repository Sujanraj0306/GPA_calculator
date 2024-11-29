import React from 'react';
import './CourseInput.css';

function CourseInput({ index, course, handleInputChange }) {
  return (
    <div className="course-input">
      <label>Course {index + 1}</label>
      <select
        value={course.grade}
        onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
      >
        <option value="">Select Grade</option>
        <option value="O">O</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
      <input
        type="number"
        placeholder="Credits"
        value={course.credits}
        onChange={(e) => handleInputChange(index, 'credits', e.target.value)}
        min="0"
      />
    </div>
  );
}

export default CourseInput;
