import { getDatabase } from '~/lib/db';
import { UsersTable } from './UsersTable';
import { revalidatePath } from 'next/cache';
import dayjs from 'dayjs';
import { objectIdOrNumber } from '~/utils/objectIdOrNumber';

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
            .find(
                {},
                {
                    projection: {
                        _id: {
                            $toString: '$_id',
                        },
                        registered: {
                            $dateFromString: {
                                dateString: '$registered',
                            },
                        },
                        email: true,
                        personal_data: true,
                    },
                },
            )
            .sort('registered', 'descending')
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
            onUserDelete={async (id: any) => {
                'use server';

                const db = await getDatabase();

                await db.users.deleteOne({ _id: objectIdOrNumber(id) });
                revalidatePath('/users');
            }}
            onUserUpdate={async (id: any, formData: any) => {
                'use server';

                const db = await getDatabase();

                await db.users.updateOne(
                    { _id: objectIdOrNumber(id) },
                    {
                        $set: {
                            email: formData.email,
                            personal_data: {
                                name: formData.name,
                                surname: formData.surname,
                                address: formData.address,
                                phone_number: formData.phone,
                            },
                        },
                    },
                );
                revalidatePath('/users');
            }}
            onUserCreate={async formData => {
                'use server';

                const db = await getDatabase();

                await db.users.insertOne({
                    email: formData.email,
                    password: formData.password,
                    registered: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    personal_data: {
                        name: formData.name,
                        surname: formData.surname,
                        address: formData.address,
                        phone_number: formData.phone,
                    },
                });
                revalidatePath('/users');
            }}
        />
    );
}
