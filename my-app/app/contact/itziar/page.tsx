export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-10 shadow-lg">
        <h1 className="mb-2 text-center text-4xl font-bold text-zinc-900">
          Formulario de contacto
        </h1>

        <p className="mb-8 text-center text-zinc-500">
          Completa el formulario para ponerte en contacto
        </p>

        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="mb-2 block font-medium text-zinc-800">
              Nombre *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={50}
              autoComplete="name"
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium text-zinc-800">
              Correo electrónico *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nombre@email.com"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block font-medium text-zinc-800">
              Asunto
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              maxLength={100}
              placeholder="Motivo del mensaje"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-medium text-zinc-800">
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={5}
              maxLength={500}
              placeholder="Escribe aquí tu mensaje"
              className="w-full resize-none rounded-lg border border-zinc-300 p-3 outline-none transition focus:border-black focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-black p-4 font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
          >
            Enviar mensaje
          </button>
        </form>
      </section>
    </main>
  );
}