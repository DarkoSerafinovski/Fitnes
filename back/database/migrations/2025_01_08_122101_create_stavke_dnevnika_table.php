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
        Schema::create('stavke_dnevnika', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dnevnik_id')->constrained('fitnes_dnevnici')->onDelete('cascade');
            $table->date('datum');
            $table->string('naziv_aktivnosti');
            $table->text('komentar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stavke_dnevnika');
    }
};
