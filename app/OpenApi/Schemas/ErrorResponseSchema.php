<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'ErrorResponse',
    type: 'object',
    properties: [
        new OA\Property(
            property: 'errors',
            type: 'object',
            additionalProperties: true,
            description: 'Validation or domain errors keyed by field'
        ),
    ]
)]
final class ErrorResponseSchema
{
}
