import { isObj, formatAcuracy } from '../../public';

export function checkHasIndex(arr) {
    return arr.some((item) => {
        return item.attrcode == 'numberindex';
    });
}

export function scaleFormat(originObj) {
    if (isObj(originObj) && originObj['scale'] > 0) {
        return { ...originObj, value: formatAcuracy(originObj['value'], originObj['scale']) };
    }
    return originObj;
}
