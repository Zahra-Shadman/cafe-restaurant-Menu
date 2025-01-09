import { z } from "zod";

export const orderFormSchema = z.object({
  firstName: z.string().min(2, "نام الزامی است"),
  lastName: z.string().min(2, "نام خانوادگی الزامی است"),
  address: z.string().min(5, "آدرس دقیق  الزامی است است"),
  PostalCode: z.number().min(5, "آدرس دقیق  الزامی است است"),

});

export type orderFormSchema = z.infer<typeof orderFormSchema>;
