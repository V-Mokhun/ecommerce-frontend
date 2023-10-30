import { cn } from "@/shared/lib";
import { CartSteps } from "../cart-page";
import { Icon } from "@/shared/ui";

interface CartNavProps {
  activeStep: keyof typeof CartSteps;
}

export const CartNav = ({ activeStep }: CartNavProps) => {
  return (
    <ul className="flex items-center justify-between max-w-lg mx-auto mb-7 md:mb-10 lg:mb-12">
      <li
        className={cn(
          "text-center flex-1 flex flex-col items-center gap-1 relative after:block after:absolute after:top-4 after:md:top-6 after:right-0 after:w-1/2 after:h-px after:md:h-0.5 after:bg-gray-500",
          activeStep === CartSteps.Cart && "after:top-5 after:md:top-9"
        )}
      >
        <div
          className={cn(
            "relative z-[2] w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary border-2 border-primary flex items-center justify-center",
            activeStep === CartSteps.Cart &&
              "w-10 h-10 md:w-[72px] md:h-[72px] bg-background"
          )}
        >
          <Icon
            name="cart"
            className={cn(
              "w-6 h-6 md:w-8 md:h-8 text-background",
              activeStep === CartSteps.Cart &&
                "w-8 h-8 md:w-12 md:h-12 text-primary"
            )}
          />
        </div>
        <span
          className={cn(
            "text-sm md:text-base text-primary",
            activeStep === CartSteps.Cart && "font-medium"
          )}
        >
          Cart
        </span>
      </li>
      <li
        className={cn(
          "text-center flex-1 flex flex-col items-center gap-1 relative after:block after:absolute after:top-4 after:md:top-6 after:right-0 after:w-1/2 after:h-px after:md:h-0.5 after:bg-gray-500 before:block before:absolute before:top-4 before:md:top-6 before:left-0 before:w-1/2 before:h-px before:md:h-0.5 before:bg-gray-500",
          activeStep === CartSteps.Checkout &&
            "after:top-5 after:md:top-9 before:top-5 before:md:top-9"
        )}
      >
        <div
          className={cn(
            "relative z-[2] w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-500 flex items-center justify-center",
            activeStep === CartSteps.Checkout &&
              "w-10 h-10 md:w-[72px] md:h-[72px] bg-background border-2 border-primary",
            activeStep === CartSteps.Payment && "bg-primary"
          )}
        >
          <Icon
            name="truck"
            className={cn(
              "w-6 h-6 md:w-8 md:h-8 text-background",
              activeStep === CartSteps.Checkout &&
                "w-8 h-8 md:w-12 md:h-12 text-primary"
            )}
          />
        </div>
        <span
          className={cn(
            "text-sm md:text-base text-primary",
            activeStep === CartSteps.Cart && "text-gray-500",
            activeStep === CartSteps.Checkout && "font-medium"
          )}
        >
          Checkout
        </span>
      </li>
      <li
        className={cn(
          "text-center flex-1 flex flex-col items-center gap-1 relative after:block after:absolute after:top-4 after:md:top-6 after:left-0 after:w-1/2 after:h-px after:md:h-0.5 after:bg-gray-500",
          activeStep === CartSteps.Payment && "after:top-5 after:md:top-9"
        )}
      >
        <div
          className={cn(
            "relative z-[2] w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-500 flex items-center justify-center",
            activeStep === CartSteps.Payment &&
              "w-10 h-10 md:w-[72px] md:h-[72px] bg-background border-2 border-primary"
          )}
        >
          <Icon
            name="card"
            className={cn(
              "w-6 h-6 md:w-8 md:h-8 text-background",
              activeStep === CartSteps.Payment &&
                "w-8 h-8 md:w-12 md:h-12 text-primary"
            )}
          />
        </div>
        <span
          className={cn(
            "text-sm md:text-base text-gray-500",
            activeStep === CartSteps.Payment && "text-primary font-medium"
          )}
        >
          Payment
        </span>
      </li>
    </ul>
  );
};
