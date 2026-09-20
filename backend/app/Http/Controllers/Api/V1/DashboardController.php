<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Blog;
use App\Models\ContactInquiry;
use App\Models\Lead;
use App\Models\JobApplication;
use App\Models\NewsletterSubscriber;
use App\Models\Popup;
use App\Models\AuditLog;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $totalProjects = Project::count();
        $publishedBlogs = Blog::where('status', 'published')->count();
        $draftBlogs = Blog::where('status', 'draft')->count();
        $newInquiries = ContactInquiry::where('status', 'New')->count();
        $totalInquiries = ContactInquiry::count();
        $activeLeads = Lead::whereIn('status', ['New', 'Contacted', 'In Progress'])->count();
        $totalLeads = Lead::count();
        $newApplications = JobApplication::where('status', 'New')->count();
        $totalApplications = JobApplication::count();
        $totalSubscribers = NewsletterSubscriber::where('status', 'active')->count();

        $popupStats = Popup::selectRaw('SUM(impressions_count) as total_impressions, SUM(clicks_count) as total_clicks')->first();
        $totalImpressions = $popupStats->total_impressions ?? 0;
        $totalClicks = $popupStats->total_clicks ?? 0;
        $popupCtr = $totalImpressions > 0 ? round(($totalClicks / $totalImpressions) * 100, 2) : 0;

        $recentInquiries = ContactInquiry::latest()->take(5)->get();
        $recentLeads = Lead::with('assignedUser')->latest()->take(5)->get();
        $recentActivities = AuditLog::with('user')->latest()->take(8)->get();

        return $this->successResponse([
            'metrics' => [
                'total_projects' => $totalProjects,
                'published_blogs' => $publishedBlogs,
                'draft_blogs' => $draftBlogs,
                'new_inquiries' => $newInquiries,
                'total_inquiries' => $totalInquiries,
                'active_leads' => $activeLeads,
                'total_leads' => $totalLeads,
                'new_applications' => $newApplications,
                'total_applications' => $totalApplications,
                'subscribers' => $totalSubscribers,
                'popup_impressions' => $totalImpressions,
                'popup_clicks' => $totalClicks,
                'popup_ctr' => $popupCtr,
            ],
            'recent_inquiries' => $recentInquiries,
            'recent_leads' => $recentLeads,
            'recent_activities' => $recentActivities,
        ], 'Dashboard metrics retrieved');
    }
}
