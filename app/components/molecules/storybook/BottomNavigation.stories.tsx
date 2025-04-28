import { Meta, StoryFn } from '@storybook/react';
import { BottomNavigation } from '../BottomNavigation';

export default {
  title: 'BottomNavigation',
  component: BottomNavigation,
} as Meta;

const Template: StoryFn<{
  isVectorVisible: boolean;
  setIsVectorVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFeatureClick: React.Dispatch<React.SetStateAction<boolean>>;
}> = (args) => <BottomNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  isVectorVisible: false,
  setIsVectorVisible: () => {},
};
