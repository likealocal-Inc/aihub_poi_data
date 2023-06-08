import { Injectable } from '@nestjs/common';
import { Files } from 'src/config/core/files/files';
import { PrismaService } from 'src/config/core/prisma/prisma.service';
import { CreatePoiDto } from './dto/create.poi.dto';
import { CreateLangPoiDto } from './dto/create.lang.poi.dto';
import { LogFiles } from 'src/config/core/files/log.files';
import { LanguagePoiEntity } from './entities/lang.poi.entity';

@Injectable()
export class PoiService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all poi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poi`;
  }

  async insertPoi() {
    const file = new Files();
    const data = await file.read('./res.json');
    const jsonData = JSON.parse(data);
    let total = 0;

    console.log(jsonData.length);
    return;
    for (let dataIndex = 0; dataIndex < jsonData.length; dataIndex++) {
      const keys = Object.keys(jsonData[dataIndex]);

      const count = await this.prisma.languagePoi.count({
        where: { poiNum: jsonData[dataIndex].poi_id, lang: 'kr' },
      });

      if (count === 0) {
        total++;
        const dto: CreateLangPoiDto = new CreateLangPoiDto();
        const elseData = {};
        dto.lang = 'kr';
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
          const key = keys[keyIndex];
          const value = jsonData[dataIndex][key];
          if (key === 'poi_id') {
            dto.poiNum = value;
          } else if (key === 'type') {
            dto.type = value;
          } else if (key === 'name') {
            dto.name = value;
          } else if (key === 'addr') {
            dto.addr = value;
          } else {
            elseData[key] = value;
          }
        }
        dto.elseData = JSON.stringify(elseData);

        await this.prisma.languagePoi.create({
          data: dto,
        });
      }
    }

    console.log('total::' + total);
  }

  // async insertPoi() {
  //   const file = new Files();
  //   const data = await file.read('./res.json');
  //   const jsonData = JSON.parse(data);

  //   for (let dataIndex = 0; dataIndex < jsonData.length; dataIndex++) {
  //     const keys = Object.keys(jsonData[dataIndex]);

  //     const count = await this.prisma.pOI.count({
  //       where: { poiNum: jsonData[dataIndex].poi_id },
  //     });
  //     if (count === 0) {
  //       const dto: CreatePoiDto = new CreatePoiDto();
  //       const elseData = {};
  //       for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
  //         const key = keys[keyIndex];
  //         const value = jsonData[dataIndex][key];
  //         if (key === 'poi_id') {
  //           dto.poiNum = value;
  //         } else if (key === 'type') {
  //           dto.type = value;
  //         } else if (key === 'name') {
  //           dto.name = value;
  //         } else if (key === 'addr') {
  //           dto.addr = value;
  //         } else {
  //           elseData[key] = value;
  //         }
  //       }
  //       dto.elseData = JSON.stringify(elseData);

  //       await this.prisma.pOI.create({
  //         data: {
  //           poiNum: '' + dto.poiNum,
  //           addr: dto.addr,
  //           elseData: dto.elseData,
  //           name: dto.name,
  //           type: dto.type,
  //         },
  //       });
  //     }
  //   }
  // }

  /**
   {
    "poi_id": "599697", 
    "type": "Tourist Attraction ", 
    "lang": "en", 
    "name": "Yeollinmungo", 
    "addr": "32, Bokdae-ro, Seowon-gu, Cheongju-si, Chungcheongbuk-do", 
    "else_data": {"Phone Number": "043-234-4345", "Opening Hours": "09:30/10:00-22:00/22:30", "Holidays": "Please call", "Admission Fee": "None", "Parking Available": "None", "Experience Program(s)": "None"}}, 
   */
  /**
1 248 000
156000
   */
  async insertLangPoi() {
    const file = new Files();
    const data = await file.read('./res_lang_01.json');
    const jsonData = JSON.parse(data);
    console.log(jsonData.length);

    for (let dataIndex = 0; dataIndex < jsonData.length; dataIndex++) {
      const langPoiData = jsonData[dataIndex];

      const keys = Object.keys(langPoiData);

      // POI 체크해서 있을 경우만 처리
      const poiCount = await this.prisma.pOI.count({
        where: { poiNum: langPoiData['poi_id'] },
      });

      if (poiCount > 0) {
        /**
 poi_id
type
lang
name
addr
else_data
         */
        const dto: CreateLangPoiDto = new CreateLangPoiDto();
        const elseData = {};
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
          const key = keys[keyIndex];
          const value = jsonData[dataIndex][key];
          if (key === 'poi_id') {
            dto.poiNum = value;
          } else if (key === 'type') {
            dto.type = value;
          } else if (key === 'name') {
            dto.name = value;
          } else if (key === 'addr') {
            dto.addr = value;
          } else if (key === 'lang') {
            dto.lang = value;
          } else {
            elseData[key] = value;
          }
        }
        dto.elseData = JSON.stringify(elseData);
        try {
          await this.prisma.languagePoi.create({
            data: dto,
          });
        } catch {
          // 로그파일 작성
          new LogFiles().save(
            `insertLangPoi - insert error : {dto:${dto} , langPoiData:${langPoiData}`,
          );
        }
      }
    }
  }

  async search(search: string): Promise<LanguagePoiEntity[]> {
    const res = await this.prisma.languagePoi.findMany({
      where: { name: { contains: search } },
    });

    return res;
  }

  async searchByPoiNum(poiNum: string): Promise<LanguagePoiEntity[]> {
    const res = await this.prisma.languagePoi.findMany({
      where: { poiNum },
    });

    return res;
  }
}
