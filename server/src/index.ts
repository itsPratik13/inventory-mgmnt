import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

//route imports
import dashboardRoutes from "./routes/dashboard.routes.js"
import productRoutes from "./routes/product.routes.js"
import userRoutes from "./routes/user.route.js"

/*configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

/*routes */
app.use("/dashboard",dashboardRoutes);
app.use("/products",productRoutes);
app.use("/users",userRoutes);
app.get("/health",(req,res)=>{
    res.send("Server is up and running");
});


/*server */

const port = Number(process.env.PORT) || 8000;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
server.on("error", (err) => {
  console.error("Server error:", err);
});
server.on("close", () => {
  console.log("Server closed");
});



  
