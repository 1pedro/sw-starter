<?php

namespace App\Services;

use App\DTOs\FilmDTO;
use App\DTOs\PeopleDTO;
use App\DTOs\SearchDTO;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SwapiClient
{
    protected string $baseUrl;
    protected int $ttl;

    public function __construct()
    {
        $this->baseUrl = config('services.swapi.baseUrl', env('SWAPI_BASE_URL', 'https://www.swapi.tech/api/'));
        $this->ttl = config('services.swapi.ttl', env('SWAPI_CACHE_TTL', 3600));
    }
    /**
     * @param array<int,mixed> $data
     */
    private function toDTO(string $kind, array $data): mixed
    {
        $properties = isset($data["result"]) ? $data["result"]["properties"] : $data["properties"];
        return match ($kind) {
            "people" => PeopleDTO::fromArray($properties),
            "films" => FilmDTO::fromArray($properties),
        };
    }
    /**
     * @return mixed
     */
    public function cacheOrGet(string $kind, string|int $id): PeopleDTO|FilmDTO
    {
        $key = "{$kind}/{$id}";

        if ($cached = Cache::get($key)) {
            Log::info("####### [Cache Hit] #######");

            return $this->toDTO(
                $kind,
                $cached
            );
        }

        Log::info("####### [Cache Miss] #######");
        $response = Http::baseUrl($this->baseUrl)
            ->get("$kind/$id")
            ->json();

        $data = $this->toDTO(
            $kind,
            $response
        );

        Cache::put($key, $response, $this->ttl);

        return $data;
    }
    /**
     * @return array
     */
    public function search(string $kind, string $content): Collection
    {
        $query = match ($kind) {
            "people" => ["name" => $content],
            "films" => ["title" => $content]
        };

        $response = Http::baseUrl($this->baseUrl)
            ->get($kind, $query)
            ->json();

        $data = collect($response["result"])->map(function ($result) use ($kind) {
            $properties = $result["properties"];

            return new SearchDTO($properties["name"] ?? $properties["title"], $result["uid"], $kind);
        });

        return $data;
    }
}
