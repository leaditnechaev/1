type QuickRepliesProps = {
  replies: string[];
  disabled?: boolean;
  onSelect: (reply: string) => void;
};

export function QuickReplies({ replies, disabled, onSelect }: QuickRepliesProps) {
  if (!replies.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-2">
      {replies.map((reply) => (
        <button
          key={reply}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply)}
          className="min-h-11 rounded-full border border-formula-line bg-white px-3 py-2.5 text-center text-sm font-semibold leading-snug text-formula-ink shadow-sm transition hover:-translate-y-0.5 hover:border-formula-ink hover:bg-formula-ink hover:text-white focus:outline-none focus:ring-4 focus:ring-formula-ink/10 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
