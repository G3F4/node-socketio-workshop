# SERVER MILESTONE#5 - AUTHENTICATION

## Cele
- generowanie web tokenów
- autoryzacja komunikacji

## Kroki

1. Zainstaować 'jsonwebtoken' i zapisać jako zależność
2. Dodać `sekret` do stałych do generowania tokenów
3. Stworzyć plik `authenticate.js`, a w nim:
4. Zaimportować `jsonwebtoken` i `sekret`
5. Stworzyć funkcje logującą użytkownika, rejestrującą oraz weryfikującą.
5. Funkcja logujacą powinna sprawdzić czy dany użytkownik istanieje w bazie, czy hasło jest poprawne a następnie wygenerować i zwrócić token
6. Funckja rejestrująca działa analogicznie tylko zamiast sprawdzić czy użytkownik istanieje czy można dodać do bazy użytkownika o danej nazwie
7. Funkcja weryfikacyjna będzie sprawdzać token podany przez użytkownika
8. Wykorzystać powyższe funcje w `socketio.js` do logowania i rejestracji oraz weryfikacji komunikacji autoryzowanej

[Rozwiązanie](https://review.gerrithub.io/358195)

