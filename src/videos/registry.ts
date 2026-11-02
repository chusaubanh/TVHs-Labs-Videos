import type React from "react";
import { SmokeScene } from "../fixtures/SmokeScene";
import { CacBuoc } from "./mau/cac-buoc";
import * as B1 from "./bai-1/part1";
import * as B2 from "./bai-1/part2";
import * as B3 from "./bai-1/part3";
import * as C1 from "./bai-2/part1";
import * as C2 from "./bai-2/part2";
import * as K1 from "./cdkh/phan-1";
import * as K2 from "./cdkh/phan-2";
import * as K3 from "./cdkh/phan-3";
import * as F1 from "./fb-ads/phan-1";
import * as F2 from "./fb-ads/phan-2";
import * as F3 from "./fb-ads/phan-3";
import { BucTranhDoi, DaoNguoc, Hook, LoiHua, VongLapCu } from "./mo-dau/part1";
import { Cach1, Cach2, ThanhPham } from "./mo-dau/part2";
import { ChanChamDat, ChotVongLap, Ket, Viec1, Viec2, Viec3 } from "./mo-dau/part3";
import * as PC1 from "./tro-ly-phap-che/scenes-part1";
import * as PC2 from "./tro-ly-phap-che/scenes-part2";
import * as PC3 from "./tro-ly-phap-che/scenes-part3";

/**
 * Cảnh riêng của từng video, khoá theo `component` trong kịch bản, dạng "<video>/<cảnh>".
 * Không tạo cảnh dùng chung cho nhiều video: mỗi video đặt cảnh trong `src/videos/<video>/`.
 */
