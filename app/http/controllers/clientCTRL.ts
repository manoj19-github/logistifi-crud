import {Request,Response} from "express"
import {client} from "../../config/dbConn"

export default function(){
  return{
    getAllData(req:Request,res:Response){
        const query = 'SELECT * FROM logistifytest';
        client.query(query, (error:any, result:any) => {

          if (error) {
            res.status(400).json({error})
          }else{
            res.status(200).send({
              status: 'Successful',
              message: 'logistify Corporate client details',
              clients: result.rows,
            });
          }
      });
    },
    insertData(req:Request,res:Response){
      const name:string=req.body.client_name;
      const address:string=req.body.office_address;
      const payment_type:string=req.body.payment_type;
      const credit_limit:number=+req.body.credit_limit;
      const salesman:string|undefined=req.body?.salesman
      const job_date:any=req.body?.last_job_date;
      const status:string=req.body.status;
      const insertQuery=`INSERT INTO logistifytest (client_name,office_address,payment_type,credit_limit,
        salesman,last_job_date,status)
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
        client.query(insertQuery,[name,address,payment_type,
          credit_limit,salesman,job_date,status], (error:any, result:any) => {
          if (error) {
            console.log(error,[name,address,payment_type,
              credit_limit,salesman,job_date,status])
            res.status(400).json({error})
          }else{
            res.status(200).send({
              status: 'Successful',
              message: `Corporate client information are created for ${name} `,
              clients: result.rows,
            });
          }
      });
    },
    updateData(req:Request,res:Response){
      if(!req.body?.client_id){
        return  res.status(500).send({
            status: 'Failure',
            message: `please send the client_id for update `,
          });
      }
      let updatableField={...req.body}
      let updateValues=Object.values(updatableField);
      delete updatableField.client_id;
      let updateKeys=Object.keys(updatableField);
      let updateLength:number=updateKeys.length;
      let updateQuery:string=`UPDATE logistifytest SET`;

      for(let i in updateKeys){
        if(+i<updateLength-1){
          updateQuery+=` ${updateKeys[+i]}=$${+i+1} ,`
        }else{
          updateQuery+=` ${updateKeys[+i]}=$${+i+1} `
        }

      }
      updateQuery+=` WHERE client_id=$${+updateLength+1} RETURNING *`
      //console.log("update Query : ",updateQuery)
        client.query(updateQuery,updateValues, (error:any, result:any) => {
          if (error) {
            console.log(error)
            res.status(400).json({error})
          }else{
            return  res.status(200).send({
                status: 'Successful',
                message: `Corporate client information are updated  `,
                clients: result.rows,
              });
          }
      });
    },
    deleteData(req:Request,res:Response){
      if(!req.params?.client_id){
        return  res.status(500).send({
            status: 'Failure',
            message: `please send the client_id for delete `,
          });
      }
      let deleteQuery:string=`DELETE FROM logistifytest WHERE client_id=$1`;
      client.query(deleteQuery,[req.params.client_id], (error:any, result:any) => {
        if (error) {
          console.log(error)
          res.status(400).json({error})
        }else{
          return  res.status(200).send({
              status: 'Successful',
              message: `Corporate client information of client_id ${req.params.client_id} are deleted successfully `,
            });
        }
    });

  },
  selectOne(req:Request,res:Response){
    if(!req.params?.client_id){
      return  res.status(500).send({
          status: 'Failure',
          message: `please send the client_id for select `,
        });
    }
    let selectQuery:string=`SELECT *  FROM logistifytest WHERE client_id=$1`;
    client.query(selectQuery,[req.params.client_id], (error:any, result:any) => {
      if (error) {
        console.log(error)
        res.status(400).json({error})
      }else{
        return  res.status(200).send({
            status: 'Successful',
            message: `Corporate client information of client_id ${req.params.client_id} are selected `,
            client:result.rows
          });
      }
    });
  },

  }
}
