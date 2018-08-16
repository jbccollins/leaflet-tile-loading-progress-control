import L from 'leaflet';
export default {
    class: L.Control.extend({
        options: {
            leafletElt: null,
            position: 'topright'
        },
        initialize: function (options) {
            // constructor
            this.handleLoadingStatusUpdate = this.handleLoadingStatusUpdate.bind(this);
            this.handleTileLoadStart = this.handleTileLoadStart.bind(this);
            this.handleTileUnload = this.handleTileUnload.bind(this);
            this.handleTileLoad = this.handleTileLoad.bind(this);
            this.handleLayerLoading = this.handleLayerLoading.bind(this);
            this.handleTileError = this.handleTileError.bind(this);
            this.handleLayerLoad = this.handleLayerLoad.bind(this);
            this.getTileStatusCounts = this.getTileStatusCounts.bind(this);
            L.Util.setOptions(this, options);
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control-progress-bar loading-container');
            var loadingBackground = L.DomUtil.create('div', 'loading-background');
            var loadingForeground = L.DomUtil.create('div', 'loading-foreground');
            container.appendChild(loadingBackground);
            container.appendChild(loadingForeground);
            for (var key in this.options.leafletElt._layers) {
            var layer = this.options.leafletElt._layers[key];
            layer.on('tileloadstart', this.handleTileLoadStart);
            layer.on('tileunload', this.handleTileUnload);
            layer.on('tileload', this.handleTileLoad);
            layer.on('loading', this.handleLayerLoading);
            layer.on('tileerror', this.handleTileError);
            layer.on('load', this.handleLayerLoad);
            }
            this.loadingForegroundElt = loadingForeground;
            return container;
        },
        onRemove: function (map) {
            // when removed
        },
        handleLoadingStatusUpdate: function () {
            var status = null;
            var status = {
            loading: 0,
            loaded: 0
            }
            for (var key in this.options.leafletElt._layers) {
            var layer = this.options.leafletElt._layers[key];
            var layerStatus = this.getTileStatusCounts(layer);
            status.loading += layerStatus.loading;
            status.loaded += layerStatus.loaded;
            }
            var numTiles = status.loading + status.loaded;
            var w = numTiles ? status.loaded / numTiles : 0; 
            this.loadingForegroundElt.style.width = (w * 100) + "%";
        },
        handleLayerLoading: function (e) {
            this.handleLoadingStatusUpdate();
        },
        handleTileLoadStart: function (e) {
            this.handleLoadingStatusUpdate();
        },
        handleTileLoad: function (e) {
            this.handleLoadingStatusUpdate();
        },
        handleTileError: function (e) {
            this.handleLoadingStatusUpdate();
        },
        handleTileUnload: function (e) {
            this.handleLoadingStatusUpdate();
        },
        handleLayerLoad: function (e) {
            //console.log('loaded');
        },
        getTileStatusCounts: function (l) {
            var status = {
            loaded: 0,
            loading: 0,
            }
                for (var key in l._tiles) {
            if (l._tiles[key].loaded) {
                status.loaded++;
            } else {
                status.loading++;
            }
                }
                return status;
        }
    }),
    factory: function(options) {
        return new L.Control.TileLoadingProgress(options);
    }
};