import d3 from "d3";
import nv from "nvd3";
import BaseChartMixin from "./BaseChartMixin";

export default {
  name: "SunburstChart",
  mixins: [BaseChartMixin],
  props: {
    width: { type: String, default: "300" },
    height: { type: String, default: "300" },
    modeType: { type: String, default: "count" },
    tooltip: { type: Function, default: () => {} },
    labelFormat: {
      type: Function,
      default: d => {
        return d.name;
      }
    },
    showLabels: { type: Boolean, default: false },
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
        .showLabels(this.showLabels)
        .labelFormat(d => {
          return this.labelFormat(d);
        })
        .color(this.colors);

      if (this.width) {
        chart.width(this.width);
      }
      if (this.height) {
        chart.height(this.height);
      }
      setTimeout(() => {
        // let data = false;
        console.log(this.model[0].children[9]);
        this.elementClick({
          data: this.model[0].children[9],
          index: 83
        });
      }, 2000);
      chart.sunburst.dispatch.on("elementMousemove", event => {
        this.elementMousemove(event);
      });
      chart.sunburst.dispatch.on("elementClick", event => {
        console.log(event);
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
