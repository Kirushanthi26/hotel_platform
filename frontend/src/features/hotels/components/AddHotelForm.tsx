"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const hotelFormSchema = z.object({
  hotelName: z.string().min(2, {
    message: "Hotel name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

export type HotelFormValues = z.infer<typeof hotelFormSchema>

interface AddHotelFormProps {
  onSubmit: (values: HotelFormValues) => void;
  initialValues?: HotelFormValues;
}

export function AddHotelForm({ onSubmit, initialValues }: AddHotelFormProps) {
  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: initialValues || {
      hotelName: "",
      address: "",
      city: "",
      country: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hotelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input placeholder="City Central Hotel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="789 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Galle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Sri Lanka" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialValues ? 'Update Hotel' : 'Add Hotel'}</Button>
      </form>
    </Form>
  )
}