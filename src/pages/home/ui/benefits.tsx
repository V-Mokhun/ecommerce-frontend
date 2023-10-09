import { cn } from "@/shared/lib";
import { Container, Icon, Section } from "@/shared/ui";

interface BenefitsProps {}

const BENFEITS_ITEMS = [
  {
    text: "Latest and Greatest Tech",
    icon: <Icon name="benefits-1" className="w-7 md:w-10 shrink-0 h-6 md:h-8" />,
  },
  {
    text: "Guarantee",
    icon: <Icon name="benefits-2" className="w-7 md:w-10 shrink-0 h-6 md:h-11" />,
  },
  {
    text: "Free Shipping over 1000$",
    icon: <Icon name="benefits-3" className="w-9 md:w-14 shrink-0 h-8 md:h-12" />,
  },
  {
    text: "24/7 Support",
    icon: <Icon name="benefits-4" className="w-7 md:w-10 shrink-0 h-6 md:h-11" />,
  },
];

export const Benefits = ({}: BenefitsProps) => {
  return (
    <Section>
      <Container>
        <h3 className="sr-only">Benefits</h3>
        <ul className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          {BENFEITS_ITEMS.map((item, i, arr) => (
            <li
              className={cn(
                "flex md:justify-center items-center md:flex-[0_1_calc(25%-8px)] gap-2 md:gap-4",
                i === 0 && "md:justify-start",
                i === arr.length - 1 && "md:justify-end"
              )}
              key={item.text}
            >
              {item.icon}
              <span className="text-sm font-medium md:font-light md:text-base lg:text-lg">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
