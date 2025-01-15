<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VezbaResource extends JsonResource
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
            'opis' => $this->opis,
            'slika'=>asset($this->slika),
            'misici_na_koje_utice'=>$this->misici_na_koje_utice,
            'savet'=>$this->savet,
            'preporuceni_broj_serija'=>$this->preporuceni_broj_serija,
            'preporuceni_broj_ponavljanja'=>$this->preporuceni_broj_ponavljanja,
            'video_url' => route('vezba.video', ['id' => $this->id]),
            'kategorija'=>new KategorijaVezbeResource($this->kategorija),
        ];
    }
}
