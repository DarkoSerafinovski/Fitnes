<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FitnesDnevnik;
use App\Http\Resources\FitnesDnevnikResource;
use App\Http\Resources\UserResource;
use App\Models\User;
class UserController extends Controller
{
    public function dnevnici()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled dnevnika.',
                ], 403); 
            }

            $korisnikId = $user->id;
            $dnevnici = FitnesDnevnik::where('vezbac_id', $korisnikId)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            return FitnesDnevnikResource::collection($dnevnici);
        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju dnevnika.',
            ], 500); 
        }
    }



    public function vratiTrenere()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled trenera.',
                ], 403); 
            }

            $treneri = User::where('role', 'trener')->paginate(5);
            return UserResource::collection($treneri);
            
         
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju trenera.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }
    

    public function obrisiTrenera($id)
    {
        try
        {
            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'Nemate dozvolu za brisanje trenera.',
                ], 403); 
            }
            $trener = User::findOrFail($id);
            if($trener->role!='trener')
            {
                return response()->json([
                    'error' => 'Pokusavate da obrisete korisnika koji nije trener.',
                ], 500); 
            }

            $trener->delete();
            return response()->json([
                'message' => 'Uspesno ste obrisali trenera.',
            ], 200); 
         
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri brisanju trenera.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }





    
    public function vratiVezbace()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled vezbaca.',
                ], 403); 
            }

            $vezbaci = User::where('role', 'vezbac')->paginate(5);
            return UserResource::collection($vezbaci);
            
         
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju vezbaca.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }
    

    public function obrisiVezbaca($id)
    {
        try
        {
            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'Nemate dozvolu za brisanje vezbaca.',
                ], 403); 
            }
            $vezbac = User::findOrFail($id);
            if($vezbac->role!='vezbac')
            {
                return response()->json([
                    'error' => 'Pokusavate da obrisete korisnika koji nije vezbac.',
                ], 500); 
            }

            $vezbac->delete();
            return response()->json([
                'message' => 'Uspesno ste obrisali vezbaca.',
            ], 200); 
         
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri brisanju vezbaca.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    }
    
}
