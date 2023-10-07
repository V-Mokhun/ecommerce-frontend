import { Icon } from "@/shared/ui";

interface FooterSocialsProps {}

export const FooterSocials = ({}: FooterSocialsProps) => {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <a
          className="text-white hover:text-blue-500 transition-colors"
          href="https://facebook.com"
          target="_blank"
          rel="noreferer"
        >
          <Icon name="facebook" className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </li>
      <li>
        <a
          className="text-white hover:text-blue-400 transition-colors"
          href="https://twitter.com/"
          target="_blank"
          rel="noreferer"
        >
          <Icon name="twitter" className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </li>
      <li>
        <a
          className="text-white hover:text-pink-600 transition-colors"
          href="https://instagram.com"
          target="_blank"
          rel="noreferer"
        >
          <Icon name="instagram" className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </li>
      <li>
        <a
          className="text-white hover:text-red-600 transition-colors"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferer"
        >
          <Icon name="youtube" className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </li>
    </ul>
  );
};
