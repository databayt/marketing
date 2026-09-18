#!/usr/bin/env bash
# marketing (databayt.org) → Cloudflare Containers. Builds the Next standalone server on
# the Mac, wraps it in a COPY-only linux/amd64 image, smokes it locally, deploys it behind
# the Worker in cf/worker.js. Same lane as hogwarts, mkan and kun.
#
#   scripts/deploy-cloudflare.sh <env-file> build|smoke|deploy|all
#
# <env-file>  a dotenv with the PRODUCTION values (vercel env pull). Non-secret vars are
#             baked into the image as env.json; secrets go to the Worker as secrets.
# build       export the source, install, next build (standalone) with CF_CONTAINER=1
# smoke       docker build (linux/amd64) + run on :3400, print the curl table and peak memory
# deploy      wrangler deploy from the build dir (builds + pushes the image, needs Workers Paid)
#
# CF_SOURCE=<ref>|head|worktree  what to build (default head, now that the CF lane is committed;
#                                use worktree to build uncommitted changes).
# CF_BUILD_DIR, CF_HEAP_MB (3072), NEXT_BUILD_CPUS (2): this 16 GB machine OOM-kills bigger
#             builds when other sessions are resident.
set -euo pipefail
cd "$(dirname "$0")/.."
ENV_FILE=${1:?dotenv with production values}; MODE=${2:-all}
ENV_FILE=$(cd "$(dirname "$ENV_FILE")" && pwd)/$(basename "$ENV_FILE")
BUILD_DIR=${CF_BUILD_DIR:-${TMPDIR:-/tmp}/marketing-cf-build}
IMAGE=marketing-cf:local

build() {
  local SOURCE=${CF_SOURCE:-head}
  rm -rf "$BUILD_DIR"; mkdir -p "$BUILD_DIR"
  if [[ "$SOURCE" == "worktree" ]]; then
    echo "==> copying the WORKING TREE ($(git rev-parse --short HEAD) + uncommitted changes) to $BUILD_DIR"
    rsync -a --exclude node_modules --exclude .next --exclude .vercel --exclude .wrangler \
      --exclude .git --exclude coverage ./ "$BUILD_DIR/" \
      || { rc=$?; [[ $rc == 23 || $rc == 24 ]] && echo "    (rsync $rc: files changed under us; continuing)" || exit $rc; }
  else
    local REF=$SOURCE; [[ "$REF" == "head" ]] && REF=HEAD
    echo "==> exporting $REF ($(git rev-parse --short "$REF")) to $BUILD_DIR"
    git archive "$REF" | tar -x -C "$BUILD_DIR"
  fi
  cd "$BUILD_DIR"

  echo "==> installing (postinstall: prisma generate)"
  pnpm install --frozen-lockfile --prefer-offline --silent

  echo "==> next build (standalone) with $ENV_FILE"
  export CF_CONTAINER=1 NODE_OPTIONS="--max-old-space-size=${CF_HEAP_MB:-3072}" NEXT_TELEMETRY_DISABLED=1 NEXT_BUILD_CPUS=${NEXT_BUILD_CPUS:-2}
  node cf/env-split.mjs "$ENV_FILE" run -- pnpm exec next build
  [[ -f .next/standalone/server.js ]] || { echo "ABORT: .next/standalone/server.js missing"; exit 1; }

  echo "==> assembling: baked non-secret config"
  node cf/env-split.mjs "$ENV_FILE" config > .next/standalone/env.json
  echo "    env.json: $(node -e 'console.log(Object.keys(require("./.next/standalone/env.json")).length)') config vars"
  du -sh .next/standalone .next/static public | sed 's/^/    /'
}

smoke() {
  cd "$BUILD_DIR"
  date -u +%FT%TZ > .cf-deploy-stamp
  echo "==> docker build (linux/amd64, COPY-only)"
  docker build --platform linux/amd64 -f Dockerfile.cf -t "$IMAGE" . 2>&1 | tail -3
  local DENV; DENV=$(mktemp -t marketing-smoke.XXXXXX); trap 'rm -f "$DENV"' RETURN
  node cf/env-split.mjs "$ENV_FILE" docker > "$DENV"
  docker rm -f marketing-cf-smoke >/dev/null 2>&1 || true
  echo "==> docker run :3400"
  docker run -d --rm --name marketing-cf-smoke --platform linux/amd64 -p 3400:3000 --memory 1g --env-file "$DENV" "$IMAGE" >/dev/null
  local i
  for i in $(seq 1 90); do curl -sf -o /dev/null "http://localhost:3400/" && break; sleep 2; done
  echo "    boot: ${i}x2s"
  for p in / /en /ar /en/pricing /en/login /api/admin; do
    printf "    %-24s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url} %{time_total}s' "http://localhost:3400$p")"
  done
  printf "    %-24s %s\n" "Host databayt.org /" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' -H 'Host: databayt.org' http://localhost:3400/)"
  echo "==> memory after the probes: $(docker stats --no-stream --format '{{.MemUsage}} ({{.MemPerc}})' marketing-cf-smoke)"
  echo "==> container log tail"; docker logs --tail 15 marketing-cf-smoke 2>&1 | sed 's/^/    /'
  docker stop marketing-cf-smoke >/dev/null
}

deploy() {
  cd "$BUILD_DIR"
  # A byte-identical image does not restart the running container, so Worker vars and
  # secrets pushed since the last deploy would never reach it. The stamp is the image's
  # last (tiny) layer: every deploy is a new image, and the instance restarts with the
  # current env.
  date -u +%FT%TZ > .cf-deploy-stamp
  echo "==> pushing secrets to the Worker"
  node cf/env-split.mjs "$ENV_FILE" secrets | pnpm exec wrangler secret bulk
  echo "==> wrangler deploy (builds + pushes the image; needs Workers Paid; stamp $(cat .cf-deploy-stamp))"
  pnpm exec wrangler deploy
}

case "$MODE" in
  build) build ;;
  smoke) smoke ;;
  deploy) deploy ;;
  all) build; smoke; deploy ;;
  *) echo "mode must be build|smoke|deploy|all"; exit 2 ;;
esac
echo "==> done ($MODE)"
