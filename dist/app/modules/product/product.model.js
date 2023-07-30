"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
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
const productSchema = new mongoose_1.Schema({
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
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
