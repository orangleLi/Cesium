define(["./PrimitiveType-108f83af","./buildModuleUrl-3addfe33","./Cartesian2-47311507","./Cartographic-3309dd0d","./Check-7b2a090c","./when-b60132fc","./Math-119be1a3","./ArcType-29cf2197","./arrayRemoveDuplicates-d2f048c5","./ComponentDatatype-c140a87d","./EllipsoidGeodesic-0f19ac62","./EllipsoidRhumbLine-ed1a6bf4","./EncodedCartesian3-f1396b05","./GeometryAttribute-b20c1286","./IntersectionTests-6eb562ca","./Plane-e2d409ef","./WebMercatorProjection-01b1b5e7","./Cartesian4-3ca25aab","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./FeatureDetection-c3b71206"],(function(e,a,t,i,n,r,s,o,l,u,c,C,h,d,p,g,f,m,v,w,y){"use strict";function _(a){a=r.defaultValue(a,{}),this._ellipsoid=r.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84),this._rectangle=r.defaultValue(a.rectangle,t.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=r.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=r.defaultValue(a.numberOfLevelZeroTilesY,1),this._customDPI=a.customDPI,this._scaleDenominators=a.scaleDenominators,this._tileWidth=r.defaultValue(a.tileWidth,256),this._tileHeight=r.defaultValue(a.tileHeight,256),this._beginLevel=r.defaultValue(a.beginLevel,0)}Object.defineProperties(_.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}},beginLevel:{get:function(){return this._beginLevel}}}),_.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e-this._beginLevel},_.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e-this._beginLevel},_.prototype.rectangleToNativeRectangle=function(e,a){var i=s.CesiumMath.toDegrees(e.west),n=s.CesiumMath.toDegrees(e.south),o=s.CesiumMath.toDegrees(e.east),l=s.CesiumMath.toDegrees(e.north);return r.defined(a)?(a.west=i,a.south=n,a.east=o,a.north=l,a):new t.Rectangle(i,n,o,l)},_.prototype.tileXYToNativeRectangle=function(e,a,t,i){var n=this.tileXYToRectangle(e,a,t,i);return n.west=s.CesiumMath.toDegrees(n.west),n.south=s.CesiumMath.toDegrees(n.south),n.east=s.CesiumMath.toDegrees(n.east),n.north=s.CesiumMath.toDegrees(n.north),n},_.prototype.tileXYToRectangle=function(e,a,i,n){var o=this._rectangle;if(r.defined(this._customDPI)&&r.defined(this._scaleDenominators)){var l=this.calculateResolution(i),u=-s.CesiumMath.PI+e*this._tileWidth*l.x,c=-s.CesiumMath.PI+(e+1)*this._tileWidth*l.x,C=s.CesiumMath.PI_OVER_TWO-a*this._tileHeight*l.y,h=s.CesiumMath.PI_OVER_TWO-(a+1)*this._tileHeight*l.y;return r.defined(n)?(n.west=u,n.south=h,n.east=c,n.north=C,n):new t.Rectangle(u,h,c,C)}var d=this.getNumberOfXTilesAtLevel(i),p=this.getNumberOfYTilesAtLevel(i),g=o.width/d,f=(u=e*g+o.west,c=(e+1)*g+o.west,o.height/p);C=o.north-a*f,h=o.north-(a+1)*f;return r.defined(n)||(n=new t.Rectangle(u,h,c,C)),n.west=u,n.south=h,n.east=c,n.north=C,n},_.prototype.positionToTileXY=function(e,a,i){var n=this._rectangle;if(t.Rectangle.contains(n,e)){var o=this.getNumberOfXTilesAtLevel(a),l=this.getNumberOfYTilesAtLevel(a),u=n.width/o,c=n.height/l;if(r.defined(this._customDPI)&&r.defined(this._scaleDenominators)){var C=this.calculateResolution(a);u=this._tileWidth*C.x,c=this._tileHeight*C.y}var h=e.longitude;n.east<n.west&&(h+=s.CesiumMath.TWO_PI);var d=(h-n.west)/u|0;d>=o&&(d=o-1);var p=(n.north-e.latitude)/c|0;return p>=l&&(p=l-1),r.defined(i)?(i.x=d,i.y=p,i):new t.Cartesian2(d,p)}},_.prototype.calculateResolution=function(e){var a=.0254*this._scaleDenominators[e-this._beginLevel]/this._customDPI.x,i=.0254*this._scaleDenominators[e-this._beginLevel]/this._customDPI.y,n=t.Ellipsoid.WGS84.maximumRadius;return new t.Cartesian2(a/n,i/n)};var T=new i.Cartesian3,M=new i.Cartesian3,E=new i.Cartographic,b=new i.Cartesian3,P=new i.Cartesian3,O=new e.BoundingSphere,I=new _,L=[new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic],S=new t.Cartesian2,D={};function k(e){i.Cartographic.fromRadians(e.east,e.north,0,L[0]),i.Cartographic.fromRadians(e.west,e.north,0,L[1]),i.Cartographic.fromRadians(e.east,e.south,0,L[2]),i.Cartographic.fromRadians(e.west,e.south,0,L[3]);var a,t=0,n=0,r=0,s=0,o=D._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=L[u];if(I.positionToTileXY(c,a,S),0===u)r=S.x,s=S.y;else if(r!==S.x||s!==S.y){l=!0;break}}if(l)break;t=r,n=s}if(0!==a)return{x:t,y:n,level:a>o?o:a-1}}D.initialize=function(){var e=D._initPromise;return r.defined(e)||(e=a.Resource.fetchJson(a.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){D._terrainHeights=e})),D._initPromise=e),e},D.getMinimumMaximumHeights=function(e,a){a=r.defaultValue(a,t.Ellipsoid.WGS84);var n=k(e),s=D._defaultMinTerrainHeight,o=D._defaultMaxTerrainHeight;if(r.defined(n)){var l=n.level+"-"+n.x+"-"+n.y,u=D._terrainHeights[l];r.defined(u)&&(s=u[0],o=u[1]),a.cartographicToCartesian(t.Rectangle.northeast(e,E),T),a.cartographicToCartesian(t.Rectangle.southwest(e,E),M),i.Cartesian3.midpoint(M,T,b);var c=a.scaleToGeodeticSurface(b,P);if(r.defined(c)){var C=i.Cartesian3.distance(b,c);s=Math.min(s,-C)}else s=D._defaultMinTerrainHeight}return{minimumTerrainHeight:s=Math.max(D._defaultMinTerrainHeight,s),maximumTerrainHeight:o}},D.getBoundingSphere=function(a,i){i=r.defaultValue(i,t.Ellipsoid.WGS84);var n=k(a),s=D._defaultMaxTerrainHeight;if(r.defined(n)){var o=n.level+"-"+n.x+"-"+n.y,l=D._terrainHeights[o];r.defined(l)&&(s=l[1])}var u=e.BoundingSphere.fromRectangle3D(a,i,0);return e.BoundingSphere.fromRectangle3D(a,i,s,O),e.BoundingSphere.union(u,O,u)},D._terrainHeightsMaxLevel=6,D._defaultMaxTerrainHeight=9e3,D._defaultMinTerrainHeight=-1e5,D._terrainHeights=void 0,D._initPromise=void 0,Object.defineProperties(D,{initialized:{get:function(){return r.defined(D._terrainHeights)}}});var A=[e.GeographicProjection,f.WebMercatorProjection],N=A.length,x=Math.cos(s.CesiumMath.toRadians(30)),R=Math.cos(s.CesiumMath.toRadians(150));function H(e){var a=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).positions;this.width=r.defaultValue(e.width,1),this._positions=a,this.granularity=r.defaultValue(e.granularity,9999),this.loop=r.defaultValue(e.loop,!1),this.arcType=r.defaultValue(e.arcType,o.ArcType.GEODESIC),this._ellipsoid=r.defaultValue(e.ellipsoid,t.Ellipsoid.WGS84),this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(H.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+t.Ellipsoid.packedLength+1+1}}}),H.setProjectionAndEllipsoid=function(e,a){for(var t=0,i=0;i<N;i++)if(a instanceof A[i]){t=i;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var V=new i.Cartesian3,z=new i.Cartesian3,j=new i.Cartesian3;function G(e,a,t,n,r){var s=U(n,e,0,V),o=U(n,e,t,z),l=U(n,a,0,j),u=Z(o,s,z),c=Z(l,s,j);return i.Cartesian3.cross(c,u,r),i.Cartesian3.normalize(r,r)}var B=new i.Cartographic,W=new i.Cartesian3,F=new i.Cartesian3,Y=new i.Cartesian3;function X(e,a,t,n,r,s,l,u,h,d,p){if(0!==r){var g;s===o.ArcType.GEODESIC?g=new c.EllipsoidGeodesic(e,a,l):s===o.ArcType.RHUMB&&(g=new C.EllipsoidRhumbLine(e,a,l));var f=g.surfaceDistance;if(!(f<r))for(var m=G(e,a,n,l,Y),v=Math.ceil(f/r),w=f/v,y=w,_=v-1,T=u.length,M=0;M<_;M++){var E=g.interpolateUsingSurfaceDistance(y,B),b=U(l,E,t,W),P=U(l,E,n,F);i.Cartesian3.pack(m,u,T),i.Cartesian3.pack(b,h,T),i.Cartesian3.pack(P,d,T),p.push(E.latitude),p.push(E.longitude),T+=3,y+=w}}}var q=new i.Cartographic;function U(e,a,t,n){return i.Cartographic.clone(a,q),q.height=t,i.Cartographic.toCartesian(q,e,n)}function Z(e,a,t){return i.Cartesian3.subtract(e,a,t),i.Cartesian3.normalize(t,t),t}H.pack=function(e,a,n){var s=r.defaultValue(n,0),o=e._positions,l=o.length;a[s++]=l;for(var u=0;u<l;++u){var c=o[u];i.Cartesian3.pack(c,a,s),s+=3}return a[s++]=e.granularity,a[s++]=e.loop?1:0,a[s++]=e.arcType,t.Ellipsoid.pack(e._ellipsoid,a,s),s+=t.Ellipsoid.packedLength,a[s++]=e._projectionIndex,a[s++]=e._scene3DOnly?1:0,a},H.unpack=function(e,a,n){for(var s=r.defaultValue(a,0),o=e[s++],l=new Array(o),u=0;u<o;u++)l[u]=i.Cartesian3.unpack(e,s),s+=3;var c=e[s++],C=1===e[s++],h=e[s++],d=t.Ellipsoid.unpack(e,s);s+=t.Ellipsoid.packedLength;var p=e[s++],g=1===e[s++];if(!r.defined(n)){var f=new H({positions:l,granularity:c,loop:C,arcType:h,ellipsoid:d});return f._projectionIndex=p,f._scene3DOnly=g,f}return n._positions=l,n.granularity=c,n.loop=C,n.arcType=h,n._ellipsoid=d,n._projectionIndex=p,n._scene3DOnly=g,n};var Q=new i.Cartesian3,J=new i.Cartesian3,K=new i.Cartesian3,$=new i.Cartesian3,ee=new g.Plane(i.Cartesian3.UNIT_X,0),ae=new i.Cartesian3;function te(e,a,t,n,r){var o=Z(t,a,ae),l=Z(e,a,Q),u=Z(n,a,J),c=i.Cartesian3.cross(o,l,$);c=i.Cartesian3.normalize(c,c);var C=g.Plane.fromPointNormal(a,c,ee),h=g.Plane.getPointDistance(C,n);if(s.CesiumMath.equalsEpsilon(h,0,s.CesiumMath.EPSILON7))return i.Cartesian3.clone(c,r),r;r=i.Cartesian3.add(u,l,r),r=i.Cartesian3.normalize(r,r);var d=i.Cartesian3.cross(o,r,K);return i.Cartesian3.normalize(d,d),i.Cartesian3.cross(d,o,r),i.Cartesian3.normalize(r,r),i.Cartesian3.dot(u,d)<0&&(r=i.Cartesian3.negate(r,r)),r}var ie=g.Plane.fromPointNormal(i.Cartesian3.ZERO,i.Cartesian3.UNIT_Y),ne=new i.Cartesian3,re=new i.Cartesian3,se=new i.Cartesian3,oe=new i.Cartesian3,le=new i.Cartesian3,ue=new i.Cartesian3,ce=new i.Cartographic,Ce=new i.Cartographic,he=new i.Cartographic;H.createGeometry=function(a){var n,c,g,f,m,v,w=!a._scene3DOnly,y=a.loop,_=a._ellipsoid,T=a.granularity,M=a.arcType,E=new A[a._projectionIndex](_),b=1e3,P=a._positions,O=P.length;2===O&&(y=!1);var I,L,S,k=new C.EllipsoidRhumbLine(void 0,void 0,_),N=[P[0]];for(c=0;c<O-1;c++)g=P[c],f=P[c+1],I=p.IntersectionTests.lineSegmentPlane(g,f,ie,ue),!r.defined(I)||i.Cartesian3.equalsEpsilon(I,g,s.CesiumMath.EPSILON7)||i.Cartesian3.equalsEpsilon(I,f,s.CesiumMath.EPSILON7)||(a.arcType===o.ArcType.GEODESIC?N.push(i.Cartesian3.clone(I)):a.arcType===o.ArcType.RHUMB&&(S=_.cartesianToCartographic(I,ce).longitude,m=_.cartesianToCartographic(g,ce),v=_.cartesianToCartographic(f,Ce),k.setEndPoints(m,v),L=k.findIntersectionWithLongitude(S,he),I=_.cartographicToCartesian(L,ue),!r.defined(I)||i.Cartesian3.equalsEpsilon(I,g,s.CesiumMath.EPSILON7)||i.Cartesian3.equalsEpsilon(I,f,s.CesiumMath.EPSILON7)||N.push(i.Cartesian3.clone(I)))),N.push(f);y&&(g=P[O-1],f=P[0],I=p.IntersectionTests.lineSegmentPlane(g,f,ie,ue),!r.defined(I)||i.Cartesian3.equalsEpsilon(I,g,s.CesiumMath.EPSILON7)||i.Cartesian3.equalsEpsilon(I,f,s.CesiumMath.EPSILON7)||(a.arcType===o.ArcType.GEODESIC?N.push(i.Cartesian3.clone(I)):a.arcType===o.ArcType.RHUMB&&(S=_.cartesianToCartographic(I,ce).longitude,m=_.cartesianToCartographic(g,ce),v=_.cartesianToCartographic(f,Ce),k.setEndPoints(m,v),L=k.findIntersectionWithLongitude(S,he),I=_.cartographicToCartesian(L,ue),!r.defined(I)||i.Cartesian3.equalsEpsilon(I,g,s.CesiumMath.EPSILON7)||i.Cartesian3.equalsEpsilon(I,f,s.CesiumMath.EPSILON7)||N.push(i.Cartesian3.clone(I)))));var R=N.length,H=new Array(R);for(c=0;c<R;c++){var V=i.Cartographic.fromCartesian(N[c],_);V.height=0,H[c]=V}if(!((R=(H=l.arrayRemoveDuplicates(H,i.Cartographic.equalsEpsilon)).length)<2)){var z=[],j=[],B=[],W=[],F=ne,Y=re,q=se,Q=oe,J=le,K=H[0],$=H[1];for(F=U(_,H[R-1],0,F),Q=U(_,$,0,Q),Y=U(_,K,0,Y),q=U(_,K,b,q),J=y?te(F,Y,q,Q,J):G(K,$,b,_,J),i.Cartesian3.pack(J,j,0),i.Cartesian3.pack(Y,B,0),i.Cartesian3.pack(q,W,0),z.push(K.latitude),z.push(K.longitude),X(K,$,0,b,T,M,_,j,B,W,z),c=1;c<R-1;++c){F=i.Cartesian3.clone(Y,F),Y=i.Cartesian3.clone(Q,Y);var ee=H[c];U(_,ee,b,q),U(_,H[c+1],0,Q),te(F,Y,q,Q,J),n=j.length,i.Cartesian3.pack(J,j,n),i.Cartesian3.pack(Y,B,n),i.Cartesian3.pack(q,W,n),z.push(ee.latitude),z.push(ee.longitude),X(H[c],H[c+1],0,b,T,M,_,j,B,W,z)}var ae=H[R-1],de=H[R-2];if(Y=U(_,ae,0,Y),q=U(_,ae,b,q),y){var pe=H[0];J=te(F=U(_,de,0,F),Y,q,Q=U(_,pe,0,Q),J)}else J=G(de,ae,b,_,J);if(n=j.length,i.Cartesian3.pack(J,j,n),i.Cartesian3.pack(Y,B,n),i.Cartesian3.pack(q,W,n),z.push(ae.latitude),z.push(ae.longitude),y){for(X(ae,K,0,b,T,M,_,j,B,W,z),n=j.length,c=0;c<3;++c)j[n+c]=j[c],B[n+c]=B[c],W[n+c]=W[c];z.push(K.latitude),z.push(K.longitude)}return function(a,n,r,o,l,c,C){var p,g,f,m,v,w,y=n._ellipsoid,_=r.length/3-1,T=8*_,M=4*T,E=36*_,b=T>65535?new Uint32Array(E):new Uint16Array(E),P=new Float64Array(3*T),O=new Float32Array(M),I=new Float32Array(M),L=new Float32Array(M),S=new Float32Array(M),k=new Float32Array(M);C&&(f=new Float32Array(M),m=new Float32Array(M),v=new Float32Array(M),w=new Float32Array(2*T));var A=c.length/2,N=0,R=Oe;R.height=0;var H=Ie;H.height=0;var V=Le,z=Se;if(C)for(g=0,p=1;p<A;p++)R.latitude=c[g],R.longitude=c[g+1],H.latitude=c[g+2],H.longitude=c[g+3],V=n.project(R,V),z=n.project(H,z),N+=i.Cartesian3.distance(V,z),g+=2;var j=o.length/3;z=i.Cartesian3.unpack(o,0,z);var G,B=0;for(g=3,p=1;p<j;p++)V=i.Cartesian3.clone(z,V),z=i.Cartesian3.unpack(o,g,z),B+=i.Cartesian3.distance(V,z),g+=3;g=3;var W=0,F=0,Y=0,X=0,q=!1,U=i.Cartesian3.unpack(r,0,ke),Q=i.Cartesian3.unpack(o,0,Se),J=i.Cartesian3.unpack(l,0,Ne);if(a){fe(J,i.Cartesian3.unpack(r,r.length-6,De),U,Q)&&(J=i.Cartesian3.negate(J,J))}var K=0,$=0,ee=0;for(p=0;p<_;p++){var ae,te,ie,ne,re=i.Cartesian3.clone(U,De),se=i.Cartesian3.clone(Q,Le),oe=i.Cartesian3.clone(J,Ae);if(q&&(oe=i.Cartesian3.negate(oe,oe)),U=i.Cartesian3.unpack(r,g,ke),Q=i.Cartesian3.unpack(o,g,Se),q=fe(J=i.Cartesian3.unpack(l,g,Ne),re,U,Q),R.latitude=c[W],R.longitude=c[W+1],H.latitude=c[W+2],H.longitude=c[W+3],C){var le=Pe(R,H);ae=n.project(R,Ge);var ue=Z(te=n.project(H,Be),ae,$e);ue.y=Math.abs(ue.y),ie=We,ne=Fe,0===le||i.Cartesian3.dot(ue,i.Cartesian3.UNIT_Y)>x?(ie=ye(n,R,oe,ae,We),ne=ye(n,H,J,te,Fe)):1===le?(ne=ye(n,H,J,te,Fe),ie.x=0,ie.y=s.CesiumMath.sign(R.longitude-Math.abs(H.longitude)),ie.z=0):(ie=ye(n,R,oe,ae,We),ne.x=0,ne.y=s.CesiumMath.sign(R.longitude-H.longitude),ne.z=0)}var ce=i.Cartesian3.distance(se,Q),Ce=h.EncodedCartesian3.fromCartesian(re,Je),he=i.Cartesian3.subtract(U,re,Ye),de=i.Cartesian3.normalize(he,Ue),pe=i.Cartesian3.subtract(se,re,Xe);pe=i.Cartesian3.normalize(pe,pe);var ge=i.Cartesian3.cross(de,pe,Ue);ge=i.Cartesian3.normalize(ge,ge);var me=i.Cartesian3.cross(pe,oe,Ze);me=i.Cartesian3.normalize(me,me);var ve=i.Cartesian3.subtract(Q,U,qe);ve=i.Cartesian3.normalize(ve,ve);var we=i.Cartesian3.cross(J,ve,Qe);we=i.Cartesian3.normalize(we,we);var _e,Te,Ee,sa=ce/B,oa=K/B,la=0,ua=0,ca=0;if(C){la=i.Cartesian3.distance(ae,te),_e=h.EncodedCartesian3.fromCartesian(ae,Ke),Te=i.Cartesian3.subtract(te,ae,$e);var Ca=(Ee=i.Cartesian3.normalize(Te,ea)).x;Ee.x=Ee.y,Ee.y=-Ca,ua=la/N,ca=$/N}for(G=0;G<8;G++){var ha=X+4*G,da=F+2*G,pa=ha+3,ga=G<4?1:-1,fa=2===G||3===G||6===G||7===G?1:-1;i.Cartesian3.pack(Ce.high,O,ha),O[pa]=he.x,i.Cartesian3.pack(Ce.low,I,ha),I[pa]=he.y,i.Cartesian3.pack(me,L,ha),L[pa]=he.z,i.Cartesian3.pack(we,S,ha),S[pa]=sa*ga,i.Cartesian3.pack(ge,k,ha);var ma=oa*fa;0===ma&&fa<0&&(ma=Number.POSITIVE_INFINITY),k[pa]=ma,C&&(f[ha]=_e.high.x,f[ha+1]=_e.high.y,f[ha+2]=_e.low.x,f[ha+3]=_e.low.y,v[ha]=-ie.y,v[ha+1]=ie.x,v[ha+2]=ne.y,v[ha+3]=-ne.x,m[ha]=Te.x,m[ha+1]=Te.y,m[ha+2]=Ee.x,m[ha+3]=Ee.y,w[da]=ua*ga,0===(ma=ca*fa)&&fa<0&&(ma=Number.POSITIVE_INFINITY),w[da+1]=ma)}var va=ze,wa=je,ya=He,_a=Ve,Ta=t.Rectangle.fromCartographicArray(xe,Re),Ma=D.getMinimumMaximumHeights(Ta,y),Ea=Ma.minimumTerrainHeight,ba=Ma.maximumTerrainHeight;ee+=Ea,ee+=ba,Me(re,se,Ea,ba,va,ya),Me(U,Q,Ea,ba,wa,_a);var Pa=i.Cartesian3.multiplyByScalar(ge,s.CesiumMath.EPSILON5,aa);i.Cartesian3.add(va,Pa,va),i.Cartesian3.add(wa,Pa,wa),i.Cartesian3.add(ya,Pa,ya),i.Cartesian3.add(_a,Pa,_a),be(va,wa),be(ya,_a),i.Cartesian3.pack(va,P,Y),i.Cartesian3.pack(wa,P,Y+3),i.Cartesian3.pack(_a,P,Y+6),i.Cartesian3.pack(ya,P,Y+9),Pa=i.Cartesian3.multiplyByScalar(ge,-2*s.CesiumMath.EPSILON5,aa),i.Cartesian3.add(va,Pa,va),i.Cartesian3.add(wa,Pa,wa),i.Cartesian3.add(ya,Pa,ya),i.Cartesian3.add(_a,Pa,_a),be(va,wa),be(ya,_a),i.Cartesian3.pack(va,P,Y+12),i.Cartesian3.pack(wa,P,Y+15),i.Cartesian3.pack(_a,P,Y+18),i.Cartesian3.pack(ya,P,Y+21),W+=2,g+=3,F+=16,Y+=24,X+=32,K+=ce,$+=la}g=0;var Oa=0;for(p=0;p<_;p++){for(G=0;G<na;G++)b[g+G]=ia[G]+Oa;Oa+=8,g+=na}var Ia=ta;e.BoundingSphere.fromVertices(r,i.Cartesian3.ZERO,3,Ia[0]),e.BoundingSphere.fromVertices(o,i.Cartesian3.ZERO,3,Ia[1]);var La=e.BoundingSphere.fromBoundingSpheres(Ia);La.radius+=ee/(2*_);var Sa={position:new d.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:P}),startHiAndForwardOffsetX:ra(O),startLoAndForwardOffsetY:ra(I),startNormalAndForwardOffsetZ:ra(L),endNormalAndTextureCoordinateNormalizationX:ra(S),rightNormalAndTextureCoordinateNormalizationY:ra(k)};C&&(Sa.startHiLo2D=ra(f),Sa.offsetAndRight2D=ra(m),Sa.startEndNormals2D=ra(v),Sa.texcoordNormalization2D=new d.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w}));return new d.Geometry({attributes:Sa,indices:b,boundingSphere:La})}(y,E,B,W,j,z,w)}};var de=new i.Cartesian3,pe=new e.Matrix3,ge=new d.Quaternion;function fe(a,t,n,r){var o=Z(n,t,de),l=i.Cartesian3.dot(o,a);if(l>x||l<R){var u=Z(r,n,ae),c=l<R?s.CesiumMath.PI_OVER_TWO:-s.CesiumMath.PI_OVER_TWO,C=d.Quaternion.fromAxisAngle(u,c,ge),h=e.Matrix3.fromQuaternion(C,pe);return e.Matrix3.multiplyByVector(h,a,a),!0}return!1}var me=new i.Cartographic,ve=new i.Cartesian3,we=new i.Cartesian3;function ye(e,a,t,n,r){var o=i.Cartographic.toCartesian(a,e._ellipsoid,ve),l=i.Cartesian3.add(o,t,we),u=!1,c=e._ellipsoid,C=c.cartesianToCartographic(l,me);Math.abs(a.longitude-C.longitude)>s.CesiumMath.PI_OVER_TWO&&(u=!0,l=i.Cartesian3.subtract(o,t,we),C=c.cartesianToCartographic(l,me)),C.height=0;var h=e.project(C,r);return(r=i.Cartesian3.subtract(h,n,r)).z=0,r=i.Cartesian3.normalize(r,r),u&&i.Cartesian3.negate(r,r),r}var _e=new i.Cartesian3,Te=new i.Cartesian3;function Me(e,a,t,n,r,s){var o=i.Cartesian3.subtract(a,e,_e);i.Cartesian3.normalize(o,o);var l=t-0,u=i.Cartesian3.multiplyByScalar(o,l,Te);i.Cartesian3.add(e,u,r);var c=n-1e3;u=i.Cartesian3.multiplyByScalar(o,c,Te),i.Cartesian3.add(a,u,s)}var Ee=new i.Cartesian3;function be(e,a){var t=g.Plane.getPointDistance(ie,e),n=g.Plane.getPointDistance(ie,a),r=Ee;s.CesiumMath.equalsEpsilon(t,0,s.CesiumMath.EPSILON2)?(r=Z(a,e,r),i.Cartesian3.multiplyByScalar(r,s.CesiumMath.EPSILON2,r),i.Cartesian3.add(e,r,e)):s.CesiumMath.equalsEpsilon(n,0,s.CesiumMath.EPSILON2)&&(r=Z(e,a,r),i.Cartesian3.multiplyByScalar(r,s.CesiumMath.EPSILON2,r),i.Cartesian3.add(a,r,a))}function Pe(e,a){var t=Math.abs(e.longitude),i=Math.abs(a.longitude);if(s.CesiumMath.equalsEpsilon(t,s.CesiumMath.PI,s.CesiumMath.EPSILON11)){var n=s.CesiumMath.sign(a.longitude);return e.longitude=n*(t-s.CesiumMath.EPSILON11),1}if(s.CesiumMath.equalsEpsilon(i,s.CesiumMath.PI,s.CesiumMath.EPSILON11)){var r=s.CesiumMath.sign(e.longitude);return a.longitude=r*(i-s.CesiumMath.EPSILON11),2}return 0}var Oe=new i.Cartographic,Ie=new i.Cartographic,Le=new i.Cartesian3,Se=new i.Cartesian3,De=new i.Cartesian3,ke=new i.Cartesian3,Ae=new i.Cartesian3,Ne=new i.Cartesian3,xe=[Oe,Ie],Re=new t.Rectangle,He=new i.Cartesian3,Ve=new i.Cartesian3,ze=new i.Cartesian3,je=new i.Cartesian3,Ge=new i.Cartesian3,Be=new i.Cartesian3,We=new i.Cartesian3,Fe=new i.Cartesian3,Ye=new i.Cartesian3,Xe=new i.Cartesian3,qe=new i.Cartesian3,Ue=new i.Cartesian3,Ze=new i.Cartesian3,Qe=new i.Cartesian3,Je=new h.EncodedCartesian3,Ke=new h.EncodedCartesian3,$e=new i.Cartesian3,ea=new i.Cartesian3,aa=new i.Cartesian3,ta=[new e.BoundingSphere,new e.BoundingSphere],ia=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],na=ia.length;function ra(e){return new d.GeometryAttribute({componentDatatype:u.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return H._projectNormal=ye,function(e,a){return D.initialize().then((function(){return r.defined(a)&&(e=H.unpack(e,a)),H.createGeometry(e)}))}}));
