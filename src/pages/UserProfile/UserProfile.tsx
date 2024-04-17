import { useParams } from "react-router-dom";
import React from "react";

const UserProfile: React.FC = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID is: {userId}</p>
    </div>
  );
};

export default UserProfile;
