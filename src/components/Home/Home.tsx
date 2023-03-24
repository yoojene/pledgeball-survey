import React from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Home() {
  return (
    <div className="App">
      <Header></Header>
      <h1>Welcome to the survey</h1>
      <Footer route={"/survey/1"} title={"Start"}></Footer>
    </div>
  );
}
