import { html } from 'lit';
import '../src/bar-bar2.js';

export default {
  title: 'BarBar2',
  component: 'bar-bar2',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <bar-bar2
      style="--bar-bar2-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </bar-bar2>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
