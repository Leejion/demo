import createPage from './Page';
import * as base from './base';
import ajax from './api/ajax';
import toast from './api/toast';
import { getDay, getMonth, getYear } from './api/date';
import * as high from './containers';
import './static/font/iconfont.css';
import './static/font/demo.css';

const dateUtils = {
	getDay,
	getMonth,
	getYear
};
export { createPage, base, ajax, toast, dateUtils, high };
