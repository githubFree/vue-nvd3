import d3 from "d3";
import {colorDefault} from '../module/color'

export default {
  name: "SunburstChart",
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          name: "root",
          children: []
        }
      }
    },
    promptText: {
      type: String,
      default: "的访问来源于此"
    },
    width: {
      type: String,
      default: "300"
    },
    height: {
      type: String,
      default: "300"
    },
    pathInverted: {
      type: Boolean,
      default: true
    },
    modeType: {
      type: String,
      default: "count"
    },
    tooltip: {
      type: Function,
      default: () => { }
    },
    labelFormat: {
      type: Function,
      default: d => {
        return d.name;
      }
    },
    showLabels: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        };
      }
    },
    elementClick: {
      type: Function,
      default: () => { }
    },
    elementMousemove: {
      type: Function,
      default: () => { }
    },
    colors: {
      type: Array,
      default: () => colorDefault
    }
  },
  render (h) {
    return h("div", {
      style: {
        width: this.width + "px",
        height: this.height + "px"
      },
      attrs: {
        class: "_sunburstChart"
      },
      domProps: {
        innerHTML: '<div class="sequence"></div><div class="svgBox"><div class="explanation"><span class="percentage"></span><br/>' +
          this.promptText +
          '</div><svg class="chart" ref="chart" /></div>'
      }
    });
  },
  watch: {
    model (value) {
      this.init();
    }
  },
  data () {
    return {
      enter: 0,
      mouseoverEvent: 0,
      ifRoot: false //根元素是否只有一个
    };
  },
  methods: {
    hexToRgb (hex) {
      var color = [],
        rgb = [];
      hex = hex.replace(/#/, "");
      if (hex.length == 3) { // 处理 "#abc" 成 "#aabbcc"
        var tmp = [];
        for (var i = 0; i < 3; i++) {
          tmp.push(hex.charAt(i) + hex.charAt(i));
        }
        hex = tmp.join("");
      }

      for (var i = 0; i < 3; i++) {
        color[i] = "0x" + hex.substr(i * 2, 2);
        rgb.push(parseInt(Number(color[i])));
      }
      return "rgb(" + rgb.join(",") + ")";
    },
    init () {
      let self = this;
      let _sunburstChart = this.$el;
      let chart = _sunburstChart.getElementsByClassName("chart")[0];
      let sequence = _sunburstChart.getElementsByClassName("sequence")[0];
      let explanation = _sunburstChart.getElementsByClassName("explanation")[0];
      chart.innerHTML = "";
      //准备色库 S
      let data = this.model.children;
      var i = 0;
      for (let k in data) {
        
        if (!this.colors[i]) {
          i = 0;
        }
        let rgb = this.hexToRgb(this.colors[i]);
        data[k]['color'] = rgb;
        i++;
      }
      console.log(data)
      if(data && data.length == 1){
        this.ifRoot = true
        data[0].color = 'rgba(54,170,170,.6)';
        let j = 1
        for (let k in data[0].children) {
          if (!this.colors[j]) {
            j = 1;
          }
          if(this.colors.length == 1){
            j = 0
          }
          let rgb = this.hexToRgb(this.colors[j]);
          data[0].children[k]['color'] = rgb;
          j++;
        }
      }else{
        this.ifRoot = false
      }

      //计算深度 s
      if (data) {
        var array = {
          '{': 1,
          '}': -1
        },
          depth = 0,
          count = 0;
        var json = JSON.stringify(data);
        for (var i = 0, length = json.length; i < length; i++) {
          var result = array[json.charAt(i)];
          if (!result) continue;
          count += result;
          if (count > depth) {
            depth = count;
          }
        }
      }
      //计算深度 e

      let setColors = (obj, rgba, level) => {
        for (let k in obj) {
          let rgb = rgba.replace('rgb(', '').replace(')', '');
          let color = 'rgba(' + rgb + ',' + (1 - level * ((1 - 0.1) / depth)) + ')';
          obj[k]['color'] = color;
          if (obj[k]["children"]) {
            (function (level) {
              setColors(obj[k]["children"], rgba, ++level);
            })(level)
          }
        }
      }
     
      if (this.ifRoot && data[0] && data[0].children) {
        for (let k in data[0].children) {
          if (data[0].children[k]['children']) {
            setColors(data[0].children[k]['children'], data[0].children[k]['color'], 2);
          }
        }
      } else {
        for (let k in data) {
          if (data[k]['children']) {
            setColors(data[k]['children'], data[k]['color'], 1);
          }
        }
      }
      //准备色库 E

      var radius = Math.min(this.width, this.height) / 2;

      var totalSize = 0;
      var vis = d3
        .select(chart)
        .attr("width", this.width)
        .attr("height", this.height)
        .append("svg:g")
        .attr("id", "container")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
        );

      var partition = d3.layout
        .partition()
        .size([2 * Math.PI, radius * radius])
        .value(function (d) {
          return d.size;
        });

      var arc = d3.svg
        .arc()
        .startAngle(function (d) {
          return d.x;
        })
        .endAngle(function (d) {
          return d.x + d.dx;
        })
        .innerRadius(function (d) {
          return Math.sqrt(d.y);
        })
        .outerRadius(function (d) {
          return Math.sqrt(d.y + d.dy);
        });

      createVisualization(this.model);

      function createVisualization (json) {
        // drawLegend();
        vis
          .append("svg:circle")
          .attr("r", radius)
          .style("opacity", 0);

        var nodes = partition.nodes(json).filter(function (d) {
          return d.dx > 0.005; // 0.005 radians = 0.29 degrees
        });

        var path = vis
          .data([json])
          .selectAll("path")
          .data(nodes)
          .enter()
          .append("svg:path")
          .attr("display", function (d) {
            return d.depth ? null : "none";
          })
          .attr("d", arc)
          .attr("fill-rule", "evenodd")
          .style("fill", function (d) {
            return d.color;
          })
          .style("opacity", 0.7)
          .on("mouseover", mouseover)
          .on("mouseleave", mouseleave);
        totalSize = path.node().__data__.value;
      }

      let updateBreadcrumbs = (nodeArray, percentageString) => {
        let color = nodeArray[0].color;
        if (this.pathInverted == false) {
          color = nodeArray[nodeArray.length - 1].color;
        }
        nodeArray.reverse();
        if(this.ifRoot){
          color = nodeArray[1] ? nodeArray[1].color : nodeArray[0].color
        }
        let html = "<ul>";
        for (var i = 0; i < nodeArray.length; i++) {
          html +=
            '<li><span class="tx" style="background:' +
            color +
            '">' +
            nodeArray[i].name +
            "</span>";
          if (i < nodeArray.length - 1) {
            html += '<i class="icon"></i>';
          }
          html += "</li>";
        }
        html += '<li class="percentage">' + percentageString + "</li></ul>";
        sequence.innerHTML = html;
        sequence.style.opacity = 1;
      };

      function mouseover (d) {
        //鼠标经过
        var percentage = ((100 * d.value) / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
          percentageString = "< 0.1%";
        }
        explanation.getElementsByClassName(
          "percentage"
        )[0].innerHTML = percentageString;
        explanation.style.visibility = "visible";
        var sequenceArray = getAncestors(d);
        updateBreadcrumbs(sequenceArray, percentageString);
        vis.selectAll("path").style("opacity", 0.3);
        vis
          .selectAll("path")
          .filter(function (node) {
            return sequenceArray.indexOf(node) >= 0;
          })
          .style("opacity", 0.7);
      }

      function mouseleave (d) {
        //鼠标离开
        sequence.style.opacity = "0";
        vis.selectAll("path").style("opacity", 1);
        explanation.style.visibility = "hidden";
      }

      function getAncestors (node) {
        var path = [];
        var current = node;
        while (current.parent) {
          if (self.pathInverted) {
            path.unshift(current);
          } else {
            path.push(current);
          }
          current = current.parent;
        }
        return path;
      }

      // function drawLegend() {
      //   var li = {
      //     w: 75,
      //     h: 30,
      //     s: 3,
      //     r: 3
      //   };

      //   var legend = d3
      //     .select("#partials_detail_route .legend")
      //     .append("svg:svg")
      //     .attr("width", li.w)
      //     .attr("height", d3.keys(colors).length * (li.h + li.s));

      //   var g = legend
      //     .selectAll("g")
      //     .data(d3.entries(colors))
      //     .enter()
      //     .append("svg:g")
      //     .attr("transform", function (d, i) {
      //       return "translate(0," + i * (li.h + li.s) + ")";
      //     });

      //   g.append("svg:rect")
      //     .attr("rx", li.r)
      //     .attr("ry", li.r)
      //     .attr("width", li.w)
      //     .attr("height", li.h)
      //     .style("fill", function (d) {
      //       return d.value;
      //     });

      //   g.append("svg:text")
      //     .attr("x", li.w / 2)
      //     .attr("y", li.h / 2)
      //     .attr("dy", "0.35em")
      //     .attr("text-anchor", "middle")
      //     .text(function (d) {
      //       return d.key;
      //     });
      // }
    }
  },
  mounted () {
    this.init();
  }
};
