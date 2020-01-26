import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[], startDate: Date, endDate: Date
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery))
    .filter(
      responseItem => {
        let startDateNumeric = startDate.getTime(),
          endDateNumeric = endDate.getTime();
        return (
          responseItem.dateNumeric >= startDateNumeric &&
          responseItem.dateNumeric <= endDateNumeric
        );
      }
    );
}
