import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "نام محصول ضروری است"),
  description: z.string().min(5, "توضیحات باید حداقل 5 کاراکتر باشد"),
  brand: z.string().min(1, "برند محصول ضروری است"),
  price: z
    .number()
    .positive("قیمت باید بیشتر از صفر باشد")
    .min(3000, "حداقل قیمت 3000 تومان"),
  quantity: z
    .number()
    .min(0)
    .max(1000, "تعداد وارد شده قابل سفارش نیست"),
  category: z.string().min(1, "انتخاب مجموعه ضروری است"),
  subcategory: z.string().min(1, "انتخاب زیر مجموعه ضروری است"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
