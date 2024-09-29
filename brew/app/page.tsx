"use client";

import React, { useState } from 'react';
import logo from '@/app/assets/BrewLogo.png';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, comment }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setMessage(data.message);
        setEmail('');
        setComment('');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className="container">
      <Image src={logo} alt="Brew Community Logo" className='logo' />
      <h1 className='title'>Welcome to The Brew Community!</h1>
      <p className='subtitle'>Stay updated with the best travel times in Miami!</p>
      
      <form onSubmit={handleSubmit} className="form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <textarea
          id="comment"
          name="comment"
          placeholder="Leave a comment about Miami traffic"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="textarea"
        />
        <button type="submit" className="button">Sign Up & Leave a Comment</button>
      </form>
      
      {message && <p className="message">{message}</p>}
    </div>
  );
}
