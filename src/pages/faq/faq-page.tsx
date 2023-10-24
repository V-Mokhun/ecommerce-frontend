import { FAQ_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container } from "@/shared/ui";

interface FaqPageProps {}

export const FaqPage = ({}: FaqPageProps) => {
  return (
    <section className="pb-6">
      <Container>
        <Breadcrumbs links={[{ label: "FAQs", route: FAQ_ROUTE }]} />
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-6 md:mb-8">
            <img
              className="rounded-sm md:rounded-lg object-cover max-h-[200px] xs:max-h-[250px] md:max-h-[450px] w-full"
              src="/images/faq.jpeg"
              alt="FAQs"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 text-sm md:text-xl lg:text-3xl font-medium left-2 md:left-4 lg:left-8 max-w-[180px] text-center xs:max-w-none">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
};
