webpackJsonp([4],{283:function(t,e,r){var s=r(46)(r(290),r(301),null,null,null);t.exports=s.exports},290:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["id"],computed:{meetup:function(){return this.$store.getters.loadedMeetup(this.id)}}}},301:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-layout",{attrs:{row:"row",wrap:"wrap"}},[r("v-flex",{attrs:{xs12:"xs12"}},[r("v-card",[r("v-card-title",[r("h4",{staticClass:"primary--text headline"},[t._v(t._s(t.meetup.title))])]),r("v-card-media",{attrs:{src:t.meetup.imageUrl,height:"400px"}}),r("v-card-text",[r("div",{staticClass:"info--text"},[t._v(t._s(t._f("date")(t.meetup.date))+" - "+t._s(t.meetup.location))]),r("div",[t._v(t._s(t.meetup.description))])]),r("v-card-actions",[r("v-spacer"),r("v-btn",{staticClass:"primary"},[t._v("Register")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});