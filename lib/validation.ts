
import { z } from "zod";

export const productSchema = z.object({
name: z.string().min(1, "نام محصول ضروری است"),
description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
brand: z.string().min(1, "برند محصول ضروری است"),
price: z.number().positive("قیمت باید بیشتر از صفر باشد").min(300000,"حداقل قیمت 300,000 تومان"),
quantity: z.number().min(1, "تعداد باید حداقل 1 باشد").max(30,"تعداد وارد شده قابل سفارش نیست"),
category: z.string().min(1, "انتخاب دسته‌بندی ضروری است"),
subcategory: z.string().min(1, "انتخاب زیر دسته‌بندی ضروری است"),
thumbnail: z.any().optional(),
images: z.any().optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;