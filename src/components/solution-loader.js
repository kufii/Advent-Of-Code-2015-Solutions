import m from 'mithril';
import { withHooks, useState } from 'mithril-hooks';
import z from 'zaftig';
import Select from './select';
import solutions from '../solutions';

export default withHooks(() => {
  const [day, setDay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const load = fn => {
    setLoading(true);
    Promise.resolve(fn())
      .then(data => {
        setLoading(false);
        setOutput(data.toString());
      })
      .catch(err => {
        setOutput('Error');
        setLoading(false);
        console.error(err);
      });
  };

  const loadButton = (text, onclick) =>
    m(
      'button.pure-button.pure-button-primary',
      {
        type: 'button',
        disabled: loading,
        onclick
      },
      text
    );

  return () =>
    m('div' + z`text-align center; p 1em`, [
      m(
        'form.pure-form',
        m('fieldset', [
          m('label', 'Day: '),
          m(Select, {
            options: solutions.map((s, index) => ({ value: index, text: `Day ${index + 1}` })),
            selected: day,
            onselect: setDay
          }),
          m('div', [
            loadButton('Part 1', () => load(solutions[day].part1)),
            loadButton('Part 2', () => load(solutions[day].part2))
          ])
        ])
      ),
      m(
        'pre' +
          z`
          line-height 1em;
          padding 5px;
          overflow visible;
        `,
        output
      )
    ]);
});
