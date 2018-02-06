var EventEmitter = require('events').EventEmitter;
var customEvent = new EventEmitter();

export {customEvent};


export const REFRESH_ARTICLE_LIST = 'REFRESH_ARTICLE_LIST';
export const REFRESH_SORTS_LIST = 'REFRESH_SORTS_LIST';