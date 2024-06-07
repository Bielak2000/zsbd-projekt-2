import { getDatabase } from '~/lib/db';
import classes from './page.module.css';

export default async function TopUserByOrderCount() {
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
                    num_orders: { $size: '$orders' },
                },
            },
            { $sort: { num_orders: -1 } },
            { $limit: 1 },
            {
                $project: {
                    _id: true,
                    email: true,
                    registered: true,
                    personal_data: true,
                    num_orders: true,
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
            <div>Orders placed</div>
            <div>{user.num_orders}</div>
            <div>Registered at</div>
            <div>{user.registered}</div>
            <div>Phone no.</div>
            <div>{user.personal_data.phone_number}</div>
            <div>Address</div>
            <div>{user.personal_data.address}</div>
        </div>
    );
}
