import PropTypes from 'prop-types';

const UserList = ({ developers }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Team Members</h3>
      <div className="bg-gray-800 rounded-lg">
        <ul className="divide-y divide-gray-700">
          {developers && developers.map((dev, index) => (
            <li key={dev.id} className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400 mr-4">{index + 1}.</span>
                <div>
                  <p className="font-semibold text-white">{dev.name}</p>
                  <p className="text-sm text-gray-500">{dev.email}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{dev.snippets.length} snippets</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UserList.propTypes = {
  developers: PropTypes.array
};

export default UserList;