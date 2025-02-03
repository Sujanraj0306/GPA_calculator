import React, { useState } from 'react';
import './App.css';
import CourseInput from './components/CourseInput';
import { Helmet } from "react-helmet";


function App() {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState(null);

  const gradeToPoint = (grade) => {
    const gradeMapping = {
      O: 10,
      'A+': 9,
      A: 8,
      'B+': 7,
      B: 6,
      C: 5,
      U: 0, // Fail
    };
    return gradeMapping[grade] || null;
  };

  const handleCourseNumberChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumCourses(count || 0);
    setCourses(Array.from({ length: count }, () => ({ grade: '', credits: '' }))); // Independent objects
  };
  

  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const gradePoint = gradeToPoint(course.grade);
      const credits = parseInt(course.credits, 10);

      if (gradePoint === null || isNaN(credits)) {
        setError('Invalid grade or credits entered. Please check your inputs.');
        setCgpa(null);
        return;
      }

      totalPoints += gradePoint * credits;
      totalCredits += credits;
    }

    if (totalCredits === 0) {
      setError('Total credits cannot be zero.');
      setCgpa(null);
      return;
    }

    setError(null);
    setCgpa((totalPoints / totalCredits).toFixed(2));
  };

  return (
    
    <div className="App">
      <div>
      <Helmet>
        <title>Sujan GPA - Calculate GPA for CIT College and Anna University MSc</title>
        <meta name="description" content="A GPA calculator for CIT College and Anna University MSc programs." />
      </Helmet>
      <h1>GPA Calculator</h1>
      <div className="input-section">
        <label htmlFor="numCourses" style={{paddingRight:"7px"}}>Enter the number of courses:</label>
        <input
          type="number"
          id="numCourses"
          value={numCourses}
          onChange={handleCourseNumberChange}
          
        />
      </div>
      <div className="courses-container">
        {courses.map((course, index) => (
          <CourseInput
            key={index}
            index={index}
            course={course}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
      <button onClick={calculateCgpa} disabled={courses.length === 0}>
        Calculate CGPA
      </button>
      {error && <p className="error">{error}</p>}
      {cgpa && <p>Your CGPA is: {cgpa}</p>}
      <footer>
        <p>&copy; {new Date().getFullYear()} by @sujanraj</p>
      </footer>
    </div>  
    </div>
  );
}

export default App;
//hi