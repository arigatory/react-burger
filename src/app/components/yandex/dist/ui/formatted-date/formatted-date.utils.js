"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.isYesterday=exports.isToday=exports.getFormattedDate=exports.getFormattedTime=void 0;require("core-js/modules/es.array.concat.js");require("core-js/modules/es.string.pad-start.js");var _pluralRu=_interopRequireDefault(require("plural-ru"));var getDiffDays=function getDiffDays(date){return Math.floor((new Date().getTime()-date.getTime())/(1000*60*60*24));};var getFormattedTime=function getFormattedTime(date){return"".concat(String(date.getHours()).padStart(2,'0'),":").concat(String(date.getMinutes()).padStart(2,'0'));};exports.getFormattedTime=getFormattedTime;var getFormattedDate=function getFormattedDate(date){var diffDays=getDiffDays(date);return"".concat((0,_pluralRu.default)(diffDays,'%d день','%d дня','%d дней')," \u043D\u0430\u0437\u0430\u0434, ").concat(getFormattedTime(date));};exports.getFormattedDate=getFormattedDate;var isToday=function isToday(date){return getDiffDays(date)===0;};exports.isToday=isToday;var isYesterday=function isYesterday(date){return getDiffDays(date)===1;};exports.isYesterday=isYesterday;