import { Container } from "@/components/ui/container";

const stats = [
  { value: "5K – 10K", label: "Students taught" },
  { value: "150+", label: "Vetted teachers" },
  { value: "4.9 / 5", label: "Average class rating" },
  { value: "5+", label: "Countries represented" },
];

export function Stats() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-3xl text-meridian sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
