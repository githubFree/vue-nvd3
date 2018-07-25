<template>
  <div>
    <h2>sunburst chart</h2>
    <div class="uk-margin-bottom">
      <vn-sunburst1 :model="traffics"
        :margin="{left: 70, bottom: 30, right: 0}"
        mode="value"
        :elementClick="elementClick"
        :tooltip="tooltip"
        height="300"
        modeType="value"
        width="300"
        :colors="colors"
        :showLabels="true"
        :labelFormat="labelFormat"
        :elementMousemove="elementMousemove">
      </vn-sunburst1>
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
      colors: ['#36AAAA', '#58C7F1', '#F8A93C', '#F57844', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0']
    }
  },
  computed: {
    traffics () {
      let data = {
        name: "root",
        children: [
          {
            name: "v",
            children: [
              {
                name: "v1",
                size: 2000
              },
              {
                name: "v2",
                children: [
                  {
                    name: "end",
                    size: 2000
                  }
                ]
              }
            ]
          },
          {
            name: "a",
            children: [
              {
                name: "a1",
                size: 1000,
                children: [
                  {
                    name: "a11",
                    size: 1000
                  },
                  {
                    name: "a12",
                    size: 10001
                  }
                ]
              },
              {
                name: "a2",
                size: 1000
              }
            ]
          }
        ]
      }
      return data;
    },
  },
  created: function () {
    let self = this;

  },
  methods: {
    labelFormat (d) {
      return 111;
    },
    formatDate (d) {
      return d3.time.format('%x')(new Date(d))
    },
    elementMousemove (event) {
      // console.log(event);
    },
    elementClick (event) {
      console.log(event);
    },
    tooltip (d) {
      let total = this.traffics[0].total;
      return (d / total * 100).toFixed(2) + '%';
    }
  }
}
</script>
<style>
.explanation {
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #666;
  z-index: 99;
}

.svgBox {
  position: relative;
}

.sequence {
  height: 25px;
  margin-bottom: 5px;
  opacity: 0;
  vertical-align: middle;
}
.sequence ul {
  list-style: none;
  padding: 0;
}
.sequence li {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.sequence li.percentage {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
.sequence li .tx {
  border-radius: 4px;
  padding: 0 5px;
  display: inline-block;
  color: #fff;
  height: 25px;
  line-height: 25px;
}
.sequence li i {
  margin: 0 5px;
  display: inline-block;
  vertical-align: middle;
}
.sequence li i:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid #aaa;
  border-bottom: 5px solid transparent;
}
</style>

