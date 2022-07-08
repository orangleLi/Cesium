define(["exports","./arrayFill-4513d7ad","./PrimitiveType-108f83af","./Cartographic-3309dd0d","./ComponentDatatype-c140a87d","./when-b60132fc","./Check-7b2a090c","./EllipseGeometryLibrary-518dda08","./Cartesian2-47311507","./GeometryAttribute-b20c1286","./GeometryAttributes-252e9929","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-8a5eead4","./Math-119be1a3"],(function(e,t,i,r,a,n,o,s,l,u,d,p,f,c){"use strict";var m=new r.Cartesian3,h=new r.Cartesian3;var y=new i.BoundingSphere,b=new i.BoundingSphere;function A(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).center,i=n.defaultValue(e.ellipsoid,l.Ellipsoid.WGS84),a=e.semiMajorAxis,o=e.semiMinorAxis,s=n.defaultValue(e.granularity,c.CesiumMath.RADIANS_PER_DEGREE),u=n.defaultValue(e.height,0),d=n.defaultValue(e.extrudedHeight,u);this._center=r.Cartesian3.clone(t),this._semiMajorAxis=a,this._semiMinorAxis=o,this._ellipsoid=l.Ellipsoid.clone(i),this._rotation=n.defaultValue(e.rotation,0),this._height=Math.max(d,u),this._granularity=s,this._extrudedHeight=Math.min(d,u),this._numberOfVerticalLines=Math.max(n.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._outlineWidth=n.defaultValue(e.outlineWidth,1),this._workerName="createEllipseOutlineGeometry"}A.packedLength=r.Cartesian3.packedLength+l.Ellipsoid.packedLength+9,A.pack=function(e,t,i){return i=n.defaultValue(i,0),r.Cartesian3.pack(e._center,t,i),i+=r.Cartesian3.packedLength,l.Ellipsoid.pack(e._ellipsoid,t,i),i+=l.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i++]=n.defaultValue(e._offsetAttribute,-1),t[i]=e._outlineWidth,t};var _=new r.Cartesian3,g=new l.Ellipsoid,v={center:_,ellipsoid:g,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0,outlineWidth:void 0};A.unpack=function(e,t,i){t=n.defaultValue(t,0);var a=r.Cartesian3.unpack(e,t,_);t+=r.Cartesian3.packedLength;var o=l.Ellipsoid.unpack(e,t,g);t+=l.Ellipsoid.packedLength;var s=e[t++],u=e[t++],d=e[t++],p=e[t++],f=e[t++],c=e[t++],m=e[t++],h=e[t++],y=e[t];return n.defined(i)?(i._center=r.Cartesian3.clone(a,i._center),i._ellipsoid=l.Ellipsoid.clone(o,i._ellipsoid),i._semiMajorAxis=s,i._semiMinorAxis=u,i._rotation=d,i._height=p,i._granularity=f,i._extrudedHeight=c,i._numberOfVerticalLines=m,i._offsetAttribute=-1===h?void 0:h,i._outlineWidth=y,i):(v.height=p,v.extrudedHeight=c,v.granularity=f,v.rotation=d,v.semiMajorAxis=s,v.semiMinorAxis=u,v.numberOfVerticalLines=m,v.offsetAttribute=-1===h?void 0:h,v.outlineWidth=y,new A(v))},A.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var o=e._height,l=e._extrudedHeight,A=!c.CesiumMath.equalsEpsilon(o,l,0,c.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var _,g={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:o,granularity:e._granularity,outlineWidth:e._outlineWidth,numberOfVerticalLines:e._numberOfVerticalLines};if(A)g.extrudedHeight=l,g.offsetAttribute=e._offsetAttribute,_=function(e){var o=e.center,l=e.ellipsoid,h=e.semiMajorAxis,A=r.Cartesian3.multiplyByScalar(l.geodeticSurfaceNormal(o,m),e.height,m);y.center=r.Cartesian3.add(o,A,y.center),y.radius=h,A=r.Cartesian3.multiplyByScalar(l.geodeticSurfaceNormal(o,A),e.extrudedHeight,A),b.center=r.Cartesian3.add(o,A,b.center),b.radius=h;var _=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,g=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(_,e,!0)})});_=g.position.values;var v=i.BoundingSphere.union(y,b),E=_.length/3;if(n.defined(e.offsetAttribute)){var x=new Uint8Array(E);if(e.offsetAttribute===p.GeometryOffsetAttribute.TOP)x=t.arrayFill(x,1,0,E/2);else{var M=e.offsetAttribute===p.GeometryOffsetAttribute.NONE?0:1;x=t.arrayFill(x,M)}g.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})}var C=n.defaultValue(e.numberOfVerticalLines,16);C=c.CesiumMath.clamp(C,0,E/2);var G=f.IndexDatatype.createTypedArray(E,2*E+2*C);E/=2;var L,O,V=0;for(L=0;L<E;++L)G[V++]=L,G[V++]=(L+1)%E,G[V++]=L+E,G[V++]=(L+1)%E+E;if(C>0){var S=Math.min(C,E);O=Math.round(E/S);var w=Math.min(O*C,E);for(L=0;L<w;L+=O)G[V++]=L,G[V++]=L+E}return{boundingSphere:v,attributes:g,indices:G}}(g);else if(_=function(e){var t=e.center;h=r.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,h),e.height,h),h=r.Cartesian3.add(t,h,h);var o=new i.BoundingSphere(h,e.semiMajorAxis),l=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,p=n.defaultValue(e.outlineWidth,1);p>1&&l.push(l[0],l[1],l[2]);var c=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(l,e,!1)})});p>1&&(c.sideness=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array([0,0,0,1,1,1,1,0])}),c.sideness.isInstanceAttribute=!0);for(var m=l.length/3,y=f.IndexDatatype.createTypedArray(m,2*m),b=0,A=0;A<m;++A)y[b++]=A,y[b++]=(A+1)%m;return{boundingSphere:o,attributes:c,indices:y}}(g),n.defined(e._offsetAttribute)){var v=_.attributes.position.values.length,E=new Uint8Array(v/3),x=e._offsetAttribute===p.GeometryOffsetAttribute.NONE?0:1;t.arrayFill(E,x),_.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}return new u.Geometry({attributes:_.attributes,indices:_.indices,primitiveType:e._outlineWidth>1?i.PrimitiveType.TRIANGLES:i.PrimitiveType.LINES,boundingSphere:_.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=A}));