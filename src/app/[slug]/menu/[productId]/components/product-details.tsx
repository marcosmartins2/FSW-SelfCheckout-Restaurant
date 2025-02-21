"use client"

import { Prisma, } from "@prisma/client";
import Image from "next/image";

interface ProductDetailsProps {
    
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {avatarImageUrl: true, name: true}}}}>;
}

const ProductDetails = ({product}:ProductDetailsProps) => {
    return ( 

        <div className="relative rounded-t-3xl py-5 mt-[-1.5rem] z-50">


        <div>

        <div className="flex items-center gap-1 px-5">

        <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />

        </div>

        </div>

        </div>
     );
}
 
export default ProductDetails;