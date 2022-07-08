define(["exports","./Cartesian2-47311507","./Cartographic-3309dd0d","./Check-7b2a090c","./when-b60132fc","./PrimitiveType-108f83af"],(function(t,e,i,n,h,r){"use strict";function a(t,e,i,n){this.x=h.defaultValue(t,0),this.y=h.defaultValue(e,0),this.width=h.defaultValue(i,0),this.height=h.defaultValue(n,0)}a.packedLength=4,a.pack=function(t,e,i){return i=h.defaultValue(i,0),e[i++]=t.x,e[i++]=t.y,e[i++]=t.width,e[i]=t.height,e},a.unpack=function(t,e,i){return e=h.defaultValue(e,0),h.defined(i)||(i=new a),i.x=t[e++],i.y=t[e++],i.width=t[e++],i.height=t[e],i},a.fromPoints=function(t,e){if(h.defined(e)||(e=new a),!h.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;for(var i=t.length,n=t[0].x,r=t[0].y,d=t[0].x,u=t[0].y,c=1;c<i;c++){var f=t[c],o=f.x,x=f.y;n=Math.min(o,n),d=Math.max(o,d),r=Math.min(x,r),u=Math.max(x,u)}return e.x=n,e.y=r,e.width=d-n,e.height=u-r,e};var d=new r.GeographicProjection,u=new i.Cartographic,c=new i.Cartographic;a.fromRectangle=function(t,i,n){if(h.defined(n)||(n=new a),!h.defined(t))return n.x=0,n.y=0,n.width=0,n.height=0,n;var r=(i=h.defaultValue(i,d)).project(e.Rectangle.southwest(t,u)),f=i.project(e.Rectangle.northeast(t,c));return e.Cartesian2.subtract(f,r,f),n.x=r.x,n.y=r.y,n.width=f.x,n.height=f.y,n},a.clone=function(t,e){if(h.defined(t))return h.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new a(t.x,t.y,t.width,t.height)},a.union=function(t,e,i){h.defined(i)||(i=new a);var n=Math.min(t.x,e.x),r=Math.min(t.y,e.y),d=Math.max(t.x+t.width,e.x+e.width),u=Math.max(t.y+t.height,e.y+e.height);return i.x=n,i.y=r,i.width=d-n,i.height=u-r,i},a.expand=function(t,e,i){i=a.clone(t,i);var n=e.x-i.x,h=e.y-i.y;return n>i.width?i.width=n:n<0&&(i.width-=n,i.x=e.x),h>i.height?i.height=h:h<0&&(i.height-=h,i.y=e.y),i},a.intersect=function(t,e){var i=t.x,n=t.y,h=e.x,a=e.y;return i>h+e.width||i+t.width<h||n+t.height<a||n>a+e.height?r.Intersect.OUTSIDE:r.Intersect.INTERSECTING},a.equals=function(t,e){return t===e||h.defined(t)&&h.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},a.prototype.clone=function(t){return a.clone(this,t)},a.prototype.intersect=function(t){return a.intersect(this,t)},a.prototype.equals=function(t){return a.equals(this,t)},t.BoundingRectangle=a}));
