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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UpdateItemProps {
  id: string;
  name: string;
  getItems: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  isRented: z.boolean().default(false),
  rentalId: z.string().nullable(),
})

  export function UpdateItem({ id, name, getItems }: UpdateItemProps) {
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
            const response = await fetch(`${apiUrl}/api/v1/items/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            getItems();
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }
    return (
        <Sheet>
        <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground"><Pencil className="h-4 w-4" /></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update item</SheetTitle>
            <SheetDescription>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder={name} {...field} />
                    </FormControl>
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