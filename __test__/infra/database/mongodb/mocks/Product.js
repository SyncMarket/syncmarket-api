"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFakeProduct = void 0;
const entities_1 = require("@core/entities");
const mongodb_1 = require("@infra/database/mongodb");
const mongodb_2 = require("mongodb");
const makeFakeProduct = () => {
    return new entities_1.ProductEntity({
        brandId: (0, mongodb_1.objectIdToString)(new mongodb_2.ObjectId()),
        name: (0, mongodb_1.objectIdToString)(new mongodb_2.ObjectId()),
        price: 10,
        stock: 10,
        campaignId: [
            {
                id: (0, mongodb_1.objectIdToString)(new mongodb_2.ObjectId()),
            },
        ],
        categoryId: (0, mongodb_1.objectIdToString)(new mongodb_2.ObjectId()),
        images: [
            {
                alt: 'alt',
                url: 'url',
                isMain: true,
            },
        ],
        height: 10,
        length: 10,
        width: 10,
        nbm: 'nbm',
        sku: 'sku',
        warranty: {
            text: 'text',
            time: new Date(),
        },
        weight: 10,
    });
};
exports.makeFakeProduct = makeFakeProduct;
