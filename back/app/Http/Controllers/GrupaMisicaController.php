<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\GrupaMisica;
use App\Http\Resources\GrupaMisicaResource;
use App\Traits\UploadUtil;
class GrupaMisicaController extends Controller
{

    use UploadUtil;

    public function store(Request $request)
    {
        try
        {
            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'Nemate dozvolu za kreiranje grupe misica.',
                ], 403); 
            }

            $validated = $request->validate([
                'naziv' => 'required|string',
                'opis'=>'required|string',
                'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
            ]);

            $korisnikId = $user->id;

            $grupaMisica = GrupaMisica::create([
                'naziv'=>$validated['naziv'],
                'opis'=>$validated['opis'],
                'slika'=>$this->upload($request->file('slika'), $validated['naziv'])
            ]);

            return response()->json([
                'message' => 'Grupa misica uspešno dodat!',
                'data' => $grupaMisica,
            ], 201); 

        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri kreiranju grupe misica.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }


    public function index(){
        try
        {
            $grupeMisica = GrupaMisica::all(); 
        return GrupaMisicaResource::collection($grupeMisica);
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju grupa misica.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }


    public function show(Request $request, $id)
{
    try {
       
        $validated = $request->validate([
            'kategorija_id' => 'nullable|exists:kategorije_vezba,id',
        ]);

       
        $grupaMisica = GrupaMisica::findOrFail($id);

      
        $kategorijaId = $request->kategorija_id;

       
        if ($kategorijaId) {
            $grupaMisica->setRelation(
                'vezbe',
                $grupaMisica->vezbe()->where('kategorija_id', $kategorijaId)->get()
            );
        }

       
        return new GrupaMisicaResource($grupaMisica);
    } catch (\Exception $e) {
        
        return response()->json([
            'success' => false,
            'message' => 'Došlo je do greške pri učitavanju grupe mišića.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}
