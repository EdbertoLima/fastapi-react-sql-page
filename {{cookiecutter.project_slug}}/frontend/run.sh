#!/usr/bin/env bash
set -e

case "$1" in
  start|dev)
    # run Vite dev server
    npm run dev
    ;;
  build)
    npm run build
    ;;
  preview)
    npm run preview
    ;;
  lint)
    npm run lint
    ;;
  format)
    npm run format
    ;;
  *)
    npm run "$@"
    ;;
esac
