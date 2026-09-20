<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('popups', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_url')->nullable();
            $table->string('type')->default('Announcement'); // Announcement, Promotion, Blog promotion, Newsletter, Contact CTA, Career, Event, Custom
            $table->boolean('status')->default(true);
            $table->integer('priority')->default(1);
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->string('target_pages')->default('all'); // all, home, blog, careers, contact
            $table->string('device_targeting')->default('all'); // all, desktop, mobile
            $table->enum('frequency', ['every_visit', 'once_session', 'once_day', 'once_week', 'once_ever'])->default('once_session');
            $table->integer('delay_seconds')->default(5);
            $table->integer('scroll_percentage')->default(0);
            $table->unsignedBigInteger('impressions_count')->default(0);
            $table->unsignedBigInteger('clicks_count')->default(0);
            $table->timestamps();
        });

        Schema::create('popup_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('popup_id')->constrained()->cascadeOnDelete();
            $table->enum('event_type', ['impression', 'click', 'dismiss']);
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });

        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->enum('status', ['active', 'unsubscribed'])->default('active');
            $table->timestamp('subscribed_at')->useCurrent();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('mime_type');
            $table->unsignedBigInteger('file_size');
            $table->string('alt_text')->nullable();
            $table->string('caption')->nullable();
            $table->string('folder')->default('uploads');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('group')->default('general'); // general, social, contact, seo, footer
            $table->string('type')->default('text'); // text, textarea, boolean, json, image
            $table->timestamps();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action'); // Created project, Updated blog, etc.
            $table->string('module'); // projects, blog, services, settings, auth
            $table->string('record_id')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->json('changes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('media');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('popup_events');
        Schema::dropIfExists('popups');
    }
};
