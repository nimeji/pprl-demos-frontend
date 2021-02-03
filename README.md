# Docker
Eine Docker Version der Anwendung kann mittels
> docker-compose up

erstellt und gestartet werden.

Die API URLs mit denen die Anwendung erstellt wird können in `docker-compose.yml` angepasst werden.

# Development Server
Zur Einrichtung der Entwicklungsumgebung müssen zunächst alle Abhängigkeiten installiert werden.
> cd react \
> npm install

anschließend kann der Development Server gestartet werden
> npm start

Die URLs der APIs werden aus Umgebungsvariablen gelesen und können beispielsweise in einer `.env` Datei gesetzt werden.

`react/.env`
```
REACT_APP_BLOOMFILTER_API = 'https://run.mocky.io/v3/1acd51c3-9f61-4e9a-a235-51986d59d137'
REACT_APP_PPIRL_API = '/api/ppirl'
```