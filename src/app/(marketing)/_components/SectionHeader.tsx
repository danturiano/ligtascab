interface SectionHeaderProps {
  title: string;
  description: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  description,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h3 className="font-bold text-primary md:text-2xl">{title}</h3>
      <div className="space-y-2 tracking-tight md:space-y-6">
        <h4 className="text-xl font-semibold leading-tight text-pretty md:text-5xl">
          {subtitle}
        </h4>
        <h5 className="leading-tight font-medium text-muted text-sm text-pretty md:text-balance md:text-xl">
          {description}
        </h5>
      </div>
    </div>
  );
}
