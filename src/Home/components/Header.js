import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Connect from "./Connect";

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



export default function Header() {
  return (
    <Wrapper>
      <img src={"https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logo.svg"} alt="jelly bean logo" width={"40%"} style={{ marginTop: -48 }} />
 
      <br />
      <br />
      <br />

      <Connect responsive={false} />
      <Typography variant="h6" marginTop={-3}>
        The only ETC Reward Pool you will ever need!
      </Typography>
    </Wrapper>
  );
}
