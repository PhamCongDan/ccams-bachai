import { dbConfig, querySQL } from 'helper/database';
import type { NextApiHandler } from 'next';
const sql = require('mssql');

const PAGE_SIZE = 100;

export const getAllStudentIds = async () => {
  const queryStr = `
    SELECT [HOCVIEN].MAHOCVIEN
    FROM [HOCVIEN]
  `;
  try {
    const res = await querySQL(queryStr) as any;
    // console.log(res);
    return res.map((item: { MAHOCVIEN: string }) => {
      return {
        id: item.MAHOCVIEN
      }
    })
  } catch (e) {
    console.log(e)
  }
};

export const getAllStudent = async (page = 1) => {
  const queryStr = `
    SELECT DISTINCT 
      [HOCVIEN].MAHOCVIEN,
      [HOCVIEN].TENTHANH,
      [HOCVIEN].HOCANHAN,
      [HOCVIEN].TENCANHAN,
      [THEOHOC].MALOPHOC,
      [LOPHOC].TENLOPHOC,
      [GIAOLYVIEN].TENTHANH AS TENTHANHGLV,
      [GIAOLYVIEN].HOCANHAN AS HOGLV,
      [GIAOLYVIEN].TENCANHAN AS TENGLV

      FROM [HOCVIEN]
      LEFT OUTER JOIN [THEOHOC] ON [HOCVIEN].MAHOCVIEN = [THEOHOC].MAHOCVIEN
      LEFT OUTER JOIN [LOPHOC] ON [THEOHOC].MALOPHOC = [LOPHOC].MALOPHOC
      LEFT OUTER JOIN [DAY_LOP] ON [DAY_LOP].MALOPHOC = [LOPHOC].MALOPHOC
      LEFT OUTER JOIN [GIAOLYVIEN] ON [GIAOLYVIEN].MAGLV = [DAY_LOP].MAGLV

      WHERE [THEOHOC].MANIENHOC='3'
      and [DAY_LOP].VAITRO != 'GLV1'
      ORDER BY [HOCVIEN].TENCANHAN
    `;

    try {
      const poolPromise = new sql.ConnectionPool(dbConfig);
      const connect = await poolPromise.connect();
      const query = poolPromise.request();
      const data = await query.query(`${queryStr}`);
      connect.close();

      const lstData = data.recordset.map((item: {
        TENLOPHOC: string;
        TENTHANHGLV: string;
        HOGLV: string;
        TENGLV: string;
        HOCANHAN: string;
        TENCANHAN: string;
        TENTHANH: string;
        MAHOCVIEN: string;
      }) => {
        return {
          id: item.MAHOCVIEN,
          saintName: item.TENTHANH,
          firstName: item.TENCANHAN,
          lastName: item.HOCANHAN,
          className: item.TENLOPHOC,
          teacher: `${item.TENTHANHGLV} ${item.HOGLV} ${item.TENGLV}`,
        }
      })

      return {
        page: page,
        // totalCount: data.recordset.length,
        // pageSize: PAGE_SIZE,
        data: lstData
      }
    } catch (err) {
      console.log(err);
      return null;
    }

}

const studentHandler: NextApiHandler = async (request, response) => {
  const { method, query } = request;
  // console.log(query);
  
  switch(method) {
    case 'GET':
      const lstStudent = await getAllStudent();
      response.json(lstStudent)
      return;
    default:
      break;
  }
  // const { amount = 1 } = request.body

  // simulate IO latency
  // await new Promise((resolve) => setTimeout(resolve, 500))
}

export default studentHandler