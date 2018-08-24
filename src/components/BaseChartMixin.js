export default {
  props: {
    model: {
      type: Array
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      chartRef: undefined
    };
  },
  watch: {
    model(value) {
      if (this.chartRef) {
        if (this.$vnode.componentOptions.tag == 'vn-line') {

        }
        this.chartRef.yDomain([30000000, 50000000]);
        this.redraw(this.chartRef);
      }
    }
  },
  methods: {
    getLineMinMax() {
      let data = this.model;
      data.map((item) => {
        item.values.map((v) => {
          if (this.min == null) {
            this.min = v.y;
          }
          if (v.y > this.max) {
            this.max = v.y;
          }
          if (v.y < this.min) {
            this.min = v.y;
          }
        });
      });
      if (this.max.toString().length <= 4) {
        this.margin.left = this.max.toString().length + '0'
      } else {
        this.margin.left = this.max.toString().length - 1 + '0'
      }
    },
    redraw(chart) {
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
  render(h) {
    return <svg ref = "chart" / > ;
  }
};
