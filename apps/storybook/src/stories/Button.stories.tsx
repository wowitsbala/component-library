import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@my-lib/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: { label: { control: 'text' } }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { label: 'Button' }
};