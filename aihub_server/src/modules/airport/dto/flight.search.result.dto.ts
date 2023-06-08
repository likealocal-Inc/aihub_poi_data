import { ApiProperty } from '@nestjs/swagger';

export class FlightSearchResultDto {
  @ApiProperty({ description: '결과코드' })
  resultCode; //	결과코드

  @ApiProperty({ description: '결과메시지' })
  resultMsg; //	결과메시지

  @ApiProperty({ description: '항공기 운항 타입(I=International, D=Domestic)' })
  typeOfFlight; //	항공기 운항 타입(I=International, D=Domestic)

  @ApiProperty({ description: '항공사 국문명' })
  airline; //	항공사 국문명

  @ApiProperty({ description: '항공 편명' })
  flightId; //	항공 편명

  @ApiProperty({ description: '도착예정시간 HHMM' })
  scheduleDateTime; //	도착예정시간 HHMM

  @ApiProperty({ description: '도착변경시간 HHMM' })
  estimatedDateTime; //	도착변경시간 HHMM

  @ApiProperty({ description: '출발 공항 한글명' })
  airport; //	출발 공항 한글명

  @ApiProperty({ description: '탑승구 번호' })
  gatenumber; //	탑승구 번호

  @ApiProperty({ description: '수하물 수취대 번호' })
  carousel; //	수하물 수취대 번호

  @ApiProperty({ description: '도시코드' })
  cityCode; //	도시코드

  @ApiProperty({ description: '출구 번호' })
  exitnumber; //	출구 번호

  @ApiProperty({ description: '운항상태 (도착,결항,지연,회항,착륙)' })
  remark; //	운항상태 (도착,결항,지연,회항,착륙)

  @ApiProperty({ description: '출발 공항 코드(IATA)' })
  airportCode; //	출발 공항 코드(IATA)

  @ApiProperty({
    description:
      'P01: 제1 터미널 P02: 탑승동 P03: 제2 터미널 C01 : 화물터미널 남측 C02 : 화물터미널 북측 C03 : 제2 화물터미널',
  })
  terminalId; //	P01: 제1 터미널 P02: 탑승동 P03: 제2 터미널 C01 : 화물터미널 남측 C02 : 화물터미널 북측 C03 : 제2 화물터미널

  @ApiProperty({ description: '도착소요시간(HHMM)' })
  elapsetime; //	도착소요시간(HHMM)

  @ApiProperty({ description: '첫번째 경유지 공항 코드' })
  firstopover; //	첫번째 경유지 공항 코드

  @ApiProperty({ description: '첫번째 경유지 공항 이름' })
  firstopovername; //	첫번째 경유지 공항 이름

  @ApiProperty({ description: '두번째 경유지 공항 코드' })
  secstopover; //	두번째 경유지 공항 코드

  @ApiProperty({ description: '두번째 경유지 공항 이름' })
  secstopovername; //	두번째 경유지 공항 이름

  @ApiProperty({ description: '세번째 경유지 공항 코드' })
  thistopover; //	세번째 경유지 공항 코드

  @ApiProperty({ description: '세번째 경유지 공항 이름' })
  thistopovername; //	세번째 경유지 공항 이름

  @ApiProperty({ description: '코드쉐어' })
  codeshare; //	코드쉐어

  @ApiProperty({ description: '마스터편명' })
  masterflightid; //	마스터편명

  constructor(json: any) {
    this.resultCode = json.resultCode;
    this.resultMsg = json.resultMsg;
    this.typeOfFlight = json.typeOfFlight;
    this.airline = json.airline;
    this.flightId = json.flightId;
    this.scheduleDateTime = json.scheduleDateTime;
    this.estimatedDateTime = json.estimatedDateTime;
    this.airport = json.airport;
    this.gatenumber = json.gatenumber;
    this.carousel = json.carousel;
    this.cityCode = json.cityCode;
    this.exitnumber = json.exitnumber;
    this.remark = json.remark;
    this.airportCode = json.airportCode;
    this.terminalId = json.terminalId;
    this.elapsetime = json.elapsetime;
    this.firstopover = json.firstopover;
    this.firstopovername = json.firstopovername;
    this.secstopover = json.secstopover;
    this.secstopovername = json.secstopovername;
    this.thistopover = json.thistopover;
    this.thistopovername = json.thistopovername;
    this.codeshare = json.codeshare;
    this.masterflightid = json.masterflightid;
  }
}
