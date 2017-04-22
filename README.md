# CLIENT MILESTONE#1 REACT-BLESSED

## Cele
- Dodanie do projektu `blessed`, `react` i `react-blessed`
- Wykorzystanie powyższych bibliotek do zamiany terminala w ekran do tworzenia UI

## Kroki

1. Zainstalowac `blessed`, `react` i `react-blessed` i zapisać jako zależności
2. Utworzyć folder `components` a w nim plik `App.jsx`
3. W pliku `App.jsx`
Importujemy `react`.
Definiujemy i exportujemy domyślnie klasę App dziedziczocą po klasie `Component` z `react`
Implementacja metody render zwrcającej element `box` z wiadomością testową
4. w pliku `index.js` kasujemy kod testowy es6 a następnie importujemy `blesed`, `react`, `react-blessed` oraz nasz komponent
5. Tworzymy ekran jak poniżej:
````
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  useBCE: true,
  cursor: {
      artificial: true,
      blink: true,
      shape: 'underline'
  },
  title: 'ChatClient',
  debug: true,
  log: `${__dirname}/application.log`,
});
````

6. Blokujemy konsolę aby nie zamalowywać terminala
7. Dodać obiekt screen jako globalny do umożliwienia wywoływania w kodzie konsoli aplikacji `blessed` poprzez naciśnięcie  F12.
8. Na obiekcie okna włączamy nasłuchiwanie na wciśnięcie wybranego klawisza poprzez wywołanie metody `key` na obiekcie okna w argumencie przekazując tablicę znakow dla których zostanie wykonana funckcja zwrotna. W odpowiedzi ubijamy proces
9. renderujemy nasz komponent przy wykorzystaniu funkcji `render` z biblioteki `react-blessed` do wcześniej stworzonego ekranu jak poniżej:
````
render(<App />, screen);
````

[Rozwiązanie](https://review.gerrithub.io/358197)
