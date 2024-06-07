import { getDatabase } from '~/lib/db';
import classes from './page.module.css';

export default async function TopPhone() {
    const db = await getDatabase();

    const [product] = await db.orders
        .aggregate([
            { $unwind: '$products' },
            { $match: { 'products.type': 'phone' } },
            {
                $lookup: {
                    from: 'product',
                    localField: 'products.id',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
            { $match: { 'productDetails.type': 'phone' } },
            {
                $project: {
                    _id: '$productDetails._id',
                    name: '$productDetails.device.model',
                    producer: '$productDetails.device.producer',
                    order_number: { $literal: 1 },
                },
            },
            {
                $group: {
                    _id: { _id: '$_id', name: '$name', producer: '$producer' },
                    order_number: { $sum: '$order_number' },
                },
            },
            {
                $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    producer: '$_id.producer',
                    order_number: 1,
                },
            },
            { $sort: { order_number: -1 } },
        ])
        .limit(1)
        .toArray();

    return (
        <div className={classes.phoneData}>
            <div>Product name</div>
            <div>{product.name}</div>
            <div>Manufacturer</div>
            <div>{product.producer}</div>
            <div>Number of orders</div>
            <div>{product.order_number}</div>
        </div>
    );
}
