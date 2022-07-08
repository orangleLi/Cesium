define(["exports","./Cartographic-3309dd0d","./when-b60132fc","./Check-7b2a090c","./PrimitiveType-108f83af","./Math-119be1a3","./GeometryAttribute-b20c1286","./Cartesian2-47311507"],(function(t,n,a,r,e,o,i,s){"use strict";var g=Math.cos,h=Math.sin,u=Math.sqrt,c={computePosition:function(t,n,r,e,o,i,s){var c=n.radiiSquared,C=t.nwCorner,l=t.boundingRectangle,S=C.latitude-t.granYCos*e+o*t.granXSin,d=g(S),w=h(S),M=c.z*w,X=C.longitude+e*t.granYSin+o*t.granXCos,Y=d*g(X),m=d*h(X),p=c.x*Y,f=c.y*m,v=u(p*Y+f*m+M*w);if(i.x=p/v,i.y=f/v,i.z=M/v,r){var G=t.stNwCorner;a.defined(G)?(S=G.latitude-t.stGranYCos*e+o*t.stGranXSin,X=G.longitude+e*t.stGranYSin+o*t.stGranXCos,s.x=(X-t.stWest)*t.lonScalar,s.y=(S-t.stSouth)*t.latScalar):(s.x=(X-l.west)*t.lonScalar,s.y=(S-l.south)*t.latScalar)}}},C=new i.Matrix2,l=new n.Cartesian3,S=new n.Cartographic,d=new n.Cartesian3,w=new e.GeographicProjection;function M(t,a,r,e,o,s,g){var h=Math.cos(a),u=e*h,c=r*h,S=Math.sin(a),M=e*S,X=r*S;l=w.project(t,l),l=n.Cartesian3.subtract(l,d,l);var Y=i.Matrix2.fromRotation(a,C);l=i.Matrix2.multiplyByVector(Y,l,l),l=n.Cartesian3.add(l,d,l),s-=1,g-=1;var m=(t=w.unproject(l,t)).latitude,p=m+s*X,f=m-u*g,v=m-u*g+s*X,G=Math.max(m,p,f,v),x=Math.min(m,p,f,v),y=t.longitude,R=y+s*c,b=y+g*M,O=y+g*M+s*c;return{north:G,south:x,east:Math.max(y,R,b,O),west:Math.min(y,R,b,O),granYCos:u,granYSin:M,granXCos:c,granXSin:X,nwCorner:t}}c.computeOptions=function(t,n,a,r,e,i,g){var h,u,c,C,l,X=t.east,Y=t.west,m=t.north,p=t.south,f=!1,v=!1;m===o.CesiumMath.PI_OVER_TWO&&(f=!0),p===-o.CesiumMath.PI_OVER_TWO&&(v=!0);var G=m-p;c=(l=Y>X?o.CesiumMath.TWO_PI-Y+X:X-Y)/((h=Math.ceil(l/n)+1)-1),C=G/((u=Math.ceil(G/n)+1)-1);var x=s.Rectangle.northwest(t,i),y=s.Rectangle.center(t,S);0===a&&0===r||(y.longitude<x.longitude&&(y.longitude+=o.CesiumMath.TWO_PI),d=w.project(y,d));var R=C,b=c,O=s.Rectangle.clone(t,e),P={granYCos:R,granYSin:0,granXCos:b,granXSin:0,nwCorner:x,boundingRectangle:O,width:h,height:u,northCap:f,southCap:v};if(0!==a){var W=M(x,a,c,C,0,h,u);m=W.north,p=W.south,X=W.east,Y=W.west,P.granYCos=W.granYCos,P.granYSin=W.granYSin,P.granXCos=W.granXCos,P.granXSin=W.granXSin,O.north=m,O.south=p,O.east=X,O.west=Y}if(0!==r){a-=r;var _=s.Rectangle.northwest(O,g),T=M(_,a,c,C,0,h,u);P.stGranYCos=T.granYCos,P.stGranXCos=T.granXCos,P.stGranYSin=T.granYSin,P.stGranXSin=T.granXSin,P.stNwCorner=_,P.stWest=T.west,P.stSouth=T.south}return P},t.RectangleGeometryLibrary=c}));
