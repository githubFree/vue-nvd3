import d3 from "d3";
import nv from "nvd3";

import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "StackedAreaChart",
  mixins: [BaseChartMixin],
  props: {
    xFormat: { type: [Function, String] },
    yFormat: { type: [Function, String] },
    rightAlignYAxis: { type: Boolean, default: true },
    showControls: { type: Boolean, default: true },
    clipEdge: { type: Boolean, default: true },
    chartStyle: { type: String, default: "stack" },
    showYAxis: { type: Boolean, default: true },
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
    },
    colors: {
      type: Array,
      default: () => [
        "#36AAAA",
        "#58C7F1",
        "#F8A93C",
        "#F57844",
        "#6495ed",
        "#ff69b4",
        "#ba55d3",
        "#cd5c5c",
        "#ffa500",
        "#40e0d0",
        "#1e90ff",
        "#ff6347",
        "#7b68ee",
        "#00fa9a",
        "#ffd700",
        "#6699FF",
        "#ff6666",
        "#3cb371",
        "#b8860b",
        "#30e0e0"
      ]
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
        .controlLabels({
          stacked: "堆叠",
          stream: "流",
          expanded: "扩展"
        });
        chart.xScale(d3.time.scale.utc());
      //Axis settings
      if (this.xFormat) {
        if (typeof this.xFormat === "string") {
          chart.xAxis.tickFormat(d3.format(this.xFormat));
        } else {
          chart.xAxis.tickFormat(this.xFormat);
        }
      }
      if (this.yFormat) {
        console.log(this.yFormat);
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
