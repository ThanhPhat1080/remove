// Lib
import { Story } from '@storybook/react';

// Components
import Popup, { PopupProps } from '@components/Popup';

export default {
  title: 'Popup',
  component: Popup,
};

const Template: Story<PopupProps> = (args) => <Popup {...args} />;

export const PopupSuccess = Template.bind({});
PopupSuccess.args = {
  isOpen: true,
  message: 'Add user successfully',
  variant: 'bg-success',
};

export const PopupError = Template.bind({});
PopupError.args = {
  isOpen: true,
  message: 'Name is not empty',
  variant: 'bg-error',
};
