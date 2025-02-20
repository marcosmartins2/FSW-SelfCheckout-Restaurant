import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

interface ProductPageProps {

    params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({params}:ProductPageProps) => {
    const {slug,productId}= await params;
    const product = await db.product.findUnique({where: {id: productId}});

    if (!product){
        return notFound();
    }
    return ( <>
    
    
   <div className="relative w-full h-[300px]">
    <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
    {slug}
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
   </div>
    
    </> );
}
 
export default ProductPage;