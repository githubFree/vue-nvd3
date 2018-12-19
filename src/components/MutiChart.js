
import d3 from 'd3'
import nv from 'nvd3'
import BaseChartMixin from './BaseChartMixin'
// import _ from 'lodash'
export default {
  name: 'MutiChart',
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
    height: {
      default: '300'
    },
    interpolate: {
      type: String,
      default: 'cardinal'
    },
    margin: {
      type: Object,
      default: () => {
        return {
          top: 30,
          right: 30,
          bottom: 20,
          left: 40,
        }
      }
    }
  },
  mounted () {
    nv.addGraph(() => {
      var chart = nv.models.multiChart()
        // .useInteractiveGuideline(true)
        .margin(this.margin)
        .height(parseInt(this.height))
        .interpolate(this.interpolate)
        .color(this.colors)
      chart.lines1.padData(true)
      if (this.xFormat) {
        if (typeof (this.xFormat) === 'string') {
          chart.xAxis.tickFormat(d3.format(this.xFormat))
        } else {
          chart.xAxis.tickFormat(this.xFormat)
        }
      }

      // let x = d3.scaleBand().range([0, 600]), xScale
      let xScale
      chart.xAxis.tickValues(function (values) {
        var a = values[0].values.map(function (v) {
          return new Date(v.x);
        })
        xScale = a
        return a
      });
      // chart.scatters1.xScale(d3.time.scale.utc());
      // chart.scatters2.xScale(d3.time.scale.utc());
      chart.xAxis.margin({ left: 1000 })

      if (this.y1Format) {
        if (typeof (this.y1Format) === 'string') {
          chart.y1Axis.tickFormat(d3.format(this.y1Format))
        } else {
          chart.y1Axis.tickFormat(this.y1Format)
        }
      }

      if (this.y2Format) {
        if (typeof (this.y2Format) === 'string') {
          chart.y2Axis.tickFormat(d3.format(this.y2Format))
        } else {
          chart.y2Axis.tickFormat(this.y2Format)
        }
      }
      this.chartRef = chart
      d3.select(this.$refs.chart)
        .style('height', this.height)
        .datum(this.model)
        .transition()
        .duration(500)
        .call(chart)
      return chart;
    });
  }
}
