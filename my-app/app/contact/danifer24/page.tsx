
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({ name, email, message });

        setName("");
        setEmail("");
        setMessage("");
        router.push("/");
    };

    return (
        <main className="min-h-screen bg-white px-4 py-12 font-sans text-zinc-900">
            <section className="mx-auto w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-semibold tracking-tight">Contacta con nosotros</h1>
                <p className="mt-2 text-sm text-zinc-600">Te responderemos lo antes posible.</p>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-800">
                            Nombre
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-800">
                            Correo
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-800">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            required
                            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                        Enviar
                    </button>
                </form>
            </section>
        </main>
    );
}