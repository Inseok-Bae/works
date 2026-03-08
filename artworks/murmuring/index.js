import { autorun } from 'mobx';
import { init_graph_presenter, update_graph_presenter } from './chart.js';
import readme_source from './README.md?raw';
import { acting } from './acting';
import { getSpeakerNames, toData, makeSpeakerLegend } from './utils.js';
import { appendMessage } from './chat.js';
import { render_readme } from '../../shared/utils/util.js';
import { initThoughtOverlay } from '../../shared/utils/thought-overlay.js';
import { initI18n } from '../../shared/utils/i18n.js';

const { public_conversations, murmurer_regret } = acting();
const { t } = initI18n();
const speakerNames = getSpeakerNames(t);

const conversations_graph_space = document
  .getElementById('conversations_graph_presenter')
  .getContext('2d');

const conversations_graph_presenter = init_graph_presenter({
  graph_space: conversations_graph_space,
  yLabel: t('murmuring.chart.conversations.yLabel'),
  title: t('murmuring.chart.conversations.title'),
  xLabel: t('murmuring.chart.xLabel'),
  tooltipByLabel: t('murmuring.chart.tooltipBy'),
  legends: Object.keys(speakerNames).map((speaker) => makeSpeakerLegend(speaker, speakerNames)),
  data: toData(public_conversations.records, speakerNames),
});

const regret_graph_space = document.getElementById('regret_graph_presenter').getContext('2d');

const regret_graph_presenter = init_graph_presenter({
  graph_space: regret_graph_space,
  yLabel: t('murmuring.chart.regret.yLabel'),
  title: t('murmuring.chart.regret.title'),
  xLabel: t('murmuring.chart.xLabel'),
  tooltipByLabel: t('murmuring.chart.tooltipBy'),
  legends: [makeSpeakerLegend('murmurer', speakerNames)],
  data: toData(murmurer_regret, speakerNames),
});

render_readme('readme_section', readme_source);
initThoughtOverlay();

autorun(() => {
  update_graph_presenter(conversations_graph_presenter, toData(public_conversations.records, speakerNames));
  appendMessage(public_conversations.getLastRecord(), speakerNames);

  if (public_conversations.records.length > 500) {
    window.location.reload();
  }
});

autorun(() => {
  update_graph_presenter(regret_graph_presenter, toData(murmurer_regret, speakerNames));
});

