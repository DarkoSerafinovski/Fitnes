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
        Schema::create('vezbe', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->text('opis');
            $table->string('slika');
            $table->text('misici_na_koje_utice');
            $table->text('savet');
            $table->integer('preporuceni_broj_serija');
            $table->integer('preporuceni_broj_ponavljanja');
            $table->string('video_url');
            $table->foreignId('grupa_misica_id')->constrained('grupe_misica')->onDelete('cascade');
            $table->foreignId('kategorija_id')->constrained('kategorije_vezba')->onDelete('cascade');
            $table->foreignId('trener_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vezbe');
    }
};
