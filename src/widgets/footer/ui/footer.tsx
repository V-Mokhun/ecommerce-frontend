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
import { ChevronRight, ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FooterSocials } from "./footer-socials";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="bg-primary-900 py-4 md:py-8 lg:py-12 bg-gradient-to-t from-primary-600 to-primary-900">
        <Container>
          <div className="flex flex-col">
            <Accordion
              type="multiple"
              defaultValue={isMd ? ["company", "info", "contact"] : []}
              disabled={isMd}
              asChild
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:mb-3">
                <AccordionItem
                  className="w-full max-w-xs md:w-auto md:max-w-none"
                  value="company"
                >
                  <AccordionTrigger
                    className={cn(
                      "text-white font-medium py-0 mb-4 md:mb-2 md:[&>svg]:hidden"
                    )}
                  >
                    Company
                  </AccordionTrigger>
                  <AccordionContent asChild>
                    <ul className="space-y-4 md:space-y-2 text-gray-300 font-light text-sm md:text-base">
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
                <AccordionItem
                  className="w-full max-w-xs md:w-auto md:max-w-none"
                  value="info"
                >
                  <AccordionTrigger
                    className={cn(
                      "text-white font-medium py-0 mb-4 md:mb-2 md:[&>svg]:hidden"
                    )}
                  >
                    Info
                  </AccordionTrigger>
                  <AccordionContent asChild>
                    <ul className="space-y-4 md:space-y-2 text-gray-300 font-light text-sm md:text-base">
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
                <AccordionItem
                  className="w-full max-w-xs md:w-auto md:max-w-none"
                  value="contact"
                >
                  <AccordionTrigger
                    className={cn(
                      "text-white font-medium py-0 mb-4 md:mb-2 md:[&>svg]:hidden"
                    )}
                  >
                    Contact us
                  </AccordionTrigger>
                  <AccordionContent asChild>
                    <ul className="space-y-4 md:space-y-2 text-gray-300 font-light text-sm md:text-base">
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
                <div className="mb-6 md:mb-0 -order-1 md:order-none">
                  <p className="text-white font-medium mb-3 md:mb-4">
                    Sign up for News and updates
                  </p>
                  <div className="relative md:mb-4">
                    <input
                      type="email"
                      className="text-white font-light placeholder:text-gray-300 py-2 md:py-3 px-9 md:px-10 w-full border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm md:text-base"
                      placeholder="E-mail Address"
                    />
                    <Icon
                      name="user"
                      className="w-5 h-5 md:w-6 md:h-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-white"
                    />
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 absolute top-1/2 right-3 transform -translate-y-1/2 text-white" />
                  </div>
                  {isMd && <FooterSocials />}
                </div>
              </div>
            </Accordion>
            <div className="flex justify-end -order-1 md:order-none mb-4 md:mb-0">
              <button
                type="button"
                onClick={scrollToTop}
                className="text-gray-900 w-10 h-10 rounded-full bg-primary-50 hover:bg-primary-100 transition-colors inline-flex justify-center items-center"
              >
                <ChevronUp className="w-6 h-6 text-current" />
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-primary-900 py-2 md:py-4">
        <Container>
          <div className="flex justify-between items-center gap-2 text-xs font-medium text-gray-300">
            <p className="flex items-center gap-1">
              <Icon name="copyright" className="w-6 h-6" />{" "}
              <span>{new Date().getFullYear()} Ecommerce</span>
            </p>
            {isMd ? (
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
            ) : (
              <FooterSocials />
            )}
          </div>
        </Container>
      </div>
    </footer>
  );
};
