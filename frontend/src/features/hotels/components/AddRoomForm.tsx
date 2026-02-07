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

const roomFormSchema = z.object({
  name: z.string().min(2, {
    message: "Room type name must be at least 2 characters.",
  }),
  base_rate: z.preprocess(
    (val) => (String(val).trim() === "" ? NaN : Number(val)),
    z.number().positive({
      message: "Base rate must be a positive number.",
    })
  ),
  capacity: z.preprocess(
    (val) => (String(val).trim() === "" ? NaN : Number(val)),
    z.number().int().positive({
      message: "Capacity must be a positive integer.",
    })
  ),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>

interface AddRoomFormProps {
  onSubmit: (values: RoomFormValues) => void;
  initialValues?: RoomFormValues;
}

export function AddRoomForm({ onSubmit, initialValues }: AddRoomFormProps) {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: initialValues || {
      name: "",
      base_rate: 1.00,
      capacity: 1,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type Name</FormLabel>
              <FormControl>
                <Input placeholder="Standard Room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="base_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="150"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialValues ? 'Update Room Type' : 'Add Room Type'}</Button>
      </form>
    </Form>
  )
}