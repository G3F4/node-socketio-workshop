# CLIENT MILESTONE#3 EVENTS

## Cele
- Obsługa zmiany nazwy
- Obsługa zmiany pokoju
- Prywatne wiadomości

## Kroki

1. Dodanie do stanu komponentu `App` pokoju i nazwy użytkownika
2. Dodanie do kompenentu `Log` atrubutu `label` składającego się z nazwy użytkownika oraz pokoju
3. Rozróżnienie wartości w metodzie `onSubmit` klasy `App` tak aby w zależności od wartości wysyłać odpowiednie zdarzenia do serwera z odpowiednią wartością
4. Dodać do `socketio.js` nasłuchiwania na zdarzenia zmiany nazwy, pokoju i prywantnej wiadomości oraz stosowne update'y stanu

[Rozwiązanie](https://review.gerrithub.io/358199)
