'use client';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        {/* Logo / App name */}
        <span className="text-xl font-bold text-amber-600 tracking-tight">PuppyGuide</span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
          <span className="text-sm font-semibold text-amber-600 select-none">B</span>
        </div>
      </div>
    </header>
  );
}
