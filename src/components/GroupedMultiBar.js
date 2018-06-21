import nv from "nvd3";
import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "BarChart",
  mixins: [BaseChartMixin],
  props: {
    stacked: { type: Boolean, default: true },
    groupSpacing: { type: Number, default: 0.1 },
    showControls: { type: Boolean, default: false }
  },
  mounted() {
    const textField = this.textField;
    const valField = this.valueField;

    nv.addGraph(() => {
      const chart = nv.models
        .multiBarChart()
        .stacked(this.stacked)
        .reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0) //Angle to rotate x-axis labels.
        .showControls(this.showControls) //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(this.groupSpacing); //Distance between each group of bars.

      chart.xAxis.tickFormat(d3.format(",f"));
      chart.yAxis.tickFormat(d3.format(",.1f"));

      this.redraw(chart);
      this.chartRef = chart;

      nv.utils.windowResize(chart.update);
      return chart;
    });
  }
};
