# SERVER MILESTONE#2 - EVENTS

## Cele:
- utworzenie bazy danych
- logowanie wiadomości do bazy

## Kroki

0. Zainstalować i zapisać `sqlite` i `sqlite3`
1. Utworzyć folder `db` a w nim pliki `init.js` oraz `api.js`
2. W pliku `init.js` utworzyć automatycznie wywołującą się funkcję, która stworzy tabelę na wiadomości przy wykorzystaniu
`sqlite` w pliku `chat.db`. Zadbaj aby tworzyć tabelę tylko jeśli nie istnieje
3. W pliku `api.js` dodać metodę logującą do bazy wiadomości wysyłane przez użytkowników
5. Wyexportować metodę jak poniżej:

    module.exports = { funcja1 };

6. W pliku `index.js` wywołać inicjalizację bazy danych
7. W pliku `socketio.js` zaimportować metodę logującą i zastosować podczas obsługi zdarzenia wiadomości

[Rozwiązanie](https://review.gerrithub.io/358192)
