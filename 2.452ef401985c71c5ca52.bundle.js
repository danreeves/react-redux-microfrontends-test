(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{59:function(t,e,n){"use strict";n.r(e),n.d(e,"postsSaga",(function(){return b})),n.d(e,"postsModule",(function(){return m})),n.d(e,"default",(function(){return O}));var a=n(0),o=n.n(a),l=n(10),i=n(11),c=n(13),d=n(21),s=n(14),r=n(15),u="app/posts",p={loading:"".concat(u,"/posts-loading"),loaded:"".concat(u,"/posts-loaded")};function*b(){yield Object(d.a)(g)}function*g(){var t,e;yield Object(d.b)(Object(r.c)("Loading posts")),yield Object(d.b)({type:p.loading}),yield(t=3e3,new Promise(e=>setTimeout(e,t))),yield Object(d.b)((e=[{id:"1",title:"post1"},{id:"2",title:"post2"},{id:"3",title:"post3"},{id:"4",title:"post4"},{id:"5",title:"post5"},{id:"6",title:"post6"}],{type:p.loaded,payload:e})),yield Object(d.b)(Object(r.c)("Posts loaded"))}var f={loading:!0,posts:[]};var m={id:u,reducerMap:{[u]:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,e=arguments.length>1?arguments[1]:void 0;switch(console.log(e),e.type){case p.loading:return{loading:!0,posts:[]};case p.loaded:return{loading:!1,posts:e.payload};default:return t}}},sagas:[b],initialActions:[],finalActions:[]};function v(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return function(n){return(n[u]||f)[t]||e}}var j={isLoading:v("loading"),posts:v("posts",[])};function O(){Object(s.b)(m);var{path:t}=Object(i.g)(),e=Object(l.useSelector)(j.isLoading);return o.a.createElement("div",null,e?o.a.createElement(y,null):o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:t},o.a.createElement(E,null)),o.a.createElement(i.a,{path:"".concat(t,"/:id")},o.a.createElement(h,null))))}function y(){return o.a.createElement("p",null,"Loading posts...")}function E(){var{path:t}=Object(i.g)(),e=Object(l.useSelector)(j.posts);return o.a.createElement("ul",null,e.map(e=>o.a.createElement("li",{key:e.id},o.a.createElement(c.b,{to:"".concat(t,"/").concat(e.id)},e.title))))}function h(){var{id:t}=Object(i.f)();return o.a.createElement("p",null,"Viewing post: ",t)}}}]);