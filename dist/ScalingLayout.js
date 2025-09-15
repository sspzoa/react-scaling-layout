"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScaling = void 0;
exports.default = ScalingLayout;
const react_1 = __importStar(require("react"));
const ScalingContext = (0, react_1.createContext)({
    windowWidth: 0,
    windowHeight: 0,
    scale: 1,
    scaledVh: (vh) => vh,
});
const useScaling = () => (0, react_1.useContext)(ScalingContext);
exports.useScaling = useScaling;
function ScalingLayout({ children, minWidth = 768, className = "", disableScalingAboveMinWidth = true, maxScale = 1, scaleStep = 0.01, }) {
    const [dimensions, setDimensions] = (0, react_1.useState)({
        width: 0,
        height: 0,
    });
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setMounted(true);
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        updateDimensions();
        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(document.documentElement);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const scale = (0, react_1.useMemo)(() => {
        if (dimensions.width === 0)
            return 1;
        let newScale;
        if (dimensions.width < minWidth) {
            newScale = Math.max(dimensions.width / minWidth, 0.1);
        }
        else if (disableScalingAboveMinWidth) {
            newScale = 1;
        }
        else {
            newScale = Math.min(dimensions.width / minWidth, maxScale);
        }
        return Math.round(newScale / scaleStep) * scaleStep;
    }, [
        dimensions.width,
        minWidth,
        disableScalingAboveMinWidth,
        maxScale,
        scaleStep,
    ]);
    const scaledVh = (0, react_1.useMemo)(() => {
        return (vh) => {
            const pixelValue = (dimensions.height * vh) / 100;
            return pixelValue / scale;
        };
    }, [dimensions.height, scale]);
    const contextValue = (0, react_1.useMemo)(() => ({
        windowWidth: dimensions.width,
        windowHeight: dimensions.height,
        scale,
        scaledVh,
    }), [dimensions.width, dimensions.height, scale, scaledVh]);
    if (!mounted) {
        return null;
    }
    const scaleStyle = {
        "--scale": scale,
        "--inverse-scale": 1 / scale,
    };
    return (react_1.default.createElement(ScalingContext.Provider, { value: contextValue },
        react_1.default.createElement("div", { style: Object.assign(Object.assign({}, scaleStyle), { transformOrigin: "left top", transform: "scale(var(--scale))", width: "calc(100% * var(--inverse-scale))", height: "100dvh", position: "relative" }), className: className }, children)));
}
