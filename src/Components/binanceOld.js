import React, { useContext, useState } from "react";
import { AppContext } from "./../utils";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { formatUnits, parseUnits } from "@ethersproject/units";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/DotLoader";

import { useStakingContract } from "./../ConnectivityAss/hooks";
import { useTokenContract } from "./../ConnectivityAss/hooks";

import { AbcSharp } from "@mui/icons-material";
import { stakingAddress } from "../ConnectivityAss/environment";



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
  marginBottom: "10px"
};


function Binance() {
  const { account, signer, connect, chainId } = useContext(AppContext);

  const [updateState, setupdateState] = React.useState(false);
  const [loading, setloading] = React.useState(false);


  const [owner, setowner] = useState(false);
  const [state, setState] = useState(0);
  const [totalUnStakedToken, settotalUnStakedToken] = useState(0);
  const [totalStakers, settotalStakers] = useState(0);
  const [totalStakedToken, settotalStakedToken] = useState(0);
  const [totalClaimedRewardToken, settotalClaimedRewardToken] = useState(0);
  const [stakeToken, setstakeToken] = useState(false);
  const [percentDivider, setpercentDivider] = useState(0);

  const [totalSupply, settotalSupply] = useState(0);

  const [tokecnDecimal, settokecnDecimal] = useState("");

  const [allowresult, setallowresult] = useState("");

      const StackingContract = useStakingContract(signer);
      const TokenContract = useTokenContract(signer);

// const [balance, setbalance] = useState("");
const [balresult, setbalresult] = useState(0);



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin: 2 ;
`;

const maindiv = {
  position: 'absolute',
  /* text-align: center, */
  /* margin: 0px auto, */
  display: 'flex',
  flexDirection: 'row',
  background: '#00000047',
  height: '1500px',
  width: '100%',
}

const form = {
  display: "flex",
  flexDirection: "column"
}

const inpts = {
marginBottom: "20px",
    marginBottom: '20px',
    height: '25px',
    width: '90%',
    boxShadow: '1px 1px 7px grey',
    border: '1px #bbbbbb solid',
    borderRadius: '5px',
}

const [form1, setform1] = useState({
  first: null,
  second: null,
  third: null,
  four: null,
});

const [approve, setapprove] = useState({
  spender: null,
  approveamount: null,
});


const [stake, setstake] = useState({
  stakeAmount: null,
  planIndex: null,
});



const [allowance, setallowance] = useState({
  ownerall: null,
  spenderall: null,
});



const [mybalance, setmybalance] = useState({
  addforbalance: null,
});


  const balanceChange = (e) => {
    setmybalance({ ...mybalance, [e.target.name]: e.target.value });
  };


  const allowanceChange = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setallowance({ ...allowance, [e.target.name]: val });
    } else {
      setallowance({ ...allowance, [e.target.name]: e.target.value });
    }
  };



  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setform1({ ...form1, [e.target.name]: val });
    } else {
      setform1({ ...form1, [e.target.name]: e.target.value });
    }
  };

   const onChangeStake = (e) => {
     if (e.target.name == "image") {
       let val = e.target.files[0];
       setstake({ ...stake, [e.target.name]: val });
     } else {
       setstake({ ...stake, [e.target.name]: e.target.value });
     }
   };


     const approveChange = (e) => {
       if (e.target.name == "image") {
         let val = e.target.files[0];
         setapprove({ ...approve, [e.target.name]: val });
       } else {
         setapprove({ ...approve, [e.target.name]: e.target.value });
       }
     };

const stakeBonus = async () =>{
      setloading(true);

  console.log("form1");
  console.log(form1);

let parseOne = parseUnits(form1.first.toString(), tokecnDecimal);
let parseTwo = parseUnits(form1.second.toString(), tokecnDecimal);
let parseThree = parseUnits(form1.third.toString(), tokecnDecimal);
let parsefor = parseUnits(form1.four.toString(), tokecnDecimal);

// let abc = form1.first.toString();

console.log("parseUnits");
console.log(+parseOne);
console.log(parseTwo);
console.log(parseThree);
console.log(parsefor);


const result = await StackingContract.SetStakeBonus(parseOne, parseTwo, parseThree, parsefor);
  if (result) {
    console.log(result);
    console.log("Write Sucessfully for setStakeBonus");
    toast.success("🦄 Write Sucessfully for setStakeBonus!", {
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
      setloading(false);

}
const ApproveToken = async () => {
  setloading(true);

  console.log("approve");
  console.log(approve);

  let approveAmountParse = parseUnits(approve.approveamount.toString(), tokecnDecimal);
 

  // let abc = form3.first.toString();

  console.log("approveamountParse");

  console.log(+approveAmountParse);
  console.log("spender");

  console.log(approve.spender);



  const result = await TokenContract.approve(stakingAddress, approveAmountParse);
  console.log("result");
  console.log(result);

  if (result) {
    console.log(result);
    console.log("Token Sucessfully Approved");
    toast.success("🦄 Token Sucessfully Approved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    console.log("Not Approved!");
  }
  setloading(false);
};




const writestake = async () => {
  setloading(true);

  let parseOne = parseUnits(stake.stakeAmount.toString(), tokecnDecimal);


  console.log("parseUnits stake.planIndex");
  console.log(+parseOne);
  // let abc = form1.first.toString();

  let tx = await StackingContract.stake(parseOne, stake.planIndex);
console.log("tx");
console.log(tx);

  if (tx) {
    console.log(tx);
    console.log("Write Sucessfully for Stake");
    toast.success("🦄 Write Sucessfully for Stake!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    console.log("Not Saved!");
  }
  setloading(false);
};


const getBalanceOf = async () => {
  setloading(true);
  //balace mean address
  const result = await TokenContract.balanceOf(mybalance.addforbalance);
  console.log("get Balance Of");
  console.log(+result);
  
  setbalresult(+result);
  setloading(false);
};


const getAllownace = async () => {
  setloading(true);
  const result = await TokenContract.allowance(allowance.ownerall, allowance.spenderall);
  console.log("getAllownace");
  console.log(+result);

  let a = +result;
  let dvide = a / tokecnDecimal;

  console.log("After dvide");
  console.log(dvide);


  setallowresult(dvide);
  setloading(false);
};

const gettotalSupply = async () => {
  setloading(true);
  const result = await TokenContract.totalSupply();
  console.log("gettotalSupply");
  console.log(result);

  settotalSupply(+result);
  setloading(false);
};

    const  getOwner = async ()  => {
      setloading(true);
        const result = await StackingContract.owner();
     setowner(result);
     setloading(false);
    }
    const gettotalWithdrawanToken = async () => {
      setloading(true);

      console.log("gettotalWithdrawanToken called");
      const result = await StackingContract.totalUnStakedToken();
      console.log("result");
      console.log(+result);
      let abc = +result;
      console.log("abc", abc);
      setState(0);
      console.log("state", state);
      setloading(false);

    };
    const gettotalStakers = async () => {
      setloading(true);

      const result = await StackingContract.totalStakers();
      let abc = +result;

      console.log("result");
      console.log(abc);

      settotalStakers(abc);
      setloading(false);

    };
    const gettotalStakedToken = async () => {
      setloading(true);

      const result = await StackingContract.totalStakedToken();
       let abc = +result;
      settotalStakedToken(abc);
      setloading(false);

    };
        const gettotalUnStakedToken = async () => {
      setloading(true);

          const result = await StackingContract.totalUnStakedToken();
           let abc = +result;
          settotalUnStakedToken(abc);
      setloading(false);

        };

    
    const gettotalClaimedRewardToken = async () => {
      setloading(true);

      const result = await StackingContract.totalClaimedRewardToken();
       let abc = +result;
      settotalClaimedRewardToken(abc);
      setloading(false);

    };
    const getstakeToken = async () => {
      setloading(true);

      const result = await StackingContract.stakeToken();
       console.log(result);

       let abc = +result;
       console.log("getstakeToken");
       console.log(abc);

      setstakeToken(result);
      setloading(false);

    };
 const getpercentDivider = async () => {
      setloading(true);

   const result = await StackingContract.percentDivider();
    let abc = +result;
   setpercentDivider(abc);
      setloading(false);
    
  };

   const getdecimals = async () => {
     setloading(true);

     const result = await TokenContract.decimals();
     let abc = +result;
     console.log("token decimals");
     console.log(abc);

     settokecnDecimal(abc);
     setloading(false);
   };




  return (
    <>
      <div style={loading === true ? maindiv : null}>
        <ClipLoader loading={loading} css={override} size={60} />
      </div>
      <Box>
        <Box style={{ flexGrow: 1, padding: "6px 60px" }}>
          <div>Binance App</div>
          <h3>All Read Operations For Contract </h3>
          <br />
          <Grid container spacing={2}>
            {/* <Grid item xs={6} md={4} style={set}>
            <Item>
              <button onClick={getAllownace}>Get allowance</button>
              {owner ? <div>{owner}</div> : <div>Connect Wallet...</div>}
            </Item>
          </Grid> */}

            <Grid item xs={6} md={4} style={set}>
              <Item style={{ border: "none !important" }}>
                <h3>Get Allownace</h3>
                <form style={form}>
                  <input
                    type="text"
                    name="ownerall"
                    required="required"
                    placeholder="owner (address)"
                    style={inpts}
                    onChange={allowanceChange}
                  />
                  <input
                    type="text"
                    name="spenderall"
                    required="required"
                    placeholder="spender (address)"
                    style={inpts}
                    onChange={allowanceChange}
                  />
                </form>
                <quote style={{ color: "red" }}>
                  Check How many Tokens in Allowance, That we have to Sale? OR
                  the any Person Can To Buy..
                </quote>
                <br />
                <button onClick={getAllownace}>getAllownace</button>
                {allowresult ? (
                  <div>{allowresult}</div>
                ) : (
                  <div>Enter Addresses...</div>
                )}
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item style={{ border: "none !important" }}>
                <h3>Get Balance Of</h3>
                <form style={form}>
                  <input
                    type="text"
                    name="addforbalance"
                    required="required"
                    placeholder="owner (address)"
                    style={inpts}
                    onChange={balanceChange}
                  />
                 
                </form>
                
                <br />
                <button onClick={getBalanceOf}>getAllownace</button>
                {balresult ? (
                  <div>{balresult}</div>
                ) : (
                  <div>0</div>
                )}
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={getOwner}>Get owner</button>
                {owner ? <div>{owner}</div> : <div>Connect Wallet...</div>}
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalWithdrawanToken}>
                  Get totalWithdrawanToken
                </button>

                <div>{state}</div>
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalUnStakedToken}>
                  Get totalUnStakedToken
                </button>
                <div>{totalUnStakedToken}</div>
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalSupply}>Total Supply</button>
                <div>{totalSupply}</div>
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalStakers}>Get totalStakers</button>
                <div>{totalStakers}</div>
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalStakedToken}>
                  Get totalStakedToken
                </button>
                <div>{totalStakedToken}</div>
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={gettotalClaimedRewardToken}>
                  Get totalClaimedRewardToken
                </button>
                <div>{totalClaimedRewardToken}</div>
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={getstakeToken}>Get stakeToken</button>
                {stakeToken ? (
                  <div>{stakeToken}</div>
                ) : (
                  <div>Connect Wallet...</div>
                )}
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={getpercentDivider}>Get percentDivider</button>
                <div>{percentDivider}</div>
              </Item>
            </Grid>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <button onClick={getdecimals}>
                  Get Decimals From other StackingContract
                </button>
                <div>{tokecnDecimal}</div>
              </Item>
            </Grid>
          </Grid>
          <br />
        </Box>

        {/* <button onClick={notify}>Notify!</button> */}

        <hr />
        <br />
        <br />

        <Box style={{ flexGrow: 1, padding: "6px 60px" }}>
          <div>Binance App</div>
          <h3
            style={{
              fontSize: "30px",
              fontFamily: "cursive",
              color: "#1976d2",
              textDecoration: "underline",
            }}
          >
            All Write Operations For Contract{" "}
          </h3>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} style={set}>
              <Item>
                <h3>Approve Token</h3>
                <form style={form}>
                  <input
                    type="text"
                    name="spender"
                    required="required"
                    placeholder="_spender (address)"
                    style={inpts}
                    onChange={approveChange}
                  />
                  <input
                    type="number"
                    name="approveamount"
                    required="required"
                    placeholder="_amount (uint256)"
                    style={inpts}
                    onChange={approveChange}
                  />
                </form>
                <button onClick={ApproveToken}>Approve Now</button>
                <br />
                <quote style={{ color: "red" }}>
                  Note* you have to first call <i>"approve"</i> to check
                  Allowance and to do Staking
                </quote>
                {/* {owner ? <div>{owner}</div> : <div>Connect Wallet...</div>} */}
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <h3>StakeBonus Form</h3>
                <form style={form}>
                  <input
                    type="number"
                    name="first"
                    required="required"
                    placeholder="(unit256) first"
                    style={inpts}
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="second"
                    required="required"
                    placeholder="(unit256) second"
                    style={inpts}
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="third"
                    required="required"
                    placeholder="(unit256) third"
                    style={inpts}
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="four"
                    required="required"
                    placeholder="(unit256) four"
                    style={inpts}
                    onChange={onChangeHandler}
                  />
                </form>
                <button onClick={stakeBonus}>set stakeBonus</button>
                {/* {owner ? <div>{owner}</div> : <div>Connect Wallet...</div>} */}
              </Item>
            </Grid>

            <Grid item xs={6} md={4} style={set}>
              <Item>
                <h3>Stake Form</h3>
                <form style={form}>
                  <input
                    type="number"
                    name="stakeAmount"
                    required="required"
                    placeholder="stakeAmount (unit256)"
                    style={inpts}
                    onChange={onChangeStake}
                  />
                  <input
                    type="number"
                    name="planIndex"
                    required="required"
                    placeholder="planIndex  (unit256)"
                    style={inpts}
                    onChange={onChangeStake}
                  />
                </form>
                <button onClick={writestake}>stake</button>
                {/* {owner ? <div>{owner}</div> : <div>Connect Wallet...</div>} */}
              </Item>
            </Grid>
          </Grid>
        </Box>

        <ToastContainer />
      </Box>
    </>
  );
}

export default Binance