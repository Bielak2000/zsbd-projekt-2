use('online_shop');

// 1. Pobieranie wszystkich produktow
db.product.find({});

// 2. Aktualizacja ceny produktu
db.product.updateOne(
    { _id: 1 },
    { $set: { price: 899.99 } }
);

// 3. Pobieranie wszystkich zamowienia dla klienta
db.order.find({ "client.id": 2 });

// 4. Wyswietlenie wszystkich zamowien, ktore maja w sobie dany produkt
db.order.find(
    { "products.id": 2 }
)

// 5. Wyswietlenie wszystkich niedostepnych produktow
db.product.find(
    { "availability": false }
)

// 6. Wyswietlenie najdrozszego produktu:
db.product.find().sort({ "price": -1 }).limit(1);

// 7. Wyswietlanie najtanszego produktu
db.product.find().sort({ "price": 1 }).limit(1);

// 8. Wyswietlenie zamowien z odrzuconymi platnosciami
db.order.find(
    { "payment_status": "rejected" }
);

// 9. Zmiana hasla usera
db.user.updateOne(
    { _id: 1 },
    { $set: { password: "new hash passwor" } }
);

// 10. Wyswietlenie danych personalnych wszystkich userow
db.user.find({}, { "personal_data": 1, "_id": 0 });

// 11. Zmiana numer telefonu uzytkownikowi
db.user.updateOne(
    { _id: 1 },
    { $set: { "personal_data.phone_number": "123456789" } }
);

// 12. Wyswietlenie wszystkich produktow bedaych telefonami
db.product.find(
    { "type": "phone" }
);

// 13. Wyswietlenie wszystkich produktow bedaych samochodami
db.product.find(
    { "type": "car" }
);

// 14. Wyswietlenie wszystkich produktow bedaych maszynami
db.product.find(
    { "type": "machine" }
);

// 15. Wypisanie id produktów z liczbą jego zamówień posortowane w dół wzgledem liczby zamowien telefonow:
db.order.aggregate([
    // Rozłożenie tablicy products na osobne dokumenty
    { $unwind: "$products" },
    // Filtrowanie produktów o typie 'phone'
    { $match: { "products.type": "phone" } },
    // Rzutowanie wyników
    {
        $project: {
            "_id": "$products.id",
            "order_number": { $literal: 1 } // Liczymy wszystkie dokumenty, więc liczba zamówień będzie równa liczbie dokumentów
        }
    },
    // Grupowanie wyników na podstawie identyfikatora produktu
    {
        $group: {
            "_id": "$_id",
            "order_number": { $sum: "$order_number" } // Sumowanie liczby zamówień dla każdego produktu
        }
    },
    // Sortowanie wyników według liczby zamówień malejąco
    { $sort: { "order_number": -1 } }
]);

// 16. Na podstawie zapytania 15 - wyszukuje dane odnsnie tych produktow w kolekcji product
db.order.aggregate([
    // Rozłożenie tablicy products na osobne dokumenty
    { $unwind: "$products" },
    // Filtrowanie produktów o typie 'phone'
    { $match: { "products.type": "phone" } },
    // Łączenie z kolekcją product na podstawie products.id
    {
        $lookup: {
            from: "product",
            localField: "products.id",
            foreignField: "_id",
            as: "productDetails"
        }
    },
    // Rozłożenie tablicy productDetails na osobne dokumenty
    { $unwind: "$productDetails" },
    // Dodatkowe sprawdzenie, czy productDetails ma odpowiedni typ 'phone'
    { $match: { "productDetails.type": "phone" } },
    // Rzutowanie wyników
    {
        $project: {
            "_id": "$productDetails._id",
            "name": "$productDetails.device.model",
            "producer": "$productDetails.device.producer",
            "order_number": { $literal: 1 } // Liczymy wszystkie dokumenty, więc liczba zamówień będzie równa liczbie dokumentów
        }
    },
    // Grupowanie wyników na podstawie id produktu, modelu i producenta
    {
        $group: {
            "_id": { "_id": "$_id", "name": "$name", "producer": "$producer" },
            "order_number": { $sum: "$order_number" } // Sumowanie liczby zamówień dla każdego produktu
        }
    },
    // Rzutowanie wyników końcowych
    {
        $project: {
            "_id": "$_id._id",
            "name": "$_id.name",
            "producer": "$_id.producer",
            "order_number": 1
        }
    },
    // Sortowanie wyników według liczby zamówień malejąco
    { $sort: { "order_number": -1 } }
]);

// 17. Wyswietl uzytkownika z najwieksza liczba zamowien:
use('online_shop');
db.user.aggregate([
    // Wybor użytkowników i zamówień na podstawie id klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client.id",
            as: "orders"
        }
    },
    // Obliczenie liczby zamówień dla każdego użytkownika
    {
        $addFields: {
            "num_orders": { $size: "$orders" }
        }
    },
    // Sortowanie użytkowników według liczby zamówień malejąco
    { $sort: { "num_orders": -1 } },
    // Limit wyników do jednego dokumentu (użytkownik z największą liczbą zamówień)
    { $limit: 1 },
    // Rzutowanie wyników, aby zawierały tylko potrzebne pola
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


// 18. Wyswietl uzytkownika z najwieksza laczna wartoscia zamowien:
db.user.aggregate([
    // Dopasowanie uzytkowniko1w i zamoswien na podstawie identyfikatora klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client.id",
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
    // Rzutowanie wynikow aby zawieraly tylko potrzebne pola
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

// 19. Wyswietlenie wszystkich uzytkownikow ktorzy maja w jakims zamowienie status platnosci rejected:
use('online_shop');

db.user.aggregate([
    // Dopasowanie uzytkownikow i zamowien na podstawie id klienta
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "client.id",
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
    // Rzutowanie wynikow aby zawieraly tylko informacje o uzytkownikach
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

// 20. Wyswietlenie zamowien gdzie adres dostawy jest inny niz adres uzytkownika
db.order.aggregate([
    // Dopasowanie zamowien i klientow na podstawie id klienta
    {
        $lookup: {
            from: "user",
            localField: "client.id",
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
    // Rzutowanie wynikow, aby zawieraly tylko informacje o zamowieniach
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

// 21. Zmiana produktu na niedostępny
db.product.updateOne(
    { _id: 1 },
    { $set: { availability: false } }
);
