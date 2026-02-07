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
import { Textarea } from "@/components/ui/textarea"

const rateAdjustmentFormSchema = z.object({
  amount: z.coerce.number(),
  effective_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Effective date must be a valid date.",
  }),
  reason: z.string().min(2, {
    message: "Reason must be at least 2 characters.",
  }),
})

export type RateAdjustmentFormValues = z.infer<typeof rateAdjustmentFormSchema>

interface AddRateAdjustmentFormProps {
  onSubmit: (values: RateAdjustmentFormValues) => void;
}

export function AddRateAdjustmentForm({ onSubmit }: AddRateAdjustmentFormProps) {
  const form = useForm<RateAdjustmentFormValues>({
    resolver: zodResolver(rateAdjustmentFormSchema),
    defaultValues: {
      amount: 0,
      effective_date: new Date().toISOString().split('T')[0],
      reason: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adjustment Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="20.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="effective_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Effective Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea placeholder="Peak season adjustment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Adjustment</Button>
      </form>
    </Form>
  )
}
