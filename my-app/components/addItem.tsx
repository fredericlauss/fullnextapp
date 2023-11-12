"use client"
import {
    Sheet,
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
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"



  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
    isRented: z.boolean().default(false),
    rentalId: z.string().nullable(),
  })


  export function AddItem() {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          isRented: false,
          rentalId: null,
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/items`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }

    return (
        <Sheet>
        <SheetTrigger>Add item</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Item to add</SheetTitle>
            <SheetDescription>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Item's name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  }