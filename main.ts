import express,{Application,Request,Response} from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import clientRoutes from "./Routes/clientsRoutes"
import {createTables} from "./app/config/dbConn"
import dotenv from "dotenv"
export class App{
  private app:Application;
  private PORT:number;
  constructor(){
    dotenv.config()
    this.app=express()
    this.PORT=!!process.env.PORT ? +process.env.PORT :5000
    this.middleware()


  }
  middleware(){
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(morgan("dev"))
    this.app.use("/logistify-crud",clientRoutes)
    this.app.use((req:Request,res:Response)=>{
      return res.status(404).json({notFound:true,msg:"sorry try again"})
    })
  }
  routes(){
  }
  async listen(){
    await this.app.listen(this.PORT,()=>console.log(`server running  on port `,this.PORT))
    createTables()
  }
}
