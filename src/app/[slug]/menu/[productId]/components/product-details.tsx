"use client"

import { Prisma, } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ProductDetailsProps {
    
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {avatarImageUrl: true, name: true}}}}>;
}

const ProductDetails = ({product}:ProductDetailsProps) => {

    const [quantity, setQuantity] = useState<number>(1);

    const handleMinusQuantityClick = ()=>{
        if (quantity===0){
            setQuantity(0)
        } else if(quantity>0){
            setQuantity(quantity-1)
        }
    }

    return ( 

        <div className="relative rounded-t-3xl py-5 mt-[-1.5rem] z-50 p-5 flex-auto flex flex-col">


       

        <div className="flex-auto">
            <div className="flex items-center gap-1.5">
            <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
            <p className="text-xs text-muted-foreground ">{product.restaurant.name}</p>
            </div>
            <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </h3>
                <div className="flex items-center gap-3 text-center">
                    <Button variant="outline" className="w-8 h-8 rounded-xl" onClick={handleMinusQuantityClick}>
                        <ChevronLeftIcon/>
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button variant="destructive" className="w-8 h-8 rounded-xl" onClick={() => setQuantity(quantity + 1)}>
                        <ChevronRightIcon/>
                    </Button>
                </div>
            </div>
            <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1">
                    <ChefHatIcon size={18}/>
                    <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <p className="text-sm text-muted-foreground">{product.ingredients}</p>
            </div>
        </div>

        <Button className="mt-6 rounded-full w-full">Adicionar à sacola</Button>

       

        </div>
     );
}
 
export default ProductDetails;