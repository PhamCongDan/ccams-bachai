import { querySQL, units } from 'helper/database';
import type { NextApiHandler } from 'next';
import { getCurrentScholastic } from './student';

const getClass = async (gradeId: string | string[], scholasticId: string) => {
  const queryStr = `
    SELECT [MALOPHOC], [MANIENHOC], [TENLOPHOC], [MAKHOI], [CHUNHIEM], [GLV1]
    FROM LOPHOC
    WHERE MAKHOI IN (${gradeId}) AND MANIENHOC IN (${scholasticId})
  `
  try {
    const data = await querySQL(queryStr) as any;
    return data.map((item: { MAKHOI: number, TENKHOI: string, MALOPHOC: string, TENLOPHOC: string, MANIENHOC: string, CHUNHIEM: string, GLV1: string }) => {
      return {
        id: item.MALOPHOC,
        name: item.TENLOPHOC,
        scholasticId: item.MANIENHOC,
        teacher: item.CHUNHIEM,
        subteacher: item.GLV1,
        unitId: item.MAKHOI,
      }
    })
  } catch (err) {
    console.log(err);
    return null;
  }
}

const unitHandler: NextApiHandler = async (request, response) => {
  const { method, query: { gradeId } } = request;
  if (!gradeId) return;
  switch (method) {
    case 'GET':
      const currentSchlolastic = await getCurrentScholastic();
      const res = await getClass(gradeId, currentSchlolastic);
      response.json(res)
      break;
    default:
      response.json({ message: 'error' })
      break;
  }
}

export default unitHandler
