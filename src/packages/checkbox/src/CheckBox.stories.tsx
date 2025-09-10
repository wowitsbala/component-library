// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Checkbox from "./CheckBox";
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof Checkbox> = {
  title: "Form Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "The visible label for the checkbox." },
    indeterminate: {
      control: "boolean",
      description: "Set the checkbox to an indeterminate state."
    },
    disabled: { control: "boolean", description: "Disable the checkbox." },
    readOnly: { control: "boolean", description: "Make the checkbox read-only." },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "The size of the checkbox."
    },
    status: {
      control: { type: "radio" },
      options: ["default", "error", "warning", "success"],
      description: "The validation status of the checkbox."
    },
    tooltip: { control: "text", description: "Tooltip text to display on hover." },
    visuallyHiddenLabel: {
      control: "boolean",
      description: "Hide the label visually but keep it for screen readers."
    },
    onChange: { action: "onChange", description: "Callback fired when the state changes." }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  name: " Uncontrolled ",
  argTypes: {
    checked: { control: false }
  },
  args: {
    label: "Checkbox",
    defaultChecked: true
  },
  render: args => <Checkbox {...args} />
};

export const Controlled: Story = {
  name: " Controlled ",
  args: {
    label: "Controlled Checkbox"
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        label={args.label}
        checked={isChecked}
        onChange={checked => setIsChecked(checked)}
      />
    );
  }
};

export const Indeterminate: Story = {
  name: " Indeterminate ",
  args: {
    label: "Indeterminate Checkbox"
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(false);
    const isIndeterminate = !isChecked;

    return (
      <Checkbox
        {...args}
        label={args.label}
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={checked => setIsChecked(checked)}
      />
    );
  }
};

export const Disabled: Story = {
  name: " Disabled ",
  args: {
    label: "Disabled Checkbox",
    disabled: true,
    checked: true
  }
};

export const ReadOnly: Story = {
  name: " Read-Only ",
  args: {
    label: "Read-Only Checkbox",
    readOnly: true,
    checked: true
  }
};

export const StatusSuccess: Story = {
  name: " Success ",
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(true);
    return <Checkbox {...args} checked={isChecked} onChange={checked => setIsChecked(checked)} />;
  },
  args: {
    label: "Success Status",
    status: "success"
  }
};

export const StatusWarning: Story = {
  name: " Warning ",
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(true);
    return <Checkbox {...args} checked={isChecked} onChange={checked => setIsChecked(checked)} />;
  },
  args: {
    label: "Warning Status",
    status: "warning"
  }
};

export const StatusError: Story = {
  name: " Error ",
  render: args => <Checkbox {...args} defaultChecked />,
  args: {
    label: "Error Status",
    status: "error"
  }
};

export const SizeSmall: Story = {
  name: " Small ",
  render: args => <Checkbox {...args} />,
  args: {
    label: "Small Checkbox",
    size: "small"
  }
};

export const SizeMedium: Story = {
  name: " Medium ",
  render: args => <Checkbox {...args} />,
  args: {
    label: "Medium Checkbox",
    size: "medium"
  }
};

export const SizeLarge: Story = {
  name: " Large ",
  render: args => <Checkbox {...args} />,
  args: {
    label: "Large Checkbox",
    size: "large"
  }
};

export const WithTooltip: Story = {
  name: " With Tooltip ",
  render: args => <Checkbox {...args} />,
  args: {
    label: "Hover for Tooltip",
    tooltip: "This is a helpful tooltip message!"
  }
};

export const VisuallyHiddenLabel: Story = {
  name: " Visually Hidden Label ",
  render: args => <Checkbox {...args} />,
  args: {
    label: "This label is hidden",
    visuallyHiddenLabel: true,
    "aria-label": "An accessible label for a checkbox with a hidden label",
    defaultChecked: true
  }
};

export const Group: Story = {
  name: " Checkbox Group ",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(["apple"]);
    return (
      <CheckboxGroup label="Select Your Fruits" value={value} onChange={setValue}>
        <Checkbox value="apple" label="Apple" />
        <Checkbox value="orange" label="Orange" tooltip="Oranges are citrus" />
        <Checkbox value="grape" label="Grape" disabled />
        <Checkbox value="pear" label="Pear" readOnly />
      </CheckboxGroup>
    );
  }
};

export const GroupWithStatus: Story = {
  name: " Group Status",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(["apple"]);
    return (
      <CheckboxGroup
        label="Select Your Fruits (Error)"
        value={value}
        onChange={setValue}
        status="error"
      >
        <Checkbox value="apple" label="Apple" />
        <Checkbox value="orange" label="Orange" />
      </CheckboxGroup>
    );
  }
};
