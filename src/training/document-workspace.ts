import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { basename, extname, isAbsolute, join, relative, resolve, sep } from "node:path";

const SUPPORTED_EXTENSIONS = new Set([".md", ".txt"]);

export interface DocumentWorkspace {
  documentName: string;
  inputPath: string;
  outputDir: string;
  scriptPath: string;
  legacyOutputDir?: string;
}

function isSupportedFile(path: string): boolean {
  return (
    existsSync(path) &&
    statSync(path).isFile() &&
    SUPPORTED_EXTENSIONS.has(extname(path).toLowerCase())
  );
}

function findDocumentInDirectory(directory: string): string | null {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) return null;

  const directoryName = basename(directory);
  for (const extension of [".md", ".txt"]) {
    const preferred = join(directory, `${directoryName}${extension}`);
    if (isSupportedFile(preferred)) return preferred;
  }

  const files = readdirSync(directory)
    .map((name) => join(directory, name))
    .filter(isSupportedFile)
    .sort((left, right) => left.localeCompare(right, "vi"));
  if (files.length === 1) return files[0];
  if (files.length > 1) {
    throw new Error(
      `Document folder "${directory}" contains multiple .md/.txt files. ` +
      `Name the primary file after the folder or pass its exact path.`,
    );
  }
  return null;
}

export function safeDocumentFolderName(value: string): string {
  const safe = value
    .normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/[. ]+$/g, "")
    .trim()
    .slice(0, 100);
  return safe || "Tài liệu";
}

/** Chỉ dẫn local cho dự án đã chuyển thư mục. Giữ kho media của ID cũ. */
function routedWorkspace(cwd: string, input: string, source?: string): DocumentWorkspace | undefined {
  const root = resolve(cwd, "output");
  const config = join(root, ".document-routes.json");
  if (!existsSync(config)) return;
  const key = (value: string) => process.platform === "win32" ? value.toLowerCase() : value;
  const routes = JSON.parse(readFileSync(config, "utf8")) as Record<string, string>;
  for (const [legacy, target] of Object.entries(routes)) {
    const outputDir = resolve(root, target);
    const legacyOutputDir = resolve(root, legacy);
    if (![outputDir, legacyOutputDir].every((path) => key(path).startsWith(key(root + sep)))) {
      throw new Error("Đường dẫn dự án đã chuyển phải nằm trong output.");
    }
    const alias = !isAbsolute(input) && [legacyOutputDir, outputDir].some((path) => key(resolve(root, input)) === key(path));
    if (!alias && !source) continue;
    const refPath = join(outputDir, "source-reference.json");
    if (!existsSync(refPath)) continue;
    const reference = JSON.parse(readFileSync(refPath, "utf8")) as { path: string };
    const inputPath = resolve(cwd, reference.path);
    if (!alias && key(source!) !== key(inputPath)) continue;
    if (!isSupportedFile(inputPath)) throw new Error(`Không tìm thấy tài liệu nguồn: ${inputPath}`);
    return {
      documentName: basename(inputPath, extname(inputPath)),
      inputPath,
      outputDir,
      scriptPath: join(outputDir, "script.json"),
      legacyOutputDir,
    };
  }
}
export function resolveDocumentWorkspace(
  input: string,
  cwd = process.cwd(),
): DocumentWorkspace {
  const routedAlias = routedWorkspace(cwd, input);
  if (routedAlias) return routedAlias;
  const inputRoot = resolve(cwd, "input");
  const directPath = resolve(cwd, input);
  const inputFolderPath = resolve(inputRoot, input);
  const candidates: string[] = [];

  if (isSupportedFile(directPath)) {
    candidates.push(directPath);
  } else {
    const directDirectoryFile = findDocumentInDirectory(directPath);
    if (directDirectoryFile) candidates.push(directDirectoryFile);
  }

  if (candidates.length === 0 && isSupportedFile(inputFolderPath)) {
    candidates.push(inputFolderPath);
  }
  if (candidates.length === 0) {
    const inputDirectoryFile = findDocumentInDirectory(inputFolderPath);
    if (inputDirectoryFile) candidates.push(inputDirectoryFile);
  }
  if (candidates.length === 0 && extname(input) === "") {
    for (const extension of [".md", ".txt"]) {
      const candidate = `${inputFolderPath}${extension}`;
      if (isSupportedFile(candidate)) candidates.push(candidate);
    }
  }

  const inputPath = candidates[0];
  if (!inputPath) {
    throw new Error(
      `Could not find document "${input}". Expected input/<document>/<document>.md ` +
      `or input/<document>/<document>.txt.`,
    );
  }

  const routedSource = routedWorkspace(cwd, input, inputPath);
  if (routedSource) return routedSource;
  const relativeToInput = relative(inputRoot, inputPath);
  const pathParts = relativeToInput.split(/[\\/]/).filter(Boolean);
  const isUnderInput = !relativeToInput.startsWith("..") && pathParts.length >= 2;
  const folderSegments = isUnderInput
    ? pathParts.slice(0, -1)
    : [basename(inputPath, extname(inputPath))];
  const documentName = isUnderInput
    ? folderSegments.join(" / ")
    : basename(inputPath, extname(inputPath));
  const outputDir = resolve(cwd, "output", ...folderSegments.map(safeDocumentFolderName));

  return {
    documentName,
    inputPath,
    outputDir,
    scriptPath: join(outputDir, "script.json"),
  };
}
