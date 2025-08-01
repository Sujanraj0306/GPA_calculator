import React, { useState, useEffect } from 'react';
import './App.css';
import CourseInput from './components/CourseInput';
import { Helmet } from "react-helmet";

function App() {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState(null);

  // Load the AdSense script when the component mounts
  useEffect(() => {
    // This script will be loaded by the parent environment, so we don't need to inject it here.
    // The user has provided the script in the prompt, so we will assume it is handled by the user.
    // For local testing, you would add the script like this:
    // const script = document.createElement('script');
    // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6369820097867695";
    // script.async = true;
    // script.crossOrigin = "anonymous";
    // document.head.appendChild(script);

    // This is a placeholder for the ad unit.
    // Replace with your actual ad unit code after AdSense approval.
    const adScript = document.createElement('script');
    adScript.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});";

    // Since we can't directly manipulate the document head in React,
    // we assume the user will place the ad script in their index.html file.
    // Here we'll just handle the ad unit placeholder logic.

    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
      adContainer.appendChild(adScript);
    }
  }, []);

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
    setCourses(Array.from({ length: count }, () => ({ grade: '', credits: '' })));
    setCgpa(null);
    setError(null);
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

      if (gradePoint === null || isNaN(credits) || credits <= 0) {
        setError('Invalid grade or credits entered. Credits must be a positive number.');
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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <Helmet>
        <title>Sujan GPA - Calculate GPA for CIT College and Anna University MSc</title>
        <meta name="description" content="A GPA calculator for CIT College and Anna University MSc programs. Responsive and ad-friendly." />
      </Helmet>
      
      {/* AdSense Script placeholder - this should be in public/index.html */}
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6369820097867695"
            crossOrigin="anonymous"></script> */}

      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">GPA Calculator</h1>
        
        {/* Ad Unit Placeholder */}
        <div className="my-6 w-full max-w-xl text-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">AdSense Ad Unit - Placeholder</p>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6369820097867695"
            data-ad-slot="YOUR_AD_SLOT_ID"></ins>
        </div>

        <div className="input-section w-full max-w-xl mb-4">
          <label htmlFor="numCourses" className="block text-lg font-medium mb-2">
            Enter the number of courses:
          </label>
          <input
            type="number"
            id="numCourses"
            value={numCourses}
            onChange={handleCourseNumberChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div className="courses-container w-full max-w-xl space-y-4 mb-4">
          {courses.map((course, index) => (
            <CourseInput
              key={index}
              index={index}
              course={course}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>

        <button
          onClick={calculateCgpa}
          disabled={courses.length === 0}
          className="w-full max-w-xl py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Calculate CGPA
        </button>

        {error && (
          <p className="error text-red-500 mt-4 text-center">{error}</p>
        )}
        {cgpa && (
          <p className="cgpa-result text-green-600 dark:text-green-400 font-bold text-2xl mt-4 text-center">
            Your CGPA is: {cgpa}
          </p>
        )}
      </div>

      <footer className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} by @sujanraj</p>
      </footer>
    </div>
  );
}

// CourseInput component is not provided, so this is a placeholder.
// You should have this component defined in './components/CourseInput'.
// It is assumed to be similar to this structure.
const CourseInput = ({ index, course, handleInputChange }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
      <div className="flex-1">
        <label htmlFor={`grade-${index}`} className="block text-sm font-medium mb-1">
          Grade:
        </label>
        <input
          id={`grade-${index}`}
          type="text"
          value={course.grade}
          onChange={(e) => handleInputChange(index, 'grade', e.target.value.toUpperCase())}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., O, A+, B"
        />
      </div>
      <div className="flex-1">
        <label htmlFor={`credits-${index}`} className="block text-sm font-medium mb-1">
          Credits:
        </label>
        <input
          id={`credits-${index}`}
          type="number"
          value={course.credits}
          onChange={(e) => handleInputChange(index, 'credits', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 4"
          min="0"
        />
      </div>
    </div>
  );
};

export default App;
