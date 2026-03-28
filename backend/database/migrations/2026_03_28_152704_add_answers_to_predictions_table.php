<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAnswersToPredictionsTable extends Migration
{
    public function up()
    {
        Schema::table('predictions', function (Blueprint $table) {
            $table->json('answers')->nullable()->after('predicted_level');
        });
    }
    
    public function down()
    {
        Schema::table('predictions', function (Blueprint $table) {
            $table->dropColumn('answers');
        });
    }
}