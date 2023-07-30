"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodValidation = void 0;
const zod_1 = require("zod");
// Define the enum for the ProductCategory
const ProductCategoryEnum = [
    'CPU',
    'Motherboard',
    'RAM',
    'Power Supply Unit',
    'Storage Device',
    'Monitor',
    'Others',
];
// Define the Zod schema for the IProduct interface
const productZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        img: zod_1.z.string().nonempty('Image is required'),
        productName: zod_1.z.string().nonempty('Product Name is required'),
        category: zod_1.z.enum(ProductCategoryEnum, {
            required_error: 'Invalid category',
        }),
        price: zod_1.z.number().min(0, 'Price must be a positive number'),
        status: zod_1.z.enum(['In Stock', 'Out of stock'], {
            required_error: 'Invalid status',
        }),
        description: zod_1.z.string().nonempty('Description is required'),
        keyFeatures: zod_1.z.string().nonempty('Key Features is required'),
        individualRating: zod_1.z
            .number()
            .min(0)
            .max(5, 'Individual Rating must be between 0 and 5'),
        averageRating: zod_1.z
            .number()
            .min(0)
            .max(5, 'Average Rating must be between 0 and 5'),
    }),
});
const productUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        img: zod_1.z.string().nonempty('Image is required').optional(),
        productName: zod_1.z.string().nonempty('Product Name is required').optional(),
        category: zod_1.z
            .enum(ProductCategoryEnum, {
            required_error: 'Invalid category',
        })
            .optional(),
        price: zod_1.z.number().min(0, 'Price must be a positive number').optional(),
        status: zod_1.z
            .enum(['In Stock', 'Out of stock'], {
            required_error: 'Invalid status',
        })
            .optional(),
        description: zod_1.z.string().nonempty('Description is required').optional(),
        keyFeatures: zod_1.z.string().nonempty('Key Features is required').optional(),
        individualRating: zod_1.z
            .number()
            .min(0)
            .max(5, 'Individual Rating must be between 0 and 5')
            .optional(),
        averageRating: zod_1.z
            .number()
            .min(0)
            .max(5, 'Average Rating must be between 0 and 5')
            .optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            userImg: zod_1.z.string().url('Invalid user image URL'),
            userName: zod_1.z.string().nonempty('User Name is required'),
            description: zod_1.z.string().nonempty('Review description is required'),
        }))
            .optional(),
    }),
});
exports.ProductZodValidation = {
    productZodSchema,
    productUpdateZodSchema,
};
