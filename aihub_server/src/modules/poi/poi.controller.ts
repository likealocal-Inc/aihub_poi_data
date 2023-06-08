import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PoiService } from './poi.service';
import { LoginDto } from './dto/login.dto';
import { SecurityUtils } from 'src/libs/core/utils/security.utils';
import { HttpUtils } from 'src/libs/core/utils/http.utils';

@Controller('poi')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  // @Get('run.poi')
  // async runPoi() {
  //   console.log('start');
  //   // return await this.poiService.insertPoi();
  // }

  // @Get('run.lang.poi')
  // async runLangPoi() {
  //   console.log('start');
  //   // await this.poiService.insertLangPoi();
  // }

  @Post('login')
  findOne(@Body() loginDto: LoginDto) {
    // if (loginDto.email === 'likealocal!@test.com' && pw === 'Like1234!') {
    //   return HttpUtils.makeAPIResponse(true);
    // } else {
    //   return HttpUtils.makeAPIResponse(false);
    // }
  }

  @Get('search/word/:word/')
  async search(@Param('word') word: string) {
    return await this.poiService.search(word);
  }

  @Get('search/poiNum/:poiNum')
  async searchByPoiNUm(@Param('poiNum') poiNum: string) {
    return await this.poiService.searchByPoiNum(poiNum);
  }
}
