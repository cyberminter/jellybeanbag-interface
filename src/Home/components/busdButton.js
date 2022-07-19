import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const ConnectButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 48,
  top: 118,

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));



const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: "none",
  marginTop: -24,
  marginBottom: 48,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));



export default function BUSDBTN({ responsive = true }) {


  return responsive ? (
    <>
    <ConnectButton
      color="secondary"
      variant="contained"
      data-toggle="modal" data-target="#exampleModal"
    >
     BUSD Miner
    </ConnectButton>

    </>
    
  ) : (
    <>
    <SmallScreenConnectButton
      color="secondary"
      variant="contained"
      data-toggle="modal" data-target="#exampleModal"
    >
     BUSD Miner
    </SmallScreenConnectButton>
    </>
  );




}
