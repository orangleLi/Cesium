<template>
    <div class="container">
        <div id="cesiumContainer" :style="`position:absolute;width:${size.w}px; height:${size.h}px;overflow: hidden;`"></div>
        <select @change="handleChange">
            <option value="0">Aircraft</option>
            <option value="1">Drone</option>
            <option value="2">Ground Vehicle</option>
            <option value="3">Hot Air Balloon</option>
            <option value="4">Milk Truck</option>
            <option value="5">Skinned Character</option>
            <option value="6">Draco Compressed Model</option>
            <option value="7">KTX2 Compressed Balloon</option>
        </select>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "Aircraft",
        data() {
            return {
                size: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            };
        },
        mounted() {
            // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZTQzM2RhYy1mZDk0LTQxYjEtOThjOC03YzZmNDJkMWRiZDEiLCJpZCI6OTc4MjksImlhdCI6MTY1NTM3Mjc2Nn0.9JHtCNtdz93qO4L0LVeVMAsPrd0LFMEqaOuCxRavl0M';
            // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODZkMDQzOS03ZGJjLTQzZWUtYjlmYy04ZmM5Y2UwNzNhMmYiLCJpZCI6MjU5LCJpYXQiOjE2MzgyMDYwMDB9.cK1hsaFBgz0l2dG9Ry5vBFHWp-HF2lwjLC0tcK8Z8tY';
            this.init();
            // this.loadCity();
        },
        methods: {
            loadCity() {
                // // San Miguel model created by Guillermo M. Leal Llaguno. Cleaned up and hosted by Morgan McGuire: http://graphics.cs.williams.edu/data/meshes.xml
                // const viewer = new Cesium.Viewer("cesiumContainer");
                //
                // const tileset = new Cesium.Cesium3DTileset({
                //     url: Cesium.IonResource.fromAssetId(125737),
                // });
                //
                // viewer.scene.primitives.add(tileset);
                //
                // const initialPosition = new Cesium.Cartesian3(
                //     -1111583.3721328347,
                //     -5855888.151574568,
                //     2262561.444696748
                // );
                // const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
                //     100.0,
                //     -15.0,
                //     0.0
                // );
                // viewer.scene.camera.setView({
                //     destination: initialPosition,
                //     orientation: initialOrientation,
                //     endTransform: Cesium.Matrix4.IDENTITY,
                // });

                const viewer = new Cesium.Viewer("cesiumContainer", {
                    terrainProvider: Cesium.createWorldTerrain(),
                });

                const tileset = new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(40866),
                });

                viewer.scene.primitives.add(tileset);
                viewer.zoomTo(tileset);


            },
            init() {
                const viewer = new Cesium.Viewer("cesiumContainer", {
                    infoBox: false, //是否显示点击要素之后显示的信息
                    selectionIndicator: false,
                    shadows: true,
                    shouldAnimate: true,
                    // 使用本地底图代替服务
                    // imageryProvider: new Cesium.SingleTileImageryProvider({
                    //     url: '/images/天空球3.jpg'
                    // })
                });
                window.viewer = viewer

                viewer._cesiumWidget._innerCreditContainer.style.display = 'none'; // 去除logo信息

                // var labelImagery = new Cesium.TiandituImageryProvider({
                //     mapStyle : Cesium.TiandituMapsStyle.IMG_C, //天地图全球中文注记服务（经纬度投影）
                //     token: 'ca17d672cc66d91dfc701d51d732f11f'
                // });
                // viewer.imageryLayers.addImageryProvider(labelImagery);

                var longitude = 110.34;
                var latitude = 38.96;
                var scene = viewer.scene

                // // 关闭大气层显示
                // scene.skyAtmosphere.show = false;
                // // 控制视角不转到地下
                // scene.globe.depthTestAgainstTerrain = true;
                // // 调整阴影明暗
                viewer.shadowMap.darkness=0.2;

                viewer.scene.camera.setView({
                    // 初始化相机经纬度
                    destination: new Cesium.Cartesian3.fromDegrees(
                        // 121.54035,
                        // 38.92146,
                        longitude, latitude,
                        25000
                    ),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-85.0), //从上往下看为-90
                        roll: 0,
                    },
                });

                function createModel(url, height) {
                    viewer.entities.removeAll();

                    const position = Cesium.Cartesian3.fromDegrees(
                        longitude,
                        latitude,
                        height
                    );
                    const heading = Cesium.Math.toRadians(135);
                    const pitch = 0;
                    const roll = 0;
                    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
                        position,
                        hpr
                    );

                    const entity = viewer.entities.add({
                        name: url,
                        position: position,
                        orientation: orientation,
                        model: {
                            uri: url,
                            minimumPixelSize: 128,
                            maximumScale: 20000,
                        },
                    });
                    viewer.trackedEntity = entity;
                }
                function loadGltf(uri, height) {
                    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
                    var heading = Cesium.Math.toRadians(135);
                    var pitch = 0;
                    var roll = 0;
                    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

                    var entity = viewer.entities.add({
                        position : position,
                        orientation : orientation,
                        model : {
                            uri,
                            minimumPixelSize : 128,
                            maximumScale : 2000
                        }
                    });
                    viewer.trackedEntity = entity;
                }
                this.options = [
                    {
                        text: "Aircraft",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/Cesium_Air.glb",
                                200.0
                            );
                        },
                    },
                    {
                        text: "Drone",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/CesiumDrone.glb",
                                150.0
                            );
                        },
                    },
                    {
                        text: "Ground Vehicle",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/GroundVehicle.glb",
                                0
                            );
                        },
                    },
                    {
                        text: "Hot Air Balloon",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/CesiumBalloon.glb",
                                1000.0
                            );
                        },
                    },
                    {
                        text: "Milk Truck",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/CesiumMilkTruck.glb",
                                0
                            );
                        },
                    },
                    {
                        text: "Skinned Character",
                        onselect: function () {
                            createModel(
                                "/models/Aircraft/Cesium_Man.glb",
                                0
                            );
                        },
                    },
                    {
                        text: "Draco Compressed Model",
                        onselect: function () {
                            loadGltf(
                                "/models/Aircraft/CesiumMilkTruck/CesiumMilkTruck.gltf",
                                0
                            );
                        },
                    },
                    {
                        text: "KTX2 Compressed Balloon",
                        onselect: function () {
                            if (!Cesium.FeatureDetection.supportsBasis(viewer.scene)) {
                                window.alert(
                                    "This browser does not support Basis Universal compressed textures"
                                );
                            }
                            createModel(
                                "/models/Aircraft/CesiumBalloonKTX2.glb",
                                1000.0
                            );
                        },
                    },
                ];
                // this.options[0].onselect()

                // var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
                // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                // var model = scene.primitives.add(Cesium.Model.fromGltf({
                //     // url: "/models/Aircraft/CesiumMilkTruck/CesiumMilkTruck.gltf",
                //     url: "/models/hb2/huanbaodimian.glb",
                //     modelMatrix: modelMatrix,
                //     minimumPixelSize: 128,
                //     maximumScale: 4000,
                //     // 放大倍数
                //     scale: 3
                // }))

                // createModel("/models/Aircraft/Cesium_Air.glb", 150)

                // var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
                // var heading = Cesium.Math.toRadians(135);
                // var pitch = 0;
                // var roll = 0;
                // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                // var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                //
                // var entity = viewer.entities.add({
                //     // name: url,
                //     position: position,
                //     // orientation: orientation,
                //     model: {
                //         uri: "/models/hb2/huanbaodimian.glb",
                //         // minimumPixelSize: 5,
                //         // maximumScale: 20000
                //     }
                // });
                // viewer.trackedEntity = entity;
                // this.loadTree([longitude, latitude, 0], "/models/hb2/huanbaodimian.glb")
                // this.loadTree([longitude, latitude, 0], "/models/hb2/shu2.glb")
                this.loadTree([longitude, latitude, 0], "/models/Aircraft/Cesium_Air.glb")
                // for(let i = 0; i < 10; i+=0.01) {
                //     console.log(longitude, latitude - i)
                //     // this.loadTree([longitude, latitude - i, 30], "/models/hb2/shu2.glb")
                // }

            },
            loadTree(data, uri) {
                var position = Cesium.Cartesian3.fromDegrees(...data);
                var entity = window.viewer.entities.add({
                    // name: url,
                    position: position,
                    // orientation: orientation,
                    model: {
                        uri,
                        // minimumPixelSize: 5,
                        // maximumScale: 20000
                    }
                });
                //shu2.glb
                window.viewer.trackedEntity = entity;
            },
            handleChange(e) {
                this.options[e.target.value].onselect()
            }
        }
    }
    /* eslint-disable */
</script>

<style scoped>
    #cesiumContainer {
        position: absolute;
        top: 0;
        left: 0;
    }
    select{
        position: relative;
        width: 120px;
    }
</style>
