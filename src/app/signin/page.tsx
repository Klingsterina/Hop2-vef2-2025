'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/api/auth';
import '../../Styles/auth.scss';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // sign in logic hérna
    console.log('Signing in:', { email, password });

    try{
      const response = await login({ email, password});

      if(response.error){
        setError(response.error);
      } else {
        router.push('/');
      }
    } catch(err){
      setError(`Villa í register handleSubmit: ${err}`);
      console.error('Login villa!: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Sign In</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}