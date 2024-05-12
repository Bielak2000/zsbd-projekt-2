# Ogólne
W ramach przedmiotu Zawansowane architektury baz danych stworzony został system bazodanowy do obsługi sklepu internetowego z telefonami w nierealcyjnej bazie danych MongoDB. Do celów prezentacyjnych zaimplementowany została również aplikacji webowa w języku TypeScript z wykorzystaniem frameworka React.

# Struktura danych

System bazodanowy zakład istnienie 3 kolekcji: user, product i order

## User
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