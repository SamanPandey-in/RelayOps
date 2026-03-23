import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchableItems } from "../../store";
import { FolderOpen, Users, Square, SearchIcon, X } from "lucide-react";
import { useSearchAllQuery } from "../../store/slices/apiSlice";
import { useDebounce } from "../../lib/utils";

const TYPE_CONFIG = {
  team:    { icon: Users,      label: "Team",    color: "text-blue-500"   },
  project: { icon: FolderOpen, label: "Project", color: "text-purple-500" },
  task:    { icon: Square,     label: "Task",    color: "text-green-500"  },
};

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 dark:bg-yellow-600/40 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchPanel({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allItems = useSelector(selectSearchableItems);
  const debouncedQuery = useDebounce(query, 300);

  const { data: serverData } = useSearchAllQuery(debouncedQuery, {
    skip: debouncedQuery.length < 2,
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 8);
    return allItems
      .filter(item => item.label.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, allItems]);

  const serverItems = useMemo(() => {
    if (!serverData) return [];

    const { teams = [], projects = [], tasks = [] } = serverData;

    return [
      ...teams.map(t => ({
        type: "team",
        id: t.id,
        label: t.name,
        subLabel: "Team",
        href: `/teams/${t.id}`,
      })),
      ...projects.map(p => ({
        type: "project",
        id: p.id,
        label: p.name,
        subLabel: `Project · ${p.status}`,
        href: `/projects/${p.id}`,
      })),
      ...tasks.map(t => ({
        type: "task",
        id: t.id,
        label: t.title,
        subLabel: `Task · ${t.status}`,
        href: `/taskDetails?taskId=${t.id}&projectId=${t.projectId}`,
      })),
    ];
  }, [serverData]);

  const merged = useMemo(() => {
    const clientIds = new Set(results.map(r => r.id));
    const serverOnly = serverItems.filter(s => !clientIds.has(s.id));
    return [...results, ...serverOnly].slice(0, 15);
  }, [results, serverItems]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx(i => Math.min(i + 1, merged.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx(i => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && merged[activeIdx]) {
        navigate(merged[activeIdx].href);
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, merged, activeIdx, navigate, onClose]);

  useEffect(() => {
    const el = listRef.current?.children[activeIdx];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b">
          <SearchIcon size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Search teams, projects, tasks..."
            className="flex-1 bg-transparent outline-none"
          />
          {query && <button onClick={() => setQuery("")}><X size={16} /></button>}
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {merged.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type] || {};
            const Icon = cfg.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(item.href);
                  onClose();
                }}
                onMouseEnter={() => setActiveIdx(i)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                  i === activeIdx ? "bg-gray-100 dark:bg-zinc-800" : ""
                }`}
              >
                {Icon && <Icon size={16} className={cfg.color} />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {highlight(item.label, query)}
                  </div>
                  {item.subLabel && (
                    <div className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                      {item.subLabel}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {merged.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-zinc-400">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
