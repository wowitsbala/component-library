// InputMask.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import InputMask, { InputMaskProps, InputMaskRef } from "./InputMask";

const meta: Meta<InputMaskProps> = {
  title: "Form Components/InputMask",
  tags: ["autodocs"],
  component: InputMask,
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"]
    },
    status: {
      control: "select",
      options: ["default", "success", "error", "warning"]
    }
  },
  args: {
    id: "phone",
    mask: "999-999-9999",
    placeholder: "Enter phone"
  }
};
export default meta;

type Story = StoryObj<InputMaskProps>;

export const Default: Story = {
  args: {
    id: "default",
    mask: "999-999-9999"
  }
};

export const WithPlaceholder: Story = {
  args: {
    id: "with-placeholder",
    mask: "999-999-9999",
    placeholder: "Enter phone number"
  }
};

export const AllowClear: Story = {
  args: {
    id: "with-clear",
    mask: "999-999-9999",
    allowClear: true,
    defaultValue: "1234567890"
  }
};

const ControlledExample = (props: InputMaskProps) => {
  const [value, setValue] = React.useState("9876543210");
  return (
    <InputMask {...props} value={value} onChange={(_, raw) => setValue(raw ?? "")} allowClear />
  );
};

export const Controlled: Story = {
  render: args => <ControlledExample {...args} />,
  args: {
    id: "controlled",
    mask: "999-999-9999"
  }
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    mask: "999-999-9999",
    defaultValue: "1234567890",
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    id: "readonly",
    mask: "999-999-9999",
    defaultValue: "5556667777",
    readOnly: true
  }
};

export const WithLabelHelpText: Story = {
  args: {
    id: "with-label-help",
    mask: "999-999-9999",
    label: "Phone Number",
    helpText: "Enter a valid 10-digit number",
    required: true
  }
};

export const WithPrefix: Story = {
  args: {
    id: "with-prefix-suffix",
    mask: "999-999-9999",
    prefix: <span>📞</span>,
    allowClear: true
  }
};

export const Sizes: Story = {
  render: args => (
    <div className="ubmisg-flex ubmisg-flex-col ubmisg-gap-4">
      <InputMask {...args} id="small" size="small" placeholder="Small" />
      <InputMask {...args} id="medium" size="medium" placeholder="Medium" />
      <InputMask {...args} id="large" size="large" placeholder="Large" />
    </div>
  ),
  args: {
    mask: "999-999-9999"
  }
};

export const Statuses: Story = {
  render: args => (
    <div className="ubmisg-flex ubmisg-flex-col ubmisg-gap-4">
      <InputMask {...args} id="default-status" status="default" placeholder="Default" />
      <InputMask {...args} id="success-status" status="success" placeholder="Success" />
      <InputMask {...args} id="error-status" status="error" placeholder="Error" />
      <InputMask {...args} id="warning-status" status="warning" placeholder="Warning" />
    </div>
  ),
  args: {
    mask: "999-999-9999"
  }
};

const RefMethodsExample = (props: InputMaskProps) => {
  const ref = React.useRef<InputMaskRef>(null);
  return (
    <div className="ubmisg-flex ubmisg-flex-col ubmisg-gap-2">
      <InputMask {...props} ref={ref} allowClear />
      <div className="ubmisg-flex gap-2">
        <button onClick={() => ref.current?.focus()}>Focus</button>
        <button onClick={() => ref.current?.blur()}>Blur</button>
        <button onClick={() => ref.current?.clear()}>Clear</button>
        <button onClick={() => alert(ref.current?.getRawValue())}>Get Raw Value</button>
      </div>
    </div>
  );
};

export const RefMethods: Story = {
  render: args => <RefMethodsExample {...args} />,
  args: {
    id: "with-ref",
    mask: "999-999-9999",
    defaultValue: "1234567890"
  }
};
