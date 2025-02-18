import { RefObject } from "react"

const qrDownload = (ref: RefObject<HTMLCanvasElement | null>) => {
    const canvas = ref.current
    const pngUrl = canvas?.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl as string;
    a.download = 'qrcode.png';
    a.click();
}
export default qrDownload