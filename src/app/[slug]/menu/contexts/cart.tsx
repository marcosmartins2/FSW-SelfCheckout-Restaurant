"use client"

import {Product} from '@prisma/client'
import { createContext, ReactNode, useState } from 'react';


interface CartProduct extends Product{
    quantity:number;
}

export interface ICartContext {
    isOpen:boolean;
    products:CartProduct[];
    toggleCart:()=>void;
}


export const CartContext = createContext<ICartContext>({
    isOpen:false,
    products:[],
    toggleCart:()=>{}
})


export const CartProvider = ({children}:{children:ReactNode})=>{

    const [products,setProducts] = useState<CartProduct[]>([]);
    const [isOpen,setIsOpen] = useState<boolean>(false);


    const toglleCart = ()=>{
        setIsOpen(!isOpen)
    }

    return (
        <CartContext.Provider value={{isOpen:isOpen,products:products,toggleCart:toglleCart}}>
            {children}
        </CartContext.Provider>
    )
}