import nv from "nvd3";
import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "GroupBarChart",
  mixins: [BaseChartMixin],
  props: {
    xFormat: { type: [Function, String] },
    yFormat: { type: [Function, String] },
    stacked: { type: Boolean, default: true },
    groupSpacing: { type: Number, default: 0.1 },
    showControls: { type: Boolean, default: false }
  },
  mounted() {
    nv.addGraph(() => {
      const chart = nv.models
        .multiBarChart()
        .stacked(this.stacked)
        .reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0) //Angle to rotate x-axis labels.
        .showControls(this.showControls) //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(this.groupSpacing) //Distance between each group of bars.
        .controlLabels({
          stacked: "堆叠",
          grouped: "分组"
        });

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

      this.redraw(chart);
      this.chartRef = chart;

      nv.utils.windowResize(chart.update);
      return chart;
    });
  }
};
