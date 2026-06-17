"use client";

import { FormEvent, useMemo, useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type StoredMessage = FormData & {
  id: number;
  createdAt: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  } else if (values.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!values.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Introduce un correo valido.";
  }

  if (!values.message.trim()) {
    errors.message = "El mensaje es obligatorio.";
  } else if (values.message.trim().length < 1) {
    errors.message = "El mensaje debe tener al menos 1 caracter.";
  }

  return errors;
}

export default function ThisPedrito1ContactFormPage() {
  const [values, setValues] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [, setStoredMessages] = useState<StoredMessage[]>([]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  }

  function handleChange(field: keyof FormData, value: string) {
    const updated = { ...values, [field]: value };
    setValues(updated);

    if (touched[field]) {
      setErrors(validate(updated));
    }

  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: FormData = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    const nextErrors = validate(normalized);

    setValues(normalized);
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(nextErrors);

   

    setStoredMessages((prev) => [
      {
        ...normalized,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setValues(initialForm);
    setTouched({});
    setErrors({});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-10 font-sans dark:bg-black sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        
        <h1 className="text-3xl font-black leading-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Formulario de contacto de thispedrito1
        </h1>
        

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:shadow-[0_0_0_3px_rgba(113,113,122,0.2)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="Tu nombre"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {touched.name && errors.name ? (
                <p id="name-error" className="text-sm font-medium text-red-600">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:shadow-[0_0_0_3px_rgba(113,113,122,0.2)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="tu@email.com"
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {touched.email && errors.email ? (
                <p id="email-error" className="text-sm font-medium text-red-600">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Asunto
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={() => handleBlur("subject")}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:shadow-[0_0_0_3px_rgba(113,113,122,0.2)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="Motivo de tu mensaje"
              aria-invalid={Boolean(touched.subject && errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {touched.subject && errors.subject ? (
              <p id="subject-error" className="text-sm font-medium text-red-600">
                {errors.subject}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              rows={6}
              className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:shadow-[0_0_0_3px_rgba(113,113,122,0.2)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="Escribe aqui tu mensaje..."
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {touched.message && errors.message ? (
              <p id="message-error" className="text-sm font-medium text-red-600">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Revisar formulario
            </button>
          </div>

          {hasErrors ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Hay campos pendientes de corregir.</p>
          ) : null}
        </form>

      </section>
    </main>
  );
}
