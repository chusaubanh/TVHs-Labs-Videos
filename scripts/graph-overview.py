# Bản xem tổng quan nhẹ của bản đồ Graphify: mỗi cụm là một chấm (graphify-out/graph-overview.html).
# Chạy qua `npm run graph`, sau `graphify update .`.
import collections
import json
from pathlib import Path

import networkx as nx
from graphify.export import to_html

g = json.loads(Path("graphify-out/graph.json").read_text(encoding="utf-8"))
G = nx.Graph()
for n in g["nodes"]:
    G.add_node(n["id"], **n)
for e in g.get("links") or g["edges"]:
    G.add_edge(e["source"], e["target"])
communities, labels = collections.defaultdict(list), {}
for n in g["nodes"]:
    c = int(n["community"])
    communities[c].append(n["id"])
    labels[c] = n.get("community_name") or f"Community {c}"
# node_limit nhỏ hơn số node để graphify dựng bản gộp theo cụm
to_html(G, dict(communities), "graphify-out/graph-overview.html", community_labels=labels, node_limit=300)
