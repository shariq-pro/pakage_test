"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));
var _reactBootstrap = require("react-bootstrap");
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
var _Nav = _interopRequireDefault(require("react-bootstrap/Nav"));
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
var _Tab = _interopRequireDefault(require("react-bootstrap/Tab"));
var _walletlinkConnector = require("@web3-react/walletlink-connector");
var _walletconnectConnector = require("@web3-react/walletconnect-connector");
var _injectedConnector = require("@web3-react/injected-connector");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _metamask = _interopRequireDefault(require("../Assests/wallet_logo/metamask.svg"));
var _coinbase = _interopRequireDefault(require("../Assests/wallet_logo/coinbase.svg"));
var _walletconnect = _interopRequireDefault(require("../Assests/wallet_logo/walletconnect.svg"));
var _img_ = _interopRequireDefault(require("../Assests/img_1.svg"));
var _img_2 = _interopRequireDefault(require("../Assests/img_2.svg"));
var _wallet_qr = _interopRequireDefault(require("../Assests/wallet_qr.png"));
var _coinbase_qr = _interopRequireDefault(require("../Assests/coinbase_qr.png"));
require("./Wallet.scss");
var _core = require("@web3-react/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Walletmodal(props) {
  const [value, setValue] = (0, _react.useState)(false);
  const {
    active,
    chainId,
    account,
    library,
    connector,
    provider,
    activate,
    deactivate,
    error
  } = (0, _core.useWeb3React)();
  const [balance, setBalance] = (0, _react.useState)(null);
  const [wallet_account, set_wallet_account] = (0, _react.useState)(null);
  const [wallet_install, set_wallet_install] = (0, _react.useState)(false);
  const [wallet_msg, set_wallet_msg] = (0, _react.useState)(null);
  // const contractAbi = require("../Json/ContractAbi.json");
  const contractAddress = "0xBBdBd5576BaBE447E5363BfdC5e2E21C875E8a63";
  const [load, setLoad] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setLoad(true);
    console.log('active', active, chainId, account, library, connector, provider, localStorage.getItem('eth_bal'));
    get_current_account_details(props);
    setLoad(false);
  }, [active]);
  (0, _react.useEffect)(() => {
    set_wallet_msg(null);
    if (error) {
      set_wallet_msg(null);
      const err = error;
      set_wallet_msg(err.message);
    }
  }, [error]);
  const get_current_account_details = async props => {
    console.log('props props ', props);
    if (window.ethereum) {
      if (active) {
        setLoad(true);
        const acc = await connector.getAccount();
        const balance = await library.getBalance(acc);
        setBalance(balance / 1e18);
        set_wallet_account(acc);
        props.func(acc);
        localStorage.setItem('eth_bal', balance / 1e18);
        setLoad(false);
        console.log('acc', acc);
        console.log('balance', balance / 1e18);
      }
    } else {
      console.log('false');
      set_wallet_install(false);
    }
  };
  const injected = new _injectedConnector.InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 61, 137, 1337, 80001]
  });
  const CoinbaseWallet = new _walletlinkConnector.WalletLinkConnector({
    url: "https://polygon-mumbai.g.alchemy.com/v2/7r5JXbmB3DQ8Xj0fKXX58DBna9EJNX4p",
    appName: "Web3-react Demo",
    qrcode: true,
    supportedChainIds: [1, 3, 4, 5, 42]
  });
  const WalletConnect1 = new _walletconnectConnector.WalletConnectConnector({
    rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/7r5JXbmB3DQ8Xj0fKXX58DBna9EJNX4p",
    bridge: "https://bridge.walletconnect.org",
    appName: "Web3-react Demo",
    qrcode: true,
    supportedChainIds: [1, 3, 4, 5, 42, 61, 137, 1337, 80001]
  });
  const connectMetamask = async () => {
    set_wallet_msg(null);
    try {
      if (window.ethereum) {
        set_wallet_install(true);
        if (window.ethereum.isMetaMask) {
          localStorage.setItem('check_disconnect', false);
          setLoad(true);
          console.log('connecting to metamask', window.ethereum);
          try {
            await activate(injected);
            set_wallet_install(true);
          } catch (err) {
            set_wallet_install(false);
            console.log('😥', err.message);
          }
          setLoad(false);
        }
        if (!window.ethereum.isMetaMask) {
          set_wallet_install(false);
          console.log('😥 Metamask Not install');
        }
      } else {
        set_wallet_install(false);
      }
    } catch (err) {
      console.log('😥', err.message);
    }
  };
  const connectCoinbase = async () => {
    set_wallet_msg(null);
    setLoad(true);
    try {
      localStorage.setItem('check_disconnect', false);
      await activate(CoinbaseWallet);
    } catch (err) {
      console.log('not connected to coinbase ', err);
    }
    console.log('wallet_install', wallet_install);
  };
  const connectWalletconnect = async () => {
    set_wallet_msg(null);
    setLoad(true);
    console.log('connecting to Walletconnect');
    try {
      localStorage.setItem('check_disconnect', false);
      await activate(WalletConnect1);
    } catch (err) {
      console.log('not connected to WalletConnect ', err);
    }
    console.log('wallet_install', wallet_install);
    setLoad(false);
  };
  return /*#__PURE__*/_react.default.createElement(_Modal.default, _extends({}, props, {
    size: "lg",
    "aria-labelledby": "contained-modal-title-vcenter",
    centered: true
  }), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, {
    className: "p-1"
  }, /*#__PURE__*/_react.default.createElement(_Tab.default.Container, {
    id: "left-tabs-example ",
    defaultActiveKey: "profile"
  }, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "p-1 h-100"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 4,
    className: "border_grey"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "wallet_heading_container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "wallet_heading"
  }, "Connect a Wallet  ")), /*#__PURE__*/_react.default.createElement(_Nav.default, {
    variant: "pills",
    className: "flex-column"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "wallet_popular"
  }, "Popular"), /*#__PURE__*/_react.default.createElement(_Nav.default.Item, null, /*#__PURE__*/_react.default.createElement(_Nav.default.Link, {
    eventKey: "MetaMask",
    onClick: () => {
      connectMetamask();
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _metamask.default,
    className: "margin_right"
  }), " MetaMask")), /*#__PURE__*/_react.default.createElement(_Nav.default.Item, null, /*#__PURE__*/_react.default.createElement(_Nav.default.Link, {
    eventKey: "Coinbase",
    onClick: () => {
      connectCoinbase();
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _coinbase.default,
    className: "margin_right"
  }), " Coinbase Wallet")), /*#__PURE__*/_react.default.createElement(_Nav.default.Item, null, /*#__PURE__*/_react.default.createElement(_Nav.default.Link, {
    eventKey: "WalletConnect",
    onClick: () => {
      connectWalletconnect();
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _walletconnect.default,
    className: "margin_right"
  }), " WalletConnect")))), /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 8
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "wallet_heading_container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "wallet_heading"
  }, " ", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClose,
    onClick: props.onHide,
    className: "wallet_close_icon"
  }))), /*#__PURE__*/_react.default.createElement(_Tab.default.Content, null, /*#__PURE__*/_react.default.createElement(_Tab.default.Pane, {
    eventKey: "profile"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
    className: "modal_inner_container"
  }, /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement(_Col.default, {
    className: "modal_inner_main_heading"
  }, /*#__PURE__*/_react.default.createElement("span", null, "What is a Wallet?"))), /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 2
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "modal_inner_img",
    src: _img_.default
  })), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 10
  }, /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "modal_inner_sub_heading"
  }, /*#__PURE__*/_react.default.createElement("span", null, "A Home for your Digital Assets")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "modal_inner_sub_text"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."))))), /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-4"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 2
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "modal_inner_img",
    src: _img_2.default
  })), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 10
  }, /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "modal_inner_sub_heading"
  }, /*#__PURE__*/_react.default.createElement("span", null, "A New Way to Log In")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "modal_inner_sub_text"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Instead of creating new accounts and passwords on every website, just connect your wallet."))))))), /*#__PURE__*/_react.default.createElement(_Tab.default.Pane, {
    eventKey: "MetaMask"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
    className: "modal_inner_container"
  }, wallet_install ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-4 text-center"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "metamask_modal_text"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "metamask_modal_img",
    src: _metamask.default
  })), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-4"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_inner_text"
  }, "Opening MetaMask")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "pt-2"
  }, wallet_msg !== null ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_subtext"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClose,
    style: {
      color: 'red',
      fontSize: '25px'
    }
  }), " ", wallet_msg)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_subtext"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faSpinner,
    onClick: props.onHide,
    className: "fa-spin"
  }), " Waiting for connection"))))))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-4 text-center"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "metamask_modal_text"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "metamask_modal_img",
    src: _metamask.default
  })), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-4"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_inner_text"
  }, "MetaMask is not installed")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "pt-2"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_subtext"
  }, "The MetaMask extension is not installed in your browser")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "pt-2"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "metamask_modal_inner_button",
    onClick: () => window.open("https://metamask.io/download/")
  }, "INSTALL")))))))), /*#__PURE__*/_react.default.createElement(_Tab.default.Pane, {
    eventKey: "Coinbase"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
    className: "modal_inner_container pt-0"
  }, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-1 text-center"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_inner_text pb-1"
  }, "Scan with Coinbase Wallet")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, wallet_msg !== null ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_subtext",
    style: {
      fontSize: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClose,
    style: {
      color: 'red',
      fontSize: '20px'
    }
  }), " ", wallet_msg))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement("img", {
    style: {
      width: '100%'
    },
    src: _coinbase_qr.default,
    alt: "qr code"
  })))))), /*#__PURE__*/_react.default.createElement(_Tab.default.Pane, {
    eventKey: "WalletConnect"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
    className: "modal_inner_container pt-0"
  }, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "pt-1 text-center"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "metamask_modal_inner_text pb-1"
  }, "Scan with your phone")), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("img", {
    style: {
      width: '100%'
    },
    src: _wallet_qr.default,
    alt: "qr code"
  })))))))))));
}
var _default = Walletmodal;
exports.default = _default;