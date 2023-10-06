import { BLOG_ROUTE, HOME_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { useMediaQuery } from "@/shared/lib/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
  Icon,
} from "@/shared/ui";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");

  return (
    <footer>
      <div className="bg-primary-900 py-4 md:py-8 lg:py-12 bg-gradient-to-t from-primary-600 to-primary-900">
        <Container>
          <Accordion
            type="multiple"
            defaultValue={isMd ? ["company", "info", "contact"] : []}
            disabled={isMd}
            asChild
          >
            <div className="flex items-start justify-between gap-4">
              <AccordionItem value="company">
                <AccordionTrigger
                  className={cn(
                    "text-white font-medium py-0 mb-2 md:[&>svg]:hidden"
                  )}
                >
                  Company
                </AccordionTrigger>
                <AccordionContent asChild>
                  <ul className="space-y-2 text-gray-300 font-light text-sm md:text-base">
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={HOME_ROUTE}
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={BLOG_ROUTE}
                      >
                        Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={HOME_ROUTE}
                      >
                        Returns
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={HOME_ROUTE}
                      >
                        Order Status
                      </NavLink>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="info">
                <AccordionTrigger
                  className={cn(
                    "text-white font-medium py-0 mb-2 md:[&>svg]:hidden"
                  )}
                >
                  Info
                </AccordionTrigger>
                <AccordionContent asChild>
                  <ul className="space-y-2 text-gray-300 font-light text-sm md:text-base">
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={HOME_ROUTE}
                      >
                        How it works?
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={HOME_ROUTE}
                      >
                        Our Promises
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"hover:text-white transition-colors"}
                        to={BLOG_ROUTE}
                      >
                        Blog
                      </NavLink>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger
                  className={cn(
                    "text-white font-medium py-0 mb-2 md:[&>svg]:hidden"
                  )}
                >
                  Contact us
                </AccordionTrigger>
                <AccordionContent asChild>
                  <ul className="space-y-2 text-gray-300 font-light text-sm md:text-base">
                    <li className="inline-flex items-center gap-1">
                      <Icon name="location" className="w-5 h-5" />
                      <span>123 Main Street, Anytown,USA</span>
                    </li>
                    <li>
                      <a
                        className={
                          "hover:text-white transition-colors inline-flex items-center gap-1"
                        }
                        href="tel:15551234567"
                      >
                        <Icon name="call" className="w-5 h-5" />
                        <span>+1 (555) 123-4567</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={
                          "hover:text-white transition-colors inline-flex items-center gap-1"
                        }
                        href="mailto:ecommerce@gmail.com"
                      >
                        <Icon name="sms-edit" className="w-5 h-5" />
                        <span>ecommerce@gmail.com</span>
                      </a>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <div className="">
                <p className="text-white font-medium mb-2 md:mb-4">
                  Sign up for News and updates
                </p>
                <div className="relative">
                  <input
                    type="email"
                    className="text-white font-light placeholder:text-gray-300 py-2 md:py-3 px-9 md:px-10 w-full border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="E-mail Address"
                  />
                  <Icon
                    name="user"
                    className="w-5 h-5 md:w-6 md:h-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-white"
                  />
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 absolute top-1/2 right-3 transform -translate-y-1/2 text-white" />
                </div>
              </div>
            </div>
          </Accordion>
        </Container>
      </div>
      <div className="bg-primary-900 py-2 md:py-4">
        <Container>
          <div className="flex justify-between items-center gap-2 text-xs font-medium text-gray-300">
            <p className="flex items-center gap-1">
              <Icon name="copyright" className="w-6 h-6" />{" "}
              <span>{new Date().getFullYear()} Ecommerce</span>
            </p>
            <ul className="flex items-center gap-6">
              <li>
                <NavLink
                  className=" hover:text-white transition-colors"
                  to={HOME_ROUTE}
                >
                  Cookie Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-white transition-colors"
                  to={HOME_ROUTE}
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-white transition-colors"
                  to={HOME_ROUTE}
                >
                  Terms and Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-white transition-colors"
                  to={HOME_ROUTE}
                >
                  Imprint
                </NavLink>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
};
