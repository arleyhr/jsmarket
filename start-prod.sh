#!/bin/bash

# Start the API
node dist/apps/api/main.js &

# Start the frontend (using serve to serve static files)
npx serve dist/apps/web -s -l 4200 &

# Keep container running
wait
