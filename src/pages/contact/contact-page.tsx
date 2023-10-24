import { CONTACT_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container, Icon } from "@/shared/ui";

interface ContactPageProps {}

export const ContactPage = ({}: ContactPageProps) => {
  return (
    <section className="pb-6">
      <Container>
        <Breadcrumbs links={[{ label: "Contact us", route: CONTACT_ROUTE }]} />
        <ul className="flex justify-between items-center gap-3 max-w-3xl mx-auto">
          <li className="flex flex-col items-center gap-1 md:gap-2 text-center">
            <Icon
              name="location"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 text-primary"
            />
            <h2 className="font-medium text-sm md:text-lg lg:text-xl">
              Office
            </h2>
            <p className="text-xxs md:text-sm lg:text-base font-medium md:font-light text-gray-600">
              123 Main Street, <br /> Anytown,USA
            </p>
          </li>
          <li className="flex flex-col items-center gap-1 md:gap-2 text-center">
            <Icon
              name="sms"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 text-primary"
            />
            <h2 className="font-medium text-sm md:text-lg lg:text-xl">Email</h2>
            <a
              href="mailto:ecommerce@gmail.com"
              className="text-xxs md:text-sm lg:text-base font-medium md:font-light text-gray-600 transition-colors hover:text-primary"
            >
              ecommerce@gmail.com
            </a>
          </li>
          <li className="flex flex-col items-center gap-1 md:gap-2 text-center">
            <Icon
              name="call"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 text-primary"
            />
            <h2 className="font-medium text-sm md:text-lg lg:text-xl">Phone</h2>
            <a
              href="tel:+15551234567"
              className="text-xxs md:text-sm lg:text-base font-medium md:font-light text-gray-600 transition-colors hover:text-primary"
            >
              +1 (555) 123-4567
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
};
