<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PlanTreninga;
use App\Models\PlanVezbe;
use App\Http\Resources\PlanTreningaResource;
class PlanTreningaController extends Controller
{

    public function index()
    {

        try
        {
         
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled planova treninga.',
                ], 403); 
            }


            $korisnikId = $user->id;
            $planoviTreninga = PlanTreninga::where('vezbac_id', $korisnikId)
            ->orderBy('datum', 'desc')
            ->paginate(10);
            return PlanTreningaResource::collection($planoviTreninga);
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju plana treninga.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    
    }




    public function show($id)
    {

        try
        {
         
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled plana treniga.',
                ], 403); 
            }


            $korisnikId = $user->id;
            $planTreninga= PlanTreninga::findOrFail($id);
            if($planTreninga->vezbac_id!=$korisnikId){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled plana treniga.',
                ], 403); 
            }
            return new PlanTreningaResource($planTreninga);
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju plana treninga.',
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
                    'error' => 'Nemate dozvolu za kreiranje plana treniga.',
                ], 403); 
            }

            $validated = $request->validate([
                'naziv' => 'required|string',
                'vezbe' => 'required|array',
                'vezbe.*.id' => 'exists:vezbe,id',
                'vezbe.*.broj_serija'=>'required|numeric',
                'vezbe.*.broj_ponavljanja'=>'required|numeric',
            ]);


            $korisnikId = $user->id;

            $planTreninga = PlanTreninga::create([
                'naziv'=>$validated['naziv'],
                'datum'=>now(),
                'vezbac_id'=>$korisnikId,
            ]);

         
            foreach ($validated['vezbe'] as $vezba) {
                PlanVezbe::create([
                    'plan_treninga_id' => $planTreninga->id, 
                    'vezba_id' => $vezba['id'],            
                    'broj_serija' => $vezba['broj_serija'], 
                    'broj_ponavljanja' => $vezba['broj_ponavljanja'], 
                ]);
            }
    

            return response()->json([
                'message' => 'Plan treninga uspešno dodat!',
                'data' => $planTreninga,
            ], 201); 



        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri kreiranju plana treninga.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    
    }
    
}
