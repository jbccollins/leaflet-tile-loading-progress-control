# leaflet-tile-loading-progress-control
A leaflet control that indicates tile loading progress for a group of tile layers. This can be useful when you have a lot of tile layers or tiles that frequently refresh.

[![NPM](https://img.shields.io/npm/v/leaflet-tile-loading-progress-control.svg)](https://www.npmjs.com/package/leaflet-tile-loading-progress-control)

My particualar use case was for a looping precipitation radar that was built using ten tile layers that each needed to be updated every five minutes. Zooming and panning the map causes a lot of tile requests to be sent out. These can take a second to load and in the meantime I didn't want the end user to think the map was breaking.

# Usage
```javascript
import 'leaflet-tile-loading-progress-control';
import 'leaflet-tile-loading-progress-control/dist/Control.TileLoadingProgress.css';

const tileLayer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
const tileLayer2 = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png');

const tileLayers = L.layerGroup([tileLayer1, tileLayer2]);

const tileLoadingProgress = new L.Control.TileLoadingProgress({
    leafletElt: tileLayers,
    position: 'bottomleft'
});
tileLoadingProgress.addTo(map);
```

## Options

| Option          |  Type            | Description |
| --------------- | ---------------- | ----------------- |
| `leafletElt`       | Leaflet LayerGroup          | Group of tile layers tracked by the loading progress control. |

# Example GIF
from https://us-weather-monitor.herokuapp.com/

![Example Gif](https://media.giphy.com/media/j1mFgcasIcQaInbwuE/giphy.gif)
