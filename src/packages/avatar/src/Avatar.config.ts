export const avatarStyles = {
  base: "ubmisg-relative ubmisg-inline-flex ubmisg-flex-shrink-0 ubmisg-align-middle",
  variants: {
    size: {
      xs: "ubmisg-h-6 ubmisg-w-6",
      sm: "ubmisg-h-8 ubmisg-w-8",
      md: "ubmisg-h-10 ubmisg-w-10",
      lg: "ubmisg-h-14 ubmisg-w-14",
      xl: "ubmisg-h-20 ubmisg-w-20"
    },
    bordered: {
      true: "ubmisg-ring-2 ubmisg-ring-offset-2 ubmisg-ring-black ubmisg-ring-offset-grey-100"
    },
    shape: {
      rounded: "ubmisg-rounded-full",
      square: "ubmisg-rounded-md"
    }
  }
};

export const avatarImageStyles = {
  base: "ubmisg-h-full ubmisg-w-full ubmisg-object-cover"
};

export const avatarFallbackStyles = {
  base: "ubmisg-flex ubmisg-h-full ubmisg-w-full ubmisg-items-center ubmisg-justify-center ubmisg-font-medium ubmisg-bg-gray-200 ubmisg-text-gray-600",
  variants: {
    size: {
      xs: "ubmisg-text-xs",
      sm: "ubmisg-text-sm",
      md: "ubmisg-text-base",
      lg: "ubmisg-text-xl",
      xl: "ubmisg-text-3xl"
    }
  }
};

export const avatarStatusStyles = {
  base: "ubmisg-absolute ubmisg-rounded-full ubmisg-ring-2 ubmisg-ring-white",
  variants: {
    status: {
      online: "ubmisg-bg-green-500",
      offline: "ubmisg-bg-gray-400",
      busy: "ubmisg-bg-red-500",
      away: "ubmisg-bg-yellow-400"
    },
    size: {
      xs: "ubmisg-h-1.5 ubmisg-w-1.5 ubmisg-bottom-0 ubmisg-right-0",
      sm: "ubmisg-h-2 ubmisg-w-2 ubmisg-bottom-0 ubmisg-right-0",
      md: "ubmisg-h-2.5 ubmisg-w-2.5 ubmisg-bottom-0 ubmisg-right-0",
      lg: "ubmisg-h-3 ubmisg-w-3 ubmisg-bottom-0.5 ubmisg-right-0.5",
      xl: "ubmisg-h-3.5 ubmisg-w-3.5 ubmisg-bottom-1 ubmisg-right-1"
    }
  }
};
