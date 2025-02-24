"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {PatternFormat} from "react-number-format"
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf } from "../helpers/helpers";

// Definição do schema com Zod
const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório!",
  }),
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF inválido",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

// Função de submit
const onSubmit = (data: FormSchema) => {
  console.log(data);
};

interface FinishOrderDialogProps {
    open:boolean;
    onOpenChange:(open:boolean) => void
}

const FinishOrderDialog = ({open,onOpenChange}:FinishOrderDialogProps) => {
  // Inicialização do useForm
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido?</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>

        {/* Formulário */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo CPF */}
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF:</FormLabel>
                  <FormControl>
                    <PatternFormat placeholder="Digite seu CPF..." format="###.###.###-##" customInput={Input} {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botão de submit */}
            <Button type="submit" className="w-full rounded-full" variant="destructive">
              Finalizar 
            </Button>
          </form>
        </Form>

        {/* Rodapé do Drawer */}
        <DrawerClose className="p-4" asChild>
          <Button variant="outline" className="w-full rounded-full">
            Cancelar
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;