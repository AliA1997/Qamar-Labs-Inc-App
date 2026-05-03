
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-light leading-relaxed text-body-color dark:text-body-color-dark last:mb-0">
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="my-3 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm font-light leading-relaxed text-body-color dark:text-body-color-dark"
        >
          <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
