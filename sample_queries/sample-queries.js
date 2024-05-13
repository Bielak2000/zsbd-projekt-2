use('online_shop');

// 1. Pobieranie wszystkich produktow
db.product.find({});

// 2. Aktualizacja ceny produktu
db.product.updateOne(
    { _id: 1 },
    { $set: { price: 899.99 } }
);

// 3. Pobieranie wszystkich zamowienia dla klienta
db.order.find({ client_id: 2 });

// 4. Wyswietlenie wszystkich zamowien, ktore maja w sobie dany produkt
db.order.find(
    { "product_ids": { $in: [627] } }
)

// 5. Wyswietlenie wszystkich niedostepnych produktow
db.product.find(
    { "availability": false }
)

// 6. Wyswietlenie najdrozszego i najtanszego produktu:
db.product.find().sort({ "price": -1 }).limit(1);
db.product.find().sort({ "price": 1 }).limit(1);

// 7. Wyswietlenie zamowien z odrzuconymi platnosciami
db.order.find(
    { "payment_status": "rejected" }
);

// 8. Zmiana hasla usera
db.user.updateOne(
    { _id: 1 },
    { $set: { password: "new hash passwor" } }
);

// 9. Wyswietlenie danych personalnych wszystkich userow
db.user.find({}, { "personal_data": 1, "_id": 0 });

// 10. Zmiana numer telefonu uzytkownikowi
db.user.updateOne(
    { _id: 1 },
    { $set: { "personal_data.phone_number": "123456789" } }
);

// 11. Wypisanie modelu, producentu i id produktu z liczbą jego zamówień posortowane w dół wzgledem liczby zamowien:
db.order.aggregate([
    // Rozklad tablicy product_ids na osobne dokumenty
    { $unwind: "$product_ids" },
    // Polaczenie z kolekcja produktow aby miec wszystkie dane
    {
        $lookup: {
            from: "product",
            localField: "product_ids",
            foreignField: "_id",
            as: "products"
        }
    },
    // Rozbicie danych na osobne dokumenty
    { $unwind: "$products" },
    // Projektowanie wynikow
    {
        $project: {
            "_id": "$products._id",
            "model": "$products.device.model",
            "producer": "$products.device.producer",
            "order_number": 1 // Liczymy wszystkie dokumenty więc liczba zamówień będzie rowna liczbie dokumentow
        }
    },
    // Grupowanie wynikow na podstawie id produktu, modelu i producenta
    {
        $group: {
            "_id": { "_id": "$_id", "model": "$model", "producer": "$producer" },
            "order_number": { $sum: 1 } // Sumowanie liczby zamowien dla każdego produktu
        }
    },
    // Sortowanie wynikow według liczby zamowien malejaco
    { $sort: { "order_number": -1 } },
    // Projektowanie wynikow koncowych
    {
        $project: {
            "_id": "$_id._id",
            "model": "$_id.model",
            "producer": "$_id.producer",
            "order_number": 1
        }
    }
]);

// 12. Wyswietl uzytkownika z najwieksza liczba zamowien:
use('online_shop');

db.user.aggregate([
    // Wybor uzytkowników i zamowien na podstawie id klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client_id",
            as: "orders"
        }
    },
    // Obliczenie liczby zamowien dla każdego użytkownika
    {
        $addFields: {
            "num_orders": { $size: "$orders" }
        }
    },
    // Sortowanie uzytkownikow wedlug liczby zamowien malejaco
    { $sort: { "num_orders": -1 } },
    // Limit wynikow do jednego dokumentu (użytkownik z najwieksza liczbą zamowien)
    { $limit: 1 },
    // Projektowanie wynikow aby zawieraly tylko potrzebne pola
    {
        $project: {
            "_id": 1,
            "email": 1,
            "registered": 1,
            "password": 1,
            "personal_data": 1,
            "num_orders": 1
        }
    }
]);

// 13. Wyswietl uzytkownika z najwieksza laczna wartoscia zamowien:
db.user.aggregate([
    // Dopasowanie uzytkowniko1w i zamoswien na podstawie identyfikatora klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client_id",
            as: "orders"
        }
    },
    // Obliczenie sumy cen wszystkich zamowien dla każdego użytkownika
    {
        $addFields: {
            "total_price": { $sum: "$orders.total_price" }
        }
    },
    // Sortowanie uzytkownikow wedlug sumy cen zamowien w kolejnosci malejacej
    { $sort: { "total_price": -1 } },
    // Limit wynikow do jednego dokumentu (użytkownik z najwiksza suma cen zamowien)
    { $limit: 1 },
    // Projektowanie wynikow aby zawieraly tylko potrzebne pola
    {
        $project: {
            "_id": 1,
            "email": 1,
            "registered": 1,
            "password": 1,
            "personal_data": 1,
            "total_price": 1
        }
    }
])

// 14. Wyswietlenie wszystkich uzytkownikow ktorzy maja w jakims zamowienie status platnosci rejected:
use('online_shop');

db.user.aggregate([
    // Dopasowanie uzytkownikow i zamowien na podstawie id klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client_id",
            as: "orders"
        }
    },
    // Rozkladanie zamowien na osobne dokumenty
    { $unwind: "$orders" },
    // Dopasowanie zamowienn o statusie platnosci "rejected"
    {
        $match: {
            "orders.payment_status": "rejected"
        }
    },
    // Projektowanie wynikow aby zawieraly tylko informacje o uzytkownikach
    {
        $project: {
            "_id": 1,
            "email": 1,
            "registered": 1,
            "password": 1,
            "personal_data": 1
        }
    },
    // Grupowanie wynikow na podstawie id uzytkownika aby usunac powtorzenia
    {
        $group: {
            "_id": "$_id",
            "email": { $first: "$email" },
            "registered": { $first: "$registered" },
            "password": { $first: "$password" },
            "personal_data": { $first: "$personal_data" }
        }
    }    
])

// 15. Wyswietlenie zamowien gdzie adres dostawy jest inny niz adres uzytkownika
db.order.aggregate([
    // Dopasowanie zamowien i klientow na podstawie id klienta
    {
        $lookup: {
            from: "user",
            localField: "client_id",
            foreignField: "_id",
            as: "users"
        }
    },
    // Rozkładanie zamowien na osobne dokumenty
    { $unwind: "$users" },
    // Dopasowanie zamowien których adres jest rozny od adresu klienta
    {
        $match: {
            "address": { $ne: "$users.personal_data.address" }
        }
    },
    // Projektowanie wynikow, aby zawieraly tylko informacje o zamowieniach
    {
        $project: {
            "_id": 1,
            "order_date": 1,
            "total_price": 1,
            "address": 1,
            "product_ids": 1,
            "order_status": 1,
            "payment_status": 1,
            "client_id": 1
        }
    }
])