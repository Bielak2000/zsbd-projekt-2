import { getDatabase } from '~/lib/db';
import { OrdersTable } from './OrdersTable';

const pageSize = 15;

export default async function UsersPage({
    searchParams: { page = '1' },
}: {
    searchParams: {
        page?: string;
    };
}) {
    if (+page < 1) page = '1';

    const db = await getDatabase();

    const [orders, total] = await Promise.all([
        db.orders
            .aggregate([
                {
                    $project: {
                        order_date: {
                            $dateFromString: {
                                dateString: '$order_date',
                            },
                        },
                        total_price: true,
                        products: true,
                        address: true,
                        payment_status: true,
                        order_status: true,
                        client: true,
                    },
                },
                { $sort: { order_date: -1 } },
            ])
            .skip((+page - 1) * pageSize)
            .limit(pageSize)
            .toArray(),
        db.orders.countDocuments(),
    ]);

    return (
        <OrdersTable
            data={orders}
            currentPage={+page}
            pageSize={pageSize}
            total={total}
        />
    );
}
