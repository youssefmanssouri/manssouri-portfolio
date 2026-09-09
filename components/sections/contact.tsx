"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck, UserCheck, Copy, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function Contact() {
  const { language, t, dictionary } = useLanguage();

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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const projectTypeOptions = dictionary?.contact?.projectTypes || [
    { label: language === "fr" ? "Site Web d'Entreprise" : "Business Website", value: "Business Website" },
    { label: language === "fr" ? "Boutique E-Commerce" : "E-Commerce Storefront", value: "E-Commerce" },
    { label: language === "fr" ? "Application Web sur Mesure" : "Custom Web Application", value: "Custom Business Application" },
    { label: language === "fr" ? "Tableau de Bord / Outil d'Analyse" : "Dashboard / Analytics Tool", value: "Dashboard / Internal Tool" },
    { label: language === "fr" ? "Autre demande professionnelle" : "Other Business Inquiry", value: "Other Business Inquiry" },
    { label: language === "fr" ? "Collaboration / Autre Demande" : "General Inquiry / Collaboration", value: "Collaboration" }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = language === "fr" ? "Le nom est requis" : "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === "fr" ? "Le nom doit comporter au moins 2 caractères" : "Name must be at least 2 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = language === "fr" ? "L'adresse e-mail est requise" : "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "fr" ? "Veuillez entrer une adresse e-mail valide" : "Please enter a valid email address";
    }
    if (!formData.projectType) {
      newErrors.projectType = language === "fr" ? "Veuillez sélectionner une catégorie" : "Please select a project category";
    }
    if (!formData.message.trim()) {
      newErrors.message = language === "fr" ? "Veuillez entrer les détails de votre projet" : "Please enter your project details";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = language === "fr" ? "Le message doit comporter au moins 10 caractères" : "Message must be at least 10 characters";
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
        trackEvent("FORM_SUBMIT_SUCCESS", { source: "contact_form", projectType: formData.projectType });
        setStatus("success");
        // Reset form data only on confirmed success
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("manssouriyoussef33@gmail.com");
      setCopiedEmail(true);
      trackEvent("EMAIL_COPY", { source: "contact_direct" });
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = "manssouriyoussef33@gmail.com";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedEmail(true);
      trackEvent("EMAIL_COPY", { source: "contact_direct" });
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const whatsAppPrefilledMsg = encodeURIComponent(t("contact.whatsAppMessage"));
  const whatsAppUrl = `https://wa.me/212656682813?text=${whatsAppPrefilledMsg}`;

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
            07 / {t("contact.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("contact.heading")}
          </h2>
          <p className="text-base sm:text-lg text-[#242222]/80 font-normal leading-relaxed">
            {t("contact.subheading")}
          </p>
        </div>

        {/* 3-Step Process: What Happens Next */}
        <div className="mb-10 sm:mb-12 p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-5 font-bold">
            {t("contact.nextSteps.badge")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 border-l-2 border-[#A65F4B] pl-4">
              <span className="text-xs font-mono text-[#A65F4B] font-bold">
                {t("contact.nextSteps.step1.number") || "01"}
              </span>
              <h3 className="text-base font-bold text-[#242222] tracking-tight">
                {t("contact.nextSteps.step1.title")}
              </h3>
              <p className="text-xs sm:text-sm text-[#242222]/80 leading-relaxed">
                {t("contact.nextSteps.step1.description")}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#A65F4B] pl-4">
              <span className="text-xs font-mono text-[#A65F4B] font-bold">
                {t("contact.nextSteps.step2.number") || "02"}
              </span>
              <h3 className="text-base font-bold text-[#242222] tracking-tight">
                {t("contact.nextSteps.step2.title")}
              </h3>
              <p className="text-xs sm:text-sm text-[#242222]/80 leading-relaxed">
                {t("contact.nextSteps.step2.description")}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#A65F4B] pl-4">
              <span className="text-xs font-mono text-[#A65F4B] font-bold">
                {t("contact.nextSteps.step3.number") || "03"}
              </span>
              <h3 className="text-base font-bold text-[#242222] tracking-tight">
                {t("contact.nextSteps.step3.title")}
              </h3>
              <p className="text-xs sm:text-sm text-[#242222]/80 leading-relaxed">
                {t("contact.nextSteps.step3.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Form Side (Primary) */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#A65F4B]/15 border border-[#A65F4B] flex items-center justify-center mx-auto text-[#A65F4B]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#242222]">{t("contact.form.successTitle")}</h3>
                <p className="text-[#242222]/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                  {t("contact.form.successMessage")}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#A65F4B] hover:text-[#3A171C] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
                >
                  <span>{t("contact.form.sendAnother") || (language === "fr" ? "Envoyer un autre message" : "Send Another Inquiry")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
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
                    id="contact-name"
                    name="name"
                    label={t("contact.form.name")}
                    placeholder={t("contact.form.namePlaceholder")}
                    value={formData.name}
                    required
                    aria-required="true"
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    error={errors.name}
                    disabled={status === "submitting"}
                  />
                  <Input
                    id="contact-email"
                    name="email"
                    label={t("contact.form.email")}
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={formData.email}
                    required
                    aria-required="true"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    error={errors.email}
                    disabled={status === "submitting"}
                  />
                </div>

                <Select
                  id="contact-project-type"
                  name="projectType"
                  label={t("contact.form.projectType")}
                  placeholder={t("contact.form.selectProjectType")}
                  options={projectTypeOptions}
                  value={formData.projectType}
                  required
                  aria-required="true"
                  onChange={(e) => {
                    setFormData({ ...formData, projectType: e.target.value });
                    if (errors.projectType) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.projectType;
                        return next;
                      });
                    }
                  }}
                  error={errors.projectType}
                  disabled={status === "submitting"}
                />

                <Textarea
                  id="contact-message"
                  name="message"
                  label={t("contact.form.message")}
                  placeholder={t("contact.form.messagePlaceholder")}
                  value={formData.message}
                  required
                  aria-required="true"
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.message;
                        return next;
                      });
                    }
                  }}
                  error={errors.message}
                  disabled={status === "submitting"}
                  rows={5}
                />

                {status === "error" && (
                  <div className="p-4 rounded-xs bg-[#3A171C]/5 border border-[#A65F4B]/40 text-[#3A171C] text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#A65F4B]" />
                      <span>{t("contact.form.errorTitle")}</span>
                    </div>
                    <p className="text-[#3A171C]/90 leading-relaxed">
                      {serverErrorMsg || t("contact.form.errorMessage")}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#3A171C] text-[#F3EFEA] px-7 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-colors disabled:opacity-50 active:scale-[0.98] cursor-pointer"
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

                {/* Contact Form Reassurance */}
                <div className="pt-4 border-t border-[#DED6CC]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-[#242222]/75">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#A65F4B] shrink-0" aria-hidden="true" />
                    <span>{t("contact.reassurance.fastResponse")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A65F4B] shrink-0" aria-hidden="true" />
                    <span>{t("contact.reassurance.confidential")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#A65F4B] shrink-0" aria-hidden="true" />
                    <span>{t("contact.reassurance.directAccess")}</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Direct Channels Highlight Card (Secondary) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-6 shadow-xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C47D68]">
                {t("contact.directContact")}
              </h3>

              <div className="space-y-5 text-xs">
                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium mb-1">{t("contact.phone")}</span>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("WHATSAPP_CLICK", { source: "contact", destination: "whatsapp" });
                    }}
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-semibold text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    +212 6 56 68 28 13 ({t("contact.whatsAppCTA")})
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" />
                  </a>
                </div>

                <div>
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium mb-1">{t("contact.email")}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href="mailto:manssouriyoussef33@gmail.com"
                      aria-label="Send email to manssouriyoussef33@gmail.com"
                      onClick={() => {
                        trackEvent("EMAIL_CLICK", { source: "contact_direct", destination: "email" });
                      }}
                      className="text-[#F3EFEA] hover:text-[#A65F4B] font-bold text-sm transition-colors break-all inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
                    >
                      manssouriyoussef33@gmail.com
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={copiedEmail ? (language === "fr" ? "Adresse e-mail copiée dans le presse-papiers" : "Email address copied to clipboard") : (language === "fr" ? "Copier l'adresse e-mail" : "Copy email address")}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#F3EFEA]/10 hover:bg-[#F3EFEA]/20 border border-[#DED6CC]/20 text-[11px] font-mono font-medium text-[#DED6CC] hover:text-[#F3EFEA] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-[#C47D68]" aria-hidden="true" />
                          <span className="text-[#C47D68] font-bold" role="status" aria-live="polite">
                            {language === "fr" ? "Copié !" : "Copied!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#DED6CC]/80" aria-hidden="true" />
                          <span>{language === "fr" ? "Copier" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DED6CC]/15">
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium mb-1">{t("contact.linkedin")}</span>
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
                  <span className="text-[#DED6CC]/70 block uppercase font-mono font-medium mb-1">{t("contact.github")}</span>
                  <a
                    href="https://github.com/youssefmanssouri"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("GITHUB_CLICK", { source: "contact" });
                    }}
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    youssefmanssouri
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
