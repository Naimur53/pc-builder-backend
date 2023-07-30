"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("./product.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const product_constant_1 = require("./product.constant");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getAllProduct = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // all Product
    const { searchTerm, publishedYear } = filters, filtersData = __rest(filters, ["searchTerm", "publishedYear"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //   search text
    if (searchTerm) {
        const wihtoutPublished = product_constant_1.ProductSearchableFields.slice(0, product_constant_1.ProductSearchableFields.length - 1);
        andConditions.push({
            $or: wihtoutPublished.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // make and query
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // Date query
    if (publishedYear) {
        // Create a range for the desired year
        moment_timezone_1.default.tz.setDefault('Asia/Dhaka');
        const startDate = new Date(Number(publishedYear), 0, 1); // January 1st of the desired year
        const endDate = new Date(Number(publishedYear) + 1, 0, 1);
        const startDateTimeZone = (0, moment_timezone_1.default)(startDate);
        const endDateTimeZone = (0, moment_timezone_1.default)(endDate);
        whereConditions['publishedDate'] = {
            $gt: startDateTimeZone,
            $lt: endDateTimeZone,
        };
        console.log(whereConditions);
    }
    const result = yield product_model_1.Product.find(whereConditions)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.Product.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield product_model_1.Product.create(payload);
    return newProduct;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getRandom = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.aggregate([{ $sample: { size: 6 } }]);
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return result;
});
exports.ProductService = {
    getAllProduct,
    createProduct,
    updateProduct,
    getSingleProduct,
    deleteProduct,
    getRandom,
};
