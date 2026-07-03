"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  getHomeCategories,
  addNewCategoryApi,
  deleteCategoryApi,
} from "@/services/apiService";
import { Category } from "@/models/home_model";
import { createPortal } from "react-dom";

interface CategorySelectionProps {
  selectedCategory: string;
  onSelect: (categoryName: string) => void;
}

export default function CategorySelection({
  selectedCategory,
  onSelect,
}: CategorySelectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getHomeCategories();
      if (res && res.data && res.data.category) {
        setCategories(res.data.category);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    setMounted(true);
  }, []);

  const handleAddCategory = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    try {
      await addNewCategoryApi(newCategoryName);
      setNewCategoryName("");
      setIsSidebarOpen(false);
      await fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    setIsDeleting(true);
    try {
      await deleteCategoryApi(categoryName);
      setDeleteConfirmOpen(null);
      if (selectedCategory === categoryName) {
        onSelect("");
      }
      await fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter(
    (c) => c.categoryName.toLowerCase() !== "others",
  );

  return (
    <div className="w-full">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.categoryName.toLowerCase();
            return (
              <div
                key={cat.id}
                onClick={() => onSelect(cat.categoryName)}
                className={`relative group h-28 rounded-2xl flex flex-col items-center justify-center gap-2 p-3 cursor-pointer transition-all border-2 ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary shadow-md"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {/* Delete Button for 'others' categoryType */}
                {cat.categoryType === "others" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmOpen(cat.categoryName);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${isSelected ? "bg-primary/20 text-primary" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}
                >
                  <span className="font-bold text-sm uppercase">
                    {cat.categoryName.substring(0, 2)}
                  </span>
                </div>
                <span className="text-xs font-bold text-center capitalize tracking-wide line-clamp-1">
                  {cat.categoryName}
                </span>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          <div
            onClick={() => setIsSidebarOpen(true)}
            className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 p-3 cursor-pointer transition-all border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:border-primary hover:bg-primary/5 hover:text-primary group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary text-center">
              Add New
            </span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {deleteConfirmOpen && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setDeleteConfirmOpen(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800"
                >
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white">
                    Delete Category?
                  </h3>
                  <p className="text-sm text-slate-500 text-center mb-6">
                    Are you sure you want to delete the "{deleteConfirmOpen}"
                    category? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmOpen(null)}
                      className="flex-1 py-3 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(deleteConfirmOpen)}
                      disabled={isDeleting}
                      className="flex-1 py-3 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 transition-colors disabled:opacity-70 flex items-center justify-center"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* Add New Category Sidebar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-[100] flex flex-col border-l border-slate-200 dark:border-slate-800"
                >
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
                    <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                      Add New Category
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Category Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCategory();
                            }
                          }}
                          placeholder="e.g. cakeshop"
                          className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        disabled={isSubmitting || !newCategoryName.trim()}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Create Category"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
