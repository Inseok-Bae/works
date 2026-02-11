import { autorun } from 'mobx';
import { init_graph_presenter, update_graph_presenter } from './chart.js';
import conversation_model_source from '../models/conversations.js?raw';
import speaker_model_source from '../models/speaker.js?raw';
import murmurer_model_source from '../models/murmurer.js?raw';
import acting_source from './acting.js?raw';
import readme_source from './README.md?raw';
import { acting } from './acting';
import { toData, makeSpeakerLegend, speakerNames } from './utils.js';
import { appendMessage } from './chat.js';
import { add_codes, render_readme } from '../utils/util.js';

const { public_conversations, murmurer_regret } = acting();

const conversations_graph_space = document
  .getElementById('conversations_graph_presenter')
  .getContext('2d');

const conversations_graph_presenter = init_graph_presenter({
  graph_space: conversations_graph_space,
  yLabel: 'Blah Scale (0: super blah)',
  title: 'Conversations Blah Scale',
  legends: Object.keys(speakerNames).map((speaker) => makeSpeakerLegend(speaker)),
  data: toData(public_conversations.records),
});

const regret_graph_space = document.getElementById('regret_graph_presenter').getContext('2d');

const regret_graph_presenter = init_graph_presenter({
  graph_space: regret_graph_space,
  yLabel: 'Regret Scale',
  title: 'Murmurer Regret Scale',
  legends: [makeSpeakerLegend('murmurer')],
  data: toData(murmurer_regret),
});

add_codes(
  [
    { title: 'Model > Conversations', source: conversation_model_source },
    { title: 'Model > Speaker', source: speaker_model_source },
    { title: 'Model > Murmurer', source: murmurer_model_source },
    { title: 'Acting', source: acting_source },
  ],
  'codes'
);

render_readme('readme_section', readme_source);

autorun(() => {
  update_graph_presenter(conversations_graph_presenter, toData(public_conversations.records));
  appendMessage(public_conversations.getLastRecord());

  if (public_conversations.records.length > 500) {
    window.location.reload();
  }
});

autorun(() => {
  update_graph_presenter(regret_graph_presenter, toData(murmurer_regret));
});
