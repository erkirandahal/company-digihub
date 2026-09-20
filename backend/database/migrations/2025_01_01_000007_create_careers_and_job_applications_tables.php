<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->string('slug')->unique();
            $table->string('department')->default('Engineering');
            $table->string('location')->default('Kathmandu, Nepal (Hybrid / Onsite)');
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Contract', 'Internship'])->default('Full-time');
            $table->string('experience')->default('2+ years');
            $table->string('salary_information')->nullable();
            $table->text('description');
            $table->json('responsibilities');
            $table->json('requirements');
            $table->json('skills');
            $table->json('benefits')->nullable();
            $table->date('deadline')->nullable();
            $table->enum('status', ['active', 'closed', 'draft'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('cover_letter')->nullable();
            $table->string('resume_path');
            $table->string('portfolio_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->enum('status', ['New', 'Reviewing', 'Shortlisted', 'Interview', 'Selected', 'Rejected'])->default('New');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('careers');
    }
};
