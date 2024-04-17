import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

import { UserProvider } from "./hooks/UserContext.tsx";
import { PostProvider } from "./hooks/PostContext.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
  </React.StrictMode>
);
