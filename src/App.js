import React, { useState, useEffect } from 'react';
import './App.css';
import CourseInput from './components/CourseInput';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const AdComponent = ({ slot }) => {
  const ref = React.useRef();

  useEffect(() => {
    if (ref.current && window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [slot]);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-client="ca-pub-6369820097867695"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

const About = () => (
  <div className="App">
    <h2>About Sujan GPA</h2>
    <p>This tool was built by Sujanraj, a student of M.Sc. AI & ML at Coimbatore Institute of Technology, to help students from CIT and Anna University easily calculate their GPA.</p>
    <p>The GPA calculator is designed with accuracy and simplicity in mind, specifically tailored for the MSc syllabus structure and grading system.</p>
    <AdComponent slot="4842344048" />
  </div>
);

const Contact = () => (
  <div className="App">
    <h2>Contact</h2>
    <p>Email: sujanraj06032005@gmail.com</p>
    <p>Phone: +91 9445193166</p>
    <AdComponent slot="4842344048" />
  </div>
);

const PrivacyPolicy = () => (
  <div className="App">
    <h2>Privacy Policy</h2>
    <p>We do not collect or store any personal data from users of this site.</p>
    <p>This site uses Google AdSense, which may use cookies to serve relevant ads based on your interaction with this and other websites.</p>
    <p>By using this site, you agree to the use of such cookies.</p>
    <AdComponent slot="4842344048" />
  </div>
);

function MainApp() {
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
      U: 0,
    };
    return gradeMapping[grade] || null;
  };

  const handleCourseNumberChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumCourses(count || 0);
    setCourses(Array.from({ length: count }, () => ({ grade: '', credits: '' })));
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
      <Helmet>
        <title>Sujan GPA - Calculate GPA for CIT College and Anna University MSc</title>
        <meta name="description" content="A GPA calculator for CIT College and Anna University MSc programs." />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6369820097867695" crossOrigin="anonymous"></script>
      </Helmet>
      <h1>GPA Calculator</h1>

      {/* Top Ad */}
      <AdComponent slot="5281327746" />

      <div className="input-section">
        <label htmlFor="numCourses" style={{ paddingRight: "7px" }}>Enter the number of courses:</label>
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

      {/* Middle Ad (conditional) */}
      {cgpa && <AdComponent slot="9823207986" />}

      {/* Footer Ad */}
      <AdComponent slot="2655164408" />

      <footer>
        <p>&copy; {new Date().getFullYear()} by @sujanraj</p>
        <p>
          <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;