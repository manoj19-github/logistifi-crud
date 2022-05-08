import {Router} from "express"
import clientCTRL from "../app/http/controllers/clientCTRL"

const Routes=Router();

Routes.get("/getAll",clientCTRL().getAllData)
Routes.post("/add",clientCTRL().insertData)
Routes.post("/update",clientCTRL().updateData)
Routes.get("/delete/:client_id",clientCTRL().deleteData)
Routes.get("/get/:client_id",clientCTRL().selectOne)






export default Routes
