import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Form from "../Navbar/Form";
// import Footer from "../Footer/Footer-top";
// import Header from "../Header/Header";
// import Message from "../Message/Message";
// import TopHeader from "../TopHeader/TopHeader";
// import NavbarNew from "../Navbar/";
// import NewsLettertwo from "../NewsLetter2/NewsLettertwo";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      {/* <Message />
      <TopHeader />
      <Header /> */}
      {/* <Navbar /> */}
      <Navbar/>
      <Form/>
      {children}
      {/* <NewsLettertwo />
      <Footer /> */}
    </div>
  );
};

export default Layout;