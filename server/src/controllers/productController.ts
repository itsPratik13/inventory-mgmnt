import type { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const searchQuery = req.params.search?.toString();
  
      const products = await prisma.products.findMany({
        ...(searchQuery && {
          where: {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        }),
      });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving products" });
    }
  };
  

export const createProducts=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {productId,name,price,rating,stockQuantity}=req.body;
        const product=await prisma.products.create({
            data:{
                productId,
                name,
                price,
                rating,
                stockQuantity
            }
        })

        res.status(201).json(product);
        
    } catch (error) {
        res.status(500).json({ message: "Error creating products" });
    }

}  
















