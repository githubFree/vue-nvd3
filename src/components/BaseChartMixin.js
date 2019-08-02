import { colorDefault } from "../module/color";

export default {
  props: {
    model: {
      type: Array
    },
    height: {
      type: String,
      default: "300px"
    },
    colors: {
      type: Array,
      default: () => colorDefault
    },
  },
  data () {
    return {
      chartRef: undefined
    };
  },
  watch: {
    model (value) {
      if (this.chartRef) {
        if (this.$vnode.componentOptions.tag == 'vn-line') {
          this.getLineMinMax();
          this.chartRef.yDomain([this.min - this.min * 0.5, this.max + this.max * 0.1]).margin(this.margin);
        }
        this.redraw(this.chartRef);
      }
    }
  },
  methods: {
    getLineMinMax () {
      let data = this.model;
      let min = 0, max = 0
      data.map((item) => {
        item.values.map((v) => {
          if (min == 0) {
            min = v.y;
          }
          if (v.y > max) {
            max = v.y
          }
          if (v.y < min) {
            min = v.y
          }
        });
      });
      this.max = max
      this.min = min
      if (this.max.toString().length <= 4) {
        this.margin.left = this.max.toString().length + '0'
      } else {
        this.margin.left = this.max.toString().length - 1 + '0'
      }
    },
    redraw (chart) {
      d3.select(this.$refs.chart)
        .style({
          width: this.width,
          height: this.height
        })
        .datum(this.model)
        .transition()
        .duration(500)
        .call(chart);
    }
  },
  render (h) {
    return <svg ref="chart" />;
  },
  beforeDestroy () {
    let nv = document.getElementsByClassName('nvtooltip')
    if (nv.length > 0) {
      for (let i = 0; i < nv.length; i++) {
        nv[i].style.opacity = 0
      }
    }
  }
};
