import { GET_CONTACTS } from "@/shared/api";
import { CONTACT_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container, Icon } from "@/shared/ui";
import { useQuery } from "@apollo/client";

interface ContactPageProps {}

export const ContactPage = ({}: ContactPageProps) => {
  const { data } = useQuery(GET_CONTACTS);
  const contacts = data ? data.allContact[0] : null;

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
              {contacts?.address}
            </p>
          </li>
          <li className="flex flex-col items-center gap-1 md:gap-2 text-center">
            <Icon
              name="sms"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 text-primary"
            />
            <h2 className="font-medium text-sm md:text-lg lg:text-xl">Email</h2>
            <a
              href={`mailto:${contacts?.email}`}
              className="text-xxs md:text-sm lg:text-base font-medium md:font-light text-gray-600 transition-colors hover:text-primary"
            >
              {contacts?.email}
            </a>
          </li>
          <li className="flex flex-col items-center gap-1 md:gap-2 text-center">
            <Icon
              name="call"
              className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 text-primary"
            />
            <h2 className="font-medium text-sm md:text-lg lg:text-xl">Phone</h2>
            <a
              href={`tel:${contacts?.phoneShort}`}
              className="text-xxs md:text-sm lg:text-base font-medium md:font-light text-gray-600 transition-colors hover:text-primary"
            >
              {contacts?.phone}
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
};
