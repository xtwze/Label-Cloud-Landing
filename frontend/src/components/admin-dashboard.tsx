"use client";

import Image from "next/image";
import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  SignOut,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

import styles from "@/app/admin/admin.module.css";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const enquiryStatuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"] as const;
type EnquiryStatus = (typeof enquiryStatuses)[number];
type StatusFilter = EnquiryStatus | "ALL";

type AdminSession = {
  authenticated: boolean;
  username: string;
};

type CsrfToken = {
  token: string;
  headerName: string;
};

type Enquiry = {
  id: string;
  contactName: string;
  labelName: string;
  email: string;
  phone: string;
  telegram: string;
  comment: string | null;
  status: EnquiryStatus;
  consentedAt: string;
  createdAt: string;
};

type EnquiryPage = {
  items: Enquiry[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

const statusLabels: Record<EnquiryStatus, string> = {
  NEW: "Новая",
  CONTACTED: "Связались",
  QUALIFIED: "В работе",
  CLOSED: "Закрыта",
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function normalizeTelegram(value: string) {
  return value.replace(/^@/, "");
}

async function requestCsrf(): Promise<CsrfToken> {
  const response = await fetch(`${apiBaseUrl}/api/admin/csrf`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Не удалось подготовить защищённый запрос");
  return response.json() as Promise<CsrfToken>;
}

export function AdminDashboard() {
  const [sessionState, setSessionState] = useState<"checking" | "anonymous" | "authenticated">("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryPage | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadEnquiries = useCallback(async (targetPage: number, targetFilter: StatusFilter) => {
    setIsLoading(true);
    setLoadError("");
    const params = new URLSearchParams({ page: String(targetPage), size: "25" });
    if (targetFilter !== "ALL") params.set("status", targetFilter);

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/enquiries?${params}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (response.status === 401) {
        setSessionState("anonymous");
        setEnquiries(null);
        return;
      }
      if (!response.ok) throw new Error("Не удалось загрузить заявки");
      setEnquiries(await response.json() as EnquiryPage);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Не удалось загрузить заявки");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/admin/session`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!active) return;
        if (response.ok) {
          setSessionState("authenticated");
        } else if (response.status === 401) {
          setSessionState("anonymous");
        } else {
          throw new Error();
        }
      } catch {
        if (active) {
          setLoginError("Backend недоступен. Проверьте, что он запущен на порту 8080.");
          setSessionState("anonymous");
        }
      }
    }

    void checkSession();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (sessionState === "authenticated") {
      const timeoutId = window.setTimeout(() => {
        void loadEnquiries(page, filter);
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [filter, loadEnquiries, page, sessionState]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const csrf = await requestCsrf();
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          [csrf.headerName]: csrf.token,
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 401) {
        setLoginError("Неверный логин или пароль.");
        return;
      }
      if (!response.ok) throw new Error("Не удалось войти в админку");
      const session = await response.json() as AdminSession;
      if (!session.authenticated) throw new Error("Не удалось создать сессию");
      setPassword("");
      setSessionState("authenticated");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Не удалось войти в админку");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      const csrf = await requestCsrf();
      await fetch(`${apiBaseUrl}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
        headers: { [csrf.headerName]: csrf.token },
      });
    } finally {
      setSessionState("anonymous");
      setEnquiries(null);
      setUsername("");
      setPassword("");
    }
  }

  async function updateStatus(id: string, status: EnquiryStatus) {
    setUpdatingId(id);
    setLoadError("");
    try {
      const csrf = await requestCsrf();
      const response = await fetch(`${apiBaseUrl}/api/admin/enquiries/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          [csrf.headerName]: csrf.token,
        },
        body: JSON.stringify({ status }),
      });
      if (response.status === 401) {
        setSessionState("anonymous");
        setEnquiries(null);
        return;
      }
      if (!response.ok) throw new Error("Не удалось обновить статус заявки");
      await loadEnquiries(page, filter);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Не удалось обновить статус заявки");
    } finally {
      setUpdatingId(null);
    }
  }

  if (sessionState === "checking") {
    return (
      <main className={styles.loadingPage} aria-live="polite">
        <div className={styles.loadingMark} />
        <p>Проверяем доступ</p>
      </main>
    );
  }

  if (sessionState === "anonymous") {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginPanel} aria-labelledby="admin-login-title">
          <Image
            className={styles.logo}
            src="/images/brand/labelcloud-logo.png"
            alt="LabelCloud"
            width={1972}
            height={354}
            priority
          />
          <div className={styles.loginCopy}>
            <h1 id="admin-login-title">Вход в админку</h1>
            <p>Закрытый раздел для работы с заявками.</p>
          </div>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <label>
              Логин
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label>
              Пароль
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {loginError && <p className={styles.error} role="alert">{loginError}</p>}
            <button className={styles.primaryButton} type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Входим..." : "Войти"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  const items = enquiries?.items ?? [];

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <Image
          className={styles.headerLogo}
          src="/images/brand/labelcloud-logo.png"
          alt="LabelCloud"
          width={1972}
          height={354}
          priority
        />
        <button className={styles.logoutButton} type="button" onClick={handleLogout}>
          <SignOut size={18} aria-hidden="true" />
          Выйти
        </button>
      </header>

      <section className={styles.workspace} aria-labelledby="enquiries-title">
        <div className={styles.pageHeading}>
          <div>
            <h1 id="enquiries-title">Заявки</h1>
            <p>{enquiries ? `${enquiries.totalElements} ${pluralizeEnquiries(enquiries.totalElements)}` : "Загружаем данные"}</p>
          </div>
          <button className={styles.refreshButton} type="button" onClick={() => loadEnquiries(page, filter)} disabled={isLoading}>
            <ArrowClockwise size={17} aria-hidden="true" />
            <span>{isLoading ? "Обновляем..." : "Обновить"}</span>
          </button>
        </div>

        <div className={styles.filters} aria-label="Фильтр по статусу">
          <FilterButton label="Все" active={filter === "ALL"} onClick={() => { setPage(0); setFilter("ALL"); }} />
          {enquiryStatuses.map((status) => (
            <FilterButton
              key={status}
              label={statusLabels[status]}
              active={filter === status}
              onClick={() => { setPage(0); setFilter(status); }}
            />
          ))}
        </div>

        {loadError && (
          <div className={styles.loadError} role="alert">
            <p>{loadError}</p>
            <button type="button" onClick={() => loadEnquiries(page, filter)}>Попробовать ещё раз</button>
          </div>
        )}

        {isLoading && !enquiries ? (
          <div className={styles.skeletonList} aria-label="Загрузка заявок">
            <div /><div /><div />
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Заявок пока нет</h2>
            <p>{filter === "ALL" ? "Новые обращения появятся здесь после отправки формы." : "В этом статусе пока нет заявок."}</p>
          </div>
        ) : (
          <div className={styles.enquiryList}>
            {items.map((enquiry) => (
              <article className={styles.enquiry} key={enquiry.id}>
                <div className={styles.enquiryMain}>
                  <div className={styles.enquiryTitle}>
                    <h2>{enquiry.labelName}</h2>
                    <span>{dateFormatter.format(new Date(enquiry.createdAt))}</span>
                  </div>
                  <p className={styles.contactName}>{enquiry.contactName}</p>
                  {enquiry.comment && <p className={styles.comment}>{enquiry.comment}</p>}
                </div>

                <div className={styles.contacts}>
                  <a href={`mailto:${enquiry.email}`}>{enquiry.email}<ArrowSquareOut size={15} aria-hidden="true" /></a>
                  <a href={`tel:${enquiry.phone}`}>{enquiry.phone}<ArrowSquareOut size={15} aria-hidden="true" /></a>
                  <a href={`https://t.me/${normalizeTelegram(enquiry.telegram)}`} target="_blank" rel="noreferrer">
                    {enquiry.telegram.startsWith("@") ? enquiry.telegram : `@${enquiry.telegram}`}
                    <ArrowSquareOut size={15} aria-hidden="true" />
                  </a>
                </div>

                <label className={styles.statusControl}>
                  Статус
                  <select
                    value={enquiry.status}
                    onChange={(event) => updateStatus(enquiry.id, event.target.value as EnquiryStatus)}
                    disabled={updatingId === enquiry.id}
                    data-status={enquiry.status}
                  >
                    {enquiryStatuses.map((status) => (
                      <option key={status} value={status}>{statusLabels[status]}</option>
                    ))}
                  </select>
                </label>
              </article>
            ))}
          </div>
        )}

        {enquiries && enquiries.totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Страницы заявок">
            <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0 || isLoading}>
              <ArrowLeft size={17} aria-hidden="true" /> Предыдущая
            </button>
            <span>{page + 1} из {enquiries.totalPages}</span>
            <button type="button" onClick={() => setPage((current) => current + 1)} disabled={page + 1 >= enquiries.totalPages || isLoading}>
              Следующая <ArrowRight size={17} aria-hidden="true" />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button className={active ? styles.filterActive : styles.filterButton} type="button" onClick={onClick} aria-pressed={active}>
      {label}
    </button>
  );
}

function pluralizeEnquiries(value: number) {
  const mod100 = value % 100;
  const mod10 = value % 10;
  if (mod100 >= 11 && mod100 <= 14) return "заявок";
  if (mod10 === 1) return "заявка";
  if (mod10 >= 2 && mod10 <= 4) return "заявки";
  return "заявок";
}
