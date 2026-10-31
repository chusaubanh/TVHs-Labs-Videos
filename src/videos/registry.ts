import type React from "react";
import { SmokeScene } from "../fixtures/SmokeScene";
import * as B1 from "./bai-1/part1";
import * as B2 from "./bai-1/part2";
import * as B3 from "./bai-1/part3";
import * as C1 from "./bai-2/part1";
import * as C2 from "./bai-2/part2";
import { BucTranhDoi, DaoNguoc, Hook, LoiHua, VongLapCu } from "./mo-dau/part1";
import { Cach1, Cach2, ThanhPham } from "./mo-dau/part2";
import { ChanChamDat, ChotVongLap, Ket, Viec1, Viec2, Viec3 } from "./mo-dau/part3";

/**
 * Cảnh riêng của từng video, khoá theo `component` trong kịch bản, dạng "<video>/<cảnh>".
 * Không tạo cảnh dùng chung cho nhiều video: mỗi video đặt cảnh trong `src/videos/<video>/`.
 */
export const SCENES: Record<string, React.FC> = {
  "fixture/smoke": SmokeScene,
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
};
