import { Router } from "express";
import { getUsers } from "../controllers/userController.js";

const router=Router();
router.get("/test", (req, res) => {
    res.send("User route works");
  });

  router.get("/",getUsers);


  export default router; 