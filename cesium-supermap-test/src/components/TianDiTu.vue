<template>
  <div class="container">
    <div id="cesiumContainer" :style="`position:absolute;width:${size.w}px; height:${size.h}px;overflow: hidden;`"></div>
  </div>
</template>

<script>
    /* eslint-disable */
    var viewer, camera, handler; // eslint-disable-line
    export default {
        data() {
            return {
                size: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            };
        },
        mounted() {
            this.init();
            this.clickEvent()
        },
        methods: {
            init() {
                var URL_CONFIG = {
                    TDT_IMG : 'https://[subdomain].tianditu.com/img_w/wmts',//天地图影像
                    TDT_LABEL : 'https://[subdomain].tianditu.com/cia_w/wmts',//天地图文字注记
                    BINGMAP : '//dev.virtualearth.net',//bing map影像
                    BING_MAP_KEY: 'AuY224ZCXZhjQ17Ywh2M7-5RhjJg2bEFEzIho3vWtxEDfXFshZsq4_FFJ2m1s1I3',
                    STK : 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path',//STK 地形
                    ZF_IMG : 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/MosaicResult_2@IMAGE_1',
                    ZF_TERRAIN : 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/DatasetDEM_1@sichuanTer',
                    ZF_IMG2 : 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/image',//珠峰影像SCI
                    ZF_TERRAIN2 : 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/srtm_54_07@zhufeng',//珠峰地形SCT
                    SiChuan_TERRAIN : 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/DatasetDEM', // 四川地形
                    SiChuan_IMG : 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/MosaicResult', // 四川影像
                    TENSE_IMG0 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0300@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG1 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0310@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG2 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0330@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG3 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0340@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG4 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0350@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG5 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0400@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG6 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0410@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG7 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0420@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG8 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0430@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG9 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0440@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    TENSE_IMG10 : 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe-2/rest/realspace/datas/rs0450@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
                    SUPERMAP_IMG_WGS : 'http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google',//经纬度投影地图TILE IMGERY（中国区域）
                    SUPERMAP_IMG_MEC : 'http://www.supermapol.com/realspace/services/map-China400/rest/maps/China400',//墨卡托投影地图TILE IMGERY（全球）
                    SCP_JINJIANG : 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace/datas/jinjiang/config',// 晋江倾斜SCP
                    SCENE_JINJIANG: 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace', // 晋江倾斜 场景
                    SCP_SUOFEIYA : 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace/datas/Config/config', // 索菲亚大教堂倾斜数据
                    SCENE_SUOFEIYA: 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace', // 索菲亚大教堂倾斜数据场景
                    SCP_SRSB : 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/srsb/config',//萨尔茨堡SCP
                    SCENE_SRSB: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace', // 萨尔茨堡场景
                    SCP_SRSB_WATER : 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/%E6%B0%B4%E9%9D%A2@vector/config',//萨尔茨堡水面SCP
                    SCP_NIAOCHAO : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Building@OlympicGreen/config',//鸟巢SCP
                    SCENE_NIAOCHAO: 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace', // 鸟巢 场景
                    SCP_NIAOCHAO_WATER : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Waters@OlympicGreen/config',//鸟巢水面SCP
                    SCP_CBD_TREE : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Tree@CBD/config',//CBD 树SCP
                    SCP_CBD_ROAD:'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Xiaopin@CBD/config',//CBD的道路网
                    SCP_CBD_BRIDGE:'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Bridge@CBD/config',
                    SCP_CBD_GROUND1 : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Ground@CBD/config',//CBD 地面1 SCP
                    // SCP_CBD_GROUND1 : 'http://www.supermapol.com/realspace/services/3D-CBDCache20200416/rest/realspace/datas/Ground_1@CBD/config',//新CBD 地面1 SCP
                    SCP_CBD_GROUND2 : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Ground2@CBD/config',//CBD 地面2 SCP
                    //SCP_CBD_BUILD : 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Building@%E6%96%B0CBD/config',//CBD 建筑物 SCP
                    SCP_CBD_BUILD : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Building@CBD/config',//CBD 建筑物 SCP
                    // SCP_CBD_TREE: 'http://www.supermapol.com/realspace/services/3D-CBDCache20200416/rest/realspace/datas/Tree@CBD/config',//CBD的书
                    SCP_CBD_LAKE : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/datas/Lake@CBD/config',
                    SCP_BIM : 'https://www.supermapol.com/realspace/services/3D-S3MData/rest/realspace/datas/T8H_NoLod/config',//BIM scp
                    SCENE_BIMBUILDING: 'http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace', // BIM 场景
                    SCENE_WIREFRAME:'http://www.supermapol.com/realspace/services/3D-wireFrame/rest/realspace',//BIM wireFrame场景
                    SCP_VECTOR_POLYGON : 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/%E4%B8%93%E9%A2%98%E5%9B%BE/config',//矢量 面 SCP
                    SCP_VECTOR_LINE : 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/Line/config',// 矢量 线 SCP
                    SCP_VECTOR_TEXT : 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/text/config',//矢量 文字 SCP
                    SCP_POINTCLOUD : 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace/datas/POINTCLOUD23/config', //点云 SCP
                    SCENE_POINTCLOUD: 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
                    SCP_SGNS : 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace/datas/siguniang/config',//四姑娘山 SCP
                    SCENE_SGNS: 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace', // 四姑娘山 场景
                    SCENE_RECT: 'http://www.supermapol.com/realspace/services/3D-Text01/rest/realspace', // 框选 场景
                    SCP_OLYMPIC_TREE : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Tree@OlympicGreen/config',//奥林匹克公园 树 SCP
                    SCP_OLYMPIC_BUILD : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Building@OlympicGreen/config',//奥林匹克公园 建筑物 SCP
                    SCP_OLYMPIC_BILLBOARD : 'http://www.supermapol.com/realspace/services/3D-NewOlympicGreen/rest/realspace/datas/Road@OlympicGreen/config',//奥林匹克公园 人物 SCP
                    SCP_OLYMPIC_GROUND : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Road@OlympicGreen/config',//奥林匹克公园 地面 SCP
                    SCP_OLYMPIC_WATER : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/Waters@OlympicGreen/config',//奥林匹克公园 水面 SCP
                    SCP_OLYMPIC_OlympicGreen : 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace/datas/BirdNest@OlympicGreen/config',//奥林匹克公园 单独鸟巢 SCP
                    SCENE_OLYMPIC: 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace',
                    SCENE_OLYMPIC_GREEN: 'http://www.supermapol.com/realspace/services/3D-SampleCodeForFan20200420/rest/realspace',
                    SCP_XGPARK : 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace/datas/sci_park/config',// 香港科技园 SCP
                    SCENE_XGPARK: 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace', // 香港科技园 场景
                    SCP_PIPELINE : 'https://www.supermapol.com/realspace/services/3D-pipeline_s3m/rest/realspace/datas/NetWork@Pipe3D/config', //管线 SCP 失效
                    SCP_HISTOGRAM1 : 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_3000_5000/config', //
                    SCP_HISTOGRAM2 : 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_10000_max/config', //
                    SCP_HISTOGRAM3 : 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_min_1000/config', //
                    SCP_HISTOGRAM4 : 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_5000_10000/config',//
                    SCP_HISTOGRAM5 : 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_1000_3000/config', //
                    SCENE_HISTOGRAM: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace',
                    SCENE_CBD : 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace', // CBD场景
                    // SCENE_WebGLCBD : 'http://www.supermapol.com/realspace/services/3D-CBDCache20200416/rest/realspace',   // 新CBD场景
                    SCP_FCFH_QX: 'http://www.supermapol.com/realspace/services/3D-FCFH_Shangdong/rest/realspace/datas/config/config', //分层分户倾斜摄影图层
                    SCP_FCFH_VECTOR_EXTRUDE: 'http://www.supermapol.com/realspace/services/3D-individualHouse/rest/realspace/datas/%E4%B8%93%E9%A2%98%E6%88%B7%E5%9E%8B%E9%9D%A2_%E6%8B%89%E4%BC%B8/config', // 分层分户侧面拉伸数据
                    SCP_FCFH_DATA: 'http://www.supermapol.com/realspace/services/data-FCFH_Shangdong/rest/data', //分层分户数据服务
                    SCP_WORLD_COUNTRY_VECTOR: 'http://www.supermapol.com/realspace/services/3D-Countries-World2/rest/realspace/datas/Countries_1@World/config', // 全球国家边界线的矢量
                    SCP_WORLD_COUNTRY_VECTOR2: ' http://www.supermapol.com/realspace/services/3D-ShiJieGuoJiaBianJie/rest/realspace',  // 全球国家边界线的矢量2
                    SCENE_POLYLINEGROW_BUINDINGS: 'http://www.supermapol.com/realspace/services/3D-buildings1122/rest/realspace', // 光晕效果线数据,
                    SCENE_TISHUJU: 'http://www.supermapol.com/realspace/services/3D-tishuju/rest/realspace', // 体数据场景
                    SCENE_GTC_UINSIDE:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%86%85%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config',//u型BIM室内
                    SCENE_GTC_UOUTSIDE:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%A4%96%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config',//u型BIM室外
                    SCENE_GTC_UWINDOW:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/U%E5%9E%8B%E5%BB%BA%E7%AD%91%E7%AA%97@%E5%AE%A4%E5%86%85/config',//u型BIM窗
                    SCENE_GTC_WALL9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前墙
                    SCENE_GTC_WINDOW9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前窗
                    SCENE_GTC_WINDOW9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%BB%93%E6%9E%84%E5%9F%BA%E7%A1%80@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前结构
                    SCENE_GTC_WINDOW9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E9%97%A8@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前门
                    SCENE_GTC_WINDOW9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前楼板
                    SCENE_GTC_FLOOR9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E5%B1%82@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼楼层
                    SCENE_GTC_LWINDOW9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低窗
                    SCENE_GTC_LWALL9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低墙
                    SCENE_GTC_LB9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低楼板
                    SCENE_GTC_UNIT9:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%90%8E@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//合并九号楼
                    SCENE_GTC_BUILDIBG:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/building_udb@building/config',//building_udb@building
                    SCENE_GTC_HILL:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%B1%B1/config',//山
                    SCENE_GTC_GROUND:'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%9C%B0%E9%9D%A2/config',//地面
                    SCENE_MODELUPDATE:'http://www.supermapol.com/realspace/services/3D-MoXingGengXin/rest/realspace',//建筑分析区白模数据
                    SCENE_CLIP:'http://www.supermapol.com/realspace/services/3D-clip_fengbian/rest/realspace',//裁剪封边数据
                    TOKEN_TIANDITU: '4a00a1dc5387b8ed8adba3374bd87e5e', // 天地图token
                    SCENE_FEATUREVALUE:'http://www.supermapol.com/realspace/services/3D-featureValue_building9/rest/realspace/datas/%E4%B9%9D%E5%8F%B7@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//带特征值的九号楼缓存
                    SCENE_OLYMPIC_NIGHT:'http://www.supermapol.com/realspace/services/3D-OlympicGreenNight/rest/realspace',//鸟巢夜景
                    SCENE_CHONGQING_TX:'http://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace',//重庆白模，特效用
                    SCENE_VOLUME_NEAREST:'http://www.supermapol.com/realspace/services/3D-compare/rest/realspace',//临近采样模式白模数据
                    SCENE_SICHUAN: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace',
                    SCENE_MOVINGLIGHT: 'http://www.supermapol.com/realspace/services/3D-BIMMoXing/rest/realspace',
                    SCENE_CIATDT:'https://www.supermapol.com/proxy/swdm/wtfs',
                    SCENE_RBBM:'http://www.supermapol.com/realspace/services/3D-XinBaiMo/rest/realspace', //日本白模
                    SCENE_SUPERMAPONLINETERRAIN:'https://maptiles.supermapol.com/iserver/services/3D-local3DCache-GlobalTIN30M/rest/realspace/datas/Global_TIN_30M',
                    SCENE_ANIMATION:'http://www.supermapol.com/realspace/services/3D-BIM-new/rest/realspace',  //图层动画
                    SCENE_DRAWER:'http://www.supermapol.com/realspace/services/3D-HeBing8HaoLou/rest/realspace',  //抽屉效果
                    OLYMPIC_PLAN:'http://www.supermapol.com/realspace/services/3D-OlympicGreen_Plan/rest/realspace',//奥林匹克 平面场景
                    SCENE_XGPARK_LT:'http://www.supermapol.com/realspace/services/3D-KeJiYuan/rest/realspace',//香港科技园（连通性淹没分析场景）
                    SCENE_CHONGQING_MH:'http://www.supermapol.com/realspace/services/3D-CQBaiMoMeiHua/rest/realspace',//重庆白模，美化用
                    SCENE_CHONGQING_MH_N:'http://www.supermapol.com/realspace/services/3D-CQBaiMoMeiHuaYeJing/rest/realspace',//重庆白模，美化用_夜景
                    SCENE_CBD_RIAN_SNOW:'http://www.supermapol.com/realspace/services/3D-building11640-CBDGuoMaoShuJu_1/rest/realspace',//CBD雨雪场景
                    SCENE_BIM_EXPLODE:'http://www.supermapol.com/realspace/services/3D-BIMBaoZha/rest/realspace',//模型爆炸场景

                };
                // eslint-disable-next-line
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZTQzM2RhYy1mZDk0LTQxYjEtOThjOC03YzZmNDJkMWRiZDEiLCJpZCI6OTc4MjksImlhdCI6MTY1NTM3Mjc2Nn0.9JHtCNtdz93qO4L0LVeVMAsPrd0LFMEqaOuCxRavl0M';
                viewer = new Cesium.Viewer("cesiumContainer", {
                    // infoBox: false, // 是否显示点击元素之后显示的信息
                    // animation: false, // 是否显示动画空间
                    // fullscreenButton: false, // 是否显示全屏按钮
                    // geocoder: false, // 是否显示地名查找控件
                    // homeButton: false, // 是否显示home键
                    // navigationHelpButton: false, // 是否显示帮助信息控件
                    // sceneModePicker: false, // 是否显示投影方式
                    // timeline: false, // 是否显示时间线控件
                    // baseLayerPicker: false, // 是否显示图层选择控件
                    // selectionIndicator: false, // 是否显示指示器组件
                    // terrainProvider: Cesium.createWorldTerrain(),
                }); // eslint-disable-line
                viewer._cesiumWidget._innerCreditContainer.style.display = 'none'; // 去除logo信息


                //初始化天地图全球中文注记服务，并添加至影像图层
                // <option selected value="CIA_C">全球中文注记服务（经纬度投影）</option>
                // <option value="IMG_C">全球影像地图服务(经纬度)</option>
                // <option value="VEC_W">全球矢量地图服务(墨卡托)</option>
                // <option value="TER_W">全球地形晕渲服务(墨卡托)</option>
                // <option value="IMG_W">全球影像地图服务(墨卡托)</option>
                // <option value="VEC_C">全球矢量地图服务(经纬度)</option>
                // <option value="TER_C">全球地形晕渲服务(经纬度)</option>
                var labelImagery = new Cesium.TiandituImageryProvider({
                    mapStyle : Cesium.TiandituMapsStyle.IMG_C, //天地图全球中文注记服务（经纬度投影）
                    token: 'ca17d672cc66d91dfc701d51d732f11f'
                });
                viewer.imageryLayers.addImageryProvider(labelImagery);

                var terrainProvider = Cesium.createWorldTerrain();
                var positions = [
                    Cesium.Cartographic.fromDegrees(110.34, 39.01),
                    // Cesium.Cartographic.fromDegrees(87.0, 28.0)
                ];
                var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);

                Cesium.when(promise, (layer) => {

                    //   初始化场景位置
                    // setTimeout(() => {
                        viewer.scene.camera.setView({
                            // 初始化相机经纬度
                            destination: new Cesium.Cartesian3.fromDegrees(
                                // 121.54035,
                                // 38.92146,
                                110.34, 39.01,
                                25000
                            ),
                            orientation: {
                                heading: Cesium.Math.toRadians(0.0),
                                pitch: Cesium.Math.toRadians(-85.0), //从上往下看为-90
                                roll: 0,
                            },
                        });
                    // }, 500)

                    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                    handler.setInputAction((e) => {
                        var pick = viewer.scene.pick(e.position);
                        console.log(e, pick);
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                    this.addBillboard();
                    this.addPolyline();
                    this.addPolygon();
                    this.addEntityRectangle()

                }, function () {
                    var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                    widget.showErrorPanel(title, undefined, e);
                });
            },
            clickEvent() {
                // 监听地图点击事件
                const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
                // 点击事件
                handler.setInputAction((click) => {
                    // 获取地图上的点位实体(entity)坐标
                    const pick = viewer.scene.pick(click.position);
                    // 如果pick不是undefined，那么就是点到点位了
                    if (pick && pick.id && pick.id.id.includes('point_icon')) {
                        if(pick.id.id === 'point_icon_to3d') {
                            this.$router.push('/picture-3d')
                        } else {
                            this.left = click.position.x
                            this.top = click.position.y
                            this.infoData = pick.id.data
                        }
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            },
            // 添加图标
            addBillboard() {
                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(110.42, 39.01, 30),
                    billboard: {
                        image: require("@/assets/图标.png"), // default: undefined
                        // show: true, // default
                        // pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
                        // eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                        // horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
                        // verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                        // scale: 2.0, // default: 1.0
                        // color: Cesium.Color.LIME, // default: WHITE
                        // rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
                        // alignedAxis: Cesium.Cartesian3.ZERO, // default
                        // width: 100, // default: undefined
                        // height: 25, // default: undefined
                    },
                });
            },
            // 绘制发光线条
            addPolyline() {
                viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            110.424575,
                            39.026131,
                            110.427579,
                            39.02543,
                            110.421784,
                            39.024578,
                            110.423973,
                            39.024144,
                            110.425947,
                            39.023944,
                        ]),
                        width: 4,
                        material: Cesium.Color.DARKORANGE.withAlpha(0.3),
                        // clampToGround: true,
                        // show: true,
                    },
                });
                viewer.entities.add({
                    // name:entity.name,
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            110.424575,
                            39.026131,
                            110.427579,
                            39.02543,
                            110.421784,
                            39.024578,
                            110.423973,
                            39.024144,
                            110.425947,
                            39.023944,
                        ]),
                        width: 4, // 线的宽度，像素为单位
                        material: new Cesium.PolylineTrailMaterialProperty({
                            // 尾迹线材质
                            color: Cesium.Color.GOLD,
                            trailLength: 0.4,
                            period: 3.0,
                        }),
                        // clampToGround: true,
                        // show: true,
                    },
                });
            },
            // 绘制面
            addPolygon() {
                viewer.entities.add({
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray([
                            110.424575,
                            39.026131,
                            110.427579,
                            39.02543,
                            110.421784,
                            39.024578,
                            110.423973,
                            39.024144,
                        ]),
                        extrudedHeight: 50,
                        material: Cesium.Color.WHITESMOKE,
                        // closeTop: false,
                        // closeBottom: false,
                    },
                });
            },
            /**
             * 添加entity-rectangle
             * 添加矩形实体
             * **/
            addEntityRectangle() {
                let entityRectangle = new Cesium.Entity({
                    id: 'entityRectangle0',
                    name: 'entityRectangle',
                    rectangle: {
                        coordinates: Cesium.Rectangle.fromDegrees(110.2, 39.0, 110.4, 39.1), // west, south, east, north
                        // material: Cesium.Color.PURPLE.withAlpha(0.6),
                        material: require("@/assets/绿色区域2.png")
                        // outline: true, // height must be set for outline to display
                        // outlineColor: Cesium.Color.RED,
                        // extrudedHeight: 10000,
                    }
                })
                let rectangleGeom = viewer.entities.add(entityRectangle)
                viewer.zoomTo(rectangleGeom)
            },
            /**
             * 添加 entity-polylineVolm
             * 类似管装线实体
             * **/
            addEntityPloylineVolum() {
                viewer.entities.add({
                    name: 'CYAN dashed line',
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            110.336565, 38.982306, 110.333054, 39.001458, 110.332916, 38.991096, 110.325323, 39.011703, 110.336565, 38.982306
                        ]),
                        width: 4,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.fromCssColorString('#ac2640'),
                        }),
                    },
                })
            },
            /**
             * 添加 entity-polygon
             * 面实体, 可以在面中挖空
             * **/
            addEntityPolygon() {
                let entityPolygon = new Cesium.Entity({
                    id: 'entityPolygon0',
                    name: 'entityPolygon',
                    polygon: {
                        hierarchy: {
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                110.0, 39.0, 110.3, 39.3, 110.5, 39.6, 110.8, 39.3, 110.9, 110.0
                            ])
                        },
                        material: Cesium.Color.YELLOWGREEN,
                        extrudedHeight: 30
                        // closeTop: false,
                        // closeBottom: false,
                    }
                })
                let polygonGeom = viewer.entities.add(entityPolygon)
                viewer.zoomTo(entityPolygon)
            },
        },
    };
    /* eslint-disable */
</script>

<style lang="scss" scoped>
</style>
