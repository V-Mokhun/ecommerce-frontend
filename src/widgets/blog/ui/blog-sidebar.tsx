import { BlogPostCard } from "@/entities";
import {
  BlogPost,
  GET_BLOG_CATEGORIES,
  GET_RECENT_BLOG_POSTS,
} from "@/shared/api";
import { BLOG_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { Button, Skeleton } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface BlogSidebarProps {
  selectedCategory?: string | null;
  tags?: string[];
}

export const BlogSidebar = ({ selectedCategory, tags }: BlogSidebarProps) => {
  const navigate = useNavigate();
  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(GET_BLOG_CATEGORIES);
  const { data: recentPostsData, loading: recentPostsLoading } = useQuery(
    GET_RECENT_BLOG_POSTS
  );

  return (
    <aside className="flex flex-col gap-6 md:gap-8 lg:gap-10 flex-1 md:flex-[0_0_280px] lg:flex-[0_0_360px] pb-4">
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Categories
        </h3>
        {categoriesLoading ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton className="h-4 md:h-5 w-3/4" key={i} />
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-2 md:gap-4 font-light text-sm md:text-base lg:text-lg">
            {categoriesData?.allBlogCategory.map((category) => (
              <li key={category._id}>
                <button
                  type="button"
                  onClick={() => {
                    navigate({
                      pathname: BLOG_ROUTE,
                      search: `?category=${category.slug!.current!}`,
                    });
                  }}
                  className={cn(
                    "hover:text-primary transition-colors",
                    selectedCategory === category.slug!.current! &&
                      "text-primary"
                  )}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Recent posts
        </h3>
        {recentPostsLoading ? (
          <div className="flex flex-col gap-3 lg:gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="rounded-lg h-24 md:h-32 w-full" />
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-3 lg:gap-6">
            {recentPostsData?.allBlogPost.map((post) => (
              <li key={post._id}>
                <BlogPostCard blogPost={post as BlogPost} size="small" />
              </li>
            ))}
          </ul>
        )}
      </div>
      {tags && (
        <div>
          <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
            Tags
          </h3>
          <ul className="flex flex-wrap gap-x-2 gap-y-4 text-sm md:text-base">
            {tags.map((tag) => (
              <li key={tag}>
                <Button variant="outline">{tag}</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};
