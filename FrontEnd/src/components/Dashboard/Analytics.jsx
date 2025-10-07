import PropTypes from 'prop-types';

const Analytics = ({ developers }) => {
  const totalDevelopers = developers ? developers.length : 0;
  const totalSnippets = developers
    ? developers.reduce((sum, dev) => sum + dev.snippets.length, 0)
    : 0;
  const publicSnippets = developers
    ? developers.reduce((sum, dev) => sum + dev.snippets.filter(s => s.isPublic).length, 0)
    : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-blue-400">{totalDevelopers}</p>
          <p className="text-sm text-gray-400">Total Developers</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-emerald-400">{totalSnippets}</p>
          <p className="text-sm text-gray-400">Total Snippets</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-yellow-400">{publicSnippets}</p>
          <p className="text-sm text-gray-400">Public Snippets</p>
        </div>
      </div>
    </div>
  );
};

Analytics.propTypes = {
  developers: PropTypes.array
};

export default Analytics;