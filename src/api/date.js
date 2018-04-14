import moment from 'moment';

//得到某个日期后几天是哪天
export function getAfterDay(date, number, format) {//传入的日期，几天后，日期的格式
    const newDate = moment(date).add(number, 'days').format(format);
    return newDate; 
};

//得到某个日期后前几天是哪天
export function getBeforeDay(date, number, format) {//传入的日期，几天后，日期的格式
    const newDate = moment(date).add(-number, 'days').format(format);
    return newDate;
};

//得到某个日期后几个月是哪天
// date = [2010, 0, 31];
export function getAfterMonth(date, number, format) {
    const newDate = moment(date).add(number, 'months').format(format);
    return newDate; 
};

//得到某个日期前几个月是哪天
export function getBeforeMonth(date, number, format) {
    const newDate = moment(date).add(-number, 'months').format(format);
    return newDate;
};

//得到某个日期后几年是哪天
export function getAfterYear(date, number, format) {
    const newDate = moment(date).add(number, 'years').format(format);
    return newDate;
};

//得到某个日期前几年是哪天
export function getBeforeYear(date, number, format) {
    const newDate = moment(date).add(-number, 'years').format(format);
    return newDate;
};

//得到某个日期的前一天
export function getPreDay(date, format) {
    const newDate = moment(date).add(-1, 'days').format(format);
    return newDate;
};

//得到某个日期的后一天
export function getNextDay(date, format) {
    const newDate = moment(date).add(1, 'days').format(format);
    return newDate;
};


