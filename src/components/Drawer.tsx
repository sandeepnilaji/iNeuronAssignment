import React from "react";
import { CreateUser, UserData } from "../types/userTypes";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createUsers, updateUser } from "../api/getUserDetails";

interface DrawerTypes {
  isOpen: boolean;
  setIsOpen: Function;
  userData?: UserData;
  refetch: Function;
}

export default function Drawer({
  isOpen,
  setIsOpen,
  userData,
  refetch,
}: DrawerTypes) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Field can't be empty")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces allowed"),
    lastName: Yup.string()
      .required("Field can't be empty")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces allowed"),
    phoneNumber: Yup.string().required("Phone number is required"),
    age: Yup.string().required("Age is required"),
  });
  const values = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phoneNumber: userData?.phoneNumber,
    age: userData?.age,
  };
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      age: userData?.age,
    },
    values,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");
    const params: CreateUser = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      age: +data?.age,
    };
    try {
      const response = userData
        ? await updateUser(params, userData?._id)
        : await createUsers(params);
      refetch();
      setIsOpen(false);
    } catch (err) {}
  };
  return (
    <main
      className={
        " fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-gray-300 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">
            {userData ? "Update details" : "Create details"}
          </header>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-[24px]">
              <div className="flex flex-col space-y-2">
                <label htmlFor="firstName">First name</label>
                <input
                  {...register("firstName")}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={userData?.firstName}
                  className={"bg-gray-100 rounded-[4px] py-3 px-2"}
                />
                <p className="text-red-700 text-[12px] mt-1">
                  {errors.firstName?.message?.toString()}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="lastName">Last name</label>
                <input
                  {...register("lastName")}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  defaultValue={userData?.lastName}
                  className={"bg-gray-100 rounded-[4px] py-3 px-2"}
                />
                <p className="text-red-700 text-[12px] mt-1">
                  {errors.lastName?.message?.toString()}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  defaultValue={userData?.phoneNumber}
                  className={"bg-gray-100 rounded-[4px] py-3 px-2"}
                />
                <p className="text-red-700 text-[12px] mt-1">
                  {errors.phoneNumber?.message?.toString()}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="age">Age</label>
                <input
                  {...register("age")}
                  id="age"
                  name="age"
                  placeholder="Enter age"
                  type={"number"}
                  defaultValue={userData?.age}
                  className={"bg-gray-100 rounded-[4px] py-3 px-2"}
                />
                <p className="text-red-700 text-[12px] mt-1">
                  {errors.age?.message?.toString()}
                </p>
              </div>
              <button className="w-fit py-3 px-4 bg-[#FFF] font-semibold rounded-[16px] cursor-pointer">
                {userData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
          reset();
        }}
      ></section>
    </main>
  );
}
