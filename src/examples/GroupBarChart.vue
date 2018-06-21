<template>
  <div>
    <h2>Group Bar chart</h2>
    <div class="uk-margin-bottom">
      <vn-group-bar :model="traffics"
        :showControls=false
        :stacked=true
        :groupSpacing=0.1>
      </vn-group-bar>
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
          <pre><code>&lt;vn-group-bar :model="traffics"
       :showControls=false
       :stacked=true
       :groupSpacing=0.1&gt;
&lt;/vn-bar&gt;</code></pre>
        </li>
        <li>
          <pre><code>{{traffics}}</code></pre>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Faker from 'Faker'
import _ from 'lodash'
import d3 from 'd3'

function stream_layers (n, m, o) {
  if (arguments.length < 3) o = 0;

  function bump (a) {
    var x = 1 / (.1 + Math.random()),
      y = 2 * Math.random() - .5,
      z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return d3.range(n).map(function () {
    var a = [],
      i;
    for (i = 0; i < m; i++) a[i] = o + o * Math.random();
    for (i = 0; i < 5; i++) bump(a);
    return a.map(stream_index);
  });
}

/* Another layer generator using gamma distributions. */
function stream_waves (n, m) {
  return d3.range(n).map(function (i) {
    return d3.range(m).map(function (j) {
      var x = 20 * j / m - i / 3;
      return 2 * x * Math.exp(-.5 * x);
    }).map(stream_index);
  });
}

function stream_index (d, i) {
  return {
    x: i,
    y: Math.max(0, d)
  };
}

export default {
  data () {
    const gen_item = () => {
      return {
        domain: Faker.Internet.domainName(),
        visits: Faker.random.number(10000)
      }
    }

    const ranges = _.range(Faker.random.number(20))

    return {
      trafficData: _.map(ranges, gen_item)
    }
  },
  computed: {
    traffics () {
      let data = stream_layers(3, 10 + Math.random() * 100, .1).map(function (data, i) {
        return {
          key: 'Stream #' + i,
          values: data
        };
      });
      console.log(data, 'data');
      return data;
    }
  },
  methods: {
    formatDate (d) {
      return d3.time.format('%x')(new Date(d))
    }
  }
}
</script>
