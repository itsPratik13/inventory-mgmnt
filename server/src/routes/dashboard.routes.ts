import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController.js";

const router=Router();
router.get("/test", (req, res) => {
    res.send("Dashboard route works");
  });
  

router.get("/",getDashboardMetrics);


export default router;
