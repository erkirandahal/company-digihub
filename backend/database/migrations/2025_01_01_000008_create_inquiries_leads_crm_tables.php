<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('service_interested_in')->nullable();
            $table->string('budget_range')->nullable();
            $table->string('preferred_contact_method')->default('email');
            $table->enum('status', ['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'])->default('New');
            $table->boolean('is_read')->default(false);
            $table->text('notes')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('project_title');
            $table->text('project_description');
            $table->json('required_services')->nullable();
            $table->string('estimated_budget')->nullable();
            $table->string('timeline')->nullable();
            $table->string('preferred_contact_method')->default('Email');
            $table->json('attachments')->nullable();
            $table->enum('status', ['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'])->default('New');
            $table->enum('priority', ['Low', 'Medium', 'High', 'Urgent'])->default('Medium');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->date('follow_up_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('lead_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type')->default('note'); // note, call, meeting, status_change, email
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lead_activities');
        Schema::dropIfExists('leads');
        Schema::dropIfExists('contact_inquiries');
    }
};
