import { useEffect, useState } from "react";
import ContentDialog from "./ContentDialog";
import { getUserPaginationData } from "../service/action";
import UserList from "./UserList";
import LoadingDialog from "./LoadingDialog";

const Users = () => {
  const [dialogState, setDialogState] = useState(false);

  const closeDialog = () => {
    setDialogState(false);
  };

  const openDialog = () => {
    setDialogState(true);
  };

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserPaginationData()
      .then((res) => {
        console.log("res****", res);
        setLoading(false);
        setUserList(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err******", err);
      });
  }, []);

  const userListService = () => {
    setLoading(true);
    getUserPaginationData()
      .then((res) => {
        setLoading(false);
        console.log("res****", res);
        setUserList(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err******", err);
      });
  };

  return (
    <>
      {loading && <LoadingDialog />}
      <div className="flex justify-center pt-3 ">
        <button
          type="button"
          className="flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={openDialog}
        >
          Add User
        </button>
      </div>

      {dialogState && (
        <ContentDialog
          changDialogState={closeDialog}
          userListService={userListService}
        />
      )}

      <div className="flex pt-4 pl-4 flex-wrap">
        <UserList userList={userList} />
      </div>
    </>
  );
};

export default Users;
