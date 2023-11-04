interface BlogSidebarProps {}

export const BlogSidebar = ({}: BlogSidebarProps) => {
  return (
    <aside className="flex flex-col gap-6 md:gap-8 lg:gap-10 flex-1 md:flex-[0_0_360px]">
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Categories
        </h3>
        <ul className="gap-2 md:gap-4 font-light text-sm md:text-base lg:text-lg"></ul>
      </div>
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Recent posts
        </h3>
        <ul className="gap-2 md:gap-4 lg:gap-6"></ul>
      </div>
      <div>
        <h3 className="font-medium md:text-lg lg:text-xl text-black mb-4 md:mb-6">
          Tags
        </h3>
        <ul className="gap-x-2 gap-y-4 text-sm md:text-base"></ul>
      </div>
    </aside>
  );
};
