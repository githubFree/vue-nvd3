import LineChart from "./LineChart";
import LineBarChart from "./LineBarChart";
import PieChart from "./PieChart";
import HGBarChart from "./HBarChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import SunburstChart from "./SunburstChart";
import SunburstHollowChart from "./SunburstHollowChart";
import StackedAreaChart from "./StackedAreaChart";
import GroupedMultiBar from "./GroupedBarChart";
import MutiChart from "./MutiChart"
import "nvd3/build/nv.d3.css";
import "../module/dashed.css"
import { addModel } from "../module/mutiChart";
addModel()
export default (Vue, options) => {
  Vue.component("vn-line", LineChart);
  Vue.component("vn-line-bar", LineBarChart);
  Vue.component("vn-pie", PieChart);
  Vue.component("vn-hbar", HGBarChart);
  Vue.component("vn-bar", BarChart);
  Vue.component("vn-bubble", BubbleChart);
  Vue.component("vn-sunburst", SunburstChart);
  Vue.component("vn-SunburstHollow", SunburstHollowChart);
  Vue.component("vn-stacked-area", StackedAreaChart);
  Vue.component("vn-group-bar", GroupedMultiBar);
  Vue.component("vn-muti", MutiChart);
};
