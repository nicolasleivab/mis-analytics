# MIS-Analytics

Analytics tool for generating insights from Medical Image Segmentation data.

# client container

Build and run container:

```
docker build -f infrastructure/Dockerfile -t mis-analytics-react-app .
docker run -d -p 3000:80 mis-analytics-react-app
```

# client local dev server

Setup nvm for using the node versio needed for this project.

```
nvm install && nvm use
```

Install dependencies and start a dev local server.

```
npm install && npm run dev
```
