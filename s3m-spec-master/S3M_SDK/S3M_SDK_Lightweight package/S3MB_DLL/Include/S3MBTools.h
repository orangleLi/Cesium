#include <fstream>
#include <iostream>
#include "MemoryStream.h"
#include <map>
#include "Skeleton.h"
#include "Material.h"
#include "JsonParser.h"
#include "Shell.h"
#include "Texture.h"



using namespace std;

namespace S3MB
{
#define S3MB_ID												        U("id")
#define S3MB_TEXTURE_URL							                U("url")//?????ļ?
#define S3MB_TEXTURE_U								                U("u")
#define S3MB_TEXTURE_V								                U("v")
#define S3MB_TEXTURE_W								                U("w")

#define S3MB_MATERIALS												U("materials")
#define S3MB_MATERIAL												U("material")
#define S3MB_MATERIAL_AMBIENT									    U("ambient")
#define S3MB_MATERIAL_DIFFUSE									    U("diffuse")
#define S3MB_MATERIAL_SPECULAR								        U("specular")
#define S3MB_MATERIAL_SHINESS									    U("shininess")

#define S3MB_MATPASS_CULLMODE								        U("cullMode")
#define S3MB_MATPASS_CULLMODE_NONE					                U("none")
#define S3MB_MATPASS_CULLMODE_C							            U("clockwise")
#define S3MB_MATPASS_CULLMODE_CC							        U("counterClockwise")

#define S3MB_MATERIAL_TRANSPARENTSORT					            U("transparentsorting")
#define S3MB_MATERIAL_TEXTUNITS								        U("textureunitstates")
#define S3MB_MATERIAL_TEXTUNIT									    U("textureunitstate")
#define S3MB_MATERIAL_TEXTUNIT_ADDMODE				                U("addressmode")
#define S3MB_MATERIAL_TEXTUNIT_FILTEROPTION			                U("filteringoption")
#define S3MB_MATERIAL_TEXTUNIT_FILTERMIN			                U("filtermin")
#define S3MB_MATERIAL_TEXTUNIT_FILTERMAX				            U("filtermax")
#define S3MB_MATERIAL_TEXTUNIT_TEXMODMATRIX		                    U("texmodmatrix")

#define S3MB_MATERIAL_PBRTYPE_MR							        U("pbrMetallicRoughness")
#define S3MB_MATERIAL_PBRTYPE_SG								    U("pbrSpecularGlossiness")
#define S3MB_MATERIAL_PBR_EMISSIVEFACTOR				            U("emissiveFactor") //Vector3d
#define S3MB_MATERIAL_PBR_EMISSIVETEXTURE			                U("emissiveTexture")//wstring
#define S3MB_MATERIAL_PBR_NORMALTEXTURE				                U("normalTexture")//wstring
#define S3MB_MATERIAL_PBR_OCCLUSIONTEXTURE		                    U("occlusionTexture")//wstring
#define S3MB_MATERIAL_PBR_BASECOLOR					                U("baseColor")//Vector4d
#define S3MB_MATERIAL_PBR_BASECOLORTEXTURE		                    U("baseColorTexture")//wstring
#define S3MB_MATERIAL_PBR_ALPHAMODE					                U("alphaMode")//enum AlphaMode
#define S3MB_MATERIAL_PBR_ALPHAMODE_OPAQUE		                    U("opaque")
#define S3MB_MATERIAL_PBR_ALPHAMODE_MASK		                    U("mask" )
#define S3MB_MATERIAL_PBR_ALPHAMODE_BLEND		                    U("blend")
#define S3MB_MATERIAL_PBR_ALPHACUTOFF				                U("alphaCutoff")//float


//UGPBRParameter
#define S3MB_MATERIAL_PBR_EMISSIVETEXTUREINDEX						U("emissiveTextureIndex")//UGint
#define S3MB_MATERIAL_PBR_EMISSIVETEXTURECOORDINDEX					U("emissiveTextureCoordIndex")//UGint
#define S3MB_MATERIAL_PBR_EMISSIVETEXTUREMOTION						U("emissiveTextureMotion")
#define S3MB_MATERIAL_PBR_NORMALTEXTUREINDEX						U("normalTextureIndex")//UGint
#define S3MB_MATERIAL_PBR_NORMALTEXTURECOORDINDEX					U("normalTextureCoordIndex")//UGint
#define S3MB_MATERIAL_PBR_NORMALTEXTURESCALE						U("normalTextureScale")//UGfloat
#define S3MB_MATERIAL_PBR_OCCLUSIONTEXTUREINDEX						U("occlusionTextureIndex")//UGint
#define S3MB_MATERIAL_PBR_OCCLUSIONTEXTURECOORDINDEX				U("occlusionTextureCoordIndex")//UGint
#define S3MB_MATERIAL_PBR_OCCLUSIONTEXTURESTRENGTH					U("occlusionTextureStrength")//UGfloat
//UGPBRMetallicRough
#define S3MB_MATERIAL_PBRM_BASECOLOR								U("baseColor")//Vector4d
#define S3MB_MATERIAL_PBRM_BASECOLORTEXTUREINDEX					U("baseColorTextureIndex")//int
#define S3MB_MATERIAL_PBRM_BASECOLORTEXTURECOORDINDEX				U("baseColorTextureCoordIndex")//int
#define S3MB_MATERIAL_PBRM_BASECOLORTEXTUREMOTION					U("baseColorTextureMotion")
#define S3MB_MATERIAL_PBRM_METALLICROUGHNESSTEXTUREINDEX			U("metallicRoughnessTextureIndex")//int
#define S3MB_MATERIAL_PBRM_METALLICROUGHNESSTEXTURECOORDINDEX		U("metallicRoughnessTextureCoordIndex")//int

#define S3MB_MATERIAL_PBRM_ROUGHNESSTEXTURE			                U("metallicRohnessTexture")//wstring
#define S3MB_MATERIAL_PBRM_METALLICFACTOR					        U("metallicFactor")//float
#define S3MB_MATERIAL_PBRM_ROUGHNESSFACTOR				            U("roughnessFactor")//float
//PBRSpecularGlossy
#define S3MB_MATERIAL_PBRS_DIFFUSEFACTOR						    U("diffuseFactor")//Vector4d
#define S3MB_MATERIAL_PBRS_SPECULARFACTOR					        U("specularFactor")//Vector3d
#define S3MB_MATERIAL_PBRS_GLOSSINESSFACTOR				            U("glossinessFactor")//float
#define S3MB_MATERIAL_PBRS_DIFFUSETEXTURE					        U("diffuseTexture")//wstring
#define S3MB_MATERIAL_PBRS_SPECULARGLOSSINESSTEXTURE	            U("specularGlossinessTexture")//wstring
//
#define S3MB_MATERIAL_SHADERNAME_VERTEX								U("vertexShaderName")
#define S3MB_MATERIAL_SHADERNAME_FRAGMENT							U("fragmentShaderName")

#define S3M_S3MB_VERSIONV1		1.0
#define S3M_S3MB_VERSIONV2		2.0
//! \brief Return the maximum of a or b
#define MAX(a,b) (((a)>(b))?(a):(b))

//! \brief Return the minimum of a or b
#define MIN(a,b) (((a)>(b))?(b):(a))

