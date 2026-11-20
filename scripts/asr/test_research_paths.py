"""Kiểm đường dẫn Python đồng nhất với chính sách TypeScript, không nạp GPU/model."""
import json
import tempfile
import unittest
from pathlib import Path
from research_paths import research_repo


class ResearchPathsTest(unittest.TestCase):
    def test_precedence_and_fallback(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            external, override = root / "nguon", root / "ghi-de"
            (external / "anime").mkdir(parents=True)
            (override / "anime").mkdir(parents=True)
            (root / ".research" / "repos" / "gsap").mkdir(parents=True)
            (root / "research-repos.local.json").write_text(json.dumps({"root": "nguon"}), encoding="utf-8")
            self.assertEqual(research_repo("anime", root, {}), external / "anime")
            self.assertEqual(research_repo("anime", root, {"TVHS_RESEARCH_ROOT": str(override)}), override / "anime")
            self.assertEqual(research_repo("gsap", root, {}), root / ".research" / "repos" / "gsap")
            self.assertEqual(research_repo("missing", root, {}), external / "missing")

    def test_invalid_name_and_config(self):
        with tempfile.TemporaryDirectory() as d:
            for name in ["../secret", "..", ".", "x/y", "x\\y", "C:repo", ""]:
                with self.assertRaises(ValueError):
                    research_repo(name, d, {})
            (Path(d) / "research-repos.local.json").write_text('{"root":3}', encoding="utf-8")
            with self.assertRaises(ValueError):
                research_repo("anime", d, {})


if __name__ == "__main__":
    unittest.main()