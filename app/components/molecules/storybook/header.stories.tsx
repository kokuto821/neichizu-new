import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Header } from '../../../archive/header';

export default {
  title: 'Components/Header', // Storybookのサイドバーに表示されるタイトル
  component: Header, // 対象のコンポーネント
} as Meta;

const Template: StoryFn = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  // ここにHeaderコンポーネントに渡すプロップスを定義できます
  // 例えば、ロゴのパスやリンクのテキストを変更したい場合など
};
