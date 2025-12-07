<?php

use App\DTOs\FilmDTO;
use Illuminate\Http\Client\Response as HttpClientResponse;
use GuzzleHttp\Psr7\Response as GuzzleResponse;

it('should place properties on the correct place', function () {
    $data = [
        "title" => "A New Hope",
        "opening_crawl" => "It is a period of civil war...",
        "characters" => [
            "https://www.swapi.tech/api/people/1",
            "https://www.swapi.tech/api/people/2",
        ],
    ];

    $dto = FilmDTO::fromArray($data);

    expect($dto->title)->toBe($data["title"]);
    expect($dto->opening_crawl)->toBe($data["opening_crawl"]);
    expect($dto->characters)->toBe($data["characters"]);
});

it('should build from response', function () {
    $properties = [
        "title" => "The Empire Strikes Back",
        "opening_crawl" => "It is a dark time for the Rebellion...",
        "characters" => [
            "https://www.swapi.tech/api/people/3",
            "https://www.swapi.tech/api/people/4",
        ],
    ];

    $payload = [
        "result" => [
            "properties" => $properties,
        ],
    ];

    $guzzle = new GuzzleResponse(200, ['Content-Type' => 'application/json'], json_encode($payload));
    $response = new HttpClientResponse($guzzle);

    $dto = FilmDTO::fromResponse($response);

    expect($dto->title)->toBe($properties["title"]);
    expect($dto->opening_crawl)->toBe($properties["opening_crawl"]);
    expect($dto->characters)->toBe($properties["characters"]);
});

it('should serialize to array', function () {
    $dto = new FilmDTO(
        title: "Return of the Jedi",
        opening_crawl: "Luke Skywalker has returned to his home planet of Tatooine...",
        characters: [
            "https://www.swapi.tech/api/people/5",
            "https://www.swapi.tech/api/people/6",
        ],
    );

    expect($dto->toArray())->toBe([
        "characters" => $dto->characters,
        "title" => $dto->title,
        "opening_crawl" => $dto->opening_crawl,
    ]);
});

it('should transforms swapi URLs', function () {
    $dto = new FilmDTO(
        title: "The Phantom Menace",
        opening_crawl: "Turmoil has engulfed the Galactic Republic...",
        characters: [
            "https://www.swapi.tech/api/people/7",
            "https://www.swapi.tech/api/people/8",
        ],
    );

    $base = 'http://localhost/api';
    $transformed = $dto->transformURLs($base);

    expect($transformed)->not()->toBe($dto);
    expect($transformed->characters)->toBe([
        "{$base}/api/people/7",
        "{$base}/api/people/8",
    ]);

    expect($dto->characters)->toBe([
        "https://www.swapi.tech/api/people/7",
        "https://www.swapi.tech/api/people/8",
    ]);
});


