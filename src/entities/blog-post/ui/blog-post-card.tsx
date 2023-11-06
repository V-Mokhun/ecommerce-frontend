import { BlogPost } from "@/shared/api";
import { BLOG_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Icon } from "@/shared/ui";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

interface BlogPostCardProps {
  blogPost: BlogPost;
  size?: "small" | "medium";
}

export const BlogPostCard = ({
  blogPost,
  size = "medium",
}: BlogPostCardProps) => {
  return (
    <article
      className={cn(
        "rounded-lg h-full shadow-md hover:shadow-sm transition-shadow"
      )}
    >
      <NavLink
        className={cn(
          "flex flex-col h-full overflow-hidden group",
          size === "small" && "flex-row gap-2 md:gap-4"
        )}
        to={`${BLOG_ROUTE}/${blogPost.slug.current}`}
      >
        <div
          className={cn(
            size === "small" &&
              "flex-[0_0_80px] md:flex-[0_0_140px] lg:flex-[0_0_180px]"
          )}
        >
          <img
            className={cn(
              "w-full h-full object-cover",
              size === "medium" &&
                "rounded-t-lg aspect-[2/1] max-h-36 md:max-h-44 lg:max-h-52",
              size === "small" &&
                "rounded-tl-lg rounded-bl-lg max-h-24 md:max-h-32 lg:max-h-36 "
            )}
            alt={blogPost.title}
            src={imageBuilder(blogPost.image).url()}
          />
        </div>
        <div
          className={cn(
            "p-4 flex flex-col h-full",
            size === "small" && "flex flex-col justify-center p-0 py-2 md:py-4"
          )}
        >
          {size === "medium" && (
            <div className="flex items-center justify-between gap-2 text-xs font-light text-gray-500 mb-2">
              <div className="flex items-center gap-0.5">
                <Icon name="calendar" className="w-5 h-5 text-gray-600" />
                <span>
                  {format(new Date(blogPost._createdAt), "MMMM, d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <Icon name="timer" className="w-5 h-5 text-gray-600" />
                <span>{blogPost.readTime} min read</span>
              </div>
            </div>
          )}
          <p
            className={cn(
              "font-light md:font-medium text-base md:text-lg lg:text-xl line-clamp-2 md:line-clamp-1 mb-2 group-hover:text-secondary transition-colors flex-1",
              size === "small" && "text-xs md:text-sm lg:text-base line-clamp-1"
            )}
          >
            {blogPost.title}
          </p>
          <p
            className={cn(
              "font-light text-xs md:text-sm lg:text-base line-clamp-2",
              size === "small" && "text-gray-600 lg:text-sm mb-2 md:mb-4"
            )}
          >
            {blogPost.description}
          </p>
          {size === "small" && (
            <div className="flex items-center gap-1 md:gap-2 text-xs font-light text-gray-500">
              <Icon name="calendar" className="w-5 h-5 text-gray-600" />
              <span>
                {format(new Date(blogPost._createdAt), "MMMM, d, yyyy")}
              </span>
            </div>
          )}
        </div>
      </NavLink>
    </article>
  );
};
