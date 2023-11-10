import { VcReadyObject } from "vue-cesium/es/utils/types";

export type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";


export interface ILayer {
    type: "geojson" | "raster" | "3dtiles",

    /**
     * 资源路径
     */
    url: string

    /**
     * 加载完成执行
     * @param vcReadyObj
     */
    ready?(vcReadyObj: VcReadyObject): void
}

export interface IGeoJsonLayer extends ILayer {
    type: "geojson",
    clampToGround?: boolean,
}

export interface IRasterLayer extends ILayer {
    type: "raster"
}

export interface I3dtilesLayer extends ILayer {
    type: "3dtiles"
}

export type IAnyLayer = IGeoJsonLayer | IRasterLayer | I3dtilesLayer