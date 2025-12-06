<?php

namespace App\DTOs;

use Illuminate\Http\Client\Response;

final readonly class PeopleDTO
{
    /**
     * @param array<int,mixed> $films
     */
    public function __construct(
        public string $name,
        public string $gender,
        public string $height,
        public string $mass,
        public string $birth_year,
        public string $eye_color,
        public string $hair_color,
        public array $films
    ) {
        //
    }
    /**
     * @param array<int,mixed> $data
     */
    public static function fromArray(array $data): self
    {

        return new self(
            name: $data["name"],
            gender: $data["gender"],
            height: $data["height"],
            mass: $data["mass"],
            birth_year: $data["birth_year"],
            eye_color: $data["eye_color"],
            hair_color: $data["hair_color"],
            films: $data["films"]
        );
    }

    public static function fromResponse(Response $response): self
    {
        $data = $response->json();
        return self::fromArray($data["result"]["properties"]);
    }
    /**
     * @return array<mixed,mixed>
     */
    public function toArray(): array
    {
        return [
            "films" => $this->films,
            "gender" => $this->gender,
            "height"  => $this->height,
            "name" => $this->name,
            "mass" => $this->mass,
            "birth_year" => $this->birth_year,
            "hair_color" => $this->hair_color,
            "eye_color" => $this->eye_color,
        ];
    }

    public function transformURLs(string $baseURL): self
    {
        $urls = collect($this->films)->map(function ($url) use ($baseURL) {
            return str_replace('https://www.swapi.tech', $baseURL, $url);
        })->toArray();

        return new self(
            name: $this->name,
            gender: $this->gender,
            height: $this->height,
            mass: $this->mass,
            birth_year: $this->birth_year,
            eye_color: $this->eye_color,
            hair_color: $this->hair_color,
            films: $urls
        );
    }
}
