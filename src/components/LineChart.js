import d3 from 'd3'
import nv from 'nvd3'
import BaseChartMixin from './BaseChartMixin'

export default {
  name: 'LineChart',
  mixins: [BaseChartMixin],
  data() {
    return {
      min: null,
      max: 0
    }
  },
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
    height: {
      type: Number,
      default: 300
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
      this.getLineMinMax();
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .margin(this.margin)
        .height(this.height)
        .yDomain([this.min - this.min * 0.5, this.max + this.max * 0.1])
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
