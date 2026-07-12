"use client";

export default function NewsletterArticulo() {
  return (
    <div
      id="newsletter-articulo"
      className="rounded-xl px-6 py-6"
      style={{ background: "#ECEAE5", border: "0.5px solid #DEDBD4" }}
    >
      <p
        className="font-sans mb-4"
        style={{ fontSize: "15px", color: "#1f1e1d", lineHeight: 1.5 }}
      >
        Finanzas que importan, directo a tu bandeja.
      </p>
      <form
        className="flex gap-2.5"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Tu correo electrónico"
          required
          className="font-sans flex-1 min-w-0 px-4 py-2.5 rounded-lg"
          style={{
            background: "#F7F6F3",
            border:     "0.5px solid #DEDBD4",
            color:      "#1f1e1d",
            fontSize:   "14px",
            outline:    "none",
          }}
        />
        <button
          type="submit"
          className="font-sans font-semibold flex-shrink-0 px-5 py-2.5 rounded-lg"
          style={{
            background: "#3A57E8",
            color:      "#F7F6F3",
            fontSize:   "13px",
            cursor:     "pointer",
            border:     "none",
          }}
        >
          Suscribirse
        </button>
      </form>
      <p
        className="font-sans mt-3"
        style={{ fontSize: "11px", color: "#5F5E5A" }}
      >
        Sin spam. Darte de baja toma un clic.
      </p>
    </div>
  );
}
