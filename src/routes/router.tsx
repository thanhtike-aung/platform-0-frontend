import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import PostCreate from "@/pages/post/create";
import FriendList from "@/pages/friend/list";
import LoginForm from "@/pages/auth/signin";
import ProtectedRoute from "@/components/ProtectedRoute";
import Profile from "@/pages/user/profile";
import RegistrationForm from "@/pages/auth/signup";
import UserList from "@/pages/user/list";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* user routes */}
                  <Route path="/users/list" element={<UserList />} />
                  <Route path="/user/profile" element={<Profile />} />

                  {/* post routes */}
                  <Route path="/post/create" element={<PostCreate />} />

                  {/* friend routes */}
                  <Route path="/friend/list" element={<FriendList />} />
                </Routes>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
