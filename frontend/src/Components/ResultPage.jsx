import React from 'react';
import './ResultPage.css';
import CertificateImage from './certificate.jpg'; // Import your certificate image

function ResultPage({ score, totalQuestions, restartQuiz }) {
  const showCertificate = score >= 5;

  const handleCertificateClick = () => {
   
     // Create a virtual link element
  const link = document.createElement('a');
  link.href = CertificateImage; // Set the href to your certificate image
  link.download = 'certificate.png'; // Set the download attribute to specify the file name

  // Programmatically click the link to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up - remove the link from the DOM
  document.body.removeChild(link);
  };

  return (
    <div className="result-container">
      <div className="result">
        <h2>Quiz Result</h2>
        <p>You answered {score} out of {totalQuestions} questions correctly.</p>
        <p>Score: {((score / totalQuestions) * 100).toFixed(2)}%</p>
        {showCertificate && (
          <>
            <p>Congratulations! You've passed the quiz.</p>
            <div className="certificate">
              <img src={CertificateImage} alt="Certificate" />
            </div>
            <button className="btn" onClick={handleCertificateClick}>Get Your Certificate</button>
          </>
        )}
        {!showCertificate && (
          <>
            <p>Sorry, you did not pass the quiz. Try again!</p>
            <button className="btn" onClick={restartQuiz}>Restart Quiz</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
