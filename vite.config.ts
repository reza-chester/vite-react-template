import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const appDepoPath = 'C:/inetpub/wwwroot/StrategyAppDepo'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, 
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: 'redux-vendor',
              test: /node_modules[\\/](@reduxjs|react-redux|redux)/,
              priority: 15,
            },
            {
              name: 'ui-vendor',
              test: /node_modules[\\/](@headlessui|@heroicons|@mui)/,
              priority: 15,
            },
            {
              name: 'query-vendor',
              test: /node_modules[\\/]@tanstack[\\/]react-query/,
              priority: 15,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10,
            },
            {
              name: 'common',
              minShareCount: 2,
              minSize: 10000,
              priority: 5,
            },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    

    {
      name: 'serve-app-depo',

      configureServer(server) {
        server.middlewares.use('/AppDepo', (req, res, next) => {
          const relativePath = decodeURIComponent(
            req.url?.split('?')[0]?.replace(/^\/+/, '') ?? ''
          )
      
          const filePath = path.join(
            appDepoPath,
            relativePath
          )
      
          if (!fs.existsSync(filePath)) {
            next()
            return
          }
      
          const stat = fs.statSync(filePath)
      
          if (!stat.isFile()) {
            next()
            return
          }
      
          const ext = path.extname(filePath).toLowerCase()
      
          const contentTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
      
            '.pdf': 'application/pdf',
      
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.mov': 'video/quicktime',
      
            '.txt': 'text/plain',
            '.json': 'application/json',
          }
      
          const contentType =
            contentTypes[ext] ?? 'application/octet-stream'
      
          const fileSize = stat.size
      
          res.setHeader('Content-Type', contentType)
          res.setHeader('Accept-Ranges', 'bytes')
      
          const range = req.headers.range
      
          if (!range) {
            res.statusCode = 200
            res.setHeader('Content-Length', fileSize)
      
            fs.createReadStream(filePath).pipe(res)
      
            return
          }
      
          const match = range.match(/bytes=(\d*)-(\d*)/)
      
          if (!match) {
            res.statusCode = 416
            res.setHeader('Content-Range', `bytes */${fileSize}`)
            res.end()
            return
          }
      
          const start = match[1]
            ? parseInt(match[1], 10)
            : 0
      
          const end = match[2]
            ? parseInt(match[2], 10)
            : fileSize - 1
      
          if (
            start >= fileSize ||
            end >= fileSize ||
            start > end
          ) {
            res.statusCode = 416
            res.setHeader('Content-Range', `bytes */${fileSize}`)
            res.end()
            return
          }
      
          const chunkSize = end - start + 1
      
          res.statusCode = 206
      
          res.setHeader(
            'Content-Range',
            `bytes ${start}-${end}/${fileSize}`
          )
      
          res.setHeader('Content-Length', chunkSize)
      
          const stream = fs.createReadStream(filePath, {
            start,
            end,
          })
      
          stream.on('error', () => {
            if (!res.headersSent) {
              res.statusCode = 500
            }
      
            res.end()
          })
      
          stream.pipe(res)
        })
      }
    },
  ],
})