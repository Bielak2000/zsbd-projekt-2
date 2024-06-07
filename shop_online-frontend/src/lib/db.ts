import { MongoClient } from 'mongodb';

declare global {
    // eslint-disable-next-line
    var mongo: {
        promise: ReturnType<typeof MongoClient.connect> | null;
        client: MongoClient | null;
    };
}

const { MONGODB_URI } = process.env;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
    global.mongo = { client: null, promise: null };
    cached = { client: null, promise: null };
}

async function getClient() {
    if (!MONGODB_URI)
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env file',
        );

    if (cached.client) {
        return cached.client;
    }

    if (!cached.promise) {
        cached.promise = new MongoClient(MONGODB_URI).connect();
    }

    try {
        cached.client = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
}

export async function getDatabase() {
    const client = await getClient();

    const database = client.db('online_shop');

    return {
        orders: database.collection('order'),
        users: database.collection('user'),
        products: database.collection('product'),
    };
}
