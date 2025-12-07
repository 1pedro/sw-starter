<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'People',
    type: 'object',
    properties: [
        new OA\Property(property: 'name', type: 'string', example: 'Luke Skywalker'),
        new OA\Property(property: 'gender', type: 'string', example: 'male'),
        new OA\Property(property: 'height', type: 'string', example: '172'),
        new OA\Property(property: 'mass', type: 'string', example: '77'),
        new OA\Property(property: 'birth_year', type: 'string', example: '19BBY'),
        new OA\Property(property: 'eye_color', type: 'string', example: 'blue'),
        new OA\Property(property: 'hair_color', type: 'string', example: 'blond'),
        new OA\Property(
            property: 'films',
            type: 'array',
            items: new OA\Items(type: 'string', example: '/api/films/1')
        ),
    ]
)]
final class PeopleSchema
{
}
