import { Request, Response } from "express";
import Product from "../models/product.model.js";
import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getAllProducts:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const cachedProducts = await redis.get("featured_products");
    if (cachedProducts) {
      return res.json({ featuredProducts: JSON.parse(cachedProducts) });
    }

    // .lean() to return a plain JavaScript object, which if good for performance
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // Cache the result in Redis
    await redis.set(
      "featured_products",
      JSON.stringify(featuredProducts),
      "EX",
      3600
    );

    res.json(featuredProducts);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url || "",
      category,
      isFeatured: false,
    });
    res.status(201).json({ product });
  } catch (error) {
    console.log("Error in createProduct:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const product = await Product.findById(req.params._id);;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop()?.split(".")[0];

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Product image deleted from Cloudinary");
      } catch (error) {
        console.log(
          "Error during product image deletion from cloudinary:" + error
        );
        res.status(500).json({ message: "Internal server error: " + error });
      }
    }

    await Product.findByIdAndDelete(_id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const getRecommendedProducts = async (req:Request, res:Response) =>{
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])

        res.status(200).json({ products });
    } catch (error) {
        console.log("Error in getRecommendedProducts:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        res.status(200).json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
}

export const toggleFeaturedProduct = async (req: Request, res: Response) =>{
    const {_id} = req.params;
    try {
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();

        // Cache the updated product in Redis
        await updateFeaturedProductsCache();

        res.status(200).json({ updatedProduct });
    } catch (error) {
        console.log("Error in toggleFeaturedProduct:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
}

async function updateFeaturedProductsCache(){
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updateFeaturedProductsCache:", error);
    }
}
