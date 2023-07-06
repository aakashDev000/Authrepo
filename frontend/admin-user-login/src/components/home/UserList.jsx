const UserList = ({ userList }) => {
  return (
    <>
      {userList &&
        userList.length > 0 &&
        userList.map((user, i) => (
          <div key={i}>
            <div className="flex pr-5 pt-2">
              <>
                <div className=" p-6 m-auto bg-white rounded-md shadow-md">
                  <div className="mt-3">
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Username
                      </label>
                      {user && user.email && (
                        <div className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                          {user.username}
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Email
                      </label>
                      {user && user.email && (
                        <div className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                          {user.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserList;
