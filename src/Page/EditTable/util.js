import CONFIG from '../../public/config';
import { isObj, formatAcuracy } from '../../public';

// 检测是否有一个含有numberindex
export function checkHasIndex(arr) {
    return arr.some((item) => {
        return item.attrcode == 'numberindex';
    });
}

// 处理浏览态的值
export function scaleFormat(originObj) {
    if (isObj(originObj) && originObj['scale'] > 0) {
        return { ...originObj, value: formatAcuracy(originObj['value'], originObj['scale']) };
    }
    return originObj;
}

// 
export function getDisplayByValue(value, item) {
    if (CONFIG.getDisplay.includes(item.itemtype) && Array.isArray(item.options)) {
        let { display } = item.options.filter(item => item.value == value)[0]
        return display
    }
    return null;
}