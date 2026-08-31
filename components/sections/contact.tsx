"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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

  const projectTypeOptions = dictionary?.contact?.projectTypes || [
    { label: language === "fr" ? "Site Web d'Entreprise" : "Business Website", value: "Business Website" },
    { label: language === "fr" ? "E-Commerce" : "E-Commerce", value: "E-Commerce" },
    { label: language === "fr" ? "Application Métier sur Mesure" : "Custom Business Application", value: "Custom Business Application" },
    { label: language === "fr" ? "Tableau de Bord / Outil Interne" : "Dashboard / Internal Tool", value: "Dashboard / Internal Tool" },
    { label: language === "fr" ? "Autre" : "Other", value: "Other" }
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
    <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Form Side (Primary) */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="p-8 rounded-xs bg-[#F3EFEA] border border-[#DED6CC] text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#A65F4B]/15 border border-[#A65F4B] flex items-center justify-center mx-auto text-[#A65F4B]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#242222]">{t("contact.form.successTitle")}</h3>
                <p className="text-[#242222]/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                  {t("contact.form.successMessage")}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs font-mono text-[#A65F4B] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
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
                    label={t("contact.form.email")}
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={formData.email}
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
                  label={t("contact.form.projectType")}
                  placeholder={t("contact.form.selectProjectType")}
                  options={projectTypeOptions}
                  value={formData.projectType}
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
                  label={t("contact.form.message")}
                  placeholder={t("contact.form.messagePlaceholder")}
                  value={formData.message}
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
              </form>
            )}
          </div>

          {/* Direct Channels Highlight Card (Secondary) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-6 shadow-xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A65F4B]">
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
                  <a
                    href="mailto:manssouriyoussef33@gmail.com"
                    onClick={() => {
                      trackEvent("EMAIL_CLICK", { source: "contact_direct", destination: "email" });
                    }}
                    className="text-[#F3EFEA] hover:text-[#A65F4B] font-bold text-sm transition-colors break-all inline-flex items-center gap-1.5"
                  >
                    manssouriyoussef33@gmail.com
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A65F4B]" />
                  </a>
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
