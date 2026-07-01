export default function Spinner({ texto = "Cargando..." }) {
  return (
    <div className="flex items-center gap-3 p-6 text-gray-500">
      <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      <span>{texto}</span>
    </div>
  );
}
