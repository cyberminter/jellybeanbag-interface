import { styled } from "@mui/system";

import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import ReferralLink from "./components/ReferralLink";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";

import NetworksCard from "./components/networksCard";



const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      
      <Connect />
      
      <Header />
      
      <NetworksCard />


      
      <BakeCard />
      <ReferralLink address={address} />
      <Footer />
    </Wrapper>
  );
}