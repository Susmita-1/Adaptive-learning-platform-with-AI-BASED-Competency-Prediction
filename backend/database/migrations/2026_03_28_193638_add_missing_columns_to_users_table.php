<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingColumnsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add role column
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('student')->after('password');
            }
            
            // Add quiz statistics columns
            if (!Schema::hasColumn('users', 'total_quizzes_taken')) {
                $table->integer('total_quizzes_taken')->default(0)->after('role');
            }
            
            if (!Schema::hasColumn('users', 'average_score')) {
                $table->integer('average_score')->default(0)->after('total_quizzes_taken');
            }
            
            if (!Schema::hasColumn('users', 'highest_score')) {
                $table->integer('highest_score')->default(0)->after('average_score');
            }
            
            // Add current level column
            if (!Schema::hasColumn('users', 'current_level')) {
                $table->string('current_level')->default('Beginner')->after('highest_score');
            }
            
            // Add JSON columns for history
            if (!Schema::hasColumn('users', 'quiz_history')) {
                $table->json('quiz_history')->nullable()->after('current_level');
            }
            
            if (!Schema::hasColumn('users', 'iq_history')) {
                $table->json('iq_history')->nullable()->after('quiz_history');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'total_quizzes_taken',
                'average_score',
                'highest_score',
                'current_level',
                'quiz_history',
                'iq_history'
            ]);
        });
    }
}