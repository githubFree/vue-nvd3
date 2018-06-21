import d3 from 'd3'
import nv from 'nvd3'
import BaseChartMixin from './BaseChartMixin'

export default {
  name: 'SunburstChart',
  mixins: [BaseChartMixin],
  props: {
    colors: { type: Array, default: () => ['#82DFD6', '#ddd'] },
    margin: {
      type: Object, default: () => {
        return { left: 50, bottom: 30, right: 0 }
      }
    }
  },
  mounted () {
    nv.addGraph(() => {
      const chart = nv.models.sunburstChart()
        .margin(this.margin)
        .color(this.colors)

      this.redraw(chart)
      this.chartRef = chart
      nv.utils.windowResize(chart.update);
      chart.sunburst.dispatch.on('elementMousemove', (event) => {
        console.log(event)
      })
      return chart
    })
  }
}
