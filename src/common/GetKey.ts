const fs = require('fs');

export const privateKey = fs.readFileSync('private.key');
export const publicKey = fs.readFileSync('public.key');
