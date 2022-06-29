import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./../utils";
import backupABI from "./../ConnectivityAss/myContractAbi.json";

import { ethers } from "ethers";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";

import "./../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/DotLoader";
import { type } from "@testing-library/user-event/dist/type";

import { useEtherClone } from "./../ConnectivityAss/hooks";

import { myContractAddbackup } from "../ConnectivityAss/environment";
// import  myContractAbi  from "../ConnectivityAss/myContractAbi.json";



export default function SearchBar() {

  const { account, signer, connect, chainId } = useContext(AppContext);

// console.log(account);





  const [allfuncdata, setallfuncdata] = useState(false);

  const [Json, setJson] = useState("");

  const [search, setsearch] = useState("");

  const [myabi, setmyabi] = useState("");
  const [allfunc, setallfunc] = useState("");

  const [loading, setloading] = React.useState(false);

  const [InputsVal, setInputsVal] = useState("");


  console.log("Token Add", search ? search.search : myContractAddbackup);
  let myContractAdd = search ? search.search : myContractAddbackup;
  console.log("My ABI", myabi ? myabi : backupABI);

  let myContractAbi = myabi ? myabi : backupABI;

    const TokenContract = useEtherClone(myContractAdd, myContractAbi, signer);

    console.log("TokenContract", TokenContract);



      const onSubmit = async (e, name) => {
    e.preventDefault();
    let len = e.target.length - 1;
    console.log("len", len);

    console.log("func name", name);

    // let funcname = name;

    let myValues = [];
    for (let i = 0; i <= len - 1; i++) {
      console.log("e", e.target[i].value);
      myValues.push(e.target[i].value);
    }

    console.log("myValues", myValues);
     let funcname = name && name;
     console.log(funcname, "funcname");
const result = await TokenContract[funcname](...myValues);

 if (result) {
    console.log(result);
    toast.success(result, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
  }
  else{
    console.log("Not Saved!");
  }

  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const notify = () => toast("Wow so easy!");

  const set = {
    boxShadow: "2px 2px 9px grey",
    marginBottom: "10px",
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin: 2;
  `;

  const maindiv = {
    position: "absolute",
    /* text-align: center, */
    /* margin: 0px auto, */
    display: "flex",
    flexDirection: "row",
    background: "#00000047",
    height: "1500px",
    width: "100%",
  };

  const form = {
    display: "flex",
    flexDirection: "column",
  };

  const inpts = {
    marginBottom: "20px",
    marginBottom: "20px",
    height: "25px",
    width: "90%",
    boxShadow: "1px 1px 7px grey",
    border: "1px #bbbbbb solid",
    borderRadius: "5px",
  };

  const onChangeHandler = (e) => {
      setsearch({ ...search, [e.target.name]: e.target.value });
    
  };

   const onChangeInputs = (e) => {

    console.log("InputsName", [e.target.name]);
    console.log("InputsVal", [e.target.value]);

   
      //  setInputsVal({ ...InputsVal, [e.target.name]: e.target.value });
      //  console.log("InputsVal", InputsVal);
     
   };

  const FindAddABI = async (e) => {
    // e.preventDefault();
    setloading(true);

    console.log("search now");

    console.log(search);

    // const address = "0xDd0857C0A9A0A54AE4e05d871675fAE75DE1513e";
    const apiKey = "VJPHK8UIMF5HT7EZ8E4Q2DUZW4XVUUSIXD";
    console.log("search", search.search);
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${search.search}&apikey=${apiKey}`;
    console.log("url", url);
    const res = await axios.get(url);
    const ans = res.data.result;
    // const abi = JSON.parse(res.data.result);
    console.log("abi");
    console.log(ans);

    if (ans == "Contract source code not verified") {
      toast.error("Contract source code not verified", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloading(false);
    } else if (ans == "Invalid Address format") {
      toast.error("Invalid Address format", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloading(false);
    } else {
      toast.success("Ok", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloading(false);
      setmyabi(ans);
    }

    // window.scrollTo(0, 200);
  };
  let mydata = [];

  const filterNow = () => {
    console.log("filter Called");
    // console.log(myabi);
    // console.log(myabi[0]);

    let data = JSON.parse(myabi);
    setJson(data);
    let myAllFunctions = data.map((i) => i.name);

    // let myAllFunctions = data.map((i) => {
    //   return (
    //     {i.name}
    //   )
    // });
    console.log(myAllFunctions, "New myAllFunctions");

    myAllFunctions.pop();
    myAllFunctions.shift();

    // console.log('loop', mydata);
    //  setallfunc(mydata);
    setallfunc(myAllFunctions);

    for (let item of data) {
      console.log(item.inputs, "item qasim");
      mydata.push(item.inputs);
    }
    setallfuncdata(mydata);
    // setallfunc(myAllFunctions);
    // let mydata = [];
    // for (let index = 0; index < myAllFunctions.length; index++) {
    //   const element = myAllFunctions[index] + ',  ';
    //   // myAllFunctions;
    //   mydata.push(element);
    // }
  };


  return (
    <>
      <div style={loading === true ? maindiv : null}>
        <ClipLoader loading={loading} css={override} size={60} />
      </div>
      <div>
        <h3>SearchBar Comp</h3>
        <input
          onChange={onChangeHandler}
          className="srch"
          type="search"
          name="search"
          placeholder="Search by Address /"
        />
        <button onClick={FindAddABI}>GO</button>
        <ToastContainer />
        <br />
        <hr />
        <h3 style={{ textAlign: "left", padding: "5px 20px" }}>ABI</h3>

        {myabi ? (
          <div
            style={{
              height: "200px",
              background: "#8080801f",
              overflow: "scroll",
              padding: "31px 10px",
              boxShadow: "inset 0 0 10px #1976d25e",
            }}
          >
            {myabi}
            <br />
            <br />
            <button onClick={filterNow}>Filter All Functions</button>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <br />
        <hr />

        <br />

        {/* {allfunc ? (
          <div
            style={{
              height: "200px",
              background: "#8080801f",
              overflow: "scroll",
              padding: "31px 10px",
              boxShadow: "inset 0 0 10px #1976d25e",
            }}
          >
            {" "}
            <h3>All BlocChain Functions For Above Address</h3>
            {allfunc.map((i, index) => (
              <p key={index}>{i}</p>
            ))}
          </div>
        ) : null} */}
      </div>
    

      {Json ? (
        <Grid container spacing={2}>
          {Json.map((person, index) => {
            return (
              <Grid item xs={6} md={4} style={set} key={index}>
                <Item style={{ border: "none !important", overflow: "hidden" }}>
                  <h3>{person.name}</h3>

                  <form style={form} onSubmit={(e) => onSubmit(e, person.name)}>
                    {person.inputs && person.inputs.map((input, i) => {
                        return (
                          <input
                          key={i}
                          type="text"
                            placeholder={`${input.name}`}
                            // {...register("exampleRequired")}
                            // {...register(`${input.name}`)}
                            style={inpts}
                          />
                        );
                      })}

                    <button type="submit" >{person.name}</button>
                  </form>
                  {/* <button type="submit">{person.name}</button> */}

                  <br />
                </Item>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="test" {...register("example")} />

                    <input
                      {...register("exampleRequired", { required: true })}
                    />
                   
                    

                    <input type="submit" />
                  </form> */}
      {/* {allfuncdata ? console.log("allfuncdata qas", allfuncdata) : null} */}
    </>
  );
}
