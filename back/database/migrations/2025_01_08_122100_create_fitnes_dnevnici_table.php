<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fitnes_dnevnici', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vezbac_id')->constrained('users')->onDelete('cascade');
            $table->string('slika');
            $table->text('kratak_opis');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fitnes_dnevnici');
    }
};
