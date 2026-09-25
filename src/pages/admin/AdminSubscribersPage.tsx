import React, { useEffect, useState } from 'react';
import { Mail, Download, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsletterApi } from '../../services/api';
import { NewsletterSubscriber } from '../../types';

const PAGE_SIZE = 20;

export const AdminSubscribersPage: React.FC = () => {
  const [allSubscribers, setAllSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchSubs = async (q?: string) => {
    const res = await newsletterApi.getAll(q);
    setAllSubscribers(res.data || []);
    setPage(1);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchSubs(search || undefined), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return;
    await newsletterApi.delete(id);
    fetchSubs(search || undefined);
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Email,SubscribedAt\n' +
      allSubscribers.map((s) => `${s.id},${s.email},${s.created_at}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'digihub_newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.max(1, Math.ceil(allSubscribers.length / PAGE_SIZE));
  const pageItems = allSubscribers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Newsletter Subscribers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            People subscribed to Digihub Innovation Center updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search email or name…"
              className="pl-8 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 w-56"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold text-xs transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3 px-4 font-bold"># ID</th>
                <th className="py-3 px-4 font-bold">Email Address</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Subscription Date</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageItems.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-mono text-slate-400">#{sub.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sub.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {sub.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{sub.created_at}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Page {page} of {totalPages} ({allSubscribers.length} subscribers)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
