import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} /> */}

        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
