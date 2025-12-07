<?php

namespace App\DTOs;

final readonly class SearchDTO
{
    /**
     * @param array<int,mixed> $uid
     */
    public function __construct(
        public string $title,
        public string $uid,
        public string $kind,
    ) {
        //
    }

    /**
     * @return array<mixed,mixed>
     */
    public function toArray(): array
    {
        return [
            "uid" => $this->uid,
            "title" => $this->title,
            "kind" => $this->kind,
        ];
    }
}
