import d3 from "d3";

export default {
  name: "SunburstChart",
  props: {
    model: { type: Object },
    colors: { type: Array, default: () => ["#82DFD6", "#ddd"] },
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
  render(h) {
    return h("div", {
      style: {
        width: this.width + "px",
        height: this.height + "px"
      },
      attrs: {
        class: "_sunburstChart"
      },
      domProps: {
        innerHTML:
          '<div class="sequence"></div><div class="svgBox"><div class="explanation"><span class="percentage"></span><br/> 的访问来源于此</div><svg class="chart" ref="chart" /></div>'
      }
    });
  },
  watch: {
    model(value) {
      this.init();
    }
  },
  methods: {
    init() {
      let _sunburstChart = document.getElementsByClassName("_sunburstChart")[0];
      let sequence = _sunburstChart.getElementsByClassName("sequence")[0];
      let explanation = _sunburstChart.getElementsByClassName("explanation")[0];

      //准备色库 S
      let colors = {};
      let setColors = obj => {
        for (let k in obj) {
          colors[obj[k]["name"]] = this.colors[
            parseInt(Math.random() * this.colors.length)
          ];
          if (obj[k]["children"]) {
            setColors(obj[k]["children"]);
          }
        }
      };
      setColors(this.model.children);
      //准备色库 E

      var radius = Math.min(this.width, this.height) / 2;

      var totalSize = 0;
      var vis = d3
        .select("._sunburstChart .chart")
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
        .value(function(d) {
          return d.size;
        });

      var arc = d3.svg
        .arc()
        .startAngle(function(d) {
          return d.x;
        })
        .endAngle(function(d) {
          return d.x + d.dx;
        })
        .innerRadius(function(d) {
          return Math.sqrt(d.y);
        })
        .outerRadius(function(d) {
          return Math.sqrt(d.y + d.dy);
        });

      createVisualization(this.model);

      function createVisualization(json) {
        drawLegend();
        vis
          .append("svg:circle")
          .attr("r", radius)
          .style("opacity", 0);

        var nodes = partition.nodes(json).filter(function(d) {
          return d.dx > 0.005; // 0.005 radians = 0.29 degrees
        });

        var path = vis
          .data([json])
          .selectAll("path")
          .data(nodes)
          .enter()
          .append("svg:path")
          .attr("display", function(d) {
            return d.depth ? null : "none";
          })
          .attr("d", arc)
          .attr("fill-rule", "evenodd")
          .style("fill", function(d) {
            return colors[d.name];
          })
          .style("opacity", 0.7)
          .on("mouseover", mouseover);

        d3.select("#container").on("mouseleave", mouseleave);

        totalSize = path.node().__data__.value;
      }

      let updateBreadcrumbs = (nodeArray, percentageString) => {
        nodeArray.reverse();
        let html = "<ul>";
        for (var i = 0; i < nodeArray.length; i++) {
          var self = nodeArray[i];
          html +=
            '<li><span class="tx" style="background:' +
            colors[self.name] +
            '">' +
            self.name +
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

      function mouseover(d) {
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
          .filter(function(node) {
            return sequenceArray.indexOf(node) >= 0;
          })
          .style("opacity", 0.7);
      }

      function mouseleave(d) {
        //鼠标离开
        sequence.style.opacity = 0;
        vis.selectAll("path").on("mouseover", null);
        vis
          .selectAll("path")
          .transition()
          .duration(500)
          .style("opacity", 0.7)
          .each("end", function() {
            d3.select(this).on("mouseover", mouseover);
          });
        explanation.style.visibility = "hidden";
      }

      function getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
          path.unshift(current);
          current = current.parent;
        }
        return path;
      }

      function drawLegend() {
        var li = {
          w: 75,
          h: 30,
          s: 3,
          r: 3
        };

        var legend = d3
          .select("#partials_detail_route .legend")
          .append("svg:svg")
          .attr("width", li.w)
          .attr("height", d3.keys(colors).length * (li.h + li.s));

        var g = legend
          .selectAll("g")
          .data(d3.entries(colors))
          .enter()
          .append("svg:g")
          .attr("transform", function(d, i) {
            return "translate(0," + i * (li.h + li.s) + ")";
          });

        g.append("svg:rect")
          .attr("rx", li.r)
          .attr("ry", li.r)
          .attr("width", li.w)
          .attr("height", li.h)
          .style("fill", function(d) {
            return d.value;
          });

        g.append("svg:text")
          .attr("x", li.w / 2)
          .attr("y", li.h / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d.key;
          });
      }
    }
  },
  mounted() {
    this.init();
  }
};
