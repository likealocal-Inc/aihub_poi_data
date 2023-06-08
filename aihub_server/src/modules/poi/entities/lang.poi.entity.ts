import { LanguagePoi } from '@prisma/client';

export class LanguagePoiEntity implements LanguagePoi {
  id: number;
  poiNum: string;
  type: string;
  lang: string;
  name: string;
  addr: string;
  elseData: string;
}
