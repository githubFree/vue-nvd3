<template>
  <div>
    <h2>sunburst chart</h2>
    <div class="uk-margin-bottom">
      <vn-sunburst :model="traffics"
        :margin="{left: 70, bottom: 30, right: 0}"
        mode="size"
        :elementClick="elementClick"
        :elementMousemove="elementMousemove">
      </vn-sunburst>
    </div>

    <div class="uk-width-medium-1-1">
      <ul class="uk-tab"
        data-uk-tab="{connect:'#tab-content'}">
        <li class="uk-active"
          aria-expanded="true">
          <a href="#">HTML</a>
        </li>
        <li aria-expanded="false"
          class="">
          <a href="#">Data</a>
        </li>
      </ul>
      <ul id="tab-content"
        class="uk-switcher uk-margin">
        <li class="uk-active">
          <pre><code>&lt;vn-sunburst :model="data"
      :margin="{left: 70, bottom: 30, right: 0}"&gt;
&lt;/vn-sunburst&gt;</code></pre>
        </li>
        <li>
          <pre><code>{{traffics}}</code></pre>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import d3 from 'd3'

export default {
  data () {
    return {
      // trafficData: [{ "key": "a20180301ydy_index", "pv": 23083, "uv": 22010 }, { "key": "a20180301ydy_index", "pv": 23083, "uv": 22010 }, { "key": "a20180301ydy_index_dddsdf", "pv": 23083, "uv": 22010 }]
      trafficData: [{ "key": "a20180301ydy_index", "pv": 23083, "uv": 22010 }, { "key": "a20180301ydym_index", "pv": 5134, "uv": 5124 }, { "key": "a20180301ydy_index_newsdetail", "pv": 4922, "uv": 4850 }, { "key": "index", "pv": 2449, "uv": 2279 }, { "key": "a20180301ydy_a20180301ydy_index", "pv": 2344, "uv": 2319 }, { "key": "a20180301ydy_index_characterlist", "pv": 2187, "uv": 2159 }, { "key": "a20180301ydy_index_newslist", "pv": 2043, "uv": 2015 }, { "key": "a20180301ydy_index_newsdetail_newsdetail", "pv": 1906, "uv": 1894 }, { "key": "a20180301ydy_index_soldierlist", "pv": 1200, "uv": 1196 }, { "key": "a20180301ydy_index_characterlist_characterdetail", "pv": 1141, "uv": 1119 }, { "key": "a20171130yuyue_index", "pv": 1023, "uv": 961 }, { "key": "newsdetail", "pv": 968, "uv": 924 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail", "pv": 864, "uv": 863 }, { "key": "a20180301ydy_index_strategy", "pv": 858, "uv": 852 }, { "key": "a20180301ydy_index_newslist_newslist", "pv": 813, "uv": 804 }, { "key": "a20180301ydy_index_index", "pv": 730, "uv": 721 }, { "key": "a20180301ydy_index_newslist_newsdetail", "pv": 727, "uv": 723 }, { "key": "a20180301ydym_a20180301ydym_index", "pv": 700, "uv": 700 }, { "key": "a20171130yuyue_a20171130yuyue_index", "pv": 605, "uv": 596 }, { "key": "a20180301ydy_index_a20180301ydy_index", "pv": 550, "uv": 542 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist", "pv": 513, "uv": 503 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index", "pv": 468, "uv": 463 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail", "pv": 463, "uv": 463 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 460, "uv": 459 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index", "pv": 455, "uv": 452 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail", "pv": 422, "uv": 414 }, { "key": "a20180301ydy_index_newslist_newslist_newslist", "pv": 377, "uv": 373 }, { "key": "a20180301ydy_index_anchor", "pv": 318, "uv": 314 }, { "key": "a20180301ydy_index_strategy_strategy", "pv": 308, "uv": 305 }, { "key": "a20180301ydy_index_strategy_newsdetail", "pv": 296, "uv": 295 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail_characterlist", "pv": 286, "uv": 281 }, { "key": "a20180301ydy_index_newslist_newsdetail_newsdetail", "pv": 279, "uv": 279 }, { "key": "index_index", "pv": 271, "uv": 264 }, { "key": "a20180301ydy_index_newsdetail_newslist", "pv": 268, "uv": 268 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail", "pv": 267, "uv": 267 }, { "key": "a20180301ydy_index_newsdetail_index", "pv": 261, "uv": 258 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index", "pv": 261, "uv": 261 }, { "key": "a20171130yuyue_index_newsdetail", "pv": 254, "uv": 251 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 245, "uv": 245 }, { "key": "a20180301ydy_index_soldierlist_newsdetail", "pv": 237, "uv": 236 }, { "key": "index_newsdetail", "pv": 233, "uv": 229 }, { "key": "a20180301ydy_a20180301ydy_index_newslist", "pv": 227, "uv": 227 }, { "key": "a20180301ydym_a20180301ydym_a20180301ydym_index", "pv": 212, "uv": 212 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_newsdetail", "pv": 184, "uv": 184 }, { "key": "a20171130yuyue_a20171130yuyue_index_newsdetail", "pv": 184, "uv": 183 }, { "key": "a20180301ydy_index_soldierlist_soldierlist", "pv": 182, "uv": 182 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist", "pv": 179, "uv": 179 }, { "key": "a20180301ydy_index_newsdetail_characterlist", "pv": 179, "uv": 179 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newslist", "pv": 176, "uv": 176 }, { "key": "characterdetail", "pv": 165, "uv": 158 }, { "key": "a20180301ydy_index_newslist_newslist_newsdetail", "pv": 158, "uv": 158 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail", "pv": 152, "uv": 152 }, { "key": "newsdetail_newsdetail", "pv": 151, "uv": 149 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 146, "uv": 146 }, { "key": "a20180301ydy_index_characterlist_index", "pv": 145, "uv": 145 }, { "key": "a20180301ydy_index_newsdetail_strategy", "pv": 143, "uv": 143 }, { "key": "a20180301ydy_index_newslist_newsdetail_newsdetail_newsdetail", "pv": 142, "uv": 142 }, { "key": "a20180301ydy_index_a20171130yuyue_index", "pv": 142, "uv": 142 }, { "key": "a20180301ydy_index_fictiondetail", "pv": 141, "uv": 141 }, { "key": "a20180301ydy_index_characterlist_soldierlist", "pv": 139, "uv": 139 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail", "pv": 137, "uv": 136 }, { "key": "a20180301ydym_index_a20180301ydym_index", "pv": 131, "uv": 131 }, { "key": "a20180301ydy_index_index_newsdetail", "pv": 131, "uv": 131 }, { "key": "a20180301ydy_a20180301ydy_index_index", "pv": 126, "uv": 125 }, { "key": "a20180301ydy_a20180301ydy_index_soldierlist", "pv": 120, "uv": 120 }, { "key": "a20180301ydy_index_newsdetail_soldierlist", "pv": 117, "uv": 117 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index", "pv": 113, "uv": 113 }, { "key": "a20180301ydy_index_strategy_strategy_strategy", "pv": 112, "uv": 112 }, { "key": "a20171130yuyue_index_newsdetail_newsdetail", "pv": 112, "uv": 111 }, { "key": "index_characterlist", "pv": 111, "uv": 98 }, { "key": "a20180130zlbym_a20180130zlbym_index", "pv": 110, "uv": 109 }, { "key": "a20180301ydy_index_newslist_newsdetail_newslist", "pv": 110, "uv": 110 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail_newsdetail", "pv": 109, "uv": 109 }, { "key": "a20171130yuyue_index_characterlist", "pv": 109, "uv": 108 }, { "key": "a20180301ydy_index_colleagues", "pv": 108, "uv": 108 }, { "key": "a20180301ydy_index_newsdetail_newslist_newsdetail", "pv": 108, "uv": 108 }, { "key": "a20180301ydy_index_videosdetail", "pv": 107, "uv": 107 }, { "key": "a20180301ydy_index_characterlist_newsdetail", "pv": 104, "uv": 104 }, { "key": "a20180301ydy_index_characterlist_strategy", "pv": 102, "uv": 102 }, { "key": "a20180130zlbym_index", "pv": 100, "uv": 99 }, { "key": "a20180301ydy_index_soldierlist_newsdetail_newsdetail", "pv": 98, "uv": 98 }, { "key": "index_index_index", "pv": 96, "uv": 96 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_characterdetail", "pv": 96, "uv": 96 }, { "key": "a20180301ydy_index_a20180301ydy_index_newsdetail", "pv": 95, "uv": 95 }, { "key": "a20180301ydy_index_newsdetail_a20180301ydy_index", "pv": 94, "uv": 94 }, { "key": "a20180301ydy_index_newsdetail_characterlist_characterdetail", "pv": 93, "uv": 93 }, { "key": "a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_index", "pv": 92, "uv": 92 }, { "key": "a20180301ydy_index_strategy_newsdetail_newsdetail", "pv": 92, "uv": 92 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newslist", "pv": 90, "uv": 90 }, { "key": "a20180301ydy_index_newsdetail_newslist_newslist", "pv": 89, "uv": 89 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newsdetail", "pv": 88, "uv": 88 }, { "key": "a20180301ydy_index_a20171130yuyue_newsdetail", "pv": 87, "uv": 87 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_index", "pv": 84, "uv": 84 }, { "key": "a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail", "pv": 82, "uv": 82 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_newsdetail", "pv": 81, "uv": 81 }, { "key": "a20180301ydy_index_newslist_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 80, "uv": 80 }, { "key": "a20180301ydy_index_soldierlist_characterlist", "pv": 80, "uv": 80 }, { "key": "a20180301ydy_a20180301ydy_index_a20180301ydy_index", "pv": 79, "uv": 79 }, { "key": "a20180301ydy_index_index_index", "pv": 79, "uv": 78 }, { "key": "a20171130yuyue_index_newslist", "pv": 78, "uv": 76 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_newsdetail_newsdetail", "pv": 78, "uv": 78 }, { "key": "a20180301ydy_index_characterlist_characterlist", "pv": 77, "uv": 77 }, { "key": "index_newslist", "pv": 76, "uv": 75 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newsdetail", "pv": 76, "uv": 76 }, { "key": "index_newsdetail_newsdetail", "pv": 76, "uv": 76 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_index", "pv": 76, "uv": 76 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newslist", "pv": 75, "uv": 74 }, { "key": "a20180301ydy_index_strategy_newsdetail_strategy", "pv": 74, "uv": 74 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newsdetail", "pv": 74, "uv": 74 }, { "key": "a20180301ydy_index_a20180301ydy_a20180301ydy_index", "pv": 72, "uv": 72 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_strategy", "pv": 71, "uv": 71 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 69, "uv": 68 }, { "key": "index_characterlist_characterdetail", "pv": 68, "uv": 56 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_characterlist", "pv": 68, "uv": 68 }, { "key": "a20180301ydy_index_anchor_anchorroom", "pv": 67, "uv": 67 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newslist_newslist", "pv": 66, "uv": 66 }, { "key": "a20180301ydy_a20180301ydy_index_strategy", "pv": 66, "uv": 66 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newsdetail", "pv": 66, "uv": 66 }, { "key": "a20171130yuyue_index_characterlist_characterdetail", "pv": 66, "uv": 66 }, { "key": "a20171130yuyue_index_soldierlist", "pv": 63, "uv": 63 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newsdetail_newsdetail", "pv": 63, "uv": 63 }, { "key": "a20180301ydy_index_newsdetail_strategy_newsdetail", "pv": 62, "uv": 62 }, { "key": "index_a20171130yuyue_a20171130yuyue_index", "pv": 62, "uv": 62 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_a20171130yuyue_index", "pv": 61, "uv": 61 }, { "key": "a20180301ydy_index_newslist_index", "pv": 60, "uv": 60 }, { "key": "characterlist", "pv": 60, "uv": 54 }, { "key": "a20171130yuyue_index_newsdetail_newsdetail_newsdetail", "pv": 59, "uv": 59 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newslist", "pv": 58, "uv": 58 }, { "key": "a20180301ydy_index_newslist_newslist_index", "pv": 56, "uv": 56 }, { "key": "a20180301ydy_index_index_characterlist", "pv": 56, "uv": 56 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index", "pv": 55, "uv": 55 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail_newsdetail_newsdetail", "pv": 55, "uv": 55 }, { "key": "a20180301ydy_index_index_newsdetail_newsdetail", "pv": 54, "uv": 54 }, { "key": "a20180301ydy_index_characterlist_characterdetail_index", "pv": 54, "uv": 54 }, { "key": "a20180301ydym_index_index", "pv": 53, "uv": 53 }, { "key": "a20180301ydy_index_newslist_newsdetail_newslist_newslist", "pv": 52, "uv": 52 }, { "key": "a20180301ydy_index_characterlist_newslist", "pv": 51, "uv": 51 }, { "key": "a20180301ydy_index_a20180301ydy_newsdetail", "pv": 50, "uv": 50 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newslist_newsdetail", "pv": 50, "uv": 50 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_a20171130yuyue_index", "pv": 49, "uv": 49 }, { "key": "a20180301ydy_index_soldierlist_newsdetail_newsdetail_newsdetail", "pv": 49, "uv": 49 }, { "key": "a20171130yuyue_a20171130yuyue_index_characterlist", "pv": 49, "uv": 49 }, { "key": "index_soldierlist", "pv": 49, "uv": 49 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterdetail", "pv": 48, "uv": 47 }, { "key": "a20180301ydy_index_newsdetail_newslist_newsdetail_newsdetail", "pv": 48, "uv": 48 }, { "key": "a20180301ydy_index_a20180301ydy_index_newslist", "pv": 48, "uv": 48 }, { "key": "a20180301ydy_index_strategy_strategy_strategy_strategy", "pv": 48, "uv": 48 }, { "key": "a20180301ydy_index_newslist_newslist_newsdetail_newsdetail", "pv": 47, "uv": 47 }, { "key": "a20180301ydy_index_soldierlist_index", "pv": 47, "uv": 46 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_soldierdetail", "pv": 45, "uv": 45 }, { "key": "a20180301ydy_index_newsdetail_index_newsdetail", "pv": 45, "uv": 45 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 44, "uv": 44 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_characterdetail_characterlist", "pv": 44, "uv": 44 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_a20180301ydy_index", "pv": 44, "uv": 44 }, { "key": "a20180301ydy_index_newslist_newsdetail_index", "pv": 44, "uv": 44 }, { "key": "a20180301ydy_index_index_newslist", "pv": 43, "uv": 43 }, { "key": "newsdetail_newsdetail_newsdetail", "pv": 43, "uv": 42 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_strategy", "pv": 43, "uv": 43 }, { "key": "a20180301ydy_index_colleagues_fictiondetail", "pv": 43, "uv": 43 }, { "key": "a20180301ydy_index_characterlist_characterdetail_soldierlist", "pv": 43, "uv": 43 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newslist", "pv": 43, "uv": 43 }, { "key": "a20171130yuyue_index_index", "pv": 43, "uv": 39 }, { "key": "newsdetail_index", "pv": 42, "uv": 39 }, { "key": "a20180301ydy_index_strategy_strategy_strategy_newsdetail", "pv": 42, "uv": 42 }, { "key": "a20180301ydy_index_newsdetail_strategy_strategy", "pv": 42, "uv": 42 }, { "key": "a20180301ydy_index_fictiondetail_fictiondetail", "pv": 42, "uv": 42 }, { "key": "a20180301ydy_index_characterlist_strategy_newsdetail", "pv": 42, "uv": 42 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_characterlist", "pv": 41, "uv": 41 }, { "key": "a20180301ydy_index_strategy_newsdetail_strategy_newsdetail", "pv": 41, "uv": 41 }, { "key": "index_a20180301ydy_index", "pv": 41, "uv": 40 }, { "key": "a20171130yuyue_a20171130yuyue_index_newslist", "pv": 41, "uv": 41 }, { "key": "a20171130yuyue_index_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 41, "uv": 41 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_strategy", "pv": 40, "uv": 40 }, { "key": "a20180301ydy_index_a20171130yuyue_newslist", "pv": 40, "uv": 40 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail_newsdetail", "pv": 40, "uv": 40 }, { "key": "a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_index", "pv": 40, "uv": 40 }, { "key": "a20180301ydy_index_newsdetail_newslist_newslist_newslist", "pv": 39, "uv": 39 }, { "key": "index_characterlist_characterdetail_characterlist", "pv": 39, "uv": 30 }, { "key": "a20180301ydy_index_soldierlist_characterlist_characterdetail", "pv": 39, "uv": 39 }, { "key": "a20171130yuyue_index_a20171130yuyue_index", "pv": 39, "uv": 39 }, { "key": "a20180301ydy_index_characterlist_strategy_strategy", "pv": 38, "uv": 38 }, { "key": "a20180301ydy_index_a20180301ydy_index_characterlist", "pv": 38, "uv": 38 }, { "key": "a20180301ydy_index_characterlist_newsdetail_newsdetail", "pv": 37, "uv": 37 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_newsdetail", "pv": 37, "uv": 37 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newslist_newslist", "pv": 37, "uv": 37 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_a20180301ydy_index", "pv": 37, "uv": 36 }, { "key": "index_newsdetail_newsdetail_newsdetail", "pv": 37, "uv": 37 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail", "pv": 37, "uv": 37 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_characterlist_characterdetail", "pv": 36, "uv": 36 }, { "key": "newslist", "pv": 36, "uv": 33 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_index", "pv": 36, "uv": 36 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_soldierlist", "pv": 36, "uv": 36 }, { "key": "a20180301ydy_index_strategy_newsdetail_newsdetail_newsdetail", "pv": 36, "uv": 36 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newslist_newsdetail", "pv": 35, "uv": 35 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail", "pv": 35, "uv": 35 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail_newsdetail", "pv": 35, "uv": 35 }, { "key": "a20180301ydy_index_characterlist_soldierlist_soldierdetail", "pv": 35, "uv": 35 }, { "key": "a20180301ydy_index_a20171130yuyue_index_newsdetail", "pv": 35, "uv": 35 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail", "pv": 34, "uv": 34 }, { "key": "a20180130zlbym_a20180301ydy_index", "pv": 34, "uv": 32 }, { "key": "index_characterlist_characterdetail_characterlist_characterdetail", "pv": 34, "uv": 26 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_index", "pv": 34, "uv": 34 }, { "key": "a20171130yuyue_index_newslist_newsdetail", "pv": 34, "uv": 34 }, { "key": "a20180301ydy_index_a20171130yuyue_characterlist", "pv": 34, "uv": 34 }, { "key": "characterdetail_characterlist", "pv": 34, "uv": 34 }, { "key": "a20171130yuyue_a20171130yuyue_index_soldierlist", "pv": 34, "uv": 34 }, { "key": "a20180301ydy_index_a20180301ydy_index_a20180301ydy_index", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_characterlist", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail_characterlist", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_newslist_newsdetail_newslist_newsdetail", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_soldierlist_newslist", "pv": 33, "uv": 33 }, { "key": "a20180301ydym_index_a20180301ydym_a20180301ydym_index", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_characterlist_characterlist_characterdetail", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_newslist", "pv": 33, "uv": 33 }, { "key": "a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail_newsdetail", "pv": 33, "uv": 33 }, { "key": "a20180301ydy_a20180301ydy_index_a20171130yuyue_a20171130yuyue_index", "pv": 32, "uv": 32 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_newsdetail", "pv": 32, "uv": 32 }, { "key": "a20180301ydy_index_soldierlist_strategy", "pv": 32, "uv": 32 }, { "key": "characterdetail_characterlist_characterdetail", "pv": 32, "uv": 32 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newsdetail_newsdetail", "pv": 32, "uv": 32 }, { "key": "index_strategy", "pv": 32, "uv": 32 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_a20180301ydy_index", "pv": 32, "uv": 32 }, { "key": "a20180130zlbym_a20180130zlbym_index_index", "pv": 31, "uv": 31 }, { "key": "a20180301ydy_index_a20171130yuyue_newsdetail_newsdetail", "pv": 31, "uv": 31 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail_characterlist_characterdetail", "pv": 31, "uv": 31 }, { "key": "a20180301ydy_index_newslist_characterlist", "pv": 31, "uv": 31 }, { "key": "a20180301ydy_index_characterlist_anchor", "pv": 30, "uv": 30 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_soldierdetail_soldierdetail", "pv": 30, "uv": 30 }, { "key": "a20180301ydy_index_strategy_characterlist", "pv": 29, "uv": 29 }, { "key": "a20180301ydy_index_newslist_newslist_newsdetail_newslist", "pv": 29, "uv": 29 }, { "key": "a20180301ydy_index_newsdetail_characterlist_characterdetail_characterlist", "pv": 29, "uv": 29 }, { "key": "a20180301ydy_index_a20171130yuyue_a20180301ydy_index", "pv": 29, "uv": 29 }, { "key": "characterdetail_newsdetail", "pv": 29, "uv": 29 }, { "key": "characterlist_characterdetail", "pv": 29, "uv": 28 }, { "key": "a20171130yuyue_a20171130yuyue_a20180301ydy_index", "pv": 28, "uv": 28 }, { "key": "a20171130yuyue_index_characterlist_characterdetail_characterlist", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_a20180301ydy_index_strategy_newsdetail", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_a20180301ydy_index_a20180301ydy_a20180301ydy_index", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_index_newslist_newsdetail_newsdetail_newslist", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_index_a20180301ydy_index_newsdetail_newsdetail", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_index_characterlist_index_newsdetail", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_index_strategy_newsdetail_strategy_strategy", "pv": 28, "uv": 28 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_characterlist", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail_strategy", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_newsdetail_anchor", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_colleagues_colleagues", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_strategy_newsdetail_strategy_newsdetail_strategy", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_anchor_index", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newsdetail_newsdetail_newsdetail", "pv": 27, "uv": 27 }, { "key": "a20171130yuyue_a20180301ydy_index", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_strategy_newsdetail", "pv": 27, "uv": 27 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail_strategy", "pv": 27, "uv": 27 }, { "key": "index_news", "pv": 26, "uv": 22 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_soldierlist", "pv": 26, "uv": 26 }, { "key": "a20180301ydy_index_newsdetail_a20180301ydy_index_newsdetail", "pv": 26, "uv": 26 }, { "key": "index_newslist_newsdetail", "pv": 26, "uv": 26 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_index", "pv": 26, "uv": 26 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_soldierdetail_soldierdetail_soldierdetail", "pv": 26, "uv": 26 }, { "key": "a20180301ydy_index_newsdetail_characterlist_characterdetail_newsdetail", "pv": 26, "uv": 26 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_a20171130yuyue_newsdetail_newsdetail", "pv": 26, "uv": 26 }, { "key": "a20180301ydym_a20180301ydym_index_a20180301ydym_index", "pv": 26, "uv": 26 }, { "key": "a20171130yuyue_a20171130yuyue_index_characterlist_characterdetail", "pv": 26, "uv": 26 }, { "key": "a20171130yuyue_index_strategy", "pv": 25, "uv": 25 }, { "key": "index_index_index_index", "pv": 25, "uv": 25 }, { "key": "a20180301ydy_a20180301ydy_index_index_index", "pv": 25, "uv": 25 }, { "key": "a20180130zlbym_a20180130zlbym_a20180130zlbym_index", "pv": 25, "uv": 25 }, { "key": "a20180301ydy_index_characterlist_index_strategy", "pv": 25, "uv": 25 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_index", "pv": 25, "uv": 25 }, { "key": "a20180301ydy_index_index_index_index", "pv": 25, "uv": 25 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_strategy_strategy", "pv": 25, "uv": 25 }, { "key": "a20171130yuyue_index_characterlist_characterdetail_characterlist_characterdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_index", "pv": 24, "uv": 24 }, { "key": "characterdetail_characterlist_characterdetail_characterlist", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newsdetail_characterlist_characterdetail_characterlist_characterdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newsdetail_newsdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_newsdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_anchor_newslist", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterdetail_characterdetail", "pv": 24, "uv": 23 }, { "key": "a20180301ydy_index_a20180301ydy_index_characterlist_characterdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newslist_a20180301ydy_index", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_a20180301ydy_newslist", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_a20180301ydy_index_anchor", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_strategy_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 24, "uv": 24 }, { "key": "a20171130yuyue_a20171130yuyue_index_index", "pv": 24, "uv": 22 }, { "key": "a20171130yuyue_a20171130yuyue_index_a20171130yuyue_index", "pv": 24, "uv": 24 }, { "key": "a20171130yuyue_a20171130yuyue_index_newslist_newsdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail_characterdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_a20180301ydym_index", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newslist_soldierlist", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newsdetail_soldierlist_newsdetail", "pv": 24, "uv": 24 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newslist", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newslist_newsdetail_newsdetail", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_soldierlist_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 23, "uv": 23 }, { "key": "index_a20171130yuyue_index", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_anchor_newsdetail", "pv": 23, "uv": 23 }, { "key": "index_characterlist_characterdetail_characterlist_characterdetail_characterlist", "pv": 23, "uv": 19 }, { "key": "a20171130yuyue_index_a20171130yuyue_a20171130yuyue_index", "pv": 23, "uv": 23 }, { "key": "characterdetail_characterlist_characterdetail_characterlist_characterdetail", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_a20171130yuyue_newslist", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_a20180301ydy_index_soldierlist_newsdetail", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newsdetail_newsdetail", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_index_characterlist_characterdetail", "pv": 23, "uv": 23 }, { "key": "a20180301ydy_index_strategy_strategy_strategy_strategy_newsdetail", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_a20180301ydy_index_index", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_characterlist_characterdetail_index_characterlist", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_newslist_newsdetail_newslist_newslist_newslist", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 22, "uv": 22 }, { "key": "a20180130zlbym_a20180130zlbym_a20180130zlbym_a20180130zlbym_index", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_newslist_newslist_newslist_newslist_index", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_characterlist_index_characterlist", "pv": 22, "uv": 22 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterdetail_characterdetail_characterdetail", "pv": 21, "uv": 20 }, { "key": "a20180301ydy_index_index_a20180301ydy_index", "pv": 21, "uv": 21 }, { "key": "index_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 21, "uv": 21 }, { "key": "a20171130yuyue_index_newslist_newslist", "pv": 21, "uv": 21 }, { "key": "index_characterlist_characterdetail_characterlist_characterdetail_characterlist_characterdetail", "pv": 21, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_a20180301ydy_a20180301ydy_index", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_anchor_characterlist", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_a20180301ydy_a20180301ydy_a20180301ydy_index", "pv": 21, "uv": 21 }, { "key": "index_anchor", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_newsdetail_index_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 21, "uv": 20 }, { "key": "a20180301ydy_index_characterlist_newsdetail_newsdetail_newsdetail", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_characterlist", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_newsdetail_newslist_newslist_newsdetail", "pv": 21, "uv": 21 }, { "key": "a20180301ydy_index_characterlist_a20180301ydy_index", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_index", "pv": 20, "uv": 20 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newslist", "pv": 20, "uv": 20 }, { "key": "index_newslist_newslist", "pv": 20, "uv": 20 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_characterlist_characterdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydym_m201802_a20180301ydym_index", "pv": 20, "uv": 20 }, { "key": "index_newsdetail_index", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_index_soldierlist", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_newslist_newslist_newsdetail_newsdetail_newsdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_strategy", "pv": 20, "uv": 20 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newsdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newslist_newslist", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newslist_newsdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_characterdetail_newsdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_a20180301ydy_characterlist", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_characterlist_strategy_strategy_newsdetail", "pv": 20, "uv": 20 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_soldierdetail", "pv": 20, "uv": 20 }, { "key": "a20171130yuyue_index_newsdetail_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_soldierlist_videosdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_videosdetail_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_newslist_newsdetail_a20180301ydy_index", "pv": 19, "uv": 19 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180130zlbym_a20180130zlbym_newsdetail", "pv": 19, "uv": 19 }, { "key": "newsdetail_newsdetail_newsdetail_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_strategy_index", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_strategy_strategy_strategy_strategy_strategy", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail_index", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_soldierlist", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_index", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_newsdetail_soldierlist_soldierdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newslist_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_strategy_newslist", "pv": 19, "uv": 19 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_newsdetail_newsdetail", "pv": 19, "uv": 19 }, { "key": "a20180130zlbym_a20180130zlbym_a20180301ydy_index", "pv": 19, "uv": 19 }, { "key": "a20171130yuyue_a20171130yuyue_index_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_characterlist_characterdetail_index_characterlist_characterdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_index_strategy_strategy", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index_newsdetail", "pv": 18, "uv": 18 }, { "key": "characterdetail_characterlist_characterdetail_characterlist_characterdetail_characterlist", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_characterlist_strategy_newsdetail_strategy", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_a20180301ydy_index", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_index_newslist_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newsdetail_newsdetail_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_characterlist", "pv": 18, "uv": 18 }, { "key": "index_a20180301ydy_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newslist_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_characterlist", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail_characterlist", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_fictiondetail_colleagues", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_a20180301ydy_index_newslist_newslist", "pv": 18, "uv": 18 }, { "key": "a20180130zlbym_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_newslist_newsdetail_newsdetail_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_strategy_strategy", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_a20171130yuyue_newslist_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_soldierlist_soldierlist", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_newslist_newsdetail_newslist", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_newsdetail_strategy_newsdetail_newsdetail", "pv": 18, "uv": 18 }, { "key": "a20180301ydy_index_soldierlist_fictiondetail", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_soldierlist", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_strategy_strategy", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_strategy_strategy_strategy", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_newslist", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_a20180301ydy_index", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_strategy_newsdetail_strategy", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_a20180301ydy_index_strategy", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_strategy_strategy_newsdetail", "pv": 17, "uv": 17 }, { "key": "newsdetail_index_newsdetail", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_index_index", "pv": 17, "uv": 17 }, { "key": "characterdetail_index", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_strategy_newsdetail", "pv": 17, "uv": 17 }, { "key": "a20180130zlbym_index_index", "pv": 17, "uv": 17 }, { "key": "a20180301ydym_index_a20180301ydym_index_a20180301ydym_index", "pv": 17, "uv": 17 }, { "key": "a20180301ydy_index_colleagues_fictiondetail_fictiondetail", "pv": 16, "uv": 16 }, { "key": "a20171130yuyue_index_videosdetail", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_anchor", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_newsdetail_colleagues", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_a20180301ydy_index_fictiondetail", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_newslist_newsdetail", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_characterlist_characterdetail_characterlist", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_soldierlist_characterlist_characterdetail_characterlist", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_videolist", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_strategy_newsdetail_strategy_strategy_newsdetail", "pv": 16, "uv": 16 }, { "key": "videosdetail", "pv": 16, "uv": 15 }, { "key": "a20171130yuyue_index_characterlist_characterdetail_newsdetail", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_soldierlist", "pv": 16, "uv": 16 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_index", "pv": 16, "uv": 16 }, { "key": "a20180301ydym_newsdetail", "pv": 16, "uv": 16 }, { "key": "index_news_news", "pv": 16, "uv": 15 }, { "key": "a20180301ydy_index_a20180301ydy_index_anchor", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_characterlist_index_strategy_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_newslist_anchor", "pv": 15, "uv": 15 }, { "key": "a20171130yuyue_index_characterlist_characterdetail_characterlist_characterdetail_characterlist", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_characterlist_newslist_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_videosdetail_videosdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail_strategy_strategy", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_soldierlist", "pv": 15, "uv": 15 }, { "key": "index_colleagues", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_newslist_strategy", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_newslist_newsdetail_newslist_newslist_newsdetail", "pv": 15, "uv": 15 }, { "key": "characterdetail_characterlist_characterdetail_characterlist_characterdetail_characterlist_characterdetail", "pv": 15, "uv": 15 }, { "key": "fictiondetail", "pv": 15, "uv": 11 }, { "key": "index_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_a20180301ydy_characterlist_characterdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_a20171130yuyue_characterlist_characterdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_colleagues_colleagues_fictiondetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_newsdetail_characterlist_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_index_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20171130yuyue_a20171130yuyue_index_characterlist_characterdetail_characterlist", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_index_newsdetail_newsdetail_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_strategy_newsdetail", "pv": 15, "uv": 15 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_index_newsdetail_newsdetail_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_a20180301ydy_index_newsdetail_newsdetail_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_soldierlist", "pv": 14, "uv": 14 }, { "key": "a20171130yuyue_index_newslist_newsdetail_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail_newsdetail_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_newsdetail_newsdetail_index", "pv": 14, "uv": 14 }, { "key": "a20171130yuyue_index_newsdetail_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newslist_characterlist_characterdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_a20180301ydy_index_newslist_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_strategy_soldierlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newsdetail_index_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_newslist_newslist_newslist_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_soldierlist_soldierlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_newslist_newslist", "pv": 14, "uv": 14 }, { "key": "a20171130yuyue_a20171130yuyue_index_characterlist_characterdetail_characterlist_characterdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_soldierlist_newsdetail_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_index", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_strategy_newsdetail_strategy", "pv": 14, "uv": 14 }, { "key": "a20171130yuyue_index_newsdetail_characterlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newsdetail_fictiondetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_soldierlist_anchor", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newslist_newsdetail_newsdetail_newslist_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_newslist_newslist_a20180301ydy_index", "pv": 14, "uv": 14 }, { "key": "newsdetail_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydym_a20180301ydym_index_a20180301ydym_a20180301ydym_index", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_soldierlist_newsdetail", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_anchor_anchor", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterdetail_characterlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newslist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_characterlist_characterlist_characterdetail_characterlist", "pv": 14, "uv": 14 }, { "key": "a20180301ydy_index_soldierlist_soldierdetail_newsdetail_newsdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_characterlist_characterdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_characterlist_characterdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_a20180301ydy_index_soldierlist_soldierdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_index_characterlist_characterdetail_characterlist", "pv": 13, "uv": 13 }, { "key": "a20171130yuyue_a20171130yuyue_index_strategy", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_characterdetail_index", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newsdetail_newsdetail_newslist", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_characterlist", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_soldierlist_a20180301ydy_index", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_newslist_newsdetail_a20171130yuyue_a20171130yuyue_newslist", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_newsdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterlist_index", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index_newslist", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_characterlist_characterlist_characterdetail_characterlist_characterdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_characterlist_soldierlist_soldierdetail_soldierdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_characterlist_characterdetail_newsdetail_newsdetail_characterlist", "pv": 13, "uv": 13 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_soldierlist", "pv": 13, "uv": 13 }, { "key": "a20180301ydym_index_a20180301ydym_a20180301ydym_a20180301ydym_index", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_a20180301ydy_newsdetail_newsdetail", "pv": 13, "uv": 13 }, { "key": "a20180301ydy_index_a20180301ydy_newslist_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20171130yuyue_a20171130yuyue_index_newsdetail_soldierlist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newsdetail_characterlist_index", "pv": 12, "uv": 12 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_newslist_newsdetail", "pv": 12, "uv": 12 }, { "key": "index_index_index_index_index", "pv": 12, "uv": 12 }, { "key": "newsdetail_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "video", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20180301ydy_index_characterlist_characterdetail_characterlist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydym_a20180301ydym_a20180301ydym_index_a20180301ydym_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_a20180301ydy_index_index_newsdetail", "pv": 12, "uv": 12 }, { "key": "characterdetail_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_a20171130yuyue_index_characterlist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_newslist_newslist", "pv": 12, "uv": 12 }, { "key": "a20171130yuyue_index_newslist_newsdetail_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_a20180301ydy_a20180301ydy_a20180301ydy_index_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20171130yuyue_index_newslist_newslist_newslist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_a20180301ydy_index_characterlist_characterdetail_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newslist_index_newslist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_strategy_newsdetail_newsdetail_strategy", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_soldierlist_characterlist_characterdetail_characterlist_characterdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_a20171130yuyue_a20171130yuyue_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_index_strategy", "pv": 12, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_newslist_newslist_newslist_newslist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_strategy_strategy_strategy", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_soldierlist_newslist_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_index_a20171130yuyue_a20171130yuyue_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newslist_newslist_newsdetail_newslist_newslist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_characterlist_soldierlist_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_soldierlist_index_newsdetail", "pv": 12, "uv": 12 }, { "key": "index_characterlist_index", "pv": 12, "uv": 12 }, { "key": "strategy", "pv": 12, "uv": 11 }, { "key": "a20180301ydy_index_anchor_anchorroom_anchorroom", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_index_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_newsdetail_newsdetail_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_a20171130yuyue_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_characterlist_characterdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_a20180301ydy_index_soldierlist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_characterlist_colleagues", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_a20180301ydy_index_a20171130yuyue_a20171130yuyue_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_newslist_newslist_characterlist", "pv": 12, "uv": 12 }, { "key": "soldierlist", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_strategy_strategy_newsdetail_strategy_newsdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_strategy_strategy_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_soldierlist_colleagues", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_anchor_characterlist_characterdetail", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_strategy_newsdetail_index", "pv": 12, "uv": 12 }, { "key": "a20180301ydy_index_soldierlist_newslist_newslist", "pv": 12, "uv": 11 }, { "key": "a20180301ydy_a20180301ydy_index_a20171130yuyue_index", "pv": 12, "uv": 12 }, { "key": "index_video", "pv": 11, "uv": 10 }, { "key": "a20171128yyhw_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_strategy_newsdetail_soldierlist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_fictiondetail_colleagues_fictiondetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_a20171130yuyue_a20171130yuyue_index_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_index_index_index_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_a20180301ydy_a20180301ydy_index_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_strategy_newsdetail_characterlist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_index_characterlist_characterdetail_characterlist_characterdetail", "pv": 11, "uv": 11 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_a20180301ydy_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydym_a20180301ydym_m201802_a20180301ydym_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_soldierlist_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20171130yuyue_index_newsdetail_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_characterlist_characterdetail_soldierlist_soldierdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_strategy_newslist_newslist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_characterlist_characterdetail_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_a20180301ydy_index_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_anchor_soldierlist", "pv": 11, "uv": 11 }, { "key": "index_newsdetail_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_a20171130yuyue_index_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_a20180301ydy_index_strategy_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_a20180301ydy_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_a20171130yuyue_a20171130yuyue_index_anchor", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_characterlist_characterdetail_characterdetail_characterlist_characterdetail", "pv": 11, "uv": 11 }, { "key": "a20171130yuyue_a20171130yuyue_index_a20171130yuyue_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_characterlist_newsdetail_newsdetail_newsdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_soldierlist_soldierlist_strategy", "pv": 11, "uv": 11 }, { "key": "characterdetail_characterdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydym_a20180301ydym_index_index", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_index_newslist_newslist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_a20180301ydy_index_newslist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_a20180301jfdh_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_fictiondetail_fictiondetail_fictiondetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_characterlist_index_soldierlist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newsdetail_newsdetail_newslist_newslist", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_a20180301ydy_index_a20180301ydy_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_newslist_newsdetail_index_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20180301ydy_index_soldierlist_characterlist_characterdetail_newsdetail", "pv": 11, "uv": 11 }, { "key": "a20171130yuyue_a20171130yuyue_a20171130yuyue_index_strategy", "pv": 11, "uv": 11 }]
    }
  },
  computed: {
    traffics () {
      let root = { 'name': 'root', 'children': [] }
      for (let i = 0; i < this.trafficData.length; i++) {
        let { key: sequence, pv: size } = this.trafficData[i]
        if (isNaN(size)) {
          continue
        }
        let parts = sequence.split("_")
        parts.push('队尾')
        parts = parts.slice(0, 3)
        let currentNode = root
        for (let j = 0; j < parts.length; j++) {
          let children = currentNode["children"]
          let nodeName = parts[j]
          let childNode
          if (j + 1 < parts.length) {
            let foundChild = false
            for (let k = 0; k < children.length; k++) {
              if (children[k]["name"] == nodeName) {
                childNode = children[k]
                foundChild = true
                break;
              }
            }
            if (!foundChild) {
              childNode = { "name": nodeName, "children": [] }
              children.push(childNode)
            } else {
              childNode.value += size
            }
            currentNode = childNode
          } else {
            childNode = { "name": nodeName == '队尾' ? 'end' : nodeName, size }
            children.push(childNode)
          }
        }
      }
      // console.log(root)
      return [root]
      return [{
        "name": "flare",
        "children": [
          {
            "name": "analytics",
            "children": [
              {
                "name": "cluster",
                "children": [
                  { "name": "AgglomerativeCluster", "size": 3938 },
                  { "name": "CommunityStructure", "size": 3812 },
                  { "name": "HierarchicalCluster", "size": 6714 },
                  { "name": "MergeEdge", "size": 743 }
                ]
              },
              {
                "name": "graph",
                "children": [
                  { "name": "BetweennessCentrality", "size": 3534 },
                  { "name": "LinkDistance", "size": 5731 },
                  { "name": "MaxFlowMinCut", "size": 7840 },
                  { "name": "ShortestPaths", "size": 5914 },
                  { "name": "SpanningTree", "size": 3416 }
                ]
              },
              {
                "name": "optimization",
                "children": [
                  { "name": "AspectRatioBanker", "size": 7074 }
                ]
              }
            ]
          },
          {
            "name": "animate",
            "children": [
              { "name": "Easing", "size": 17010 },
              { "name": "FunctionSequence", "size": 5842 },
              {
                "name": "interpolate",
                "children": [
                  { "name": "ArrayInterpolator", "size": 1983 },
                  { "name": "ColorInterpolator", "size": 2047 },
                  { "name": "DateInterpolator", "size": 1375 },
                  { "name": "Interpolator", "size": 8746 },
                  { "name": "MatrixInterpolator", "size": 2202 },
                  { "name": "NumberInterpolator", "size": 1382 },
                  { "name": "ObjectInterpolator", "size": 1629 },
                  { "name": "PointInterpolator", "size": 1675 },
                  { "name": "RectangleInterpolator", "size": 2042 }
                ]
              },
              { "name": "ISchedulable", "size": 1041 },
              { "name": "Parallel", "size": 5176 },
              { "name": "Pause", "size": 449 },
              { "name": "Scheduler", "size": 5593 },
              { "name": "Sequence", "size": 5534 },
              { "name": "Transition", "size": 9201 },
              { "name": "Transitioner", "size": 19975 },
              { "name": "TransitionEvent", "size": 1116 },
              { "name": "Tween", "size": 6006 }
            ]
          },
          {
            "name": "data",
            "children": [
              {
                "name": "converters",
                "children": [
                  { "name": "Converters", "size": 721 },
                  { "name": "DelimitedTextConverter", "size": 4294 },
                  { "name": "GraphMLConverter", "size": 9800 },
                  { "name": "IDataConverter", "size": 1314 },
                  { "name": "JSONConverter", "size": 2220 }
                ]
              },
              { "name": "DataField", "size": 1759 },
              { "name": "DataSchema", "size": 2165 },
              { "name": "DataSet", "size": 586 },
              { "name": "DataSource", "size": 3331 },
              { "name": "DataTable", "size": 772 },
              { "name": "DataUtil", "size": 3322 }
            ]
          },
          {
            "name": "display",
            "children": [
              { "name": "DirtySprite", "size": 8833 },
              { "name": "LineSprite", "size": 1732 },
              { "name": "RectSprite", "size": 3623 },
              { "name": "TextSprite", "size": 10066 }
            ]
          },
          {
            "name": "flex",
            "children": [
              { "name": "FlareVis", "size": 4116 }
            ]
          },
          {
            "name": "physics",
            "children": [
              { "name": "DragForce", "size": 1082 },
              { "name": "GravityForce", "size": 1336 },
              { "name": "IForce", "size": 319 },
              { "name": "NBodyForce", "size": 10498 },
              { "name": "Particle", "size": 2822 },
              { "name": "Simulation", "size": 9983 },
              { "name": "Spring", "size": 2213 },
              { "name": "SpringForce", "size": 1681 }
            ]
          },
          {
            "name": "query",
            "children": [
              { "name": "AggregateExpression", "size": 1616 },
              { "name": "And", "size": 1027 },
              { "name": "Arithmetic", "size": 3891 },
              { "name": "Average", "size": 891 },
              { "name": "BinaryExpression", "size": 2893 },
              { "name": "Comparison", "size": 5103 },
              { "name": "CompositeExpression", "size": 3677 },
              { "name": "Count", "size": 781 },
              { "name": "DateUtil", "size": 4141 },
              { "name": "Distinct", "size": 933 },
              { "name": "Expression", "size": 5130 },
              { "name": "ExpressionIterator", "size": 3617 },
              { "name": "Fn", "size": 3240 },
              { "name": "If", "size": 2732 },
              { "name": "IsA", "size": 2039 },
              { "name": "Literal", "size": 1214 },
              { "name": "Match", "size": 3748 },
              { "name": "Maximum", "size": 843 },
              {
                "name": "methods",
                "children": [
                  { "name": "add", "size": 593 },
                  { "name": "and", "size": 330 },
                  { "name": "average", "size": 287 },
                  { "name": "count", "size": 277 },
                  { "name": "distinct", "size": 292 },
                  { "name": "div", "size": 595 },
                  { "name": "eq", "size": 594 },
                  { "name": "fn", "size": 460 },
                  { "name": "gt", "size": 603 },
                  { "name": "gte", "size": 625 },
                  { "name": "iff", "size": 748 },
                  { "name": "isa", "size": 461 },
                  { "name": "lt", "size": 597 },
                  { "name": "lte", "size": 619 },
                  { "name": "max", "size": 283 },
                  { "name": "min", "size": 283 },
                  { "name": "mod", "size": 591 },
                  { "name": "mul", "size": 603 },
                  { "name": "neq", "size": 599 },
                  { "name": "not", "size": 386 },
                  { "name": "or", "size": 323 },
                  { "name": "orderby", "size": 307 },
                  { "name": "range", "size": 772 },
                  { "name": "select", "size": 296 },
                  { "name": "stddev", "size": 363 },
                  { "name": "sub", "size": 600 },
                  { "name": "sum", "size": 280 },
                  { "name": "update", "size": 307 },
                  { "name": "variance", "size": 335 },
                  { "name": "where", "size": 299 },
                  { "name": "xor", "size": 354 },
                  { "name": "_", "size": 264 }
                ]
              },
              { "name": "Minimum", "size": 843 },
              { "name": "Not", "size": 1554 },
              { "name": "Or", "size": 970 },
              { "name": "Query", "size": 13896 },
              { "name": "Range", "size": 1594 },
              { "name": "StringUtil", "size": 4130 },
              { "name": "Sum", "size": 791 },
              { "name": "Variable", "size": 1124 },
              { "name": "Variance", "size": 1876 },
              { "name": "Xor", "size": 1101 }
            ]
          },
          {
            "name": "scale",
            "children": [
              { "name": "IScaleMap", "size": 2105 },
              { "name": "LinearScale", "size": 1316 },
              { "name": "LogScale", "size": 3151 },
              { "name": "OrdinalScale", "size": 3770 },
              { "name": "QuantileScale", "size": 2435 },
              { "name": "QuantitativeScale", "size": 4839 },
              { "name": "RootScale", "size": 1756 },
              { "name": "Scale", "size": 4268 },
              { "name": "ScaleType", "size": 1821 },
              { "name": "TimeScale", "size": 5833 }
            ]
          },
          {
            "name": "util",
            "children": [
              { "name": "Arrays", "size": 8258 },
              { "name": "Colors", "size": 10001 },
              { "name": "Dates", "size": 8217 },
              { "name": "Displays", "size": 12555 },
              { "name": "Filter", "size": 2324 },
              { "name": "Geometry", "size": 10993 },
              {
                "name": "heap",
                "children": [
                  { "name": "FibonacciHeap", "size": 9354 },
                  { "name": "HeapNode", "size": 1233 }
                ]
              },
              { "name": "IEvaluable", "size": 335 },
              { "name": "IPredicate", "size": 383 },
              { "name": "IValueProxy", "size": 874 },
              {
                "name": "math",
                "children": [
                  { "name": "DenseMatrix", "size": 3165 },
                  { "name": "IMatrix", "size": 2815 },
                  { "name": "SparseMatrix", "size": 3366 }
                ]
              },
              { "name": "Maths", "size": 17705 },
              { "name": "Orientation", "size": 1486 },
              {
                "name": "palette",
                "children": [
                  { "name": "ColorPalette", "size": 6367 },
                  { "name": "Palette", "size": 1229 },
                  { "name": "ShapePalette", "size": 2059 },
                  { "name": "SizePalette", "size": 2291 }
                ]
              },
              { "name": "Property", "size": 5559 },
              { "name": "Shapes", "size": 19118 },
              { "name": "Sort", "size": 6887 },
              { "name": "Stats", "size": 6557 },
              { "name": "Strings", "size": 22026 }
            ]
          },
          {
            "name": "vis",
            "children": [
              {
                "name": "axis",
                "children": [
                  { "name": "Axes", "size": 1302 },
                  { "name": "Axis", "size": 24593 },
                  { "name": "AxisGridLine", "size": 652 },
                  { "name": "AxisLabel", "size": 636 },
                  { "name": "CartesianAxes", "size": 6703 }
                ]
              },
              {
                "name": "controls",
                "children": [
                  { "name": "AnchorControl", "size": 2138 },
                  { "name": "ClickControl", "size": 3824 },
                  { "name": "Control", "size": 1353 },
                  { "name": "ControlList", "size": 4665 },
                  { "name": "DragControl", "size": 2649 },
                  { "name": "ExpandControl", "size": 2832 },
                  { "name": "HoverControl", "size": 4896 },
                  { "name": "IControl", "size": 763 },
                  { "name": "PanZoomControl", "size": 5222 },
                  { "name": "SelectionControl", "size": 7862 },
                  { "name": "TooltipControl", "size": 8435 }
                ]
              },
              {
                "name": "data",
                "children": [
                  { "name": "Data", "size": 20544 },
                  { "name": "DataList", "size": 19788 },
                  { "name": "DataSprite", "size": 10349 },
                  { "name": "EdgeSprite", "size": 3301 },
                  { "name": "NodeSprite", "size": 19382 },
                  {
                    "name": "render",
                    "children": [
                      { "name": "ArrowType", "size": 698 },
                      { "name": "EdgeRenderer", "size": 5569 },
                      { "name": "IRenderer", "size": 353 },
                      { "name": "ShapeRenderer", "size": 2247 }
                    ]
                  },
                  { "name": "ScaleBinding", "size": 11275 },
                  { "name": "Tree", "size": 7147 },
                  { "name": "TreeBuilder", "size": 9930 }
                ]
              },
              {
                "name": "events",
                "children": [
                  { "name": "DataEvent", "size": 2313 },
                  { "name": "SelectionEvent", "size": 1880 },
                  { "name": "TooltipEvent", "size": 1701 },
                  { "name": "VisualizationEvent", "size": 1117 }
                ]
              },
              {
                "name": "legend",
                "children": [
                  { "name": "Legend", "size": 20859 },
                  { "name": "LegendItem", "size": 4614 },
                  { "name": "LegendRange", "size": 10530 }
                ]
              },
              {
                "name": "operator",
                "children": [
                  {
                    "name": "distortion",
                    "children": [
                      { "name": "BifocalDistortion", "size": 4461 },
                      { "name": "Distortion", "size": 6314 },
                      { "name": "FisheyeDistortion", "size": 3444 }
                    ]
                  },
                  {
                    "name": "encoder",
                    "children": [
                      { "name": "ColorEncoder", "size": 3179 },
                      { "name": "Encoder", "size": 4060 },
                      { "name": "PropertyEncoder", "size": 4138 },
                      { "name": "ShapeEncoder", "size": 1690 },
                      { "name": "SizeEncoder", "size": 1830 }
                    ]
                  },
                  {
                    "name": "filter",
                    "children": [
                      { "name": "FisheyeTreeFilter", "size": 5219 },
                      { "name": "GraphDistanceFilter", "size": 3165 },
                      { "name": "VisibilityFilter", "size": 3509 }
                    ]
                  },
                  { "name": "IOperator", "size": 1286 },
                  {
                    "name": "label",
                    "children": [
                      { "name": "Labeler", "size": 9956 },
                      { "name": "RadialLabeler", "size": 3899 },
                      { "name": "StackedAreaLabeler", "size": 3202 }
                    ]
                  },
                  {
                    "name": "layout",
                    "children": [
                      { "name": "AxisLayout", "size": 6725 },
                      { "name": "BundledEdgeRouter", "size": 3727 },
                      { "name": "CircleLayout", "size": 9317 },
                      { "name": "CirclePackingLayout", "size": 12003 },
                      { "name": "DendrogramLayout", "size": 4853 },
                      { "name": "ForceDirectedLayout", "size": 8411 },
                      { "name": "IcicleTreeLayout", "size": 4864 },
                      { "name": "IndentedTreeLayout", "size": 3174 },
                      { "name": "Layout", "size": 7881 },
                      { "name": "NodeLinkTreeLayout", "size": 12870 },
                      { "name": "PieLayout", "size": 2728 },
                      { "name": "RadialTreeLayout", "size": 12348 },
                      { "name": "RandomLayout", "size": 870 },
                      { "name": "StackedAreaLayout", "size": 9121 },
                      { "name": "TreeMapLayout", "size": 9191 }
                    ]
                  },
                  { "name": "Operator", "size": 2490 },
                  { "name": "OperatorList", "size": 5248 },
                  { "name": "OperatorSequence", "size": 4190 },
                  { "name": "OperatorSwitch", "size": 2581 },
                  { "name": "SortOperator", "size": 2023 }
                ]
              },
              { "name": "Visualization", "size": 16540 }
            ]
          }
        ]
      }]
    }
  },
  methods: {
    formatDate (d) {
      return d3.time.format('%x')(new Date(d))
    },
    elementMousemove (event) {
      console.log(event);
    },
    elementClick (event) {
      console.log(event);
    }
  }
}
</script>
