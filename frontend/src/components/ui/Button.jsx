const VARIANTES = {
  primario: "bg-forest text-cream hover:bg-forest-dark",
  secundario: "border border-ink/20 text-ink hover:bg-ink/5",
  peligro: "border border-red-300 text-red-600 hover:bg-red-50",
};

const TAMANOS = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
};

export function botonClases(variante = "primario", tamano = "md") {
  return `rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTES[variante]} ${TAMANOS[tamano]}`;
}

export default function Button({ variante = "primario", tamano = "md", className = "", ...props }) {
  return <button className={`${botonClases(variante, tamano)} ${className}`} {...props} />;
}
