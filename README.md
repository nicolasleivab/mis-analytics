# DISCLAIMER

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. Please refer to the full [MIT License](https://github.com/nicolasleivab/mis-analytics/blob/main/LICENSE) for details on the terms and conditions.

# MIS-Analytics

Analytics tool for generating insights from Medical Image Segmentation data.

# client container

Build and run container:

```
docker build -f infrastructure/Dockerfile -t mis-analytics-react-app .
docker run -d -p 4000:80 mis-analytics-react-app
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
