# Ogólne
W ramach przedmiotu Zawansowane architektury baz danych stworzony został system bazodanowy do obsługi sklepu internetowego z produktami w nierealcyjnej bazie danych MongoDB. Do celów prezentacyjnych zaimplementowany została również aplikacji webowa w języku TypeScript z wykorzystaniem frameworka React.

# Struktura danych

System bazodanowy zakład istnienie 3 kolekcji: user, product i order.
Przykladowe zapytania / agregacje znajduja sie w pliku /sample_queries/sample-queries.js

## User
Kolekcja zawierajaca uzytkownikow.

  <table>
    <thead>
      <tr>
        <th>Nazwa</th>
        <th>Typ</th>
        <th>Opis</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>_id</td>
            <td>liczba</td>
            <td>ID uzytkownika</td>
        </tr>
        <tr>
            <td>email</td>
            <td>tekst</td>
            <td>adres email uzytkownika</td>
        </tr>
        <tr>
            <td>registered</td>
            <td>data</td>
            <td>data rejestracji</td>
        </tr>
        <tr>
            <td>password</td>
            <td>tekst</td>
            <td>hasło</td>
        </tr>
        <tr>
            <td>personal_date.name</td>
            <td>tekst</td>
            <td>imie uzytkownika</td>
        </tr>
        <tr>
            <td>personal_date.surname</td>
            <td>tekst</td>
            <td>naziwsko uzytkownika</td>
        </tr>
        <tr>
            <td>personal_date.address</td>
            <td>tekst</td>
            <td>adres uzytkownika</td>
        </tr>
        <tr>
            <td>personal_date.phone_number</td>
            <td>tekst</td>
            <td>numer telefonu uzytkownika</td>
        </tr>
    </tbody>
  </table>

## Product
Kolekcja zawierajaca produkty - pokazanie tylko wspołnych kluczy.

  <table>
    <thead>
      <tr>
        <th>Nazwa</th>
        <th>Typ</th>
        <th>Opis</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>_id</td>
            <td>liczba</td>
            <td>ID produktu</td>
        </tr>
        <tr>
            <td>price</td>
            <td>liczba</td>
            <td>cena produktu</td>
        </tr>
        <tr>
            <td>availability</td>
            <td>boolean</td>
            <td>dostepnosc produktu</td>
        </tr>
        <tr>
            <td>type</td>
            <td>tekst</td>
            <td>typ produktu</td>
        </tr>
    </tbody>
  </table>

## Order
Kolekcja zawierajaca zamowienia.

  <table>
    <thead>
      <tr>
        <th>Nazwa</th>
        <th>Typ</th>
        <th>Opis</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>_id</td>
            <td>liczba</td>
            <td>ID zamowienia</td>
        </tr>
        <tr>
            <td>client_id</td>
            <td>liczba</td>
            <td>ID klienta</td>
        </tr>
        <tr>
            <td>order_date</td>
            <td>data</td>
            <td>data zamowienia</td>
        </tr>
        <tr>
            <td>total_price</td>
            <td>liczba</td>
            <td>koszt zamowienia</td>
        </tr>
        <tr>
            <td>address</td>
            <td>tekst</td>
            <td>adres dostawy</td>
        </tr>
        <tr>
            <td>order.status</td>
            <td>tekst</td>
            <td>status zamowienia</td>
        </tr>
        <tr>
            <td>payment.status</td>
            <td>tekst</td>
            <td>status platnosci</td>
        </tr>
        <tr>
            <td>product_ids</td>
            <td>tablica liczb</td>
            <td>tablica z id-kami produktow zamowienia</td>
        </tr>
    </tbody>
  </table>
