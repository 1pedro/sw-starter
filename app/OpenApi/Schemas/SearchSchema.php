<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'Search',
    type: 'object',
    properties: [
        new OA\Property(property: 'uid', type: 'string', example: '1'),
        new OA\Property(property: 'title', type: 'string', example: 'Luke Skywalker'),
        new OA\Property(property: 'kind', type: 'string', enum: ['people', 'films'], example: 'people'),
    ]
)]
final class SearchSchema
{
}

