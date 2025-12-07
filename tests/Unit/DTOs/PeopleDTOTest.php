<?php

use App\DTOs\PeopleDTO;
use Illuminate\Http\Client\Response as HttpClientResponse;
use GuzzleHttp\Psr7\Response as GuzzleResponse;

it('should place properties on the correct place', function () {
    $data = [
        "name" => "Luke Skywalker",
        "gender" => "male",
        "height" => "172",
        "mass" => "77",
        "birth_year" => "19BBY",
        "eye_color" => "blue",
        "hair_color" => "blond",
        "films" => [
            "https://www.swapi.tech/api/films/1",
            "https://www.swapi.tech/api/films/2",
        ],
    ];

    $dto = PeopleDTO::fromArray($data);

    expect($dto->name)->toBe($data["name"]);
    expect($dto->gender)->toBe($data["gender"]);
    expect($dto->height)->toBe($data["height"]);
    expect($dto->mass)->toBe($data["mass"]);
    expect($dto->birth_year)->toBe($data["birth_year"]);
    expect($dto->eye_color)->toBe($data["eye_color"]);
    expect($dto->hair_color)->toBe($data["hair_color"]);
    expect($dto->films)->toBe($data["films"]);
});

it('should build from response', function () {
    $properties = [
        "name" => "Leia Organa",
        "gender" => "female",
        "height" => "150",
        "mass" => "49",
        "birth_year" => "19BBY",
        "eye_color" => "brown",
        "hair_color" => "brown",
        "films" => [
            "https://www.swapi.tech/api/films/1",
            "https://www.swapi.tech/api/films/2",
            "https://www.swapi.tech/api/films/3",
        ],
    ];

    $payload = [
        "result" => [
            "properties" => $properties,
        ],
    ];

    $guzzle = new GuzzleResponse(200, ['Content-Type' => 'application/json'], json_encode($payload));
    $response = new HttpClientResponse($guzzle);

    $dto = PeopleDTO::fromResponse($response);

    expect($dto->name)->toBe($properties["name"]);
    expect($dto->gender)->toBe($properties["gender"]);
    expect($dto->height)->toBe($properties["height"]);
    expect($dto->mass)->toBe($properties["mass"]);
    expect($dto->birth_year)->toBe($properties["birth_year"]);
    expect($dto->eye_color)->toBe($properties["eye_color"]);
    expect($dto->hair_color)->toBe($properties["hair_color"]);
    expect($dto->films)->toBe($properties["films"]);
});

it('should serialize to array', function () {
    $dto = new PeopleDTO(
        name: "Han Solo",
        gender: "male",
        height: "180",
        mass: "80",
        birth_year: "29BBY",
        eye_color: "brown",
        hair_color: "brown",
        films: [
            "https://www.swapi.tech/api/films/1",
        ],
    );

    expect($dto->toArray())->toBe([
        "films" => $dto->films,
        "gender" => $dto->gender,
        "height"  => $dto->height,
        "name" => $dto->name,
        "mass" => $dto->mass,
        "birth_year" => $dto->birth_year,
        "hair_color" => $dto->hair_color,
        "eye_color" => $dto->eye_color,
    ]);
});

it('should transforms swapi URLs', function () {
    $dto = new PeopleDTO(
        name: "Obi-Wan Kenobi",
        gender: "male",
        height: "182",
        mass: "77",
        birth_year: "57BBY",
        eye_color: "blue-gray",
        hair_color: "auburn, white",
        films: [
            "https://www.swapi.tech/api/films/1",
            "https://www.swapi.tech/api/films/2",
        ],
    );

    $base = 'http://localhost/api';
    $transformed = $dto->transformURLs($base);

    expect($transformed)->not()->toBe($dto);
    expect($transformed->films)->toBe([
        "{$base}/api/films/1",
        "{$base}/api/films/2",
    ]);


    expect($dto->films)->toBe([
        "https://www.swapi.tech/api/films/1",
        "https://www.swapi.tech/api/films/2",
    ]);
});


