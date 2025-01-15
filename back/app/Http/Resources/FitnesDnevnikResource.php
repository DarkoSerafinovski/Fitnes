<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FitnesDnevnikResource extends JsonResource
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
            'naslov'=>$this->naslov,
            'kratak_opis' => $this->kratak_opis,
            'stavke_dnevnika'=>StavkaDnevnikaResource::collection($this->stavkeDnevnika),
        ];
    }
}
