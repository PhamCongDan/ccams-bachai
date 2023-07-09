const sql = require('mssql');

const dbConfig = {
  server: process.env.SERVER_NAME, 
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  trustServerCertificate: true,
  options: {
    encrypt: true,
  }
};

const units = [
  {
    key: 'chien',
    value: 'KT',
  },
  {
    key: 'au',
    value: 'XT'
  },
  {
    key: 'thieu',
    value: 'TS'
  },
  {
    key: 'nghia',
    value: 'SĐ'
  },
  {
    key: 'hiep',
    value: 'VĐ'
  },
];

const querySQL = async (queryString: string) => {
  try {
    const poolPromise = new sql.ConnectionPool(dbConfig);
    const connect = await poolPromise.connect();
    const query = poolPromise.request();
    const data = await query.query(`${queryString}`);
    connect.close();
    // console.log(data);
    const { recordset: res } = data;
    return res;
  } catch (e) {
    return e;
  }
}

export { dbConfig, units, querySQL }