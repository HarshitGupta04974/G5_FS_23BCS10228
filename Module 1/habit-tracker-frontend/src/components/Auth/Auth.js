import React, { useState } from 'react';
import * as api from '../../api/apiService';
import styles from './Auth.module.css';
import { toast } from 'react-toastify';


function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        // --- Register ---
        await api.register(username, email, password);
        toast.success("Registration successful! Please log in.");
        setIsRegistering(false);
        setPassword(''); 
      } else {
        const user = await api.login(username, password);
        onLogin(user); 
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.gradientText}>Habit Hero</span>
        </h1>
        <h2 className={styles.subtitle}>{isRegistering ? 'Create Your Account' : 'Log In'}</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., habit_hero"
            required
          />
        </div>

        {isRegistering && (
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., hero@example.com"
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? '...' : (isRegistering ? 'Create Account' : 'Log In')}
        </button>

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={loading}
        >
          {isRegistering ? 'Already have an account? Log In' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
}

export default Auth;