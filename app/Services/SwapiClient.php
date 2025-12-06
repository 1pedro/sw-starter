<?php

namespace App\Services;

use App\DTOs\FilmDTO;
use App\DTOs\PeopleDTO;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SwapiClient
{
    protected string $baseUrl;
    protected int $ttl;

    public function __construct()
    {
        $this->baseUrl = config('services.swapi.baseUrl', env('SWAPI_CACHE_TTL', 'https://www.swapi.tech/api/'));
        $this->ttl = config('services.swapi.ttl', env('SWAPI_CACHE_TTL', 3600));
    }
    /**
     * @param array<int,mixed> $data
     */
    private function toDTO(string $kind, array $data): mixed
    {
        $properties = $data["result"]["properties"];
        return match (true) {
            $kind === "people" => PeopleDTO::fromArray($properties),
            $kind === "films" => FilmDTO::fromArray($properties),
            default => []
        };
    }
    /**
     * @return mixed
     */
    public function cacheOrGet(string $kind, string|int $id): FilmDTO|PeopleDTO|array
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

        return $data->toArray();
    }
    /**
     * @return array
     */
    public function search(string $kind, string $content): array
    {
        if ($kind === "people") {
            return Http::baseUrl($this->baseUrl)
                ->get($kind, ["name" => $content])
                ->json();
        }

        return Http::baseUrl($this->baseUrl)
            ->get($kind, ["title" => $content])
            ->json();
    }
}
