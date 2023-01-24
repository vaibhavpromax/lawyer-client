import React, { useEffect, useState } from "react";
import service from "./../../../util/axiosConfig";
import { createLawyerProfile } from "./config";

const YourLawyerProfile = () => {
  const [user, setUser] = useState({});
  useEffect(async () => {
    try {
      const id = JSON.parse(localStorage.getItem("user")).user.id;
      const res = await service.get(`/lawyer/${id}`);
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
                {!!Object.keys(user).length &&
                  createLawyerProfile(user)?.map((item, index) => {
                    console.log("ujjwal", item);

                    if (item.name === "Rating") {
                      return (
                        <tr key={index}>
                          <td className="heading">{item.name}</td>
                          <td>:</td>
                          <td>
                            {[...Array(item?.value)].map((star, index) => {
                              return (
                                <span className="star on" key={index}>
                                  &#9733;
                                </span>
                              );
                            })}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={index}>
                        <td className="heading">{item.name}</td>
                        <td>:</td>
                        <td>{item.value}</td>
                      </tr>
                    );
                  })}
                {/* <tr>
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

                <tr>
                  <td className="heading">Education</td>
                  <td>:</td>
                  <td>{user?.education}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourLawyerProfile;
