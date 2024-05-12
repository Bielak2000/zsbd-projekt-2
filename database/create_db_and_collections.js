const database = 'online_shop';
const userCollection = 'user';
const productCollection = 'product';
const orderCollection = 'order';

// Create a new database.
use(database);

// Create a new collections.
db.createCollection(userCollection, { autoIndexId: false });
db.createCollection(productCollection, { autoIndexId: false });
db.createCollection(orderCollection, { autoIndexId: false });
