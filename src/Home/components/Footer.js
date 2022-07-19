import Grid from "@mui/material/Grid";

import esIcon from "../assets/backArrow.png";
import tgIcon from "../assets/telegramLogo.png";
import twIcon from "../assets/twitterLogo.png";

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href="https://jellybeanswap.com/" >
          <img src={esIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://t.me/jellybeancash"   target="__blank">
          <img src={tgIcon} alt="telegram logo" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://twitter.com/jellybeancash" target="__blank">
          <img src={twIcon} alt="twitter logo" width={48} height={48} />
        </a>
      </Grid>
    </Grid>
  );
}
