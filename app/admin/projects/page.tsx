"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Eye, Star, ExternalLink, Github, Check, X, Globe } from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  taglineEn: string;
  taglineFr: string;
  descriptionEn: string;
  descriptionFr: string;
  overviewEn: string;
  overviewFr: string;
  objectiveEn: string;
  objectiveFr: string;
  outcomeEn: string;
  outcomeFr: string;
  featured: boolean;
  published: boolean;
  githubUrl: string;
  liveUrl: string | null;
  heroImage: string;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "fr">("en");
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.slug || !editingProject?.title) {
      alert("Slug and Title are required.");
      return;
    }

    setSaving(true);
    const method = editingProject.id ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        fetchProjects();
        setEditingProject(null);
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving project.");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (project: Project, field: "published" | "featured") => {
    const updatedValue = !project[field];
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, [field]: updatedValue }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, [field]: updatedValue } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Content Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage English & French case studies, status toggles, and metadata.</p>
        </div>

        <button
          onClick={() =>
            setEditingProject({
              slug: "",
              title: "",
              category: "SAAS · BUSINESS PLATFORM",
              type: "PERSONAL PROJECT",
              taglineEn: "",
              taglineFr: "",
              descriptionEn: "",
              descriptionFr: "",
              overviewEn: "",
              overviewFr: "",
              objectiveEn: "",
              objectiveFr: "",
              outcomeEn: "",
              outcomeFr: "",
              featured: true,
              published: true,
              githubUrl: "https://github.com/youssefmanssouri",
              liveUrl: "",
              heroImage: "/images/projects/businessos-main.jpg",
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List Grid */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm animate-pulse">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-12 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 text-sm">
          No projects found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-400 font-semibold">{project.category}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(project, "published")}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-colors ${
                        project.published
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {project.published ? "PUBLISHED" : "DRAFT"}
                    </button>
                    <button
                      onClick={() => toggleStatus(project, "featured")}
                      className={`p-1 rounded transition-colors ${
                        project.featured ? "text-amber-400" : "text-slate-600"
                      }`}
                      title="Toggle Featured Status"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{project.descriptionEn}</p>
                <p className="text-xs text-slate-400 italic line-clamp-2">{project.descriptionFr}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">/{project.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">
                {editingProject.id ? `Edit ${editingProject.title}` : "Create New Portfolio Project"}
              </h2>
              <p className="text-xs text-slate-400">Configure separate English and French content for case studies.</p>
            </div>

            {/* EN / FR Content Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "en" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                English Content (EN)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("fr")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "fr" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                French Content (FR)
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              {/* Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block font-mono mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block font-mono mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block font-mono mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  />
                </div>
              </div>

              {/* Tab-Specific Content */}
              {activeTab === "en" ? (
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Tagline (EN)</label>
                    <input
                      type="text"
                      value={editingProject.taglineEn || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, taglineEn: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Short Description (EN) *</label>
                    <textarea
                      rows={2}
                      value={editingProject.descriptionEn || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Overview (EN)</label>
                    <textarea
                      rows={3}
                      value={editingProject.overviewEn || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, overviewEn: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Objective (EN)</label>
                    <textarea
                      rows={2}
                      value={editingProject.objectiveEn || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, objectiveEn: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Tagline (FR)</label>
                    <input
                      type="text"
                      value={editingProject.taglineFr || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, taglineFr: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Short Description (FR) *</label>
                    <textarea
                      rows={2}
                      value={editingProject.descriptionFr || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionFr: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Overview (FR)</label>
                    <textarea
                      rows={3}
                      value={editingProject.overviewFr || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, overviewFr: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-mono mb-1">Objective (FR)</label>
                    <textarea
                      rows={2}
                      value={editingProject.objectiveFr || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, objectiveFr: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>
                </div>
              )}

              {/* URLs & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block font-mono mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block font-mono mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-200"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-500"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
