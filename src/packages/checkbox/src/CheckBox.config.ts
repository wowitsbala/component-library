export const checkboxStyles = {
  base: "ubmisg-group ubmisg-relative ubmisg-inline-flex ubmisg-cursor-pointer ubmisg-items-center ubmisg-gap-2 ubmisg-align-top",
  variants: {
    size: {
      small: "ubmisg-text-sm",
      medium: "ubmisg-text-base",
      large: "ubmisg-text-lg"
    },
    disabled: {
      true: "ubmisg-cursor-not-allowed ubmisg-opacity-50"
    },
    readOnly: {
      true: "ubmisg-cursor-default"
    }
  }
};

export const checkboxIndicatorStyles = {
  base: "ubmisg-flex ubmisg-items-center ubmisg-justify-center ubmisg-rounded ubmisg-shadow-sm ubmisg-transition-colors ubmisg-flex-shrink-0",
  variants: {
    size: {
      small: "ubmisg-h-4 ubmisg-w-4",
      medium: "ubmisg-h-5 ubmisg-w-5",
      large: "ubmisg-h-6 ubmisg-w-6"
    },
    status: {
      default: {
        unchecked: "ubmisg-bg-white ubmisg-border ubmisg-border-gray-300",
        checked: "ubmisg-bg-indigo-600 ubmisg-border ubmisg-border-indigo-600"
      },
      error: {
        unchecked: "ubmisg-bg-white ubmisg-border ubmisg-border-red-300",
        checked: "ubmisg-bg-red-600 ubmisg-border ubmisg-border-red-600"
      },
      warning: {
        unchecked: "ubmisg-bg-white ubmisg-border ubmisg-border-yellow-400",
        checked: "ubmisg-bg-yellow-500 ubmisg-border ubmisg-border-yellow-500"
      },
      success: {
        unchecked: "ubmisg-bg-white ubmisg-border ubmisg-border-green-300",
        checked: "ubmisg-bg-green-600 ubmisg-border ubmisg-border-green-600"
      }
    }
  }
};
