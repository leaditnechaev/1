type ThankYouPanelProps = {
  onRestart: () => void;
};

export function ThankYouPanel({ onRestart }: ThankYouPanelProps) {
  return (
    <section className="rounded-[12px] border border-formula-line bg-white p-5 shadow-soft">
      <h3 className="text-2xl font-semibold text-formula-ink">
        Заявка отправлена
      </h3>
      <p className="mt-3 text-sm leading-6 text-formula-muted">
        Спасибо. Мы получили ваш запрос. Специалист свяжется с вами и подберет
        подходящие варианты.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex justify-center rounded-full bg-formula-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-formula-accentDark"
        >
          Начать заново
        </button>
      </div>
    </section>
  );
}
