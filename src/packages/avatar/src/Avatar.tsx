import React, { useState, useContext } from "react";
import { User } from "lucide-react";

import {
  avatarStyles,
  avatarImageStyles,
  avatarFallbackStyles,
  avatarStatusStyles
} from "./Avatar.config";
import { AvatarGroupContext } from "./AvatarGroup";

const getInitials = (name: string) => {
  return name
    .trim()
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name?: string;
  icon?: React.ReactNode;
  fallback?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "rounded" | "square";
  status?: "online" | "offline" | "busy" | "away";
  bordered?: boolean;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      icon,
      fallback,
      size: propSize,
      shape = "rounded",
      status,
      bordered,
      className,
      ...props
    },
    ref
  ) => {
    const group = useContext(AvatarGroupContext);
    const size = propSize ?? group?.size ?? "md";

    const [hasError, setHasError] = useState(false);
    const showImage = src && !hasError;

    const initials = name && name.trim().length > 0 ? getInitials(name) : null;

    let fallbackContent: React.ReactNode;
    if (fallback) {
      fallbackContent = fallback;
    } else if (initials) {
      fallbackContent = initials;
    } else {
      fallbackContent = icon ?? <User size="60%" />;
    }

    const containerClasses = [
      avatarStyles.base,
      avatarStyles.variants.size[size],
      avatarStyles.variants.shape[shape],
      bordered && avatarStyles.variants.bordered.true,
      className
    ]
      .filter(Boolean)
      .join(" ");

    const imageOrFallbackClasses = [
      avatarStyles.variants.shape[shape],
      "ubmisg-overflow-hidden",
      showImage ? avatarImageStyles.base : "",
      !showImage ? avatarFallbackStyles.base : "",
      !showImage ? avatarFallbackStyles.variants.size[size] : ""
    ]
      .filter(Boolean)
      .join(" ");

    const statusClasses = status
      ? [
          avatarStatusStyles.base,
          avatarStatusStyles.variants.status[status],
          avatarStatusStyles.variants.size[size]
        ]
          .filter(Boolean)
          .join(" ")
      : "";

    return (
      <span
        ref={ref}
        className={containerClasses}
        aria-label={!src && name ? name : undefined}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name}
            className={imageOrFallbackClasses}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className={imageOrFallbackClasses}>{fallbackContent}</span>
        )}
        {status && <span className={statusClasses} />}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;
