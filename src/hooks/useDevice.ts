import { EDeviceDetect } from '@/constants/DeviceDetect';
import { isBrowser } from '@/utils/CommonUtil';

interface IHookResult {
    breakPoint: EDeviceDetect;
}

export const useDeviceDetect = (): IHookResult => {
    if (!isBrowser()) {
        return { breakPoint: EDeviceDetect.xl };
    }

    const innerWidth = window.innerWidth;
    if (innerWidth <= 480) {
        return { breakPoint: EDeviceDetect.sm };
    }
    if (innerWidth <= 640) {
        return { breakPoint: EDeviceDetect.sm };
    }
    if (innerWidth <= 768) {
        return { breakPoint: EDeviceDetect.md };
    }
    if (innerWidth <= 1024) {
        return { breakPoint: EDeviceDetect.lg };
    }

    return { breakPoint: EDeviceDetect.xl };
};
