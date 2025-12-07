## Sequence Diagrams

- Routes (API):
  - `GET /api/search/{kind}?query=...` → `StarWarsController@search` (name: `search`) via `CollectStatistics`
  - `GET /api/{kind}/{id}` → `StarWarsController@getById` (name: `getById`) via `CollectStatistics`

### GET /api/search/{kind}?query=...

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant R as Router (/api/search/{kind})
    participant M as Middleware: CollectStatistics
    participant Ctrl as StarWarsController
    participant S as SwapiClient
    participant H as External SWAPI
    participant DB as Sqlite DB: statistic_logs

    Note over C: Request: GET /api/search/{kind}?query=...
    C->>R: HTTP Request
    R->>M: Enter middleware
    M->>Ctrl: next(request)
    Ctrl->>S: search(kind, query)
    S->>H: GET {baseUrl}/{kind}?name|title=query
    H-->>S: JSON (results)
    S-->>Ctrl: Collection<SearchDTO>
    Ctrl-->>M: JSON response

    M-->>C: HTTP Response

    Note over M: After response is produced
    M->>DB: Save statistic Info
```

### GET /api/{kind}/{id}

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant R as Router (/api/{kind}/{id})
    participant M as Middleware: CollectStatistics
    participant Ctrl as StarWarsController
    participant S as SwapiClient
    participant Cache as Cache
    participant H as External SWAPI
    participant DB as Sqlite DB: statistic_logs

    Note over C: Request: GET /api/{kind}/{id}
    C->>R: HTTP Request
    R->>M: Enter middleware
    M->>Ctrl: next(request)
    Ctrl->>S: cacheOrGet(kind, id)
    S->>Cache: GET key="{kind}/{id}"
    alt Cache hit
        Cache-->>S: Cached JSON
        S-->>Ctrl: DTO (PeopleDTO|FilmDTO) from cached data
    else Cache miss
        Cache-->>S: null
        S->>H: GET {baseUrl}/{kind}/{id}
        H-->>S: JSON (entity)
        S->>Cache: PUT key, value, ttl
        S-->>Ctrl: DTO (PeopleDTO|FilmDTO)
    end
    Note over Ctrl: DTO.transformURLs(baseUrl = env("APP_URL"))
    Ctrl-->>M: JSON response (DTO with internal URLs rewritten)

    M-->>C: HTTP Response

    Note over M: After response is produced
    M->>DB: Save statistic Info
```


