<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Career;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = trim((string) $request->get('q', ''));

        if ($query === '') {
            return $this->successResponse([]);
        }

        $like = '%' . $query . '%';

        $services = Service::where('status', 'active')
            ->where('name', 'like', $like)
            ->get(['id', 'name', 'slug'])
            ->map(fn ($s) => ['type' => 'service', 'id' => $s->id, 'title' => $s->name, 'slug' => $s->slug]);

        $projects = Project::where('status', 'published')
            ->where('title', 'like', $like)
            ->get(['id', 'title', 'slug'])
            ->map(fn ($p) => ['type' => 'project', 'id' => $p->id, 'title' => $p->title, 'slug' => $p->slug]);

        $blogs = Blog::where('status', 'published')
            ->where('title', 'like', $like)
            ->get(['id', 'title', 'slug'])
            ->map(fn ($b) => ['type' => 'blog', 'id' => $b->id, 'title' => $b->title, 'slug' => $b->slug]);

        $careers = Career::where('status', 'active')
            ->where('job_title', 'like', $like)
            ->get(['id', 'job_title', 'slug'])
            ->map(fn ($c) => ['type' => 'career', 'id' => $c->id, 'title' => $c->job_title, 'slug' => $c->slug]);

        $results = $services->concat($projects)->concat($blogs)->concat($careers)->values();

        return $this->successResponse($results);
    }
}
