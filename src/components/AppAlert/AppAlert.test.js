import { render } from '@testing-library/vue';
import AppAlert from '../AppAlert.vue';

const slotContent = 'This is an Alert!';

describe('AppAlert.vue', () => {
  it('renders a message', () => {
    const { getByText } = render(AppAlert, {
      props: { alert: { message: slotContent, type: 'alert' } },
    });
    getByText(slotContent);
  });

  it('renders an error', () => {
    const { getByText } = render(AppAlert, {
      props: { alert: { message: slotContent, type: 'error' } },
    });
    expect(getByText(slotContent)).toHaveClass('alert--error');
  });
});
