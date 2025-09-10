// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import { User, Settings } from "lucide-react";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The URL of the image for the avatar."
    },
    name: {
      control: "text",
      description: "The name used for initials fallback and accessibility."
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the avatar."
    },
    shape: {
      control: "radio",
      options: ["rounded", "square"],
      description: "The shape of the avatar."
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy", "away"],
      description: "The presence status indicator."
    },
    bordered: {
      control: "boolean",
      description: "Whether to show a border around the avatar."
    },
    icon: {
      control: false,
      description: "A custom icon to display as a fallback."
    },
    fallback: {
      control: false,
      description: "Custom fallback content to display when image fails."
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Image (Default)",
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Jane Doe",
    size: "lg",
    shape: "rounded"
  }
};

export const WithStatus: Story = {
  name: "With Status Indicator",
  args: {
    ...Default.args,
    status: "online"
  }
};

export const InitialsFallback: Story = {
  name: " Initials Fallback ",
  args: {
    name: "John Doe",
    size: "lg"
  }
};

export const IconFallback: Story = {
  name: "Icon Fallback ",
  args: {
    icon: <User size="60%" />,
    size: "lg"
  }
};

export const ImageLoadError: Story = {
  name: "Image Fallback on Error",
  args: {
    src: "https://invalid-image-url.xyz",
    name: "Fallback Initial",
    size: "lg"
  },
  render: args => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-500">
        The avatars below use an invalid URL to trigger the fallback.
      </p>
      <div className="flex items-center gap-4">
        <Avatar {...args} />
        <Avatar src="invalid-url.jpg" icon={<Settings size="60%" />} size="lg" />
        <Avatar src="invalid-url.jpg" size="lg" />
      </div>
    </div>
  )
};

export const AllSizes: Story = {
  name: "Sizes",
  argTypes: {
    icon: {
      table: { disable: true }
    },
    shape: {
      table: { disable: true }
    },
    status: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    },
    bordered: {
      table: { disable: true }
    },
    src: {
      table: { disable: true }
    },
    name: {
      table: { disable: true }
    },
    alt: {
      table: { disable: true }
    },
    fallback: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  )
};

export const AllStatuses: Story = {
  name: "Statuses",
  argTypes: {
    icon: {
      table: { disable: true }
    },
    shape: {
      table: { disable: true }
    },
    status: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    },
    bordered: {
      table: { disable: true }
    },
    src: {
      table: { disable: true }
    },
    name: {
      table: { disable: true }
    },
    alt: {
      table: { disable: true }
    },
    fallback: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="ON" status="online" size="lg" />
      <Avatar name="OF" status="offline" size="lg" />
      <Avatar name="BY" status="busy" size="lg" />
      <Avatar name="AW" status="away" size="lg" />
    </div>
  )
};

export const Shapes: Story = {
  name: " Shapes ",
  argTypes: {
    icon: {
      table: { disable: true }
    },
    shape: {
      table: { disable: true }
    },
    status: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    },
    bordered: {
      table: { disable: true }
    },
    src: {
      table: { disable: true }
    },
    name: {
      table: { disable: true }
    },
    alt: {
      table: { disable: true }
    },
    fallback: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Rounded"
        shape="rounded"
        size="lg"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Square"
        shape="square"
        size="lg"
      />
    </div>
  )
};

export const Bordered: Story = {
  name: " Bordered ",
  argTypes: {
    icon: {
      table: { disable: true }
    }
  },
  args: {
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Bordered Avatar",
    bordered: true,
    size: "lg"
  }
};