export const SCENES: Record<string, React.FC> = {
  "fixture/smoke": SmokeScene,
  "mau/cac-buoc": CacBuoc,
  "mo-dau/hook": Hook,
  "mo-dau/vong-lap-cu": VongLapCu,
  "mo-dau/dao-nguoc": DaoNguoc,
  "mo-dau/loi-hua": LoiHua,
  "mo-dau/buc-tranh-doi": BucTranhDoi,
  "mo-dau/cach-1": Cach1,
  "mo-dau/cach-2": Cach2,
  "mo-dau/thanh-pham": ThanhPham,
  "mo-dau/viec-1": Viec1,
  "mo-dau/viec-2": Viec2,
  "mo-dau/viec-3": Viec3,
  "mo-dau/chan-cham-dat": ChanChamDat,
  "mo-dau/chot-vong-lap": ChotVongLap,
  "mo-dau/ket": Ket,
  "bai-1/hook": B1.Hook,
  "bai-1/nguoc-doi": B1.NguocDoi,
  "bai-1/phan-xa": B1.PhanXa,
  "bai-1/thuc-tap-sinh": B1.ThucTapSinh,
  "bai-1/ai-la-ban-ay": B1.AiLaBanAy,
  "bai-1/vi-sao-bia": B2.ViSaoBia,
  "bai-1/to-noi-quy": B2.ToNoiQuy,
  "bai-1/file-quy-tac": B2.FileQuyTac,
  "bai-1/cang-cu-the": B2.CangCuThe,
  "bai-1/khong-co-nut": B2.KhongCoNut,
  "bai-1/mo-thu-muc": B2.MoThuMuc,
  "bai-1/viec-hom-nay": B3.ViecHomNay,
  "bai-1/go-thu": B3.GoThu,
  "bai-1/ket": B3.Ket,
  "bai-2/hook": C1.Hook,
  "bai-2/tinh-huong": C1.TinhHuong,
  "bai-2/tin-nhan": C1.TinNhan,
  "bai-2/thu-pham": C1.ThuPham,
  "bai-2/ban-do": C1.BanDo,
  "bai-2/hai-vung": C1.HaiVung,
  "bai-2/ba-moc": C1.BaMoc,
  "bai-2/ky-thuat-1": C2.KyThuat1,
  "bai-2/danh-sach-mu": C2.DanhSachMu,
  "bai-2/ky-thuat-2": C2.KyThuat2,
  "bai-2/ky-thuat-3": C2.KyThuat3,
  "bai-2/viec-hom-nay": C2.ViecHomNay,
  "bai-2/huong-dan": C2.HuongDan,
  "bai-2/ket": C2.Ket,
  "fb-1/hook": F1.Hook,
  "fb-1/ba-tang": F1.BaTang,
  "fb-1/vi-sao": F1.ViSao,
  "fb-1/campaign": F1.Campaign,
  "fb-1/sau-muc-tieu": F1.SauMucTieu,
  "fb-1/khoa": F1.Khoa,
  "fb-1/tom-lai": F1.TomLai,
  "fb-1/ket": F1.Ket,
  "fb-2/hook": F2.Hook,
  "fb-2/ad-set": F2.AdSet,
  "fb-2/ad": F2.AdScene,
  "fb-2/creator": F2.Creator,
  "fb-2/pixel": F2.Pixel,
  "fb-2/vi-sao-pixel": F2.ViSaoPixel,
  "fb-2/tom-lai": F2.TomLai,
  "fb-2/ket": F2.Ket,
  "fb-3/hook": F3.Hook,
  "fb-3/ba-manager": F3.BaManager,
  "fb-3/nam-khu-vuc": F3.NamKhuVuc,
  "fb-3/cot-chi-so": F3.CotChiSo,
  "fb-3/vong": F3.Vong,
  "fb-3/may-hoc": F3.MayHoc,
  "fb-3/san-sang": F3.SanSang,
  "fb-3/ket": F3.Ket,
  "cdkh-1/mo-dau": K1.MoDau,
  "cdkh-1/khai-niem": K1.KhaiNiem,
  "cdkh-1/vi-sao": K1.ViSao,
  "cdkh-1/ba-nhom": K1.BaNhom,
  "cdkh-1/tuoi": K1.Tuoi,
  "cdkh-1/thu-nhap": K1.ThuNhap,
  "cdkh-1/tam-ly": K1.TamLy,
  "cdkh-1/tan-suat": K1.TanSuat,
  "cdkh-1/kenh": K1.Kenh,
  "cdkh-1/thuc-day": K1.ThucDay,
  "cdkh-1/tam-quan-trong": K1.TamQuanTrong,
  "cdkh-1/diem-can-nho": K1.DiemCanNho,
  "cdkh-1/ket": K1.Ket,
  "cdkh-2/mo-dau": K2.MoDau,
  "cdkh-2/fb-hanh-vi": K2.FbHanhVi,
  "cdkh-2/fb-toi-uu": K2.FbToiUu,
  "cdkh-2/tt-hanh-vi": K2.TtHanhVi,
  "cdkh-2/tt-toi-uu": K2.TtToiUu,
  "cdkh-2/gg-hanh-vi": K2.GgHanhVi,
  "cdkh-2/gg-toi-uu": K2.GgToiUu,
  "cdkh-2/diem-can-nho": K2.DiemCanNho,
  "cdkh-2/ket": K2.Ket,
  "cdkh-3/mo-dau": K3.MoDau,
  "cdkh-3/nguyen-tac": K3.NguyenTac,
  "cdkh-3/fb-chi-so": K3.FbChiSo,
  "cdkh-3/fb-cong-cu": K3.FbCongCu,
  "cdkh-3/tiktok": K3.TikTok,
  "cdkh-3/google": K3.Google,
  "cdkh-3/diem-can-nho": K3.DiemCanNho,
  "cdkh-3/ket": K3.Ket,
  "tro-ly-phap-che/gioi-thieu": PC1.GioiThieu,
  "tro-ly-phap-che/chuan-bi": PC1.ChuanBi,
  "tro-ly-phap-che/khoi-tao-project": PC1.KhoiTaoProject,
  "tro-ly-phap-che/kiem-tra-dieu-kien": PC1.KiemTraDieuKien,
  "tro-ly-phap-che/giao-yeu-cau": PC2.GiaoYeuCau,
  "tro-ly-phap-che/tram-dung-1": PC2.TramDung1,
  "tro-ly-phap-che/huong-dan-tai": PC2.HuongDanTai,
  "tro-ly-phap-che/luu-tay-van-ban": PC2.LuuTayVanBan,
  "tro-ly-phap-che/xuat-excel-kiem-tra": PC3.XuatExcelKiemTra,
  "tro-ly-phap-che/tram-dung-2": PC3.TramDung2,
  "tro-ly-phap-che/nguyen-tac-3d": PC3.NguyenTac3D,
  "tro-ly-phap-che/dong-bo-va-tra-kho": PC3.DongBoVaTraKho,
  "tro-ly-phap-che/xu-ly-su-co-va-ket": PC3.XuLySuCoVaKet,
};
