export function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2.5 rounded-xl text-[11px] lg:text-[13px]">
      {message}
    </div>
  );
}
