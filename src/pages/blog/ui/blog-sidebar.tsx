import { BlogPostCard } from "@/entities";
import {
  BlogPost,
  GET_BLOG_CATEGORIES,
  GET_RECENT_BLOG_POSTS,
} from "@/shared/api";
import { cn } from "@/shared/lib";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

interface BlogSidebarProps {
  category: string | null;
}

export const BlogSidebar = ({ category }: BlogSidebarProps) => {
  const [params, setParams] = useSearchParams();
  const { data: categoriesData } = useQuery(GET_BLOG_CATEGORIES);
  const { data: recentPostsData } = useQuery(GET_RECENT_BLOG_POSTS);

  return (
    <aside className="flex flex-col gap-6 md:gap-8 lg:gap-10 flex-1 md:flex-[0_0_280px] lg:flex-[0_0_360px] pb-4">
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
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
    </aside>
  );
};
