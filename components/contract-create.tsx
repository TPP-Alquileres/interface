"use client"

import { useState, useEffect } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  description: z.string().min(1, { message: "El título es obligatorio" }),
  startDate: z.date({ message: "La fecha de inicio es obligatoria" }),
  endDate: z.date({ message: "La fecha de fin es obligatoria" }),
  amount: z.coerce.number().min(1, { message: "El monto a asegurar es inválido" })
}).refine((object) => object.endDate > object.startDate, 
  { message: "La fecha de fin tiene que ser posterior a la de inicio", path: ["endDate"] }
);

export function ContractCreate( { onGenerateLinkButtonClick } ) {
  const form = useForm( {
    resolver: zodResolver(formSchema),
    defaultValues: { description: "", startDate: "" }
  } );

  return (
    <div className="pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerateLinkButtonClick)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre que le vas a dar al contrato</FormLabel>
                <FormControl>
                  <Input placeholder="Contrato de alquiler de Libertador al 12000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 items-start gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Inicio del contrato</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            { field.value ? format(field.value, "dd/MM/yyyy") : <span>Fecha de inicio</span> }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar locale={es} mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fin del contrato</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            { field.value ? format(field.value, "dd/MM/yyyy") : <span>Fecha de fin</span> }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar locale={es} mode="single" selected={field.value} onSelect={field.onChange} initialFocus 
                          disabled={(date) =>
                            date <= form.getValues("startDate")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto a asegurar</FormLabel>
                    <FormControl>
                      <Input placeholder="$0.00" step="1.00" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={!form.formState.isValid}>Generar Link</Button>
        </form>
      </Form>
    </div>
  )
};
