import { animate } from "motion";
import { Howl } from "howler";
import { ALL_FORMATS, BlobSource, Input, CanvasSink } from "mediabunny";

/** Chỉ dùng trong giao diện, không tham gia đồng hồ của video xuất. */
export function reveal(element) {
  if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  return animate(element, { opacity: [0.6, 1], y: [3, 0] }, { duration: 0.16 });
}

export function createSoundPreview() {
  let sound = null, current = null;
  function stop() { const old = sound; sound = null; current = null; if (old) { old.stop(); old.unload(); } }
  function play(url, onEnd, onError) {
    stop();
    const mine = new Howl({ src: [url], html5: true, preload: true,
      onend: () => { if (sound === mine) { stop(); onEnd?.(url); } },
      onloaderror: (_id, error) => { if (sound === mine) { stop(); onError?.(String(error)); } },
      onplayerror: (_id, error) => { if (sound === mine) { stop(); onError?.(String(error)); } },
    });
    sound = mine; current = url; mine.play(); return mine;
  }
  return { play, stop, current: () => current, dispose: stop };
}

/** Đọc trực tiếp File của người dùng; không gửi nội dung file lên server. */
export async function inspectMedia(file, { thumbnail = true } = {}) {
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  try {
    const duration = await input.computeDuration();
    const video = await input.getPrimaryVideoTrack();
    const audio = await input.getPrimaryAudioTrack();
    let poster = null;
    if (video && thumbnail && await video.canDecode()) {
      const sink = new CanvasSink(video, { width: 480, fit: "contain" });
      const frame = await sink.getCanvas(Math.min(0.5, Math.max(0, duration / 2)));
      if (frame) poster = frame.canvas.toDataURL("image/jpeg", 0.8);
    }
    return { name: file.name, bytes: file.size, duration,
      video: video ? { codec: await video.getCodec(), width: await video.getDisplayWidth(), height: await video.getDisplayHeight() } : null,
      audio: audio ? { codec: await audio.getCodec(), channels: await audio.getNumberOfChannels(), sampleRate: await audio.getSampleRate() } : null,
      poster };
  } finally { input.dispose(); }
}

/** Cả Editor và ứng dụng dùng cùng hộp kiểm tra media. */
export function mountMediaInspector(button) {
  const picker = document.createElement("input"); picker.type = "file"; picker.accept = "video/*,audio/*"; picker.hidden = true;
  const dialog = document.createElement("dialog"); dialog.style.cssText = "max-width:560px;width:85vw;background:#17191d;color:#eee;border:1px solid #666;border-radius:12px;padding:24px;font:15px system-ui";
  const title = document.createElement("h2"); title.textContent = "Kiểm tra media";
  const status = document.createElement("p"), image = document.createElement("img"), close = document.createElement("button");
  image.style.cssText = "max-width:100%;border-radius:6px"; close.textContent = "Đóng"; close.onclick = () => dialog.close();
  const listen = document.createElement("button"); listen.textContent = "Nghe thử"; listen.hidden = true; listen.style.marginRight = "12px";
  const audio = createSoundPreview(); let objectUrl = null;
  const stopAudio = () => { audio.stop(); listen.textContent = "Nghe thử"; if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = null; };
  listen.onclick = () => { if (audio.current()) { audio.stop(); listen.textContent = "Nghe thử"; } else if (objectUrl) { listen.textContent = "Dừng"; audio.play(objectUrl, () => { listen.textContent = "Nghe thử"; }, (error) => { status.textContent = error; listen.textContent = "Nghe thử"; }); } };
  dialog.append(title, status, image, listen, close); document.body.append(picker, dialog);
  let sequence = 0;
  button.addEventListener("click", () => { picker.value = ""; picker.click(); });
  picker.addEventListener("change", async () => {
    const file = picker.files?.[0]; if (!file) return;
    stopAudio(); listen.hidden = true;
    const mine = ++sequence; image.hidden = true; status.textContent = "Đang đọc thông tin…";
    if (!dialog.open) dialog.showModal(); reveal(dialog);
    try {
      const meta = await inspectMedia(file); if (mine !== sequence) return;
      status.textContent = `${meta.name} · ${meta.duration.toFixed(2)} giây · ${(meta.bytes / 1048576).toFixed(1)} MB` +
        (meta.video ? ` · ${meta.video.width} × ${meta.video.height} · ${meta.video.codec}` : "") +
        (meta.audio ? ` · ${meta.audio.channels} kênh âm thanh` : "");
      if (meta.audio) { objectUrl = URL.createObjectURL(file); listen.hidden = false; }
      image.hidden = !meta.poster; if (meta.poster) image.src = meta.poster;
    } catch (error) { if (mine === sequence) status.textContent = `Không đọc được media: ${error.message}`; }
  });
  dialog.addEventListener("close", () => { sequence++; stopAudio(); image.removeAttribute("src"); });
  return () => { sequence++; stopAudio(); picker.remove(); dialog.remove(); };
}