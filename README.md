# Ogólne
W ramach przedmiotu Zawansowane architektury baz danych stworzony został system bazodanowy do obsługi sklepu internetowego z produktami w nierealcyjnej bazie danych MongoDB. Do celów prezentacyjnych zaimplementowany została również aplikacji webowa w języku TypeScript z wykorzystaniem frameworka React.

# Struktura danych

System bazodanowy zakład istnienie 3 kolekcji: user, product i order.
Przykladowe zapytania / agregacje znajduja sie w pliku /sample_queries/sample-queries.js

## User
Kolekcja zawierajaca uzytkownikow.

| Nazwa                      | Typ    | Opis                       |
| -------------------------- | ------ | -------------------------- |
| _id                        | liczba | ID uzytkownika             |
| email                      | tekst  | adres email uzytkownika    |
| registered                 | data   | data rejestracji           |
| password                   | tekst  | hasło                      |
| personal_date.name         | tekst  | imie uzytkownika           |
| personal_date.surname      | tekst  | naziwsko uzytkownika       |
| personal_date.address      | tekst  | adres uzytkownika          |
| personal_date.phone_number | tekst  | numer telefonu uzytkownika |


## Product
Kolekcja zawierajaca produkty - pokazanie tylko wspołnych kluczy.

| Nazwa        | Typ     | Opis                |
| ------------ | ------- | ------------------- |
| _id          | liczba  | ID produktu         |
| price        | liczba  | cena produktu       |
| availability | boolean | dostepnosc produktu |
| type         | tekst   | typ produktu        |


## Order
Kolekcja zawierajaca zamowienia.

| Nazwa          | Typ           | Opis                                   |
| -------------- | ------------- | -------------------------------------- |
| _id            | liczba        | ID zamowienia                          |
| client_id      | liczba        | ID klienta                             |
| order_date     | data          | data zamowienia                        |
| total_price    | liczba        | koszt zamowienia                       |
| address        | tekst         | adres dostawy                          |
| order.status   | tekst         | status zamowienia                      |
| payment.status | tekst         | status platnosci                       |
| product_ids    | tablica liczb | tablica z id-kami produktow zamowienia |
