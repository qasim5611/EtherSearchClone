import logo from './logo.svg';
import './App.css';
// const web3 = require("web3");
// import web3 from "web3";
// import Web3 from "web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Main from "./Components/Binance";
import SearchBar from "./Components/SearchBar";


function App() {

  return (
    <div className="App">
      {/* <ResponsiveAppBar/>
    <Main/> */}
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
