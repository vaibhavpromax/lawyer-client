import React, { useEffect, useState } from "react";
import "./ClientProfile.scss";
import service from "./../../../util/axiosConfig";

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(async () => {
    try {
      const id = JSON.parse(localStorage.getItem("user")).user.client_id;
      const res = await service.get(`/client/${id}`);
      if (res.data?.data) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="main">
        <div className="card">
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td className="heading">Name</td>
                  <td>:</td>
                  <td>{user?.full_name}</td>
                </tr>
                <tr>
                  <td className="heading">Email</td>
                  <td>:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td className="heading">Address</td>
                  <td>:</td>
                  <td>
                    {user?.location?.city}, {user?.location?.state}
                  </td>
                </tr>
                <tr>
                  <td className="heading">Phone</td>
                  <td>:</td>
                  <td>{user?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
