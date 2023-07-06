const AccountDetails = ({ docdata }) => {
  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          {docdata && docdata.username && (
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
              Welcome {docdata.username} ({docdata.isadmin ? "ADMIN" : "USER"})
            </h1>
          )}

          <div className="mt-6">
            <div className="mb-2">
              <label
                // for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              {docdata && docdata.email && (
                <div className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  {docdata.email}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2">
              <label
                // for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Account ID
              </label>
              {docdata && docdata.email && (
                <div className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  {docdata.accountid}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
