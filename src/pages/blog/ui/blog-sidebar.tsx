import { BlogPostCard } from "@/entities";
import {
  BlogPost,
  GET_BLOG_CATEGORIES,
  GET_BLOG_TAGS,
  GET_RECENT_BLOG_POSTS,
} from "@/shared/api";
import { cn } from "@/shared/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

interface BlogSidebarProps {
  category: string | null;
  tag: string | null;
}

export const BlogSidebar = ({ category, tag }: BlogSidebarProps) => {
  const [params, setParams] = useSearchParams();
  const { data: categoriesData } = useQuery(GET_BLOG_CATEGORIES);
  const { data: tagsData } = useQuery(GET_BLOG_TAGS);
  const { data: recentPostsData } = useQuery(GET_RECENT_BLOG_POSTS);

  return (
    <aside className="flex flex-col gap-6 md:gap-8 lg:gap-10 flex-1 md:flex-[0_0_360px] pb-4">
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Categories
        </h3>
        <ul className="flex flex-col gap-2 md:gap-4 font-light text-sm md:text-base lg:text-lg">
          {categoriesData?.allBlogCategory.map((category) => (
            <li key={category._id}>
              <button
                type="button"
                onClick={() => {
                  setParams((prev) => {
                    prev.set("category", category.slug!.current!);
                    return prev;
                  });
                }}
                className={cn(
                  "hover:text-primary transition-colors",
                  params.get("category") === category.slug!.current! &&
                    "text-primary"
                )}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Recent posts
        </h3>
        <ul className="flex flex-col gap-3 lg:gap-6">
          {recentPostsData?.allBlogPost.map((post) => (
            <li key={post._id}>
              <BlogPostCard blogPost={post as BlogPost} size="small" />
            </li>
          ))}
        </ul>
      </div>
      <Accordion type="multiple">
        <AccordionItem value="tags">
          <AccordionTrigger className="mb-4">
            <h3 className="font-medium md:text-lg lg:text-xl text-black">
              Tags
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-wrap gap-x-2 gap-y-4 text-sm md:text-base mb-6 max-h-60 overflow-y-auto">
              {tagsData?.allBlogTag.map((tag) => (
                <li key={tag._id}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setParams((prev) => {
                        prev.set("tag", tag.slug!.current!);
                        return prev;
                      });
                    }}
                    className={cn(
                      params.get("tag") === tag.slug!.current! &&
                        "text-primary-600 border-primary-600"
                    )}
                  >
                    {tag.name}
                  </Button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
