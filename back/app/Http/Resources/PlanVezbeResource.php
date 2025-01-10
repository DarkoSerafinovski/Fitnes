<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanVezbeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vezba' => new VezbaResource($this->vezba),
            'broj_serija' => $this->broj_serija,
            'broj_ponavljanja' => $this->broj_ponavljanja,
        ];
    }
}
