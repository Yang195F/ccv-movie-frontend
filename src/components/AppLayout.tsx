// AppLayout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar /> {/* Independent, not affected by flex */}
      <div className="app-body-wrapper">
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
