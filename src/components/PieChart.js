import d3 from 'd3'
import nv from 'nvd3'
import BaseChartMixin from './BaseChartMixin'

export default {
  name: 'PieChart',
  mixins: [BaseChartMixin],
  props: {
    showLabels: { type: Boolean, default: true },
    margin: {
      type: Object, default: () => {
        return { top: 30, right: 20, bottom: 20, left: 20 }
      }
    },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    showTooltipPercent: { type: Boolean, default: false },
    showLegend: { type: Boolean, default: true },
    legendPosition: { type: String, default: 'top' },
    labelThreshold: { type: Number, default: 0.05 },
    labelType: { type: String, default: 'percent' },
    donut: { type: Boolean, default: false },
    donutRatio: { type: Number, default: 0.35 },
    textField: { type: String, default: 'label' },
    valueField: { type: String, default: 'value' },
    colors: { type: Array, default: () => ['#82DFD6', '#ddd'] },
    valueFormat: {
      type: Function,
      default: d3.format(',.1f')
    }
  },
  mounted () {
    const textField = this.textField
    const valField = this.valueField

    nv.addGraph(() => {
      const chart = nv.models.pieChart()
        .x(d => d[textField])
        .y(d => d[valField])
        .showLabels(this.showLabels)
        .legendPosition(this.legendPosition)
        .labelThreshold(this.labelThreshold)
        .donut(this.donut)
        .donutRatio(this.donutRatio)
        .showTooltipPercent(this.showTooltipPercent)
        .showLegend(this.showLegend)
        .labelType(this.labelType)
        .margin(this.margin)
        .color(this.colors)
        .valueFormat(this.valueFormat)

      if (this.width) {
        chart.width(this.width)
      }

      if (this.height) {
        chart.height(this.height)
      }

      this.redraw(chart)
      this.chartRef = chart

      nv.utils.windowResize(chart.update);
      return chart
    })
  }
}
