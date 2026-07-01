const CAMPO_CLASES = "border border-gray-300 rounded-md px-3 py-2";

export function Input({ className = "", ...props }) {
  return <input className={`${CAMPO_CLASES} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`${CAMPO_CLASES} ${className}`} {...props} />;
}
