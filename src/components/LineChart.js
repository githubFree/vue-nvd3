import d3 from 'd3'
import nv from 'nvd3'
import BaseChartMixin from './BaseChartMixin'

export default {
  name: 'LineChart',
  mixins: [BaseChartMixin],
  props: {
    xFormat: {
      type: [Function, String]
    },
    yFormat: {
      type: [Function, String]
    },
    colors: {
      type: Array,
      default: () => ['#82DFD6', '#ddd', '#ff0000']
    },
    interpolate: {
      type: String,
      default: 'cardinal'
    },
    xAxisshowMaxMin: {
      type: Boolean,
      default: false
    },
    yAxisshowMaxMin: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Object,
      default: () => {
        return {
          top: 20,
          right: 0,
          bottom: 20,
          left: 40,
        }
      }
    }
  },
  mounted() {
    nv.addGraph(() => {
      let min = 9999;
      let max = 0;
      let data = this.model;
      data.map((item) => {
        item.values.map((v) => {
          if (v.y > max) {
            max = v.y;
          }
          if (v.y < min) {
            min = v.y;
          }
        });
      });
      if (max.toString().length <= 4) {
        this.margin.left = max.toString().length + '0'
      } else {
        this.margin.left = max.toString().length - 1 + '0'
      }
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .margin(this.margin)
        .height(300)
        .yDomain([min - 700, max + max * 0.1])
        .interpolate(this.interpolate)
        .color(this.colors)
      const xaxis = chart.xAxis.showMaxMin(this.xAxisshowMaxMin)

      if (this.xFormat) {
        if (typeof (this.xFormat) === 'string') {
          xaxis.tickFormat(d3.format(this.xFormat))
        } else {
          xaxis.tickFormat(this.xFormat)
        }
      }

      const yaxis = chart.yAxis.showMaxMin(this.yAxisshowMaxMin)
      if (this.yFormat) {
        if (typeof (this.yFormat) === 'string') {
          yaxis.tickFormat(d3.format(this.yFormat))
        } else {
          yaxis.tickFormat(this.yFormat)
        }
      }

      // yaxis.outerTickSize(20);
      // xaxis.tickPadding(15);

      this.redraw(chart)
      this.chartRef = chart
      nv.utils.windowResize(chart.update);
      return chart
    })
  }
}
