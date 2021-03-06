import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Connect from "./Connect";
import  FAQ  from "./FAQ";


const imgByChainID = (chainID) => {

  if(chainID === 56) {
    return "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logoBSC.svg";
  } else if(chainID === 43114) {
    return "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logoAVAX.svg";
  } else if(chainID === 61) {
    return "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logo.svg";
  } else {
    return"https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logo.svg";
  }

}

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));



function isWindow() {
  try {
    return window.ethereum.networkVersion;

  } catch {
    return 0;

  }
}


export default function Header() {

 
   return (
    <Wrapper>

      
      <img id="headerIMG"   src={imgByChainID(parseInt(isWindow())) }  alt="jelly bean logo" width={"40%"} style={{ marginTop: -48 }} />

      <br />
      <br />
      <br />
      
      <Connect responsive={false} />
      <FAQ responsive={false} />

      <Typography variant="h6" marginTop={-3}>
        The only JellyBean Reward Pool you will ever need!
      </Typography>
      
    </Wrapper>
  );
}
