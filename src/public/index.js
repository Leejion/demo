import warning from 'warning';
import CONFIG from './config';

/*
 * @method   错误警告，只警告一次
 * @author   add by yangguoqiang @18/03/01
 * @params 
 *     condition     {Boolean.false}    生效条件，条件为false才执行
 *     format        {String}           提示语句
 *     arg           {[any]}            可选
 * @return   {undefined}       执行语句，无返回
 * @demo     warningOnce(false, '此处错误')
 */
const warned = {};
export function warningOnce(condition, format, arg) {
    if (!warned[format]) {
        warning(condition, format, arg);
        warned[format] = true;
    }
}

/*
 * @method   检测是否是常规的 Object  {} 这种形式
 * @author   add by yangguoqiang @18/03/05
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isObj()
 */
export function isObj(param) {
    return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
}

/*
 * @method   if条件下为false   除去NaN、0、-0、false   剩余undefined、null、""
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isWrong(param) {
    return (typeof param === 'undefined') || param === null || param === ''
}

/*
 * @method   检测是否是需要显示display的itemtype类型
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isDisplay(param) {
    return (CONFIG.displayTypes.includes(param))
}


/*
 * @method   测试不存在或者值为true 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrTrue('')    
 */
export function undefinedOrTrue(one) {
    return (typeof one === 'undefined' || one === true)
}

/*
 * @method   测试 不存在或者值为false 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrfalse('')
 */
export function undefinedOrfalse(one) {
    return (typeof one === 'undefined' || one === false)
}

/*
 * @method   根据不同类型初始化 null 输出后台可用的数据格式。
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     origin    {any}      数据来源
 *     type      {string}   数据类型
 * @return   {any}          返回
 * @demo     typeFormat('', 'string')
 */
export function typeFormat(origin, type) {
    // 'input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer' 的空value处理
    if (CONFIG.string.includes(type) && (origin === null || origin === undefined)) {
        return ''
    }
    // switch 的空value处理
    if (CONFIG.boolean.includes(type) && (origin === null || origin === undefined)) {
        return !!origin
    }
    // number 的空value处理  TODO  需讨论
    if (CONFIG.number.includes(type) && (origin === null || origin === undefined)) {
        return null;
    }
    return origin;
}

export function isUndefined(origin) {
    return (typeof origin === 'undefined')
}

// 补0
export function addZero(num, scale) {
    if (isNaN(Number(num))) {
        return null
    }
    if (scale > 0) {
        let start = num.split('.')[0];
        let end = num.split('.')[1];
        if (!end) {
            end = ''
        }
        let len = end.length;
        if (len < scale) {
            end = end.padEnd(scale, '0')
        }
        return start + '.' + end
    } else {
        return num
    }

}

//精度 + 补0 + 千分位综合处理
export function formatAcuracy(value, len = 0) {
    if (value === null || value === undefined) {
        return value;
    }
    return commafy(addZero(formatDot(value, len), len));
}

//移除千分位
export function removeThousands(val) {
    return val ? val.toString().replace(/\,/gi, '') : val;
}

//数字转换成千分位 格式
export function commafy(num) {
    let pointIndex, intPart, pointPart;
    if (num === '-') {
        return '-'
    }
    if (isNaN(num)) {
        return '';
    }

    num = num + '';
    if (/^.*\..*$/.test(num)) {
        pointIndex = num.lastIndexOf('.');
        intPart = num.substring(0, pointIndex);
        pointPart = num.substring(pointIndex + 1, num.length);
        intPart = intPart + '';
        let re = /(-?\d+)(\d{3})/;
        while (re.test(intPart)) {
            intPart = intPart.replace(re, '$1,$2');
        }
        num = intPart + '.' + pointPart;
    } else {
        num = num + '';
        let re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
            num = num.replace(re, '$1,$2');
        }
    }
    return num;
}

// 精度处理
export function formatDot(value, len = 6) {
    let formatVal, dotSplit, val;

    val = (value || 0).toString();

    dotSplit = val.split('.');

    if (dotSplit.length > 2 || !value) {
        return value;
    }

    if (val.indexOf('.') > -1) {
        if (len == 0) {
            formatVal = dotSplit[0];
        } else {
            formatVal = val.substring(0, val.indexOf('.') + len + 1);
        }

    } else {
        formatVal = val;
    }

    return formatVal;
}
