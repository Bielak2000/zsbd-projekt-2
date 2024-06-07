import { getDatabase } from '~/lib/db';
import classes from './page.module.css';

export default async function TopUserByOrderValue() {
    const db = await getDatabase();

    const [user] = await db.users
        .aggregate([
            {
                $lookup: {
                    from: 'order',
                    localField: '_id',
                    foreignField: 'client.id',
                    as: 'orders',
                },
            },
            {
                $addFields: {
                    total_price: { $sum: '$orders.total_price' },
                },
            },
            { $sort: { total_price: -1 } },
            { $limit: 1 },
            {
                $project: {
                    _id: true,
                    email: true,
                    registered: true,
                    personal_data: true,
                    total_price: true,
                },
            },
        ])
        .toArray();

    return (
        <div className={classes.userData}>
            <div>Name</div>
            <div>
                {user.personal_data.name} {user.personal_data.surname}
            </div>
            <div>Total orders price</div>
            <div>
                {new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                }).format(user.total_price)}
            </div>
            <div>Registered at</div>
            <div>{user.registered}</div>
            <div>Phone no.</div>
            <div>{user.personal_data.phone_number}</div>
            <div>Address</div>
            <div>{user.personal_data.address}</div>
        </div>
    );
}
