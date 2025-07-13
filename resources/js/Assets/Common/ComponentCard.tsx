import { Pencil, Trash2, Plus } from "lucide-react";
import React from "react";
import { Link } from "@inertiajs/react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string; 
  addItem?: any;
  showAdd?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  addItem = '',
  showAdd = true,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        <div className={showAdd ? 'block' : 'hidden'}>
          <Link href={addItem}>
            <button
              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition"
              title="Tambah"
            >
              <Plus size={18} />
            </button>
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
