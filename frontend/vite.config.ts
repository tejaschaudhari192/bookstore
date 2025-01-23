import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { createSNICallback } from 'anchor-pki/auto-cert/sni-callback'
import { TermsOfServiceAcceptor } from 'anchor-pki/auto-cert/terms-of-service-acceptor'

import fs from 'fs';
import path from 'path';

// const SNICallback = createSNICallback({
//     name: 'sni-callback',
//     tosAcceptors: TermsOfServiceAcceptor.createAny(),
//     cacheDir: 'tmp/acme'
// });

// https://vite.dev/config/
export default defineConfig({
    // server: {
    //     port: process.env.HTTPS_PORT,

    //     https: {
    //         SNICallback
    //     }
    // },
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'certs/bookstore-privateKey.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/bookstore.crt')),
        },
    },
    plugins: [react()],
})

