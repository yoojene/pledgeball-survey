import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ButtonNav from "../ButtonNav/ButtonNav";

export default function Home() {
  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="title">
          <h1>Welcome to the survey</h1>
        </div>
        <ButtonNav route={"/survey/1"} title={"Start"}></ButtonNav>
      </div>
      <Footer></Footer>
    </>
  );
}
