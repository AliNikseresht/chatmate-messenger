import React, { createContext, useState, FC, ReactNode } from "react";

type UserType = {
  name: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  gender: string;
  birthdate: string;
  location: string;
  profileImage?: string;
};

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    name: "",
    username: "",
    email: "",
    bio: "",
    website: "",
    profileImage: "/path/to/default/profile/image.jpg",
    gender: "",
    birthdate: "",
    location: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
