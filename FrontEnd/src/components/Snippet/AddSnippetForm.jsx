import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddSnippetForm = ({ addSnippet, updateSnippet, snippetToEdit, onFormClose }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [codeBlock, setCodeBlock] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (snippetToEdit) {
      setTitle(snippetToEdit.title);
      setLanguage(snippetToEdit.language);
      setCodeBlock(snippetToEdit.codeBlock);
      setTags(snippetToEdit.tags.join(', '));
      setIsPublic(snippetToEdit.isPublic);
    } else {
      // Reset form when switching from edit to add mode
      setTitle('');
      setLanguage('');
      setCodeBlock('');
      setTags('');
      setIsPublic(false);
    }
  }, [snippetToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const snippetData = {
      title,
      language,
      codeBlock,
      tags: tags.split(',').map(tag => tag.trim()),
      isPublic,
    };

    if (snippetToEdit) {
      updateSnippet({ ...snippetData, id: snippetToEdit.id });
    } else {
      addSnippet(snippetData);
    }

    onFormClose();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">{snippetToEdit ? 'Edit Snippet' : 'Add a New Snippet'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300">Language</label>
          <input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma-separated)</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., react, javascript, api" />
        </div>
        <div>
          <label htmlFor="codeBlock" className="block text-sm font-medium text-gray-300">Code Block</label>
          <textarea id="codeBlock" rows="10" value={codeBlock} onChange={(e) => setCodeBlock(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono" required />
        </div>
        <div className="flex items-center">
          <input id="isPublic" type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
          <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-300">Publish to Team Library</label>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {snippetToEdit ? 'Update Snippet' : 'Save Snippet'}
          </button>
          <button
            type="button"
            onClick={onFormClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

AddSnippetForm.propTypes = {
  addSnippet: PropTypes.func,
  updateSnippet: PropTypes.func,
  snippetToEdit: PropTypes.object,
  onFormClose: PropTypes.func.isRequired
};

export default AddSnippetForm;