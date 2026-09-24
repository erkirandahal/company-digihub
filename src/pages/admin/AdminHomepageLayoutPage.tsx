import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { settingsApi } from '../../services/api';
import { SortableList } from '../../components/admin/SortableList';
import {
  HOMEPAGE_SECTION_REGISTRY,
  HomepageSectionOrderEntry,
  parseHomepageSectionsOrder,
} from '../../pages/public/homepageSections';

export const AdminHomepageLayoutPage: React.FC = () => {
  const [order, setOrder] = useState<HomepageSectionOrderEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    settingsApi.getAll().then((res) => {
      setOrder(parseHomepageSectionsOrder(res.data?.homepage_sections_order));
    });
  }, []);

  const toggleVisible = (key: string) => {
    setOrder((prev) =>
      prev.map((entry) => (entry.key === key ? { ...entry, visible: !entry.visible } : entry))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await settingsApi.update({ homepage_sections_order: JSON.stringify(order) });
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Homepage Layout</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Drag to reorder homepage modules, toggle visibility, and control where the Hero Slider sits.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Layout'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 font-semibold flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-700" />
          <span>Homepage layout updated. Changes are live on the public site.</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-4">
        {order.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">Loading...</p>
        ) : (
          <SortableList<HomepageSectionOrderEntry>
            items={order}
            getId={(entry) => entry.key}
            onReorder={setOrder}
            className="space-y-2"
            renderItem={(entry, dragHandle) => (
              <div
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${
                  entry.visible ? 'border-slate-200 bg-slate-50' : 'border-slate-100 bg-slate-50/50 opacity-60'
                }`}
              >
                {dragHandle}
                <span className="flex-1 font-bold text-sm text-slate-900">
                  {HOMEPAGE_SECTION_REGISTRY[entry.key]?.label || entry.key}
                </span>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 shrink-0">
                  <input
                    type="checkbox"
                    checked={entry.visible}
                    onChange={() => toggleVisible(entry.key)}
                    className="rounded border-slate-300"
                  />
                  Visible
                </label>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};
