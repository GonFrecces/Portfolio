/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubActions && repositoryName ? `/${repositoryName}` : "",
  assetPrefix: isGitHubActions && repositoryName ? `/${repositoryName}/` : "",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
