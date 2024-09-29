import React from 'react';
import brew from "../../app/BrewLogo.png";

interface EmailFormProps {
  message: string;
  senderEmail: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ message, senderEmail }) => {
  return (
    <div style={styles.container as React.CSSProperties}>
      {/* Logo */}
      <img 
        src="BrewLogo.png"
        alt="Brew Community Logo" 
        style={styles.logo} 
      />

      {/* Title */}
      <h1 style={styles.title}>New Email from the Brew Community</h1>
      
      {/* Message */}
      <div style={styles.messageContainer}>
        <p style={styles.text}>
          <strong>From:</strong> {senderEmail}
        </p>
        <p style={styles.text}>
          <strong>Message:</strong> {message}
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  }
};

export default EmailForm;
