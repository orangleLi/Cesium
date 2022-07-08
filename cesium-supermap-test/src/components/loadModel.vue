<template>
    <div class="container">
        <div id="cesiumContainer" :style="`position:absolute;width:${size.w}px; height:${size.h}px;overflow: hidden;`"></div>
    </div>
</template>

<script>
    /* eslint-disable */
    var viewer, camera, handler; // eslint-disable-line
    export default {
        name: "loadModel",
        data() {
            return {
                size: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            };
        },
        mounted() {
            // this.init();
            this.load();
        },
        methods: {
            load() {
                // Grant CesiumJS access to your ion assets
                Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZTQzM2RhYy1mZDk0LTQxYjEtOThjOC03YzZmNDJkMWRiZDEiLCJpZCI6OTc4MjksImlhdCI6MTY1NTM3Mjc2Nn0.9JHtCNtdz93qO4L0LVeVMAsPrd0LFMEqaOuCxRavl0M";
                var viewer = new Cesium.Viewer('cesiumContainer', {
                    shouldAnimate: true,
                    animation: false,
                    baseLayerPicker: false,
                    fullscreenButton: false,
                    geocoder: false,
                    homeButton: false,
                    infoBox: false,
                    sceneModePicker: false,
                    selectionIndicator: false,
                    timeline: false,
                    navigationHelpButton: false,
                    // terrainProvider: new Cesium.CesiumTerrainProvider({
                    //     url: Cesium.IonResource.fromAssetId(1)
                    // }),
                    // sceneMode: Cesium.SceneMode.SCENE3D
                })
                // viewer.imageryLayers.addImageryProvider(
                //     new Cesium.IonImageryProvider({ assetId: 3 })
                // )


                const tileset = viewer.scene.primitives.add(
                    new Cesium.Cesium3DTileset({
                        url: Cesium.IonResource.fromAssetId(1142956),
                    })
                );



                // // 隐藏版权信息
                // viewer._cesiumWidget._creditContainer.style.display = "none";
                // // 通过createWorldTerrainhelper创建
                // viewer.terrainProvider = Cesium.createWorldTerrain({
                //     requestWaterMask: true,        // 开启水光效果
                //     requestVertexNormals: true     // 开启地形光照
                // });
                //
                // // 开始高程遮挡效果
                // viewer.scene.globe.depthTestAgainstTerrain = true;

                // const viewer = new Cesium.Viewer("cesiumContainer");
                //

                // var viewer = new Cesium.Viewer('cesiumContainer', {
                //     terrainProvider: Cesium.createWorldTerrain()
                // });
                //
                // var city = viewer.scene.primitives.add(
                //     new Cesium.Cesium3DTileset({
                //         url: Cesium.IonResource.fromAssetId(1142956)
                //     })
                // );
                // viewer.zoomTo(tileset);


                //控制模型的位置
                // city.readyPromise.then(function (palaceTileset) {
                //     console.log(palaceTileset);
                //     //添加到场景
                //     viewer.scene.primitives.add(palaceTileset);
                //
                //     var longitude = 113.0 //模型需要改变的经度
                //     var latitude = 28.0 //模型需要改变的纬度
                //     var heightOffset = 20000.0; //模型需要改变的高度
                //
                //     //获取3Dtlies的bounds范围
                //     var boundingSphere = palaceTileset.boundingSphere;
                //     //获取3Dtlies的范围中心点的弧度
                //     var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
                //     //定义3Dtlies改变之后中心点的弧度
                //     var offsetvalue = Cesium.Cartographic.fromDegrees(longitude, latitude, heightOffset)
                //
                //     //模型本身的位置
                //     var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
                //     //模型改变的位置
                //     var offset = Cesium.Cartesian3.fromRadians(offsetvalue.longitude, offsetvalue.latitude, heightOffset);
                //
                //     //定义模型的改变状态
                //     var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
                //     //修改模型的位置
                //     palaceTileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                //     viewer.zoomTo(palaceTileset, new Cesium.HeadingPitchRange(0.5, -0.2, palaceTileset.boundingSphere.radius *
                //         1.0));
                // })

                // var heightOffset = -32;
                // city.readyPromise.then(function(tileset) {
                //     // Position tileset
                //     var boundingSphere = tileset.boundingSphere;
                //     var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
                //     var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
                //     var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
                //     var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
                //     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                // });

                // (async () => {
                //     try {
                //         await tileset.readyPromise;
                //         await viewer.zoomTo(tileset);
                //
                //         // Apply the default style if it exists
                //         var extras = tileset.asset.extras;
                //         if (
                //             Cesium.defined(extras) &&
                //             Cesium.defined(extras.ion) &&
                //             Cesium.defined(extras.ion.defaultStyle)
                //         ) {
                //             tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
                //         }
                //     } catch (error) {
                //         console.log(error);
                //     }
                // })();
            },
            // init() {
            //     Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZTQzM2RhYy1mZDk0LTQxYjEtOThjOC03YzZmNDJkMWRiZDEiLCJpZCI6OTc4MjksImlhdCI6MTY1NTM3Mjc2Nn0.9JHtCNtdz93qO4L0LVeVMAsPrd0LFMEqaOuCxRavl0M';
            //     viewer = new Cesium.Viewer("cesiumContainer", {
            //         infoBox: false,
            //         selectionIndicator: false,
            //         shadows: true,
            //         shouldAnimate: true,
            //         // //需要进行可视化的数据源的集合
            //         // animation: false, //是否显示动画控件
            //         // shouldAnimate: true,
            //         // homeButton: false, //是否显示Home按钮
            //         // fullscreenButton: false, //是否显示全屏按钮
            //         // baseLayerPicker: false, //是否显示图层选择控件
            //         // geocoder: false, //是否显示地名查找控件
            //         // timeline: false, //是否显示时间线控件
            //         // sceneModePicker: true, //是否显示投影方式控件
            //         // navigationHelpButton: false, //是否显示帮助信息控件
            //         // infoBox: false, //是否显示点击要素之后显示的信息
            //         // requestRenderMode: true, //启用请求渲染模式
            //         // scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
            //         // sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
            //         // fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
            //         // //加载天地图影像地图，WebMapTileServiceImageryProvider该接口是加载WMTS服务的接口
            //         // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //         //     url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=ca17d672cc66d91dfc701d51d732f11f',
            //         //     layer: 'img',
            //         //     style: 'default',
            //         //     tileMatrixSetID: 'w',
            //         //     format: 'tiles',
            //         //     maximumLevel: 18
            //         // })
            //     }); // eslint-disable-line
            //     // // 如果需要叠加路网与注记矢量则添加以下代码
            //     // viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     //     url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=ca17d672cc66d91dfc701d51d732f11f',
            //     //     layer: 'cia',
            //     //     style: 'default',
            //     //     tileMatrixSetID: 'w',
            //     //     format: 'tiles',
            //     //     maximumLevel: 18
            //     // }))
            //     viewer._cesiumWidget._innerCreditContainer.style.display = 'none'; // 去除logo信息
            //
            //     var labelImagery = new Cesium.TiandituImageryProvider({
            //         mapStyle : Cesium.TiandituMapsStyle.IMG_C, //天地图全球中文注记服务（经纬度投影）
            //         token: 'ca17d672cc66d91dfc701d51d732f11f'
            //     });
            //     viewer.imageryLayers.addImageryProvider(labelImagery);
            //
            //
            //     // const pTileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            //     //     url: '/models/Batchedjianzhu/tileset.json',
            //     //     maximumScreenSpaceError: 16, // 最大的屏幕空间误差
            //     // }))
            //     // pTileset.readyPromise.then((palaceTileset) => {
            //     //     console.log(palaceTileset);
            //     // })
            //
            //     var scene = viewer.scene
            //     var longitude = 110.34;
            //     var latitude = 39.01;
            //     var height = 60.38590702090875;
            //     // var heading = 2;
            //     // var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            //     // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            //     // var model = scene.primitives.add(Cesium.Model.fromGltf({
            //     //     url: '/models/gltfTest/C2.gltf',
            //     //     modelMatrix: modelMatrix,
            //     //     minimumPixelSize: 128,
            //     //     maximumScale: 4000
            //     // }))
            //
            //
            //     const entity = viewer.entities.add({
            //         name: "test_Model",
            //         position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
            //         model: {
            //             uri: "/models/Batchedjianzhu/shan.glb",
            //             minimumPixelSize: 640,
            //             maximumScale: 20000,
            //         }
            //     });
            //     viewer.trackedEntity = entity;
            //
            //     let startPosition = new Cesium.Cartesian3.fromDegrees(110.34046454, 39.01415039);
            //     let endPosition = new Cesium.Cartesian3.fromDegrees(110.34701991, 39.01648221);
            //     let factor = 0;
            //     const entity1 = viewer.entities.add({
            //         name: "test_Model",
            //         position: new Cesium.CallbackProperty(function() {
            //             if (factor > 5000) {
            //                 factor = 0;
            //             }
            //             factor++;
            //             // 动态更新位置
            //             return Cesium.Cartesian3.lerp(startPosition, endPosition, factor / 5000.0, new Cesium.Cartesian3());
            //         }, false),
            //         model: {
            //             uri: "/models/Batchedjianzhu/shui.glb",
            //             minimumPixelSize: 640,
            //             maximumScale: 20000,
            //         }
            //     });
            //     viewer.trackedEntity = entity1;
            //
            //     const entity2 = viewer.entities.add({
            //         name: "test_Model",
            //         position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
            //         model: {
            //             uri: "/models/Batchedjianzhu/jianzhu.glb",
            //             minimumPixelSize: 640,
            //             maximumScale: 20000,
            //         }
            //     });
            //     viewer.trackedEntity = entity2;
            //
            //     // var palaceTileset = new Cesium.Cesium3DTileset({
            //     //     url: '/models/Batchedjianzhu/tileset.json'
            //     //     //url: 'http://ip:port/www/DAEPalace/tileset.json'
            //     // })
            //     // viewer.scene.primitives.add(palaceTileset);
            //     // palaceTileset.tileLoad.addEventListener(function (tile) {
            //     //     console.log("瓦片加载了");
            //     // });
            //     //
            //     // palaceTileset.readyPromise.then(function(argument) {
            //     //     //经纬度、高转笛卡尔坐标
            //     //     var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            //     //     var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            //     //     var rotationX = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading)));
            //     //     Cesium.Matrix4.multiply(mat, rotationX, mat);
            //     //     palaceTileset._root.transform = mat;
            //     // })
            //
            //     viewer.scene.camera.flyTo({
            //         // 初始化相机经纬度
            //         destination: new Cesium.Cartesian3.fromDegrees(
            //             // 121.54035,
            //             // 38.92146,
            //             longitude, latitude,
            //             15000
            //         ),
            //         orientation: {
            //             heading: Cesium.Math.toRadians(0.0),
            //             pitch: Cesium.Math.toRadians(-85.0), //从上往下看为-90
            //             roll: 0,
            //         },
            //     });
            //
            //     // var palaceTileset = new Cesium.Cesium3DTileset({
            //     //     url: '/models/Batchedjianzhu/tileset.json',
            //     //     //控制切片视角显示的数量，可调整性能
            //     //     maximumScreenSpaceError: 2,
            //     //     maximumNumberOfLoadedTiles: 100000,
            //     // })
            //     // //控制模型的位置
            //     // palaceTileset.readyPromise.then(function (palaceTileset) {
            //     //     console.log(palaceTileset);
            //     //     //添加到场景
            //     //     viewer.scene.primitives.add(palaceTileset);
            //     //
            //     //     // var longitude = 113.0 //模型需要改变的经度
            //     //     // var latitude = 28.0 //模型需要改变的纬度
            //     //     var heightOffset = 20.0; //模型需要改变的高度
            //     //
            //     //     //获取3Dtlies的bounds范围
            //     //     var boundingSphere = palaceTileset.boundingSphere;
            //     //     //获取3Dtlies的范围中心点的弧度
            //     //     var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            //     //     //定义3Dtlies改变之后中心点的弧度
            //     //     var offsetvalue = Cesium.Cartographic.fromDegrees(longitude, latitude, heightOffset)
            //     //
            //     //     //模型本身的位置
            //     //     var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
            //     //     //模型改变的位置
            //     //     var offset = Cesium.Cartesian3.fromRadians(offsetvalue.longitude, offsetvalue.latitude, heightOffset);
            //     //
            //     //     //定义模型的改变状态
            //     //     var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            //     //     //修改模型的位置
            //     //     palaceTileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            //     //     viewer.zoomTo(palaceTileset, new Cesium.HeadingPitchRange(0.5, -0.2, palaceTileset.boundingSphere.radius *
            //     //         1.0));
            //     // })
            // }
        }
    }
    /* eslint-disable */
</script>

<style scoped>

</style>
