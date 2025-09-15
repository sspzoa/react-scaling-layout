import React, { type ReactNode } from "react";
interface ScalingContextType {
    windowWidth: number;
    windowHeight: number;
    scale: number;
    scaledVh: (vh: number) => number;
}
export declare const useScaling: () => ScalingContextType;
interface ScalingLayoutProps {
    children: ReactNode;
    minWidth?: number;
    className?: string;
    disableScalingAboveMinWidth?: boolean;
    maxScale?: number;
    scaleStep?: number;
}
export default function ScalingLayout({ children, minWidth, className, disableScalingAboveMinWidth, maxScale, scaleStep, }: ScalingLayoutProps): React.JSX.Element | null;
export {};
