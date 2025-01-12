<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vezba;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\VezbaResource;
use App\Traits\UploadUtil;
class VezbaController extends Controller
{
    use UploadUtil;
    public function video($id)
    {
        try {
            $fajl = Vezba::findOrFail($id);
            $relativePath = $fajl->putanja;
            $absolutePath = public_path($relativePath);
            if (!File::exists($absolutePath)) {
                return response()->json(['error' => 'Fajl ne postoji'], 404);
            }
    
            return response()->stream(function () use ($absolutePath) {
                readfile($absolutePath);
            }, 200, [
                'Content-Type' => $fajl->tip,
                'Accept-Ranges' => 'bytes',
                'Content-Length' => filesize($absolutePath),
            ]);
        } catch (\Exception $e) {
            Log::error('Greška prilikom učitavanja audio fajla: ' . $e->getMessage());
            return response()->json(['error' => 'Došlo je do greške prilikom učitavanja audio fajla.'], 500);
        }
    }



    public function index()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled vezbi.',
                ], 403); 
            }
            $vezbe = Vezba::all();
            return VezbaResource::collection($vezbe);

        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju vezba.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    
    }


    public function show($id)
    {

        try
        {

            $vezba = Vezba::findOrFail($id);
            return new VezbaResource($vezba);


        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju vezbe.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    

    }


    public function store(Request $request)
    {
        try
        {
            $user = Auth::user();
            if($user->role!='trener'){
                return response()->json([
                    'error' => 'Nemate dozvolu za kreiranje vezbi.',
                ], 403); 
            }


            $validated = $request->validate([
                'naziv' => 'required|string',
                'opis' => 'required|string',
                'misici_na_koje_utice' => 'required|string',
                'savet'=>'required|string',
                'preporuceni_broj_ponavljanja'=>'required|numeric',
                'preporuceni_broj_serija'=>'required|numeric',
                'video' => 'required|mimes:mp4',
                'grupa_misica_id' => 'required|exists:grupe_misica,id',
                'kategorija_id' => 'required|exists:kategorije_vezba,id',
            ]);

            $korisnikId = $user->id;

            $vezba = Vezba::create([
                'naziv'=>$validated['naziv'],
                'opis'=>$validated['opis'],
                'misici_na_koje_utice'=>$validated['misici_na_koje_utice'],
                'savet'=>$validated['savet'],
                'grupa_misica_id'=>$validated['grupa_misica_id'],
                'preporuceni_broj_serija'=>$validated['preporuceni_broj_serija'],
                'preporuceni_broj_ponavljanja'=>$validated['preporuceni_broj_ponavljanja'],
                'trener_id'=>$korisnikId,
                'kategorija_id'=>$validated['kategorija_id'],
                'video_url'=>$this->upload($request->file('video'), $validated['naziv'])
            ]);

            return response()->json([
                'message' => 'Vezba uspešno dodata!',
                'data' => $vezba,
            ], 201);
         
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri cuvanju vezbe.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    

    }


    public function update(Request $request,$id)
    {
        try
        {
            $validated = $request->validate([
                'naziv' => 'required|string',
                'opis' => 'required|string',
                'misici_na_koje_utice' => 'required|string',
                'savet'=>'required|string',
                'video' => 'nullable|mimes:mp4',
                'preporuceni_broj_ponavljanja'=>'required|numeric',
                'preporuceni_broj_serija'=>'required|numeric',
                'grupa_misica_id' => 'required|exists:grupe_misica,id',
                'kategorija_id' => 'required|exists:kategorije_vezba,id',
            ]);



            $vezba = Vezba::findOrFail($id);

          
            $vezba->naziv = $validated['naziv'];
            $vezba->opis = $validated['opis'];
            $vezba->misici_na_koje_utice = $validated['misici_na_koje_utice'];
            $vezba->savet = $validated['savet'];
            $vezba->grupa_misica_id = $validated['grupa_misica_id'];
            $vezba->kategorija_id = $validated['kategorija_id'];
            $vezba->preporuceni_broj_serija = $validated['preporuceni_broj_serija'];
            $vezba->preporuceni_broj_ponavljanja = $validated['preporuceni_broj_ponavljanja'];
    
            
            if ($request->hasFile('video')) {
                if (File::exists($vezba->video_url)) {
                    File::delete($vezba->video_url);
                }
               $vezba->video_url =  $this->upload($request->file('video'), $validated['naziv']);
    
            }
    
           
            $vezba->save();
    
            return response()->json([
                'message' => 'Vezba je uspešno izmenjena!',
                'data' => $vezba
            ], 200);


        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri azuriranju vezbi.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    

    }
}
