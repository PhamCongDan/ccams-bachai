import { querySQL, units } from 'helper/database';
import type { NextApiHandler } from 'next';

const getGrade = async (unitName: string | string[]) => {
  const unitId = units.find((item) => item.key === unitName);
  if (!unitId) return;
  const queryStr = `
    SELECT [MAKHOI], [TENKHOI]
    FROM KHOI
    WHERE CODE LIKE N'%${unitId.value}%'
  `
  try {
    const data = await querySQL(queryStr) as any;
    return data.map((item: { MAKHOI: number; TENKHOI: string; }) => {
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
      const res = await getGrade(unitId);
      response.json(res)
      break;
    default:
      response.json({ message: 'error' })
      break;
  }
}

export default unitHandler
