import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";
import { TbZoomReplace } from "react-icons/tb";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";

export default function ZoomBtns() {
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const zoomLevelRef = useRef(zoomLevel); // Create a ref to track zoom level

    const updateZoom = async (newZoomLevel) => {
        try {
            const { getCurrentWebview } = await import("@tauri-apps/api/webview");
            await getCurrentWebview().setZoom(newZoomLevel);
            zoomLevelRef.current = newZoomLevel; // Update the ref immediately
            setZoomLevel(newZoomLevel); // Update state (used for re-renders)
        } catch (error) {
            console.error(error);
        }
    };

    const zoomIn = () => {
        const newZoom = zoomLevelRef.current + 0.03; // Use ref for the latest value
        updateZoom(newZoom);
    };

    const zoomOut = () => {
        const newZoom = Math.max(0.03, zoomLevelRef.current - 0.03); // Use ref for the latest value
        updateZoom(newZoom);
    };

    const resetZoom = () => {
        updateZoom(1.0); // Reset to default zoom level
    };

    const handleWheel = (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            if (e.deltaY > 0) {
                zoomOut();
            } else if (e.deltaY < 0) {
                zoomIn();
            }
        }
    };

    const handleKeyDown = (e) => {
        if (
            e.ctrlKey &&
            (e.key === "+" || e.key === "-" || e.code === "Equal" || e.code === "Plus" || e.code === "Minus" || e.key === "0")
        ) {
            e.preventDefault();
            if (e.key === "+" || e.key === "=" || e.code === "Equal" || e.code === "Plus") {
                zoomIn();
            } else if (e.key === "-" || e.code === "Minus") {
                zoomOut();
            } else if (e.key === "0") {
                resetZoom();
            }
        }
    };

    useEffect(() => {
        window?.addEventListener("wheel", handleWheel);
        document?.addEventListener("keydown", handleKeyDown);

        return () => {
            window?.removeEventListener("wheel", handleWheel);
            document?.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex items-center px-3 gap-x-1">
            <Button setFunc={zoomOut} style="py-1.5" title="تصغير">
                <RiZoomOutFill className="size-5" />
            </Button>
            <Button setFunc={resetZoom} style="py-1.5" title="الحجم الطبيعي">
                <TbZoomReplace className="size-5" />
            </Button>
            <Button setFunc={zoomIn} style="py-1.5" title="تكبير">
                <RiZoomInFill className="size-5" />
            </Button>
        </div>
    );
}
