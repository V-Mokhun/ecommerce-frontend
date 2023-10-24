import { ABOUT_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container } from "@/shared/ui";

interface AboutPageProps {}

export const AboutPage = ({}: AboutPageProps) => {
  return (
    <section className="pb-6">
      <Container>
        <Breadcrumbs links={[{ label: "About us", route: ABOUT_ROUTE }]} />
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-6">
            <img
              className="rounded-lg object-cover max-h-[200px] md:max-h-[400px] w-full"
              src="/images/about.jpg"
              alt="About Us"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 md:sr-only text-2xl font-medium text-white right-4">
              About Us
            </h1>
          </div>
          <div className="space-y-6 text-base md:text-lg lg:text-xl font-light [&>p]:text-sm [&>p]:md:text-lg [&>p]:lg:text-xl [&>h2]:font-medium [&>h3]:font-medium [&>h4]:font-medium [&>h5]:font-medium [&>h6]:font-medium">
            <p>
              Ecommerce is an innovative online store that offers a diverse
              selection of digital gadgets, available for purchase in both cash
              and installment options. Embodying the motto "Join the digital
              revolution today" the website not only provides a seamless
              shopping experience but also features a captivating blog section
              filled with insightful reviews, articles, and videos about
              cutting-edge technology and digital gadgets. Users can actively
              engage with the content through comments and a question-answer
              section, fostering a dynamic community of tech enthusiasts.
            </p>
            <h2>Ecommerce Meaning</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quibusdam quisquam sed dolorum corporis! Quo magnam, placeat
              dolorem quasi sequi commodi dolores voluptas voluptatem saepe,
              nisi, ipsa totam maxime est! Non?
            </p>
            <h2>Some of Ecommerce&apos;s impressive features:</h2>
            <ul>
              <li>
                Diverse digital gadgets for purchase in cash or installments
              </li>
              <li>
                A blog with reviews and articles about the latest technology and
                gadgets
              </li>
              <li>User comments and Q&A section for community interaction</li>
              <li>
                Represents a tech-savvy "home" with all necessary technology
              </li>
              <li>Easy-to-use interface for a great user experience</li>
              <li>Consistent and visually appealing design</li>
              <li>A hub for tech enthusiasts to connect and share insights</li>
              <li>Helps users make informed purchase decisions</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
