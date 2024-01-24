import { ProductEntity } from '@core/entities';
import { ProductDTO } from '@core/interfaces';
import { objectIdToString } from '@infra/database/mongodb';
import { ObjectId } from 'mongodb';

export const makeFakeProductMongo = (): ProductEntity => {
    const productDTO: ProductDTO = {
        brandId: objectIdToString(new ObjectId()),
        name: objectIdToString(new ObjectId()),
        price: 10,
        stock: 10,
        campaignId: [
            {
                id: objectIdToString(new ObjectId()),
            },
        ],
        categoryId: objectIdToString(new ObjectId()),
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
    };

    return new ProductEntity(productDTO, objectIdToString(new ObjectId()));
};