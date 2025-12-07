<?php

use App\DTOs\PeopleDTO;
use App\DTOs\SearchDTO;
use App\Services\SwapiClient;
use Illuminate\Support\Collection;

it('should return error when invalid kind is provided', function () {
	$this->getJson('/api/search/ships?query=X')
		->assertOk()
		->assertJson([
			'errors' => [
				'kind' => ['invalid'],
			],
		]);
});

it(' should return error when query param not provided', function () {
	$this->getJson('/api/search/people')
		->assertOk()
		->assertJson([
			'errors' => [
				'query' => ['not provided'],
			],
		]);
});

it('returns search results for people', function () {
	$mock = new class() extends SwapiClient {
		public function search(string $kind, string $content): Collection
		{
			return collect([
				new SearchDTO('Luke Skywalker', '1', 'people'),
				new SearchDTO('Leia Organa', '2', 'people'),
			]);
		}
	};
	app()->instance(SwapiClient::class, $mock);

	$this->getJson('/api/search/people?query=Luke')
		->assertOk()
		->assertJsonCount(2)
		->assertJson([
			[
				'title' => 'Luke Skywalker',
				'uid' => '1',
				'kind' => 'people',
			],
			[
				'title' => 'Leia Organa',
				'uid' => '2',
				'kind' => 'people',
			],
		]);
});

it('returns error for invalid kind on getById', function () {
	$this->getJson('/api/ships/1')
		->assertOk()
		->assertJson([
			'errors' => [
				'kind' => ['invalid'],
			],
		]);
});

it('returns person by id and transforms film URLs', function () {
	putenv('APP_URL=http://localhost');

	$dto = new PeopleDTO(
		name: 'Luke Skywalker',
		gender: 'male',
		height: '172',
		mass: '77',
		birth_year: '19BBY',
		eye_color: 'blue',
		hair_color: 'blond',
		films: [
			'https://www.swapi.tech/api/films/1',
			'https://www.swapi.tech/api/films/2',
		],
	);

	$mock = new class($dto) extends SwapiClient {
		public function __construct(private PeopleDTO $dto) {}
		public function cacheOrGet(string $kind, string|int $id): PeopleDTO
		{
			return $this->dto;
		}
	};
	app()->instance(SwapiClient::class, $mock);

	$this->getJson('/api/people/1')
		->assertOk()
		->assertJson([
			'name' => 'Luke Skywalker',
			'films' => [
				'http://localhost/api/films/1',
				'http://localhost/api/films/2',
			],
		]);
});

it('returns 500 with error payload when SWAPI fails on search', function () {
	$mock = new class() extends SwapiClient {
		public function search(string $kind, string $content): Collection
		{
			throw new \Exception('Failed to get data from SWAPI');
		}
	};
	app()->instance(SwapiClient::class, $mock);

	$this->getJson('/api/search/people?query=Luke')
		->assertStatus(500)
		->assertJson([
			'errors' => ['Failed to get data from SWAPI'],
		]);
});

it('returns 500 with error payload when SWAPI fails on getById', function () {
	$mock = new class() extends SwapiClient {
		public function cacheOrGet(string $kind, string|int $id): PeopleDTO
		{
			throw new \Exception('Failed to get data from SWAPI');
		}
	};
	app()->instance(SwapiClient::class, $mock);

	$this->getJson('/api/people/1')
		->assertStatus(500)
		->assertJson([
			'errors' => ['Failed to get data from SWAPI'],
		]);
});
