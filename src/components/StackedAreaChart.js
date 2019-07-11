import d3 from "d3";
import nv from "nvd3";

import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "StackedAreaChart",
  mixins: [BaseChartMixin],
  props: {
    xFormat: {
      type: [Function, String]
    },
    yFormat: {
      type: [Function, String]
    },
    rightAlignYAxis: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: true
    },
    clipEdge: {
      type: Boolean,
      default: true
    },
    chartStyle: {
      type: String,
      default: "stack_percent"
    },
    showYAxis: {
      type: Boolean,
      default: true
    },
    interpolate: {
      type: String,
      default: 'basis'
    },
    margin: {
      type: Object,
      default: () => {
        return {
          top: 0,
          right: 50,
          bottom: 30,
          left: 30
        };
      }
    }
  },
  mounted() {
    nv.addGraph(() => {
      const chart = nv.models
        .stackedAreaChart()
        .useInteractiveGuideline(true) //Tooltips which show all data points. Very nice!
        .rightAlignYAxis(this.rightAlignYAxis) //Let's move the y-axis to the right side.
        // .transitionDuration(500)
        .showControls(this.showControls) //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
        .clipEdge(this.clipEdge)
        .style(this.chartStyle)
        .margin(this.margin)
        .color(this.colors)
        .showYAxis(this.showYAxis)
        .interpolate(this.interpolate)
        .controlLabels({
          stacked: "堆叠",
          stream: "流",
          expanded: "扩展"
        });
      chart.xScale(d3.time.scale());
      //Axis settings
      if (this.xFormat) {
        if (typeof this.xFormat === "string") {
          chart.xAxis.tickFormat(d3.format(this.xFormat));
        } else {
          chart.xAxis.tickFormat(this.xFormat);
        }
      }
      if (this.yFormat) {
        if (typeof this.yFormat === "string") {
          chart.yAxis.tickFormat(d3.format(this.yFormat));
        } else {
          chart.yAxis.tickFormat(this.yFormat);
        }
      }

      //We want to show shapes other than circles.
      // chart.scatter.onlyCircles(false)
      this.redraw(chart);
      this.chartRef = chart;

      nv.utils.windowResize(chart.update);
      return chart;
    });
  }
};
