/**
 * 시스테 기본 설정 값
 */
export const DefaultConfig = {
  // 스웨거 설정
  swagger: {
    title: '연동서버',
    description: '외부 API를 호출한 결과 데이터를 제공하는 서버',
    version: '0.1',
    tag: '',
  },
  // 기호
  sign: {
    arrToStringDelim: '|', // 스트링과 배열을 나누는 값
  },
  // 파일 관련설정
  files: {
    log: {
      error: {
        path: './files/error',
        name: 'ERROR',
        ext: 'err',
        getLogFileName: async (name: string): Promise<string> => {
          return `${DefaultConfig.files.log.error.name}_${name}.${DefaultConfig.files.log.error.ext}`;
        },
      },
    },
  },
  security: {
    key: 'likealocalkeysecury',
  },
  session: {
    KEY: process.env.SESSION_KEY,
    expireTime: process.env.SESSION_TIME,
  },

  // 공항 API 호출 정보
  airport: {
    // 서비스 키
    serviceKey:
      'RDtd5TxjTc%2BKsDdm%2BosyJ0CdwCaM90BQp%2BMTMTmFuYx%2F%2B%2FNO4ObiJxPqTIVtjcbw%2B4pagzqARPgm0fBJGWQ4Dg%3D%3D',
  },
};
