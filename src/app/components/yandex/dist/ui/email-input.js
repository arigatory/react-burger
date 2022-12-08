"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.EmailInput=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _propTypes=_interopRequireDefault(require("prop-types"));var _react=_interopRequireWildcard(require("react"));var _input=require("./input");var validateEmail=function validateEmail(email){var re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return re.test(email);};var EmailInput=function EmailInput(_ref){var value=_ref.value,onChange=_ref.onChange,_ref$size=_ref.size,size=_ref$size===void 0?'default':_ref$size,_ref$placeholder=_ref.placeholder,placeholder=_ref$placeholder===void 0?'E-mail':_ref$placeholder,_ref$isIcon=_ref.isIcon,isIcon=_ref$isIcon===void 0?false:_ref$isIcon,_ref$extraClass=_ref.extraClass,extraClass=_ref$extraClass===void 0?'':_ref$extraClass,rest=(0,_objectWithoutProperties2.default)(_ref,["value","onChange","size","placeholder","isIcon","extraClass"]);var _useState=(0,_react.useState)(isIcon),_useState2=(0,_slicedToArray2.default)(_useState,2),fieldDisabled=_useState2[0],setDisabled=_useState2[1];var _useState3=(0,_react.useState)(false),_useState4=(0,_slicedToArray2.default)(_useState3,2),error=_useState4[0],setError=_useState4[1];var inputRef=(0,_react.useRef)(null);var onIconClick=function onIconClick(){setDisabled(false);setTimeout(function(){var _inputRef$current;return(_inputRef$current=inputRef.current)===null||_inputRef$current===void 0?void 0:_inputRef$current.focus();},0);};var validateField=function validateField(value){setError(!validateEmail(value));};var onFocus=function onFocus(){setError(false);};var onBlur=function onBlur(e){if(e.target.value){validateField(e.target.value);}else{setError(false);}isIcon&&setDisabled(true);};return/*#__PURE__*/_react.default.createElement(_input.Input,(0,_extends2.default)({type:"email",placeholder:placeholder,onChange:onChange,icon:isIcon?'EditIcon':undefined,value:value,ref:inputRef,onBlur:onBlur,onFocus:onFocus,error:error,disabled:fieldDisabled,onIconClick:onIconClick,errorText:'Ой, произошла ошибка!',size:size,extraClass:extraClass},rest));};exports.EmailInput=EmailInput;EmailInput.displayName="EmailInput";EmailInput.propTypes={value:_propTypes.default.string.isRequired,size:_propTypes.default.oneOf(['default','small']),placeholder:_propTypes.default.string,isIcon:_propTypes.default.bool,extraClass:_propTypes.default.string,children:_propTypes.default.node};