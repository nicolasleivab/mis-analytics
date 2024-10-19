# MIS-Analytics

Analytics tool for generating insights from Medical Image Segmentation data.


# client container

```
docker build -f infrastructure/Dockerfile -t mis-analytics-react-app .
docker run -p 3000:3000 mis-analytics-react-app
```

# client local dev server

```
npm install && npm run dev
```
