import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Form from "../Navbar/Form";
import Newsletter from "../Newsletter";
import Footer from "../Footer";


type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      
      <Navbar/>
      <Form/>
      {children}
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Layout;