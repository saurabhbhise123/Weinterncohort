import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";

function UserInfo({ match }) {
  const { users } = useSelector((state) => state.usersReducer);

  const user = users.find((user) => user._id === match.params.id);

  return (
    <div>
      <DefaultLayout>
        {user && (
          <div>
            <h3>
              <b>Personal information</b>
            </h3>
            <p>
              <b>First name : </b>
              {user.firstName}
            </p>
            <p>
              <b>Last name : </b>
              {user.lastName}
            </p>
            <p>
              <b>Email : </b>
              {user.email}
            </p>
            <p>
              <b>Mobile Number : </b>
              {user.mobileNumber}
            </p>
            <p>
              <b>Address : </b>
              {user.address}
            </p>

            <hr />
           
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default UserInfo;
