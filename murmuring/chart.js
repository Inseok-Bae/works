import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const speakerColors = {
  speaker: {
    border: 'rgb(75, 192, 192)',
    background: 'rgba(75, 192, 192, 0.2)',
    point: 'rgb(75, 192, 192)',
  },
  murmurer: {
    border: 'rgb(255, 99, 132)',
    background: 'rgba(255, 99, 132, 0.2)',
    point: 'rgb(255, 99, 132)',
  },
  wind: {
    border: 'rgb(54, 162, 235)',
    background: 'rgba(54, 162, 235, 0.2)',
    point: 'rgba(16, 26, 33, 1)',
  },
};

export function getSpeakerColor(speaker) {
  return (
    speakerColors[speaker] || {
      border: 'rgb(153, 102, 255)',
      background: 'rgba(153, 102, 255, 0.2)',
      point: 'rgb(153, 102, 255)',
    }
  );
}

export function init_graph_presenter({
  graph_space,
  data,
  yLabel,
  title,
  legends,
  xLabel = 'Time',
  tooltipByLabel = 'By',
}) {
  return new Chart(graph_space, {
    type: 'line',
    data: {
      datasets: [
        {
          label: title,
          data: data,
          borderColor: 'rgba(247, 247, 247, 1)',
          backgroundColor: 'rgba(230, 230, 230, 0.2)',
          tension: 0.1,
          pointRadius: 1,
          pointHoverRadius: 2,
          pointBackgroundColor: data.map((point) => getSpeakerColor(point.by).point),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      parsing: false,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart) {
              return legends;
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const dataPoint = context.raw;
              return `${tooltipByLabel}: ${dataPoint.label}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              second: 'HH:mm:ss',
              minute: 'HH:mm:ss',
              hour: 'HH:mm:ss',
            },
          },
          ticks: {
            source: 'auto',
          },
          title: {
            display: true,
            text: xLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yLabel,
          },
        },
      },
    },
  });
}

export function update_graph_presenter(conversationsChart, data) {
  if (!conversationsChart) return;

  conversationsChart.data.datasets[0].data = data;
  conversationsChart.data.datasets[0].pointBackgroundColor = data.map(
    (point) => getSpeakerColor(point.by).point
  );

  conversationsChart.options.scales.x.time.unit = 'second';
  conversationsChart.update('active');
}
