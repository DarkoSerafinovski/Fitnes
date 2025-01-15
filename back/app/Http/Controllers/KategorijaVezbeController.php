<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategorijaVezbe;
use App\Http\Resources\KategorijaVezbeResource;

class KategorijaVezbeController extends Controller
{
    public function index(){
        try
        {
            $kategorije = KategorijaVezbe::all(); 
        return KategorijaVezbeResource::collection($kategorije);
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju kategorija.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    }
}
