"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function Contact() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    website_confirm: "", // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverErrorMsg, setServerErrorMsg] = useState<string | null>(null);

  const projectTypeOptions = [
    { label: language === "fr" ? "Stage / Postes Juniors" : "Internship / Junior Opportunity", value: "Internship / Junior Role" },
    { label: language === "fr" ? "Application Métier / Outil Web" : "Business Application / Web Tool", value: "Business Application" },
    { label: language === "fr" ? "Projet Web & Frontend" : "Web Development Project", value: "Web Development" },
    { label: language === "fr" ? "Analyse de Données & Dashboard" : "Data Analytics & Dashboards", value: "Data Analytics" },
    { label: language === "fr" ? "Mission Freelance / Autre Collaboration" : "Freelance / Collaboration", value: "Freelance Collaboration" }
  ];

  const budgetOptions = [
    { label: language === "fr" ? "Stage / Gratification" : "Internship / Entry Opportunity", value: "Internship" },
    { label: language === "fr" ? "Projet < 1 000 USD" : "Project < $1k", value: "< $1k" },
    { label: language === "fr" ? "Projet 1 000 - 3 000 USD" : "Project $1k - $3k", value: "$1k - $3k" },
    { label: language === "fr" ? "Projet 3 000 USD+" : "Project $3k+", value: "$3k+" }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = language === "fr" ? "Le nom est requis" : "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = language === "fr" ? "L'adresse e-mail est requise" : "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "fr" ? "Veuillez entrer une adresse e-mail valide" : "Please enter a valid email address";
    }
    if (!formData.projectType) {
      newErrors.projectType = language === "fr" ? "Veuillez sélectionner un type de demande" : "Please select an inquiry type";
    }
    if (!formData.message.trim()) {
      newErrors.message = language === "fr" ? "Veuillez entrer les détails" : "Please enter details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus("success");
      } else {
        setServerErrorMsg(resData.error || t("contact.form.errorMessage"));
        setStatus("error");
      }
    } catch (err) {
      setServerErrorMsg(t("contact.form.errorMessage"));
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
      website_confirm: "",
    });
    setErrors({});
    setStatus("idle");
    setServerErrorMsg(null);
  };

  const whatsAppPrefilledMsg = encodeURIComponent(t("contact.whatsAppMessage"));
  const whatsAppUrl = `https://wa.me/212656682813?text=${whatsAppPrefilledMsg}`;

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            05 / {t("contact.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-2 leading-tight">
            {t("contact.heading")}
          </h2>
          <p className="text-base sm:text-lg text-[#242222]/80 font-normal leading-relaxed">
            {t("contact.subheading")}
          </p>

          {/* Primary Quick Email CTA Banner */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:manssouriyoussef33@gmail.com"
              className="inline-flex items-center gap-2 bg-[#3A171C] text-[#F3EFEA] px-5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#542229] transition-all active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-[#A65F4B]" />
              <span>manssouriyoussef33@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <span className="text-xs font-mono text-[#A65F4B] bg-[#A65F4B]/10 border border-[#A65F4B]/20 px-3 py-1.5 rounded-xs font-semibold">
              ● {t("contact.availability")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="p-8 rounded-xs bg-white border border-[#DED6CC] text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#A65F4B]/15 border border-[#A65F4B] flex items-center justify-center mx-auto text-[#A65F4B]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#242222]">{t("contact.form.successTitle")}</h3>
                <p className="text-[#242222]/80 text-sm leading-relaxed max-w-md mx-auto">
                  {t("contact.form.successMessage")}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs font-mono text-[#A65F4B] hover:underline uppercase tracking-wider font-semibold"
                >
                  {language === "fr" ? "Envoyer un autre message" : "Send Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact Form">
                {/* Honeypot field */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="website_confirm"
                    tabIndex={-1}
                    value={formData.website_confirm}
                    onChange={(e) => setFormData({ ...formData, website_confirm: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label={t("contact.form.name")}
                    placeholder={t("contact.form.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    disabled={status === "submitting"}
                  />
                  <Input
                    label={t("contact.form.email")}
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    disabled={status === "submitting"}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label={t("contact.form.company")}
                    placeholder={t("contact.form.companyPlaceholder")}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={status === "submitting"}
                  />
                  <Select
                    label={t("contact.form.projectType")}
                    placeholder={t("contact.form.selectProjectType")}
                    options={projectTypeOptions}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    error={errors.projectType}
                    disabled={status === "submitting"}
                  />
                </div>

                <Select
                  label={t("contact.form.budget")}
                  placeholder={t("contact.form.selectBudget")}
                  options={budgetOptions}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  disabled={status === "submitting"}
                />

                <Textarea
                  label={t("contact.form.message")}
                  placeholder={t("contact.form.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  error={errors.message}
                  disabled={status === "submitting"}
                  rows={5}
                />

                {status === "error" && (
                  <div className="p-4 rounded-xs bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{t("contact.form.errorTitle")}</span>
                    </div>
                    <p className="text-red-600 leading-relaxed">
                      {serverErrorMsg || t("contact.form.errorMessage")}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#3A171C] text-[#F3EFEA] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#542229] transition-colors disabled:opacity-50 active:scale-[0.98]"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t("contact.form.submitting")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("contact.form.submit")}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels Highlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-6 shadow-xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A65F4B]">
                {t("contact.directContact")}
              </h3>

              <div className="space-y-5 text-xs">
                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium">{t("contact.email")}</span>
                  <a
                    href="mailto:manssouriyoussef33@gmail.com"
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-bold text-sm transition-colors break-all"
                  >
                    manssouriyoussef33@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium">{t("contact.phone")}</span>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    +212 6 56 68 28 13 ({t("contact.whatsAppCTA")})
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" />
                  </a>
                </div>

                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium">{t("contact.linkedin")}</span>
                  <a
                    href="https://www.linkedin.com/in/youssef-manssouri-24b4662ba/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    Youssef Manssouri
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" />
                  </a>
                </div>

                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium">{t("contact.github")}</span>
                  <a
                    href="https://github.com/b91749533-sys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    b91749533-sys
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
