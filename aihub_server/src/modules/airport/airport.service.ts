import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DefaultConfig } from 'src/config/default.config';
import { CustomException } from '../../config/core/exceptions/custom.exception';
import { ExceptionCodeList } from 'src/config/core/exceptions/exception.code';
import { FlightSearchResultDto } from './dto/flight.search.result.dto';

@Injectable()
export class AirportService {
  async getScheduleForPlane(planeName: string) {
    try {
      const url = `http://apis.data.go.kr/B551177/StatusOfPassengerFlightsOdp/getPassengerArrivalsOdp?serviceKey=${DefaultConfig.airport.serviceKey}&flight_id=${planeName}&type=json`;
      const res = await axios.get(url);

      const items: any[] = res.data.response.body.items;
      if (items.length === 0) {
        return [];
      }
      const flightInfo: FlightSearchResultDto = new FlightSearchResultDto(
        items[0],
      );
      return flightInfo;
    } catch (error) {
      throw new CustomException(ExceptionCodeList.COMMON.WRONG_REQUEST, error);
    }
  }
}
