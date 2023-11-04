import { BLOG_ROUTE } from "@/shared/consts";
import { Breadcrumbs, Container } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";
import { BlogSidebar } from "./ui";

export const BlogPage = () => {
  const [params] = useSearchParams();
  const links = [{ label: "Blog", route: `${BLOG_ROUTE}` }];
  const category = params.get("category");
  const tag = params.get("tag");
  if (category)
    links.push({
      label: category
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      route: `${BLOG_ROUTE}?category=${category}${tag ? `&tag=${tag}` : ""}`,
    });

  return (
    <section>
      <Container>
        <h1 className="sr-only">Blog</h1>
        <Breadcrumbs links={links} />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-auto"></div>
          <BlogSidebar />
        </div>
      </Container>
    </section>
  );
};
