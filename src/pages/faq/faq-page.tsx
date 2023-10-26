import { GET_FAQ_TOPICS } from "@/shared/api";
import { FAQ_ROUTE } from "@/shared/consts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumbs,
  Container,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";

interface FaqPageProps {}

export const FaqPage = ({}: FaqPageProps) => {
  const { data } = useQuery(GET_FAQ_TOPICS);
  const topics = data?.allFaqTopic ?? [];

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
          {topics.length > 0 ? (
            <Tabs
              defaultValue={topics[0].name!}
              className="flex gap-6 flex-col md:flex-row"
            >
              <div>
                <h2 className="font-medium text-base md:text-lg lg:text-xl mb-3 md:mb-6">
                  Table of Contents
                </h2>
                <TabsList asChild>
                  <ul className="flex flex-col gap-2 md:gap-3 font-light text-sm md:text-base">
                    {topics.map((topic) => (
                      <li key={topic.name}>
                        <TabsTrigger value={topic.name!} key={topic.name}>
                          {topic.name}
                        </TabsTrigger>
                      </li>
                    ))}
                  </ul>
                </TabsList>
              </div>
              <div className="flex-1">
                {topics.map((topic) => (
                  <Accordion
                    defaultValue={[topic.items![0]!.title!]}
                    type="multiple"
                    key={topic.name}
                  >
                    <TabsContent value={topic.name!} key={topic.name}>
                      {topic.items?.map((item) => (
                        <AccordionItem
                          className="p-2 md:py-6 md:px-4 border-b border-gray-400"
                          key={item?.title}
                          value={item!.title!}
                        >
                          <AccordionTrigger className="w-full data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary text-sm md:text-lg lg:text-2xl font-medium">
                            <span className="text-left">{item?.title}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm md:text-lg lg:text-xl font-light mt-2 md:mt-4">
                            {item?.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </TabsContent>
                  </Accordion>
                ))}
              </div>
            </Tabs>
          ) : (
            <p className="text-xl">Loading...</p>
          )}
        </div>
      </Container>
    </section>
  );
};
