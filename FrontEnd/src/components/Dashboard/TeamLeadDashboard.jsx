import { useState } from 'react';
import PropTypes from 'prop-types';
import AddSnippetForm from '../Snippet/AddSnippetForm';
import Analytics from './Analytics';
import UserList from './UserList';

const TeamLeadDashboard = ({ changeUser, updateSnippet, deleteSnippet, allUserData }) => {
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [activeTab, setActiveTab] = useState('moderation');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    changeUser(null);
  };

  const handleCloseForm = () => {
    setEditingSnippet(null);
  };

  const handleDeleteClick = (snippetId) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(snippetId);
    }
  };
  
  const allSnippets = allUserData
    ? allUserData.flatMap(dev =>
        dev.snippets.map(snippet => ({ ...snippet, author: dev.name }))
      )
    : [];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-racing tracking-wider">
            <span>Code</span>
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">X</span>
          </h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>

        <Analytics developers={allUserData} /> 

        {editingSnippet && (
          <div className="my-8">
            <AddSnippetForm 
              updateSnippet={updateSnippet}
              snippetToEdit={editingSnippet}
              onFormClose={handleCloseForm}
            />
          </div>
        )}
        
        <div className="mb-4 border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('moderation')}
              className={`${activeTab === 'moderation' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Snippet Moderation
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${activeTab === 'users' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Team Members
            </button>
          </nav>
        </div>

        {activeTab === 'users' && <UserList developers={allUserData} />}

        {activeTab === 'moderation' && (
          <div className="space-y-6">
            {allSnippets.length > 0 ? (
              allSnippets.map((snippet) => (
                <div key={snippet.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg">{snippet.title}</h4>
                        <p className="text-sm text-gray-400">Author: {snippet.author}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => setEditingSnippet(snippet)} className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white" title="Edit Snippet"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg></button>
                        <button onClick={() => handleDeleteClick(snippet.id)} className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white" title="Delete Snippet"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">{snippet.tags.map(tag => (<span key={tag} className="bg-purple-600 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>))}</div>
                  </div>
                  <div className="p-4 bg-gray-900"><pre className="bg-black p-4 rounded overflow-x-auto text-sm"><code>{snippet.codeBlock}</code></pre></div>
                </div>
              ))
            ) : (<p>No snippets have been created by the team yet.</p>)}
          </div>
        )}
      </div>
    </div>
  );
};

TeamLeadDashboard.propTypes = {
  changeUser: PropTypes.func.isRequired,
  updateSnippet: PropTypes.func.isRequired,
  deleteSnippet: PropTypes.func.isRequired,
  allUserData: PropTypes.array
};

export default TeamLeadDashboard;