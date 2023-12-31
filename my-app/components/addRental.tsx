"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent, 
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const formSchema = z.object({
    studentEmail: z.string().email(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  })

  export type Students = {
    id: number
    nom: string
    prenom: string
    mail: string
  }

  interface AddItemProps {
    id: string;
    getItems: () => void;
    getRentals: () => void;
    getStudents: () => void;
    student: Students[];
  }

  export function AddRental({ id, getItems, getRentals, getStudents, student }: AddItemProps) {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        studentEmail: "",
        startDate: "",
        endDate: "",
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const valuesWithItemId = { ...values, itemId: id };
            console.log("Valeurs à envoyer :", valuesWithItemId);
            const response = await fetch(`${apiUrl}/api/v1/rentals`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(valuesWithItemId),
            });
            getItems();
            getRentals();
            getStudents();
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }

    return (
        <Sheet>
        <SheetTrigger className="h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Rent</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Rental to add</SheetTitle>
            <SheetDescription>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="studentEmail"
                render={({ field }) => (

                    <FormItem>
                      {student.length < 1 ? (
                    <>
                    <FormLabel>student e-mail</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="john.doe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </>
                    ) : (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Students</SelectLabel>
                          {student.map((student) => (
                            <SelectItem key={student.mail.toString()} value={student.mail.toString()}>
                              {`${student.nom} ${student.prenom}`}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    )}
                    </FormItem>
                )}
                />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                        <span>Pick a date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                initialFocus
                />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

                    <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Start date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                    <span>Pick a date</span>
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                            initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <SheetClose asChild>
                  <Button type="submit">Submit</Button>
                </SheetClose>
               
            </form>
            </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  }