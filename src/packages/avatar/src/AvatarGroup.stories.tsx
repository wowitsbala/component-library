// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";

import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    max: {
      control: { type: "number", min: 1 },
      description: "The maximum number of avatars to display before collapsing."
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size for all avatars in the group."
    },
    overlap: {
      control: { type: "number", min: 0 },
      description: "The amount of overlap between avatars in pixels. Ignored if `spacing` is set."
    },
    spacing: {
      control: "number",
      description: "The gap between avatars in pixels. Overrides `overlap` if set."
    },
    children: {
      control: false,
      description: "Avatar components to be rendered inside the group."
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = [
  <Avatar key="1" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" name="User 1" bordered />,
  <Avatar key="2" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="User 2" bordered />,
  <Avatar key="3" name="User Three" bordered />,
  <Avatar key="4" name="User Four" bordered />,
  <Avatar key="5" icon={<User size="60%" />} bordered />,
  <Avatar key="6" name="User Six" bordered />
];

export const Default: Story = {
  name: "Default Group",
  args: {
    size: "md",
    overlap: 8
  },
  argTypes: {
    children: {
      table: { disable: true }
    },
    overlap: {
      table: { disable: true }
    }
  },
  render: args => <AvatarGroup {...args}>{avatars}</AvatarGroup>
};

export const WithMaxCount: Story = {
  name: "With Max Count ",
  argTypes: {
    children: {
      table: { disable: true }
    }
  },
  args: {
    ...Default.args,
    max: 3
  },
  render: args => <AvatarGroup {...args}>{avatars}</AvatarGroup>
};

export const GroupSizes: Story = {
  name: "Group Sizes ",
  argTypes: {
    spacing: {
      table: { disable: true }
    },
    overlap: {
      table: { disable: true }
    },
    max: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <AvatarGroup size="xs" max={4}>
        {avatars}
      </AvatarGroup>
      <AvatarGroup size="sm" max={4}>
        {avatars}
      </AvatarGroup>
      <AvatarGroup size="md" max={4}>
        {avatars}
      </AvatarGroup>
      <AvatarGroup size="lg" max={4}>
        {avatars}
      </AvatarGroup>
      <AvatarGroup size="xl" max={4}>
        {avatars}
      </AvatarGroup>
    </div>
  )
};

export const CustomOverlap: Story = {
  name: "Custom Overlap ",
  argTypes: {
    spacing: {
      table: { disable: true }
    },
    overlap: {
      table: { disable: true }
    },
    max: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2">Large Overlap (16px)</p>
        <AvatarGroup size="lg" overlap={16}>
          {avatars}
        </AvatarGroup>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">No Overlap (0px)</p>
        <AvatarGroup size="lg" overlap={0}>
          {avatars}
        </AvatarGroup>
      </div>
    </div>
  )
};

export const WithSpacing: Story = {
  name: "With Spacing (Overrides Overlap)",
  argTypes: {
    spacing: {
      table: { disable: true }
    },
    overlap: {
      table: { disable: true }
    },
    max: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    }
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2">Spacing (4px)</p>
        <AvatarGroup size="md" spacing={4}>
          {avatars}
        </AvatarGroup>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Large Spacing (12px)</p>
        <AvatarGroup size="md" spacing={12}>
          {avatars}
        </AvatarGroup>
      </div>
    </div>
  )
};
