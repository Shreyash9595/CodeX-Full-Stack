import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import DeveloperDashboard from './components/Dashboard/DeveloperDashboard';
import TeamLeadDashboard from './components/Dashboard/TeamLeadDashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [allUserData, setAllUserData] = useState([]);
  const [authMode, setAuthMode] = useState('login');

  const fetchAllUserData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      const allUsers = response.data;
      setAllUserData(allUsers);
      if (user) {
        const updatedCurrentUser = allUsers.find(u => u._id === user._id);
        if (updatedCurrentUser) {
          setUser(updatedCurrentUser);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllUserData();
    }
  }, [user]);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      setUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An unknown login error occurred.');
      }
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await axios.post('http://localhost:4000/api/signup', { email, password });
      alert('Sign up successful! Please log in.');
      setAuthMode('login');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAllUserData([]);
  };

  const addSnippet = async (newSnippetData) => {
    try {
      await axios.post('http://localhost:4000/api/snippets', { ...newSnippetData, userId: user._id });
      await fetchAllUserData();
    } catch (error) {
      console.error("Failed to add snippet:", error);
      alert("Could not add snippet.");
    }
  };

  const updateSnippet = async (updatedSnippetData) => {
    try {
      await axios.put(`http://localhost:4000/api/snippets/${updatedSnippetData._id}`, updatedSnippetData);
      await fetchAllUserData();
    } catch (error) {
      console.error("Failed to update snippet:", error);
      alert("Could not update snippet.");
    }
  };

  const deleteSnippet = async (snippetIdToDelete) => {
    try {
      await axios.delete(`http://localhost:4000/api/snippets/${snippetIdToDelete}`);
      await fetchAllUserData();
    } catch (error) {
      console.error("Failed to delete snippet:", error);
      alert("Could not delete snippet.");
    }
  };

  const renderAuth = () => {
    if (authMode === 'login') {
      return <Login handleLogin={handleLogin} setAuthMode={setAuthMode} />;
    }
    return <SignUp handleSignUp={handleSignUp} setAuthMode={setAuthMode} />;
  };

  return (
    <>
      {!user ? (
        renderAuth()
      ) : (
        user.role === 'teamLead' ? (
          <TeamLeadDashboard 
            changeUser={handleLogout} 
            updateSnippet={updateSnippet}
            deleteSnippet={deleteSnippet}
            allUserData={allUserData}
          />
        ) : (
          <DeveloperDashboard 
            changeUser={handleLogout} 
            data={user}
            addSnippet={addSnippet}
            updateSnippet={updateSnippet}
            deleteSnippet={deleteSnippet}
            allUserData={allUserData}
          />
        )
      )}
    </>
  );
};

export default App;