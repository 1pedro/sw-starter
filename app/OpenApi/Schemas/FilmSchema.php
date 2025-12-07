<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'Film',
    type: 'object',
    properties: [
        new OA\Property(property: 'title', type: 'string', example: 'A New Hope'),
        new OA\Property(property: 'opening_crawl', type: 'string', example: 'It is a period of civil war...'),
        new OA\Property(
            property: 'characters',
            type: 'array',
            items: new OA\Items(type: 'string', example: '/api/people/1')
        ),
    ]
)]
final class FilmSchema
{
}

