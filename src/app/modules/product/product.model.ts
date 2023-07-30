import { Schema, model } from 'mongoose';
import { ProductModel, IProduct } from './product.interface';

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

// Create a Mongoose schema
const productSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ProductCategoryEnum,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of stock'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: String,
    required: true,
  },
  individualRating: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [
      {
        userImg: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    default: [], // Set default value to an empty array
  },
});
export const Product = model<IProduct, ProductModel>('Product', productSchema);
