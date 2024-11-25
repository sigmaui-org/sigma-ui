import type { Meta, StoryObj } from '@storybook/react';
// import type { Button } from '@sigma-ui/atoms/button';

const meta: Meta<typeof Button> = {
    title: 'Components/Atoms/Button'
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Button>

//👇 Throws a type error if the args don't match the component props
export const Default: Story = {
  render: (args) => (
    <div>Google</div>
  ),
};