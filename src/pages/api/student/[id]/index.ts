import { querySQL } from "helper/database";
import { NextApiHandler } from "next";

const getAttendanceStudent = async (id: string | string[] | undefined) => {
  if (!id) return;
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
    const result = res.length && res.map((item: {
        ID: string,
        NGAYDIEMDANH: string,
        NGUOI_DIEMDANH: string,
        TENTHANHGLV: string,
        HOGLV: string,
        TENGLV: string,
      }) => {
      return {
        id: item.ID,
        attendanceDate: `${new Date(item.NGAYDIEMDANH).getDate().toString().padStart(2, '0')}-${
          (new Date(item.NGAYDIEMDANH).getMonth() + 1).toString().padStart(2, '0')}-${
            new Date(item.NGAYDIEMDANH).getFullYear()
          }`,
        teacher: `${item.TENTHANHGLV} ${item.HOGLV} ${item.TENGLV}`
      }
    })
    console.log(result);
    
    return result;
  } catch (err) {
    console.log(err);
    return null;
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
        [GIAOHO].TENGIAOHO
      FROM [HOCVIEN]
      LEFT OUTER JOIN [THEOHOC] ON [HOCVIEN].MAHOCVIEN = [THEOHOC].MAHOCVIEN
      LEFT OUTER JOIN [LOPHOC] ON [THEOHOC].MALOPHOC = [LOPHOC].MALOPHOC
      LEFT OUTER JOIN [DAY_LOP] ON [DAY_LOP].MALOPHOC = [LOPHOC].MALOPHOC
      LEFT OUTER JOIN [GIAOLYVIEN] ON [GIAOLYVIEN].MAGLV = [DAY_LOP].MAGLV
      LEFT OUTER JOIN [GIAOHO] ON [HOCVIEN].MAGIAOHO = [GIAOHO].MAGIAOHO

      WHERE [HOCVIEN].MAHOCVIEN = '${id}'
      AND [THEOHOC].MANIENHOC='3'
      /* AND [THEOHOC].NGAYXOA IS NULL */
    `;

    try {
      const res = await querySQL(queryStr) as any;      
      const result = res.length && {
        id: res[0].MAHOCVIEN,
        img: res[0].HINHANH_WEB,
        saintName: res[0].TENTHANH,
        lastName: res[0].HOCANHAN,
        firstName: res[0].TENCANHAN,
        bod: `${new Date(res[0].NGAYSINH).getDate().toString().padStart(2, '0')}-${
          (new Date(res[0].NGAYSINH).getMonth() + 1).toString().padStart(2, '0')}-${
            new Date(res[0].NGAYSINH).getFullYear()
          }`,
        phone: [res[0].SODIENTHOAI, res[0].SODIENTHOAI2],
        fatherName: res[0].HOTENPHCHA,
        motherName: res[0].HOTENPHME,
        teacher: res.map((item: { TENTHANHGLV: string, HOGLV: string, TENGLV: string }) => {
          return `${item.TENTHANHGLV} ${item.HOGLV} ${item.TENGLV}`
        }),
        className: res[0].TENLOPHOC,
        catholicity: res[0].TENGIAOHO
      }
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
}

export const getDetailStudent = async (id: string | string[] | undefined) => {
  const basicInformation = await getInformationStudent(id);
  const attendance = await getAttendanceStudent(id);  
  return {
    basicInformation: { ...basicInformation },
    attendance: [...attendance],
  }
}

const studentHandler: NextApiHandler = async (request, response) => {
  const { method, query } = request;
  const { id } = query;

  if (!id) {
    response.status(400).json({ message: `'id' is required` })
    return;
  }
  switch(method) {
    case 'GET':      
      const student = await getDetailStudent(id);
      response.json({ ...student })
      return;
    default:
      break;
  }
  // const { amount = 1 } = request.body

  // simulate IO latency
  // await new Promise((resolve) => setTimeout(resolve, 500))
  response.json({ data: 'success' })
}

export default studentHandler