import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  FileText,
  Inbox,
  KanbanSquare,
  Users,
  Megaphone,
  TrendingUp,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { dashboardApi, contactApi, leadsApi } from '../../services/api';
import { DashboardMetrics, ContactInquiry, Lead, AuditLog } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<ContactInquiry[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    const res = await dashboardApi.getStats();
    if (res.data) {
      setMetrics(res.data.metrics);
      setRecentInquiries(res.data.recent_inquiries || []);
      setRecentLeads(res.data.recent_leads || []);
      setAuditLogs(res.data.recent_activities || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleInquiryStatus = async (id: number, status: ContactInquiry['status']) => {
    await contactApi.updateStatus(id, status);
    fetchDashboardData();
  };

  if (loading || !metrics) {
    return <div className="text-slate-500 text-sm">Loading executive dashboard metrics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            System Operations & Business Intelligence
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry across customer inquiries, project leads, CMS modules, and popup conversions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/leads"
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
          >
            Manage CRM Pipeline
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Active Leads */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active CRM Leads</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <KanbanSquare className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 block">{metrics.active_leads}</span>
          <span className="text-[11px] text-slate-400 block">Total Pipeline: {metrics.total_leads}</span>
        </div>

        {/* Metric 2: New Inquiries */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Inquiries</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 block">{metrics.new_inquiries}</span>
          <span className="text-[11px] text-slate-400 block">Total Inbox: {metrics.total_inquiries}</span>
        </div>

        {/* Metric 3: Portfolio Projects */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Portfolio Deployments</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 block">{metrics.total_projects}</span>
          <span className="text-[11px] text-slate-400 block">Published Case Studies</span>
        </div>

        {/* Metric 4: Popup CTR */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">CTA Popup CTR</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 block">{metrics.popup_ctr}%</span>
          <span className="text-[11px] text-slate-400 block">
            {metrics.popup_clicks} clicks / {metrics.popup_impressions} views
          </span>
        </div>
      </div>

      {/* Two-Column CRM & Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Leads & Inquiries */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Leads Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent High-Value Leads</h3>
                <p className="text-xs text-slate-500">Prospective clients requesting architectural proposals</p>
              </div>
              <Link to="/admin/leads" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                View Full Pipeline →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-3 font-semibold">Stakeholder / Org</th>
                    <th className="pb-3 font-semibold">Project Title</th>
                    <th className="pb-3 font-semibold">Budget</th>
                    <th className="pb-3 font-semibold">Priority</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <span className="font-bold text-slate-900 block">{lead.name}</span>
                        <span className="text-[11px] text-slate-400">{lead.company}</span>
                      </td>
                      <td className="py-3 max-w-xs">
                        <span className="font-medium text-slate-800 line-clamp-1">{lead.project_title}</span>
                      </td>
                      <td className="py-3 font-semibold text-slate-700">{lead.estimated_budget}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lead.priority === 'High'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Public Inquiries</h3>
                <p className="text-xs text-slate-500">Submissions from public contact forms</p>
              </div>
              <Link to="/admin/inquiries" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                Inbox ({metrics.total_inquiries}) →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{inq.name}</span>
                      <span className="text-slate-400 text-[11px]">({inq.email})</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          inq.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : inq.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-1">{inq.message}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {inq.status === 'New' && (
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'Contacted')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-[10px] font-bold transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: System Audit Log & Quick Info */}
        <div className="space-y-8">
          {/* Quick System Status Card */}
          <div className="bg-indigo-50 border border-indigo-100 text-slate-900 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                System Status
              </span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-indigo-100">
                <span className="text-slate-500">REST API Framework:</span>
                <span className="font-mono text-indigo-700">Laravel 12+</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-100">
                <span className="text-slate-500">Frontend Engine:</span>
                <span className="font-mono text-indigo-700">React 19 (Vite)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-100">
                <span className="text-slate-500">Token Auth:</span>
                <span className="font-mono text-indigo-700">Sanctum Token</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-100">
                <span className="text-slate-500">Database Engine:</span>
                <span className="font-mono text-indigo-700">MySQL 8+ (ACID)</span>
              </div>
            </div>
          </div>

          {/* Audit Trail Activity Feed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Immutable Audit Trail</h3>
            <div className="space-y-3 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 pb-2 border-b border-slate-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-800">{log.action}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="uppercase font-bold text-slate-500">{log.module}</span>
                      <span>•</span>
                      <span>{log.created_at}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
