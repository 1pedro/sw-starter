<?php

namespace App\DTOs;

use Illuminate\Http\Client\Response;

final readonly class FilmDTO
{
    /**
     * @param array<int,mixed> $characters
     */
    public function __construct(
        public string $title,
        public string $opening_crawl,
        public array $characters
    ) {
        //
    }
    /**
     * @param array<int,mixed> $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            title: $data["title"],
            opening_crawl: $data["opening_crawl"],
            characters: $data["characters"]
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
            "characters" => $this->characters,
            "title" => $this->title,
            "opening_crawl" => $this->opening_crawl,
        ];
    }


    public function transformURLs(string $baseURL): self
    {
        $characters = collect($this->characters)->map(function ($url) use ($baseURL) {
            return str_replace('https://www.swapi.tech', $baseURL, $url);
        })->toArray();

        return new self(
            title: $this->title,
            opening_crawl: $this->opening_crawl,
            characters: $characters,
        );
    }
}
