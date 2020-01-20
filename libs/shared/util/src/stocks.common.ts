import { StocksConstant } from './stocks.constants';
function getRangeForDates(startDate: Date): string {
    const daysTillToday = getDurationByDays(startDate);
    const rangeArr = StocksConstant.PERIOD_TO_DAY_RANGE.filter(range => {
        if (daysTillToday >= range.min && daysTillToday <= range.max) {
            return range;
        }
    });
    //If Range is not present in defined period of days, then it is max range
    let range = (rangeArr.length>0)?rangeArr[0].name:"max";
    return range;
}

function getDurationByDays(startDate: Date):number{
    let today = new Date(); 
    var durationInTime = (today.getTime() - startDate.getTime()) / 1000;
    const durationInDays:number = Math.abs(Math.round(durationInTime/(3600 * 24))); 
    return durationInDays;
  }

export { getRangeForDates }