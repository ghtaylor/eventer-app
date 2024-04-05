import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { CreateEventFormSchema } from "./createEventFormSchema";

interface TicketDetailsFormGroupProps {
  form: UseFormReturn<CreateEventFormSchema>;
}

const TicketDetailsFormGroup: React.FC<TicketDetailsFormGroupProps> = ({ form }) => {
  const {
    fields: ticketFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const handleAppendTicket = () => {
    if (ticketFields.length === 3) return;

    append({
      price: 0,
      bookingFee: 0,
      quantity: 0,
    } as CreateEventFormSchema["tickets"][0]);
  };

  const handleRemoveTicket = (index: number) => {
    if (ticketFields.length === 1) return;

    remove(index);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Tickets</h2>
        <Button variant="secondary" onClick={() => handleAppendTicket()}>
          <LuPlus className="h-4 w-4" />
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {ticketFields.map((ticketField, index) => (
          <AccordionItem key={ticketField.id} value={`item-${index}`}>
            <AccordionTrigger>Ticket {index + 1}</AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name={`tickets.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Adult">Adult</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Family">Family</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`tickets.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(`tickets.${index}.quantity`, { valueAsNumber: true })}
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-x-4 w-full">
                <FormField
                  control={form.control}
                  name={`tickets.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price (£)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(`tickets.${index}.price`, { valueAsNumber: true })}
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`tickets.${index}.bookingFee`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Booking Fee (£)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(`tickets.${index}.bookingFee`, { valueAsNumber: true })}
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button variant="destructive" className="w-full" onClick={() => handleRemoveTicket(index)}>
                Remove Ticket
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default TicketDetailsFormGroup;
