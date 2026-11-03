import * as PC1 from "../tro-ly-phap-che/scenes-part1";
import * as PC2 from "../tro-ly-phap-che/scenes-part2";
import * as PC3 from "../tro-ly-phap-che/scenes-part3";
import { withCaptions } from "./kit";

/** Cảnh của video cũ, lời và nhãn giữ nguyên; chỉ bọc thêm phụ đề, không sửa file gốc. */
export const KiemTraDieuKien = withCaptions(PC1.KiemTraDieuKien);
export const TramDung1 = withCaptions(PC2.TramDung1);
export const XuatExcelKiemTra = withCaptions(PC3.XuatExcelKiemTra);
export const TramDung2 = withCaptions(PC3.TramDung2);
export const NguyenTac3D = withCaptions(PC3.NguyenTac3D);
export const DongBoVaTraKho = withCaptions(PC3.DongBoVaTraKho);
export const XuLySuCoVaKet = withCaptions(PC3.XuLySuCoVaKet);
