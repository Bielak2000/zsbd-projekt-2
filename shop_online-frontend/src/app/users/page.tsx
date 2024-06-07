import { getDatabase } from '~/lib/db';
import { UsersTable } from './UsersTable';

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

    const [users, total] = await Promise.all([
        db.users
            .find({}, { projection: { password: false } })
            .skip((+page - 1) * pageSize)
            .limit(pageSize)
            .toArray(),
        db.users.countDocuments(),
    ]);

    return (
        <UsersTable
            data={users}
            currentPage={+page}
            pageSize={pageSize}
            total={total}
        />
    );
}
