import { Router } from "express";
import { createProducts,getProducts } from "../controllers/productController.js";

const router=Router();
router.get("/test", (req, res) => {
    res.send("Product route works");
  });

  router.get("/",getProducts);
  router.post("/",createProducts);

  export default router; 

