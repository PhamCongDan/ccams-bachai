import { querySQL } from "helper/database";
import { NextApiHandler } from "next";
import { getCurrentScholastic } from "..";

const getAttendanceStudent = async (id: string | string[] | undefined) => {
  if (!id) return [];
  const queryStr = `
      SELECT top 30
        [DIEM_DANH].ID,
        [DIEM_DANH].MAHOCVIEN,
        [DIEM_DANH].NGAYDIEMDANH,
        [DIEM_DANH].NGUOI_DIEMDANH,
        [GIAOLYVIEN].TENTHANH AS TENTHANHGLV,
        [GIAOLYVIEN].HOCANHAN AS HOGLV,
        [GIAOLYVIEN].TENCANHAN AS TENGLV
      FROM [DIEM_DANH]
      LEFT OUTER JOIN [GIAOLYVIEN] ON [GIAOLYVIEN].MAGLV = [DIEM_DANH].NGUOI_DIEMDANH
      WHERE [DIEM_DANH].MAHOCVIEN = '${id}'
      ORDER BY NGAYDIEMDANH DESC
    `;
  try {
    const res = await querySQL(queryStr) as any;
    if (res.length === 0) return [];
    const result = res.map((item: {
      ID: string,
      NGAYDIEMDANH: string,
      NGUOI_DIEMDANH: string,
      TENTHANHGLV: string,
      HOGLV: string,
      TENGLV: string,
    }) => {
      return {
        id: item.ID,
        attendanceDate: `${new Date(item.NGAYDIEMDANH).getDate().toString().padStart(2, '0')}-${(new Date(item.NGAYDIEMDANH).getMonth() + 1).toString().padStart(2, '0')}-${new Date(item.NGAYDIEMDANH).getFullYear()
          }`,
        teacher: `${item.TENTHANHGLV} ${item.HOGLV} ${item.TENGLV}`
      }
    })
    
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const getInformationStudent = async (id: string | string[] | undefined) => {
  if (!id) return;
  const queryStr = `
    SELECT DISTINCT 
      [HOCVIEN].MAHOCVIEN,
      [HOCVIEN].TENTHANH,
      [HOCVIEN].HOCANHAN,
      [HOCVIEN].TENCANHAN,
      [HOCVIEN].NGAYSINH,
      [HOCVIEN].SODIENTHOAI,
      [HOCVIEN].SODIENTHOAI2,
      [HOCVIEN].HOTENPHCHA,
      [HOCVIEN].HOTENPHME,
      [HOCVIEN].HINHANH_WEB,
      [THEOHOC].MALOPHOC,
      [LOPHOC].TENLOPHOC,
      [GIAOLYVIEN].TENTHANH AS TENTHANHGLV,
      [GIAOLYVIEN].HOCANHAN AS HOGLV,
      [GIAOLYVIEN].TENCANHAN AS TENGLV,
      [DAY_LOP].VAITRO,
      [GIAOHO].TENGIAOHO,
      [NIENHOC].TENNIENHOC
    FROM [HOCVIEN]
    LEFT OUTER JOIN [THEOHOC] ON [HOCVIEN].MAHOCVIEN = [THEOHOC].MAHOCVIEN
    LEFT OUTER JOIN [LOPHOC] ON [THEOHOC].MALOPHOC = [LOPHOC].MALOPHOC
    LEFT OUTER JOIN [DAY_LOP] ON [DAY_LOP].MALOPHOC = [LOPHOC].MALOPHOC
    LEFT OUTER JOIN [GIAOLYVIEN] ON [GIAOLYVIEN].MAGLV = [DAY_LOP].MAGLV
    LEFT OUTER JOIN [GIAOHO] ON [HOCVIEN].MAGIAOHO = [GIAOHO].MAGIAOHO
    LEFT OUTER JOIN [NIENHOC] ON [NIENHOC].MANIENHOC = [DAY_LOP].MANIENHOC

      WHERE [HOCVIEN].MAHOCVIEN = '${id}'
      AND [DAY_LOP].VAITRO != 'GLV1'
      /* AND [THEOHOC].NGAYXOA IS NULL */
    `;

  try {
    const res = await querySQL(queryStr) as any;
    if (!res.length) return {};
    const currentScholastic = res[res.length - 1];
    const oldScholastic = res.slice(0, res.length - 1)

    const result = res.length && {
      id: currentScholastic.MAHOCVIEN,
      img: currentScholastic.HINHANH_WEB,
      saintName: currentScholastic.TENTHANH,
      lastName: currentScholastic.HOCANHAN,
      firstName: currentScholastic.TENCANHAN,
      bod: `${new Date(currentScholastic.NGAYSINH).getDate().toString().padStart(2, '0')}-${(new Date(currentScholastic.NGAYSINH).getMonth() + 1).toString().padStart(2, '0')}-${new Date(currentScholastic.NGAYSINH).getFullYear()
        }`,
      phone: [currentScholastic.SODIENTHOAI, currentScholastic.SODIENTHOAI2],
      fatherName: currentScholastic.HOTENPHCHA,
      motherName: currentScholastic.HOTENPHME,
      teacher: `${currentScholastic.TENTHANHGLV} ${currentScholastic.HOGLV} ${currentScholastic.TENGLV}`,
      className: currentScholastic.TENLOPHOC,
      catholicity: currentScholastic.TENGIAOHO
    }

    const historyData = oldScholastic.map((item: { TENNIENHOC: string, TENTHANHGLV: string, HOGLV: string, TENGLV: string, TENLOPHOC: string }) => {
      return {
        scholastic: item.TENNIENHOC,
        teacher: `${item.TENTHANHGLV} ${item.HOGLV} ${item.TENGLV}`,
        className: item.TENLOPHOC,
      }
    });
  
    return { basicInformation: result, historyScholastic: historyData };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const getDetailStudent = async (id: string | string[] | undefined) => {
  const basicInformation = await getInformationStudent(id);
  const attendance = await getAttendanceStudent(id);  
  return {
    ...basicInformation,
    attendance: [ ...attendance ],
  }
}

const studentHandler: NextApiHandler = async (request, response) => {
  const { method, query } = request;
  const { id } = query;

  if (!id) {
    response.status(400).json({ message: `'id' is required` })
    return;
  }
  switch (method) {
    case 'GET':
      const student = await getDetailStudent(id);
      response.json({ ...student })
      return;
    default:
      break;
  }
  response.json({ data: 'success' })
}

export default studentHandler