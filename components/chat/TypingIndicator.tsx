export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1 rounded-[18px] rounded-bl-[6px] border border-formula-line bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-formula-muted">печатает</span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-formula-muted [animation-delay:-0.2s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-formula-muted [animation-delay:-0.1s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-formula-muted" />
        </span>
      </div>
    </div>
  );
}
