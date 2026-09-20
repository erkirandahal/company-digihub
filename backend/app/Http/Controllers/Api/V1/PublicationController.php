<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\AuditLog;

class PublicationController extends Controller
{
    public function index()
    {
        $publications = Publication::where('is_active', true)->orderBy('published_at', 'desc')->get();
        return $this->successResponse($publications);
    }

    public function adminIndex()
    {
        $publications = Publication::orderBy('created_at', 'desc')->get();
        return $this->successResponse($publications);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx,zip|max:10240',
            'type' => 'required|string',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('publications', 'public');
            $data['file_path'] = $path;
        }

        $data['slug'] = Str::slug($data['title']) . '-' . rand(1000, 9999);

        $publication = Publication::create($data);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Created publication: {$publication->title}",
            'module' => 'publications',
            'record_id' => $publication->id,
        ]);

        return $this->successResponse($publication, 'Publication created successfully');
    }

    public function update(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);

        $data = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,zip|max:10240',
            'type' => 'string',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('publications', 'public');
            $data['file_path'] = $path;
        }

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . rand(1000, 9999);
        }

        $publication->update($data);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Updated publication: {$publication->title}",
            'module' => 'publications',
            'record_id' => $publication->id,
        ]);

        return $this->successResponse($publication, 'Publication updated successfully');
    }

    public function destroy(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);
        $title = $publication->title;
        $publication->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => "Deleted publication: {$title}",
            'module' => 'publications',
            'record_id' => $id,
        ]);

        return $this->successResponse(null, 'Publication deleted successfully');
    }
}
