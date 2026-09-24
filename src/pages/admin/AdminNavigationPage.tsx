import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Plus, Trash2, CornerDownRight } from 'lucide-react';
import { settingsApi } from '../../services/api';
import { SortableList } from '../../components/admin/SortableList';
import { parseNavMenuItems } from '../../config/defaultNavMenu';
import { NavMenuItem } from '../../types';

const TOP_LEVEL = '';

export const AdminNavigationPage: React.FC = () => {
  const [items, setItems] = useState<NavMenuItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    settingsApi.getAll().then((res) => {
      setItems(parseNavMenuItems(res.data?.nav_menu_items));
    });
  }, []);

  const updateItem = (id: string, patch: Partial<NavMenuItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, ...patch };
        if (item.children) {
          return { ...item, children: item.children.map((c) => (c.id === id ? { ...c, ...patch } : c)) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item) => (item.children ? { ...item, children: item.children.filter((c) => c.id !== id) } : item))
    );
  };

  const addCustomLink = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        label: 'New Link',
        path: 'https://',
        visible: true,
        isCustom: true,
      },
    ]);
  };

  const addSubmenuItem = (parentId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [
                ...(item.children || []),
                {
                  id: `custom-${Date.now()}`,
                  label: 'New Submenu Link',
                  path: 'https://',
                  visible: true,
                  isCustom: true,
                },
              ],
            }
          : item
      )
    );
  };

  const reorderChildren = (parentId: string, newChildren: NavMenuItem[]) => {
    setItems((prev) => prev.map((item) => (item.id === parentId ? { ...item, children: newChildren } : item)));
  };

  // Moves an item (top-level or a child anywhere) to become a child of
  // `newParentId`, or back to the top level when newParentId === TOP_LEVEL.
  const setParent = (id: string, newParentId: string) => {
    setItems((prev) => {
      let moved: NavMenuItem | null = null;

      const withoutItem = prev
        .filter((item) => {
          if (item.id === id) {
            moved = item;
            return false;
          }
          return true;
        })
        .map((item) => {
          if (item.children?.some((c) => c.id === id)) {
            moved = item.children.find((c) => c.id === id) || null;
            return { ...item, children: item.children.filter((c) => c.id !== id) };
          }
          return item;
        });

      if (!moved) return prev;
      // An item that becomes a submenu link can't itself carry children (2-level menu only).
      const clean: NavMenuItem = { ...moved, children: undefined };

      if (!newParentId) {
        return [...withoutItem, clean];
      }
      return withoutItem.map((item) =>
        item.id === newParentId ? { ...item, children: [...(item.children || []), clean] } : item
      );
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await settingsApi.update({ nav_menu_items: JSON.stringify(items) });
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const renderRow = (item: NavMenuItem, dragHandle: React.ReactNode, isChild: boolean) => (
    <div
      className={`flex flex-wrap items-center gap-3 p-3 rounded-xl border ${
        isChild ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50'
      }`}
    >
      {dragHandle}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 min-w-[240px]">
        <input
          type="text"
          value={item.label}
          onChange={(e) => updateItem(item.id, { label: e.target.value })}
          placeholder="Label"
          className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          value={item.path}
          disabled={!item.isCustom}
          onChange={(e) => updateItem(item.id, { path: e.target.value })}
          placeholder="/path or https://..."
          className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
        />
      </div>

      {/* Parent selector — hidden for items that currently have their own
          children, since a submenu item can't itself become a parent. */}
      {!item.children?.length && (
        <select
          value={isChild ? findParentId(items, item.id) : TOP_LEVEL}
          onChange={(e) => setParent(item.id, e.target.value)}
          className="px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-[11px] font-semibold text-slate-600 shrink-0"
          title="Make this a submenu item under..."
        >
          <option value={TOP_LEVEL}>Top Level</option>
          {items
            .filter((p) => p.id !== item.id)
            .map((p) => (
              <option key={p.id} value={p.id}>
                Under "{p.label}"
              </option>
            ))}
        </select>
      )}

      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 shrink-0">
        <input
          type="checkbox"
          checked={item.visible}
          onChange={(e) => updateItem(item.id, { visible: e.target.checked })}
          className="rounded border-slate-300"
        />
        Visible
      </label>

      {!isChild && (
        <button
          onClick={() => addSubmenuItem(item.id)}
          className="p-1.5 text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors shrink-0"
          title="Add submenu item"
        >
          <CornerDownRight className="w-4 h-4" />
        </button>
      )}

      {item.isCustom && (
        <button
          onClick={() => removeItem(item.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Navigation Menu</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Control which pages appear in the site header, their order, and their display labels.
            Drag the handle to reorder. Use the "Under..." dropdown to nest an item as a submenu
            link, or the <CornerDownRight className="w-3 h-3 inline" /> icon to add a new submenu link directly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addCustomLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Link</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Menu'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 font-semibold flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-700" />
          <span>Navigation menu updated. Changes are live on the public site.</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-4">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No menu items yet.</p>
        ) : (
          <SortableList<NavMenuItem>
            items={items}
            getId={(item) => item.id}
            onReorder={setItems}
            className="space-y-2"
            renderItem={(item, dragHandle) => (
              <div className="space-y-2">
                {renderRow(item, dragHandle, false)}
                {item.children && item.children.length > 0 && (
                  <div className="pl-8 space-y-2">
                    <SortableList<NavMenuItem>
                      items={item.children}
                      getId={(c) => c.id}
                      onReorder={(newChildren) => reorderChildren(item.id, newChildren)}
                      className="space-y-2"
                      renderItem={(child, childDragHandle) => renderRow(child, childDragHandle, true)}
                    />
                  </div>
                )}
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

function findParentId(items: NavMenuItem[], childId: string): string {
  const parent = items.find((item) => item.children?.some((c) => c.id === childId));
  return parent?.id || TOP_LEVEL;
}
