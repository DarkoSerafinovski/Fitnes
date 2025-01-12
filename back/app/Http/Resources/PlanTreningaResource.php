<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanTreningaResource extends JsonResource
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
            'naziv' => $this->naziv,
            'datum'=>$this->datum->toDateTimeString(),
            'planovi_vezbi' => PlanVezbeResource::collection($this->planoviVezbi),
        ];
    }
}
