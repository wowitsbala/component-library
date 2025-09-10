import { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent, useState } from "react";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Form Components/Input",
  tags: ["autodocs"],
  component: Input,
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "text",
        "email",
        "password",
        "tel",
        "url",
        "number",
        "search",
        "date",
        "time",
        "datetime_local",
        "month",
        "week",
        "color"
      ]
    }
  }
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: "default"
  }
};

export const WithLabel: Story = {
  args: {
    id: "with-label",
    label: "Username",
    placeholder: "Enter username"
  }
};

export const Required: Story = {
  args: {
    id: "required",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email"
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="ubmisg-space-y-4">
      <Input id="small" size="small" placeholder="Small" />
      <Input id="medium" size="medium" placeholder="Medium" />
      <Input id="large" size="large" placeholder="Large" />
    </div>
  )
};

export const Statuses: Story = {
  render: () => (
    <div className="ubmisg-space-y-4">
      <Input id="default-status" status="default" placeholder="Default" />
      <Input id="success-status" status="success" placeholder="Success" />
      <Input id="warning-status" status="warning" placeholder="Warning" />
      <Input id="error-status" status="error" placeholder="Error" />
    </div>
  )
};

export const WithPrefixSuffix: Story = {
  args: {
    id: "prefix-suffix",
    label: "Amount",
    prefix: "$",
    suffix: ".00",
    placeholder: "Enter amount"
  }
};

export const Clearable: Story = {
  args: {
    id: "clearable",
    allowClear: true,
    defaultValue: "Clear me"
  }
};

export const DisabledReadOnly: Story = {
  render: () => (
    <div className="ubmisg-space-y-4">
      <Input id="disabled" disabled placeholder="Disabled input" />
      <Input id="readonly" readOnly defaultValue="Read-only input" />
    </div>
  )
};

export const EmailValidation: Story = {
  args: {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true
  }
};

export const PasswordValidation: Story = {
  args: {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    required: true
  }
};

export const NumberValidation: Story = {
  args: {
    id: "number",
    type: "number",
    label: "Age",
    placeholder: "Enter age"
  }
};

export const HelpText: Story = {
  args: {
    id: "help-text",
    label: "Username",
    placeholder: "Enter username",
    helpText: "This will be your public name."
  }
};

const ControlledExample = () => {
  const [val, setVal] = useState("Controlled value");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return <Input id="controlled" value={val} onChange={handleChange} allowClear />;
};

export const Controlled: Story = {
  render: () => <ControlledExample />
};
