import React, { createContext } from "react";

import Avatar from "./Avatar";

interface AvatarGroupContextType {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// eslint-disable-next-line react-refresh/only-export-components
export const AvatarGroupContext = createContext<AvatarGroupContextType | null>(null);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  overlap?: number;
  spacing?: number;
}

const AvatarGroup = ({
  children,
  className,
  max,
  size,
  overlap = 8,
  spacing,
  ...props
}: AvatarGroupProps) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;

  const visibleAvatars = max && max < totalAvatars ? childrenArray.slice(0, max) : childrenArray;
  const hiddenCount = max && max < totalAvatars ? totalAvatars - max : 0;

  const classes = ["ubmisg-flex ubmisg-items-center", className].filter(Boolean).join(" ");

  const containerStyle = spacing !== undefined ? { gap: `${spacing}px` } : {};

  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <div className={classes} style={containerStyle} {...props}>
        {React.Children.map(visibleAvatars, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const overlapStyle =
            spacing === undefined ? { marginLeft: index > 0 ? `-${overlap}px` : undefined } : {};

          return React.cloneElement(child, {
            style: { ...child.props.style, ...overlapStyle },
            className: `${child.props.className || ""} ubmisg-z-${(totalAvatars - index) * 10}`
          });
        })}
        {hiddenCount > 0 && (
          <Avatar
            fallback={`+${hiddenCount}`}
            size={size}
            aria-label={`${hiddenCount} more users`}
            style={spacing === undefined ? { marginLeft: `-${overlap}px` } : {}}
            className={`ubmisg-z-0`}
          />
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
};

export default AvatarGroup;
