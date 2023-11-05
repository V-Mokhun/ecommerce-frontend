export const BlogPostPage = () => {
  return <></>;
};

/*
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
*/
