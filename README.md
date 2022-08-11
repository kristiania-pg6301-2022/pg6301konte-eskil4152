# PG6301 eksamen <tittel på løsningen>

[Heroku](https://pg6301-kont.herokuapp.com) <br>
[Test rapport](link til testrapport) <br>
[Github](https://github.com/kristiania-pg6301-2022/pg6301konte-eskil4152)

## Tips

* Bruk versjoner av alle dependencies som vi brukte på forelesningene. Det skjer hele tiden endringer i JavaScript-land og noen ganger vil siste versjon oppføre seg forskjellig - ikke kast bort verdifull eksamenstid. Du kan kopiere package.json fra innlevering eller en øving
* Spesielt: React 18 kom i løpet av semesteret. Alt vi har vist er på React 17. Kjør på React 17 nå med mindre du har brukt en del tid på versjon 18 den siste måneden. Det er vesentlige problemer!
* Start med å løse det kritiske: Deployment til Heroku
* Ikke bli sittende med ting du ikke får til mens det er enklere ting du kunne ha gjort. Spesielt tester har overraskende mye vrient med seg. Legg det til siden og løs andre ting om du har problemer
* Les de funksjonelle kravene grundig og test at løsningen din oppfyller dem
* Les læringsmålene beskrevet i eksamensteksten grundig og sjekk at løsningen din demonstrere at du behersker disse

Dette er versjonene vi brukte under forelesningene om som er validert som ok:

```
"jest": "^27.5.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^6.2.2"
```


## Egenutfylling av funksjonelle krav

* [ ] Anonyme brukere skal ikke se chat-loggen
  * Fikk ikke til å begrense brukere
* [x] Brukere kan logge inn
* [x] Brukere har en profilside
* [x] Brukere skal kunne sende chat-meldinger
* [x] Meldinger skal lagres på mongodb
* [x] Meldinger skal komme opp umiddelbart
* [x] Chatmeldinger skal inneholde navnet på brukeren
* [x] Når brukeren logges inn skal eksisterende meldinger hentes
* [ ] Flere chatrom
* [x] Kan endre bio og se andres profil
* [x] Brukere forblir innlogget om de refresher siden
* [x] Feil skal presenteres på en fin måte

## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
* [x] React Router
* [x] Express app
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
* [x] Deployment til Heroku
* [x] Bruk av MongoDB
* [x] OpenID Connect
* [x] Web Sockets
* [ ] Jest med dokumentert testdekning
 
