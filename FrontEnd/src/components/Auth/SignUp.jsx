import { useState } from 'react';
import PropTypes from 'prop-types';

const SignUp = ({ handleSignUp, setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm border border-gray-700">
        <h1 className="text-4xl font-racing tracking-wider text-center mb-6">
          <span>Code</span>
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">X</span>
        </h1>
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <button onClick={() => setAuthMode('login')} className="font-medium text-blue-400 hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  setAuthMode: PropTypes.func.isRequired,
};

export default SignUp;