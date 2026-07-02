const CAMPO_CLASES =
  "border border-ink/20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest";

export function Input({ className = "", ...props }) {
  return <input className={`${CAMPO_CLASES} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`${CAMPO_CLASES} ${className}`} {...props} />;
}
