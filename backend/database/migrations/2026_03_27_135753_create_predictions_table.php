<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePredictionsTable extends Migration
{
    public function up()
    {
        Schema::create('predictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('score');
            $table->integer('total_questions');
            $table->float('percentage');
            $table->float('weighted_percentage')->nullable();
            $table->integer('time_taken');
            $table->integer('iq_score')->nullable();
            $table->string('iq_level')->nullable();
            $table->string('competency_level')->nullable();
            $table->json('category_performance')->nullable();
            $table->json('difficulty_performance')->nullable();
            $table->json('answers')->nullable();
            $table->json('recommendations')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('predictions');
    }
}