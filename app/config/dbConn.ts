import  pg,{Client} from "pg"

const config={
  host: "103.157.135.96",
  user:"cmtuser",
  port:5432,
  database:"logistify",
  password:"cmt12345",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  idleTimeoutMillis: 30000,
}
const client = new Client(config);
client.connect(()=>console.log(`database connected successfully`))


const createTables = () => {

  const schoolTable = `
      CREATE TABLE IF NOT EXISTS logistifytest (
        client_id serial PRIMARY KEY,
        client_name VARCHAR (128) NOT NULL,
        office_address TEXT NOT NULL,
        payment_type VARCHAR (128) NOT NULL,
        credit_limit INT  NOT NULL,
        salesman VARCHAR (140),
        last_job_date  DATE NOT NULL DEFAULT CURRENT_DATE,
        status VARCHAR (25) NOT NULL
      ); `;
  client.query(schoolTable,(err:Error,res:pg.QueryResult<any>)=>{
    console.log(`database running and your  data table is ready ...`)
  })
};

export {client,createTables}
