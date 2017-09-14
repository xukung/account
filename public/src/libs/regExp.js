/**
 * 表单验证正则匹配
 * @type {RegExp}
 */

export const UID = /^[a-zA-Z0-9_]{1,30}$/;
export const EMAIL = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
export const MOBILE = /^1[0-9]{10}$/;
export const TELEPHONE_FRONT = /^[0-9]{3,4}$/; //区号
export const TELEPHONE_MIDDLE = /^[0-9]{7,8}$/;  //主号
export const TELEPHONE_END = /^[0-9]{0,6}$/;  //分机号

export const INTEGER = /^-?\d+$/;  //整数
export const FLOAT = /^(-?\d+)(\.\d+)?$/;  //浮点数
