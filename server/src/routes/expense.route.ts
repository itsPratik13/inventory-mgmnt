import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseController.js";
const router=Router();
router.get("/test", (req, res) => {
    res.send("Dashboard route works");
  });
  

router.get("/",getExpensesByCategory);


export default router;