	enum S3MBVertexOptions
	{
		SVO_HasInstSelInfo = 1,		//??ʵ?????洢??Ϣ
	};
	struct  SelectInfo
	{
		int m_nVertexColorCount;
		int m_nVertexColorOffset;
		SelectInfo()
		{
			m_nVertexColorCount = 0;
			m_nVertexColorOffset = 0;
		}
	};

	struct BatchSelAndVertexColor
	{
		//mesh?е?ʵ????first??ʵ????selectionID, second??ʵ??????
		std::map<unsigned int, std::vector<unsigned short>> mapInstanceIdVec;
		//ʵ??ID??ԭʼ?Ķ?????ɫ??map
		std::map<unsigned int, unsigned int> mapInstanceColor;
	};

	class S3MB_API S3MBTools
	{
	public:
		enum S3MBVertexTag
		{
			SV_Unkown = 0,			//δ֪
			SV_Standard = 1,			//????????
			SV_Compressed = 2,		//??ѹ????
		};
		//??4λ?洢RGBA
		static unsigned int RGBA(unsigned char r, unsigned char g, unsigned char b, unsigned char a);
		//??һ????ֵ???Ƶ?һ????Χ??. 
		template <typename T>
		static T Clamp(T val, T minval, T maxval);
		//????S3MB?ļ???
		static bool LoadStreamDataFromFile(ifstream& fileStream, MemoryStream& streamUnZipped, MemoryStream& streamShell, MemoryStream& streamSkeleton, \
			MemoryStream& streamSecondColor, MemoryStream& streamTexture, MemoryStream& streamSelInfo, wstring& strJsonMaterials);
		static bool LoadStreamDataFromFileV2(ifstream& fileStream, MemoryStream& streamUnZipped, MemoryStream& streamShell, MemoryStream& streamSkeleton, \
			MemoryStream& streamSecondColor, MemoryStream& streamTexture, MemoryStream& streamSelInfo, wstring& strJsonMaterials);
		//????S3MB??????
		static bool LoadStreamDataFromStream(MemoryStream& dataStream, MemoryStream& streamUnZipped, MemoryStream& streamShell, MemoryStream& streamSkeleton, 
			MemoryStream& streamSecondColor, MemoryStream& streamTexture, MemoryStream& streamSelInfo, wstring& strJsonMaterials);
		static bool LoadStreamDataFromStreamV2(MemoryStream& dataStream, MemoryStream& streamUnZipped, MemoryStream& streamShell, MemoryStream& streamSkeleton, 
			MemoryStream& streamSecondColor, MemoryStream& streamTexture, MemoryStream& streamSelInfo, wstring& strJsonMaterials);
		//??ѹS3MB?ļ??????ͷ?ѹ?????ڴ?
		static bool UnZipData(MemoryStream& streamUnZipped, unsigned char*& pZippedData, unsigned int nZippedSize);
		static bool UnZipData(MemoryStream& streamUnzipped, unsigned int& nUnZipSize, unsigned char*& pZippedData, unsigned int& nZippedSize);
		static bool UnZip(unsigned char *pvDestBuffer, unsigned int &dwDestLen, const unsigned char *pvSrcBuffer, unsigned int dwSrcLen);
		static void LoadStream(MemoryStream& streamSrc, MemoryStream& streamDst);


