#!/bin/bash
set -euo pipefail

cd apply_label
ncc build index.js --license licenses.txt
cd ..

cd triage_project
ncc build index.js --license licenses.txt
cd ..

