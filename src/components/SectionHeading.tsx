import Reveal from "./Reveal";

type Props = {
  tag: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ tag, title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">
        {tag}
      </span>
      <h2 className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-white/50">{subtitle}</p>}
    </Reveal>
  );
}
