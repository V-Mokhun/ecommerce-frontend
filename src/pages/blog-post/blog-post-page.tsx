import { GET_SINGLE_BLOG_POST, SingleBlogPost } from "@/shared/api";
import { BLOG_ROUTE } from "@/shared/consts";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Breadcrumbs, Container } from "@/shared/ui";
import { BlogSidebar } from "@/widgets";
import { useQuery } from "@apollo/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { format } from "date-fns";
import { Navigate, useParams } from "react-router";

export const BlogPostPage = () => {
  const { slug } = useParams();

  const { data } = useQuery(GET_SINGLE_BLOG_POST, {
    variables: { slug: slug || "" },
  });

  if (!slug) return <Navigate to={BLOG_ROUTE} />;
  if (!data) return null;
  const [blogPost] = data.allBlogPost as [SingleBlogPost];

  const readableSlug = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="pb-6">
      <Container>
        <h1 className="sr-only">{readableSlug}</h1>{" "}
        <Breadcrumbs
          links={[
            { label: "Blog", route: `${BLOG_ROUTE}` },
            { label: readableSlug, route: `${BLOG_ROUTE}/${slug}` },
          ]}
        />
        <div className="flex flex-col md:flex-row gap-6 pt-4 md:pt-0">
          <div className="flex-auto">
            <h2 className="text-base font-medium md:text-lg lg:text-xl mb-2 md:mb-4">
              {blogPost.title}
            </h2>
            <p className="text-gray-600 font-light text-sm md:text-base mb-3 md:mb-4">
              By {blogPost.author.name} on{" "}
              {format(new Date(blogPost._createdAt), "MMMM, d, yyyy")}
            </p>
            <div className="mb-3 md:mb-4">
              <img
                className="w-full h-full max-h-44 md:max-h-72 lg:max-h-96 object-cover rounded-lg"
                alt={blogPost.title}
                src={imageBuilder(blogPost.image).url()}
              />
            </div>
            <div className="text-sm md:text-base [&>p]:mb-3 [&>p]:md:mb-4 [&>ol]:space-y-2 [&>ol]:mb-2">
              {/* @ts-ignore */}
              <PortableText value={blogPost.bodyRaw} />
            </div>
          </div>
          <BlogSidebar tags={blogPost.tags.map((tag) => tag.name)} />
        </div>
      </Container>
    </section>
  );
};
