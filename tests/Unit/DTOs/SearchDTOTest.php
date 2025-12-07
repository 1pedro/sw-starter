<?php

use App\DTOs\SearchDTO;

it('should serialize to array', function () {
    $dto = new SearchDTO(
        title: "Luke Skywalker",
        uid: "1",
        kind: "people",
    );

    expect($dto->toArray())->toBe([
        "uid" => "1",
        "title" => "Luke Skywalker",
        "kind" => "people",
    ]);
});


