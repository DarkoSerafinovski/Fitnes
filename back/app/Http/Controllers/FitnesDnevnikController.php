<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FitnesDnevnik;
use App\Models\StavkaDnevnika;
use App\Http\Resources\FitnesDnevnikResource;
use App\Traits\UploadUtil;
class FitnesDnevnikController extends Controller
{
    use UploadUtil;
    public function show($id){
        try{

            $user = Auth::user();
            $dnevnik=FitnesDnevnik::find($id);

            if($dnevnik==null)
            {
                return response()->json([
                'error' => 'Dnevnik sa prosledjenim id-em ne postoji.',
            ], 404);
        }
            
            if($user->role!='vezbac' || $user->id!=$dnevnik->vezbac_id){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled dnevnika.',
                ], 403); 
            }

           
            return new FitnesDnevnikResource($dnevnik);

             
        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju dnevnika.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    }



    public function store(Request $request)
    {
        try
        {


            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za kreiranje dnevnika.',
                ], 403); 
            }


            

            $validated = $request->validate([
                'kratak_opis' => 'required|string',
                'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
            ]);

            $korisnikId = $user->id;

            $dnevnik = FitnesDnevnik::create([
                'kratak_opis'=>$validated['kratak_opis'],
                'vezbac_id'=>$korisnikId,
                'slika'=>$this->upload($request->file('slika'),  'dnevnik_'.now()->toDateTimeString())
            ]);


            return response()->json([
                'message' => 'Dnevnik uspešno dodat!',
                'data' => $dnevnik,
            ], 201); 

        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju cuvanju dnevnika.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    }







    public function dodajStavku(Request $request,$id)
    {
        try
        {

            $user = Auth::user();
            $dnevnik=FitnesDnevnik::find($id);
            if($dnevnik==null)
            {
                return response()->json([
                'error' => 'Dnevnik sa prosledjenim id-em ne postoji.',
            ], 404);
        }

        if($user->role!='vezbac' || $user->id!=$dnevnik->vezbac_id){
            return response()->json([
                'error' => 'Nemate dozvolu za kreiranje stavke dnevnika.',
            ], 403); 
        }

            

            $validated = $request->validate([
                'naziv_aktivnosti' => 'required|string',
                'komentar' => 'required|string', 
            ]);

          

            $stavka = StavkaDnevnika::create([
                'dnevnik_id'=>$id,
                'datum'=>now(),
                'naziv_aktivnosti'=>$validated['naziv_aktivnosti'],
                'komentar'=>$validated['komentar'],
            ]);


            return response()->json([
                'message' => 'Stavka dnevnika uspešno dodata!',
                'data' => $stavka,
            ], 201); 

        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju cuvanju dnevnika.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    }
    
}
