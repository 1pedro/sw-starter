<?php

namespace App\Http\Controllers;

use App\Services\SwapiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StarWarsController extends Controller
{
    protected SwapiClient $swapi;

    public function __construct(SwapiClient $swapi)
    {
        $this->swapi = $swapi;
    }

    private function isValidKind(string $kind): bool
    {
        return $kind === "people" || $kind === "films";
    }

    public function search(Request $request, string $kind): JsonResponse
    {
        if (!$this->isValidKind($kind)) {
            return new JsonResponse(["errors" => ['kind' => ["invalid"]]]);
        }

        $query = $request->query("query");
        if (!$query) {
            return new JsonResponse(["errors" => ['query' => ["not provided"]]]);
        }
        $data = $this->swapi->search($kind, $query);

        return response()->json($data);
    }

    public function getById(Request $request, string $kind, int $id): JsonResponse
    {
        if (!$this->isValidKind($kind)) {
            return new JsonResponse(["errors" => ['kind' => ["invalid"]]]);
        }

        $data = $this->swapi->cacheOrGet($kind, $id);

        return response()->json($data);
    }
}
