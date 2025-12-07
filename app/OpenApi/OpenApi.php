<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(version: '1.0.0', title: 'Star Wars API')]
#[OA\Server(url: '/api', description: 'API base URL')]
final class OpenApi
{
}


