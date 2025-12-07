<?php

use App\DTOs\FilmDTO;
use App\DTOs\PeopleDTO;
use App\Services\SwapiClient;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

uses(TestCase::class);

describe('SwapiClient', function () {
    beforeEach(function () {
        config()->set('services.swapi.baseUrl', 'https://example.swapi/api/');
        config()->set('services.swapi.ttl', 123);
        Cache::flush();
    });

    it('should request via HTTP on cache miss, caches it, then uses cache on next call', function () {
        Cache::forget('people/1');

        $httpResponse = [
            'result' => [
                'properties' => [
                    'randomProperty' => 'randomValue', // this should not be present on the output
                    'name' => 'Luke Skywalker',
                    'gender' => 'male',
                    'height' => '172',
                    'mass' => '77',
                    'birth_year' => '19BBY',
                    'eye_color' => 'blue',
                    'hair_color' => 'blond',
                    'films' => [
                        'https://www.swapi.tech/api/films/1',
                    ],
                ],
            ],
        ];

        Http::fake(['*' => Http::response(json_encode($httpResponse), 200, ['Content-Type' => 'application/json'])]);

        $client = new SwapiClient();
        $dto1 = $client->cacheOrGet('people', '1');

        expect($dto1)->toBeInstanceOf(PeopleDTO::class);
        expect($dto1->name)->toBe('Luke Skywalker');
        expect($dto1->films)->toHaveCount(1);
        expect(Cache::get('people/1'))->toBe($httpResponse);

        Http::assertSentCount(1);
        Http::assertSent(function ($request) {
            return $request->method() === 'GET'
                && $request->url() === 'https://example.swapi/api/people/1';
        });


        Http::fake(); 
        $dto2 = $client->cacheOrGet('people', '1');
        expect($dto2)->toBeInstanceOf(PeopleDTO::class);
        expect($dto2->name)->toBe('Luke Skywalker');
        Http::assertNothingSent();
    });

    it('should return only used data from search', function () {
        $searchResponse = [
            'result' => [
                [
                    'randomProperty' => 'randomValue', 
                    'uid' => '1',
                    'properties' => [
                        'name' => 'Luke Skywalker',
                    ],
                ],
                [
                    'randomProperty' => 'randomValue',
                    'uid' => '2',
                    'properties' => [
                        'name' => 'Leia Organa',
                    ],
                ],
            ],
        ];

        Http::fake(['*' => Http::response(json_encode($searchResponse), 200, ['Content-Type' => 'application/json'])]);

        $client = new SwapiClient();
        $results = $client->search('people', 'Luke');

        expect($results)->toBeInstanceOf(Collection::class);
        expect($results)->toHaveCount(2);


        $first = $results->first();
        expect($first->uid)->toBe('1');
        expect($first->title)->toBe('Luke Skywalker');
        expect($first->kind)->toBe('people');

        Http::assertSent(function ($request) {
            return $request->method() === 'GET'
                && $request->url() === 'https://example.swapi/api/people?name=Luke';
        });
    });

    it('supports films kind for cache and mapping', function () {
        $httpResponse = [
            'result' => [
                'properties' => [
                    'randomProperty' => 'randomValue',
                    'title' => 'A New Hope',
                    'opening_crawl' => 'It is a period of civil war...',
                    'characters' => [
                        'https://www.swapi.tech/api/people/1',
                        'https://www.swapi.tech/api/people/2',
                    ],
                ],
            ],
        ];

        Cache::forget('films/1');

        Http::fake(['*' => Http::response(json_encode($httpResponse), 200, ['Content-Type' => 'application/json'])]);

        $client = new SwapiClient();
        $dto = $client->cacheOrGet('films', 1);

        expect($dto)->toBeInstanceOf(FilmDTO::class);
        expect($dto->title)->toBe('A New Hope');
        expect($dto->characters)->toHaveCount(2);
        expect(Cache::get('films/1'))->toBe($httpResponse);

        Http::assertSent(function ($request) {
            return $request->url() === 'https://example.swapi/api/films/1';
        });
    });
});


