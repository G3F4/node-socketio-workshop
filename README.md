# CLIENT MILESTONE#4 USERS AND ROOMS

## Cele
- Wyświetlenie listy użytkowników
- Wysłanie wiadomości prywatnej po kliknięciu na nazwę użytkownika
- Wyświetlenie listy pokoi
- Zmiana pokoju po klinięciu w pokój na liście

## Kroki

1. Dodać pliki `components/List.jsx`, `components/Chat/Rooms.jsx` oraz `components/Chat/Users`
2. W pliku `List.jsx` dodać nowy komponent renderujący element 'list'. Zdefiniuj propy `alwaysScroll`, `scrollable`, `mouse` oraz `items` (tablica stringów)
3. Następnie na podstawie klasy `List` dodać klasy `Rooms` i `Users`, różniące się `label`ką oraz położeniem
4. Dodac importy/exporty dodać `components/Chat/index.js`
5. W `App.jsx` dodać do stanu pokoje i użytkowników a następnie,
6. Zaimportować oraz wykorzystać `Users` oraz `Rooms` przekazując odpowiednie dane ze `state`

[Rozwiązanie](https://review.gerrithub.io/358201)
