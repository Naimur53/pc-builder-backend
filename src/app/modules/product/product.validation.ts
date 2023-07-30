import { z } from 'zod';

// Define the enum for the ProductCategory
const ProductCategoryEnum: [string, ...string[]] = [
  'CPU',
  'Motherboard',
  'RAM',
  'Power Supply Unit',
  'Storage Device',
  'Monitor',
  'Others',
];

// Define the Zod schema for the IProduct interface
const productZodSchema = z.object({
  body: z.object({
    img: z.string().nonempty('Image is required'),
    productName: z.string().nonempty('Product Name is required'),
    category: z.enum(ProductCategoryEnum, {
      required_error: 'Invalid category',
    }),
    price: z.number().min(0, 'Price must be a positive number'),
    status: z.enum(['In Stock', 'Out of stock'], {
      required_error: 'Invalid status',
    }),
    description: z.string().nonempty('Description is required'),
    keyFeatures: z.string().nonempty('Key Features is required'),
    individualRating: z
      .number()
      .min(0)
      .max(5, 'Individual Rating must be between 0 and 5'),
    averageRating: z
      .number()
      .min(0)
      .max(5, 'Average Rating must be between 0 and 5'),
  }),
});
const productUpdateZodSchema = z.object({
  body: z.object({
    img: z.string().nonempty('Image is required').optional(),
    productName: z.string().nonempty('Product Name is required').optional(),
    category: z
      .enum(ProductCategoryEnum, {
        required_error: 'Invalid category',
      })
      .optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    status: z
      .enum(['In Stock', 'Out of stock'], {
        required_error: 'Invalid status',
      })
      .optional(),
    description: z.string().nonempty('Description is required').optional(),
    keyFeatures: z.string().nonempty('Key Features is required').optional(),
    individualRating: z
      .number()
      .min(0)
      .max(5, 'Individual Rating must be between 0 and 5')
      .optional(),
    averageRating: z
      .number()
      .min(0)
      .max(5, 'Average Rating must be between 0 and 5')
      .optional(),
    reviews: z
      .array(
        z.object({
          userImg: z.string().url('Invalid user image URL'),
          userName: z.string().nonempty('User Name is required'),
          description: z.string().nonempty('Review description is required'),
        })
      )
      .optional(),
  }),
});

export const ProductZodValidation = {
  productZodSchema,
  productUpdateZodSchema,
};
