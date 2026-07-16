import {
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

const projectRoot = path.resolve(
  scriptDirectory,
  "..",
);

const designsDirectory = path.join(
  projectRoot,
  "public",
  "images",
  "designs",
);

const metadataPath = path.join(
  projectRoot,
  "src",
  "content",
  "design-metadata.json",
);

const outputPath = path.join(
  projectRoot,
  "src",
  "content",
  "design-works.generated.ts",
);

const supportedExtensions = new Set([
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".avif",
]);

const collator = new Intl.Collator("tr", {
  numeric: true,
  sensitivity: "base",
});

function createId(filename) {
  return path
    .parse(filename)
    .name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createFallbackTitle(filename) {
  const stem = path.parse(filename).name;

  if (/^design[-_\s]*\d+$/i.test(stem)) {
    return "Görsel Tasarım Çalışması";
  }

  const readable = stem
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!readable) {
    return "Görsel Tasarım Çalışması";
  }

  return readable.replace(
    /\b\p{L}/gu,
    (letter) =>
      letter.toLocaleUpperCase("tr-TR"),
  );
}

async function readMetadata() {
  try {
    const raw = await readFile(
      metadataPath,
      "utf8",
    );

    return JSON.parse(raw);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return {};
    }

    throw error;
  }
}

async function readDesignEntries() {
  try {
    return await readdir(designsDirectory, {
      withFileTypes: true,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

async function main() {
  const [entries, metadata] = await Promise.all([
    readDesignEntries(),
    readMetadata(),
  ]);

  const filenames = entries
    .filter((entry) => {
      if (!entry.isFile()) return false;
      if (entry.name.startsWith(".")) {
        return false;
      }

      return supportedExtensions.has(
        path.extname(entry.name).toLowerCase(),
      );
    })
    .map((entry) => entry.name)
    .sort((first, second) =>
      collator.compare(first, second),
    );

  const generatedDesignWorks = filenames.map(
    (filename) => {
      const configured = metadata[filename] ?? {};

      const id =
        configured.id ?? createId(filename);

      const title =
        configured.title ??
        createFallbackTitle(filename);

      return {
        id,
        title,
        category:
          configured.category ??
          "Görsel Tasarım",
        purpose:
          configured.purpose ??
          "Dijital yayın ve görsel iletişim amacıyla hazırlanan portfolyo çalışması.",
        platform:
          configured.platform ??
          "Instagram",
        tools:
          Array.isArray(configured.tools) &&
          configured.tools.length > 0
            ? configured.tools
            : ["Adobe Photoshop", "Canva"],
        image: `/images/designs/${filename}`,
        thumbnail: `/images/designs/${filename}`,
        alt:
          configured.alt ??
          `${title} görsel tasarım çalışması`,
      };
    },
  );

  const generatedSource = `// BU DOSYA OTOMATİK OLUŞTURULUR.
// public/images/designs klasöründeki görseller npm run dev/build öncesinde taranır.
// Başlık ve açıklama özelleştirmeleri için design-metadata.json dosyasını düzenleyin.

export const generatedDesignWorks = ${JSON.stringify(
    generatedDesignWorks,
    null,
    2,
  )} as const;
`;

  await writeFile(
    outputPath,
    generatedSource,
    "utf8",
  );

  console.log(
    `[designs:sync] ${generatedDesignWorks.length} tasarım senkronize edildi.`,
  );
}

main().catch((error) => {
  console.error(
    "[designs:sync] Tasarımlar oluşturulamadı.",
  );
  console.error(error);
  process.exitCode = 1;
});
