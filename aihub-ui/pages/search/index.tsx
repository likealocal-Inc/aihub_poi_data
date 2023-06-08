import { useEffect, useState } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import "../../app/globals.css";
import axios from "axios";

interface PoiModel {
  id: number;
  poiNum: string;
  type: string;
  lang: string;
  name: string;
  addr: string;
  elseData: string;
}

const Modal = ({ open, setOpen, poiNum }: any) => {
  const [langData, setlangData] = useState<PoiModel[]>([]);
  useEffect(() => {
    if (open) {
      axios
        .get(`${publicRuntimeConfig.SERVER_URL}/search/poinum/${poiNum}`)
        .then((res) => {
          setlangData(res.data);
          window.scrollTo(0, 0);
        });
    }
  }, [open, poiNum]);

  return (
    <>
      {open ? (
        <>
          <div className='absolute top-0 z-50 w-full h-full text-white bg-opacity-70 bg-slate-100'>
            <div className='flex items-center justify-center pt-10'>
              <div className='flex flex-col items-center justify-center w-screen text-white rounded-lg bg-slate-800 h-3/4'>
                <div className='p-11'>
                  <table className='border-1'>
                    <thead>
                      <tr className='text-lg text-center bg-red-300 border-2 border-1'>
                        <th className='p-3 border-2'>id</th>
                        <th className='p-3 border-2'>poi id</th>
                        <th className='p-3 border-2'>lang</th>
                        <th className='p-3 border-2'>type</th>
                        <th className='p-3 border-2'>name</th>
                        <th className='p-3 border-2'>addr</th>
                        <th className='p-3 border-2'>elseData</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                      {langData.map((d, k) => {
                        return (
                          <tr key={k}>
                            <td className='p-3 border-2'>{d.id}</td>
                            <td className='p-3 border-2 cursor-pointer bg-slate-500'>
                              {d.poiNum}
                            </td>
                            <td className='p-3 border-2'>{d.lang}</td>
                            <td className='p-3 border-2'>{d.type}</td>
                            <td className='p-3 border-2'>{d.name}</td>
                            <td className='p-3 border-2'>{d.addr}</td>
                            <td className='p-3 border-2'>{d.elseData}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  className='p-5 m-4 bg-blue-700 rounded-lg'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Search = () => {
  const [word, setWord] = useState("");
  const [poiData, setPoiData] = useState<PoiModel[]>([]);
  const [open, setOpen] = useState(false);
  const [selectPoiId, setSelectPoiId] = useState("");
  const search = () => {
    if (word === "") {
      alert("검색어를 넣어 주세요");
    } else {
      axios
        .get(`${publicRuntimeConfig.SERVER_URL}/search/word/${word}`)
        .then((res) => {
          setPoiData(res.data);
          console.log(res.data);
        });
    }
  };
  return (
    <>
      <div className=''>
        <div className='flex p-5'>
          <input
            className='w-64 p-3 rounded-lg text-slate-900'
            placeholder='검색할 가게명을 넣어 주세요'
            defaultValue={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <button
            className='p-3 mx-3 text-black rounded-lg bg-slate-200'
            onClick={search}
          >
            검색
          </button>
        </div>
        <div className='h-auto p-3'>
          <table className='border-1'>
            <thead>
              <tr className='text-lg text-center bg-red-300 border-2 border-1'>
                <td className='p-3 border-2'>id</td>
                <td className='p-3 border-2'>poi id</td>
                <td className='p-3 border-2'>lang</td>
                <td className='p-3 border-2'>type</td>
                <td className='p-3 border-2'>name</td>
                <td className='p-3 border-2'>addr</td>
                <td className='p-3 border-2'>elseData</td>
              </tr>
            </thead>
            <tbody>
              {poiData.map((d, k) => {
                return (
                  <tr key={k}>
                    <td className='p-3 border-2'>{d.id}</td>
                    <td
                      className='p-3 border-2 cursor-pointer bg-slate-500'
                      onDoubleClick={() => {
                        setSelectPoiId(d.poiNum);
                        setOpen(true);
                      }}
                    >
                      {d.poiNum}
                    </td>
                    <td className='p-3 border-2'>{d.lang}</td>
                    <td className='p-3 border-2'>{d.type}</td>
                    <td className='p-3 border-2'>{d.name}</td>
                    <td className='p-3 border-2'>{d.addr}</td>
                    <td className='p-3 border-2'>{d.elseData}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal open={open} setOpen={setOpen} poiNum={selectPoiId} />
      </div>
    </>
  );
};

export default Search;
