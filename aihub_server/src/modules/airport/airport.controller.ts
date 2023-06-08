import { Controller, Get, Param, Render } from '@nestjs/common';
import { AirportService } from './airport.service';
import { APIResponseObj, HttpUtils } from 'src/libs/core/utils/http.utils';
import { FlightSearchResultDto } from './dto/flight.search.result.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('airport')
@ApiTags('인천공항 항공기관련 데이터 조회')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get(':flight_id')
  @ApiOperation({
    summary: '항공기 도착정보 조회 API',
    description: '항공기 아이디로 도착정보를 조회',
  })
  @ApiCreatedResponse({
    description: '도착정보 데이터',
    type: FlightSearchResultDto,
  })
  @ApiParam({
    name: 'flight_id',
    required: true,
    description: '항공기 편명',
    schema: { default: 'KE5942' },
  })
  async searchFlightInfo(
    @Param('flight_id') name: string,
  ): Promise<APIResponseObj> {
    return HttpUtils.makeAPIResponse(
      true,
      await this.airportService.getScheduleForPlane(name),
    );
  }

  @Get('view/:flight_id')
  @Render('flight')
  async viewFlightInfo(@Param('flight_id') name: string) {
    const res = await this.airportService.getScheduleForPlane(name);
    console.log(res);
    return { flight_info: res };
  }
}
