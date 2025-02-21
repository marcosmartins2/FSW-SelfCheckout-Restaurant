"use client"

import { Prisma, } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";
import CartSheet from "../../components/cart-sheet";

interface ProductDetailsProps {
    
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {avatarImageUrl: true, name: true}}}}>;
}

const ProductDetails = ({product}:ProductDetailsProps) => {

    const {toggleCart,addProduct} = useContext(CartContext);

    const [quantity, setQuantity] = useState<number>(1);

    const handleMinusQuantityClick = ()=>{
        if (quantity===0){
            setQuantity(0)
        } else if(quantity>0){
            setQuantity(quantity-1)
        }
    }

    const handleAddToCart = ()=>{
        addProduct({...product,quantity})
        toggleCart()
    }

    return ( 

        
        <>
        
        <div className="relative rounded-t-3xl py-5 mt-[-1.5rem] z-50 p-5 flex-auto flex flex-col overflow-hidden">


       

        <div className="flex-auto overflow-hidden">
            <div className="flex items-center gap-1.5">
            <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
            <p className="text-xs text-muted-foreground ">{product.restaurant.name}</p>
            </div>
            <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center justify-between mt-3">
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

          
              <ScrollArea className="h-full">

              <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">Sobre</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-1">
                      <ChefHatIcon size={18}/>
                      <h4 className="font-semibold">Ingredientes</h4>
                  </div>
                  <ul className="list-disc px-5 text-sm text-muted-foreground">

            {product.ingredients.map((ingredient,id) => (
                <li key={id} className="mb-1">{ingredient}</li>
            ))}

                  </ul>
              </div>
              </ScrollArea>



                      </div>

             
          

        <Button className="mt-6 rounded-full w-full"onClick={handleAddToCart}>Adicionar à sacola</Button>

       

        </div>

        <CartSheet/>
        </>
        
     );
}
 
export default ProductDetails;