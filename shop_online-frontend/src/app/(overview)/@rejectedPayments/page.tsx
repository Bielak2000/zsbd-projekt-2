import { getDatabase } from '~/lib/db';
import { UsersTable } from '~/app/users/UsersTable';

export default async function UsersWithRejectedPayment() {
    const db = await getDatabase();

    const users = await db.users
        .aggregate([
            {
                $lookup: {
                    from: 'order',
                    localField: '_id',
                    foreignField: 'client.id',
                    as: 'orders',
                },
            },
            { $unwind: '$orders' },
            {
                $match: {
                    'orders.payment_status': 'rejected',
                },
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    registered: 1,
                    personal_data: 1,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    email: { $first: '$email' },
                    registered: { $first: '$registered' },
                    personal_data: { $first: '$personal_data' },
                },
            },
        ])
        .toArray();

    return <UsersTable data={users} />;
}
