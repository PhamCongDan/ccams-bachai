import { dbConfig, units } from 'helper/api';
import type { NextApiHandler } from 'next';
const sql = require('mssql');

const getUnit = async (unitName: string | string[]) => {
  const unitId = units.find((item) => item.key === unitName);
  if (!unitId) return;
  try {
    const poolPromise = new sql.ConnectionPool(dbConfig);
    const connect = await poolPromise.connect();
    const query = poolPromise.request();
    const data = await query.query(`SELECT [MAKHOI], [TENKHOI] FROM KHOI WHERE CODE LIKE N'%${unitId.value}%'`);
    connect.close();
    
    return data.recordset.map((item: { MAKHOI: number; TENKHOI: string; }) => {
      return {
        id: item.MAKHOI,
        name: item.TENKHOI
      }
    })
  } catch (err) {
    console.log(err);
    return null;
  }
}

const unitHandler: NextApiHandler = async (request, response) => {
  const { method, query: { unitId } } = request;
  if (!unitId) return;
  switch (method) {
    case 'GET':
      const res = await getUnit(unitId);
      response.json(res)
      break;
    default:
      response.json({ message: 'error' })
      break;
  }
}

export default unitHandler