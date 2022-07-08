define(["exports","./Cartographic-3309dd0d","./PolylineVolumeGeometryLibrary-4a7c15e7","./when-b60132fc","./Math-119be1a3","./PrimitiveType-108f83af","./PolylinePipeline-145ba528","./GeometryAttribute-b20c1286"],(function(a,e,r,n,t,i,s,o){"use strict";var C={},l=new e.Cartesian3,y=new e.Cartesian3,u=new e.Cartesian3,c=new e.Cartesian3,d=[new e.Cartesian3,new e.Cartesian3],p=new e.Cartesian3,m=new e.Cartesian3,g=new e.Cartesian3,h=new e.Cartesian3,f=new e.Cartesian3,w=new e.Cartesian3,z=new e.Cartesian3,x=new e.Cartesian3,v=new e.Cartesian3,P=new e.Cartesian3,A=new o.Quaternion,b=new i.Matrix3;function B(a,n,s,C,u){var c,d=e.Cartesian3.angleBetween(e.Cartesian3.subtract(n,a,l),e.Cartesian3.subtract(s,a,y)),p=C===r.CornerType.BEVELED?1:Math.ceil(d/t.CesiumMath.toRadians(5))+1,m=3*p,g=new Array(m);g[m-3]=s.x,g[m-2]=s.y,g[m-1]=s.z,c=u?i.Matrix3.fromQuaternion(o.Quaternion.fromAxisAngle(e.Cartesian3.negate(a,l),d/p,A),b):i.Matrix3.fromQuaternion(o.Quaternion.fromAxisAngle(a,d/p,A),b);var h=0;n=e.Cartesian3.clone(n,l);for(var f=0;f<p;f++)n=i.Matrix3.multiplyByVector(c,n,n),g[h++]=n.x,g[h++]=n.y,g[h++]=n.z;return g}function E(a,r,n,t){var i=l;return t||(r=e.Cartesian3.negate(r,r)),[(i=e.Cartesian3.add(a,r,i)).x,i.y,i.z,n.x,n.y,n.z]}function S(a,r,n,t){for(var i=new Array(a.length),s=new Array(a.length),o=e.Cartesian3.multiplyByScalar(r,n,l),C=e.Cartesian3.negate(o,y),d=0,p=a.length-1,m=0;m<a.length;m+=3){var g=e.Cartesian3.fromArray(a,m,u),h=e.Cartesian3.add(g,C,c);i[d++]=h.x,i[d++]=h.y,i[d++]=h.z;var f=e.Cartesian3.add(g,o,c);s[p--]=f.z,s[p--]=f.y,s[p--]=f.x}return t.push(i,s),t}C.addAttribute=function(a,e,r,t){var i=e.x,s=e.y,o=e.z;n.defined(r)&&(a[r]=i,a[r+1]=s,a[r+2]=o),n.defined(t)&&(a[t]=o,a[t-1]=s,a[t-2]=i)};var D=new e.Cartesian3,M=new e.Cartesian3;C.computePositions=function(a){var n=a.granularity,i=a.positions,o=a.ellipsoid,C=a.width/2,y=a.cornerType,u=a.saveAttributes,c=p,A=m,b=g,T=h,N=f,L=w,O=z,R=x,V=v,G=P,Q=[],U=u?[]:void 0,I=u?[]:void 0,q=i[0],j=i[1];A=e.Cartesian3.normalize(e.Cartesian3.subtract(j,q,A),A),c=o.geodeticSurfaceNormal(q,c),T=e.Cartesian3.normalize(e.Cartesian3.cross(c,A,T),T),u&&(U.push(T.x,T.y,T.z),I.push(c.x,c.y,c.z)),O=e.Cartesian3.clone(q,O),q=j,b=e.Cartesian3.negate(A,b);var k,F,H=[],J=i.length;for(k=1;k<J-1;k++){c=o.geodeticSurfaceNormal(q,c),j=i[k+1],A=e.Cartesian3.normalize(e.Cartesian3.subtract(j,q,A),A),N=e.Cartesian3.normalize(e.Cartesian3.add(A,b,N),N);var K=e.Cartesian3.multiplyByScalar(c,e.Cartesian3.dot(A,c),D);e.Cartesian3.subtract(A,K,K),e.Cartesian3.normalize(K,K);var W=e.Cartesian3.multiplyByScalar(c,e.Cartesian3.dot(b,c),M);if(e.Cartesian3.subtract(b,W,W),e.Cartesian3.normalize(W,W),!t.CesiumMath.equalsEpsilon(Math.abs(e.Cartesian3.dot(K,W)),1,t.CesiumMath.EPSILON7)){N=e.Cartesian3.cross(N,c,N),N=e.Cartesian3.cross(c,N,N),N=e.Cartesian3.normalize(N,N);var X=C/Math.max(.25,e.Cartesian3.magnitude(e.Cartesian3.cross(N,b,l))),Y=r.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(A,b,q,o);N=e.Cartesian3.multiplyByScalar(N,X,N),Y?(R=e.Cartesian3.add(q,N,R),G=e.Cartesian3.add(R,e.Cartesian3.multiplyByScalar(T,C,G),G),V=e.Cartesian3.add(R,e.Cartesian3.multiplyByScalar(T,2*C,V),V),d[0]=e.Cartesian3.clone(O,d[0]),d[1]=e.Cartesian3.clone(G,d[1]),Q=S(s.PolylinePipeline.generateArc({positions:d,granularity:n,ellipsoid:o}),T,C,Q),u&&(U.push(T.x,T.y,T.z),I.push(c.x,c.y,c.z)),L=e.Cartesian3.clone(V,L),T=e.Cartesian3.normalize(e.Cartesian3.cross(c,A,T),T),V=e.Cartesian3.add(R,e.Cartesian3.multiplyByScalar(T,2*C,V),V),O=e.Cartesian3.add(R,e.Cartesian3.multiplyByScalar(T,C,O),O),y===r.CornerType.ROUNDED||y===r.CornerType.BEVELED?H.push({leftPositions:B(R,L,V,y,Y)}):H.push({leftPositions:E(q,e.Cartesian3.negate(N,N),V,Y)})):(V=e.Cartesian3.add(q,N,V),G=e.Cartesian3.add(V,e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T,C,G),G),G),R=e.Cartesian3.add(V,e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T,2*C,R),R),R),d[0]=e.Cartesian3.clone(O,d[0]),d[1]=e.Cartesian3.clone(G,d[1]),Q=S(s.PolylinePipeline.generateArc({positions:d,granularity:n,ellipsoid:o}),T,C,Q),u&&(U.push(T.x,T.y,T.z),I.push(c.x,c.y,c.z)),L=e.Cartesian3.clone(R,L),T=e.Cartesian3.normalize(e.Cartesian3.cross(c,A,T),T),R=e.Cartesian3.add(V,e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T,2*C,R),R),R),O=e.Cartesian3.add(V,e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T,C,O),O),O),y===r.CornerType.ROUNDED||y===r.CornerType.BEVELED?H.push({rightPositions:B(V,L,R,y,Y)}):H.push({rightPositions:E(q,N,R,Y)})),b=e.Cartesian3.negate(A,b)}q=j}return c=o.geodeticSurfaceNormal(q,c),d[0]=e.Cartesian3.clone(O,d[0]),d[1]=e.Cartesian3.clone(q,d[1]),Q=S(s.PolylinePipeline.generateArc({positions:d,granularity:n,ellipsoid:o}),T,C,Q),u&&(U.push(T.x,T.y,T.z),I.push(c.x,c.y,c.z)),y===r.CornerType.ROUNDED&&(F=function(a){var n=p,t=m,i=g,s=a[1];t=e.Cartesian3.fromArray(a[1],s.length-3,t),i=e.Cartesian3.fromArray(a[0],0,i);var o=B(n=e.Cartesian3.midpoint(t,i,n),t,i,r.CornerType.ROUNDED,!1),C=a.length-1,l=a[C-1];return s=a[C],t=e.Cartesian3.fromArray(l,l.length-3,t),i=e.Cartesian3.fromArray(s,0,i),[o,B(n=e.Cartesian3.midpoint(t,i,n),t,i,r.CornerType.ROUNDED,!1)]}(Q)),{positions:Q,corners:H,lefts:U,normals:I,endPositions:F}},a.CorridorGeometryLibrary=C}));
