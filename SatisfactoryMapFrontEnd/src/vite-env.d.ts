/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_APP_API_URL: string
  readonly VITE_MINIO_BUCKET_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
