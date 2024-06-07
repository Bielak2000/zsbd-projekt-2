import { getDatabase } from '~/lib/db';
import { ProductsTable } from './ProductsTable';

const pageSize = 10;

export default async function UsersPage({
    searchParams: { page = '1' },
}: {
    searchParams: {
        page?: string;
    };
}) {
    if (+page < 1) page = '1';

    const db = await getDatabase();

    const [products, total] = await Promise.all([
        db.products
            .find()
            .skip((+page - 1) * pageSize)
            .limit(pageSize)
            .toArray(),
        db.products.countDocuments(),
    ]);

    return (
        <ProductsTable
            data={products}
            currentPage={+page}
            pageSize={pageSize}
            total={total}
        />
    );
}
