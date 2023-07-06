import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserData } from "../service/action";
import LoadingDialog from "./LoadingDialog";

export default function ContentDialog({ changDialogState, userListService }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(true);
  }

  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;
    setUserData({ ...userData, [name]: value });
  };

  const closeDialog = () => {
    changDialogState();
  };

  const addUser = () => {
    const { email, username } = userData;
    if (!username) {
      toast.error("Please fill the username");
    }
    if (username && !email) {
      toast.error("Please fill the email");
    }

    if (email && email) {
      setLoading(true);
      addUserData({ data: userData })
        .then((res) => {
          setLoading(false);
          userListService();
          changDialogState();
        })
        .catch((err) => {
          setLoading(false);
          console.log("err****", err);
          toast.error(err);
        });
    }
  };

  return (
    <>
      {loading && <LoadingDialog />}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add User
                  </Dialog.Title>

                  <div className="mt-6">
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={onChangeHandler}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={onChangeHandler}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDialog}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addUser}
                    >
                      Add User
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          <ToastContainer />
        </Dialog>
      </Transition>
    </>
  );
}
