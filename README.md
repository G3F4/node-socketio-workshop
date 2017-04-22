# CLIENT MILESTONE#2 SOCKET.IO

## Cele
- Dodanie do projektu klienta socket.io
- Obsługa dołączania do czatu i wysyłania/obierania wiadomości
- Wykorzystanie metody atualizujące struktury immutable

## Kroki

1. Zainstalować `immutability-helper` oraz `socket.io-client`
2. Utworzyć folder `components/Chat` a w nim pliki `index.js`, `Log.jsx` oraz `Input.jsx`
3. W `Input.jsx` tworzymy klasę `Input` z `React.Component`
4. Dodajemy metodę `render`, a w niej definiujemy propsy. Powinny rozszerzalne razem z przesłanymi do komponentu.
5. Wykorzystać element `textbox` z flagami `mouse`, `keys` oraz `inputOnFocus`
6. Nadać `ref` elementowi aby mieć do niego dostęp
7. Skupić element po zamontowaniu komponentu (do elementu dostaniemy się poprzez this.props.ref) poprzez wywołanie metody `focus`
8. Dodać obsługę `onSubmit` elementu. Po wywołaniu wartość z elementu wysyłamy do metody z propsów komponentu(this.props.onSubmit). Zadbać o wyczyszczeie wartości metodą `clearValue` i ponownym skupieniu w polu.
9. Możemy dodać obramowanie poprzez ustawienie atrybytu elementowi `border: { type: 'line' }`
10. Ustawić pozycję poprzez:
````
position: {
    top: 0,
    left: 0,
    height: '100%',
    width: '70%',
},
````
11. style:
style: {
  bg: '#0F0',
  fg: '#0FF',
}
````
12. scrollbar
````
scrollbar: {
    style: {
        bg: '#0F0',
    },
    track: {
        bg: '#00F',
    },
},
````
13. Następnie przechodzimy do pliku `Log.jsx`, a w nim:
14. Tworzymy nową klasę `Log` z `React.Component` i exportujemy jako domyślną
15. Funckja renderująca zwraca element `log`. Propsy tworzymy analogicznie do tych dla komponentu `Input`
16. Element `log` jako nową linię traktuje rozdzielone znakiem nowej lini
17. W pliku `components/Chat/index.js` zaimportuje klasy `Input` i `Chat` a następnie wyexportuje je razem

    module.exports = { Input, Log };

18. Utworzyć plik `socketio.js` a w nim:
19. Zaimportować `socket.io-client`.
20. Utworzyć socket wywołując obiekt io podając adres hosta
21. Zmienną na `token`
22. Funckję nasłuchującą na zdarzenia na sockecie, która jako argument dostaje funkcję do aktualizacji stanu aplikacji
23. Funkcję emitującą zdarzenia i dodającą `token`
24. Wyexportowanie funkcji
25. W `App.jsx` importujemy funkcję pomocniczą z `immutability-helper`, funkcje z `socketio.js` oraz nowe komponenty z `./Chat`
26. Definiujemy `state` komponentu `App`. Powinnien posiadać flagę czy użytkownik jest połączony, wysokość oraz szerokość ekranu odczytaną z obiektu globalnego `screen` oraz tablicę na wiadomości
27. Po zamontowaniu komponent `App` powinnien nasłuchiwać na zmianę rozmiaru okna `screen.on('resize', () => {}` i aktualizować `state`
28. Dodać metodę aktualizujacą stan komponentu przy wykorzystaniu biblioteki `immutability-helper`
29. Dodać do metody renderującej komponentu `Input` oraz `Log`. Dla lepszego pozycjonowania warto dodać element wrapujący
30. Dodać metodę `onSubmit` obsługującą zdarzenie `onSubmit` komponentu `Input`
31. Dodać stan połączenia sprawdzając czy użytkownik się połączył

[Rozwiązanie](https://review.gerrithub.io/358198)
