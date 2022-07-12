import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { switchNetwork } from "../../providers/AuthProvider";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "#20242A",
  margin: "1rem",
});







export default function networksCard() {

  return (
    <CardWrapper>
      <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography gutterBottom variant="h5" textAlign="center">
          Networks
        </Typography>
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
        >
          <img alt="BNB" src="./media/logos/bnb.png" width="40" style={{  cursor: "pointer" }} onClick={() => switchNetwork(56)}/>
          <img alt="AVAX" src="./media/logos/avax.png" width="40" style={{ margin: "1rem", cursor: "pointer" } }  onClick={() => switchNetwork(43114)}  />
          <img alt="ETC" src="./media/logos/etc.png" width="40" style={{  cursor: "pointer" }}  onClick={() => switchNetwork(61)} />


        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