		//???عǼ???Ϣ
		static void LoadSkeleton(MemoryStream& streamSkeleton, std::map<wstring, Geometry*>& mapGeometry);
		static bool LoadSkeletonData(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage, vector<IndexPackage*>& arrIndexPackage);
		//?ֽڶ???
		//isRead ָʾ?Ƿ?Ϊ??ȡ??
		static void StreamAlign(MemoryStream& stream, bool isRead);
		//???ض?????Ϣ
		static bool LoadVertex(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//???ط?????Ϣ
		static bool LoadNormal(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//???ض?????ɫ
		static bool LoadVertexColor(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//???ض????ڶ???ɫ
		static bool LoadSecondVertexColor(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//??????????????Ϣ
		static bool LoadTextureCoords(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage, unsigned short& nTextureCoord);
		//????ʵ??????Ϣ
		static bool LoadInstanceInfo(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage, unsigned short& nTextureCoord);
		//?ж??Ƿ???ʵ???????ζ???
		static bool IsInstanceBatch(VertexDataPackage* pVertexDataPackage);
		//????ѹ????????Ϣ
		static bool LoadCompressVertex(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//??ѹ??ѹ???Ķ?????Ϣ
		static bool DecompressVertex(VertexDataPackage*& pVertexDataPackage);
		//????ѹ????????Ϣ
		static bool LoadCompressNormal(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage);
		//??ѹ??ѹ???ķ?????Ϣ
		static bool DecompressNormal(unsigned int nNormalCount, short* pEncodeNormal, float*& pNormal);
		//????ѹ????????????Ϣ
		static bool LoadCompressTextureCoords(MemoryStream& streamSkeleton, VertexDataPackage*& pVertexDataPackage, unsigned short nTextureCoord);
		//????????ѹ????????????Ϣ
		static bool LoadSingleCompressTextureCoords(MemoryStream& stream, unsigned int nTexIdx, unsigned int nTotalTexCount, VertexDataPackage* pVertexDataPackage);


		//???ز?????Ϣ
		static void LoadMaterial(wstring strJsonMaterials, std::map<wstring, Material*>& mapMaterial,float fVersion);
		//ͨ??Json???ز?????Ϣ
		static void LoadMatFromJson(JsonValue& jsonMaterial, wstring& strMaterialName, Technique* pTechnique,float fVersion);
		static void LoadMatFromJsonV1(JsonValue& jsonMaterial, wstring& strMaterialName, Technique* pTechnique);
		static void LoadMatFromJsonV2(JsonValue& jsonMaterial, wstring& strMaterialName, Technique* pTechnique);
		//ͨ??Json????PBR??????Ϣ
		static void LoadPBRFromJson(JsonValue& jsonPBR, PBRParams*& pPBR);
		//ͨ??Json??????????Ԫ
		static void LoadTUSFromJson(JsonValue& jsonTexture, TextureUnitState* pTextureUnitState);

		static CullingMode CullModeFromString(wstring strType);

		static PBRParams::AlphaMode AlphaModeFromString(wstring strType);

		static void AddressModeFromJson(JsonValue& jsonAddMode, TextureUnitState* pTextureUnitState);

		//??????????Ϣ
		static void LoadTexture(MemoryStream& streamTexture, std::map<wstring, TextureDataInfo*>& mapTexture);
		static void LoadTextureData(MemoryStream& streamTexture, TextureData* pTextureData);
		static void ProcessTextureData(TextureData* pTextureData, CodecType nCompressType, bool bGenerateMipmap = true);

		//????shell??Ϣ
		static void LoadShell(MemoryStream& streamShell, RenderOperationGroup* pROGroup);
		//! \brief ?ж??Ƿ??ǵ?????Geode??RO??????PagedLODs?¿ɵ???????Geode????ʾ???????²??ڵ㣩
		static bool IsGeodeWithoutChild(MemoryStream& stream);
		static void LoadROGeodeWithoutChild(RenderOperationGroup* pROGroup, RenderOperationGeode* pGeode, MemoryStream& stream);
		static void LoadShellPagedLOD(RenderOperationGroup* pROGroup, RenderOperationPagedLOD* pROPagedLOD, MemoryStream& stream);
		static void LoadShellROGeode(RenderOperationGroup* pROGroup, RenderOperationGeode* pGeode, MemoryStream& stream);

		//????IDInfo
		static void LoadIDInfo(std::map<wstring, Geometry*>& mapGeometry, MemoryStream& streamIDInfo,float fVersion);

		//????shell??Ϣ
		static void SaveShell(RenderOperationGroup* pROGroup, MemoryStream& stream);
		static void SaveShellPagedLOD(RenderOperationPagedLOD* pROPagedLOD, MemoryStream& stream);
		static void SaveShellROGeode(RenderOperationGeode* pROGeode, MemoryStream& stream);

		//?????Ǽ???Ϣ
		static void SaveGeometry(std::map<wstring, Geometry*>& mapSkeleton, MemoryStream& streamGeometry, int vertexCompressOptions = 19);
		//! \brief ?Ǽ????ݱ?????????
		static bool SaveSkeletonData(VertexDataPackage*& pVertexDataPackage, \
			vector<IndexPackage*>& arrIndexPackage, MemoryStream& streamSkeleton, int vertexCompressOptions = 19);
		//???涥????Ϣ
		static bool SaveVertex(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//???淨????Ϣ
		static bool SaveNormal(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//???涥????ɫ
		static bool SaveVertexColor(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//???涥????????Ϣ
		static bool SaveSecondVertexColor(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//????????????
		static bool SaveTextureCoords(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//! \brief ?Ƿ???????????
		static bool IsTexutureCoord(unsigned short nDimesion);
		//! \brief ?Ƿ????????????洢??Wλ
		static bool IsTexutureCoordStoreW(VertexDataPackage* pVertexDataPack, int nTexCoordIndex);
		//! \brief ????ʵ??????Ϣ
		static bool SaveInstanceInfo(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//static bool SaveInstanceInfo(VertexDataPackage* pVertexDataPack, MemoryStream& stream,float versionN);
		//! \brief ????ѹ???Ķ???
		static bool SaveCompressVertex(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//! \brief ??float??ʽ?Ķ???????????ѹ????ѹ????Ϊshort????
		//! \param pValue [in] ????????
		//! \param nVertexCount [in] ????????
		//! \param nSrcDimension [in] ԭʼ?????Ķ???ά??
		//! \param nDstDimension [in] ѹ?????????Ķ???ά??
		//! \param nQuantizationBits [in] ѹ??????ֵռ?ü????ֽڣ????ܳ???16
		//! \param pEncodeValue [out] ????ѹ??????????
		//! \param fNormalConstant [out] ????????ѹ???Ĺ?һ??ϵ??
		//! \param minVal [out] ???????涥????ά????Сֵ??ָ??
		static void RangeEncode(float* pValue, unsigned int nVertexCount, unsigned int nSrcDimension, unsigned int nDstDimension, unsigned int nQuantizationBits, short*& pEncodeValue,
			float& fNormalConstant, float*& minVal);
		//! \brief ???㶥????????????Сֵ
		//! \param pValue [in] ????????
		//! \param nDimension [in] ??????????ά??
		//! \param nVertexCount [in] ????????
		//! \param pOutMin [out] ???????涥????ά????Сֵ??ָ??
		//! \param pOutMax [out] ???????涥????ά??????ֵ??ָ??
		static void ComputeMaxMin(float* pValue, unsigned int nDimension, unsigned int nVertexCount, float* pOutMin, float* pOutMax);
		//! \brief ????ѹ???ķ???
		static bool SaveCompressNormal(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//! \brief ѹ??????
		static bool CompressNormal(unsigned int nNormalCount, float* pNormal, short*& pEncodeNormal);
		//! \brief ????ѹ????????????
		static bool SaveCompressTextureCoords(VertexDataPackage* pVertexDataPack, MemoryStream& stream);
		//! \brief ????ѹ????һ??????????
		static bool SaveOneCompressTextureCoords(VertexDataPackage* pVertexDataPack, MemoryStream& stream, unsigned int nTexIdx);

		//??????????Ϣ
		static void SaveMaterial(std::map<wstring, Material*>& mapMaterial, JsonValue& jsonMaterials, float fVersion);
		static void ToJson(Material* pMaterial, JsonValue& jsonMaterial, float fVersion);
		//! \brief pMaterialתjson??Ϣ
		static void ToJson(const wstring strMaterialName, Technique* pTechnique, JsonValue& jsonContent);
		static void ToJson(const wstring strMaterialName, Technique* pTechnique, JsonValue& jsonContent,float fVersion);
		static wstring MaterialParamTypeToString(MaterialParamType emType);
		static wstring CullModeToString(CullingMode emType);
		//! \brief PRBתjson??Ϣ
		static void ToJson(PBRParams* pPBR, JsonValue& jsonPBR);
		static wstring AlphaModeToString(PBRParams::AlphaMode emType);
		//! \brief pTextureUnitStateתjson??Ϣ
		static void ToJson(TextureUnitState* pTextureUnitState, JsonValue& jsonMaterial);
		static void AddressModeToJson(TextureUnitState* pTextureUnitState, JsonValue& jsonAddMode);

		static void SaveTextures(std::map<wstring, TextureDataInfo*>& mapTexture,MemoryStream& streamTexture,
			unsigned int nCompressType, bool bTextureTransform,bool bGenerateMipmap = true);
		//! \brief ???????ݱ???
		static void SaveTextureData(TextureData* pTextureData, \
			MemoryStream& streamTexture, unsigned int nCompressType, bool bIsChangeTexture = true, bool bGenerateMipmap = true);
		//! \brief ????ѹ??????
		static void ProcessTextureData(TextureData* pTextureData, unsigned int nCompressType, bool bGenerateMipmap = true) 
		{ return ProcessTextureData(pTextureData, (CodecType)nCompressType,bGenerateMipmap); }

		//! \brief ?Ƿ?????????Ϣ
		static bool HasSelectionInfo(VertexDataPackage* pVertexDataPack);
		//! \brief ????SelectionInfo
		static bool SaveSelectionInfo(std::map<wstring, Geometry*>& mapSkeleton, MemoryStream& m_streamSelectionInfo);

		static bool SaveStreamData2File(const wstring strDestFilePath, \
			MemoryStream& streamShell, MemoryStream& streamSkeleton, \
			MemoryStream& streamSecondColor, wstring& strJsonMaterials, \
			MemoryStream& streamTexture, \
			bool bHasSelectionInfo, MemoryStream& streamSelInfo);
		static bool SaveStreamData2FileV2(const wstring strDestFilePath, \
			MemoryStream& streamShell, MemoryStream& streamSkeleton, \
			MemoryStream& streamSecondColor, wstring& strJsonMaterials, \
			MemoryStream& streamTexture, \
			bool bHasSelectionInfo, MemoryStream& streamSelInfo, float fVersion);

		static bool ZipData(unsigned char* pvDestBuffer, unsigned int& dwDestLen,
			const unsigned char* pvSrcBuffer, unsigned int dwSrcLen, int nLevel = 8);
	};

	template <typename T>
	T S3MBTools::Clamp(T val, T minval, T maxval)
	{
		if (minval > maxval)
		{
			T temp = minval;
			minval = maxval;
			maxval = temp;
		}
		return max(min(val, maxval), minval);
	}
}
