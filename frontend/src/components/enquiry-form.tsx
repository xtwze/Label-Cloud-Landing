"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  labelName: z.string().trim().min(2, "Укажите название лейбла").max(150, "Не больше 150 символов"),
  phone: z.string().trim().min(7, "Укажите телефон").max(40, "Не больше 40 символов"),
  telegram: z.string().trim().min(2, "Укажите Telegram").max(100, "Не больше 100 символов"),
  website: z.string().max(0).optional(),
});

type EnquiryValues = z.infer<typeof schema>;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function reachGoal(goal: string) {
  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  if (!counterId || typeof window === "undefined" || !window.ym) return;
  window.ym(Number(counterId), "reachGoal", goal);
}

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (values: EnquiryValues) => {
    setServerError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/public/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "Не удалось отправить заявку");
      }
      setSubmitted(true);
      reachGoal("enquiry_success");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  };

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <CheckCircle size={42} weight="light" aria-hidden="true" />
        <h3>Заявка принята</h3>
        <p>Спасибо. Свяжемся с вами по указанным контактам.</p>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <Field label="Название лейбла" error={errors.labelName?.message} className="field-wide">
          <input autoComplete="organization" {...register("labelName")} />
        </Field>
        <Field label="Телефон" error={errors.phone?.message}>
          <input type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field label="Telegram" error={errors.telegram?.message}>
          <input autoComplete="off" placeholder="@username" {...register("telegram")} />
        </Field>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>Ваш сайт<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
      </div>
      {serverError && <p className="form-error" role="alert">{serverError}</p>}
      <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
      </button>
      <p className="form-legal">Нажимая кнопку, вы даёте <a href="/consent" target="_blank">согласие на обработку персональных данных</a> и принимаете <a href="/privacy" target="_blank">политику</a>.</p>
    </form>
  );
}

function Field({ label, error, children, className = "" }: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`form-field ${className}`}>
      <span>{label}</span>
      {children}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

declare global {
  interface Window {
    ym?: (counterId: number, method: string, goal?: string) => void;
  }
}
