import Card from "@/components/ui/Card";

const quickStats = [
  {
    label: "Meals Today",
    value: "2 / 3",
    sub: "1 remaining",
    emoji: "🍗",
  },
  {
    label: "Last Weight",
    value: "2 days ago",
    sub: "8.2 kg",
    emoji: "⚖️",
  },
  {
    label: "Next Vaccine",
    value: "14 days",
    sub: "DHPP booster",
    emoji: "💉",
  },
];

const quickActions = [
  { label: "Log Weight", emoji: "⚖️", color: "bg-amber-50 text-amber-700" },
  { label: "Log Meal", emoji: "🍗", color: "bg-yellow-50 text-yellow-700" },
  { label: "Add Milestone", emoji: "🏆", color: "bg-orange-50 text-orange-700" },
  { label: "View Health", emoji: "❤️", color: "bg-red-50 text-red-700" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero / Header */}
      <header className="bg-amber-400 px-5 pt-12 pb-8 md:px-8">
        <div className="mx-auto max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-900 opacity-75">
            Welcome back
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            PuppyGuide
          </h1>
          <p className="mt-1 text-amber-100 text-base">
            Your golden companion&apos;s daily tracker
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 pb-12 md:px-8">
        {/* Puppy Profile Card */}
        <div className="-mt-6">
          <Card className="flex items-center gap-4 p-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-4xl">
              🐾
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-800">Buddy</h2>
              <p className="text-sm text-amber-600 font-medium">Golden Retriever</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <span className="text-base">🗓</span>
                  <span>4 months</span>
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <span className="text-base">⚖️</span>
                  <span>8.2 kg</span>
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <section className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Quick Stats
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat) => (
              <Card key={stat.label} className="flex flex-col items-center gap-1 p-3 text-center">
                <span className="text-2xl">{stat.emoji}</span>
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 leading-tight">{stat.label}</span>
                <span className="text-xs text-amber-500 leading-tight">{stat.sub}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.label}
                onClick={() => {}}
                className={`flex flex-col items-center gap-2 py-5 ${action.color}`}
              >
                <span className="text-3xl">{action.emoji}</span>
                <span className="text-sm font-semibold">{action.label}</span>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
