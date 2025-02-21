
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/product-header";

interface ProductPageProps {

    params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({params}:ProductPageProps) => {
    const {productId}= await params;
    const product = await db.product.findUnique({where: {id: productId},include:{restaurant:{select:{avatarImageUrl:true,name:true}}}});
    
    if (!product){
        return notFound();
    }
    return ( <>
    
    
   <ProductHeader product={product} />
   <ProductDetails product={product}  />
    
    </> );
}
 
export default ProductPage;