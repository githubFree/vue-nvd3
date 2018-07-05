import d3 from "d3";
import nv from "nvd3";
import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "SunburstChart",
  mixins: [BaseChartMixin],
  props: {
    colors: { type: Array, default: () => ["#82DFD6", "#ddd"] },
    width: { type: String, default: "300" },
    height: { type: String, default: "300" },
    modeType: { type: String, default: "count" },
    tooltip: { type: Function, default: () => {} },
    margin: {
      type: Object,
      default: () => {
        return { top: 0, left: 0, bottom: 0, right: 0 };
      }
    },
    elementClick: {
      type: Function,
      default: () => {}
    },
    elementMousemove: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    nv.addGraph(() => {
      const chart = nv.models
        .sunburstChart()
        .margin(this.margin)
        .mode(this.modeType)
        .color(this.colors);

      if (this.width) {
        chart.width(this.width);
      }
      if (this.height) {
        chart.height(this.height);
      }
      chart.sunburst.dispatch.on("elementMousemove", event => {
        this.elementMousemove(event);
      });
      chart.sunburst.dispatch.on("elementClick", event => {
        this.elementClick(event);
      });
      let self = this;
      chart.tooltip.valueFormatter(d => {
        return self.tooltip(d) || d;
      });
      this.redraw(chart);
      this.chartRef = chart;
      nv.utils.windowResize(chart.update);
      return chart;
    });
  }
};
