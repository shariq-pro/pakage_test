"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _Walletmodal = _interopRequireDefault(require("./Walletmodal"));
var _core = require("@web3-react/core");
var _injectedConnector = require("@web3-react/injected-connector");
var _walletlinkConnector = require("@web3-react/walletlink-connector");
var _DisconnectModal = _interopRequireDefault(require("./DisconnectModal"));
require("../bootstrap.min.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Wallet() {
  const [modalShow, setModalShow] = (0, _react.useState)(false);
  const [disconnectmodalShow, setDisconnectmodalShow] = (0, _react.useState)(false);
  const [connect_wallet_address, set_connect_wallet_address] = (0, _react.useState)(false);
  const [wallet_address, get_connect_wallet_address] = (0, _react.useState)(false);
  const {
    active,
    chainId,
    account,
    library,
    connector,
    provider,
    activate,
    deactivate
  } = (0, _core.useWeb3React)();
  (0, _react.useEffect)(() => {
    getCurrentWallet();
  }, []);
  const injected = new _injectedConnector.InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 61, 137, 1337, 80001]
  });
  const CoinbaseWallet = new _walletlinkConnector.WalletLinkConnector({
    url: "https://polygon-mumbai.g.alchemy.com/v2/7r5JXbmB3DQ8Xj0fKXX58DBna9EJNX4p",
    appName: "Web3-react Demo",
    qrcode: true,
    supportedChainIds: [1, 3, 4, 5, 42]
  });
  async function getCurrentWallet() {
    const check_disconnect = localStorage.getItem('check_disconnect');
    if (check_disconnect === 'false') {
      console.log('window.ethereum', window.ethereum);
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts"
          });
          if (addressArray.length > 0) {
            if (window.ethereum.isMetaMask) {
              activate(injected);
            } else if (window.ethereum.isCoinbaseWallet) {
              activate(CoinbaseWallet);
            }
          }
        } catch (err) {
          if (err.code === 4001) {
            console.log('😥 User Reject Connection Request Retry To Connect');
          } else {
            console.log('😥', err.message);
          }
        }
      } else {
        console.log('😥 install wallet');
      }
    } else {}
  }
  function getwalletaddress(props) {
    console.log('props', props);
    if (props !== null) {
      get_connect_wallet_address(props);
      set_connect_wallet_address(true);
      setModalShow(false);
    } else {
      set_connect_wallet_address(false);
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", null, connect_wallet_address ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "primary",
    onClick: () => setDisconnectmodalShow(true)
  }, wallet_address)) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "primary",
    onClick: () => setModalShow(true)
  }, "Connect"), /*#__PURE__*/_react.default.createElement(_Walletmodal.default, {
    func: getwalletaddress,
    show: modalShow,
    onHide: () => setModalShow(false)
  }), /*#__PURE__*/_react.default.createElement(_DisconnectModal.default, {
    show: disconnectmodalShow,
    onHide: () => setDisconnectmodalShow(false),
    walletAddress: wallet_address
  }));
}
var _default = Wallet;
exports.default = _default;