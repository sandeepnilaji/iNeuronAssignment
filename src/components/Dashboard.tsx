import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { deleteUser, getAllUserDetails } from "../api/getUserDetails";
import { UserData } from "../types/userTypes";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedUserData, setSelectedUserData] = useState<UserData>();

  const getUsersData = async () => {
    const response = await getAllUserDetails();
    if (response) {
      return response?.data as UserData[];
    }
  };

  const {
    isLoading: isLoadingUserData,
    isFetching: isFetchingUserData,
    isFetched: isFetchedUserData,
    refetch: refetchUserData,
    data: userData,
  } = useQuery(["getUserData"], getUsersData, {
    cacheTime: 30000,
  });

  const headers = [
    <div key={1} className="w-full flex">
      First Name
    </div>,
    <div key={2} className="w-full flex">
      Last Name
    </div>,
    <div key={3} className="w-full flex">
      Phone Number
    </div>,
    <div key={4} className="w-full flex">
      Age
    </div>,
    <div key={5} className="w-full flex">
      Created At
    </div>,
    <div key={6} className="w-full flex">
      Action
    </div>,
  ];

  const handleDrawer = (el?: UserData) => {
    setIsDrawerOpen(!isDrawerOpen);
    if (el) {
      setSelectedUserData(el);
    } else {
      setSelectedUserData(undefined);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      refetchUserData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={handleDrawer}
        userData={selectedUserData!}
        refetch={refetchUserData}
      />
      <div className="mx-10 mt-3 flex justify-between">
        <p className="text-neutral-50 text-[32px] font-bold">User Details</p>
        <button
          className="py-3 px-4 bg-[#FFF] font-semibold rounded-[16px] cursor-pointer"
          onClick={() => handleDrawer()}
        >
          Create user
        </button>
      </div>
      <div className="max-w-[1408px] mx-auto bg-neutral-900 bg-opacity-50 border-[1px] border-neutral-900  px-3 py-4 rounded-[16px] mb-[84px]">
        <div className="flex  justify-between border-b-[1px] border-neutral-900 inter-400  text-neutral-500 py-3 ml-6 mr-4">
          {headers?.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </div>
        {
          <div className="">
            {
              <>
                {userData?.map((el, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer rounded-[12px] hover:bg-neutral-600 transition duration-300`}
                  >
                    <div
                      className={`flex justify-between items-center border-b-[1px] border-neutral-900 inter-400  text-neutral-500 py-3 ml-6 mr-4`}
                    >
                      <div className="w-full text-16 flex gap-3 text-neutral-50">
                        {el.firstName}
                      </div>

                      <div className="w-full flex items-start inter-400 text-14 text-neutral-50">
                        {el.lastName}
                      </div>
                      <div className="w-full flex items-start inter-400 text-14 text-neutral-50">
                        {el.phoneNumber}
                      </div>
                      <div className="w-full flex items-start inter-600 text-14 text-neutral-50">
                        {el.age}
                      </div>
                      <div className="w-full flex justify-start  items-start roboto-400 text-14 text-neutral-50">
                        {`${moment(el.createdAt.toString()).format(
                          "DD MMM YYYY"
                        )}`}
                      </div>
                      <div className="w-full flex justify-start items-start gap-x-[16px] roboto-400 text-14 text-neutral-50">
                        <button
                          className="py-3 px-4 bg-white/30 rounded-[16px] cursor-pointer"
                          onClick={() => handleDrawer(el)}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(el._id)}
                          className="py-3 px-4 bg-white/30 rounded-[16px] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default Dashboard;
