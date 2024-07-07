import ChangeUserRole from "../components/ChangeUserRole"; // Ensure correct import path
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";

function AllUsers() {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(summaryApi.allUser.url, {
        method: summaryApi.allUser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => (
            <tr key={el.id}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{moment(el?.createdAt).format("LL")}</td>
              <td>
                <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white">
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChangeUserRole />
    </div>
  );
}

export default AllUsers;
