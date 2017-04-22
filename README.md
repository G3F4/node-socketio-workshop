# SERVER MILESTONE#1 - SOCKET.IO

## Cele:
- Dodanie do projektu `socket.io`
- Utworzenie nowego pliku na logikę związaną z obsługą socketów
- Utworzenie nowego pliku na stałe
- Obsługa połączenia z klientem
- Dołączenie do domyślengo pokoju
- Emitowanie wiadomości w domyślnym pokoju

## Kroki

1. Utworzyć pliki `constans.js` oraz `socketio.js`
2. W pliku `index.js` importujemy plik `socketio.js`. Jako że będzie exportował funkcję, wywołujemy ją
z przekazanym serwerem
3. Następnie w pliku `socketio.js` importujemy `socket.io`
4. Tworzymy funkcję, która jako argument czeka na serwer i exportujemy jak poniżej:
    module.exports = server => { ... };

5. Funkcja po wywołaniu tworzy obiekt instacji biblioteki `socket.io`. Jako argument przekazujemy serwer
6. Utworzenie zmiennej na licznę połączenień, użytkowników
7. Utworzony obiekt jest EventEmiterem. Nasłuchujemy więc na zdarzenie `connection`
8. Podczas połączenia funckja zwrotna eventu `connection` dostaje socket. Socket będzie nasłuchiwał na zdarzenia klienta
9. Wewnętrz funckji zwrotnej zdarzenia `connection`, definiujemy obiekt reprezentujący użytkownika połączonego do aplikacji.
Obiekt będzie przechowywał id socketa, pokój w jakim jest użytkwnik oraz jego nazwę. Początkowo nazwa użytkownika może być losowa
10. Obsługa nowe połączenie, dodajemy nowege użytkownika, zwiększamy ilość połączeń
11. Dołączenie użytkownika do pokoju
12. Obsługa rozłączenia socketa
13. Obsługa nadchodzącej wiadomości z socketa
14. Wyniesienie litarałów do pliku ze stałymi

[Rozwiązanie](https://review.gerrithub.io/358190)
