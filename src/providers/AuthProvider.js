import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
  React,
} from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {RPCList, networkNames, networklabelsNames, networkNativeCurrency, contractAddress} from "../config"




function chainNameBychainID(chainID) {


  if(chainID === 56) {
    return networklabelsNames.BSC;
  } else if(chainID === 43114) {
    return networklabelsNames.AVAX;
  } else if(chainID === 61) {
    return networklabelsNames.ETC;
  }

}


function rpcBychainID(chainID) {

  if(chainID === 56) {
    return RPCList.BSC;
  } else if(chainID === 43114) {
    return RPCList.AVAX;
  } else if(chainID === 61) {
    return RPCList.ETC;
  }

}

function networkNativeCurrencyBychainID(chainID) {

  if(chainID === 56) {
    return networkNativeCurrency.BSC;
  } else if(chainID === 43114) {
    return networkNativeCurrency.AVAX;
  } else if(chainID === 61) {
    return networkNativeCurrency.ETC;
  }

}

 const imgByChainID = (chainID) => {

  if(chainID === 56) {
    document.querySelector("#headerIMG").src = "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logoBSC.svg";
  } else if(chainID === 43114) {
    document.querySelector("#headerIMG").src = "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logoAVAX.svg";
  } else if(chainID === 61) {
    document.querySelector("#headerIMG").src = "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logo.svg";
  } else {
    document.querySelector("#headerIMG").src = "https://raw.githubusercontent.com/cyberminter/jellybeanswap-branding/main/brand/jellybeanbag/logo.svg";
  }

}

function nameOfNativeCurrencyByChainID(chainID) {


  if(chainID === 56) {
    document.querySelector("title").innerText = "Jelly Bean Bag | BNB Pool";

    changeNameByClassName(".chainCurrency", "BNB");

  } else if(chainID === 43114) {
    document.querySelector("title").innerText = "Jelly Bean Bag | AVAX Pool";

    changeNameByClassName(".chainCurrency", "AVAX");

  } else if(chainID === 61) {

    document.querySelector("title").innerText = "Jelly Bean Bag | ETC Pool";

    changeNameByClassName(".chainCurrency", "ETC");

  } else {
    document.querySelector("title").innerText = "Jelly Bean Bag | ETC Pool";

    changeNameByClassName(".chainCurrency", "ETC");
  }

}

function changeNameByClassName(className, text) {

  const nodeList = document.querySelectorAll(className);
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].innerText = text;
  }

}



export const getContractByChainID = (chainID) => {
  if(chainID === 56) {
    return contractAddress.BSC;
  } else if(chainID === 43114) {
    return contractAddress.AVAX;
  } else if(chainID === 61) {
    return contractAddress.ETC;
  } else {
    return contractAddress.ETC;

  }

}

export const AuthContext = createContext({
  address: null,
  connect: () => null,
  loading: false,
  disconnect: () => null,
  chainId: null,
  setSnackbar: () => null,
});

// to switch by on click

export async function switchNetwork(chainID) {
  try {

  if (window.ethereum.networkVersion !== chainID) {

    

    try {

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainID) }]

      });


    } catch (err) {

        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {

        await window.ethereum.request(
          
          {
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: chainNameBychainID(chainID),
                chainId: Web3.utils.toHex(chainID),
                nativeCurrency: networkNativeCurrencyBychainID(chainID),
                rpcUrls: [rpcBychainID(chainID)]
              }
            ]
          }

        );
      }
    }

  }

} catch (e) {

  console.log("failed");

}


}




const providerOptions = {

  
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        56: RPCList.BSC,
        43114: RPCList.AVAX,
        61: RPCList.ETC,

      },
      networks: {
        56: networkNames.BSC,
        43114: networkNames.AVAX,
        61: networkNames.ETC

      }, 
      
      
    },
  },


};


const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const AuthProvider = ({ children }) => {



  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [chainId, setChainId] = useState(null);


  const subscribeProvider = (provider) => {
    provider.on("disconnect", (error) => {
      console.log(error);
      setChainId(null);
      setAddress(null);
    });
    provider.on("accountsChanged", (accounts) => {
      setAddress(accounts[0]);
      setSnackbar({
        type: "info",
        message: "Account Changed",
      });
    });
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      setChainId(chainId);

       imgByChainID(parseInt(chainId));
       nameOfNativeCurrencyByChainID(parseInt(chainId));

    });
  };




  const connect = async () => {
    if (address) {
      return;
    }
    setLoading(true);

    try {
      let web3 = new Web3(Web3.givenProvider);
      // prevents browsers without web3 wallet from connecting to the dapp
      /*
      if (!web3.currentProvider) {
        setSnackbar({
          type: "error",
          message: '"No provider was found"',
        });
        return;
      }
  */
      const provider = await web3Modal.connect();
      
      web3 = new Web3(provider);
      subscribeProvider(provider);

      const accounts = await web3.eth.getAccounts();
      const chain = await web3.eth.getChainId();


      setAddress(accounts[0]);
      setChainId(chain);
    } catch (err) {
      console.error(err);
      setSnackbar({
        type: "error",
        message: "Failed to connect",
      });
    }
    setLoading(false);
  };

  const disconnect = () => {
    web3Modal.clearCachedProvider();
    setAddress(null);
    setChainId(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(null);
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{ address, loading, connect, disconnect, chainId, setSnackbar }}
    >
      {children}
      {snackbar && (
        <Snackbar
          open={!!snackbar}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          {
            <Alert
              onClose={handleClose}
              severity={snackbar?.type}
              sx={{ width: "100%" }}
            >
              {snackbar?.message}
            </Alert>
          }
        </Snackbar>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
