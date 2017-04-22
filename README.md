# SERVER MILESTONE#4 - LOGIN

## Cele
- rejestrowanie użytkowników do bazy
- logowanie użytkownikw zapisanych w bazie
- hashowanie haseł i weryfikacja

## Kroki

1. W pliku `db/init.js` dodać tabelę na użytkowników w bazie
2. W pliku `db/api.js` dodać metody do dodawania użytkownika w (nazwa, hasło) oraz pobierania
3. Zadbać o szyfrowanie hasła podczas dodawania oraz sprawdzenie zaszyfrowanego hasła podczas pobierania.
W tym celu wykorzystać `bcrypt` albo `bcrypt-as-promised`(wersja asynchroniczna). Narzędzie zainstalować i zapisać.
4. Dodać stałą użytą podczas szyfrowania do stałych
6. W `socketio.js` dodać obiektowi użytkownika flagą zalogowania
7. Dodać obsługę zdarzeń rejestracji i logowania
8. Wydzielić część wspólną obu zdarzeń
9. Wynieść nowe literały do stałych


[Rozwiązanie](https://review.gerrithub.io/358194)
