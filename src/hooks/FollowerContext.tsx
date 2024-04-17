import React, { createContext, useContext, useState } from "react";

import { User } from "../types/models";

type FollowerContextType = {
  followers: User[];
  following: User[];
  setFollowers: React.Dispatch<React.SetStateAction<User[]>>;
  setFollowing: React.Dispatch<React.SetStateAction<User[]>>;
};

const FollowerContext = createContext<FollowerContextType | null>(null);

export const useFollowerContext = () => {
  const context = useContext(FollowerContext);
  if (!context) {
    throw new Error(
      "useFollowerContext must be used within a FollowerProvider"
    );
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const FollowerProvider: React.FC<Props> = ({ children }) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  return (
    <FollowerContext.Provider
      value={{ followers, following, setFollowers, setFollowing }}
    >
      {children}
    </FollowerContext.Provider>
  );
};
