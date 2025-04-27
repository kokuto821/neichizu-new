import { Meta, StoryFn } from '@storybook/react';
import { BottomNavigation } from '../BottomNavigation';

export default {
  title: 'BottomNavigation',
  component: BottomNavigation,

} as Meta

const Template: StoryFn = (args) => <BottomNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  // ここにHeaderコンポーネントに渡すプロップスを定義できます
  // 例えば、ロゴのパスやリンクのテキストを変更したい場合など
};
