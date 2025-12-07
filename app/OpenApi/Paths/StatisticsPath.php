<?php

namespace App\OpenApi\Paths;

use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Statistics', description: 'Statistics endpoints')]
#[OA\Get(
    path: '/statistics',
    summary: 'Get application statistics',
    tags: ['Statistics'],
    responses: [
        new OA\Response(
            response: 200,
            description: 'OK',
            content: new OA\JsonContent(type: 'object')
        )
    ]
)]
final class StatisticsPath
{
}
