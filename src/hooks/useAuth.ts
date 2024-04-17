import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit') === null;
    setIsFirstVisit(firstVisit);
    
    // Move the logic for setting isAuthenticated inside this useEffect
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, [localStorage.getItem('firstVisit')]); // Add localStorage as a dependency

  const loginUser = (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isFirstVisit, loginUser, logoutUser };
};

