import { BLOG_POSTS_LIMIT, BLOG_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container, Heading, Skeleton } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { BlogPost, GET_BLOG_POSTS } from "@/shared/api";
import { BlogPostCard } from "@/entities";
import { BlogSidebar, Pagination } from "@/widgets";

export const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const links = [{ label: "Blog", route: `${BLOG_ROUTE}` }];
  const category = searchParams.get("category");
  const filters = category
    ? { category: { slug: { current: { eq: category } } } }
    : undefined;
  const { data: postsData, loading } = useQuery(GET_BLOG_POSTS, {
    variables: {
      filters,
      limit: BLOG_POSTS_LIMIT,
      offset: searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : 0,
    },
  });
  const onPaginateChange = (offset: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (offset === 0) {
      setSearchParams((prev) => {
        prev.delete("offset");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("offset", offset + "");
        return prev;
      });
    }
  };

  if (category)
    links.push({
      label: category
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      route: `${BLOG_ROUTE}?category=${category}`,
    });

  return (
    <section className="pb-6">
      <Container>
        <h1 className="sr-only">Blog</h1>
        <Breadcrumbs links={links} />
        <div className="flex flex-col md:flex-row gap-6 pt-4 md:pt-0">
          <div className="flex-auto">
            {loading ? (
              <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 mb-6 md:mb-10">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    className="flex-1 md:flex-[0_1_calc(50%-12px)] rounded-lg h-64 md:h-80"
                    key={i}
                  />
                ))}
              </div>
            ) : postsData?.blogPostsCount.length === 0 && !loading ? (
              <Heading as="h3">No results found! Please, try again</Heading>
            ) : (
              <>
                <ul className="flex flex-col xs:flex-row flex-wrap gap-3 md:gap-6 mb-6 md:mb-10">
                  {postsData?.blogPosts.map((post) => (
                    <li
                      key={post._id}
                      className="flex-1 xs:flex-[0_1_calc(50%-12px)]"
                    >
                      <BlogPostCard blogPost={post as BlogPost} />
                    </li>
                  ))}
                </ul>
                <Pagination
                  onChange={onPaginateChange}
                  limit={BLOG_POSTS_LIMIT}
                  offset={
                    searchParams.get("offset")
                      ? Number(searchParams.get("offset"))
                      : 0
                  }
                  totalPages={
                    postsData?.blogPostsCount.length
                      ? Math.ceil(
                          postsData?.blogPostsCount.length / BLOG_POSTS_LIMIT
                        )
                      : 1
                  }
                />
              </>
            )}
          </div>
          <BlogSidebar selectedCategory={category} />
        </div>
      </Container>
    </section>
  );
};
