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
        Schema::create('planovi_treninga', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vezbac_id')->constrained('users')->onDelete('cascade');
            $table->string('naziv');
            $table->dateTime('datum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planovi_treninga');
    }
};
