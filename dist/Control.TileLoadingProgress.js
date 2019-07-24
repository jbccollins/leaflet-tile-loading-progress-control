/* @preserve
 * Leaflet Control TileLoadingProgress 1.0.2
 * https://github.com/jbccollins/leaflet-tile-loading-progress-control
 *
 * Copyright (c) 2018 James Collins
 * All rights reserved.
 */

this.L = this.L || {};
this.L.Control = this.L.Control || {};
this.L.Control.TileLoadingProgress = (function (L) {
    'use strict';

    L = L && L.hasOwnProperty('default') ? L['default'] : L;

    var Control = {
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
                var container = L.DomUtil.create('div', 'leaflet-control-progress-bar');
                var loadingContainer = L.DomUtil.create('div', 'loading-container');
                var loadingBackground = L.DomUtil.create('div', 'loading-background');
                var loadingForeground = L.DomUtil.create('div', 'loading-foreground');
                var loadingText = L.DomUtil.create('div', 'loading-text');
                loadingContainer.appendChild(loadingBackground);
                loadingContainer.appendChild(loadingForeground);
                container.appendChild(loadingContainer);
                container.appendChild(loadingText);
                for (var key in this.options.leafletElt._layers) {
                    this.addLayer(this.options.leafletElt._layers[key]);
                }
                this.loadingForegroundElt = loadingForeground;
                this.container = container;
                this.loadingText = loadingText;
                return container;
            },
            onRemove: function (map) {
                // when removed
            },
            addLayer(layer) {
                if (!this.options.leafletElt.hasLayer(layer)) {
                    this.options.leafletElt.addLayer(layer);
                }
                layer.on('tileloadstart', this.handleTileLoadStart);
                layer.on('tileunload', this.handleTileUnload);
                layer.on('tileload', this.handleTileLoad);
                layer.on('loading', this.handleLayerLoading);
                layer.on('tileerror', this.handleTileError);
                layer.on('load', this.handleLayerLoad);
            },
            handleLoadingStatusUpdate: function () {
                var status = null;
                var status = {
                    loading: 0,
                    loaded: 0
                };
                for (var key in this.options.leafletElt._layers) {
                    var layer = this.options.leafletElt._layers[key];
                    var layerStatus = this.getTileStatusCounts(layer);
                    status.loading += layerStatus.loading;
                    status.loaded += layerStatus.loaded;
                }
                var numTiles = status.loading + status.loaded;
                var w = numTiles ? status.loaded / numTiles : 0;
                var percent = w * 100;
                this.loadingForegroundElt.style.width = percent + "%";
                if (w === 1) {
                    this.container.style.opacity = 0;
                } else {
                    this.container.style.opacity = 1;
                }
                this.loadingText.innerHTML = "Loading Tiles (" + Math.floor(percent) + "%)";
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
                };
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

    var TileLoadingProgress = L.Util.extend(Control.class, {});

    L.Util.extend(L.Control, {
      TileLoadingProgress: TileLoadingProgress,
      tileLoadingProgress: Control.factory
    });

    return TileLoadingProgress;

}(L));
//# sourceMappingURL=Control.TileLoadingProgress.js.map
