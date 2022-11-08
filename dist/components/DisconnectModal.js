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
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
var _Nav = _interopRequireDefault(require("react-bootstrap/Nav"));
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
var _Tab = _interopRequireDefault(require("react-bootstrap/Tab"));
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
require("./Disconnect.scss");
var _core = require("@web3-react/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DisconnectModal(props) {
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
  const [copyText, setCopyText] = (0, _react.useState)(false);
  const copyFunc = () => {
    console.log('here i am');
    navigator.clipboard.writeText(props.walletAddress);
    setCopyText(true);
  };
  const injected = new _injectedConnector.InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 61, 137, 1337, 80001]
  });
  const disconnect_wallet = async () => {
    console.log('disconnected to wallet');
    try {
      await deactivate(injected);
      window.localStorage.clear();
      localStorage.setItem('check_disconnect', true);
      window.location.reload();
    } catch (err) {
      console.log('not disconnected to wallet ', err);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Modal.default, _extends({}, props, {
    size: "md",
    "aria-labelledby": "contained-modal-title-vcenter ",
    centered: true,
    id: "innerDisconnect"
  }), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, {
    className: "p-1 "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "wallet_heading_container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "wallet_heading"
  }, " ", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClose,
    onClick: props.onHide,
    className: "wallet_close_icon"
  }))), /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "p-1 h-100"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 12,
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "disconnect_modal_img"
  }, "\uD83C\uDF4A"), /*#__PURE__*/_react.default.createElement("div", {
    className: "disconnect_modal_address mt-4"
  }, " ", props.walletAddress)), /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 12,
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 6,
    className: "text-center"
  }, copyText ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    className: "disconnect_btn_style",
    onClick: () => copyFunc()
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCheck,
    onClick: props.onHide,
    className: "fa light"
  }), " Copied")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    className: "disconnect_btn_style",
    onClick: () => copyFunc()
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCopy,
    onClick: props.onHide,
    className: "fa light"
  }), " Copy"))), /*#__PURE__*/_react.default.createElement(_Col.default, {
    sm: 6,
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "disconnect_btn_style",
    onClick: () => {
      disconnect_wallet();
    }
  }, " ", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faRightFromBracket,
    onClick: props.onHide,
    className: "fa regular"
  }), " Disconnect"))))))));
}
var _default = DisconnectModal;
exports.default = _default;