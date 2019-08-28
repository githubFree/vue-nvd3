import nv from "nvd3";
import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "BarChart",
  mixins: [BaseChartMixin],
  props: {
    textField: { type: String, default: "label" },
    valueField: { type: String, default: "value" },
    staggerLabels: { type: Boolean, default: true },
    tooltips: { type: Boolean, default: false },
    showValues: { type: Boolean, default: true }
  },
  mounted() {
    const textField = this.textField;
    const valField = this.valueField;

    nv.addGraph(() => {
      const chart = nv.models
        .discreteBarChart()
        .x(d => d[textField])
        .y(d => d[valField])
        .color(this.colors)
        .staggerLabels(this.staggerLabels) //Too many bars and not enough room? Try staggering labels.
        //.tooltips(this.tooltips)        //Don't show tooltips
        .showValues(this.showValues); //...instead, show the bar value right on top of each bar.
      //.transitionDuration(350)
      this.redraw(chart);
      this.chartRef = chart;

      nv.utils.windowResize(chart.update);
      return chart;
    });
  }
};
