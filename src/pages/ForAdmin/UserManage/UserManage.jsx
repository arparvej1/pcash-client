import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth"; // Assuming this hook handles authentication
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Assuming this hook handles secure Axios requests
import { Helmet } from "react-helmet-async"; // For setting page title dynamically
import './user_manage.css';
import { toast } from "react-toastify";

const UserManage = () => {
  const { user } = useAuth(); // Assuming useAuth hook provides authenticated user information
  const axiosSecure = useAxiosSecure(); // Assuming useAxiosSecure hook provides Axios instance with authorization header
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosSecure.get(`/users`);
      setDataLoading(false);
      setUsers(response.data);
    } catch (error) {
      setDataLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axiosSecure.get(`/users/search?name=${e.target.value}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleToggle = async (userId, active) => {
    if (userId === user._id) {
      return toast.error('You cannot block yourself!')
    }
    try {
      // Perform action based on toggle (activate or block)
      const action = active ? "activate" : "block";
      const response = await axiosSecure.put(`/users/${userId}/${action}`);
      fetchUsers(); // Refresh user list after action
    } catch (error) {
      console.error(`Error ${active ? "activating" : "blocking"} user:`, error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Manage | pCash</title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">User Manage</h3>

      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2"
            placeholder="Search by name, email, or mobile number"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md overflow-hidden sm:rounded-lg divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.photo_url} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.mobileNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.balance % 1 > 0 ? parseFloat(user.balance).toFixed(2) : user.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'agent' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="mr-2">{user.status === 'pending' ? 'New Account' : ''}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status === "active"} // Assuming user.status determines active or blocked state
                        onChange={() => handleToggle(user._id, user.status !== "active")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          {
            dataLoading ? <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
              :
              users.length < 1 ?
                <div>
                  No Data Found
                </div>
                :
                <></>
          }
        </div>
      </div>
    </div>
  );
};

export default UserManage;
