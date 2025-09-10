import type { Meta, StoryObj } from "@storybook/react-vite";

import Checkbox from "./CheckBox";
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof Checkbox> = {
  title: "Form Components/CheckboxGroup",
  tags: ["autodocs"],
  component: Checkbox,
  parameters: {
    docs: { source: { type: "code" } },
    controls: { disabled: true }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const SmallSized: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} size="small">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

export const MediumSized: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} size="medium">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

export const LargeSized: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} size="large">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

export const ErrorState: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} status="error">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

export const WarningState: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} status="warning">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

export const SuccessState: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} status="success">
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

// Disabled group
export const Disabled: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} disabled>
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
    </CheckboxGroup>
  )
};

// ReadOnly group
export const ReadOnly: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]} readOnly>
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
      <Checkbox value="option3" label="Option 3" />
    </CheckboxGroup>
  )
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <CheckboxGroup
      defaultValue={["option1"]}
      className="ubmisg-border ubmisg-rounded-md ubmisg-p-4"
      label="Custom Styled Checkbox Group"
    >
      <Checkbox value="option1" label="Option 1" />
      <Checkbox value="option2" label="Option 2" />
    </CheckboxGroup>
  )
};
