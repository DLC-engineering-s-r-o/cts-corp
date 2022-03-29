/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_ID": () => (/* binding */ DEFAULT_ID),
/* harmony export */   "Loader": () => (/* binding */ Loader),
/* harmony export */   "LoaderStatus": () => (/* binding */ LoaderStatus)
/* harmony export */ });
// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, channel, client, id = DEFAULT_ID, libraries = [], language, region, version, mapIds, nonce, retries = 3, url = "https://maps.googleapis.com/maps/api/js", }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.version = version;
        this.apiKey = apiKey;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.libraries = libraries;
        this.language = language;
        this.region = region;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.retries = retries;
        this.url = url;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     */
    createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
            script.nonce = this.nonce;
        }
        document.head.appendChild(script);
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/@googlemaps/markerclusterer/dist/index.esm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractAlgorithm": () => (/* binding */ AbstractAlgorithm),
/* harmony export */   "AbstractViewportAlgorithm": () => (/* binding */ AbstractViewportAlgorithm),
/* harmony export */   "Cluster": () => (/* binding */ Cluster),
/* harmony export */   "ClusterStats": () => (/* binding */ ClusterStats),
/* harmony export */   "DBScanAlgorithm": () => (/* binding */ DBScanAlgorithm),
/* harmony export */   "DefaultRenderer": () => (/* binding */ DefaultRenderer),
/* harmony export */   "GridAlgorithm": () => (/* binding */ GridAlgorithm),
/* harmony export */   "KmeansAlgorithm": () => (/* binding */ KmeansAlgorithm),
/* harmony export */   "MarkerClusterer": () => (/* binding */ MarkerClusterer),
/* harmony export */   "MarkerClustererEvents": () => (/* binding */ MarkerClustererEvents),
/* harmony export */   "NoopAlgorithm": () => (/* binding */ NoopAlgorithm),
/* harmony export */   "SuperClusterAlgorithm": () => (/* binding */ SuperClusterAlgorithm),
/* harmony export */   "defaultOnClusterClickHandler": () => (/* binding */ defaultOnClusterClickHandler),
/* harmony export */   "distanceBetweenPoints": () => (/* binding */ distanceBetweenPoints),
/* harmony export */   "extendBoundsToPaddedViewport": () => (/* binding */ extendBoundsToPaddedViewport),
/* harmony export */   "extendPixelBounds": () => (/* binding */ extendPixelBounds),
/* harmony export */   "filterMarkersToPaddedViewport": () => (/* binding */ filterMarkersToPaddedViewport),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "pixelBoundsToLatLngBounds": () => (/* binding */ pixelBoundsToLatLngBounds)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_clusters_kmeans__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/clusters-kmeans */ "./node_modules/@turf/clusters-kmeans/dist/es/index.js");
/* harmony import */ var _turf_clusters_dbscan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/clusters-dbscan */ "./node_modules/@turf/clusters-dbscan/dist/es/index.js");
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js");
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fast-deep-equal/es6 */ "./node_modules/fast-deep-equal/es6/index.js");
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4__);






/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cluster {
    constructor({ markers, position }) {
        this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return undefined;
        }
        return this.markers.reduce((bounds, marker) => {
            return bounds.extend(marker.getPosition());
        }, new google.maps.LatLngBounds(this._position, this._position));
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => m.getVisible())
            .length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            this.marker.setMap(null);
            delete this.marker;
        }
        this.markers.length = 0;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPadding) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPadding);
    return markers.filter((marker) => extendedMapBounds.contains(marker.getPosition()));
};
/**
 * Extends a bounds by a number of pixels in each direction.
 */
const extendBoundsToPaddedViewport = (bounds, projection, pixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, pixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, pixels) => {
    northEast.x += pixels;
    northEast.y -= pixels;
    southWest.x -= pixels;
    southWest.y += pixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(projection.fromDivPixelToLatLng(northEast));
    bounds.extend(projection.fromDivPixelToLatLng(southWest));
    return bounds;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers, map})
     *    }
     * }
     * ```
     */
    noop({ markers }) {
        return noop(markers);
    }
}
/**
 * Abstract viewport algorithm proves a class to filter markers by a padded
 * viewport. This is a common optimization.
 *
 * @hidden
 */
class AbstractViewportAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
        super(options);
        this.viewportPadding = 60;
        this.viewportPadding = viewportPadding;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                    map,
                    mapCanvasProjection,
                }),
                changed: false,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
}
/**
 * @hidden
 */
const noop = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: marker.getPosition(),
        markers: [marker],
    }));
    return clusters;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default Grid algorithm historically used in Google Maps marker
 * clustering.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 */
class GridAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
        super(options);
        this.clusters = [];
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
    }
    cluster({ markers, map, mapCanvasProjection, }) {
        this.clusters = [];
        markers.forEach((marker) => {
            this.addToClosestCluster(marker, map, mapCanvasProjection);
        });
        return this.clusters;
    }
    addToClosestCluster(marker, map, projection) {
        let maxDistance = this.maxDistance; // Some large number
        let cluster = null;
        for (let i = 0; i < this.clusters.length; i++) {
            const candidate = this.clusters[i];
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), marker.getPosition().toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(marker.getPosition())) {
            cluster.push(marker);
        }
        else {
            const cluster = new Cluster({ markers: [marker] });
            this.clusters.push(cluster);
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
 */
class NoopAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var options = __rest(_a, []);
        super(options);
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        return {
            clusters: this.cluster({ markers, map, mapCanvasProjection }),
            changed: false,
        };
    }
    cluster(input) {
        return this.noop(input);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Experimental algorithm using Kmeans.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-kmeans
 */
class KmeansAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { numberOfClusters } = _a, options = __rest(_a, ["numberOfClusters"]);
        super(options);
        this.numberOfClusters = numberOfClusters;
    }
    cluster({ markers, map }) {
        const clusters = [];
        if (markers.length === 0) {
            return clusters;
        }
        const points = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(markers.map((marker) => {
            return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)([marker.getPosition().lng(), marker.getPosition().lat()]);
        }));
        let numberOfClusters;
        if (this.numberOfClusters instanceof Function) {
            numberOfClusters = this.numberOfClusters(markers.length, map.getZoom());
        }
        else {
            numberOfClusters = this.numberOfClusters;
        }
        (0,_turf_clusters_kmeans__WEBPACK_IMPORTED_MODULE_1__["default"])(points, { numberOfClusters }).features.forEach((point, i) => {
            if (!clusters[point.properties.cluster]) {
                clusters[point.properties.cluster] = new Cluster({
                    position: {
                        lng: point.properties.centroid[0],
                        lat: point.properties.centroid[1],
                    },
                    markers: [],
                });
            }
            clusters[point.properties.cluster].push(markers[i]);
        });
        return clusters;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_INTERNAL_DBSCAN_OPTION = {
    units: "kilometers",
    mutate: false,
    minPoints: 1,
};
/**
 *
 * **This algorithm is not yet ready for use!**
 *
 * Experimental algorithm using DBScan.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-dbscan
 */
class DBScanAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 200, minPoints = DEFAULT_INTERNAL_DBSCAN_OPTION.minPoints } = _a, options = __rest(_a, ["maxDistance", "minPoints"]);
        super(options);
        this.maxDistance = maxDistance;
        this.options = Object.assign(Object.assign({}, DEFAULT_INTERNAL_DBSCAN_OPTION), { minPoints });
    }
    cluster({ markers, mapCanvasProjection, }) {
        const points = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(markers.map((marker) => {
            const projectedPoint = mapCanvasProjection.fromLatLngToContainerPixel(marker.getPosition());
            return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)([projectedPoint.x, projectedPoint.y]);
        }));
        const grouped = [];
        (0,_turf_clusters_dbscan__WEBPACK_IMPORTED_MODULE_2__["default"])(points, this.maxDistance, this.options).features.forEach((point, i) => {
            if (!grouped[point.properties.cluster]) {
                grouped[point.properties.cluster] = [];
            }
            grouped[point.properties.cluster].push(markers[i]);
        });
        return grouped.map((markers) => new Cluster({ markers }));
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.superCluster = new supercluster__WEBPACK_IMPORTED_MODULE_3__["default"](Object.assign({ maxZoom: this.maxZoom, radius }, options));
        this.state = { zoom: null };
    }
    calculate(input) {
        let changed = false;
        if (!fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default()(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            marker.getPosition().lng(),
                            marker.getPosition().lat(),
                        ],
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        const state = { zoom: input.map.getZoom() };
        if (!changed) {
            if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
            else {
                changed = changed || !fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default()(this.state, state);
            }
        }
        this.state = state;
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        return this.superCluster
            .getClusters([-180, -90, 180, 90], Math.round(map.getZoom()))
            .map(this.transformCluster.bind(this));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: new google.maps.LatLng({ lat, lng }),
            });
        }
        else {
            const marker = properties.marker;
            return new Cluster({
                markers: [marker],
                position: marker.getPosition(),
            });
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg url with fill color
        const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
        // create marker using svg icon
        return new google.maps.Marker({
            position,
            icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(45, 45),
            },
            label: {
                text: String(count),
                color: "rgba(255,255,255,0.9)",
                fontSize: "12px",
            },
            title: `Cluster of ${count} markers`,
            // adjust zIndex to be above other markers
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && this.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // allow algorithms to return flag on whether the clusters/markers have changed
            if (changed || changed == undefined) {
                // reset visibility of markers and clusters
                this.reset();
                // store new clusters
                this.clusters = clusters;
                this.renderClusters();
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => marker.setMap(null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // generate stats to pass to renderers
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                cluster.marker = this.renderer.render(cluster, stats);
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            cluster.marker.setMap(map);
        });
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/density-clustering/lib/DBSCAN.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/DBSCAN.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * DBSCAN - Density based clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * DBSCAN class construcotr
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {DBSCAN}
 */
function DBSCAN(dataset, epsilon, minPts, distanceFunction) {
  /** @type {Array} */
  this.dataset = [];
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 2;
  /** @type {function} */
  this.distance = this._euclideanDistance;
  /** @type {Array} */
  this.clusters = [];
  /** @type {Array} */
  this.noise = [];

  // temporary variables used during computation

  /** @type {Array} */
  this._visited = [];
  /** @type {Array} */
  this._assigned = [];
  /** @type {number} */
  this._datasetLength = 0;

  this._init(dataset, epsilon, minPts, distanceFunction);
};

/******************************************************************************/
// public functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {undefined}
 * @access public
 */
DBSCAN.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0; pointId < this._datasetLength; pointId++) {
    // if point is not visited, check if it forms a cluster
    if (this._visited[pointId] !== 1) {
      this._visited[pointId] = 1;

      // if closest neighborhood is too small to form a cluster, mark as noise
      var neighbors = this._regionQuery(pointId);

      if (neighbors.length < this.minPts) {
        this.noise.push(pointId);
      } else {
        // create new cluster and add point
        var clusterId = this.clusters.length;
        this.clusters.push([]);
        this._addToCluster(pointId, clusterId);

        this._expandCluster(clusterId, neighbors);
      }
    }
  }

  return this.clusters;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this.noise = [];

    this._datasetLength = dataset.length;
    this._visited = new Array(this._datasetLength);
    this._assigned = new Array(this._datasetLength);
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Expand cluster to closest points of given neighborhood
 *
 * @param {number} clusterId
 * @param {Array} neighbors
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._expandCluster = function(clusterId, neighbors) {

  /**
   * It's very important to calculate length of neighbors array each time,
   * as the number of elements changes over time
   */
  for (var i = 0; i < neighbors.length; i++) {
    var pointId2 = neighbors[i];

    if (this._visited[pointId2] !== 1) {
      this._visited[pointId2] = 1;
      var neighbors2 = this._regionQuery(pointId2);

      if (neighbors2.length >= this.minPts) {
        neighbors = this._mergeArrays(neighbors, neighbors2);
      }
    }

    // add to cluster
    if (this._assigned[pointId2] !== 1) {
      this._addToCluster(pointId2, clusterId);
    }
  }
};

/**
 * Add new point to cluster
 *
 * @param {number} pointId
 * @param {number} clusterId
 */
DBSCAN.prototype._addToCluster = function(pointId, clusterId) {
  this.clusters[clusterId].push(pointId);
  this._assigned[pointId] = 1;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId,
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._regionQuery = function(pointId) {
  var neighbors = [];

  for (var id = 0; id < this._datasetLength; id++) {
    var dist = this.distance(this.dataset[pointId], this.dataset[id]);
    if (dist < this.epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._mergeArrays = function(a, b) {
  var len = b.length;

  for (var i = 0; i < len; i++) {
    var P = b[i];
    if (a.indexOf(P) < 0) {
      a.push(P);
    }
  }

  return a;
};

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
DBSCAN.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = DBSCAN;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/KMEANS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/KMEANS.js ***!
  \*******************************************************/
/***/ ((module) => {

﻿/**
 * KMEANS clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * KMEANS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} k - number of clusters
 * @param {function} distance - distance function
 * @returns {KMEANS}
 */
 function KMEANS(dataset, k, distance) {
  this.k = 3; // number of clusters
  this.dataset = []; // set of feature vectors
  this.assignments = []; // set of associated clusters for each feature vector
  this.centroids = []; // vectors for our clusters

  this.init(dataset, k, distance);
}

/**
 * @returns {undefined}
 */
KMEANS.prototype.init = function(dataset, k, distance) {
  this.assignments = [];
  this.centroids = [];

  if (typeof dataset !== 'undefined') {
    this.dataset = dataset;
  }

  if (typeof k !== 'undefined') {
    this.k = k;
  }

  if (typeof distance !== 'undefined') {
    this.distance = distance;
  }
};

/**
 * @returns {undefined}
 */
KMEANS.prototype.run = function(dataset, k) {
  this.init(dataset, k);

  var len = this.dataset.length;

  // initialize centroids
  for (var i = 0; i < this.k; i++) {
    this.centroids[i] = this.randomCentroid();
	}

  var change = true;
  while(change) {

    // assign feature vectors to clusters
    change = this.assign();

    // adjust location of centroids
    for (var centroidId = 0; centroidId < this.k; centroidId++) {
      var mean = new Array(maxDim);
      var count = 0;

      // init mean vector
      for (var dim = 0; dim < maxDim; dim++) {
        mean[dim] = 0;
      }

      for (var j = 0; j < len; j++) {
        var maxDim = this.dataset[j].length;

        // if current cluster id is assigned to point
        if (centroidId === this.assignments[j]) {
          for (var dim = 0; dim < maxDim; dim++) {
            mean[dim] += this.dataset[j][dim];
          }
          count++;
        }
      }

      if (count > 0) {
        // if cluster contain points, adjust centroid position
        for (var dim = 0; dim < maxDim; dim++) {
          mean[dim] /= count;
        }
        this.centroids[centroidId] = mean;
      } else {
        // if cluster is empty, generate new random centroid
        this.centroids[centroidId] = this.randomCentroid();
        change = true;
      }
    }
  }

  return this.getClusters();
};

/**
 * Generate random centroid
 *
 * @returns {Array}
 */
KMEANS.prototype.randomCentroid = function() {
  var maxId = this.dataset.length -1;
  var centroid;
  var id;

  do {
    id = Math.round(Math.random() * maxId);
    centroid = this.dataset[id];
  } while (this.centroids.indexOf(centroid) >= 0);

  return centroid;
}

/**
 * Assign points to clusters
 *
 * @returns {boolean}
 */
KMEANS.prototype.assign = function() {
  var change = false;
  var len = this.dataset.length;
  var closestCentroid;

  for (var i = 0; i < len; i++) {
    closestCentroid = this.argmin(this.dataset[i], this.centroids, this.distance);

    if (closestCentroid != this.assignments[i]) {
      this.assignments[i] = closestCentroid;
      change = true;
    }
  }

  return change;
}

/**
 * Extract information about clusters
 *
 * @returns {undefined}
 */
KMEANS.prototype.getClusters = function() {
  var clusters = new Array(this.k);
  var centroidId;

  for (var pointId = 0; pointId < this.assignments.length; pointId++) {
    centroidId = this.assignments[pointId];

    // init empty cluster
    if (typeof clusters[centroidId] === 'undefined') {
      clusters[centroidId] = [];
    }

    clusters[centroidId].push(pointId);
  }

  return clusters;
};

// utils

/**
 * @params {Array} point
 * @params {Array.<Array>} set
 * @params {Function} f
 * @returns {number}
 */
KMEANS.prototype.argmin = function(point, set, f) {
  var min = Number.MAX_VALUE;
  var arg = 0;
  var len = set.length;
  var d;

  for (var i = 0; i < len; i++) {
    d = f(point, set[i]);
    if (d < min) {
      min = d;
      arg = i;
    }
  }

  return arg;
};

/**
 * Euclidean distance
 *
 * @params {number} p
 * @params {number} q
 * @returns {number}
 */
KMEANS.prototype.distance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    var diff = p[i] - q[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = KMEANS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/OPTICS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/OPTICS.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * @requires ./PriorityQueue.js
 */

if ( true && module.exports) {
      var PriorityQueue = __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js");
}

/**
 * OPTICS - Ordering points to identify the clustering structure
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * OPTICS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {OPTICS}
 */
function OPTICS(dataset, epsilon, minPts, distanceFunction) {
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 1;
  /** @type {function} */
  this.distance = this._euclideanDistance;

  // temporary variables used during computation

  /** @type {Array} */
  this._reachability = [];
  /** @type {Array} */
  this._processed = [];
  /** @type {number} */
  this._coreDistance = 0;
  /** @type {Array} */
  this._orderedList = [];

  this._init(dataset, epsilon, minPts, distanceFunction);
}

/******************************************************************************/
// pulic functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @returns {undefined}
 * @access public
 */
OPTICS.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0, l = this.dataset.length; pointId < l; pointId++) {
    if (this._processed[pointId] !== 1) {
      this._processed[pointId] = 1;
      this.clusters.push([pointId]);
      var clusterId = this.clusters.length - 1;

      this._orderedList.push(pointId);
      var priorityQueue = new PriorityQueue(null, null, 'asc');
      var neighbors = this._regionQuery(pointId);

      // using priority queue assign elements to new cluster
      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, priorityQueue);
        this._expandCluster(clusterId, priorityQueue);
      }
    }
  }

  return this.clusters;
};

/**
 * Generate reachability plot for all points
 *
 * @returns {array}
 * @access public
 */
OPTICS.prototype.getReachabilityPlot = function() {
  var reachabilityPlot = [];

  for (var i = 0, l = this._orderedList.length; i < l; i++) {
    var pointId = this._orderedList[i];
    var distance = this._reachability[pointId];

    reachabilityPlot.push([pointId, distance]);
  }

  return reachabilityPlot;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this._reachability = new Array(this.dataset.length);
    this._processed = new Array(this.dataset.length);
    this._coreDistance = 0;
    this._orderedList = [];
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Update information in queue
 *
 * @param {number} pointId
 * @param {Array} neighbors
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._updateQueue = function(pointId, neighbors, queue) {
  var self = this;

  this._coreDistance = this._distanceToCore(pointId);
  neighbors.forEach(function(pointId2) {
    if (self._processed[pointId2] === undefined) {
      var dist = self.distance(self.dataset[pointId], self.dataset[pointId2]);
      var newReachableDistance = Math.max(self._coreDistance, dist);

      if (self._reachability[pointId2] === undefined) {
        self._reachability[pointId2] = newReachableDistance;
        queue.insert(pointId2, newReachableDistance);
      } else {
        if (newReachableDistance < self._reachability[pointId2]) {
          self._reachability[pointId2] = newReachableDistance;
          queue.remove(pointId2);
          queue.insert(pointId2, newReachableDistance);
        }
      }
    }
  });
};

/**
 * Expand cluster
 *
 * @param {number} clusterId
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._expandCluster = function(clusterId, queue) {
  var queueElements = queue.getElements();

  for (var p = 0, l = queueElements.length; p < l; p++) {
    var pointId = queueElements[p];
    if (this._processed[pointId] === undefined) {
      var neighbors = this._regionQuery(pointId);
      this._processed[pointId] = 1;

      this.clusters[clusterId].push(pointId);
      this._orderedList.push(pointId);

      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, queue);
        this._expandCluster(clusterId, queue);
      }
    }
  }
};

/**
 * Calculating distance to cluster core
 *
 * @param {number} pointId
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._distanceToCore = function(pointId) {
  var l = this.epsilon;
  for (var coreDistCand = 0; coreDistCand < l; coreDistCand++) {
    var neighbors = this._regionQuery(pointId, coreDistCand);
    if (neighbors.length >= this.minPts) {
      return coreDistCand;
    }
  }

  return;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
OPTICS.prototype._regionQuery = function(pointId, epsilon) {
  epsilon = epsilon || this.epsilon;
  var neighbors = [];

  for (var id = 0, l = this.dataset.length; id < l; id++) {
    if (this.distance(this.dataset[pointId], this.dataset[id]) < epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = OPTICS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/PriorityQueue.js":
/*!**************************************************************!*\
  !*** ./node_modules/density-clustering/lib/PriorityQueue.js ***!
  \**************************************************************/
/***/ ((module) => {

/**
 * PriorityQueue
 * Elements in this queue are sorted according to their value
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * PriorityQueue class construcotr
 * @constructor
 *
 * @example
 * queue: [1,2,3,4]
 * priorities: [4,1,2,3]
 * > result = [1,4,2,3]
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @param {string} sorting - asc / desc
 * @returns {PriorityQueue}
 */
function PriorityQueue(elements, priorities, sorting) {
  /** @type {Array} */
  this._queue = [];
  /** @type {Array} */
  this._priorities = [];
  /** @type {string} */
  this._sorting = 'desc';

  this._init(elements, priorities, sorting);
};

/**
 * Insert element
 *
 * @param {Object} ele
 * @param {Object} priority
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.insert = function(ele, priority) {
  var indexToInsert = this._queue.length;
  var index = indexToInsert;

  while (index--) {
    var priority2 = this._priorities[index];
    if (this._sorting === 'desc') {
      if (priority > priority2) {
        indexToInsert = index;
      }
    } else {
      if (priority < priority2) {
        indexToInsert = index;
      }
    }
  }

  this._insertAt(ele, priority, indexToInsert);
};

/**
 * Remove element
 *
 * @param {Object} ele
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.remove = function(ele) {
  var index = this._queue.length;

  while (index--) {
    var ele2 = this._queue[index];
    if (ele === ele2) {
      this._queue.splice(index, 1);
      this._priorities.splice(index, 1);
      break;
    }
  }
};

/**
 * For each loop wrapper
 *
 * @param {function} func
 * @returs {undefined}
 * @access public
 */
PriorityQueue.prototype.forEach = function(func) {
  this._queue.forEach(func);
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElements = function() {
  return this._queue;
};

/**
 * @param {number} index
 * @returns {Object}
 * @access public
 */
PriorityQueue.prototype.getElementPriority = function(index) {
  return this._priorities[index];
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getPriorities = function() {
  return this._priorities;
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElementsWithPriorities = function() {
  var result = [];

  for (var i = 0, l = this._queue.length; i < l; i++) {
    result.push([this._queue[i], this._priorities[i]]);
  }

  return result;
};

/**
 * Set object properties
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._init = function(elements, priorities, sorting) {

  if (elements && priorities) {
    this._queue = [];
    this._priorities = [];

    if (elements.length !== priorities.length) {
      throw new Error('Arrays must have the same length');
    }

    for (var i = 0; i < elements.length; i++) {
      this.insert(elements[i], priorities[i]);
    }
  }

  if (sorting) {
    this._sorting = sorting;
  }
};

/**
 * Insert element at given position
 *
 * @param {Object} ele
 * @param {number} index
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._insertAt = function(ele, priority, index) {
  if (this._queue.length === index) {
    this._queue.push(ele);
    this._priorities.push(priority);
  } else {
    this._queue.splice(index, 0, ele);
    this._priorities.splice(index, 0, priority);
  }
};

if ( true && module.exports) {
  module.exports = PriorityQueue;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/density-clustering/lib/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if ( true && module.exports) {
    module.exports = {
      DBSCAN: __webpack_require__(/*! ./DBSCAN.js */ "./node_modules/density-clustering/lib/DBSCAN.js"),
      KMEANS: __webpack_require__(/*! ./KMEANS.js */ "./node_modules/density-clustering/lib/KMEANS.js"),
      OPTICS: __webpack_require__(/*! ./OPTICS.js */ "./node_modules/density-clustering/lib/OPTICS.js"),
      PriorityQueue: __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js")
    };
}


/***/ }),

/***/ "./node_modules/fast-deep-equal/es6/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-deep-equal/es6/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst


  var envHasBigInt64Array = typeof BigInt64Array !== 'undefined';


module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/kdbush/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KDBush)
/* harmony export */ });
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort */ "./node_modules/kdbush/src/sort.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range */ "./node_modules/kdbush/src/range.js");
/* harmony import */ var _within__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./within */ "./node_modules/kdbush/src/within.js");





const defaultGetX = p => p[0];
const defaultGetY = p => p[1];

class KDBush {
    constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
        this.nodeSize = nodeSize;
        this.points = points;

        const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

        const ids = this.ids = new IndexArrayType(points.length);
        const coords = this.coords = new ArrayType(points.length * 2);

        for (let i = 0; i < points.length; i++) {
            ids[i] = i;
            coords[2 * i] = getX(points[i]);
            coords[2 * i + 1] = getY(points[i]);
        }

        (0,_sort__WEBPACK_IMPORTED_MODULE_0__["default"])(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }

    range(minX, minY, maxX, maxY) {
        return (0,_range__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }

    within(x, y, r) {
        return (0,_within__WEBPACK_IMPORTED_MODULE_2__["default"])(this.ids, this.coords, x, y, r, this.nodeSize);
    }
}


/***/ }),

/***/ "./node_modules/kdbush/src/range.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/range.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ range)
/* harmony export */ });

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    let x, y;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}


/***/ }),

/***/ "./node_modules/kdbush/src/sort.js":
/*!*****************************************!*\
  !*** ./node_modules/kdbush/src/sort.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sortKD)
/* harmony export */ });

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;

    const m = (left + right) >> 1;

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        const t = coords[2 * k + inc];
        let i = left;
        let j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) i++;
            while (coords[2 * j + inc] > t) j--;
        }

        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}


/***/ }),

/***/ "./node_modules/kdbush/src/within.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/within.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
/* harmony export */ });

function within(ids, coords, qx, qy, r, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    const r2 = r * r;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        const x = coords[2 * m];
        const y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/skmeans/dist/node/distance.js":
/*!****************************************************!*\
  !*** ./node_modules/skmeans/dist/node/distance.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	/**
  * Euclidean distance
  */
	eudist: function eudist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			var d = (v1[i] || 0) - (v2[i] || 0);
			sum += d * d;
		}
		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},
	mandist: function mandist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			sum += Math.abs((v1[i] || 0) - (v2[i] || 0));
		}

		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},


	/**
  * Unidimensional distance
  */
	dist: function dist(v1, v2, sqrt) {
		var d = Math.abs(v1 - v2);
		return sqrt ? d : d * d;
	}
};
//# sourceMappingURL=distance.js.map


/***/ }),

/***/ "./node_modules/skmeans/dist/node/kinit.js":
/*!*************************************************!*\
  !*** ./node_modules/skmeans/dist/node/kinit.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Distance = __webpack_require__(/*! ./distance.js */ "./node_modules/skmeans/dist/node/distance.js"),
    eudist = Distance.eudist,
    dist = Distance.dist;

module.exports = {
	kmrand: function kmrand(data, k) {
		var map = {},
		    ks = [],
		    t = k << 2;
		var len = data.length;
		var multi = data[0].length > 0;

		while (ks.length < k && t-- > 0) {
			var d = data[Math.floor(Math.random() * len)];
			var key = multi ? d.join("_") : "" + d;
			if (!map[key]) {
				map[key] = true;
				ks.push(d);
			}
		}

		if (ks.length < k) throw new Error("Error initializating clusters");else return ks;
	},


	/**
  * K-means++ initial centroid selection
  */
	kmpp: function kmpp(data, k) {
		var distance = data[0].length ? eudist : dist;
		var ks = [],
		    len = data.length;
		var multi = data[0].length > 0;
		var map = {};

		// First random centroid
		var c = data[Math.floor(Math.random() * len)];
		var key = multi ? c.join("_") : "" + c;
		ks.push(c);
		map[key] = true;

		// Retrieve next centroids
		while (ks.length < k) {
			// Min Distances between current centroids and data points
			var dists = [],
			    lk = ks.length;
			var dsum = 0,
			    prs = [];

			for (var i = 0; i < len; i++) {
				var min = Infinity;
				for (var j = 0; j < lk; j++) {
					var _dist = distance(data[i], ks[j]);
					if (_dist <= min) min = _dist;
				}
				dists[i] = min;
			}

			// Sum all min distances
			for (var _i = 0; _i < len; _i++) {
				dsum += dists[_i];
			}

			// Probabilities and cummulative prob (cumsum)
			for (var _i2 = 0; _i2 < len; _i2++) {
				prs[_i2] = { i: _i2, v: data[_i2], pr: dists[_i2] / dsum, cs: 0 };
			}

			// Sort Probabilities
			prs.sort(function (a, b) {
				return a.pr - b.pr;
			});

			// Cummulative Probabilities
			prs[0].cs = prs[0].pr;
			for (var _i3 = 1; _i3 < len; _i3++) {
				prs[_i3].cs = prs[_i3 - 1].cs + prs[_i3].pr;
			}

			// Randomize
			var rnd = Math.random();

			// Gets only the items whose cumsum >= rnd
			var idx = 0;
			while (idx < len - 1 && prs[idx++].cs < rnd) {}
			ks.push(prs[idx - 1].v);
			/*
   let done = false;
   while(!done) {
   	// this is our new centroid
   	c = prs[idx-1].v
   	key = multi? c.join("_") : `${c}`;
   	if(!map[key]) {
   		map[key] = true;
   		ks.push(c);
   		done = true;
   	}
   	else {
   		idx++;
   	}
   }
   */
		}

		return ks;
	}
};
//# sourceMappingURL=kinit.js.map


/***/ }),

/***/ "./node_modules/skmeans/dist/node/main.js":
/*!************************************************!*\
  !*** ./node_modules/skmeans/dist/node/main.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*jshint esversion: 6 */

var Distance = __webpack_require__(/*! ./distance.js */ "./node_modules/skmeans/dist/node/distance.js"),
    ClusterInit = __webpack_require__(/*! ./kinit.js */ "./node_modules/skmeans/dist/node/kinit.js"),
    eudist = Distance.eudist,
    mandist = Distance.mandist,
    dist = Distance.dist,
    kmrand = ClusterInit.kmrand,
    kmpp = ClusterInit.kmpp;

var MAX = 10000;

/**
 * Inits an array with values
 */
function init(len, val, v) {
	v = v || [];
	for (var i = 0; i < len; i++) {
		v[i] = val;
	}return v;
}

function skmeans(data, k, initial, maxit) {
	var ks = [],
	    old = [],
	    idxs = [],
	    dist = [];
	var conv = false,
	    it = maxit || MAX;
	var len = data.length,
	    vlen = data[0].length,
	    multi = vlen > 0;
	var count = [];

	if (!initial) {
		var _idxs = {};
		while (ks.length < k) {
			var idx = Math.floor(Math.random() * len);
			if (!_idxs[idx]) {
				_idxs[idx] = true;
				ks.push(data[idx]);
			}
		}
	} else if (initial == "kmrand") {
		ks = kmrand(data, k);
	} else if (initial == "kmpp") {
		ks = kmpp(data, k);
	} else {
		ks = initial;
	}

	do {
		// Reset k count
		init(k, 0, count);

		// For each value in data, find the nearest centroid
		for (var i = 0; i < len; i++) {
			var min = Infinity,
			    _idx = 0;
			for (var j = 0; j < k; j++) {
				// Multidimensional or unidimensional
				var dist = multi ? eudist(data[i], ks[j]) : Math.abs(data[i] - ks[j]);
				if (dist <= min) {
					min = dist;
					_idx = j;
				}
			}
			idxs[i] = _idx; // Index of the selected centroid for that value
			count[_idx]++; // Number of values for this centroid
		}

		// Recalculate centroids
		var sum = [],
		    old = [],
		    dif = 0;
		for (var _j = 0; _j < k; _j++) {
			// Multidimensional or unidimensional
			sum[_j] = multi ? init(vlen, 0, sum[_j]) : 0;
			old[_j] = ks[_j];
		}

		// If multidimensional
		if (multi) {
			for (var _j2 = 0; _j2 < k; _j2++) {
				ks[_j2] = [];
			} // Sum values and count for each centroid
			for (var _i = 0; _i < len; _i++) {
				var _idx2 = idxs[_i],
				    // Centroid for that item
				vsum = sum[_idx2],
				    // Sum values for this centroid
				vect = data[_i]; // Current vector

				// Accumulate value on the centroid for current vector
				for (var h = 0; h < vlen; h++) {
					vsum[h] += vect[h];
				}
			}
			// Calculate the average for each centroid
			conv = true;
			for (var _j3 = 0; _j3 < k; _j3++) {
				var ksj = ks[_j3],
				    // Current centroid
				sumj = sum[_j3],
				    // Accumulated centroid values
				oldj = old[_j3],
				    // Old centroid value
				cj = count[_j3]; // Number of elements for this centroid

				// New average
				for (var _h = 0; _h < vlen; _h++) {
					ksj[_h] = sumj[_h] / cj || 0; // New centroid
				}

				// Find if centroids have moved
				if (conv) {
					for (var _h2 = 0; _h2 < vlen; _h2++) {
						if (oldj[_h2] != ksj[_h2]) {
							conv = false;
							break;
						}
					}
				}
			}
		}
		// If unidimensional
		else {
				// Sum values and count for each centroid
				for (var _i2 = 0; _i2 < len; _i2++) {
					var _idx3 = idxs[_i2];
					sum[_idx3] += data[_i2];
				}
				// Calculate the average for each centroid
				for (var _j4 = 0; _j4 < k; _j4++) {
					ks[_j4] = sum[_j4] / count[_j4] || 0; // New centroid
				}
				// Find if centroids have moved
				conv = true;
				for (var _j5 = 0; _j5 < k; _j5++) {
					if (old[_j5] != ks[_j5]) {
						conv = false;
						break;
					}
				}
			}

		conv = conv || --it <= 0;
	} while (!conv);

	return {
		it: MAX - it,
		k: k,
		idxs: idxs,
		centroids: ks
	};
}

module.exports = skmeans;
//# sourceMappingURL=main.js.map


/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Supercluster)
/* harmony export */ });
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/src/index.js");



const defaultOptions = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: props => props // props => ({sum: props.my_value})
};

const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));

class Supercluster {
    constructor(options) {
        this.options = extend(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
    }

    load(points) {
        const {log, minZoom, maxZoom, nodeSize} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        let clusters = [];
        for (let i = 0; i < points.length; i++) {
            if (!points[i].geometry) continue;
            clusters.push(createPointCluster(points[i], i));
        }
        this.trees[maxZoom + 1] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            clusters = this._cluster(clusters, z);
            this.trees[z] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    }

    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));

        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
            return easternHem.concat(westernHem);
        }

        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const clusters = [];
        for (const id of ids) {
            const c = tree.points[id];
            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const index = this.trees[originZoom];
        if (!index) throw new Error(errorMsg);

        const origin = index.points[originId];
        if (!origin) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const ids = index.within(origin.x, origin.y, r);
        const children = [];
        for (const id of ids) {
            const c = index.points[id];
            if (c.parentId === clusterId) {
                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    }

    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    }

    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const {extent, radius} = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;

        const tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.points, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.points, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.points, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    }

    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while (expansionZoom <= this.options.maxZoom) {
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }

    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);

        for (const child of children) {
            const props = child.properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }

        return skipped;
    }

    _addTileFeatures(ids, points, x, y, z2, tile) {
        for (const i of ids) {
            const c = points[i];
            const isCluster = c.numPoints;

            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(c);
                px = c.x;
                py = c.y;
            } else {
                const p = this.points[c.index];
                tags = p.properties;
                px = lngX(p.geometry.coordinates[0]);
                py = latY(p.geometry.coordinates[1]);
            }

            const f = {
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (px * z2 - x)),
                    Math.round(this.options.extent * (py * z2 - y))
                ]],
                tags
            };

            // assign id
            let id;
            if (isCluster) {
                id = c.id;
            } else if (this.options.generateId) {
                // optionally generate id
                id = c.index;
            } else if (this.points[c.index].id) {
                // keep id if already assigned
                id = this.points[c.index].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
    }

    _cluster(points, zoom) {
        const clusters = [];
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));

        // loop through each point
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            // if we've already visited the point at this zoom level, skip it
            if (p.zoom <= zoom) continue;
            p.zoom = zoom;

            // find all nearby points
            const tree = this.trees[zoom + 1];
            const neighborIds = tree.within(p.x, p.y, r);

            const numPointsOrigin = p.numPoints || 1;
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const b = tree.points[neighborId];
                // filter out neighbors that are already processed
                if (b.zoom > zoom) numPoints += b.numPoints || 1;
            }

            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = p.x * numPointsOrigin;
                let wy = p.y * numPointsOrigin;

                let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = (i << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const b = tree.points[neighborId];

                    if (b.zoom <= zoom) continue;
                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = b.numPoints || 1;
                    wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += b.y * numPoints2;

                    b.parentId = id;

                    if (reduce) {
                        if (!clusterProperties) clusterProperties = this._map(p, true);
                        reduce(clusterProperties, this._map(b));
                    }
                }

                p.parentId = id;
                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));

            } else { // left points as unclustered
                clusters.push(p);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const b = tree.points[neighborId];
                        if (b.zoom <= zoom) continue;
                        b.zoom = zoom;
                        clusters.push(b);
                    }
                }
            }
        }

        return clusters;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(point, clone) {
        if (point.numPoints) {
            return clone ? extend({}, point.properties) : point.properties;
        }
        const original = this.points[point.index].properties;
        const result = this.options.map(original);
        return clone && result === original ? extend({}, result) : result;
    }
}

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: fround(x), // weighted cluster center; round for consistency with Float32Array index
        y: fround(y),
        zoom: Infinity, // the last zoom the cluster was processed at
        id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints,
        properties
    };
}

function createPointCluster(p, id) {
    const [x, y] = p.geometry.coordinates;
    return {
        x: fround(lngX(x)), // projected point coordinates
        y: fround(latY(y)),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    const count = cluster.numPoints;
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (const id in src) dest[id] = src[id];
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}


/***/ }),

/***/ "./Resources/Scripts/boxAnim.ts":
/*!**************************************!*\
  !*** ./Resources/Scripts/boxAnim.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initAnim = void 0;
function initAnim() {
    const aboutCards = document.querySelectorAll(".card");
    const cardsText = document.querySelectorAll(".card__number");
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const animLength = 1000;
    function incrementNumbers(element, step, timeInterval) {
        let maxNumber = element.getAttribute('data-number');
        let cardNumber = 0;
        if (maxNumber) {
            let interval = setInterval(() => {
                element.innerText = cardNumber;
                if (cardNumber >= maxNumber)
                    clearInterval(interval);
                cardNumber = cardNumber + step;
            }, timeInterval);
        }
        element.removeAttribute('data-number');
    }
    function addClassToCards(scrollPos) {
        for (let i = 0; i < aboutCards.length; i++) {
            let card = aboutCards[i];
            let cardText = cardsText[i];
            let step = 1;
            let interval = animLength / 20;
            if (i == 1) {
                step = 100;
                interval = animLength / 10;
            }
            else if (i == 2)
                interval = animLength / 3;
            if (scrollPos >= card.offsetTop + window.innerHeight / 3) {
                card.classList.add("card--visible");
                incrementNumbers(cardText, step, interval);
            }
        }
    }
    document.addEventListener("scroll", () => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                addClassToCards(lastKnownScrollPosition);
                ticking;
            });
            !ticking;
        }
    });
}
exports.initAnim = initAnim;


/***/ }),

/***/ "./Resources/Scripts/email.ts":
/*!************************************!*\
  !*** ./Resources/Scripts/email.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initEmail = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
function initEmail() {
    axios_1.default;
    const fullNameEl = document.getElementById('fullName');
    const phoneEl = document.getElementById('phone');
    const mailEl = document.getElementById('email');
    const messageEl = document.getElementById('msg');
    const submitBtn = document.getElementById('submitBtn');
    const azureFncUrl = 'https://dlcafsendgrid20220328153355.azurewebsites.net/api/SendEmail';
    let fullName = '';
    let email = '';
    let phone = '';
    let message = '';
    let website = 'ctscorp.cz';
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        console.log("%cYou have entered an invalid email address!", 'color:red;');
        return false;
    }
    function setEmailContent() {
        if (fullNameEl.value) {
            fullName = fullNameEl.value;
        }
        if (phoneEl.value) {
            phone = phoneEl.value.replace('+', '00');
        }
        if (validateEmail(mailEl.value)) {
            email = mailEl.value;
        }
        if (messageEl.value) {
            message = messageEl.value;
        }
        return fullName + phone + email + message;
    }
    function axiosPost() {
        (0, axios_1.default)({
            method: 'post',
            url: azureFncUrl,
            data: {
                fullName: fullName,
                email: email,
                phone: phone,
                body: message,
                website: website
            }
        }).then(data => console.log(data)).catch(err => console.log(err));
    }
    submitBtn.addEventListener('click', () => {
        setEmailContent();
        if (fullName != '' && email != '' && message != '') {
            axiosPost();
        }
        else
            console.log('%cPlease fill in the required fields!', 'color:red;');
    });
}
exports.initEmail = initEmail;


/***/ }),

/***/ "./Resources/Scripts/map.ts":
/*!**********************************!*\
  !*** ./Resources/Scripts/map.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initMap = void 0;
const references_1 = __webpack_require__(/*! ./map/references */ "./Resources/Scripts/map/references.ts");
const markerclusterer_1 = __webpack_require__(/*! @googlemaps/markerclusterer */ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js");
const js_api_loader_1 = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
let map;
const middleOfCzechia = { lat: 49.74378, lng: 15.33865 };
let defaultZoomLevel = 8;
function checkScreenResolution() {
    if (window.screen.width <= 768) {
        defaultZoomLevel = 7;
    }
    if (window.screen.width <= 425) {
        defaultZoomLevel = 6;
    }
}
checkScreenResolution();
const mapOptions = {
    center: middleOfCzechia,
    mapId: "c2aa51b8ca67932f",
    zoom: defaultZoomLevel,
    minZoom: defaultZoomLevel,
    disableDoubleClickZoom: true,
    zoomControl: false,
};
const loader = new js_api_loader_1.Loader({
    apiKey: "AIzaSyD3Vb9QGa1aKgT_jOOZPax3tx58Z9IqLH8",
    version: "weekly",
});
function initMap() {
    loader.load().then(() => {
        const infoWindow = new google.maps.InfoWindow({
            content: '',
            disableAutoPan: true,
        });
        var europeCoords = [
            new google.maps.LatLng(29.68224948021748, -23.676965750000022),
            new google.maps.LatLng(29.68224948021748, 44.87772174999998),
            new google.maps.LatLng(71.82725578445813, 44.87772174999998),
            new google.maps.LatLng(71.82725578445813, -23.676965750000022)
        ];
        const czechRepublicCoords = [
            new google.maps.LatLng(50.32021682764627, 12.111525535583496),
            new google.maps.LatLng(50.32035383389029, 12.112276554107666),
            new google.maps.LatLng(50.320847053099044, 12.113392353057861),
            new google.maps.LatLng(50.320942956239776, 12.114379405975342),
            new google.maps.LatLng(50.32042233686421, 12.115602493286133),
            new google.maps.LatLng(50.32003871893868, 12.115216255187988),
            new google.maps.LatLng(50.31970990110981, 12.115001678466795),
            new google.maps.LatLng(50.3194769871048, 12.1144437789917),
            new google.maps.LatLng(50.31791506370198, 12.113757133483887),
            new google.maps.LatLng(50.316421597717465, 12.113778591156006),
            new google.maps.LatLng(50.31606535119429, 12.115817070007324),
            new google.maps.LatLng(50.31562689027029, 12.117340564727783),
            new google.maps.LatLng(50.31579131359065, 12.120344638824461),
            new google.maps.LatLng(50.31529804192351, 12.12390661239624),
            new google.maps.LatLng(50.31536655218332, 12.125945091247559),
            new google.maps.LatLng(50.315613188301235, 12.126224040985106),
            new google.maps.LatLng(50.31636679073381, 12.12663173675537),
            new google.maps.LatLng(50.317271097884394, 12.128541469573975),
            new google.maps.LatLng(50.31828499756704, 12.12909936904907),
            new google.maps.LatLng(50.318353503522445, 12.129936218261719),
            new google.maps.LatLng(50.31860012414439, 12.129936218261719),
            new google.maps.LatLng(50.31883304244587, 12.130193710327148),
            new google.maps.LatLng(50.31888784658623, 12.130429744720459),
            new google.maps.LatLng(50.31902485666073, 12.130579948425291),
            new google.maps.LatLng(50.318942650663416, 12.130944728851318),
            new google.maps.LatLng(50.31905225862825, 12.131309509277344),
            new google.maps.LatLng(50.31880564035197, 12.132060527801512),
            new google.maps.LatLng(50.31899745467742, 12.13315486907959),
            new google.maps.LatLng(50.319381081006334, 12.133626937866211),
            new google.maps.LatLng(50.31953179050277, 12.134850025177002),
            new google.maps.LatLng(50.31995651469472, 12.135343551635742),
            new google.maps.LatLng(50.32009352168902, 12.139205932617188),
            new google.maps.LatLng(50.32061414466601, 12.140665054321289),
            new google.maps.LatLng(50.320942956239776, 12.14238166809082),
            new google.maps.LatLng(50.320942956239776, 12.143669128417969),
            new google.maps.LatLng(50.32146356991309, 12.145771980285645),
            new google.maps.LatLng(50.32195677760684, 12.146716117858887),
            new google.maps.LatLng(50.32195677760684, 12.147831916809082),
            new google.maps.LatLng(50.322093778835736, 12.149505615234375),
            new google.maps.LatLng(50.32195677760684, 12.151350975036621),
            new google.maps.LatLng(50.321682773964355, 12.152981758117674),
            new google.maps.LatLng(50.321682773964355, 12.155299186706543),
            new google.maps.LatLng(50.32184717633939, 12.156715393066406),
            new google.maps.LatLng(50.32173757481923, 12.158861160278319),
            new google.maps.LatLng(50.32190197700471, 12.160320281982422),
            new google.maps.LatLng(50.321655373513224, 12.162251472473145),
            new google.maps.LatLng(50.3214909704748, 12.163839340209961),
            new google.maps.LatLng(50.32187457667994, 12.167015075683594),
            new google.maps.LatLng(50.32184717633939, 12.169075012207031),
            new google.maps.LatLng(50.322093778835736, 12.17109203338623),
            new google.maps.LatLng(50.32255958006024, 12.172894477844238),
            new google.maps.LatLng(50.3229157779165, 12.17461109161377),
            new google.maps.LatLng(50.3229157779165, 12.175426483154295),
            new google.maps.LatLng(50.32261437990418, 12.17658519744873),
            new google.maps.LatLng(50.32261437990418, 12.178773880004883),
            new google.maps.LatLng(50.32264177980245, 12.180919647216797),
            new google.maps.LatLng(50.32255958006024, 12.183022499084473),
            new google.maps.LatLng(50.322093778835736, 12.18456745147705),
            new google.maps.LatLng(50.32116216269198, 12.184910774230957),
            new google.maps.LatLng(50.319189268228875, 12.184996604919434),
            new google.maps.LatLng(50.318860444523935, 12.184052467346191),
            new google.maps.LatLng(50.318476813993335, 12.183237075805662),
            new google.maps.LatLng(50.31768214090261, 12.18285083770752),
            new google.maps.LatLng(50.31639419423354, 12.183151245117186),
            new google.maps.LatLng(50.31609275486775, 12.183237075805662),
            new google.maps.LatLng(50.31557208237044, 12.184138298034666),
            new google.maps.LatLng(50.31559948632826, 12.184696197509766),
            new google.maps.LatLng(50.31510621267078, 12.184867858886719),
            new google.maps.LatLng(50.3144211018782, 12.184653282165527),
            new google.maps.LatLng(50.31327009352124, 12.185297012329102),
            new google.maps.LatLng(50.312639767613135, 12.186026573181152),
            new google.maps.LatLng(50.311680559980395, 12.186713218688965),
            new google.maps.LatLng(50.311680559980395, 12.187485694885254),
            new google.maps.LatLng(50.31118724566285, 12.18834400177002),
            new google.maps.LatLng(50.311077619563896, 12.190189361572266),
            new google.maps.LatLng(50.31072133299675, 12.191390991210938),
            new google.maps.LatLng(50.3104746715018, 12.192463874816895),
            new google.maps.LatLng(50.310036159018054, 12.193150520324707),
            new google.maps.LatLng(50.3096250498918, 12.194480895996094),
            new google.maps.LatLng(50.30904949114383, 12.194738388061523),
            new google.maps.LatLng(50.308748005209914, 12.195854187011717),
            new google.maps.LatLng(50.30671977742726, 12.19933032989502),
            new google.maps.LatLng(50.30765167660993, 12.1997594833374),
            new google.maps.LatLng(50.30863837348728, 12.199931144714355),
            new google.maps.LatLng(50.30913171424864, 12.200489044189453),
            new google.maps.LatLng(50.30913171424864, 12.201132774353027),
            new google.maps.LatLng(50.30850133347859, 12.200746536254881),
            new google.maps.LatLng(50.3064182767231, 12.199544906616211),
            new google.maps.LatLng(50.30518484484699, 12.1983003616333),
            new google.maps.LatLng(50.30408843410173, 12.198429107666016),
            new google.maps.LatLng(50.30296458685622, 12.19877243041992),
            new google.maps.LatLng(50.30162141750976, 12.198128700256348),
            new google.maps.LatLng(50.30047009930913, 12.19757080078125),
            new google.maps.LatLng(50.298852724291145, 12.196841239929197),
            new google.maps.LatLng(50.29715305060732, 12.19679832458496),
            new google.maps.LatLng(50.296714415282516, 12.196712493896484),
            new google.maps.LatLng(50.29561780927654, 12.196283340454102),
            new google.maps.LatLng(50.29485017003242, 12.195811271667479),
            new google.maps.LatLng(50.29391802001304, 12.195854187011717),
            new google.maps.LatLng(50.293287437585235, 12.19508171081543),
            new google.maps.LatLng(50.291505311627105, 12.197613716125488),
            new google.maps.LatLng(50.29095695174958, 12.199115753173828),
            new google.maps.LatLng(50.29101178802171, 12.199888229370117),
            new google.maps.LatLng(50.2895860244079, 12.201347351074219),
            new google.maps.LatLng(50.28813279830258, 12.20207691192627),
            new google.maps.LatLng(50.2878585997211, 12.202162742614746),
            new google.maps.LatLng(50.2862133750541, 12.201862335205078),
            new google.maps.LatLng(50.28418418629873, 12.2017765045166),
            new google.maps.LatLng(50.28267594941849, 12.2017765045166),
            new google.maps.LatLng(50.2805917616243, 12.2017765045166),
            new google.maps.LatLng(50.27839778114469, 12.201647758483887),
            new google.maps.LatLng(50.27595685903672, 12.2017765045166),
            new google.maps.LatLng(50.275435747094754, 12.200875282287598),
            new google.maps.LatLng(50.274750064796706, 12.200660705566406),
            new google.maps.LatLng(50.27420151184809, 12.200231552124023),
            new google.maps.LatLng(50.272802673222245, 12.201261520385742),
            new google.maps.LatLng(50.27239124227569, 12.204608917236326),
            new google.maps.LatLng(50.2717055161311, 12.206411361694336),
            new google.maps.LatLng(50.271595799031516, 12.207484245300293),
            new google.maps.LatLng(50.27118435765651, 12.20907211303711),
            new google.maps.LatLng(50.27151351104095, 12.210016250610352),
            new google.maps.LatLng(50.271458652301526, 12.211089134216309),
            new google.maps.LatLng(50.27093749112501, 12.212076187133789),
            new google.maps.LatLng(50.27071805313368, 12.212762832641602),
            new google.maps.LatLng(50.27022431395573, 12.213234901428223),
            new google.maps.LatLng(50.270361464240914, 12.215938568115234),
            new google.maps.LatLng(50.27066319347783, 12.216753959655762),
            new google.maps.LatLng(50.270580903875555, 12.218084335327148),
            new google.maps.LatLng(50.27071805313368, 12.219886779785156),
            new google.maps.LatLng(50.27038889425054, 12.221131324768066),
            new google.maps.LatLng(50.27060833375877, 12.22379207611084),
            new google.maps.LatLng(50.27082777225574, 12.224478721618652),
            new google.maps.LatLng(50.27071805313368, 12.225937843322754),
            new google.maps.LatLng(50.27088263172198, 12.22851276397705),
            new google.maps.LatLng(50.27088263172198, 12.229113578796387),
            new google.maps.LatLng(50.27126664621591, 12.22997188568115),
            new google.maps.LatLng(50.27123921671192, 12.2312593460083),
            new google.maps.LatLng(50.27080034249893, 12.23228931427002),
            new google.maps.LatLng(50.270580903875555, 12.232890129089354),
            new google.maps.LatLng(50.269565987088185, 12.234177589416504),
            new google.maps.LatLng(50.2691545281742, 12.236623764038086),
            new google.maps.LatLng(50.269730569658336, 12.237782478332518),
            new google.maps.LatLng(50.26975800003139, 12.238597869873047),
            new google.maps.LatLng(50.26920938956816, 12.242074012756348),
            new google.maps.LatLng(50.26855104866933, 12.245121002197266),
            new google.maps.LatLng(50.268249306049, 12.24675178527832),
            new google.maps.LatLng(50.26868820377379, 12.24748134613037),
            new google.maps.LatLng(50.26948369558982, 12.248382568359375),
            new google.maps.LatLng(50.270142023595035, 12.247781753540039),
            new google.maps.LatLng(50.27082777225574, 12.249927520751953),
            new google.maps.LatLng(50.27005973309211, 12.250056266784668),
            new google.maps.LatLng(50.26920938956816, 12.249798774719238),
            new google.maps.LatLng(50.269319112166414, 12.250356674194336),
            new google.maps.LatLng(50.27022431395573, 12.250828742980957),
            new google.maps.LatLng(50.27055347397651, 12.252202033996582),
            new google.maps.LatLng(50.27082777225574, 12.252588272094727),
            new google.maps.LatLng(50.270992350464844, 12.252888679504395),
            new google.maps.LatLng(50.270855201996774, 12.253832817077637),
            new google.maps.LatLng(50.26139100370507, 12.261428833007812),
            new google.maps.LatLng(50.25955281087149, 12.2642183303833),
            new google.maps.LatLng(50.258921773095985, 12.265977859497069),
            new google.maps.LatLng(50.258510222217076, 12.265462875366211),
            new google.maps.LatLng(50.25804379358946, 12.265291213989258),
            new google.maps.LatLng(50.256891420930614, 12.265634536743164),
            new google.maps.LatLng(50.2559585274093, 12.266278266906738),
            new google.maps.LatLng(50.25521768718797, 12.266020774841307),
            new google.maps.LatLng(50.25376341177079, 12.264690399169922),
            new google.maps.LatLng(50.252254211102304, 12.264604568481445),
            new google.maps.LatLng(50.2511840216619, 12.26572036743164),
            new google.maps.LatLng(50.25014124985682, 12.265849113464355),
            new google.maps.LatLng(50.25071752130677, 12.262587547302246),
            new google.maps.LatLng(50.25096449265192, 12.261171340942381),
            new google.maps.LatLng(50.25096449265192, 12.2601842880249),
            new google.maps.LatLng(50.25192492460376, 12.259840965270996),
            new google.maps.LatLng(50.252254211102304, 12.259368896484375),
            new google.maps.LatLng(50.2511840216619, 12.25499153137207),
            new google.maps.LatLng(50.25208956813749, 12.254562377929688),
            new google.maps.LatLng(50.25263837580783, 12.254905700683594),
            new google.maps.LatLng(50.2529127772726, 12.255206108093262),
            new google.maps.LatLng(50.25280301687632, 12.25426197052002),
            new google.maps.LatLng(50.25343413570202, 12.253661155700684),
            new google.maps.LatLng(50.254229882306205, 12.25301742553711),
            new google.maps.LatLng(50.255190248440016, 12.251429557800291),
            new google.maps.LatLng(50.25549207379832, 12.250056266784668),
            new google.maps.LatLng(50.2569462964512, 12.248125076293945),
            new google.maps.LatLng(50.25724811068469, 12.246837615966797),
            new google.maps.LatLng(50.256863983146594, 12.246708869934082),
            new google.maps.LatLng(50.25653472850593, 12.247824668884277),
            new google.maps.LatLng(50.25601340400445, 12.248210906982422),
            new google.maps.LatLng(50.255025615620454, 12.250185012817383),
            new google.maps.LatLng(50.25433963941554, 12.249970436096191),
            new google.maps.LatLng(50.25398292788576, 12.249155044555664),
            new google.maps.LatLng(50.25335181632928, 12.248597145080566),
            new google.maps.LatLng(50.251815161931916, 12.247095108032227),
            new google.maps.LatLng(50.25096449265192, 12.245550155639647),
            new google.maps.LatLng(50.25104681614918, 12.24452018737793),
            new google.maps.LatLng(50.2511840216619, 12.24374771118164),
            new google.maps.LatLng(50.25077240393854, 12.241644859313963),
            new google.maps.LatLng(50.248384951025216, 12.240185737609863),
            new google.maps.LatLng(50.24734211796754, 12.239456176757812),
            new google.maps.LatLng(50.246244374306364, 12.239198684692383),
            new google.maps.LatLng(50.24594249036674, 12.239842414855957),
            new google.maps.LatLng(50.245201494407716, 12.24052906036377),
            new google.maps.LatLng(50.24489960386224, 12.242288589477539),
            new google.maps.LatLng(50.24459771140452, 12.244606018066404),
            new google.maps.LatLng(50.24363713177181, 12.246193885803223),
            new google.maps.LatLng(50.24251185672284, 12.249712944030762),
            new google.maps.LatLng(50.242182502902466, 12.249970436096191),
            new google.maps.LatLng(50.241688467904844, 12.251687049865723),
            new google.maps.LatLng(50.24108464039854, 12.25275993347168),
            new google.maps.LatLng(50.239931857555106, 12.253875732421875),
            new google.maps.LatLng(50.239218216109904, 12.254047393798828),
            new google.maps.LatLng(50.23875159861935, 12.253704071044922),
            new google.maps.LatLng(50.23710467685095, 12.254390716552733),
            new google.maps.LatLng(50.236390993082146, 12.256064414978027),
            new google.maps.LatLng(50.23628119463097, 12.257652282714844),
            new google.maps.LatLng(50.235841998297666, 12.258596420288086),
            new google.maps.LatLng(50.23556749853478, 12.259540557861328),
            new google.maps.LatLng(50.23460673691864, 12.26048469543457),
            new google.maps.LatLng(50.23537534776038, 12.26250171661377),
            new google.maps.LatLng(50.2356223986138, 12.262930870056152),
            new google.maps.LatLng(50.23504594463116, 12.263617515563965),
            new google.maps.LatLng(50.234634187519205, 12.264776229858398),
            new google.maps.LatLng(50.23446948367872, 12.265849113464355),
            new google.maps.LatLng(50.234057721588336, 12.263960838317871),
            new google.maps.LatLng(50.23427732847908, 12.263574600219727),
            new google.maps.LatLng(50.23400281970762, 12.263274192810059),
            new google.maps.LatLng(50.23359105358706, 12.263832092285156),
            new google.maps.LatLng(50.23312438101823, 12.264862060546875),
            new google.maps.LatLng(50.23180669263911, 12.267007827758787),
            new google.maps.LatLng(50.23221847416925, 12.268552780151367),
            new google.maps.LatLng(50.232492993213754, 12.270655632019043),
            new google.maps.LatLng(50.23309692954841, 12.274131774902344),
            new google.maps.LatLng(50.23312438101823, 12.27499008178711),
            new google.maps.LatLng(50.232136118147714, 12.27597713470459),
            new google.maps.LatLng(50.23128509759595, 12.277178764343262),
            new google.maps.LatLng(50.23021443726361, 12.278552055358887),
            new google.maps.LatLng(50.229583010926866, 12.279410362243652),
            new google.maps.LatLng(50.22853976648722, 12.280268669128418),
            new google.maps.LatLng(50.22793577243288, 12.28198528289795),
            new google.maps.LatLng(50.22735922551768, 12.282629013061522),
            new google.maps.LatLng(50.22540989623178, 12.286791801452637),
            new google.maps.LatLng(50.225272616518474, 12.28670597076416),
            new google.maps.LatLng(50.22392725441739, 12.279624938964842),
            new google.maps.LatLng(50.222609311890224, 12.278938293457031),
            new google.maps.LatLng(50.22326828770586, 12.285804748535156),
            new google.maps.LatLng(50.2210716662488, 12.293357849121092),
            new google.maps.LatLng(50.21689780678922, 12.287864685058594),
            new google.maps.LatLng(50.21360239662525, 12.282371520996094),
            new google.maps.LatLng(50.20767008473418, 12.282371520996094),
            new google.maps.LatLng(50.21052647511197, 12.289237976074219),
            new google.maps.LatLng(50.208329266919314, 12.2882080078125),
            new google.maps.LatLng(50.20657142752562, 12.28546142578125),
            new google.maps.LatLng(50.20481352338486, 12.287521362304686),
            new google.maps.LatLng(50.203055554496274, 12.287864685058594),
            new google.maps.LatLng(50.199099887759026, 12.27996826171875),
            new google.maps.LatLng(50.19668237449501, 12.275161743164062),
            new google.maps.LatLng(50.194484528931746, 12.2772216796875),
            new google.maps.LatLng(50.190967765585604, 12.277565002441406),
            new google.maps.LatLng(50.189209286782585, 12.28271484375),
            new google.maps.LatLng(50.19008853427835, 12.284088134765625),
            new google.maps.LatLng(50.18569213491302, 12.286148071289062),
            new google.maps.LatLng(50.1861317930619, 12.290267944335938),
            new google.maps.LatLng(50.18019606656287, 12.291984558105469),
            new google.maps.LatLng(50.17887691605819, 12.290267944335938),
            new google.maps.LatLng(50.17821732714586, 12.291984558105469),
            new google.maps.LatLng(50.17667825093541, 12.289237976074219),
            new google.maps.LatLng(50.17469936581034, 12.293701171875),
            new google.maps.LatLng(50.175578880429114, 12.303314208984375),
            new google.maps.LatLng(50.171840831486286, 12.31842041015625),
            new google.maps.LatLng(50.17162093714734, 12.32391357421875),
            new google.maps.LatLng(50.17294028800254, 12.326316833496094),
            new google.maps.LatLng(50.17140104179651, 12.330780029296875),
            new google.maps.LatLng(50.173160176270116, 12.337303161621094),
            new google.maps.LatLng(50.17491924598287, 12.333183288574219),
            new google.maps.LatLng(50.175578880429114, 12.329063415527344),
            new google.maps.LatLng(50.17689812200107, 12.327346801757812),
            new google.maps.LatLng(50.17931663694048, 12.327003479003906),
            new google.maps.LatLng(50.18151518064115, 12.323570251464842),
            new google.maps.LatLng(50.18261441454758, 12.327003479003906),
            new google.maps.LatLng(50.18591196449336, 12.329406738281248),
            new google.maps.LatLng(50.188330023098274, 12.335243225097654),
            new google.maps.LatLng(50.1920667819548, 12.337646484375),
            new google.maps.LatLng(50.198001033269506, 12.333183288574219),
            new google.maps.LatLng(50.20041847975968, 12.332839965820312),
            new google.maps.LatLng(50.20129752085916, 12.327346801757812),
            new google.maps.LatLng(50.20679116099066, 12.323570251464842),
            new google.maps.LatLng(50.21206446065373, 12.327346801757812),
            new google.maps.LatLng(50.21821590712335, 12.326316833496094),
            new google.maps.LatLng(50.21711749270724, 12.333869934082031),
            new google.maps.LatLng(50.221291332946564, 12.33489990234375),
            new google.maps.LatLng(50.22546480800649, 12.329063415527344),
            new google.maps.LatLng(50.23359105358706, 12.331809997558594),
            new google.maps.LatLng(50.23403027065588, 12.333869934082031),
            new google.maps.LatLng(50.23468908867292, 12.328033447265625),
            new google.maps.LatLng(50.23886139138097, 12.331809997558594),
            new google.maps.LatLng(50.241935486043715, 12.331466674804688),
            new google.maps.LatLng(50.24237462624092, 12.334556579589844),
            new google.maps.LatLng(50.241935486043715, 12.337989807128906),
            new google.maps.LatLng(50.23798304220771, 12.346916198730467),
            new google.maps.LatLng(50.2360066973968, 12.348976135253906),
            new google.maps.LatLng(50.23776345238573, 12.350349426269531),
            new google.maps.LatLng(50.23776345238573, 12.355499267578125),
            new google.maps.LatLng(50.23886139138097, 12.351722717285156),
            new google.maps.LatLng(50.24259419482237, 12.356529235839844),
            new google.maps.LatLng(50.241935486043715, 12.359275817871094),
            new google.maps.LatLng(50.243692022558044, 12.35858917236328),
            new google.maps.LatLng(50.25313229730662, 12.350006103515625),
            new google.maps.LatLng(50.25840047471556, 12.351722717285156),
            new google.maps.LatLng(50.2612538275847, 12.352066040039062),
            new google.maps.LatLng(50.27025174404439, 12.361679077148438),
            new google.maps.LatLng(50.27376266493864, 12.359962463378906),
            new google.maps.LatLng(50.281222512297234, 12.366485595703123),
            new google.maps.LatLng(50.28166129044452, 12.368202209472656),
            new google.maps.LatLng(50.28582948111449, 12.371978759765625),
            new google.maps.LatLng(50.28933925329178, 12.382621765136719),
            new google.maps.LatLng(50.28955860545818, 12.393951416015625),
            new google.maps.LatLng(50.29175207151025, 12.39532470703125),
            new google.maps.LatLng(50.29350677155152, 12.399101257324219),
            new google.maps.LatLng(50.29877048341423, 12.40081787109375),
            new google.maps.LatLng(50.30118282338591, 12.40253448486328),
            new google.maps.LatLng(50.307980577843814, 12.398757934570312),
            new google.maps.LatLng(50.310830959917155, 12.398414611816406),
            new google.maps.LatLng(50.318504216276764, 12.40081787109375),
            new google.maps.LatLng(50.3204771391723, 12.397727966308594),
            new google.maps.LatLng(50.32420354789449, 12.404251098632812),
            new google.maps.LatLng(50.32288837817617, 12.408714294433594),
            new google.maps.LatLng(50.32420354789449, 12.416267395019531),
            new google.maps.LatLng(50.32223077966974, 12.420043945312498),
            new google.maps.LatLng(50.32398435546869, 12.423820495605469),
            new google.maps.LatLng(50.32288837817617, 12.430343627929688),
            new google.maps.LatLng(50.327272135711645, 12.436866760253906),
            new google.maps.LatLng(50.33034052539615, 12.437553405761717),
            new google.maps.LatLng(50.33231295699761, 12.435493469238281),
            new google.maps.LatLng(50.33822976053448, 12.440643310546875),
            new google.maps.LatLng(50.34173566676249, 12.441329956054688),
            new google.maps.LatLng(50.34852762372797, 12.454032897949219),
            new google.maps.LatLng(50.34787038002178, 12.457122802734373),
            new google.maps.LatLng(50.35137557467179, 12.459526062011719),
            new google.maps.LatLng(50.3544424077391, 12.469482421875),
            new google.maps.LatLng(50.35071837038416, 12.4749755859375),
            new google.maps.LatLng(50.34896578114507, 12.47943878173828),
            new google.maps.LatLng(50.34743221249725, 12.480125427246094),
            new google.maps.LatLng(50.34765129676488, 12.484245300292969),
            new google.maps.LatLng(50.349184858337516, 12.485275268554686),
            new google.maps.LatLng(50.35049930026682, 12.48870849609375),
            new google.maps.LatLng(50.35531860937294, 12.491798400878906),
            new google.maps.LatLng(50.35772808048406, 12.490768432617188),
            new google.maps.LatLng(50.359918402645654, 12.489395141601562),
            new google.maps.LatLng(50.362327640291824, 12.487678527832031),
            new google.maps.LatLng(50.36780272560862, 12.487335205078123),
            new google.maps.LatLng(50.37043054220368, 12.4859619140625),
            new google.maps.LatLng(50.39648184677813, 12.513084411621094),
            new google.maps.LatLng(50.397357272304696, 12.516860961914062),
            new google.maps.LatLng(50.396700704675375, 12.526130676269531),
            new google.maps.LatLng(50.39845153147863, 12.533340454101562),
            new google.maps.LatLng(50.399326920630486, 12.537460327148438),
            new google.maps.LatLng(50.39845153147863, 12.543983459472656),
            new google.maps.LatLng(50.40020229361594, 12.54638671875),
            new google.maps.LatLng(50.398670380282184, 12.55359649658203),
            new google.maps.LatLng(50.403484798331135, 12.576942443847654),
            new google.maps.LatLng(50.40698588612208, 12.580032348632812),
            new google.maps.LatLng(50.40764231128779, 12.592048645019531),
            new google.maps.LatLng(50.40545419203986, 12.595138549804688),
            new google.maps.LatLng(50.40807992301321, 12.606468200683594),
            new google.maps.LatLng(50.41179945951055, 12.609214782714844),
            new google.maps.LatLng(50.41464361393782, 12.616081237792969),
            new google.maps.LatLng(50.41617501098541, 12.616424560546875),
            new google.maps.LatLng(50.41617501098541, 12.62054443359375),
            new google.maps.LatLng(50.41661254390643, 12.626724243164062),
            new google.maps.LatLng(50.413330948495485, 12.63702392578125),
            new google.maps.LatLng(50.410486715264035, 12.643547058105469),
            new google.maps.LatLng(50.41114309193372, 12.651100158691406),
            new google.maps.LatLng(50.41201824668217, 12.659683227539062),
            new google.maps.LatLng(50.41617501098541, 12.671699523925781),
            new google.maps.LatLng(50.41573747402326, 12.67547607421875),
            new google.maps.LatLng(50.40961153222655, 12.681312561035156),
            new google.maps.LatLng(50.40742350390956, 12.688179016113281),
            new google.maps.LatLng(50.40370362389581, 12.695388793945312),
            new google.maps.LatLng(50.4006399740463, 12.696762084960936),
            new google.maps.LatLng(50.39757612616029, 12.706718444824219),
            new google.maps.LatLng(50.40217182372535, 12.708778381347656),
            new google.maps.LatLng(50.403484798331135, 12.708435058593748),
            new google.maps.LatLng(50.40501655606602, 12.706375122070312),
            new google.maps.LatLng(50.411580671328586, 12.710838317871094),
            new google.maps.LatLng(50.41464361393782, 12.717361450195312),
            new google.maps.LatLng(50.417706358529024, 12.720794677734375),
            new google.maps.LatLng(50.42317505279245, 12.730751037597656),
            new google.maps.LatLng(50.42656532614573, 12.731437683105469),
            new google.maps.LatLng(50.43203299755432, 12.734184265136719),
            new google.maps.LatLng(50.44941599659011, 12.794952392578125),
            new google.maps.LatLng(50.43607866792481, 12.805423736572266),
            new google.maps.LatLng(50.43126756156562, 12.809886932373045),
            new google.maps.LatLng(50.43607866792481, 12.811603546142578),
            new google.maps.LatLng(50.4385933698494, 12.809200286865234),
            new google.maps.LatLng(50.440889285370865, 12.806625366210938),
            new google.maps.LatLng(50.442747802082984, 12.807483673095703),
            new google.maps.LatLng(50.4436223729301, 12.806625366210938),
            new google.maps.LatLng(50.445699413919534, 12.808685302734375),
            new google.maps.LatLng(50.44952530342606, 12.817096710205078),
            new google.maps.LatLng(50.45302298885006, 12.818470001220703),
            new google.maps.LatLng(50.45378807306885, 12.817611694335936),
            new google.maps.LatLng(50.456629706127664, 12.819328308105469),
            new google.maps.LatLng(50.45859689056161, 12.818470001220703),
            new google.maps.LatLng(50.45968973545269, 12.819156646728516),
            new google.maps.LatLng(50.45728544336237, 12.82602310180664),
            new google.maps.LatLng(50.45641112502938, 12.830142974853516),
            new google.maps.LatLng(50.454006666287384, 12.8375244140625),
            new google.maps.LatLng(50.43914002650341, 12.869796752929688),
            new google.maps.LatLng(50.43531329734444, 12.8814697265625),
            new google.maps.LatLng(50.43192365031358, 12.887821197509764),
            new google.maps.LatLng(50.42962729991966, 12.894859313964844),
            new google.maps.LatLng(50.42372188749147, 12.90121078491211),
            new google.maps.LatLng(50.42197199422933, 12.906017303466797),
            new google.maps.LatLng(50.42361252105679, 12.909622192382812),
            new google.maps.LatLng(50.42361252105679, 12.912540435791016),
            new google.maps.LatLng(50.415846858642674, 12.92593002319336),
            new google.maps.LatLng(50.412237032843514, 12.9364013671875),
            new google.maps.LatLng(50.407314099841564, 12.93691635131836),
            new google.maps.LatLng(50.406438858204524, 12.937431335449217),
            new google.maps.LatLng(50.404469505415435, 12.942924499511719),
            new google.maps.LatLng(50.404469505415435, 12.948417663574219),
            new google.maps.LatLng(50.40698588612208, 12.94790267944336),
            new google.maps.LatLng(50.40676707571281, 12.945671081542969),
            new google.maps.LatLng(50.406001231323884, 12.944297790527342),
            new google.maps.LatLng(50.40687648104374, 12.941379547119139),
            new google.maps.LatLng(50.40786111765567, 12.940521240234375),
            new google.maps.LatLng(50.409830329501425, 12.941036224365234),
            new google.maps.LatLng(50.410814904735474, 12.941551208496094),
            new google.maps.LatLng(50.41256521019116, 12.94412612915039),
            new google.maps.LatLng(50.413330948495485, 12.947731018066406),
            new google.maps.LatLng(50.414096674423575, 12.953052520751951),
            new google.maps.LatLng(50.41442483888985, 12.961978912353516),
            new google.maps.LatLng(50.41639377795106, 12.9693603515625),
            new google.maps.LatLng(50.41737821679422, 12.976741790771484),
            new google.maps.LatLng(50.419565785422996, 12.981376647949217),
            new google.maps.LatLng(50.41945640939095, 12.98257827758789),
            new google.maps.LatLng(50.4218626237537, 12.987213134765623),
            new google.maps.LatLng(50.42754955359477, 12.990474700927734),
            new google.maps.LatLng(50.43028341139683, 12.99356460571289),
            new google.maps.LatLng(50.43520395767996, 12.998027801513672),
            new google.maps.LatLng(50.4389213645994, 13.007125854492188),
            new google.maps.LatLng(50.4436223729301, 13.015537261962889),
            new google.maps.LatLng(50.45236719252894, 13.022575378417969),
            new google.maps.LatLng(50.45389736980437, 13.02377700805664),
            new google.maps.LatLng(50.46078255509402, 13.019142150878906),
            new google.maps.LatLng(50.465481391834906, 13.019828796386719),
            new google.maps.LatLng(50.46701114491417, 13.018798828125),
            new google.maps.LatLng(50.47334816620179, 13.02103042602539),
            new google.maps.LatLng(50.47990281170563, 13.02154541015625),
            new google.maps.LatLng(50.48743953044969, 13.023090362548828),
            new google.maps.LatLng(50.49388301785976, 13.028068542480467),
            new google.maps.LatLng(50.50141750701033, 13.032703399658203),
            new google.maps.LatLng(50.50305528040356, 13.031501770019531),
            new google.maps.LatLng(50.505675599698684, 13.031673431396484),
            new google.maps.LatLng(50.50862328511521, 13.030643463134766),
            new google.maps.LatLng(50.51004247542858, 13.032188415527344),
            new google.maps.LatLng(50.50927830132975, 13.036651611328125),
            new google.maps.LatLng(50.51113413125767, 13.04300308227539),
            new google.maps.LatLng(50.50862328511521, 13.047637939453123),
            new google.maps.LatLng(50.507094878609884, 13.050727844238281),
            new google.maps.LatLng(50.50327364589809, 13.053302764892578),
            new google.maps.LatLng(50.501526693670186, 13.055877685546875),
            new google.maps.LatLng(50.50076238175022, 13.067207336425781),
            new google.maps.LatLng(50.500980757846634, 13.072528839111328),
            new google.maps.LatLng(50.50010724740271, 13.079910278320312),
            new google.maps.LatLng(50.50021643709167, 13.085403442382812),
            new google.maps.LatLng(50.50141750701033, 13.089523315429686),
            new google.maps.LatLng(50.502400177861745, 13.092784881591797),
            new google.maps.LatLng(50.502618546385385, 13.09844970703125),
            new google.maps.LatLng(50.503382828266744, 13.102226257324217),
            new google.maps.LatLng(50.50578477651406, 13.108062744140623),
            new google.maps.LatLng(50.50829577360035, 13.112354278564453),
            new google.maps.LatLng(50.513208207794165, 13.119392395019531),
            new google.maps.LatLng(50.517465237320025, 13.127117156982422),
            new google.maps.LatLng(50.5185567215141, 13.132610321044922),
            new google.maps.LatLng(50.51659203179206, 13.134326934814451),
            new google.maps.LatLng(50.5142997904249, 13.134326934814451),
            new google.maps.LatLng(50.51309904814286, 13.137588500976562),
            new google.maps.LatLng(50.51135245939455, 13.138790130615234),
            new google.maps.LatLng(50.50633065680465, 13.137073516845703),
            new google.maps.LatLng(50.50578477651406, 13.142051696777344),
            new google.maps.LatLng(50.50731322542535, 13.146858215332031),
            new google.maps.LatLng(50.50764074375543, 13.15114974975586),
            new google.maps.LatLng(50.508404944357714, 13.153724670410156),
            new google.maps.LatLng(50.506221481251366, 13.166084289550781),
            new google.maps.LatLng(50.50578477651406, 13.170719146728516),
            new google.maps.LatLng(50.50305528040356, 13.17861557006836),
            new google.maps.LatLng(50.503928736323594, 13.188915252685545),
            new google.maps.LatLng(50.50305528040356, 13.195266723632812),
            new google.maps.LatLng(50.50512971183553, 13.196640014648438),
            new google.maps.LatLng(50.5064398321055, 13.197154998779297),
            new google.maps.LatLng(50.50829577360035, 13.195438385009766),
            new google.maps.LatLng(50.50993330845742, 13.194923400878906),
            new google.maps.LatLng(50.51113413125767, 13.196640014648438),
            new google.maps.LatLng(50.51200743774741, 13.195438385009766),
            new google.maps.LatLng(50.51397231828594, 13.194580078125),
            new google.maps.LatLng(50.51659203179206, 13.195438385009766),
            new google.maps.LatLng(50.517465237320025, 13.198356628417969),
            new google.maps.LatLng(50.51997561323307, 13.204364776611328),
            new google.maps.LatLng(50.52161274298287, 13.207454681396483),
            new google.maps.LatLng(50.526414662646694, 13.209514617919922),
            new google.maps.LatLng(50.52826981892778, 13.209171295166016),
            new google.maps.LatLng(50.530452262348376, 13.209857940673828),
            new google.maps.LatLng(50.53252549009238, 13.211917877197266),
            new google.maps.LatLng(50.53383485014711, 13.215179443359373),
            new google.maps.LatLng(50.539399224949975, 13.219127655029295),
            new google.maps.LatLng(50.541799340844854, 13.222045898437498),
            new google.maps.LatLng(50.543872069915494, 13.22101593017578),
            new google.maps.LatLng(50.54649012379044, 13.222389221191406),
            new google.maps.LatLng(50.54747185651959, 13.226680755615234),
            new google.maps.LatLng(50.55074415132771, 13.229084014892578),
            new google.maps.LatLng(50.55521592028324, 13.228397369384766),
            new google.maps.LatLng(50.556197471327174, 13.227195739746094),
            new google.maps.LatLng(50.5583786226931, 13.223419189453125),
            new google.maps.LatLng(50.56175920784522, 13.223934173583984),
            new google.maps.LatLng(50.56284966745821, 13.222904205322266),
            new google.maps.LatLng(50.56383105953649, 13.224449157714844),
            new google.maps.LatLng(50.56590282014059, 13.22530746459961),
            new google.maps.LatLng(50.56819255483589, 13.229255676269531),
            new google.maps.LatLng(50.57026412368183, 13.235778808593748),
            new google.maps.LatLng(50.57146341138278, 13.23629379272461),
            new google.maps.LatLng(50.57909452693096, 13.233375549316406),
            new google.maps.LatLng(50.579421547113654, 13.235607147216797),
            new google.maps.LatLng(50.581056613967924, 13.237838745117188),
            new google.maps.LatLng(50.582909621113515, 13.23904037475586),
            new google.maps.LatLng(50.58454456686979, 13.239383697509766),
            new google.maps.LatLng(50.585634499171874, 13.243503570556639),
            new google.maps.LatLng(50.58661541667374, 13.246421813964842),
            new google.maps.LatLng(50.58792327488902, 13.247795104980469),
            new google.maps.LatLng(50.58944906355908, 13.248481750488281),
            new google.maps.LatLng(50.59097480278334, 13.248138427734375),
            new google.maps.LatLng(50.593372293093466, 13.250713348388672),
            new google.maps.LatLng(50.59457099246182, 13.252601623535156),
            new google.maps.LatLng(50.59500687557325, 13.256034851074219),
            new google.maps.LatLng(50.59217356320074, 13.260498046875),
            new google.maps.LatLng(50.59304536978631, 13.278694152832031),
            new google.maps.LatLng(50.59108378226446, 13.282127380371094),
            new google.maps.LatLng(50.58759631374095, 13.284530639648438),
            new google.maps.LatLng(50.58596147394302, 13.284015655517578),
            new google.maps.LatLng(50.57909452693096, 13.286933898925781),
            new google.maps.LatLng(50.5780044432562, 13.289165496826172),
            new google.maps.LatLng(50.57702334637774, 13.29071044921875),
            new google.maps.LatLng(50.57495207474565, 13.291053771972656),
            new google.maps.LatLng(50.5763692704388, 13.29517364501953),
            new google.maps.LatLng(50.57778642349371, 13.297061920166014),
            new google.maps.LatLng(50.578222462009485, 13.299636840820312),
            new google.maps.LatLng(50.5787675044776, 13.300495147705078),
            new google.maps.LatLng(50.579312540638384, 13.305130004882812),
            new google.maps.LatLng(50.57887651221436, 13.309249877929688),
            new google.maps.LatLng(50.579312540638384, 13.31216812133789),
            new google.maps.LatLng(50.580947611277026, 13.319377899169922),
            new google.maps.LatLng(50.58083860833379, 13.322982788085938),
            new google.maps.LatLng(50.581492622208735, 13.323497772216795),
            new google.maps.LatLng(50.582364626580485, 13.324871063232422),
            new google.maps.LatLng(50.58737833838084, 13.324527740478516),
            new google.maps.LatLng(50.58944906355908, 13.321094512939453),
            new google.maps.LatLng(50.59369921413024, 13.321266174316406),
            new google.maps.LatLng(50.59620553331784, 13.322639465332031),
            new google.maps.LatLng(50.597731053574094, 13.322639465332031),
            new google.maps.LatLng(50.599147563826136, 13.321094512939453),
            new google.maps.LatLng(50.60067298872855, 13.3209228515625),
            new google.maps.LatLng(50.601762547673935, 13.319549560546873),
            new google.maps.LatLng(50.60241627093303, 13.319549560546873),
            new google.maps.LatLng(50.60274312915715, 13.321952819824219),
            new google.maps.LatLng(50.60503107315905, 13.32590103149414),
            new google.maps.LatLng(50.606229475621554, 13.32590103149414),
            new google.maps.LatLng(50.607209964025145, 13.324871063232422),
            new google.maps.LatLng(50.60840831099387, 13.324871063232422),
            new google.maps.LatLng(50.60808149212023, 13.328819274902344),
            new google.maps.LatLng(50.60742784756236, 13.333282470703125),
            new google.maps.LatLng(50.606883136827484, 13.334484100341797),
            new google.maps.LatLng(50.6106959795449, 13.336372375488281),
            new google.maps.LatLng(50.61113171332364, 13.338603973388672),
            new google.maps.LatLng(50.61167637487174, 13.33791732788086),
            new google.maps.LatLng(50.61287460808086, 13.33740234375),
            new google.maps.LatLng(50.61287460808086, 13.341178894042969),
            new google.maps.LatLng(50.614399588024355, 13.348731994628904),
            new google.maps.LatLng(50.61363710423228, 13.351650238037108),
            new google.maps.LatLng(50.61527098293855, 13.353023529052734),
            new google.maps.LatLng(50.61603344024642, 13.356285095214844),
            new google.maps.LatLng(50.61614236171005, 13.35886001586914),
            new google.maps.LatLng(50.61962771537123, 13.360233306884766),
            new google.maps.LatLng(50.6190831458868, 13.363838195800781),
            new google.maps.LatLng(50.618211821596134, 13.364009857177734),
            new google.maps.LatLng(50.61788507082542, 13.365554809570312),
            new google.maps.LatLng(50.6190831458868, 13.367786407470703),
            new google.maps.LatLng(50.622677187958196, 13.368988037109375),
            new google.maps.LatLng(50.62496416263277, 13.370189666748045),
            new google.maps.LatLng(50.625508664018554, 13.372249603271484),
            new google.maps.LatLng(50.626924338112914, 13.37705612182617),
            new google.maps.LatLng(50.62855775525792, 13.377571105957031),
            new google.maps.LatLng(50.633131021375156, 13.374137878417967),
            new google.maps.LatLng(50.63465534455182, 13.375167846679688),
            new google.maps.LatLng(50.63530861078151, 13.374481201171875),
            new google.maps.LatLng(50.63672398979986, 13.375682830810547),
            new google.maps.LatLng(50.63737722727953, 13.373451232910156),
            new google.maps.LatLng(50.63857480574576, 13.374481201171875),
            new google.maps.LatLng(50.63999008640991, 13.37362289428711),
            new google.maps.LatLng(50.640969871134025, 13.374481201171875),
            new google.maps.LatLng(50.64728354936779, 13.37207794189453),
            new google.maps.LatLng(50.64902510441994, 13.371906280517578),
            new google.maps.LatLng(50.650875435929095, 13.369503021240234),
            new google.maps.LatLng(50.65044007036566, 13.374996185302733),
            new google.maps.LatLng(50.64880741356882, 13.376712799072266),
            new google.maps.LatLng(50.64706585044717, 13.378429412841797),
            new google.maps.LatLng(50.6446710957461, 13.383407592773438),
            new google.maps.LatLng(50.64565078287611, 13.383407592773438),
            new google.maps.LatLng(50.646848150517854, 13.387012481689453),
            new google.maps.LatLng(50.646848150517854, 13.390274047851562),
            new google.maps.LatLng(50.64652159873256, 13.391647338867186),
            new google.maps.LatLng(50.6446710957461, 13.39181900024414),
            new google.maps.LatLng(50.64380024559357, 13.39181900024414),
            new google.maps.LatLng(50.641623049601776, 13.392505645751953),
            new google.maps.LatLng(50.641623049601776, 13.394908905029297),
            new google.maps.LatLng(50.64064327849566, 13.395938873291016),
            new google.maps.LatLng(50.63966348696253, 13.397140502929688),
            new google.maps.LatLng(50.63824819646304, 13.397655487060547),
            new google.maps.LatLng(50.63737722727953, 13.400230407714844),
            new google.maps.LatLng(50.63509085638038, 13.402462005615234),
            new google.maps.LatLng(50.63552636417384, 13.403320312499998),
            new google.maps.LatLng(50.634546465964206, 13.405380249023438),
            new google.maps.LatLng(50.63117110465768, 13.40606689453125),
            new google.maps.LatLng(50.62801328918144, 13.407440185546875),
            new google.maps.LatLng(50.62343952520824, 13.411216735839844),
            new google.maps.LatLng(50.620499013430766, 13.413448333740234),
            new google.maps.LatLng(50.6190831458868, 13.412075042724608),
            new google.maps.LatLng(50.61777615339741, 13.413448333740234),
            new google.maps.LatLng(50.617558317784706, 13.415164947509766),
            new google.maps.LatLng(50.616686965244845, 13.415164947509766),
            new google.maps.LatLng(50.61581559656247, 13.41756820678711),
            new google.maps.LatLng(50.61614236171005, 13.421688079833984),
            new google.maps.LatLng(50.61646912458761, 13.424606323242188),
            new google.maps.LatLng(50.61548882914481, 13.427009582519531),
            new google.maps.LatLng(50.61287460808086, 13.425121307373047),
            new google.maps.LatLng(50.61189423772533, 13.42752456665039),
            new google.maps.LatLng(50.610151306646124, 13.432846069335938),
            new google.maps.LatLng(50.61036917656235, 13.437309265136719),
            new google.maps.LatLng(50.61113171332364, 13.441085815429688),
            new google.maps.LatLng(50.61004237130965, 13.443660736083984),
            new google.maps.LatLng(50.60819043199701, 13.448295593261719),
            new google.maps.LatLng(50.60644736369918, 13.450870513916016),
            new google.maps.LatLng(50.60568475101319, 13.452587127685547),
            new google.maps.LatLng(50.60426843751862, 13.459625244140625),
            new google.maps.LatLng(50.60274312915715, 13.462200164794922),
            new google.maps.LatLng(50.60165359291455, 13.462028503417969),
            new google.maps.LatLng(50.60208941043862, 13.465633392333983),
            new google.maps.LatLng(50.60339683879464, 13.46597671508789),
            new google.maps.LatLng(50.60470423082665, 13.46700668334961),
            new google.maps.LatLng(50.60557580533481, 13.466320037841797),
            new google.maps.LatLng(50.60808149212023, 13.470954895019531),
            new google.maps.LatLng(50.609170879537295, 13.470439910888672),
            new google.maps.LatLng(50.60993343572095, 13.473358154296875),
            new google.maps.LatLng(50.61189423772533, 13.47541809082031),
            new google.maps.LatLng(50.61232996040569, 13.477306365966797),
            new google.maps.LatLng(50.614508513271424, 13.477134704589844),
            new google.maps.LatLng(50.616686965244845, 13.480224609375),
            new google.maps.LatLng(50.61897423123324, 13.482284545898436),
            new google.maps.LatLng(50.61962771537123, 13.485202789306639),
            new google.maps.LatLng(50.620716835423465, 13.485889434814453),
            new google.maps.LatLng(50.62158811330541, 13.48794937133789),
            new google.maps.LatLng(50.623548429520795, 13.492584228515625),
            new google.maps.LatLng(50.627251026081666, 13.49618911743164),
            new google.maps.LatLng(50.63095333108949, 13.495845794677733),
            new google.maps.LatLng(50.63193330420196, 13.49790573120117),
            new google.maps.LatLng(50.63193330420196, 13.500480651855469),
            new google.maps.LatLng(50.63345766621711, 13.502025604248047),
            new google.maps.LatLng(50.63421982868815, 13.502540588378906),
            new google.maps.LatLng(50.63498197880154, 13.507003784179688),
            new google.maps.LatLng(50.63563524049171, 13.50992202758789),
            new google.maps.LatLng(50.63661511600392, 13.51318359375),
            new google.maps.LatLng(50.63607074324129, 13.516960144042969),
            new google.maps.LatLng(50.63813932619779, 13.52142333984375),
            new google.maps.LatLng(50.63857480574576, 13.522968292236328),
            new google.maps.LatLng(50.64086100717342, 13.524513244628906),
            new google.maps.LatLng(50.6446710957461, 13.522968292236328),
            new google.maps.LatLng(50.64924279426237, 13.526229858398438),
            new google.maps.LatLng(50.64880741356882, 13.520050048828125),
            new google.maps.LatLng(50.6480454876465, 13.517475128173828),
            new google.maps.LatLng(50.65185499369506, 13.512496948242186),
            new google.maps.LatLng(50.654031715602784, 13.51266860961914),
            new google.maps.LatLng(50.656970130182046, 13.516101837158203),
            new google.maps.LatLng(50.6607789125291, 13.521080017089844),
            new google.maps.LatLng(50.6686131506577, 13.531723022460938),
            new google.maps.LatLng(50.66828675016557, 13.534812927246092),
            new google.maps.LatLng(50.6677427443026, 13.539104461669922),
            new google.maps.LatLng(50.6699187299341, 13.540821075439451),
            new google.maps.LatLng(50.67133306651187, 13.539962768554688),
            new google.maps.LatLng(50.67274736047951, 13.538761138916014),
            new google.maps.LatLng(50.67546703681043, 13.540477752685547),
            new google.maps.LatLng(50.6769899867258, 13.544425964355469),
            new google.maps.LatLng(50.687866763348886, 13.540821075439451),
            new google.maps.LatLng(50.69015056613803, 13.540306091308594),
            new google.maps.LatLng(50.69482657734564, 13.533954620361326),
            new google.maps.LatLng(50.696348899014865, 13.533439636230469),
            new google.maps.LatLng(50.69689257335114, 13.530349731445312),
            new google.maps.LatLng(50.699828305866674, 13.526573181152344),
            new google.maps.LatLng(50.70439463562754, 13.525028228759766),
            new google.maps.LatLng(50.70602535992328, 13.53240966796875),
            new google.maps.LatLng(50.70559050565664, 13.537559509277344),
            new google.maps.LatLng(50.7070037672772, 13.540477752685547),
            new google.maps.LatLng(50.70809086261287, 13.539619445800781),
            new google.maps.LatLng(50.70885181434989, 13.542022705078125),
            new google.maps.LatLng(50.711351997381136, 13.546314239501953),
            new google.maps.LatLng(50.71352596119629, 13.553180694580078),
            new google.maps.LatLng(50.71461290529534, 13.55833053588867),
            new google.maps.LatLng(50.713960741860575, 13.562278747558594),
            new google.maps.LatLng(50.712656387768995, 13.567428588867188),
            new google.maps.LatLng(50.71363465674044, 13.57412338256836),
            new google.maps.LatLng(50.712221595005985, 13.579444885253906),
            new google.maps.LatLng(50.712656387768995, 13.583393096923828),
            new google.maps.LatLng(50.71298247969468, 13.588714599609375),
            new google.maps.LatLng(50.712438991891624, 13.593177795410156),
            new google.maps.LatLng(50.71059108622623, 13.599700927734375),
            new google.maps.LatLng(50.71026497766465, 13.603649139404297),
            new google.maps.LatLng(50.712438991891624, 13.608283996582031),
            new google.maps.LatLng(50.71374335203254, 13.613433837890625),
            new google.maps.LatLng(50.71363465674044, 13.618240356445312),
            new google.maps.LatLng(50.714069436396514, 13.621158599853516),
            new google.maps.LatLng(50.71515636789281, 13.624076843261719),
            new google.maps.LatLng(50.715482442426655, 13.625965118408203),
            new google.maps.LatLng(50.71624327418379, 13.626823425292969),
            new google.maps.LatLng(50.721134040582434, 13.624935150146484),
            new google.maps.LatLng(50.72319887759669, 13.62527847290039),
            new google.maps.LatLng(50.72276418262858, 13.6285400390625),
            new google.maps.LatLng(50.725046286222316, 13.63523483276367),
            new google.maps.LatLng(50.72721961488165, 13.64004135131836),
            new google.maps.LatLng(50.72939284272828, 13.642616271972656),
            new google.maps.LatLng(50.729936133938146, 13.649139404296875),
            new google.maps.LatLng(50.73037076236953, 13.65325927734375),
            new google.maps.LatLng(50.73102269745584, 13.656177520751953),
            new google.maps.LatLng(50.730696731046805, 13.659095764160156),
            new google.maps.LatLng(50.73210923577103, 13.665618896484375),
            new google.maps.LatLng(50.730153448657894, 13.669395446777342),
            new google.maps.LatLng(50.72754560548544, 13.674545288085938),
            new google.maps.LatLng(50.72656762686925, 13.677635192871094),
            new google.maps.LatLng(50.72569829540556, 13.678836822509766),
            new google.maps.LatLng(50.7245029383053, 13.682098388671873),
            new google.maps.LatLng(50.72156875067298, 13.684158325195312),
            new google.maps.LatLng(50.71972120493738, 13.687763214111328),
            new google.maps.LatLng(50.71841701115054, 13.694286346435547),
            new google.maps.LatLng(50.718525695352376, 13.698921203613281),
            new google.maps.LatLng(50.717764900646586, 13.703727722167969),
            new google.maps.LatLng(50.716678029642736, 13.706989288330078),
            new google.maps.LatLng(50.71917779527035, 13.710594177246094),
            new google.maps.LatLng(50.71972120493738, 13.712825775146484),
            new google.maps.LatLng(50.721786104206025, 13.711624145507812),
            new google.maps.LatLng(50.72352489617636, 13.711109161376953),
            new google.maps.LatLng(50.72526362362486, 13.708534240722656),
            new google.maps.LatLng(50.726024296594694, 13.710250854492186),
            new google.maps.LatLng(50.72472027822822, 13.713340759277344),
            new google.maps.LatLng(50.729175524480155, 13.720722198486328),
            new google.maps.LatLng(50.733630347072456, 13.728275299072266),
            new google.maps.LatLng(50.7333043988091, 13.731021881103516),
            new google.maps.LatLng(50.73037076236953, 13.73342514038086),
            new google.maps.LatLng(50.72743694220288, 13.740463256835936),
            new google.maps.LatLng(50.72830624140646, 13.74664306640625),
            new google.maps.LatLng(50.7295015014743, 13.751106262207031),
            new google.maps.LatLng(50.73591192140729, 13.758316040039062),
            new google.maps.LatLng(50.73493411744421, 13.7603759765625),
            new google.maps.LatLng(50.73439088419965, 13.760204315185547),
            new google.maps.LatLng(50.735260054366734, 13.763980865478514),
            new google.maps.LatLng(50.73428223679467, 13.767585754394531),
            new google.maps.LatLng(50.732869797596265, 13.769474029541016),
            new google.maps.LatLng(50.73352169790337, 13.773078918457031),
            new google.maps.LatLng(50.736020565031986, 13.775825500488281),
            new google.maps.LatLng(50.736129208404684, 13.777713775634766),
            new google.maps.LatLng(50.735368699503546, 13.780460357666014),
            new google.maps.LatLng(50.73384764465462, 13.784751892089844),
            new google.maps.LatLng(50.73395629306768, 13.787155151367188),
            new google.maps.LatLng(50.735368699503546, 13.789215087890623),
            new google.maps.LatLng(50.734608178253524, 13.79058837890625),
            new google.maps.LatLng(50.73297844827752, 13.79058837890625),
            new google.maps.LatLng(50.734608178253524, 13.79659652709961),
            new google.maps.LatLng(50.73297844827752, 13.80002975463867),
            new google.maps.LatLng(50.7333043988091, 13.804492950439453),
            new google.maps.LatLng(50.7333043988091, 13.807926177978516),
            new google.maps.LatLng(50.73189193012418, 13.809814453125),
            new google.maps.LatLng(50.73037076236953, 13.810501098632812),
            new google.maps.LatLng(50.729175524480155, 13.813591003417967),
            new google.maps.LatLng(50.72830624140646, 13.814964294433594),
            new google.maps.LatLng(50.72732827866829, 13.820457458496092),
            new google.maps.LatLng(50.726024296594694, 13.822517395019531),
            new google.maps.LatLng(50.72613296315368, 13.82406234741211),
            new google.maps.LatLng(50.724068255435036, 13.826637268066406),
            new google.maps.LatLng(50.72482894781161, 13.829898834228516),
            new google.maps.LatLng(50.725480960019276, 13.831958770751953),
            new google.maps.LatLng(50.726458961318414, 13.832817077636719),
            new google.maps.LatLng(50.727002286552334, 13.835220336914062),
            new google.maps.LatLng(50.727002286552334, 13.836936950683592),
            new google.maps.LatLng(50.725480960019276, 13.83899688720703),
            new google.maps.LatLng(50.72558962783843, 13.841743469238281),
            new google.maps.LatLng(50.725154955049604, 13.843975067138672),
            new google.maps.LatLng(50.726241629460624, 13.847236633300781),
            new google.maps.LatLng(50.726241629460624, 13.849639892578123),
            new google.maps.LatLng(50.72732827866829, 13.852729797363281),
            new google.maps.LatLng(50.72743694220288, 13.855133056640625),
            new google.maps.LatLng(50.72852356368707, 13.858394622802733),
            new google.maps.LatLng(50.73178327692273, 13.85976791381836),
            new google.maps.LatLng(50.73297844827752, 13.859596252441406),
            new google.maps.LatLng(50.7372156282707, 13.862171173095703),
            new google.maps.LatLng(50.738519298844096, 13.861312866210936),
            new google.maps.LatLng(50.74047473666116, 13.860969543457031),
            new google.maps.LatLng(50.74297323282792, 13.861827850341797),
            new google.maps.LatLng(50.74210420580331, 13.865604400634766),
            new google.maps.LatLng(50.74253872133164, 13.86800765991211),
            new google.maps.LatLng(50.74199557629119, 13.869895935058594),
            new google.maps.LatLng(50.740583369701355, 13.872814178466797),
            new google.maps.LatLng(50.739388392398745, 13.874702453613281),
            new google.maps.LatLng(50.737976107182085, 13.879680633544922),
            new google.maps.LatLng(50.738302022935336, 13.882770538330076),
            new google.maps.LatLng(50.739388392398745, 13.88568878173828),
            new google.maps.LatLng(50.74025746982474, 13.885860443115234),
            new google.maps.LatLng(50.74329911380408, 13.897018432617188),
            new google.maps.LatLng(50.7461233205929, 13.89942169189453),
            new google.maps.LatLng(50.74829567143423, 13.899765014648438),
            new google.maps.LatLng(50.74992486841667, 13.900279998779295),
            new google.maps.LatLng(50.75187982995427, 13.900623321533203),
            new google.maps.LatLng(50.752965884419, 13.902511596679688),
            new google.maps.LatLng(50.75524651677381, 13.899078369140625),
            new google.maps.LatLng(50.75828718705439, 13.895473480224608),
            new google.maps.LatLng(50.762413495029136, 13.890151977539062),
            new google.maps.LatLng(50.765453699664356, 13.888435363769531),
            new google.maps.LatLng(50.767733723505344, 13.888778686523438),
            new google.maps.LatLng(50.77066501946006, 13.887405395507812),
            new google.maps.LatLng(50.77348757530155, 13.890495300292969),
            new google.maps.LatLng(50.77533300049491, 13.89272689819336),
            new google.maps.LatLng(50.77837236561751, 13.893756866455078),
            new google.maps.LatLng(50.78076029964647, 13.896160125732422),
            new google.maps.LatLng(50.78488462576344, 13.900623321533203),
            new google.maps.LatLng(50.78618696895818, 13.89942169189453),
            new google.maps.LatLng(50.78824893815769, 13.896331787109375),
            new google.maps.LatLng(50.79096191696835, 13.897361755371092),
            new google.maps.LatLng(50.79302367556273, 13.899593353271484),
            new google.maps.LatLng(50.79356622849899, 13.903026580810547),
            new google.maps.LatLng(50.793891757237795, 13.905086517333984),
            new google.maps.LatLng(50.79215557776516, 13.907489776611328),
            new google.maps.LatLng(50.79117894847138, 13.913497924804688),
            new google.maps.LatLng(50.79020229877231, 13.916072845458984),
            new google.maps.LatLng(50.78900858809565, 13.917789459228516),
            new google.maps.LatLng(50.78955118763657, 13.92019271850586),
            new google.maps.LatLng(50.78835746033317, 13.929462432861328),
            new google.maps.LatLng(50.789768225689485, 13.933238983154297),
            new google.maps.LatLng(50.78965970678899, 13.938560485839844),
            new google.maps.LatLng(50.79139597896673, 13.941650390625),
            new google.maps.LatLng(50.79215557776516, 13.94388198852539),
            new google.maps.LatLng(50.79313218665379, 13.94611358642578),
            new google.maps.LatLng(50.79454280791378, 13.947315216064453),
            new google.maps.LatLng(50.79660440855904, 13.947830200195312),
            new google.maps.LatLng(50.800401855906685, 13.955554962158203),
            new google.maps.LatLng(50.80712800517717, 13.953666687011719),
            new google.maps.LatLng(50.810165303594566, 13.958988189697266),
            new google.maps.LatLng(50.81114153614715, 13.963966369628906),
            new google.maps.LatLng(50.81103306687104, 13.970832824707031),
            new google.maps.LatLng(50.814070111391274, 13.976154327392578),
            new google.maps.LatLng(50.81472088095411, 13.980274200439451),
            new google.maps.LatLng(50.81580547674224, 13.985767364501953),
            new google.maps.LatLng(50.81819149881722, 13.987998962402342),
            new google.maps.LatLng(50.819818262156545, 13.99005889892578),
            new google.maps.LatLng(50.81840840387007, 13.992633819580078),
            new google.maps.LatLng(50.817757685689095, 13.994522094726562),
            new google.maps.LatLng(50.816998503017885, 13.998641967773438),
            new google.maps.LatLng(50.81428703558639, 14.003276824951172),
            new google.maps.LatLng(50.810273774885715, 14.003620147705076),
            new google.maps.LatLng(50.81092459734309, 14.007911682128906),
            new google.maps.LatLng(50.811683878749406, 14.012203216552734),
            new google.maps.LatLng(50.81081612756321, 14.017353057861326),
            new google.maps.LatLng(50.80973141591114, 14.02130126953125),
            new google.maps.LatLng(50.807344961613175, 14.025592803955078),
            new google.maps.LatLng(50.805175351913036, 14.027137756347656),
            new google.maps.LatLng(50.80376505157722, 14.030227661132812),
            new google.maps.LatLng(50.804090509279256, 14.033660888671875),
            new google.maps.LatLng(50.80550079979125, 14.03554916381836),
            new google.maps.LatLng(50.80615168874664, 14.034862518310545),
            new google.maps.LatLng(50.80701952658132, 14.03554916381836),
            new google.maps.LatLng(50.80745343945335, 14.036579132080078),
            new google.maps.LatLng(50.809080576829466, 14.037952423095703),
            new google.maps.LatLng(50.810056832051536, 14.04001235961914),
            new google.maps.LatLng(50.81059918724785, 14.041385650634766),
            new google.maps.LatLng(50.810165303594566, 14.044647216796873),
            new google.maps.LatLng(50.810056832051536, 14.047222137451172),
            new google.maps.LatLng(50.81114153614715, 14.051685333251953),
            new google.maps.LatLng(50.81211774829736, 14.058036804199219),
            new google.maps.LatLng(50.81038224592497, 14.059066772460938),
            new google.maps.LatLng(50.80983988820981, 14.063358306884766),
            new google.maps.LatLng(50.81038224592497, 14.064903259277344),
            new google.maps.LatLng(50.81125000517135, 14.07022476196289),
            new google.maps.LatLng(50.81070765753148, 14.072456359863281),
            new google.maps.LatLng(50.81255161381528, 14.078636169433592),
            new google.maps.LatLng(50.81602239287739, 14.077434539794922),
            new google.maps.LatLng(50.8190591129838, 14.0789794921875),
            new google.maps.LatLng(50.82155341392255, 14.083614349365233),
            new google.maps.LatLng(50.82231252254521, 14.084129333496094),
            new google.maps.LatLng(50.82491508698821, 14.08670425415039),
            new google.maps.LatLng(50.82632474882324, 14.089107513427734),
            new google.maps.LatLng(50.826758482363275, 14.095115661621094),
            new google.maps.LatLng(50.82643318258604, 14.098892211914062),
            new google.maps.LatLng(50.829035517337445, 14.10421371459961),
            new google.maps.LatLng(50.830228205617445, 14.107818603515625),
            new google.maps.LatLng(50.829360798981426, 14.110221862792969),
            new google.maps.LatLng(50.83120401881669, 14.11520004272461),
            new google.maps.LatLng(50.83217981161652, 14.116230010986328),
            new google.maps.LatLng(50.83272190991305, 14.122066497802734),
            new google.maps.LatLng(50.83423975164834, 14.127216339111328),
            new google.maps.LatLng(50.83380608761792, 14.132194519042969),
            new google.maps.LatLng(50.84204501517576, 14.14712905883789),
            new google.maps.LatLng(50.84258699888797, 14.151248931884766),
            new google.maps.LatLng(50.84377934089437, 14.156055450439453),
            new google.maps.LatLng(50.844754870781074, 14.156055450439453),
            new google.maps.LatLng(50.845947157386846, 14.159832000732422),
            new google.maps.LatLng(50.8474645689988, 14.161720275878906),
            new google.maps.LatLng(50.84833163918871, 14.178028106689451),
            new google.maps.LatLng(50.84963221425597, 14.184722900390625),
            new google.maps.LatLng(50.84974059387478, 14.191246032714844),
            new google.maps.LatLng(50.851691383954154, 14.195709228515623),
            new google.maps.LatLng(50.85114950600478, 14.20034408569336),
            new google.maps.LatLng(50.85364209244785, 14.206523895263672),
            new google.maps.LatLng(50.8549425194522, 14.206867218017578),
            new google.maps.LatLng(50.860252220072724, 14.216480255126953),
            new google.maps.LatLng(50.86057728414417, 14.218883514404297),
            new google.maps.LatLng(50.85916865680137, 14.222660064697266),
            new google.maps.LatLng(50.868486478093025, 14.230899810791016),
            new google.maps.LatLng(50.87736917810648, 14.236221313476562),
            new google.maps.LatLng(50.88310953475148, 14.235877990722656),
            new google.maps.LatLng(50.887441411132265, 14.23330307006836),
            new google.maps.LatLng(50.88809115784861, 14.235706329345703),
            new google.maps.LatLng(50.887333119131775, 14.239826202392578),
            new google.maps.LatLng(50.88646677406509, 14.243946075439453),
            new google.maps.LatLng(50.88765799437802, 14.24875259399414),
            new google.maps.LatLng(50.88798286735858, 14.25201416015625),
            new google.maps.LatLng(50.88939062409337, 14.256305694580078),
            new google.maps.LatLng(50.89512949972576, 14.267120361328125),
            new google.maps.LatLng(50.89491295121948, 14.27175521850586),
            new google.maps.LatLng(50.89307224826163, 14.278106689453125),
            new google.maps.LatLng(50.8926391311106, 14.281539916992188),
            new google.maps.LatLng(50.89079833828432, 14.284629821777344),
            new google.maps.LatLng(50.887766285623286, 14.286861419677734),
            new google.maps.LatLng(50.88560041288678, 14.289779663085938),
            new google.maps.LatLng(50.88505892896862, 14.296646118164062),
            new google.maps.LatLng(50.88440913995918, 14.301624298095703),
            new google.maps.LatLng(50.88397594225127, 14.305572509765625),
            new google.maps.LatLng(50.88560041288678, 14.307975769042969),
            new google.maps.LatLng(50.88722482687952, 14.31295394897461),
            new google.maps.LatLng(50.88895747270629, 14.319648742675781),
            new google.maps.LatLng(50.890906622229174, 14.334239959716795),
            new google.maps.LatLng(50.89036519998761, 14.335956573486326),
            new google.maps.LatLng(50.89069005408774, 14.340248107910154),
            new google.maps.LatLng(50.89198944783209, 14.341793060302733),
            new google.maps.LatLng(50.892747410775975, 14.343681335449217),
            new google.maps.LatLng(50.8926391311106, 14.348831176757812),
            new google.maps.LatLng(50.894155023517996, 14.349689483642576),
            new google.maps.LatLng(50.89523777360134, 14.350376129150392),
            new google.maps.LatLng(50.89783627109672, 14.348487854003906),
            new google.maps.LatLng(50.89924373003381, 14.349689483642576),
            new google.maps.LatLng(50.899676785763596, 14.348831176757812),
            new google.maps.LatLng(50.90086766825373, 14.349346160888672),
            new google.maps.LatLng(50.90054288514068, 14.351234436035156),
            new google.maps.LatLng(50.89891893559338, 14.352607727050781),
            new google.maps.LatLng(50.898594138887475, 14.355525970458983),
            new google.maps.LatLng(50.89816107308881, 14.357242584228516),
            new google.maps.LatLng(50.89935199434385, 14.358787536621094),
            new google.maps.LatLng(50.89816107308881, 14.360847473144531),
            new google.maps.LatLng(50.89707839097156, 14.36410903930664),
            new google.maps.LatLng(50.89686185152743, 14.368743896484375),
            new google.maps.LatLng(50.89610395554359, 14.37355041503906),
            new google.maps.LatLng(50.896970121375354, 14.375438690185545),
            new google.maps.LatLng(50.89783627109672, 14.375095367431639),
            new google.maps.LatLng(50.89751146683914, 14.37681198120117),
            new google.maps.LatLng(50.898377606491586, 14.37835693359375),
            new google.maps.LatLng(50.89816107308881, 14.380416870117188),
            new google.maps.LatLng(50.897403198249826, 14.380416870117188),
            new google.maps.LatLng(50.89881067027647, 14.382648468017578),
            new google.maps.LatLng(50.89913546547204, 14.38385009765625),
            new google.maps.LatLng(50.899460258402144, 14.388313293457031),
            new google.maps.LatLng(50.90184200400014, 14.387798309326172),
            new google.maps.LatLng(50.901733745479625, 14.385566711425781),
            new google.maps.LatLng(50.90292457536091, 14.385566711425781),
            new google.maps.LatLng(50.90346585160204, 14.387283325195314),
            new google.maps.LatLng(50.90941947493346, 14.388656616210936),
            new google.maps.LatLng(50.91017715419199, 14.387454986572266),
            new google.maps.LatLng(50.91136776810851, 14.387454986572266),
            new google.maps.LatLng(50.9124501179679, 14.385910034179688),
            new google.maps.LatLng(50.91396536548613, 14.386425018310547),
            new google.maps.LatLng(50.91634636905861, 14.385738372802734),
            new google.maps.LatLng(50.91732038086384, 14.386253356933594),
            new google.maps.LatLng(50.916454593599276, 14.388484954833984),
            new google.maps.LatLng(50.91677926571115, 14.38985824584961),
            new google.maps.LatLng(50.91742860313932, 14.389343261718752),
            new google.maps.LatLng(50.9187272508135, 14.388999938964842),
            new google.maps.LatLng(50.91786148972436, 14.391403198242188),
            new google.maps.LatLng(50.91851081205133, 14.394149780273438),
            new google.maps.LatLng(50.919268343314464, 14.39432144165039),
            new google.maps.LatLng(50.92013407822842, 14.391746520996094),
            new google.maps.LatLng(50.92089158306483, 14.391918182373047),
            new google.maps.LatLng(50.92099979703473, 14.393806457519531),
            new google.maps.LatLng(50.92348864887907, 14.398441314697264),
            new google.maps.LatLng(50.92381327191293, 14.401531219482422),
            new google.maps.LatLng(50.92684297766907, 14.400329589843748),
            new google.maps.LatLng(50.928033165232684, 14.401531219482422),
            new google.maps.LatLng(50.92998067919713, 14.398956298828127),
            new google.maps.LatLng(50.93236086331048, 14.399642944335938),
            new google.maps.LatLng(50.932901797258225, 14.400844573974608),
            new google.maps.LatLng(50.93387546250969, 14.400501251220701),
            new google.maps.LatLng(50.93452456135275, 14.399127960205078),
            new google.maps.LatLng(50.93387546250969, 14.39809799194336),
            new google.maps.LatLng(50.93614726882475, 14.396896362304686),
            new google.maps.LatLng(50.93820261700557, 14.392261505126953),
            new google.maps.LatLng(50.938635310309834, 14.390716552734373),
            new google.maps.LatLng(50.94069054852026, 14.389686584472656),
            new google.maps.LatLng(50.94209671179583, 14.387969970703125),
            new google.maps.LatLng(50.941015051512345, 14.386253356933594),
            new google.maps.LatLng(50.93960885552307, 14.378871917724608),
            new google.maps.LatLng(50.93906799958774, 14.378013610839844),
            new google.maps.LatLng(50.93917617127812, 14.375610351562502),
            new google.maps.LatLng(50.93831079070912, 14.375095367431639),
            new google.maps.LatLng(50.93787809438504, 14.374065399169922),
            new google.maps.LatLng(50.939392513903876, 14.369258880615233),
            new google.maps.LatLng(50.94209671179583, 14.36908721923828),
            new google.maps.LatLng(50.94220487644014, 14.366683959960938),
            new google.maps.LatLng(50.941555884799605, 14.363765716552733),
            new google.maps.LatLng(50.941015051512345, 14.362220764160156),
            new google.maps.LatLng(50.941555884799605, 14.360847473144531),
            new google.maps.LatLng(50.94252936886324, 14.360504150390625),
            new google.maps.LatLng(50.944368116481996, 14.356555938720703),
            new google.maps.LatLng(50.944800752411695, 14.351921081542967),
            new google.maps.LatLng(50.94501706886675, 14.349174499511719),
            new google.maps.LatLng(50.94663941019601, 14.346771240234375),
            new google.maps.LatLng(50.94782909118722, 14.347114562988281),
            new google.maps.LatLng(50.949018741731024, 14.34316635131836),
            new google.maps.LatLng(50.94966762919457, 14.338703155517578),
            new google.maps.LatLng(50.94923503855872, 14.335613250732422),
            new google.maps.LatLng(50.949018741731024, 14.332008361816404),
            new google.maps.LatLng(50.94945133437991, 14.33063507080078),
            new google.maps.LatLng(50.949775776224485, 14.325485229492188),
            new google.maps.LatLng(50.95215494722071, 14.31638717651367),
            new google.maps.LatLng(50.953993314122826, 14.310894012451172),
            new google.maps.LatLng(50.955615342177126, 14.310379028320312),
            new google.maps.LatLng(50.957345443034114, 14.314155578613281),
            new google.maps.LatLng(50.95788608634216, 14.317245483398438),
            new google.maps.LatLng(50.96058920852831, 14.316902160644531),
            new google.maps.LatLng(50.963075942052164, 14.305915832519531),
            new google.maps.LatLng(50.9655625424781, 14.302654266357422),
            new google.maps.LatLng(50.96740037898852, 14.305400848388672),
            new google.maps.LatLng(50.96826521806918, 14.308834075927734),
            new google.maps.LatLng(50.97345391441545, 14.31570053100586),
            new google.maps.LatLng(50.972156794671804, 14.319133758544922),
            new google.maps.LatLng(50.972697265634395, 14.323596954345703),
            new google.maps.LatLng(50.972264889367494, 14.325485229492188),
            new google.maps.LatLng(50.9743186407845, 14.329605102539062),
            new google.maps.LatLng(50.97496717499484, 14.328575134277342),
            new google.maps.LatLng(50.97604804521897, 14.327030181884766),
            new google.maps.LatLng(50.97777738524929, 14.326000213623047),
            new google.maps.LatLng(50.98026319871142, 14.326343536376951),
            new google.maps.LatLng(50.981992381760044, 14.329776763916016),
            new google.maps.LatLng(50.98350536409832, 14.327030181884766),
            new google.maps.LatLng(50.98458603558071, 14.324798583984373),
            new google.maps.LatLng(50.98555861840624, 14.321537017822266),
            new google.maps.LatLng(50.985450554654086, 14.317417144775389),
            new google.maps.LatLng(50.984369903296745, 14.315013885498047),
            new google.maps.LatLng(50.98469410134537, 14.312610626220701),
            new google.maps.LatLng(50.98480216685843, 14.31020736694336),
            new google.maps.LatLng(50.98264080879975, 14.309005737304688),
            new google.maps.LatLng(50.981343945663895, 14.305057525634766),
            new google.maps.LatLng(50.98091164990174, 14.30145263671875),
            new google.maps.LatLng(50.97939858303636, 14.299736022949219),
            new google.maps.LatLng(50.978317790801, 14.293384552001953),
            new google.maps.LatLng(50.97799354822469, 14.2877197265625),
            new google.maps.LatLng(50.97745313889934, 14.286689758300781),
            new google.maps.LatLng(50.97669655527765, 14.285831451416016),
            new google.maps.LatLng(50.97799354822469, 14.28171157836914),
            new google.maps.LatLng(50.981343945663895, 14.278793334960938),
            new google.maps.LatLng(50.98328922678308, 14.27398681640625),
            new google.maps.LatLng(50.984910232119944, 14.265060424804688),
            new google.maps.LatLng(50.98512636188829, 14.263343811035156),
            new google.maps.LatLng(50.98663924209184, 14.263172149658203),
            new google.maps.LatLng(50.987503722928075, 14.258708953857422),
            new google.maps.LatLng(50.992150031592665, 14.258537292480469),
            new google.maps.LatLng(50.99409485990918, 14.262142181396484),
            new google.maps.LatLng(50.99603960672508, 14.262657165527344),
            new google.maps.LatLng(50.99906460644636, 14.266433715820312),
            new google.maps.LatLng(50.99906460644636, 14.268321990966797),
            new google.maps.LatLng(51.00003688590439, 14.26849365234375),
            new google.maps.LatLng(51.001981383697874, 14.264030456542969),
            new google.maps.LatLng(51.004249861455264, 14.26197052001953),
            new google.maps.LatLng(51.00749035154875, 14.26025390625),
            new google.maps.LatLng(51.00878648420277, 14.260597229003906),
            new google.maps.LatLng(51.00846245443476, 14.265403747558594),
            new google.maps.LatLng(51.0098665670808, 14.26969528198242),
            new google.maps.LatLng(51.01418664707926, 14.280166625976562),
            new google.maps.LatLng(51.015698580008184, 14.282054901123047),
            new google.maps.LatLng(51.01656251954941, 14.280853271484375),
            new google.maps.LatLng(51.016886492727544, 14.279479980468748),
            new google.maps.LatLng(51.01796638697372, 14.279308319091797),
            new google.maps.LatLng(51.01883028426262, 14.277935028076172),
            new google.maps.LatLng(51.02250166817141, 14.281024932861328),
            new google.maps.LatLng(51.024337251103475, 14.284114837646484),
            new google.maps.LatLng(51.02682057115055, 14.28617477416992),
            new google.maps.LatLng(51.02995152419996, 14.28617477416992),
            new google.maps.LatLng(51.03211067894049, 14.285316467285154),
            new google.maps.LatLng(51.032326588882086, 14.283771514892578),
            new google.maps.LatLng(51.034809480912195, 14.281196594238281),
            new google.maps.LatLng(51.034809480912195, 14.27999496459961),
            new google.maps.LatLng(51.03664457647833, 14.279651641845703),
            new google.maps.LatLng(51.0377240105105, 14.275531768798826),
            new google.maps.LatLng(51.03718429663773, 14.274673461914062),
            new google.maps.LatLng(51.037939894299356, 14.273300170898438),
            new google.maps.LatLng(51.03880341939632, 14.27398681640625),
            new google.maps.LatLng(51.039990740126925, 14.27347183227539),
            new google.maps.LatLng(51.03901929815593, 14.284629821777344),
            new google.maps.LatLng(51.03837165885954, 14.285831451416016),
            new google.maps.LatLng(51.0397748658936, 14.289436340332031),
            new google.maps.LatLng(51.041717697783575, 14.289264678955076),
            new google.maps.LatLng(51.04279701362964, 14.291496276855469),
            new google.maps.LatLng(51.043768376391796, 14.292011260986328),
            new google.maps.LatLng(51.04463179285938, 14.29115295410156),
            new google.maps.LatLng(51.04657442107221, 14.291839599609375),
            new google.maps.LatLng(51.04819321568309, 14.295787811279297),
            new google.maps.LatLng(51.050675257539005, 14.296131134033203),
            new google.maps.LatLng(51.05531523987072, 14.301795959472654),
            new google.maps.LatLng(51.054991535259155, 14.30746078491211),
            new google.maps.LatLng(51.055423140905035, 14.310722351074219),
            new google.maps.LatLng(51.05553104168793, 14.314842224121094),
            new google.maps.LatLng(51.055423140905035, 14.317073822021484),
            new google.maps.LatLng(51.05412831189872, 14.318618774414062),
            new google.maps.LatLng(51.05261763229727, 14.320335388183592),
            new google.maps.LatLng(51.050459433092655, 14.324111938476562),
            new google.maps.LatLng(51.04894863380694, 14.326515197753904),
            new google.maps.LatLng(51.04711402556198, 14.327030181884766),
            new google.maps.LatLng(51.04387630433032, 14.330978393554688),
            new google.maps.LatLng(51.03966692839972, 14.33492660522461),
            new google.maps.LatLng(51.03869547963931, 14.339218139648438),
            new google.maps.LatLng(51.03858753963086, 14.3426513671875),
            new google.maps.LatLng(51.03912723715856, 14.345054626464844),
            new google.maps.LatLng(51.04117803043094, 14.346771240234375),
            new google.maps.LatLng(51.041717697783575, 14.347801208496092),
            new google.maps.LatLng(51.04333666212316, 14.352779388427734),
            new google.maps.LatLng(51.04312080348009, 14.356555938720703),
            new google.maps.LatLng(51.04527934464917, 14.361877441406248),
            new google.maps.LatLng(51.043228732927346, 14.365653991699217),
            new google.maps.LatLng(51.042149427139464, 14.369430541992186),
            new google.maps.LatLng(51.03880341939632, 14.374065399169922),
            new google.maps.LatLng(51.03934311440941, 14.37612533569336),
            new google.maps.LatLng(51.03837165885954, 14.382991790771483),
            new google.maps.LatLng(51.0339458813813, 14.383678436279297),
            new google.maps.LatLng(51.032326588882086, 14.382991790771483),
            new google.maps.LatLng(51.02897987174891, 14.383506774902346),
            new google.maps.LatLng(51.028548019676656, 14.38282012939453),
            new google.maps.LatLng(51.02692853856956, 14.385223388671873),
            new google.maps.LatLng(51.02390535577586, 14.390029907226562),
            new google.maps.LatLng(51.02250166817141, 14.395523071289062),
            new google.maps.LatLng(51.02228571245988, 14.399986267089844),
            new google.maps.LatLng(51.02077399431201, 14.405479431152344),
            new google.maps.LatLng(51.018614311449404, 14.408569335937498),
            new google.maps.LatLng(51.01893827029196, 14.411659240722656),
            new google.maps.LatLng(51.01904625606984, 14.417839050292967),
            new google.maps.LatLng(51.01980214947295, 14.421787261962889),
            new google.maps.LatLng(51.021421879554104, 14.425907135009764),
            new google.maps.LatLng(51.022825599852496, 14.428310394287111),
            new google.maps.LatLng(51.02368940660309, 14.432258605957031),
            new google.maps.LatLng(51.0253090008786, 14.43105697631836),
            new google.maps.LatLng(51.02628073028327, 14.434490203857422),
            new google.maps.LatLng(51.02790023402384, 14.437923431396486),
            new google.maps.LatLng(51.030815198167026, 14.442214965820312),
            new google.maps.LatLng(51.032650451908424, 14.446678161621094),
            new google.maps.LatLng(51.0343776831585, 14.449768066406252),
            new google.maps.LatLng(51.03588895769364, 14.453372955322264),
            new google.maps.LatLng(51.03534922244628, 14.459724426269531),
            new google.maps.LatLng(51.03534922244628, 14.464530944824217),
            new google.maps.LatLng(51.03513332658704, 14.466419219970703),
            new google.maps.LatLng(51.03189476799301, 14.46950912475586),
            new google.maps.LatLng(51.029627642312924, 14.473800659179688),
            new google.maps.LatLng(51.029519681180965, 14.475002288818361),
            new google.maps.LatLng(51.025524942506685, 14.474487304687498),
            new google.maps.LatLng(51.023473456424405, 14.492340087890623),
            new google.maps.LatLng(51.02779226886817, 14.49371337890625),
            new google.maps.LatLng(51.030059484326024, 14.492683410644531),
            new google.maps.LatLng(51.035781011147094, 14.49440002441406),
            new google.maps.LatLng(51.04333666212316, 14.490795135498047),
            new google.maps.LatLng(51.044092159453044, 14.494056701660154),
            new google.maps.LatLng(51.04484764446179, 14.496803283691406),
            new google.maps.LatLng(51.04592688738677, 14.498519897460938),
            new google.maps.LatLng(51.046466499419935, 14.500064849853514),
            new google.maps.LatLng(51.04571104081335, 14.502124786376951),
            new google.maps.LatLng(51.044523866681025, 14.504184722900392),
            new google.maps.LatLng(51.0430128737814, 14.508476257324219),
            new google.maps.LatLng(51.04063835679189, 14.507102966308594),
            new google.maps.LatLng(51.03610485003232, 14.50469970703125),
            new google.maps.LatLng(51.03243454347569, 14.502124786376951),
            new google.maps.LatLng(51.02790023402384, 14.500408172607424),
            new google.maps.LatLng(51.02217773422689, 14.498519897460938),
            new google.maps.LatLng(51.020450048295785, 14.507274627685547),
            new google.maps.LatLng(51.01904625606984, 14.521522521972654),
            new google.maps.LatLng(51.017750410136486, 14.528560638427734),
            new google.maps.LatLng(51.01515860962103, 14.534225463867188),
            new google.maps.LatLng(51.01029859318957, 14.53989028930664),
            new google.maps.LatLng(51.0088944936224, 14.535942077636719),
            new google.maps.LatLng(51.00673425744119, 14.534912109374998),
            new google.maps.LatLng(51.00554608465718, 14.53285217285156),
            new google.maps.LatLng(51.003709757764625, 14.535255432128904),
            new google.maps.LatLng(51.00554608465718, 14.55036163330078),
            new google.maps.LatLng(51.007058299282136, 14.556198120117186),
            new google.maps.LatLng(51.00684227163969, 14.561176300048828),
            new google.maps.LatLng(51.00835444400906, 14.561176300048828),
            new google.maps.LatLng(51.0098665670808, 14.564781188964844),
            new google.maps.LatLng(51.00727432591848, 14.567527770996094),
            new google.maps.LatLng(51.00587013479836, 14.565811157226562),
            new google.maps.LatLng(51.00500599605808, 14.568386077880858),
            new google.maps.LatLng(51.00403382073359, 14.568557739257814),
            new google.maps.LatLng(51.003817779005814, 14.570960998535156),
            new google.maps.LatLng(51.002953602033585, 14.571475982666016),
            new google.maps.LatLng(51.00046900356808, 14.578685760498047),
            new google.maps.LatLng(50.99398681602975, 14.580917358398438),
            new google.maps.LatLng(50.98685536381026, 14.594993591308594),
            new google.maps.LatLng(50.987071484522424, 14.599456787109373),
            new google.maps.LatLng(50.980479350114486, 14.598770141601562),
            new google.maps.LatLng(50.97939858303636, 14.600143432617188),
            new google.maps.LatLng(50.97529143870367, 14.597740173339846),
            new google.maps.LatLng(50.971940604525656, 14.596881866455078),
            new google.maps.LatLng(50.96956244649902, 14.59705352783203),
            new google.maps.LatLng(50.96685984638629, 14.592761993408203),
            new google.maps.LatLng(50.9627515930537, 14.596538543701172),
            new google.maps.LatLng(50.95680479343572, 14.590015411376955),
            new google.maps.LatLng(50.952911930634215, 14.586925506591797),
            new google.maps.LatLng(50.950640943405034, 14.585037231445312),
            new google.maps.LatLng(50.94782909118722, 14.584522247314453),
            new google.maps.LatLng(50.94425995687047, 14.582462310791016),
            new google.maps.LatLng(50.94166405070214, 14.580574035644531),
            new google.maps.LatLng(50.93776991967491, 14.57233428955078),
            new google.maps.LatLng(50.93430819607835, 14.568386077880858),
            new google.maps.LatLng(50.93041344900485, 14.565811157226562),
            new google.maps.LatLng(50.92521994555208, 14.560832977294924),
            new google.maps.LatLng(50.91840259229272, 14.56409454345703),
            new google.maps.LatLng(50.916129919222186, 14.577140808105469),
            new google.maps.LatLng(50.914614742177996, 14.581432342529297),
            new google.maps.LatLng(50.91364067374235, 14.581947326660154),
            new google.maps.LatLng(50.91580524257991, 14.58555221557617),
            new google.maps.LatLng(50.917212158336696, 14.591045379638672),
            new google.maps.LatLng(50.91634636905861, 14.59327697753906),
            new google.maps.LatLng(50.92099979703473, 14.601860046386719),
            new google.maps.LatLng(50.921432650397556, 14.607353210449217),
            new google.maps.LatLng(50.92240655574062, 14.612159729003906),
            new google.maps.LatLng(50.925760962549525, 14.616622924804686),
            new google.maps.LatLng(50.925869165194, 14.620399475097656),
            new google.maps.LatLng(50.92554455650557, 14.62778091430664),
            new google.maps.LatLng(50.927492174660614, 14.63327407836914),
            new google.maps.LatLng(50.93041344900485, 14.640140533447264),
            new google.maps.LatLng(50.93149535590776, 14.644603729248049),
            new google.maps.LatLng(50.93149535590776, 14.650440216064455),
            new google.maps.LatLng(50.9281413625921, 14.65078353881836),
            new google.maps.LatLng(50.92597736758682, 14.65232849121094),
            new google.maps.LatLng(50.913424211321335, 14.651813507080076),
            new google.maps.LatLng(50.90530614375164, 14.652843475341797),
            new google.maps.LatLng(50.904548385205814, 14.649066925048828),
            new google.maps.LatLng(50.902708063102494, 14.644432067871092),
            new google.maps.LatLng(50.900001574917894, 14.6392822265625),
            new google.maps.LatLng(50.89751146683914, 14.636363983154295),
            new google.maps.LatLng(50.89307224826163, 14.634647369384764),
            new google.maps.LatLng(50.885708708915175, 14.633445739746094),
            new google.maps.LatLng(50.88245971855314, 14.632072448730469),
            new google.maps.LatLng(50.87769412283608, 14.628124237060547),
            new google.maps.LatLng(50.86837814203458, 14.623832702636719),
            new google.maps.LatLng(50.865019599340435, 14.61954116821289),
            new google.maps.LatLng(50.860143864878665, 14.62005615234375),
            new google.maps.LatLng(50.85743490319402, 14.618854522705076),
            new google.maps.LatLng(50.85656800221785, 14.626235961914062),
            new google.maps.LatLng(50.85678472897267, 14.628295898437498),
            new google.maps.LatLng(50.85505088673253, 14.63155746459961),
            new google.maps.LatLng(50.85515925376102, 14.6337890625),
            new google.maps.LatLng(50.851691383954154, 14.639625549316406),
            new google.maps.LatLng(50.851691383954154, 14.643058776855469),
            new google.maps.LatLng(50.84887354987344, 14.646663665771484),
            new google.maps.LatLng(50.848656786354994, 14.653358459472656),
            new google.maps.LatLng(50.84941545426287, 14.657993316650389),
            new google.maps.LatLng(50.850282488191745, 14.659881591796873),
            new google.maps.LatLng(50.84854840421804, 14.66606140136719),
            new google.maps.LatLng(50.84692264194612, 14.670009613037111),
            new google.maps.LatLng(50.84269539487494, 14.68116760253906),
            new google.maps.LatLng(50.841286227401966, 14.681510925292967),
            new google.maps.LatLng(50.840527427288706, 14.68494415283203),
            new google.maps.LatLng(50.83900979004339, 14.686660766601562),
            new google.maps.LatLng(50.83803414003555, 14.690093994140625),
            new google.maps.LatLng(50.83955180901146, 14.694557189941404),
            new google.maps.LatLng(50.83900979004339, 14.697132110595705),
            new google.maps.LatLng(50.84009382168376, 14.699535369873047),
            new google.maps.LatLng(50.84063582806037, 14.708290100097654),
            new google.maps.LatLng(50.83879298069335, 14.710350036621092),
            new google.maps.LatLng(50.837492103439295, 14.71412658691406),
            new google.maps.LatLng(50.83510706762089, 14.715499877929688),
            new google.maps.LatLng(50.83467341164932, 14.718589782714846),
            new google.maps.LatLng(50.83228823177952, 14.719963073730467),
            new google.maps.LatLng(50.83044505475798, 14.717216491699219),
            new google.maps.LatLng(50.82740907511776, 14.716529846191404),
            new google.maps.LatLng(50.82502352402512, 14.716186523437498),
            new google.maps.LatLng(50.8232885012118, 14.717216491699219),
            new google.maps.LatLng(50.82307161882668, 14.720821380615234),
            new google.maps.LatLng(50.82220407921185, 14.722709655761719),
            new google.maps.LatLng(50.822420965626726, 14.725456237792969),
            new google.maps.LatLng(50.82372226295971, 14.727516174316406),
            new google.maps.LatLng(50.82502352402512, 14.73163604736328),
            new google.maps.LatLng(50.8255657054318, 14.734382629394531),
            new google.maps.LatLng(50.82719221187368, 14.736614227294922),
            new google.maps.LatLng(50.82784279858373, 14.737987518310545),
            new google.maps.LatLng(50.829035517337445, 14.73867416381836),
            new google.maps.LatLng(50.82871023342679, 14.740562438964844),
            new google.maps.LatLng(50.8292523720186, 14.743309020996092),
            new google.maps.LatLng(50.82914394480393, 14.74691390991211),
            new google.maps.LatLng(50.82773436809502, 14.748115539550781),
            new google.maps.LatLng(50.82534883362467, 14.748802185058594),
            new google.maps.LatLng(50.824264459477796, 14.749660491943358),
            new google.maps.LatLng(50.824806649699454, 14.757385253906248),
            new google.maps.LatLng(50.82404758162615, 14.759960174560547),
            new google.maps.LatLng(50.82187874770056, 14.761848449707031),
            new google.maps.LatLng(50.82209563562661, 14.764595031738281),
            new google.maps.LatLng(50.81949291402228, 14.766483306884766),
            new google.maps.LatLng(50.81970981303032, 14.768886566162108),
            new google.maps.LatLng(50.82014360802402, 14.778842926025389),
            new google.maps.LatLng(50.82361382290052, 14.787425994873047),
            new google.maps.LatLng(50.82361382290052, 14.788970947265625),
            new google.maps.LatLng(50.82404758162615, 14.790687561035158),
            new google.maps.LatLng(50.82372226295971, 14.791889190673828),
            new google.maps.LatLng(50.82187874770056, 14.7930908203125),
            new google.maps.LatLng(50.819926711030895, 14.7930908203125),
            new google.maps.LatLng(50.822420965626726, 14.79909896850586),
            new google.maps.LatLng(50.82762593735444, 14.801845550537108),
            new google.maps.LatLng(50.829577652151514, 14.800987243652344),
            new google.maps.LatLng(50.83185454961651, 14.802532196044924),
            new google.maps.LatLng(50.837383695364544, 14.803390502929688),
            new google.maps.LatLng(50.84605554556735, 14.807853698730467),
            new google.maps.LatLng(50.848656786354994, 14.810600280761719),
            new google.maps.LatLng(50.85147463352982, 14.810428619384766),
            new google.maps.LatLng(50.852558375579136, 14.812145233154299),
            new google.maps.LatLng(50.85331698003121, 14.814376831054688),
            new google.maps.LatLng(50.85440067927362, 14.814720153808594),
            new google.maps.LatLng(50.85613454568662, 14.817981719970705),
            new google.maps.LatLng(50.85754326468293, 14.819011688232422),
            new google.maps.LatLng(50.85862686572345, 14.819011688232422),
            new google.maps.LatLng(50.85938537146998, 14.82107162475586),
            new google.maps.LatLng(50.86306936674008, 14.821414947509764),
            new google.maps.LatLng(50.868053132348585, 14.824676513671875),
            new google.maps.LatLng(50.869786491155764, 14.824848175048828),
            new google.maps.LatLng(50.87065314638895, 14.823131561279297),
            new google.maps.LatLng(50.87206142677591, 14.828453063964844),
            new google.maps.LatLng(50.87292803971143, 14.831371307373045),
            new google.maps.LatLng(50.8714114564999, 14.835147857666014),
            new google.maps.LatLng(50.869244823452355, 14.838924407958983),
            new google.maps.LatLng(50.86935315749659, 14.84321594238281),
            new google.maps.LatLng(50.87021982078655, 14.84733581542969),
            new google.maps.LatLng(50.86902815460856, 14.850425720214844),
            new google.maps.LatLng(50.86881148475767, 14.855232238769531),
            new google.maps.LatLng(50.869786491155764, 14.86072540283203),
            new google.maps.LatLng(50.87032815256481, 14.863815307617188),
            new google.maps.LatLng(50.87216975427403, 14.864158630371092),
            new google.maps.LatLng(50.876935914942365, 14.866905212402344),
            new google.maps.LatLng(50.87736917810648, 14.871368408203125),
            new google.maps.LatLng(50.876935914942365, 14.87617492675781),
            new google.maps.LatLng(50.87520282200388, 14.880809783935547),
            new google.maps.LatLng(50.87346966461366, 14.884929656982422),
            new google.maps.LatLng(50.867511444503045, 14.896774291992188),
            new google.maps.LatLng(50.875961058094994, 14.90020751953125),
            new google.maps.LatLng(50.87520282200388, 14.908447265625),
            new google.maps.LatLng(50.87357798883879, 14.914798736572264),
            new google.maps.LatLng(50.87054481536601, 14.931964874267578),
            new google.maps.LatLng(50.868486478093025, 14.939346313476562),
            new google.maps.LatLng(50.86469456623889, 14.9468994140625),
            new google.maps.LatLng(50.861985868934234, 14.959430694580078),
            new google.maps.LatLng(50.862310920919754, 14.963550567626951),
            new google.maps.LatLng(50.863827800222836, 14.969043731689453),
            new google.maps.LatLng(50.867728120396606, 14.977626800537108),
            new google.maps.LatLng(50.867728120396606, 14.98208999633789),
            new google.maps.LatLng(50.868161469162345, 14.984321594238281),
            new google.maps.LatLng(50.86902815460856, 14.986209869384766),
            new google.maps.LatLng(50.86935315749659, 14.993762969970703),
            new google.maps.LatLng(50.869678158118646, 14.99582290649414),
            new google.maps.LatLng(50.86859481389967, 14.998912811279295),
            new google.maps.LatLng(50.868919819809, 15.002174377441406),
            new google.maps.LatLng(50.87476953869871, 15.002174377441406),
            new google.maps.LatLng(50.87845231839358, 15.000114440917969),
            new google.maps.LatLng(50.88278462778519, 14.999427795410156),
            new google.maps.LatLng(50.889715484990425, 14.997196197509764),
            new google.maps.LatLng(50.89188116640461, 14.993762969970703),
            new google.maps.LatLng(50.8926391311106, 14.99479293823242),
            new google.maps.LatLng(50.8950212255985, 14.996681213378904),
            new google.maps.LatLng(50.90086766825373, 14.996166229248047),
            new google.maps.LatLng(50.901192449101316, 14.997539520263672),
            new google.maps.LatLng(50.90725460909217, 15.006294250488281),
            new google.maps.LatLng(50.90768759031497, 15.004920959472654),
            new google.maps.LatLng(50.907471100207005, 15.002002716064453),
            new google.maps.LatLng(50.90649688226159, 15.000457763671875),
            new google.maps.LatLng(50.90757934538682, 14.997711181640625),
            new google.maps.LatLng(50.91061010823088, 14.998226165771484),
            new google.maps.LatLng(50.91266658491942, 14.999256134033205),
            new google.maps.LatLng(50.91385713515655, 14.998741149902342),
            new google.maps.LatLng(50.9151558824997, 14.994449615478516),
            new google.maps.LatLng(50.917536825163126, 14.993934631347656),
            new google.maps.LatLng(50.918186152020425, 14.991188049316404),
            new google.maps.LatLng(50.921324437434365, 14.98964309692383),
            new google.maps.LatLng(50.92716757729735, 14.99479293823242),
            new google.maps.LatLng(50.92792496762162, 14.998912811279295),
            new google.maps.LatLng(50.92943971127504, 15.00251770019531),
            new google.maps.LatLng(50.9326854244341, 15.003890991210938),
            new google.maps.LatLng(50.93831079070912, 15.01075744628906),
            new google.maps.LatLng(50.9397170259552, 15.014362335205076),
            new google.maps.LatLng(50.94350283254394, 15.012817382812498),
            new google.maps.LatLng(50.95042465311966, 15.01556396484375),
            new google.maps.LatLng(50.95885922844512, 15.010929107666014),
            new google.maps.LatLng(50.963075942052164, 15.01110076904297),
            new google.maps.LatLng(50.96685984638629, 15.01676559448242),
            new google.maps.LatLng(50.96685984638629, 15.019683837890625),
            new google.maps.LatLng(50.966211198960934, 15.020713806152346),
            new google.maps.LatLng(50.96761659026825, 15.021400451660156),
            new google.maps.LatLng(50.96945434551362, 15.018997192382812),
            new google.maps.LatLng(50.97075154073346, 15.01676559448242),
            new google.maps.LatLng(50.97356200609211, 15.014190673828123),
            new google.maps.LatLng(50.981992381760044, 15.010929107666014),
            new google.maps.LatLng(50.9865311808553, 15.006122589111328),
            new google.maps.LatLng(50.98188430970626, 14.993076324462889),
            new google.maps.LatLng(50.980479350114486, 14.991703033447266),
            new google.maps.LatLng(50.978101629335036, 14.98861312866211),
            new google.maps.LatLng(50.985882808153306, 14.976940155029297),
            new google.maps.LatLng(50.988908469949415, 14.97213363647461),
            new google.maps.LatLng(50.989772908524195, 14.968013763427733),
            new google.maps.LatLng(51.00392579999546, 14.980030059814453),
            new google.maps.LatLng(51.00749035154875, 14.984321594238281),
            new google.maps.LatLng(51.011162633334386, 14.985351562499998),
            new google.maps.LatLng(51.010838620166446, 14.991703033447266),
            new google.maps.LatLng(51.009326528785756, 14.997539520263672),
            new google.maps.LatLng(51.011162633334386, 14.998912811279295),
            new google.maps.LatLng(51.013862655038224, 15.00732421875),
            new google.maps.LatLng(51.015590586433774, 15.00955581665039),
            new google.maps.LatLng(51.016130551790816, 15.014705657958983),
            new google.maps.LatLng(51.0210979380648, 15.01607894897461),
            new google.maps.LatLng(51.02185379801894, 15.017967224121094),
            new google.maps.LatLng(51.02304155304909, 15.020713806152346),
            new google.maps.LatLng(51.02293357657653, 15.024147033691404),
            new google.maps.LatLng(51.02293357657653, 15.02706527709961),
            new google.maps.LatLng(51.02185379801894, 15.027580261230469),
            new google.maps.LatLng(51.02185379801894, 15.029296875),
            new google.maps.LatLng(51.02152985954755, 15.031185150146484),
            new google.maps.LatLng(51.02120591881272, 15.03255844116211),
            new google.maps.LatLng(51.01926222687109, 15.033073425292969),
            new google.maps.LatLng(51.01796638697372, 15.034275054931639),
            new google.maps.LatLng(51.016994483283916, 15.0347900390625),
            new google.maps.LatLng(51.01591456640252, 15.032730102539062),
            new google.maps.LatLng(51.01472662878423, 15.033588409423828),
            new google.maps.LatLng(51.01310666480631, 15.035476684570312),
            new google.maps.LatLng(51.01159464737048, 15.047321319580076),
            new google.maps.LatLng(51.012026657382386, 15.051269531249998),
            new google.maps.LatLng(51.01224266087926, 15.05521774291992),
            new google.maps.LatLng(51.013646659086646, 15.057621002197264),
            new google.maps.LatLng(51.01796638697372, 15.056591033935547),
            new google.maps.LatLng(51.02250166817141, 15.05779266357422),
            new google.maps.LatLng(51.02293357657653, 15.060367584228516),
            new google.maps.LatLng(51.02196177700643, 15.063114166259764),
            new google.maps.LatLng(51.021421879554104, 15.06448745727539),
            new google.maps.LatLng(51.02131389930917, 15.066890716552733),
            new google.maps.LatLng(51.02055803055271, 15.068092346191406),
            new google.maps.LatLng(51.01850632466553, 15.068778991699217),
            new google.maps.LatLng(51.017750410136486, 15.070667266845703),
            new google.maps.LatLng(51.017318453444034, 15.073413848876955),
            new google.maps.LatLng(51.017318453444034, 15.07547378540039),
            new google.maps.LatLng(51.01634653617311, 15.077018737792967),
            new google.maps.LatLng(51.01505061478908, 15.076160430908203),
            new google.maps.LatLng(51.01440264051576, 15.077018737792967),
            new google.maps.LatLng(51.013538660733595, 15.076847076416014),
            new google.maps.LatLng(51.013538660733595, 15.08371353149414),
            new google.maps.LatLng(51.01483462437068, 15.084571838378904),
            new google.maps.LatLng(51.01418664707926, 15.086803436279295),
            new google.maps.LatLng(51.01418664707926, 15.089893341064453),
            new google.maps.LatLng(51.013538660733595, 15.093154907226562),
            new google.maps.LatLng(51.01278266522, 15.093841552734375),
            new google.maps.LatLng(51.013322663272966, 15.09744644165039),
            new google.maps.LatLng(51.01267466485488, 15.099849700927734),
            new google.maps.LatLng(51.01235066225043, 15.102596282958986),
            new google.maps.LatLng(51.01105462919659, 15.104656219482424),
            new google.maps.LatLng(51.009542544858334, 15.106887817382812),
            new google.maps.LatLng(51.00835444400906, 15.107059478759766),
            new google.maps.LatLng(51.00695028558667, 15.105857849121092),
            new google.maps.LatLng(51.00608616696821, 15.103797912597656),
            new google.maps.LatLng(51.00587013479836, 15.10122299194336),
            new google.maps.LatLng(51.0052220322523, 15.099163055419922),
            new google.maps.LatLng(51.004789958857764, 15.099506378173828),
            new google.maps.LatLng(51.004249861455264, 15.098476409912108),
            new google.maps.LatLng(51.00327767028461, 15.097274780273438),
            new google.maps.LatLng(51.00262953151877, 15.096931457519531),
            new google.maps.LatLng(50.99852444238813, 15.099334716796875),
            new google.maps.LatLng(50.99701194957063, 15.098991394042969),
            new google.maps.LatLng(50.99657979971024, 15.100193023681639),
            new google.maps.LatLng(50.993770727516214, 15.101051330566406),
            new google.maps.LatLng(50.99150173737569, 15.104999542236328),
            new google.maps.LatLng(50.99193393452652, 15.108604431152344),
            new google.maps.LatLng(50.99171783645421, 15.11014938354492),
            new google.maps.LatLng(50.992150031592665, 15.112724304199219),
            new google.maps.LatLng(50.992258079748396, 15.11444091796875),
            new google.maps.LatLng(50.9930144097952, 15.118904113769531),
            new google.maps.LatLng(50.99323050183037, 15.12165069580078),
            new google.maps.LatLng(50.99236612765258, 15.124053955078127),
            new google.maps.LatLng(50.9911775868713, 15.127143859863281),
            new google.maps.LatLng(50.99042122689006, 15.129203796386717),
            new google.maps.LatLng(50.99150173737569, 15.133495330810545),
            new google.maps.LatLng(50.99171783645421, 15.136241912841797),
            new google.maps.LatLng(50.99182588561614, 15.140190124511719),
            new google.maps.LatLng(50.99150173737569, 15.141735076904297),
            new google.maps.LatLng(50.9930144097952, 15.142250061035156),
            new google.maps.LatLng(50.99398681602975, 15.13864517211914),
            new google.maps.LatLng(50.99398681602975, 15.134868621826172),
            new google.maps.LatLng(50.99398681602975, 15.133323669433592),
            new google.maps.LatLng(50.999280670308885, 15.134868621826172),
            new google.maps.LatLng(51.002413483251246, 15.138301849365234),
            new google.maps.LatLng(51.00608616696821, 15.141048431396483),
            new google.maps.LatLng(51.00835444400906, 15.142765045166016),
            new google.maps.LatLng(51.00997457398527, 15.14242172241211),
            new google.maps.LatLng(51.010838620166446, 15.142078399658203),
            new google.maps.LatLng(51.012458663370076, 15.145168304443358),
            new google.maps.LatLng(51.01343066212905, 15.1446533203125),
            new google.maps.LatLng(51.013538660733595, 15.146541595458984),
            new google.maps.LatLng(51.01505061478908, 15.154438018798828),
            new google.maps.LatLng(51.017102473588785, 15.16284942626953),
            new google.maps.LatLng(51.01883028426262, 15.168170928955076),
            new google.maps.LatLng(51.01980214947295, 15.169544219970703),
            new google.maps.LatLng(51.02001811675323, 15.170745849609373),
            new google.maps.LatLng(51.01991013323884, 15.171775817871094),
            new google.maps.LatLng(51.017426442994406, 15.171775817871094),
            new google.maps.LatLng(51.01418664707926, 15.174007415771483),
            new google.maps.LatLng(51.0107306152741, 15.174694061279299),
            new google.maps.LatLng(51.002413483251246, 15.174694061279299),
            new google.maps.LatLng(50.99971279501553, 15.17486572265625),
            new google.maps.LatLng(50.994527032911485, 15.175552368164062),
            new google.maps.LatLng(50.993338547470636, 15.177440643310547),
            new google.maps.LatLng(50.99182588561614, 15.175895690917969),
            new google.maps.LatLng(50.98998901565236, 15.17606735229492),
            new google.maps.LatLng(50.987719840621565, 15.174007415771483),
            new google.maps.LatLng(50.986423119367196, 15.171260833740234),
            new google.maps.LatLng(50.98577474515584, 15.17486572265625),
            new google.maps.LatLng(50.98501829712989, 15.1776123046875),
            new google.maps.LatLng(50.98393763571006, 15.179328918457031),
            new google.maps.LatLng(50.982748879092554, 15.180187225341795),
            new google.maps.LatLng(50.98264080879975, 15.183448791503906),
            new google.maps.LatLng(50.98015512263256, 15.189456939697266),
            new google.maps.LatLng(50.981343945663895, 15.194435119628906),
            new google.maps.LatLng(50.982856949133804, 15.19804000854492),
            new google.maps.LatLng(50.983829568184476, 15.199756622314451),
            new google.maps.LatLng(50.98663924209184, 15.19683837890625),
            new google.maps.LatLng(50.98880041399555, 15.197010040283203),
            new google.maps.LatLng(50.98955680038983, 15.197868347167967),
            new google.maps.LatLng(50.99009706883912, 15.200614929199219),
            new google.maps.LatLng(50.99269026985585, 15.203704833984373),
            new google.maps.LatLng(50.99269026985585, 15.207481384277342),
            new google.maps.LatLng(50.99160978704074, 15.209197998046873),
            new google.maps.LatLng(50.99258222270632, 15.213661193847658),
            new google.maps.LatLng(50.99323050183037, 15.215549468994139),
            new google.maps.LatLng(50.99549940745137, 15.21829605102539),
            new google.maps.LatLng(50.9959315673734, 15.222244262695312),
            new google.maps.LatLng(50.99603960672508, 15.228252410888672),
            new google.maps.LatLng(50.997660166815045, 15.23099899291992),
            new google.maps.LatLng(50.99863247570286, 15.235633850097656),
            new google.maps.LatLng(50.99841640882189, 15.239582061767578),
            new google.maps.LatLng(50.99733605932478, 15.242156982421875),
            new google.maps.LatLng(50.99560744780919, 15.239753723144531),
            new google.maps.LatLng(50.995391366842, 15.237178802490236),
            new google.maps.LatLng(50.993878771898764, 15.237350463867188),
            new google.maps.LatLng(50.99171783645421, 15.239753723144531),
            new google.maps.LatLng(50.99042122689006, 15.238380432128904),
            new google.maps.LatLng(50.98826013045302, 15.242843627929686),
            new google.maps.LatLng(50.98631505762755, 15.239410400390625),
            new google.maps.LatLng(50.98415377000653, 15.240955352783205),
            new google.maps.LatLng(50.984477969564516, 15.242843627929686),
            new google.maps.LatLng(50.98328922678308, 15.243873596191406),
            new google.maps.LatLng(50.98253273825539, 15.243873596191406),
            new google.maps.LatLng(50.979830892886476, 15.248508453369139),
            new google.maps.LatLng(50.98091164990174, 15.251426696777344),
            new google.maps.LatLng(50.98080357533227, 15.256404876708983),
            new google.maps.LatLng(50.98037127453874, 15.262928009033203),
            new google.maps.LatLng(50.97939858303636, 15.267391204833984),
            new google.maps.LatLng(50.97939858303636, 15.273056030273438),
            new google.maps.LatLng(50.97939858303636, 15.27425765991211),
            new google.maps.LatLng(50.97734505627955, 15.27545928955078),
            new google.maps.LatLng(50.97485908658873, 15.275974273681639),
            new google.maps.LatLng(50.97248107800412, 15.276660919189453),
            new google.maps.LatLng(50.970643442515545, 15.27700424194336),
            new google.maps.LatLng(50.963832747575786, 15.273742675781248),
            new google.maps.LatLng(50.96177853247174, 15.274772644042969),
            new google.maps.LatLng(50.96091357262308, 15.2764892578125),
            new google.maps.LatLng(50.95994047354539, 15.281982421875002),
            new google.maps.LatLng(50.95950797852459, 15.28541564941406),
            new google.maps.LatLng(50.957345443034114, 15.288333892822266),
            new google.maps.LatLng(50.9530200701154, 15.292110443115234),
            new google.maps.LatLng(50.951181664715065, 15.29073715209961),
            new google.maps.LatLng(50.947504635754655, 15.29022216796875),
            new google.maps.LatLng(50.94393547652607, 15.282325744628906),
            new google.maps.LatLng(50.941015051512345, 15.27769088745117),
            new google.maps.LatLng(50.93917617127812, 15.27769088745117),
            new google.maps.LatLng(50.936039090088194, 15.269794464111326),
            new google.maps.LatLng(50.93398364627933, 15.26876449584961),
            new google.maps.LatLng(50.93138716634996, 15.267391204833984),
            new google.maps.LatLng(50.929115127501795, 15.268936157226562),
            new google.maps.LatLng(50.926734777289624, 15.26876449584961),
            new google.maps.LatLng(50.92489533233354, 15.269622802734373),
            new google.maps.LatLng(50.921432650397556, 15.267047882080078),
            new google.maps.LatLng(50.91937656105958, 15.266704559326172),
            new google.maps.LatLng(50.917212158336696, 15.268592834472656),
            new google.maps.LatLng(50.915372336866525, 15.271167755126953),
            new google.maps.LatLng(50.91136776810851, 15.270652770996094),
            new google.maps.LatLng(50.906929870532174, 15.273571014404295),
            new google.maps.LatLng(50.90086766825373, 15.276145935058596),
            new google.maps.LatLng(50.89816107308881, 15.2764892578125),
            new google.maps.LatLng(50.89556259371763, 15.276660919189453),
            new google.maps.LatLng(50.89112318936364, 15.27700424194336),
            new google.maps.LatLng(50.88170158820041, 15.289878845214844),
            new google.maps.LatLng(50.87628601264333, 15.292282104492188),
            new google.maps.LatLng(50.86155246276182, 15.308933258056639),
            new google.maps.LatLng(50.86079399226619, 15.311336517333984),
            new google.maps.LatLng(50.860035509432805, 15.314598083496092),
            new google.maps.LatLng(50.85992715373515, 15.319061279296877),
            new google.maps.LatLng(50.85971044158446, 15.32215118408203),
            new google.maps.LatLng(50.85862686572345, 15.324039459228516),
            new google.maps.LatLng(50.85884358291, 15.328330993652342),
            new google.maps.LatLng(50.85732654145328, 15.327987670898436),
            new google.maps.LatLng(50.85667636572117, 15.330047607421873),
            new google.maps.LatLng(50.85667636572117, 15.333309173583984),
            new google.maps.LatLng(50.8560261809243, 15.336055755615233),
            new google.maps.LatLng(50.85710981721644, 15.33811569213867),
            new google.maps.LatLng(50.85635127445583, 15.339488983154297),
            new google.maps.LatLng(50.85483415192008, 15.341720581054686),
            new google.maps.LatLng(50.85537598706265, 15.342578887939453),
            new google.maps.LatLng(50.853967202598284, 15.34360885620117),
            new google.maps.LatLng(50.85310023716107, 15.344467163085938),
            new google.maps.LatLng(50.85364209244785, 15.345497131347654),
            new google.maps.LatLng(50.85299186534828, 15.347213745117188),
            new google.maps.LatLng(50.852124881781094, 15.348930358886719),
            new google.maps.LatLng(50.85147463352982, 15.350303649902344),
            new google.maps.LatLng(50.8510411296595, 15.349960327148436),
            new google.maps.LatLng(50.85071599911272, 15.352706909179688),
            new google.maps.LatLng(50.851691383954154, 15.353221893310547),
            new google.maps.LatLng(50.850282488191745, 15.354080200195314),
            new google.maps.LatLng(50.84768133805717, 15.356998443603516),
            new google.maps.LatLng(50.846163933496065, 15.35888671875),
            new google.maps.LatLng(50.844646479578735, 15.359230041503904),
            new google.maps.LatLng(50.8418282199281, 15.361461639404295),
            new google.maps.LatLng(50.83976861483587, 15.364208221435547),
            new google.maps.LatLng(50.837492103439295, 15.367641448974611),
            new google.maps.LatLng(50.83434816702633, 15.370044708251953),
            new google.maps.LatLng(50.83152928534991, 15.369529724121092),
            new google.maps.LatLng(50.825457269654166, 15.372447967529297),
            new google.maps.LatLng(50.82372226295971, 15.372276306152344),
            new google.maps.LatLng(50.82101118592192, 15.376052856445312),
            new google.maps.LatLng(50.819601363652225, 15.372962951660154),
            new google.maps.LatLng(50.8168900473431, 15.370731353759766),
            new google.maps.LatLng(50.81439549730613, 15.370216369628906),
            new google.maps.LatLng(50.812009281288205, 15.373992919921875),
            new google.maps.LatLng(50.808104301204715, 15.371932983398438),
            new google.maps.LatLng(50.80788734829515, 15.374164581298828),
            new google.maps.LatLng(50.806368649716646, 15.372791290283201),
            new google.maps.LatLng(50.805283834791, 15.367984771728516),
            new google.maps.LatLng(50.802897153288384, 15.367126464843748),
            new google.maps.LatLng(50.801486784185165, 15.366096496582031),
            new google.maps.LatLng(50.799750886848386, 15.369358062744139),
            new google.maps.LatLng(50.79703841815972, 15.371761322021484),
            new google.maps.LatLng(50.795302355573796, 15.372447967529297),
            new google.maps.LatLng(50.79269814077799, 15.371417999267576),
            new google.maps.LatLng(50.78900858809565, 15.374164581298828),
            new google.maps.LatLng(50.78781484693658, 15.37210464477539),
            new google.maps.LatLng(50.78542727316999, 15.37330627441406),
            new google.maps.LatLng(50.78282250817873, 15.371417999267576),
            new google.maps.LatLng(50.781302994920026, 15.370216369628906),
            new google.maps.LatLng(50.77761254285463, 15.374164581298828),
            new google.maps.LatLng(50.77815527465925, 15.378971099853514),
            new google.maps.LatLng(50.77533300049491, 15.38412094116211),
            new google.maps.LatLng(50.77609286029339, 15.389099121093752),
            new google.maps.LatLng(50.77587575875356, 15.392704010009764),
            new google.maps.LatLng(50.77880654451074, 15.396480560302733),
            new google.maps.LatLng(50.78119445636918, 15.401802062988281),
            new google.maps.LatLng(50.78336517951859, 15.404720306396486),
            new google.maps.LatLng(50.78618696895818, 15.408325195312498),
            new google.maps.LatLng(50.79161300845443, 15.412788391113281),
            new google.maps.LatLng(50.795844882059384, 15.415878295898436),
            new google.maps.LatLng(50.79779792526253, 15.418109893798826),
            new google.maps.LatLng(50.800835830240864, 15.418624877929688),
            new google.maps.LatLng(50.80343959160811, 15.421028137207031),
            new google.maps.LatLng(50.80680256863399, 15.42531967163086),
            new google.maps.LatLng(50.80756191704162, 15.430126190185549),
            new google.maps.LatLng(50.80918905063944, 15.43922424316406),
            new google.maps.LatLng(50.80788734829515, 15.44300079345703),
            new google.maps.LatLng(50.80701952658132, 15.45003890991211),
            new google.maps.LatLng(50.80419899467617, 15.450210571289062),
            new google.maps.LatLng(50.802897153288384, 15.453300476074217),
            new google.maps.LatLng(50.80159527562757, 15.461368560791016),
            new google.maps.LatLng(50.79855742002198, 15.468578338623045),
            new google.maps.LatLng(50.79573637726608, 15.476131439208983),
            new google.maps.LatLng(50.79074488445764, 15.48076629638672),
            new google.maps.LatLng(50.79020229877231, 15.487976074218748),
            new google.maps.LatLng(50.78846598225672, 15.493125915527344),
            new google.maps.LatLng(50.78857450392834, 15.497760772705076),
            new google.maps.LatLng(50.78987674433807, 15.50668716430664),
            new google.maps.LatLng(50.79096191696835, 15.510978698730469),
            new google.maps.LatLng(50.77685270774661, 15.524539947509766),
            new google.maps.LatLng(50.780326138892775, 15.539302825927736),
            new google.maps.LatLng(50.780326138892775, 15.547542572021484),
            new google.maps.LatLng(50.778263820264335, 15.556297302246092),
            new google.maps.LatLng(50.77674415886626, 15.56007385253906),
            new google.maps.LatLng(50.77728690074856, 15.570373535156252),
            new google.maps.LatLng(50.779023632445714, 15.579471588134764),
            new google.maps.LatLng(50.77858945556799, 15.586166381835938),
            new google.maps.LatLng(50.77696125637501, 15.590972900390625),
            new google.maps.LatLng(50.777178352875985, 15.599384307861326),
            new google.maps.LatLng(50.77630996082548, 15.605392456054686),
            new google.maps.LatLng(50.77294478932867, 15.615520477294922),
            new google.maps.LatLng(50.765887998486484, 15.621185302734375),
            new google.maps.LatLng(50.76078473271486, 15.641441345214844),
            new google.maps.LatLng(50.760893318632924, 15.646076202392576),
            new google.maps.LatLng(50.75915591370691, 15.649852752685545),
            new google.maps.LatLng(50.760133211914955, 15.658607482910156),
            new google.maps.LatLng(50.758504370229375, 15.663414001464842),
            new google.maps.LatLng(50.75622389662251, 15.669250488281248),
            new google.maps.LatLng(50.75470351914962, 15.679035186767576),
            new google.maps.LatLng(50.753508902201894, 15.683155059814451),
            new google.maps.LatLng(50.74481986170457, 15.688648223876951),
            new google.maps.LatLng(50.742430092827554, 15.688991546630858),
            new google.maps.LatLng(50.73743290921974, 15.705986022949219),
            new google.maps.LatLng(50.73765018916071, 15.714740753173828),
            new google.maps.LatLng(50.73960566326731, 15.72246551513672),
            new google.maps.LatLng(50.73960566326731, 15.72761535644531),
            new google.maps.LatLng(50.736455137010665, 15.734310150146484),
            new google.maps.LatLng(50.736129208404684, 15.740318298339844),
            new google.maps.LatLng(50.74025746982474, 15.748043060302734),
            new google.maps.LatLng(50.74340774029213, 15.7598876953125),
            new google.maps.LatLng(50.74373361824426, 15.76761245727539),
            new google.maps.LatLng(50.74253872133164, 15.770530700683592),
            new google.maps.LatLng(50.742212835063405, 15.776882171630858),
            new google.maps.LatLng(50.74253872133164, 15.78031539916992),
            new google.maps.LatLng(50.74742674319349, 15.788898468017578),
            new google.maps.LatLng(50.75264007072544, 15.791301727294922),
            new google.maps.LatLng(50.75285728010646, 15.798339843749998),
            new google.maps.LatLng(50.75470351914962, 15.81001281738281),
            new google.maps.LatLng(50.75546371405961, 15.81705093383789),
            new google.maps.LatLng(50.749707645428245, 15.819797515869139),
            new google.maps.LatLng(50.74253872133164, 15.831642150878908),
            new google.maps.LatLng(50.736455137010665, 15.830097198486328),
            new google.maps.LatLng(50.73178327692273, 15.831985473632812),
            new google.maps.LatLng(50.729610159968324, 15.831127166748045),
            new google.maps.LatLng(50.72765426851595, 15.82958221435547),
            new google.maps.LatLng(50.72591562978367, 15.831127166748045),
            new google.maps.LatLng(50.723959584087375, 15.829925537109375),
            new google.maps.LatLng(50.72330755070861, 15.831985473632812),
            new google.maps.LatLng(50.72189478059446, 15.832328796386719),
            new google.maps.LatLng(50.72146007352842, 15.83404541015625),
            new google.maps.LatLng(50.719069112580804, 15.836791992187498),
            new google.maps.LatLng(50.71515636789281, 15.840568542480467),
            new google.maps.LatLng(50.71287378263816, 15.84228515625),
            new google.maps.LatLng(50.711460697966466, 15.846061706542969),
            new google.maps.LatLng(50.70983016272032, 15.846061706542969),
            new google.maps.LatLng(50.70906922686333, 15.8477783203125),
            new google.maps.LatLng(50.70906922686333, 15.85000991821289),
            new google.maps.LatLng(50.706895056357254, 15.851726531982422),
            new google.maps.LatLng(50.7006981172465, 15.852584838867186),
            new google.maps.LatLng(50.69971957830983, 15.85447311401367),
            new google.maps.LatLng(50.69754497423587, 15.857048034667969),
            new google.maps.LatLng(50.694609098788064, 15.857906341552734),
            new google.maps.LatLng(50.68949806239989, 15.859622955322266),
            new google.maps.LatLng(50.68819302769691, 15.859451293945312),
            new google.maps.LatLng(50.68438646912542, 15.861854553222656),
            new google.maps.LatLng(50.682428690176536, 15.862026214599608),
            new google.maps.LatLng(50.68177607904162, 15.863227844238281),
            new google.maps.LatLng(50.67992696487123, 15.863399505615234),
            new google.maps.LatLng(50.6745967575291, 15.861167907714844),
            new google.maps.LatLng(50.67350888573612, 15.869922637939451),
            new google.maps.LatLng(50.67165944582481, 15.87472915649414),
            new google.maps.LatLng(50.67187703077278, 15.87850570678711),
            new google.maps.LatLng(50.6712242729033, 15.882625579833984),
            new google.maps.LatLng(50.6712242729033, 15.884685516357422),
            new google.maps.LatLng(50.67242098873044, 15.885028839111328),
            new google.maps.LatLng(50.67350888573612, 15.884342193603516),
            new google.maps.LatLng(50.67524946850285, 15.885372161865234),
            new google.maps.LatLng(50.6786216639417, 15.900821685791016),
            new google.maps.LatLng(50.680797145321655, 15.90940475463867),
            new google.maps.LatLng(50.681449770070664, 15.909919738769531),
            new google.maps.LatLng(50.68264622520463, 15.915584564208984),
            new google.maps.LatLng(50.68471275767546, 15.91970443725586),
            new google.maps.LatLng(50.68308129223544, 15.922279357910156),
            new google.maps.LatLng(50.680905916743434, 15.925884246826172),
            new google.maps.LatLng(50.68177607904162, 15.929317474365234),
            new google.maps.LatLng(50.68329882423819, 15.930347442626951),
            new google.maps.LatLng(50.68558284938287, 15.93086242675781),
            new google.maps.LatLng(50.686779199135536, 15.934467315673826),
            new google.maps.LatLng(50.686779199135536, 15.938587188720701),
            new google.maps.LatLng(50.68688795669134, 15.94236373901367),
            new google.maps.LatLng(50.688954302352066, 15.946483612060545),
            new google.maps.LatLng(50.691020557004755, 15.953521728515625),
            new google.maps.LatLng(50.69145554638782, 15.956783294677734),
            new google.maps.LatLng(50.69199927744449, 15.96416473388672),
            new google.maps.LatLng(50.69145554638782, 15.968284606933594),
            new google.maps.LatLng(50.68928055913707, 15.97532272338867),
            new google.maps.LatLng(50.68460399507753, 15.98905563354492),
            new google.maps.LatLng(50.68340758986141, 15.990772247314451),
            new google.maps.LatLng(50.68123222949609, 15.9906005859375),
            new google.maps.LatLng(50.679709417237476, 15.989227294921873),
            new google.maps.LatLng(50.67709876697171, 15.99008560180664),
            new google.maps.LatLng(50.67470554332169, 15.992660522460936),
            new google.maps.LatLng(50.67340009717013, 15.994720458984373),
            new google.maps.LatLng(50.67252977956561, 15.998153686523438),
            new google.maps.LatLng(50.668939548880616, 15.997982025146484),
            new google.maps.LatLng(50.66698112550466, 15.999011993408201),
            new google.maps.LatLng(50.664696194981865, 16.000728607177734),
            new google.maps.LatLng(50.662084709655794, 16.00055694580078),
            new google.maps.LatLng(50.658928971111344, 16.003131866455078),
            new google.maps.LatLng(50.65718778320866, 16.004505157470703),
            new google.maps.LatLng(50.65479354444114, 16.003990173339844),
            new google.maps.LatLng(50.65109311719782, 16.003646850585938),
            new google.maps.LatLng(50.64869856776499, 16.00536346435547),
            new google.maps.LatLng(50.646303896281495, 16.00296020507812),
            new google.maps.LatLng(50.6446710957461, 16.001243591308594),
            new google.maps.LatLng(50.64238507967317, 16.00536346435547),
            new google.maps.LatLng(50.640098952388, 16.006736755371094),
            new google.maps.LatLng(50.636179618298186, 16.007423400878906),
            new google.maps.LatLng(50.63465534455182, 16.00811004638672),
            new google.maps.LatLng(50.63367542818411, 16.015148162841797),
            new google.maps.LatLng(50.63040889275553, 16.021671295166016),
            new google.maps.LatLng(50.62975555843207, 16.01806640625),
            new google.maps.LatLng(50.62801328918144, 16.01308822631836),
            new google.maps.LatLng(50.62561756353908, 16.009483337402344),
            new google.maps.LatLng(50.62376623738931, 16.002273559570312),
            new google.maps.LatLng(50.62224156112367, 15.997982025146484),
            new google.maps.LatLng(50.61875640116947, 15.991115570068358),
            new google.maps.LatLng(50.61483528749928, 15.986480712890625),
            new google.maps.LatLng(50.61243889044519, 15.986995697021483),
            new google.maps.LatLng(50.611022780257315, 15.98939895629883),
            new google.maps.LatLng(50.608735127597356, 15.996437072753906),
            new google.maps.LatLng(50.60786361160991, 16.000041961669922),
            new google.maps.LatLng(50.607101021878165, 16.00296020507812),
            new google.maps.LatLng(50.60470423082665, 16.008625030517578),
            new google.maps.LatLng(50.60677419392376, 16.011028289794922),
            new google.maps.LatLng(50.60633841978648, 16.012916564941406),
            new google.maps.LatLng(50.605902641613284, 16.014633178710934),
            new google.maps.LatLng(50.606011586534954, 16.01583480834961),
            new google.maps.LatLng(50.60285208139405, 16.016693115234375),
            new google.maps.LatLng(50.599910282457614, 16.019439697265625),
            new google.maps.LatLng(50.59980132340988, 16.02252960205078),
            new google.maps.LatLng(50.59849379516109, 16.024932861328125),
            new google.maps.LatLng(50.60361473998915, 16.029052734375),
            new google.maps.LatLng(50.610804913367936, 16.038150787353516),
            new google.maps.LatLng(50.614290662525036, 16.04227066040039),
            new google.maps.LatLng(50.61341924945018, 16.045188903808594),
            new google.maps.LatLng(50.61243889044519, 16.049137115478516),
            new google.maps.LatLng(50.61189423772533, 16.05171203613281),
            new google.maps.LatLng(50.611022780257315, 16.05325698852539),
            new google.maps.LatLng(50.60960662744138, 16.055831909179688),
            new google.maps.LatLng(50.61309246538529, 16.05823516845703),
            new google.maps.LatLng(50.61527098293855, 16.05823516845703),
            new google.maps.LatLng(50.61701372433899, 16.057205200195312),
            new google.maps.LatLng(50.619409888334125, 16.05875015258789),
            new google.maps.LatLng(50.621152476382164, 16.060123443603516),
            new google.maps.LatLng(50.62539976424585, 16.05978012084961),
            new google.maps.LatLng(50.628339969583955, 16.062183380126953),
            new google.maps.LatLng(50.63193330420196, 16.062183380126953),
            new google.maps.LatLng(50.635852992370886, 16.065273284912106),
            new google.maps.LatLng(50.63661511600392, 16.066818237304688),
            new google.maps.LatLng(50.63977235369717, 16.0675048828125),
            new google.maps.LatLng(50.64042554880914, 16.070938110351562),
            new google.maps.LatLng(50.641840773740235, 16.07316970825195),
            new google.maps.LatLng(50.64380024559357, 16.077804565429688),
            new google.maps.LatLng(50.646195044677704, 16.081409454345703),
            new google.maps.LatLng(50.64663044957981, 16.084156036376953),
            new google.maps.LatLng(50.64924279426237, 16.08621597290039),
            new google.maps.LatLng(50.650875435929095, 16.08776092529297),
            new google.maps.LatLng(50.65250802085826, 16.088619232177734),
            new google.maps.LatLng(50.652725694561994, 16.089820861816406),
            new google.maps.LatLng(50.65207267042477, 16.090850830078125),
            new google.maps.LatLng(50.65316103894354, 16.093082427978516),
            new google.maps.LatLng(50.65294336725709, 16.094970703125),
            new google.maps.LatLng(50.6563171650504, 16.098060607910156),
            new google.maps.LatLng(50.65849368018739, 16.099777221679688),
            new google.maps.LatLng(50.66241115326413, 16.100807189941406),
            new google.maps.LatLng(50.66317284619182, 16.104068756103516),
            new google.maps.LatLng(50.66186707932284, 16.106128692626953),
            new google.maps.LatLng(50.66175826377812, 16.108531951904297),
            new google.maps.LatLng(50.66099654790504, 16.11093521118164),
            new google.maps.LatLng(50.658711326153664, 16.112651824951172),
            new google.maps.LatLng(50.6601260003497, 16.114883422851562),
            new google.maps.LatLng(50.66034363875144, 16.119518280029297),
            new google.maps.LatLng(50.660670094462915, 16.124324798583984),
            new google.maps.LatLng(50.66056127614457, 16.126041412353516),
            new google.maps.LatLng(50.65784073623682, 16.1279296875),
            new google.maps.LatLng(50.65718778320866, 16.131534576416012),
            new google.maps.LatLng(50.65642599320274, 16.13393783569336),
            new google.maps.LatLng(50.654031715602784, 16.136341094970703),
            new google.maps.LatLng(50.65185499369506, 16.137027740478516),
            new google.maps.LatLng(50.6507665949165, 16.139774322509766),
            new google.maps.LatLng(50.65337870962132, 16.147499084472656),
            new google.maps.LatLng(50.65294336725709, 16.149559020996094),
            new google.maps.LatLng(50.64924279426237, 16.157798767089844),
            new google.maps.LatLng(50.64761009585741, 16.162090301513672),
            new google.maps.LatLng(50.64554192975927, 16.170330047607422),
            new google.maps.LatLng(50.64358253053366, 16.171875),
            new google.maps.LatLng(50.63977235369717, 16.176509857177734),
            new google.maps.LatLng(50.63715948246174, 16.1773681640625),
            new google.maps.LatLng(50.63519973370705, 16.178054809570312),
            new google.maps.LatLng(50.6335665473267, 16.1802864074707),
            new google.maps.LatLng(50.6289933235794, 16.17908477783203),
            new google.maps.LatLng(50.62790439520953, 16.18234634399414),
            new google.maps.LatLng(50.627142130344296, 16.184921264648438),
            new google.maps.LatLng(50.627251026081666, 16.186981201171875),
            new google.maps.LatLng(50.628339969583955, 16.19110107421875),
            new google.maps.LatLng(50.62975555843207, 16.192646026611328),
            new google.maps.LatLng(50.630517780926716, 16.19710922241211),
            new google.maps.LatLng(50.63127999106346, 16.200714111328125),
            new google.maps.LatLng(50.6321510732305, 16.20260238647461),
            new google.maps.LatLng(50.63193330420196, 16.206893920898438),
            new google.maps.LatLng(50.6321510732305, 16.211700439453125),
            new google.maps.LatLng(50.63225995736648, 16.214447021484375),
            new google.maps.LatLng(50.633348784855336, 16.217880249023438),
            new google.maps.LatLng(50.63661511600392, 16.220111846923828),
            new google.maps.LatLng(50.63835706647616, 16.21856689453125),
            new google.maps.LatLng(50.6395546199757, 16.221141815185547),
            new google.maps.LatLng(50.643691388189694, 16.220626831054688),
            new google.maps.LatLng(50.65141963720962, 16.221485137939453),
            new google.maps.LatLng(50.65348754458195, 16.22406005859375),
            new google.maps.LatLng(50.66197589461538, 16.226806640625),
            new google.maps.LatLng(50.66828675016557, 16.230239868164062),
            new google.maps.LatLng(50.67165944582481, 16.235389709472656),
            new google.maps.LatLng(50.67035391495795, 16.238479614257812),
            new google.maps.LatLng(50.66959233851882, 16.242084503173828),
            new google.maps.LatLng(50.670571505957085, 16.24603271484375),
            new google.maps.LatLng(50.66948354087614, 16.248435974121094),
            new google.maps.LatLng(50.66948354087614, 16.250839233398438),
            new google.maps.LatLng(50.66806914857679, 16.25255584716797),
            new google.maps.LatLng(50.66730753507376, 16.25650405883789),
            new google.maps.LatLng(50.6671987321362, 16.259765625),
            new google.maps.LatLng(50.66839555058174, 16.26251220703125),
            new google.maps.LatLng(50.66817794949724, 16.26577377319336),
            new google.maps.LatLng(50.66730753507376, 16.267147064208984),
            new google.maps.LatLng(50.66785154597947, 16.271610260009766),
            new google.maps.LatLng(50.66741633775917, 16.273841857910153),
            new google.maps.LatLng(50.66872195031748, 16.27676010131836),
            new google.maps.LatLng(50.667960347404204, 16.280193328857422),
            new google.maps.LatLng(50.66730753507376, 16.280193328857422),
            new google.maps.LatLng(50.66545785084436, 16.27967834472656),
            new google.maps.LatLng(50.664152147515786, 16.28070831298828),
            new google.maps.LatLng(50.66295522090177, 16.281394958496094),
            new google.maps.LatLng(50.66132299907784, 16.28225326538086),
            new google.maps.LatLng(50.66056127614457, 16.28448486328125),
            new google.maps.LatLng(50.66088773034316, 16.288604736328125),
            new google.maps.LatLng(50.66001718077061, 16.29220962524414),
            new google.maps.LatLng(50.65969072052044, 16.29547119140625),
            new google.maps.LatLng(50.660670094462915, 16.299762725830078),
            new google.maps.LatLng(50.65979954085599, 16.303024291992184),
            new google.maps.LatLng(50.65903779321198, 16.306285858154297),
            new google.maps.LatLng(50.660670094462915, 16.309032440185547),
            new google.maps.LatLng(50.66219352444405, 16.312808990478512),
            new google.maps.LatLng(50.66447857675186, 16.31366729736328),
            new google.maps.LatLng(50.664696194981865, 16.31641387939453),
            new google.maps.LatLng(50.66600188318191, 16.3201904296875),
            new google.maps.LatLng(50.66665471366635, 16.322078704833984),
            new google.maps.LatLng(50.66502262043578, 16.326026916503906),
            new google.maps.LatLng(50.66404333726616, 16.331520080566406),
            new google.maps.LatLng(50.66295522090177, 16.33392333984375),
            new google.maps.LatLng(50.662302338980155, 16.337356567382812),
            new google.maps.LatLng(50.66262878107562, 16.34044647216797),
            new google.maps.LatLng(50.661431815631126, 16.34267807006836),
            new google.maps.LatLng(50.658711326153664, 16.343708038330078),
            new google.maps.LatLng(50.65664364875093, 16.344738006591797),
            new google.maps.LatLng(50.65239918362813, 16.349201202392578),
            new google.maps.LatLng(50.649351638805335, 16.349887847900387),
            new google.maps.LatLng(50.64706585044717, 16.353321075439453),
            new google.maps.LatLng(50.64663044957981, 16.358299255371094),
            new google.maps.LatLng(50.6479366400775, 16.361045837402344),
            new google.maps.LatLng(50.648589721709, 16.36190414428711),
            new google.maps.LatLng(50.64663044957981, 16.36585235595703),
            new google.maps.LatLng(50.64543307639024, 16.36516571044922),
            new google.maps.LatLng(50.6368328633436, 16.37340545654297),
            new google.maps.LatLng(50.636506241955765, 16.377182006835934),
            new google.maps.LatLng(50.63715948246174, 16.37838363647461),
            new google.maps.LatLng(50.636179618298186, 16.37958526611328),
            new google.maps.LatLng(50.63421982868815, 16.37838363647461),
            new google.maps.LatLng(50.63149776311842, 16.37958526611328),
            new google.maps.LatLng(50.62910221502923, 16.381473541259766),
            new google.maps.LatLng(50.62746881679979, 16.38439178466797),
            new google.maps.LatLng(50.619736628511454, 16.39280319213867),
            new google.maps.LatLng(50.61875640116947, 16.395549774169922),
            new google.maps.LatLng(50.61788507082542, 16.404132843017578),
            new google.maps.LatLng(50.614399588024355, 16.408767700195312),
            new google.maps.LatLng(50.61222103011396, 16.409969329833984),
            new google.maps.LatLng(50.60982449987999, 16.41408920288086),
            new google.maps.LatLng(50.60808149212023, 16.420269012451172),
            new google.maps.LatLng(50.605793696439356, 16.423873901367184),
            new google.maps.LatLng(50.59980132340988, 16.428852081298828),
            new google.maps.LatLng(50.59871171905848, 16.431598663330078),
            new google.maps.LatLng(50.59751312513605, 16.43331527709961),
            new google.maps.LatLng(50.595115845720436, 16.433658599853512),
            new google.maps.LatLng(50.59348126702467, 16.436405181884766),
            new google.maps.LatLng(50.58988499409718, 16.44001007080078),
            new google.maps.LatLng(50.58759631374095, 16.441211700439453),
            new google.maps.LatLng(50.58607046502884, 16.443958282470703),
            new google.maps.LatLng(50.579312540638384, 16.444644927978516),
            new google.maps.LatLng(50.574843057926245, 16.43383026123047),
            new google.maps.LatLng(50.572662668554784, 16.431770324707028),
            new google.maps.LatLng(50.57080925823959, 16.42593383789062),
            new google.maps.LatLng(50.56873771336303, 16.420612335205078),
            new google.maps.LatLng(50.56862868216224, 16.409626007080078),
            new google.maps.LatLng(50.5692828655824, 16.40481948852539),
            new google.maps.LatLng(50.56590282014059, 16.40310287475586),
            new google.maps.LatLng(50.562958712031744, 16.40584945678711),
            new google.maps.LatLng(50.55925105497861, 16.409454345703125),
            new google.maps.LatLng(50.55543404450379, 16.410140991210938),
            new google.maps.LatLng(50.550526005406134, 16.410484313964844),
            new google.maps.LatLng(50.547908175615966, 16.41082763671875),
            new google.maps.LatLng(50.54714461454768, 16.40430450439453),
            new google.maps.LatLng(50.545835623948655, 16.40035629272461),
            new google.maps.LatLng(50.54365389219808, 16.394176483154297),
            new google.maps.LatLng(50.54245389670904, 16.38782501220703),
            new google.maps.LatLng(50.54147205950597, 16.387653350830078),
            new google.maps.LatLng(50.534707736660586, 16.39812469482422),
            new google.maps.LatLng(50.53339840083346, 16.396579742431637),
            new google.maps.LatLng(50.52979753992208, 16.401386260986328),
            new google.maps.LatLng(50.52728768645296, 16.400012969970703),
            new google.maps.LatLng(50.52630553353518, 16.395206451416016),
            new google.maps.LatLng(50.519866469230585, 16.3861083984375),
            new google.maps.LatLng(50.51670118336643, 16.375465393066406),
            new google.maps.LatLng(50.512989888239126, 16.370830535888672),
            new google.maps.LatLng(50.50578477651406, 16.36585235595703),
            new google.maps.LatLng(50.501089945516206, 16.360702514648438),
            new google.maps.LatLng(50.49999805746128, 16.355037689208984),
            new google.maps.LatLng(50.49770501038011, 16.351947784423828),
            new google.maps.LatLng(50.49956129517131, 16.34817123413086),
            new google.maps.LatLng(50.496503846052356, 16.34714126586914),
            new google.maps.LatLng(50.4957394528495, 16.345252990722656),
            new google.maps.LatLng(50.49584865263581, 16.343364715576172),
            new google.maps.LatLng(50.49715903038127, 16.34319305419922),
            new google.maps.LatLng(50.49748661913787, 16.341819763183594),
            new google.maps.LatLng(50.499452103967734, 16.338043212890625),
            new google.maps.LatLng(50.50021643709167, 16.33392333984375),
            new google.maps.LatLng(50.502618546385385, 16.33392333984375),
            new google.maps.LatLng(50.50447463806987, 16.327228546142578),
            new google.maps.LatLng(50.505675599698684, 16.32259368896484),
            new google.maps.LatLng(50.508077431328374, 16.319332122802734),
            new google.maps.LatLng(50.506985704823535, 16.316585540771484),
            new google.maps.LatLng(50.50578477651406, 16.31143569946289),
            new google.maps.LatLng(50.502400177861745, 16.310920715332028),
            new google.maps.LatLng(50.49934291251176, 16.3092041015625),
            new google.maps.LatLng(50.496503846052356, 16.31246566772461),
            new google.maps.LatLng(50.493336993684515, 16.312294006347656),
            new google.maps.LatLng(50.49169888329269, 16.305770874023438),
            new google.maps.LatLng(50.4909344123384, 16.300621032714844),
            new google.maps.LatLng(50.48875014145167, 16.301307678222656),
            new google.maps.LatLng(50.486784211316404, 16.300621032714844),
            new google.maps.LatLng(50.48416284390024, 16.299419403076172),
            new google.maps.LatLng(50.47935662596124, 16.294269561767578),
            new google.maps.LatLng(50.48033975575682, 16.290836334228516),
            new google.maps.LatLng(50.48077669576858, 16.287574768066403),
            new google.maps.LatLng(50.47957510101639, 16.28499984741211),
            new google.maps.LatLng(50.48033975575682, 16.282081604003906),
            new google.maps.LatLng(50.48132286510293, 16.27899169921875),
            new google.maps.LatLng(50.48230595399971, 16.273155212402344),
            new google.maps.LatLng(50.48383516274882, 16.27349853515625),
            new google.maps.LatLng(50.484599748567774, 16.27178192138672),
            new google.maps.LatLng(50.48383516274882, 16.270408630371094),
            new google.maps.LatLng(50.482961335236894, 16.271095275878906),
            new google.maps.LatLng(50.48274287583432, 16.268692016601562),
            new google.maps.LatLng(50.48197825997291, 16.269207000732422),
            new google.maps.LatLng(50.480121284236155, 16.270065307617188),
            new google.maps.LatLng(50.47815499510668, 16.27178192138672),
            new google.maps.LatLng(50.47673484653018, 16.274185180664062),
            new google.maps.LatLng(50.4769533337037, 16.270408630371094),
            new google.maps.LatLng(50.47597013347005, 16.268177032470703),
            new google.maps.LatLng(50.4797935750617, 16.264572143554688),
            new google.maps.LatLng(50.480121284236155, 16.25925064086914),
            new google.maps.LatLng(50.477062576911784, 16.255645751953125),
            new google.maps.LatLng(50.47422217144945, 16.249637603759766),
            new google.maps.LatLng(50.47214638260264, 16.249122619628906),
            new google.maps.LatLng(50.467994531475696, 16.255645751953125),
            new google.maps.LatLng(50.46679261178982, 16.25152587890625),
            new google.maps.LatLng(50.4646072249993, 16.24551773071289),
            new google.maps.LatLng(50.463077394153565, 16.243457794189453),
            new google.maps.LatLng(50.465481391834906, 16.238479614257812),
            new google.maps.LatLng(50.46526285164095, 16.237106323242188),
            new google.maps.LatLng(50.46646481020967, 16.23401641845703),
            new google.maps.LatLng(50.466246274560476, 16.231956481933594),
            new google.maps.LatLng(50.463842315762456, 16.23504638671875),
            new google.maps.LatLng(50.46209390533412, 16.235389709472656),
            new google.maps.LatLng(50.46111039606272, 16.23607635498047),
            new google.maps.LatLng(50.45979901855308, 16.235218048095703),
            new google.maps.LatLng(50.46023614842955, 16.233844757080078),
            new google.maps.LatLng(50.46012686633918, 16.23126983642578),
            new google.maps.LatLng(50.45958045209983, 16.231098175048828),
            new google.maps.LatLng(50.46023614842955, 16.227149963378903),
            new google.maps.LatLng(50.45968973545269, 16.227149963378903),
            new google.maps.LatLng(50.46067327426611, 16.224403381347656),
            new google.maps.LatLng(50.457941171507, 16.220970153808594),
            new google.maps.LatLng(50.45378807306885, 16.229896545410156),
            new google.maps.LatLng(50.45127417845959, 16.23126983642578),
            new google.maps.LatLng(50.44963461000952, 16.231956481933594),
            new google.maps.LatLng(50.44854153281181, 16.234188079833984),
            new google.maps.LatLng(50.44722980684235, 16.233158111572266),
            new google.maps.LatLng(50.445699413919534, 16.233844757080078),
            new google.maps.LatLng(50.44504351608707, 16.231613159179688),
            new google.maps.LatLng(50.4436223729301, 16.231441497802734),
            new google.maps.LatLng(50.44263847959074, 16.230239868164062),
            new google.maps.LatLng(50.44198253933413, 16.22406005859375),
            new google.maps.LatLng(50.44438760916378, 16.22303009033203),
            new google.maps.LatLng(50.44635530266123, 16.220626831054688),
            new google.maps.LatLng(50.44854153281181, 16.220626831054688),
            new google.maps.LatLng(50.44930668950163, 16.222171783447266),
            new google.maps.LatLng(50.45138348100283, 16.220455169677734),
            new google.maps.LatLng(50.4520392909595, 16.21805191040039),
            new google.maps.LatLng(50.451820688650656, 16.213245391845703),
            new google.maps.LatLng(50.44963461000952, 16.2103271484375),
            new google.maps.LatLng(50.44876015027149, 16.20706558227539),
            new google.maps.LatLng(50.44876015027149, 16.204833984375),
            new google.maps.LatLng(50.44679255677195, 16.20431900024414),
            new google.maps.LatLng(50.44515283302377, 16.202259063720703),
            new google.maps.LatLng(50.44176389056169, 16.198654174804688),
            new google.maps.LatLng(50.4344385729574, 16.19831085205078),
            new google.maps.LatLng(50.43323580053468, 16.196250915527344),
            new google.maps.LatLng(50.432142344542534, 16.19556427001953),
            new google.maps.LatLng(50.42864311565685, 16.19831085205078),
            new google.maps.LatLng(50.42908053341026, 16.20037078857422),
            new google.maps.LatLng(50.42962729991966, 16.203975677490234),
            new google.maps.LatLng(50.42765891093747, 16.206722259521484),
            new google.maps.LatLng(50.42700276309305, 16.209983825683594),
            new google.maps.LatLng(50.42492490160417, 16.20981216430664),
            new google.maps.LatLng(50.42317505279245, 16.210670471191406),
            new google.maps.LatLng(50.422190734422955, 16.21204376220703),
            new google.maps.LatLng(50.418472013737, 16.212215423583984),
            new google.maps.LatLng(50.41453422654013, 16.21410369873047),
            new google.maps.LatLng(50.4132215580669, 16.21152877807617),
            new google.maps.LatLng(50.41125248716129, 16.210670471191406),
            new google.maps.LatLng(50.410158523519335, 16.21358871459961),
            new google.maps.LatLng(50.408626931986824, 16.21479034423828),
            new google.maps.LatLng(50.40895513434, 16.217193603515625),
            new google.maps.LatLng(50.40807992301321, 16.217880249023438),
            new google.maps.LatLng(50.40687648104374, 16.221313476562496),
            new google.maps.LatLng(50.40786111765567, 16.222171783447266),
            new google.maps.LatLng(50.40917393464584, 16.224231719970703),
            new google.maps.LatLng(50.41179945951055, 16.229038238525387),
            new google.maps.LatLng(50.4132215580669, 16.232471466064453),
            new google.maps.LatLng(50.41431545098699, 16.23727798461914),
            new google.maps.LatLng(50.413330948495485, 16.239681243896484),
            new google.maps.LatLng(50.41147127685875, 16.241397857666016),
            new google.maps.LatLng(50.409939727759976, 16.241226196289062),
            new google.maps.LatLng(50.40709529094784, 16.247577667236328),
            new google.maps.LatLng(50.40676707571281, 16.249980926513672),
            new google.maps.LatLng(50.40578241636803, 16.253070831298828),
            new google.maps.LatLng(50.40337538516994, 16.253585815429688),
            new google.maps.LatLng(50.40239065535226, 16.251869201660156),
            new google.maps.LatLng(50.39965518739452, 16.25204086303711),
            new google.maps.LatLng(50.399545765392446, 16.250152587890625),
            new google.maps.LatLng(50.39845153147863, 16.247577667236328),
            new google.maps.LatLng(50.39659127585307, 16.247406005859375),
            new google.maps.LatLng(50.39473094722483, 16.248435974121094),
            new google.maps.LatLng(50.39330829372127, 16.250839233398438),
            new google.maps.LatLng(50.39407434322027, 16.253585815429688),
            new google.maps.LatLng(50.39396490833537, 16.254615783691406),
            new google.maps.LatLng(50.39396490833537, 16.257190704345703),
            new google.maps.LatLng(50.39473094722483, 16.25873565673828),
            new google.maps.LatLng(50.39451208023374, 16.26148223876953),
            new google.maps.LatLng(50.39341773012182, 16.263198852539062),
            new google.maps.LatLng(50.390791186788064, 16.264572143554688),
            new google.maps.LatLng(50.388055049422576, 16.266803741455078),
            new google.maps.LatLng(50.38575657202081, 16.267318725585938),
            new google.maps.LatLng(50.38280122309029, 16.265602111816406),
            new google.maps.LatLng(50.38050249104245, 16.266632080078125),
            new google.maps.LatLng(50.37896994111597, 16.269207000732422),
            new google.maps.LatLng(50.3785320606136, 16.27178192138672),
            new google.maps.LatLng(50.37634259746919, 16.276416778564453),
            new google.maps.LatLng(50.37294872988422, 16.27676010131836),
            new google.maps.LatLng(50.37097798567724, 16.278305053710938),
            new google.maps.LatLng(50.369664110729474, 16.278133392333984),
            new google.maps.LatLng(50.36769323009235, 16.27899169921875),
            new google.maps.LatLng(50.36736474202761, 16.282424926757812),
            new google.maps.LatLng(50.36780272560862, 16.285514831542965),
            new google.maps.LatLng(50.368459693400524, 16.28826141357422),
            new google.maps.LatLng(50.370102073087764, 16.29220962524414),
            new google.maps.LatLng(50.37130644872962, 16.293067932128906),
            new google.maps.LatLng(50.373715108302726, 16.29323959350586),
            new google.maps.LatLng(50.3785320606136, 16.2982177734375),
            new google.maps.LatLng(50.38104981830188, 16.299076080322266),
            new google.maps.LatLng(50.38181606585463, 16.301651000976562),
            new google.maps.LatLng(50.38302014414152, 16.304912567138672),
            new google.maps.LatLng(50.38302014414152, 16.308345794677734),
            new google.maps.LatLng(50.382582301028535, 16.310405731201172),
            new google.maps.LatLng(50.38094035335527, 16.31418228149414),
            new google.maps.LatLng(50.38039302483268, 16.31916046142578),
            new google.maps.LatLng(50.38115928299588, 16.320877075195312),
            new google.maps.LatLng(50.38181606585463, 16.323280334472656),
            new google.maps.LatLng(50.38181606585463, 16.32740020751953),
            new google.maps.LatLng(50.37995515746722, 16.330490112304688),
            new google.maps.LatLng(50.37951728605967, 16.334609985351562),
            new google.maps.LatLng(50.377984704301355, 16.338043212890625),
            new google.maps.LatLng(50.37820364758418, 16.341819763183594),
            new google.maps.LatLng(50.38072142270411, 16.347999572753903),
            new google.maps.LatLng(50.37864153111815, 16.351947784423828),
            new google.maps.LatLng(50.38017409165521, 16.357612609863278),
            new google.maps.LatLng(50.379298348840074, 16.361217498779297),
            new google.maps.LatLng(50.376671023383096, 16.36362075805664),
            new google.maps.LatLng(50.373715108302726, 16.364994049072266),
            new google.maps.LatLng(50.37043054220368, 16.363449096679684),
            new google.maps.LatLng(50.366707759076526, 16.36791229248047),
            new google.maps.LatLng(50.36298468388075, 16.365680694580078),
            new google.maps.LatLng(50.35729000392365, 16.366195678710938),
            new google.maps.LatLng(50.35345666157135, 16.361217498779297),
            new google.maps.LatLng(50.34973254689666, 16.36190414428711),
            new google.maps.LatLng(50.346774953629875, 16.364479064941406),
            new google.maps.LatLng(50.34217388684675, 16.375465393066406),
            new google.maps.LatLng(50.32858718412303, 16.383190155029297),
            new google.maps.LatLng(50.3235459675844, 16.391429901123047),
            new google.maps.LatLng(50.323655564934576, 16.392974853515625),
            new google.maps.LatLng(50.31905225862825, 16.399669647216797),
            new google.maps.LatLng(50.32069634777269, 16.405677795410156),
            new google.maps.LatLng(50.322449980182796, 16.4080810546875),
            new google.maps.LatLng(50.324422739309384, 16.410312652587887),
            new google.maps.LatLng(50.32420354789449, 16.415634155273438),
            new google.maps.LatLng(50.324751524536296, 16.420097351074215),
            new google.maps.LatLng(50.32518990130068, 16.424903869628906),
            new google.maps.LatLng(50.324532334637745, 16.42833709716797),
            new google.maps.LatLng(50.32529949485997, 16.430225372314453),
            new google.maps.LatLng(50.3204771391723, 16.436920166015625),
            new google.maps.LatLng(50.319490687960204, 16.43726348876953),
            new google.maps.LatLng(50.31729850086284, 16.43777847290039),
            new google.maps.LatLng(50.315325446039274, 16.438636779785156),
            new google.maps.LatLng(50.31565429419649, 16.440353393554688),
            new google.maps.LatLng(50.31324268822073, 16.443614959716797),
            new google.maps.LatLng(50.31148871613174, 16.445159912109375),
            new google.maps.LatLng(50.30578785998311, 16.448421478271484),
            new google.maps.LatLng(50.30491074453027, 16.44824981689453),
            new google.maps.LatLng(50.30414325523928, 16.45030975341797),
            new google.maps.LatLng(50.30260823950176, 16.454086303710938),
            new google.maps.LatLng(50.30107317422304, 16.45528793334961),
            new google.maps.LatLng(50.29931875324125, 16.456317901611328),
            new google.maps.LatLng(50.297673924802645, 16.461639404296875),
            new google.maps.LatLng(50.29613870028114, 16.462669372558594),
            new google.maps.LatLng(50.29668700044045, 16.46352767944336),
            new google.maps.LatLng(50.29504208100462, 16.464557647705078),
            new google.maps.LatLng(50.29383577060512, 16.465072631835938),
            new google.maps.LatLng(50.29262942961977, 16.465072631835938),
            new google.maps.LatLng(50.290436004012506, 16.467647552490234),
            new google.maps.LatLng(50.28703599449722, 16.466102600097656),
            new google.maps.LatLng(50.28495199762422, 16.46953582763672),
            new google.maps.LatLng(50.27935766004698, 16.47726058959961),
            new google.maps.LatLng(50.27716362268735, 16.479835510253906),
            new google.maps.LatLng(50.27551802830693, 16.481037139892578),
            new google.maps.LatLng(50.272336384547536, 16.48120880126953),
            new google.maps.LatLng(50.27091006143141, 16.483612060546875),
            new google.maps.LatLng(50.270580903875555, 16.487045288085938),
            new google.maps.LatLng(50.26871563474728, 16.488933563232422),
            new google.maps.LatLng(50.26575299831118, 16.48944854736328),
            new google.maps.LatLng(50.263887540074116, 16.48944854736328),
            new google.maps.LatLng(50.26333886198141, 16.493568420410156),
            new google.maps.LatLng(50.26180252969597, 16.496143341064453),
            new google.maps.LatLng(50.259827172514385, 16.497344970703125),
            new google.maps.LatLng(50.260814861344784, 16.50318145751953),
            new google.maps.LatLng(50.26004666069095, 16.506614685058594),
            new google.maps.LatLng(50.258510222217076, 16.50798797607422),
            new google.maps.LatLng(50.25598596571478, 16.5069580078125),
            new google.maps.LatLng(50.25258349532525, 16.508846282958984),
            new google.maps.LatLng(50.251595635829645, 16.514511108398438),
            new google.maps.LatLng(50.25060775585359, 16.515026092529297),
            new google.maps.LatLng(50.247643993041535, 16.512622833251953),
            new google.maps.LatLng(50.24500938246365, 16.51571273803711),
            new google.maps.LatLng(50.24281376239237, 16.518115997314453),
            new google.maps.LatLng(50.24094740580762, 16.521892547607422),
            new google.maps.LatLng(50.23919076814867, 16.523609161376953),
            new google.maps.LatLng(50.23776345238573, 16.529273986816406),
            new google.maps.LatLng(50.238312425044185, 16.534423828125),
            new google.maps.LatLng(50.23897118388973, 16.537513732910156),
            new google.maps.LatLng(50.23655569028473, 16.538543701171875),
            new google.maps.LatLng(50.229967358388414, 16.545581817626953),
            new google.maps.LatLng(50.22930847512914, 16.548671722412106),
            new google.maps.LatLng(50.2275514085972, 16.549358367919922),
            new google.maps.LatLng(50.22337811612336, 16.550731658935547),
            new google.maps.LatLng(50.221510998632795, 16.553478240966797),
            new google.maps.LatLng(50.22063232981847, 16.556224822998047),
            new google.maps.LatLng(50.21975364481886, 16.557254791259766),
            new google.maps.LatLng(50.21689780678922, 16.556568145751953),
            new google.maps.LatLng(50.215140283027054, 16.553821563720703),
            new google.maps.LatLng(50.21327284309005, 16.555194854736328),
            new google.maps.LatLng(50.21349254569977, 16.557941436767578),
            new google.maps.LatLng(50.21041661710501, 16.558284759521484),
            new google.maps.LatLng(50.208548992291014, 16.56034469604492),
            new google.maps.LatLng(50.20734049022724, 16.5618896484375),
            new google.maps.LatLng(50.20503326494332, 16.561031341552734),
            new google.maps.LatLng(50.202725928121346, 16.556053161621094),
            new google.maps.LatLng(50.199759188312086, 16.556739807128906),
            new google.maps.LatLng(50.19778125933641, 16.55536651611328),
            new google.maps.LatLng(50.19558346436019, 16.554508209228512),
            new google.maps.LatLng(50.19371525908205, 16.555709838867188),
            new google.maps.LatLng(50.19195688145611, 16.557769775390625),
            new google.maps.LatLng(50.189868723922075, 16.558456420898434),
            new google.maps.LatLng(50.188330023098274, 16.55914306640625),
            new google.maps.LatLng(50.187011097218026, 16.559486389160156),
            new google.maps.LatLng(50.185252472716876, 16.556568145751953),
            new google.maps.LatLng(50.18415329951982, 16.55811309814453),
            new google.maps.LatLng(50.18415329951982, 16.559829711914062),
            new google.maps.LatLng(50.18261441454758, 16.5618896484375),
            new google.maps.LatLng(50.17986628235167, 16.563949584960938),
            new google.maps.LatLng(50.17876698520522, 16.563434600830078),
            new google.maps.LatLng(50.17491924598287, 16.561031341552734),
            new google.maps.LatLng(50.17392977723802, 16.55862808227539),
            new google.maps.LatLng(50.17217067109738, 16.55811309814453),
            new google.maps.LatLng(50.17052145027411, 16.557941436767578),
            new google.maps.LatLng(50.16722283786781, 16.56034469604492),
            new google.maps.LatLng(50.163484135229446, 16.561546325683594),
            new google.maps.LatLng(50.163154235661814, 16.563949584960938),
            new google.maps.LatLng(50.160624929999365, 16.567726135253906),
            new google.maps.LatLng(50.15886533408327, 16.574935913085938),
            new google.maps.LatLng(50.15776555374638, 16.57888412475586),
            new google.maps.LatLng(50.156225818771155, 16.578712463378906),
            new google.maps.LatLng(50.15512597771467, 16.577510833740234),
            new google.maps.LatLng(50.15424608665335, 16.58111572265625),
            new google.maps.LatLng(50.15391612333084, 16.584033966064453),
            new google.maps.LatLng(50.15204628815918, 16.586265563964844),
            new google.maps.LatLng(50.15050636899785, 16.5838623046875),
            new google.maps.LatLng(50.14929639772529, 16.58180236816406),
            new google.maps.LatLng(50.14797639414881, 16.580257415771484),
            new google.maps.LatLng(50.14621633270524, 16.5838623046875),
            new google.maps.LatLng(50.145556292964905, 16.584720611572266),
            new google.maps.LatLng(50.14379614245967, 16.582317352294922),
            new google.maps.LatLng(50.14324608214329, 16.579914093017575),
            new google.maps.LatLng(50.141375829752675, 16.580944061279297),
            new google.maps.LatLng(50.14203592718145, 16.583690643310543),
            new google.maps.LatLng(50.141375829752675, 16.58609390258789),
            new google.maps.LatLng(50.1402756471295, 16.589698791503906),
            new google.maps.LatLng(50.140715723215045, 16.59553527832031),
            new google.maps.LatLng(50.13862532575246, 16.599140167236328),
            new google.maps.LatLng(50.13532451220405, 16.601715087890625),
            new google.maps.LatLng(50.13356398519569, 16.60531997680664),
            new google.maps.LatLng(50.133453950106876, 16.609954833984375),
            new google.maps.LatLng(50.131473275238775, 16.613044738769528),
            new google.maps.LatLng(50.129162384273044, 16.612873077392578),
            new google.maps.LatLng(50.12575086508482, 16.613731384277344),
            new google.maps.LatLng(50.1241000426924, 16.614933013916012),
            new google.maps.LatLng(50.12189885760119, 16.619911193847656),
            new google.maps.LatLng(50.12134854551253, 16.62454605102539),
            new google.maps.LatLng(50.119697571288164, 16.626605987548825),
            new google.maps.LatLng(50.1154047718332, 16.629352569580078),
            new google.maps.LatLng(50.114634228623785, 16.631927490234375),
            new google.maps.LatLng(50.11166201722957, 16.63330078125),
            new google.maps.LatLng(50.111331760131, 16.639652252197266),
            new google.maps.LatLng(50.11221244066583, 16.64205551147461),
            new google.maps.LatLng(50.110781326571896, 16.64754867553711),
            new google.maps.LatLng(50.10494634186922, 16.671581268310547),
            new google.maps.LatLng(50.10362511455642, 16.677589416503906),
            new google.maps.LatLng(50.10065221985362, 16.68325424194336),
            new google.maps.LatLng(50.0986701875512, 16.689434051513672),
            new google.maps.LatLng(50.0966880732471, 16.702136993408203),
            new google.maps.LatLng(50.09679819285972, 16.706771850585938),
            new google.maps.LatLng(50.0977892579842, 16.70917510986328),
            new google.maps.LatLng(50.099440987634985, 16.711406707763672),
            new google.maps.LatLng(50.10373521822444, 16.721878051757812),
            new google.maps.LatLng(50.10527664300308, 16.723594665527344),
            new google.maps.LatLng(50.107148306404596, 16.723594665527344),
            new google.maps.LatLng(50.10990061971759, 16.7266845703125),
            new google.maps.LatLng(50.1135334310997, 16.728744506835938),
            new google.maps.LatLng(50.1167256742, 16.728744506835938),
            new google.maps.LatLng(50.120137836648595, 16.73320770263672),
            new google.maps.LatLng(50.12343969779324, 16.735782623291012),
            new google.maps.LatLng(50.12575086508482, 16.737670898437496),
            new google.maps.LatLng(50.1327937342602, 16.74419403076172),
            new google.maps.LatLng(50.13455428960849, 16.74488067626953),
            new google.maps.LatLng(50.1348843865248, 16.748313903808594),
            new google.maps.LatLng(50.13532451220405, 16.75088882446289),
            new google.maps.LatLng(50.13400412302062, 16.75312042236328),
            new google.maps.LatLng(50.13455428960849, 16.755008697509766),
            new google.maps.LatLng(50.13532451220405, 16.757583618164062),
            new google.maps.LatLng(50.13554457352548, 16.761703491210938),
            new google.maps.LatLng(50.13774513107287, 16.763935089111328),
            new google.maps.LatLng(50.13950550423828, 16.765823364257812),
            new google.maps.LatLng(50.14159586324102, 16.772174835205078),
            new google.maps.LatLng(50.142806029335844, 16.775951385498047),
            new google.maps.LatLng(50.144566216275784, 16.781787872314453),
            new google.maps.LatLng(50.1476463875619, 16.78384780883789),
            new google.maps.LatLng(50.148636400491256, 16.782817840576172),
            new google.maps.LatLng(50.149736390821076, 16.781787872314453),
            new google.maps.LatLng(50.1513863288765, 16.781444549560547),
            new google.maps.LatLng(50.153256189854694, 16.785907745361328),
            new google.maps.LatLng(50.156225818771155, 16.789169311523438),
            new google.maps.LatLng(50.16590332915412, 16.796722412109375),
            new google.maps.LatLng(50.171730884443285, 16.798782348632812),
            new google.maps.LatLng(50.173599949769624, 16.799297332763672),
            new google.maps.LatLng(50.17447948462596, 16.798439025878906),
            new google.maps.LatLng(50.1774477952383, 16.799468994140625),
            new google.maps.LatLng(50.17887691605819, 16.79981231689453),
            new google.maps.LatLng(50.1816251051701, 16.802215576171875),
            new google.maps.LatLng(50.18272433654695, 16.804275512695312),
            new google.maps.LatLng(50.18316402201491, 16.80582046508789),
            new google.maps.LatLng(50.188549840537036, 16.809425354003906),
            new google.maps.LatLng(50.19019843907705, 16.81131362915039),
            new google.maps.LatLng(50.19162717844243, 16.815261840820312),
            new google.maps.LatLng(50.19173707969992, 16.81732177734375),
            new google.maps.LatLng(50.18909937970737, 16.821269989013672),
            new google.maps.LatLng(50.188549840537036, 16.82350158691406),
            new google.maps.LatLng(50.19019843907705, 16.82453155517578),
            new google.maps.LatLng(50.19228658219332, 16.82350158691406),
            new google.maps.LatLng(50.194374633997754, 16.825904846191406),
            new google.maps.LatLng(50.19558346436019, 16.828651428222656),
            new google.maps.LatLng(50.19734170843505, 16.831741333007812),
            new google.maps.LatLng(50.19723182007738, 16.83431625366211),
            new google.maps.LatLng(50.198550463675915, 16.836204528808594),
            new google.maps.LatLng(50.19997895313967, 16.83483123779297),
            new google.maps.LatLng(50.20162715709816, 16.83431625366211),
            new google.maps.LatLng(50.202945679290885, 16.835689544677734),
            new google.maps.LatLng(50.207889813140895, 16.848220825195312),
            new google.maps.LatLng(50.20481352338486, 16.850967407226562),
            new google.maps.LatLng(50.20371480041715, 16.85405731201172),
            new google.maps.LatLng(50.202725928121346, 16.857662200927734),
            new google.maps.LatLng(50.20151727860476, 16.860408782958984),
            new google.maps.LatLng(50.20074812206894, 16.861953735351562),
            new google.maps.LatLng(50.19888011888459, 16.86229705810547),
            new google.maps.LatLng(50.198330692272144, 16.865901947021484),
            new google.maps.LatLng(50.1974515965398, 16.869678497314453),
            new google.maps.LatLng(50.19723182007738, 16.872081756591797),
            new google.maps.LatLng(50.19789114642944, 16.875171661376953),
            new google.maps.LatLng(50.199099887759026, 16.878433227539062),
            new google.maps.LatLng(50.19986907085235, 16.88152313232422),
            new google.maps.LatLng(50.2018469133262, 16.88392639160156),
            new google.maps.LatLng(50.20514313534317, 16.884613037109375),
            new google.maps.LatLng(50.20613195756049, 16.884613037109375),
            new google.maps.LatLng(50.208548992291014, 16.88392639160156),
            new google.maps.LatLng(50.211515185793594, 16.884613037109375),
            new google.maps.LatLng(50.214591043573925, 16.886329650878906),
            new google.maps.LatLng(50.216458431918326, 16.88924789428711),
            new google.maps.LatLng(50.21766670307656, 16.894569396972656),
            new google.maps.LatLng(50.218545426516634, 16.898517608642578),
            new google.maps.LatLng(50.221510998632795, 16.89800262451172),
            new google.maps.LatLng(50.222719141825074, 16.89971923828125),
            new google.maps.LatLng(50.2230486301122, 16.903667449951172),
            new google.maps.LatLng(50.22337811612336, 16.906414031982422),
            new google.maps.LatLng(50.22414690796479, 16.90967559814453),
            new google.maps.LatLng(50.224696037407725, 16.911563873291016),
            new google.maps.LatLng(50.22546480800649, 16.912765502929688),
            new google.maps.LatLng(50.226013922276096, 16.91619873046875),
            new google.maps.LatLng(50.22590409992796, 16.92066192626953),
            new google.maps.LatLng(50.2252451605284, 16.924266815185547),
            new google.maps.LatLng(50.22370759985845, 16.926498413085938),
            new google.maps.LatLng(50.22282897150701, 16.92890167236328),
            new google.maps.LatLng(50.22359777219965, 16.932678222656246),
            new google.maps.LatLng(50.22359777219965, 16.935596466064453),
            new google.maps.LatLng(50.222609311890224, 16.938514709472653),
            new google.maps.LatLng(50.222609311890224, 16.941261291503906),
            new google.maps.LatLng(50.22315845903549, 16.942806243896484),
            new google.maps.LatLng(50.22216998962196, 16.947269439697266),
            new google.maps.LatLng(50.221291332946564, 16.950187683105465),
            new google.maps.LatLng(50.222938800936056, 16.957054138183594),
            new google.maps.LatLng(50.224696037407725, 16.957740783691406),
            new google.maps.LatLng(50.226123744371364, 16.95842742919922),
            new google.maps.LatLng(50.22963791789675, 16.96460723876953),
            new google.maps.LatLng(50.23073604401821, 16.96615219116211),
            new google.maps.LatLng(50.23359105358706, 16.961860656738278),
            new google.maps.LatLng(50.2360066973968, 16.961517333984375),
            new google.maps.LatLng(50.23787324742315, 16.962032318115234),
            new google.maps.LatLng(50.23908097614562, 16.963577270507812),
            new google.maps.LatLng(50.24226484157093, 16.96975708007812),
            new google.maps.LatLng(50.24489960386224, 16.975250244140625),
            new google.maps.LatLng(50.244350707062274, 16.977825164794922),
            new google.maps.LatLng(50.2420452714723, 16.97988510131836),
            new google.maps.LatLng(50.238312425044185, 16.981258392333984),
            new google.maps.LatLng(50.2360066973968, 16.980743408203125),
            new google.maps.LatLng(50.233151832472245, 16.982460021972656),
            new google.maps.LatLng(50.231175287386165, 16.986408233642578),
            new google.maps.LatLng(50.2281004988427, 16.98984146118164),
            new google.maps.LatLng(50.226233566213736, 16.992931365966797),
            new google.maps.LatLng(50.22370759985845, 16.99361801147461),
            new google.maps.LatLng(50.22118149972412, 16.994304656982422),
            new google.maps.LatLng(50.21744701968755, 16.996192932128906),
            new google.maps.LatLng(50.21590920763945, 16.99808120727539),
            new google.maps.LatLng(50.21733717761366, 17.00580596923828),
            new google.maps.LatLng(50.218106066819786, 17.009925842285156),
            new google.maps.LatLng(50.21931429624952, 17.014217376708984),
            new google.maps.LatLng(50.22348794428793, 17.017650604248047),
            new google.maps.LatLng(50.226123744371364, 17.02108383178711),
            new google.maps.LatLng(50.227661227152076, 17.024173736572262),
            new google.maps.LatLng(50.22930847512914, 17.027435302734375),
            new google.maps.LatLng(50.23029679660417, 17.027950286865234),
            new google.maps.LatLng(50.2338106626272, 17.023487091064453),
            new google.maps.LatLng(50.23776345238573, 17.018508911132812),
            new google.maps.LatLng(50.23984951485669, 17.01559066772461),
            new google.maps.LatLng(50.24116698096343, 17.013015747070312),
            new google.maps.LatLng(50.24215505664802, 17.010612487792965),
            new google.maps.LatLng(50.243692022558044, 17.010440826416016),
            new google.maps.LatLng(50.24830262292927, 17.011642456054688),
            new google.maps.LatLng(50.250168691512464, 17.009239196777344),
            new google.maps.LatLng(50.25192492460376, 17.00580596923828),
            new google.maps.LatLng(50.25313229730662, 17.002544403076172),
            new google.maps.LatLng(50.25653472850593, 17.001686096191406),
            new google.maps.LatLng(50.2594979383533, 17.006492614746094),
            new google.maps.LatLng(50.260814861344784, 17.011127471923828),
            new google.maps.LatLng(50.263887540074116, 17.013187408447266),
            new google.maps.LatLng(50.265972459182514, 17.014217376708984),
            new google.maps.LatLng(50.26871563474728, 17.017135620117188),
            new google.maps.LatLng(50.27409180049994, 17.017478942871094),
            new google.maps.LatLng(50.278480057237566, 17.02005386352539),
            new google.maps.LatLng(50.28023524667722, 17.017135620117188),
            new google.maps.LatLng(50.28615853325233, 17.015933990478516),
            new google.maps.LatLng(50.292848766619365, 17.011642456054688),
            new google.maps.LatLng(50.29602903949096, 17.008209228515625),
            new google.maps.LatLng(50.29646768113502, 17.004261016845703),
            new google.maps.LatLng(50.29909944606875, 17.003746032714844),
            new google.maps.LatLng(50.30249859362479, 17.00237274169922),
            new google.maps.LatLng(50.30315646509512, 17.000484466552734),
            new google.maps.LatLng(50.302279301112605, 16.996192932128906),
            new google.maps.LatLng(50.302937175616044, 16.989669799804688),
            new google.maps.LatLng(50.305020384846536, 16.982803344726562),
            new google.maps.LatLng(50.30830947680294, 16.971988677978516),
            new google.maps.LatLng(50.31028282278776, 16.972332000732422),
            new google.maps.LatLng(50.31159834128289, 16.970787048339844),
            new google.maps.LatLng(50.31390041107301, 16.968727111816406),
            new google.maps.LatLng(50.31576390974341, 16.968555450439453),
            new google.maps.LatLng(50.31455812482655, 16.962718963623047),
            new google.maps.LatLng(50.31280420126435, 16.96117401123047),
            new google.maps.LatLng(50.31236571026408, 16.955852508544922),
            new google.maps.LatLng(50.31291382338257, 16.952762603759766),
            new google.maps.LatLng(50.31554467839683, 16.945552825927734),
            new google.maps.LatLng(50.31817538783308, 16.946582794189453),
            new google.maps.LatLng(50.31970990110981, 16.940231323242188),
            new google.maps.LatLng(50.326285825521026, 16.937313079833984),
            new google.maps.LatLng(50.33099801169434, 16.934223175048828),
            new google.maps.LatLng(50.33307999161918, 16.938514709472653),
            new google.maps.LatLng(50.3392158228155, 16.93593978881836),
            new google.maps.LatLng(50.34151655520418, 16.93817138671875),
            new google.maps.LatLng(50.3433789712311, 16.936111450195312),
            new google.maps.LatLng(50.3454604086048, 16.93061828613281),
            new google.maps.LatLng(50.353237604087994, 16.923065185546875),
            new google.maps.LatLng(50.35904228590904, 16.919288635253906),
            new google.maps.LatLng(50.36002791610071, 16.91946029663086),
            new google.maps.LatLng(50.36309419026126, 16.914997100830078),
            new google.maps.LatLng(50.36572226759569, 16.91619873046875),
            new google.maps.LatLng(50.36911665209698, 16.919803619384766),
            new google.maps.LatLng(50.37305821327337, 16.91722869873047),
            new google.maps.LatLng(50.377437341673236, 16.91619873046875),
            new google.maps.LatLng(50.37984568999428, 16.914310455322266),
            new google.maps.LatLng(50.38269176218573, 16.914997100830078),
            new google.maps.LatLng(50.38488093227791, 16.91019058227539),
            new google.maps.LatLng(50.38904007706254, 16.910877227783203),
            new google.maps.LatLng(50.39166671739982, 16.907615661621094),
            new google.maps.LatLng(50.39013452821946, 16.901264190673828),
            new google.maps.LatLng(50.38969675078809, 16.89920425415039),
            new google.maps.LatLng(50.39166671739982, 16.893882751464844),
            new google.maps.LatLng(50.39484038034144, 16.89250946044922),
            new google.maps.LatLng(50.39845153147863, 16.885299682617188),
            new google.maps.LatLng(50.40020229361594, 16.87877655029297),
            new google.maps.LatLng(50.40337538516994, 16.871395111083984),
            new google.maps.LatLng(50.40753290772497, 16.86676025390625),
            new google.maps.LatLng(50.40917393464584, 16.86246871948242),
            new google.maps.LatLng(50.40775171459803, 16.859893798828125),
            new google.maps.LatLng(50.41169006554585, 16.860580444335934),
            new google.maps.LatLng(50.41475300108295, 16.86504364013672),
            new google.maps.LatLng(50.41737821679422, 16.86899185180664),
            new google.maps.LatLng(50.42262821177945, 16.86899185180664),
            new google.maps.LatLng(50.4261278851575, 16.87276840209961),
            new google.maps.LatLng(50.42853376058713, 16.875858306884766),
            new google.maps.LatLng(50.43170495507443, 16.876373291015625),
            new google.maps.LatLng(50.43334514474492, 16.87551498413086),
            new google.maps.LatLng(50.436406680099765, 16.880664825439453),
            new google.maps.LatLng(50.44220118709643, 16.8804931640625),
            new google.maps.LatLng(50.443841013116625, 16.88426971435547),
            new google.maps.LatLng(50.4441689715025, 16.888561248779297),
            new google.maps.LatLng(50.44340373173348, 16.89319610595703),
            new google.maps.LatLng(50.44722980684235, 16.897144317626953),
            new google.maps.LatLng(50.448104294862276, 16.89971923828125),
            new google.maps.LatLng(50.44821360472843, 16.90418243408203),
            new google.maps.LatLng(50.44930668950163, 16.908130645751953),
            new google.maps.LatLng(50.44537146613963, 16.915512084960938),
            new google.maps.LatLng(50.44318508952675, 16.919631958007812),
            new google.maps.LatLng(50.44067063154785, 16.921863555908203),
            new google.maps.LatLng(50.43826537282658, 16.92718505859375),
            new google.maps.LatLng(50.43553197591581, 16.93765640258789),
            new google.maps.LatLng(50.4340012047029, 16.947269439697266),
            new google.maps.LatLng(50.42929924077168, 16.955337524414062),
            new google.maps.LatLng(50.42590916314808, 16.96392059326172),
            new google.maps.LatLng(50.42197199422933, 16.970272064208984),
            new google.maps.LatLng(50.417706358529024, 16.974048614501953),
            new google.maps.LatLng(50.41989391200375, 16.981945037841797),
            new google.maps.LatLng(50.42426871587652, 16.99207305908203),
            new google.maps.LatLng(50.427877624865204, 16.997909545898438),
            new google.maps.LatLng(50.42547171609858, 17.005290985107422),
            new google.maps.LatLng(50.42240947360632, 17.009925842285156),
            new google.maps.LatLng(50.41858139204215, 17.013530731201172),
            new google.maps.LatLng(50.42087827810755, 17.017993927001953),
            new google.maps.LatLng(50.4218626237537, 17.019023895263672),
            new google.maps.LatLng(50.421315767587004, 17.023658752441406),
            new google.maps.LatLng(50.419018902737065, 17.025718688964844),
            new google.maps.LatLng(50.416065627123736, 17.028980255126953),
            new google.maps.LatLng(50.41497177461547, 17.030868530273438),
            new google.maps.LatLng(50.41486238797549, 17.037734985351562),
            new google.maps.LatLng(50.41169006554585, 17.04202651977539),
            new google.maps.LatLng(50.40709529094784, 17.052154541015625),
            new google.maps.LatLng(50.406438858204524, 17.063312530517575),
            new google.maps.LatLng(50.40534478342528, 17.071208953857422),
            new google.maps.LatLng(50.40403186034834, 17.077045440673828),
            new google.maps.LatLng(50.40206240753302, 17.082366943359375),
            new google.maps.LatLng(50.40337538516994, 17.082538604736328),
            new google.maps.LatLng(50.40545419203986, 17.08322525024414),
            new google.maps.LatLng(50.40611063842292, 17.088031768798828),
            new google.maps.LatLng(50.40632945186324, 17.099876403808594),
            new google.maps.LatLng(50.40622004526938, 17.104511260986328),
            new google.maps.LatLng(50.40490714644109, 17.111034393310547),
            new google.maps.LatLng(50.39385547319788, 17.111034393310547),
            new google.maps.LatLng(50.39429321223223, 17.11841583251953),
            new google.maps.LatLng(50.39429321223223, 17.122020721435547),
            new google.maps.LatLng(50.39396490833537, 17.124252319335938),
            new google.maps.LatLng(50.39232335474891, 17.12596893310547),
            new google.maps.LatLng(50.3909006289987, 17.129745483398438),
            new google.maps.LatLng(50.38783615161265, 17.1331787109375),
            new google.maps.LatLng(50.38433364922834, 17.137813568115234),
            new google.maps.LatLng(50.38050249104245, 17.143306732177734),
            new google.maps.LatLng(50.38115928299588, 17.14794158935547),
            new google.maps.LatLng(50.3814876755621, 17.149486541748047),
            new google.maps.LatLng(50.38159713924558, 17.153606414794922),
            new google.maps.LatLng(50.38006462468755, 17.156696319580078),
            new google.maps.LatLng(50.38137821162599, 17.159786224365234),
            new google.maps.LatLng(50.38345798321248, 17.161846160888672),
            new google.maps.LatLng(50.38542820901189, 17.173690795898438),
            new google.maps.LatLng(50.38717945212008, 17.18158721923828),
            new google.maps.LatLng(50.39002508424055, 17.18364715576172),
            new google.maps.LatLng(50.386194385829306, 17.203731536865234),
            new google.maps.LatLng(50.38367690123221, 17.203044891357422),
            new google.maps.LatLng(50.38323906418225, 17.202186584472656),
            new google.maps.LatLng(50.381925528780215, 17.202186584472656),
            new google.maps.LatLng(50.38104981830188, 17.202701568603516),
            new google.maps.LatLng(50.375357306084986, 17.198925018310547),
            new google.maps.LatLng(50.36418924017004, 17.20081329345703),
            new google.maps.LatLng(50.35761856172297, 17.213001251220703),
            new google.maps.LatLng(50.35641383867465, 17.212657928466797),
            new google.maps.LatLng(50.348418083742, 17.221069335937496),
            new google.maps.LatLng(50.34480312244701, 17.224674224853516),
            new google.maps.LatLng(50.34162611110967, 17.232398986816406),
            new google.maps.LatLng(50.339982745993964, 17.237205505371094),
            new google.maps.LatLng(50.33822976053448, 17.238922119140625),
            new google.maps.LatLng(50.33647671038328, 17.243385314941406),
            new google.maps.LatLng(50.3336278659104, 17.247333526611328),
            new google.maps.LatLng(50.33220337961226, 17.247333526611328),
            new google.maps.LatLng(50.32858718412303, 17.26055145263672),
            new google.maps.LatLng(50.32803925170755, 17.264842987060547),
            new google.maps.LatLng(50.32420354789449, 17.270336151123047),
            new google.maps.LatLng(50.32091555536218, 17.276859283447266),
            new google.maps.LatLng(50.31883304244587, 17.284927368164062),
            new google.maps.LatLng(50.31751772412182, 17.291107177734375),
            new google.maps.LatLng(50.319271473799695, 17.297801971435547),
            new google.maps.LatLng(50.320257929560945, 17.310504913330078),
            new google.maps.LatLng(50.326833778154146, 17.32767105102539),
            new google.maps.LatLng(50.32858718412303, 17.348098754882812),
            new google.maps.LatLng(50.32518990130068, 17.34964370727539),
            new google.maps.LatLng(50.32288837817617, 17.348613739013672),
            new google.maps.LatLng(50.32255958006024, 17.34088897705078),
            new google.maps.LatLng(50.31346193018245, 17.337627410888672),
            new google.maps.LatLng(50.31181759082695, 17.342262268066406),
            new google.maps.LatLng(50.31225608688213, 17.345352172851562),
            new google.maps.LatLng(50.311379090727826, 17.349987030029297),
            new google.maps.LatLng(50.307870944351926, 17.353763580322266),
            new google.maps.LatLng(50.306993867317814, 17.353248596191406),
            new google.maps.LatLng(50.30633604892657, 17.351016998291016),
            new google.maps.LatLng(50.30271788512593, 17.350845336914062),
            new google.maps.LatLng(50.29833186300282, 17.34569549560547),
            new google.maps.LatLng(50.29098436989355, 17.344837188720703),
            new google.maps.LatLng(50.28736503829308, 17.348098754882812),
            new google.maps.LatLng(50.283196982107825, 17.33745574951172),
            new google.maps.LatLng(50.281003121706796, 17.34294891357422),
            new google.maps.LatLng(50.279906153586886, 17.343463897705078),
            new google.maps.LatLng(50.27858975847354, 17.343978881835934),
            new google.maps.LatLng(50.27573744417743, 17.342262268066406),
            new google.maps.LatLng(50.27365295257927, 17.34466552734375),
            new google.maps.LatLng(50.27123921671192, 17.34466552734375),
            new google.maps.LatLng(50.26871563474728, 17.346038818359375),
            new google.maps.LatLng(50.26696002058882, 17.346038818359375),
            new google.maps.LatLng(50.265314073534675, 17.348098754882812),
            new google.maps.LatLng(50.263887540074116, 17.35067367553711),
            new google.maps.LatLng(50.26465567878524, 17.354793548583984),
            new google.maps.LatLng(50.265533536428585, 17.358226776123047),
            new google.maps.LatLng(50.26432647799741, 17.36166000366211),
            new google.maps.LatLng(50.26498487729768, 17.36286163330078),
            new google.maps.LatLng(50.26696002058882, 17.362346649169922),
            new google.maps.LatLng(50.27025174404439, 17.36286163330078),
            new google.maps.LatLng(50.274750064796706, 17.362003326416016),
            new google.maps.LatLng(50.27858975847354, 17.36286163330078),
            new google.maps.LatLng(50.28012554923326, 17.36286163330078),
            new google.maps.LatLng(50.281770984349336, 17.36612319946289),
            new google.maps.LatLng(50.282977600618025, 17.37384796142578),
            new google.maps.LatLng(50.28308729148933, 17.3887825012207),
            new google.maps.LatLng(50.279577058221335, 17.400798797607422),
            new google.maps.LatLng(50.27387237704521, 17.406978607177734),
            new google.maps.LatLng(50.27738303097373, 17.420711517333984),
            new google.maps.LatLng(50.274311222943425, 17.423114776611328),
            new google.maps.LatLng(50.27255581508093, 17.423114776611328),
            new google.maps.LatLng(50.270580903875555, 17.42483139038086),
            new google.maps.LatLng(50.2682767372753, 17.42809295654297),
            new google.maps.LatLng(50.263229125604376, 17.431182861328125),
            new google.maps.LatLng(50.25938819312728, 17.42774963378906),
            new google.maps.LatLng(50.25785173341543, 17.427921295166016),
            new google.maps.LatLng(50.25444939627204, 17.429466247558594),
            new google.maps.LatLng(50.253461575461344, 17.43307113647461),
            new google.maps.LatLng(50.252254211102304, 17.43701934814453),
            new google.maps.LatLng(50.25137610871599, 17.440624237060547),
            new google.maps.LatLng(50.2529127772726, 17.445087432861328),
            new google.maps.LatLng(50.2548884211696, 17.448692321777344),
            new google.maps.LatLng(50.25620547158976, 17.453155517578125),
            new google.maps.LatLng(50.258180978954, 17.45555877685547),
            new google.maps.LatLng(50.259827172514385, 17.45676040649414),
            new google.maps.LatLng(50.2612538275847, 17.45693206787109),
            new google.maps.LatLng(50.26399727493418, 17.456417083740234),
            new google.maps.LatLng(50.26630164859332, 17.45676040649414),
            new google.maps.LatLng(50.26706974836985, 17.457275390625),
            new google.maps.LatLng(50.26970313926949, 17.455902099609375),
            new google.maps.LatLng(50.27025174404439, 17.45779037475586),
            new google.maps.LatLng(50.268057287022394, 17.460708618164062),
            new google.maps.LatLng(50.2672892031735, 17.464313507080078),
            new google.maps.LatLng(50.26970313926949, 17.469120025634766),
            new google.maps.LatLng(50.2691545281742, 17.47203826904297),
            new google.maps.LatLng(50.270361464240914, 17.47426986694336),
            new google.maps.LatLng(50.27123921671192, 17.478561401367188),
            new google.maps.LatLng(50.27134893463313, 17.480449676513672),
            new google.maps.LatLng(50.273323813984256, 17.485942840576172),
            new google.maps.LatLng(50.27398208889897, 17.489376068115234),
            new google.maps.LatLng(50.27496948420651, 17.49589920043945),
            new google.maps.LatLng(50.274311222943425, 17.497615814208984),
            new google.maps.LatLng(50.274750064796706, 17.503280639648438),
            new google.maps.LatLng(50.27442093378594, 17.512893676757812),
            new google.maps.LatLng(50.27409180049994, 17.518386840820312),
            new google.maps.LatLng(50.27507919353221, 17.524394989013672),
            new google.maps.LatLng(50.27398208889897, 17.525596618652344),
            new google.maps.LatLng(50.27354323996707, 17.527313232421875),
            new google.maps.LatLng(50.2726655299684, 17.53108978271484),
            new google.maps.LatLng(50.27222666890162, 17.535552978515625),
            new google.maps.LatLng(50.2716780868799, 17.53881454467773),
            new google.maps.LatLng(50.27069062331364, 17.540531158447266),
            new google.maps.LatLng(50.26970313926949, 17.54962921142578),
            new google.maps.LatLng(50.27123921671192, 17.557010650634766),
            new google.maps.LatLng(50.27156836971714, 17.560443878173828),
            new google.maps.LatLng(50.27025174404439, 17.562847137451172),
            new google.maps.LatLng(50.271897520447034, 17.565937042236328),
            new google.maps.LatLng(50.27321410061363, 17.569713592529297),
            new google.maps.LatLng(50.275188902605095, 17.574005126953125),
            new google.maps.LatLng(50.27595685903672, 17.57915496826172),
            new google.maps.LatLng(50.27716362268735, 17.580013275146484),
            new google.maps.LatLng(50.27804124976567, 17.582244873046875),
            new google.maps.LatLng(50.27760243824892, 17.58550643920898),
            new google.maps.LatLng(50.279028560889444, 17.592029571533203),
            new google.maps.LatLng(50.2778218445129, 17.592029571533203),
            new google.maps.LatLng(50.27628597942962, 17.595977783203125),
            new google.maps.LatLng(50.27464035471261, 17.597694396972656),
            new google.maps.LatLng(50.272884958984925, 17.598037719726562),
            new google.maps.LatLng(50.27101978011105, 17.597522735595703),
            new google.maps.LatLng(50.270142023595035, 17.599754333496094),
            new google.maps.LatLng(50.2699225819379, 17.60181427001953),
            new google.maps.LatLng(50.26948369558982, 17.60335922241211),
            new google.maps.LatLng(50.2682767372753, 17.604045867919922),
            new google.maps.LatLng(50.2671794758981, 17.605075836181637),
            new google.maps.LatLng(50.2671794758981, 17.607479095458984),
            new google.maps.LatLng(50.266191919042555, 17.609882354736328),
            new google.maps.LatLng(50.26608218923894, 17.611942291259766),
            new google.maps.LatLng(50.26706974836985, 17.61829376220703),
            new google.maps.LatLng(50.268825358483234, 17.621212005615234),
            new google.maps.LatLng(50.2698128607301, 17.626876831054688),
            new google.maps.LatLng(50.27387237704521, 17.638893127441406),
            new google.maps.LatLng(50.27628597942962, 17.641468048095703),
            new google.maps.LatLng(50.277931547265666, 17.651081085205078),
            new google.maps.LatLng(50.2797964553845, 17.65228271484375),
            new google.maps.LatLng(50.28528105582898, 17.658119201660156),
            new google.maps.LatLng(50.28879086845208, 17.665843963623047),
            new google.maps.LatLng(50.291532729455106, 17.668590545654297),
            new google.maps.LatLng(50.291642400609064, 17.6715087890625),
            new google.maps.LatLng(50.29208108269716, 17.676143646240234),
            new google.maps.LatLng(50.295590393802534, 17.679061889648434),
            new google.maps.LatLng(50.297235294280476, 17.68112182617187),
            new google.maps.LatLng(50.29920909978138, 17.686443328857422),
            new google.maps.LatLng(50.3019503604486, 17.689533233642578),
            new google.maps.LatLng(50.305568582636454, 17.687129974365234),
            new google.maps.LatLng(50.31565429419649, 17.689361572265625),
            new google.maps.LatLng(50.31620236940374, 17.687129974365234),
            new google.maps.LatLng(50.31883304244587, 17.68798828125),
            new google.maps.LatLng(50.321244364850926, 17.687816619873047),
            new google.maps.LatLng(50.3231075756565, 17.687816619873047),
            new google.maps.LatLng(50.32803925170755, 17.686614990234375),
            new google.maps.LatLng(50.32639541655309, 17.696399688720703),
            new google.maps.LatLng(50.3233267721259, 17.71099090576172),
            new google.maps.LatLng(50.32080595169379, 17.716655731201172),
            new google.maps.LatLng(50.318942650663416, 17.721118927001953),
            new google.maps.LatLng(50.31587352503761, 17.723350524902344),
            new google.maps.LatLng(50.31126946507119, 17.724380493164062),
            new google.maps.LatLng(50.3077613106073, 17.7264404296875),
            new google.maps.LatLng(50.30304682048195, 17.72867202758789),
            new google.maps.LatLng(50.30315646509512, 17.73244857788086),
            new google.maps.LatLng(50.30326610945549, 17.733650207519528),
            new google.maps.LatLng(50.301840713055064, 17.73759841918945),
            new google.maps.LatLng(50.301731065408795, 17.740516662597656),
            new google.maps.LatLng(50.30107317422304, 17.74240493774414),
            new google.maps.LatLng(50.30118282338591, 17.745494842529293),
            new google.maps.LatLng(50.30162141750976, 17.746353149414062),
            new google.maps.LatLng(50.30074422521789, 17.750301361083984),
            new google.maps.LatLng(50.29942840644836, 17.750816345214844),
            new google.maps.LatLng(50.297673924802645, 17.7513313293457),
            new google.maps.LatLng(50.29745461004709, 17.749271392822262),
            new google.maps.LatLng(50.29668700044045, 17.747726440429688),
            new google.maps.LatLng(50.29591937844801, 17.748584747314453),
            new google.maps.LatLng(50.29515174406974, 17.748584747314453),
            new google.maps.LatLng(50.294384097305596, 17.747726440429688),
            new google.maps.LatLng(50.293397104694776, 17.747211456298828),
            new google.maps.LatLng(50.29251976074081, 17.746009826660156),
            new google.maps.LatLng(50.29131338638882, 17.743778228759766),
            new google.maps.LatLng(50.29032633007793, 17.743091583251953),
            new google.maps.LatLng(50.28955860545818, 17.74240493774414),
            new google.maps.LatLng(50.28824247729278, 17.74120330810547),
            new google.maps.LatLng(50.281222512297234, 17.736053466796875),
            new google.maps.LatLng(50.27880916018711, 17.735881805419922),
            new google.maps.LatLng(50.27727332695693, 17.734508514404297),
            new google.maps.LatLng(50.27420151184809, 17.72747039794922),
            new google.maps.LatLng(50.27277524460306, 17.725753784179688),
            new google.maps.LatLng(50.2699225819379, 17.725582122802734),
            new google.maps.LatLng(50.26893508196637, 17.725925445556637),
            new google.maps.LatLng(50.256863983146594, 17.72541046142578),
            new google.maps.LatLng(50.25412012494403, 17.72970199584961),
            new google.maps.LatLng(50.25357133434055, 17.732105255126953),
            new google.maps.LatLng(50.25093705145455, 17.73639678955078),
            new google.maps.LatLng(50.24896124371442, 17.73794174194336),
            new google.maps.LatLng(50.236445892212885, 17.765235900878906),
            new google.maps.LatLng(50.2341400742909, 17.764892578124996),
            new google.maps.LatLng(50.23194395354427, 17.762832641601562),
            new google.maps.LatLng(50.22974773164686, 17.760601043701172),
            new google.maps.LatLng(50.2218404952654, 17.756481170654297),
            new google.maps.LatLng(50.21678796345085, 17.75991439819336),
            new google.maps.LatLng(50.213931947884305, 17.75991439819336),
            new google.maps.LatLng(50.210965904610696, 17.757167816162106),
            new google.maps.LatLng(50.20942788366133, 17.75888442993164),
            new google.maps.LatLng(50.20679116099066, 17.75888442993164),
            new google.maps.LatLng(50.20536287538413, 17.750816345214844),
            new google.maps.LatLng(50.204483909150234, 17.747383117675778),
            new google.maps.LatLng(50.20283580383257, 17.745494842529293),
            new google.maps.LatLng(50.20195679106085, 17.74154663085937),
            new google.maps.LatLng(50.20228642274718, 17.73468017578125),
            new google.maps.LatLng(50.20360492672932, 17.732276916503906),
            new google.maps.LatLng(50.206901027343804, 17.724380493164062),
            new google.maps.LatLng(50.20536287538413, 17.71717071533203),
            new google.maps.LatLng(50.203165429448724, 17.716999053955078),
            new google.maps.LatLng(50.2023962994701, 17.717342376708984),
            new google.maps.LatLng(50.19964930551891, 17.711334228515625),
            new google.maps.LatLng(50.198550463675915, 17.71047592163086),
            new google.maps.LatLng(50.196902153486775, 17.710819244384766),
            new google.maps.LatLng(50.195143893224035, 17.711334228515625),
            new google.maps.LatLng(50.193055875060516, 17.710304260253903),
            new google.maps.LatLng(50.19195688145611, 17.71047592163086),
            new google.maps.LatLng(50.189868723922075, 17.706012725830078),
            new google.maps.LatLng(50.18964891255403, 17.704296112060547),
            new google.maps.LatLng(50.18635162061864, 17.705669403076172),
            new google.maps.LatLng(50.18470288928027, 17.704639434814453),
            new google.maps.LatLng(50.18393346184497, 17.69845962524414),
            new google.maps.LatLng(50.183383863231114, 17.69622802734375),
            new google.maps.LatLng(50.183383863231114, 17.690048217773438),
            new google.maps.LatLng(50.18228464703169, 17.68970489501953),
            new google.maps.LatLng(50.18228464703169, 17.686958312988278),
            new google.maps.LatLng(50.18140525585923, 17.683696746826172),
            new google.maps.LatLng(50.18272433654695, 17.679233551025387),
            new google.maps.LatLng(50.17854712274037, 17.668075561523438),
            new google.maps.LatLng(50.17777759614505, 17.661724090576172),
            new google.maps.LatLng(50.17711799205486, 17.65331268310547),
            new google.maps.LatLng(50.17623850576849, 17.644042968749996),
            new google.maps.LatLng(50.175139125143474, 17.640094757080075),
            new google.maps.LatLng(50.173599949769624, 17.637004852294922),
            new google.maps.LatLng(50.17338006352582, 17.631168365478516),
            new google.maps.LatLng(50.169202032633315, 17.625675201416016),
            new google.maps.LatLng(50.170301549863765, 17.621383666992188),
            new google.maps.LatLng(50.17107119687292, 17.61932373046875),
            new google.maps.LatLng(50.17129109374161, 17.61383056640625),
            new google.maps.LatLng(50.17041150019541, 17.61211395263672),
            new google.maps.LatLng(50.17140104179651, 17.606449127197266),
            new google.maps.LatLng(50.17052145027411, 17.603702545166016),
            new google.maps.LatLng(50.169202032633315, 17.601299285888672),
            new google.maps.LatLng(50.160295010698476, 17.592716217041016),
            new google.maps.LatLng(50.15688571126106, 17.595462799072266),
            new google.maps.LatLng(50.15534594794995, 17.59683609008789),
            new google.maps.LatLng(50.15545593268812, 17.59906768798828),
            new google.maps.LatLng(50.154136099132195, 17.599925994873047),
            new google.maps.LatLng(50.15358615773128, 17.601470947265625),
            new google.maps.LatLng(50.152926219701094, 17.602157592773438),
            new google.maps.LatLng(50.15105634581956, 17.603187561035153),
            new google.maps.LatLng(50.14874640066278, 17.60610580444336),
            new google.maps.LatLng(50.14665635413847, 17.60610580444336),
            new google.maps.LatLng(50.145336277694014, 17.607650756835938),
            new google.maps.LatLng(50.143686130902424, 17.60936737060547),
            new google.maps.LatLng(50.141815895717286, 17.60902404785156),
            new google.maps.LatLng(50.140715723215045, 17.610397338867188),
            new google.maps.LatLng(50.1396155254104, 17.611255645751953),
            new google.maps.LatLng(50.13939548281317, 17.616920471191406),
            new google.maps.LatLng(50.13796518126094, 17.617263793945312),
            new google.maps.LatLng(50.136974947444195, 17.616920471191406),
            new google.maps.LatLng(50.136974947444195, 17.621212005615234),
            new google.maps.LatLng(50.13631478017998, 17.622756958007812),
            new google.maps.LatLng(50.1351044498705, 17.626018524169922),
            new google.maps.LatLng(50.13422419041487, 17.629451751708984),
            new google.maps.LatLng(50.13246362292085, 17.63134002685547),
            new google.maps.LatLng(50.13268369740013, 17.634429931640625),
            new google.maps.LatLng(50.13136323534225, 17.637691497802734),
            new google.maps.LatLng(50.13070299064921, 17.640094757080075),
            new google.maps.LatLng(50.128502109215, 17.641468048095703),
            new google.maps.LatLng(50.12718153177013, 17.64352798461914),
            new google.maps.LatLng(50.12553075872216, 17.64301300048828),
            new google.maps.LatLng(50.124540267564136, 17.644901275634766),
            new google.maps.LatLng(50.122889403418334, 17.644042968749996),
            new google.maps.LatLng(50.120688162655306, 17.645244598388672),
            new google.maps.LatLng(50.118596890173016, 17.646446228027344),
            new google.maps.LatLng(50.11650552633616, 17.646446228027344),
            new google.maps.LatLng(50.116285377460095, 17.64850616455078),
            new google.maps.LatLng(50.11507454054758, 17.648162841796875),
            new google.maps.LatLng(50.11309310500418, 17.648162841796875),
            new google.maps.LatLng(50.11122167392532, 17.649364471435547),
            new google.maps.LatLng(50.110230886686004, 17.652454376220703),
            new google.maps.LatLng(50.10935016970876, 17.65880584716797),
            new google.maps.LatLng(50.10879971337307, 17.661380767822266),
            new google.maps.LatLng(50.10725840197403, 17.665328979492188),
            new google.maps.LatLng(50.1056069418592, 17.667903900146484),
            new google.maps.LatLng(50.10373521822444, 17.674942016601562),
            new google.maps.LatLng(50.10307459242007, 17.676315307617188),
            new google.maps.LatLng(50.117496183751925, 17.683353424072266),
            new google.maps.LatLng(50.1167256742, 17.692279815673828),
            new google.maps.LatLng(50.11694582105156, 17.696399688720703),
            new google.maps.LatLng(50.11683574775231, 17.697772979736328),
            new google.maps.LatLng(50.11584507667116, 17.69845962524414),
            new google.maps.LatLng(50.11452415001019, 17.70498275756836),
            new google.maps.LatLng(50.09679819285972, 17.73090362548828),
            new google.maps.LatLng(50.09008043331951, 17.72987365722656),
            new google.maps.LatLng(50.08809796366313, 17.72918701171875),
            new google.maps.LatLng(50.08754726309376, 17.73141860961914),
            new google.maps.LatLng(50.086776271666096, 17.731246948242188),
            new google.maps.LatLng(50.086555986123045, 17.733135223388672),
            new google.maps.LatLng(50.08523425160345, 17.734508514404297),
            new google.maps.LatLng(50.08391248063561, 17.73468017578125),
            new google.maps.LatLng(50.0823703684395, 17.738971710205078),
            new google.maps.LatLng(50.082921128490376, 17.740001678466797),
            new google.maps.LatLng(50.08148913919598, 17.739486694335934),
            new google.maps.LatLng(50.08137898440154, 17.742919921875),
            new google.maps.LatLng(50.07851487090004, 17.747554779052734),
            new google.maps.LatLng(50.078845354267536, 17.748241424560547),
            new google.maps.LatLng(50.07719291464891, 17.749786376953125),
            new google.maps.LatLng(50.076201423540226, 17.74944305419922),
            new google.maps.LatLng(50.07565058628708, 17.75167465209961),
            new google.maps.LatLng(50.07388786455134, 17.751846313476562),
            new google.maps.LatLng(50.07311665341498, 17.75064468383789),
            new google.maps.LatLng(50.06904004564326, 17.753047943115234),
            new google.maps.LatLng(50.0676076417242, 17.757511138916016),
            new google.maps.LatLng(50.0677178281599, 17.75888442993164),
            new google.maps.LatLng(50.065844624325884, 17.75665283203125),
            new google.maps.LatLng(50.06518347609408, 17.759742736816406),
            new google.maps.LatLng(50.062428593700936, 17.75562286376953),
            new google.maps.LatLng(50.06044498040943, 17.75613784790039),
            new google.maps.LatLng(50.05967355308975, 17.758026123046875),
            new google.maps.LatLng(50.058571492543614, 17.75665283203125),
            new google.maps.LatLng(50.0591225259811, 17.76163101196289),
            new google.maps.LatLng(50.05691835425775, 17.761974334716797),
            new google.maps.LatLng(50.05614687023125, 17.763347625732422),
            new google.maps.LatLng(50.055485588335365, 17.762317657470703),
            new google.maps.LatLng(50.05372212539006, 17.76111602783203),
            new google.maps.LatLng(50.052179042148765, 17.765064239501953),
            new google.maps.LatLng(50.052399485649794, 17.76678085327148),
            new google.maps.LatLng(50.050966584791894, 17.767295837402344),
            new google.maps.LatLng(50.051627928965864, 17.76935577392578),
            new google.maps.LatLng(50.049092726804695, 17.769012451171875),
            new google.maps.LatLng(50.04876203838836, 17.771930694580078),
            new google.maps.LatLng(50.04556526622524, 17.771587371826172),
            new google.maps.LatLng(50.04413216131132, 17.7703857421875),
            new google.maps.LatLng(50.04269901361038, 17.771930694580078),
            new google.maps.LatLng(50.04225803647889, 17.773990631103516),
            new google.maps.LatLng(50.04005309005797, 17.77141571044922),
            new google.maps.LatLng(50.03751727647424, 17.770729064941403),
            new google.maps.LatLng(50.03707625174409, 17.769699096679688),
            new google.maps.LatLng(50.03509159032692, 17.7703857421875),
            new google.maps.LatLng(50.03564289339373, 17.772617340087887),
            new google.maps.LatLng(50.034871067327856, 17.77536392211914),
            new google.maps.LatLng(50.03299658094514, 17.775535583496094),
            new google.maps.LatLng(50.03068093791795, 17.77656555175781),
            new google.maps.LatLng(50.02814462934094, 17.77639389038086),
            new google.maps.LatLng(50.02671100437417, 17.772617340087887),
            new google.maps.LatLng(50.026269880390814, 17.771587371826172),
            new google.maps.LatLng(50.022630452945066, 17.77416229248047),
            new google.maps.LatLng(50.0210863701164, 17.77759552001953),
            new google.maps.LatLng(50.02009371923324, 17.777938842773438),
            new google.maps.LatLng(50.01954223765783, 17.78360366821289),
            new google.maps.LatLng(50.020204014788675, 17.785491943359375),
            new google.maps.LatLng(50.01910104783961, 17.78738021850586),
            new google.maps.LatLng(50.01755685157043, 17.78738021850586),
            new google.maps.LatLng(50.01799805556886, 17.79132843017578),
            new google.maps.LatLng(50.01954223765783, 17.791500091552734),
            new google.maps.LatLng(50.017777454076096, 17.79510498046875),
            new google.maps.LatLng(50.016233215266084, 17.794246673583984),
            new google.maps.LatLng(50.01402707372779, 17.795791625976562),
            new google.maps.LatLng(50.013254900259675, 17.80008316040039),
            new google.maps.LatLng(50.013254900259675, 17.803001403808594),
            new google.maps.LatLng(50.01237240110258, 17.804203033447266),
            new google.maps.LatLng(50.01126925436572, 17.82754898071289),
            new google.maps.LatLng(50.00365685169585, 17.83699035644531),
            new google.maps.LatLng(49.99405688634991, 17.826519012451172),
            new google.maps.LatLng(49.991518644112546, 17.832183837890625),
            new google.maps.LatLng(49.9899735615043, 17.833385467529297),
            new google.maps.LatLng(49.99240152617323, 17.836132049560547),
            new google.maps.LatLng(49.99218080717759, 17.838363647460938),
            new google.maps.LatLng(49.99129792106478, 17.838878631591797),
            new google.maps.LatLng(49.9904150187433, 17.838706970214844),
            new google.maps.LatLng(49.98898026790062, 17.84008026123047),
            new google.maps.LatLng(49.98743510374161, 17.842483520507812),
            new google.maps.LatLng(49.98732473297361, 17.846775054931637),
            new google.maps.LatLng(49.98710399067782, 17.849349975585938),
            new google.maps.LatLng(49.986331384664645, 17.850894927978516),
            new google.maps.LatLng(49.98412387053012, 17.851409912109375),
            new google.maps.LatLng(49.98279931342137, 17.85003662109375),
            new google.maps.LatLng(49.98224740386195, 17.852954864501953),
            new google.maps.LatLng(49.98279931342137, 17.853984832763672),
            new google.maps.LatLng(49.981364335396584, 17.856731414794922),
            new google.maps.LatLng(49.98026047702005, 17.855873107910156),
            new google.maps.LatLng(49.98070202341, 17.859649658203125),
            new google.maps.LatLng(49.98081240937428, 17.86102294921875),
            new google.maps.LatLng(49.978935813535564, 17.863426208496094),
            new google.maps.LatLng(49.97617598080071, 17.865142822265625),
            new google.maps.LatLng(49.97330558682922, 17.866687774658203),
            new google.maps.LatLng(49.97242235423708, 17.868919372558594),
            new google.maps.LatLng(49.975403199267284, 17.87527084350586),
            new google.maps.LatLng(49.97496160424735, 17.87595748901367),
            new google.maps.LatLng(49.97915659331578, 17.884883880615234),
            new google.maps.LatLng(49.978273468116235, 17.885913848876953),
            new google.maps.LatLng(49.97981892657768, 17.889175415039062),
            new google.maps.LatLng(49.9799293145682, 17.891578674316403),
            new google.maps.LatLng(49.97915659331578, 17.894325256347656),
            new google.maps.LatLng(49.97761111357882, 17.898788452148438),
            new google.maps.LatLng(49.97661756467614, 17.909603118896484),
            new google.maps.LatLng(49.97761111357882, 17.911663055419922),
            new google.maps.LatLng(49.97871503274224, 17.922992706298828),
            new google.maps.LatLng(49.982137021190255, 17.924365997314453),
            new google.maps.LatLng(49.98853879749191, 17.932090759277344),
            new google.maps.LatLng(50.00498083441922, 17.953891754150387),
            new google.maps.LatLng(50.00498083441922, 17.962646484375),
            new google.maps.LatLng(50.0082906316877, 17.965736389160153),
            new google.maps.LatLng(50.0088422424077, 17.970714569091797),
            new google.maps.LatLng(50.008180308784, 17.97466278076172),
            new google.maps.LatLng(50.00674608799155, 17.977581024169922),
            new google.maps.LatLng(50.00531182440217, 17.98238754272461),
            new google.maps.LatLng(50.00619445321424, 17.984962463378906),
            new google.maps.LatLng(50.0091732058009, 17.986507415771484),
            new google.maps.LatLng(50.012593027411235, 17.98788070678711),
            new google.maps.LatLng(50.01446831013858, 17.992000579833984),
            new google.maps.LatLng(50.01568168937735, 17.99680709838867),
            new google.maps.LatLng(50.01821865604876, 18.004703521728512),
            new google.maps.LatLng(50.01612291059477, 18.00487518310547),
            new google.maps.LatLng(50.01435800141573, 18.006248474121094),
            new google.maps.LatLng(50.012593027411235, 18.006248474121094),
            new google.maps.LatLng(50.01115893829927, 18.006935119628906),
            new google.maps.LatLng(50.01148988573894, 18.014488220214844),
            new google.maps.LatLng(50.01038671874375, 18.023757934570312),
            new google.maps.LatLng(50.01126925436572, 18.03131103515625),
            new google.maps.LatLng(50.01082798858057, 18.036117553710938),
            new google.maps.LatLng(50.00806998562707, 18.038349151611328),
            new google.maps.LatLng(50.005753140834116, 18.043498992919922),
            new google.maps.LatLng(50.00464984215712, 18.04401397705078),
            new google.maps.LatLng(50.00509116466678, 18.045902252197266),
            new google.maps.LatLng(50.00663576154257, 18.045730590820312),
            new google.maps.LatLng(50.01027640065146, 18.045730590820312),
            new google.maps.LatLng(50.01336521151482, 18.041095733642578),
            new google.maps.LatLng(50.01402707372779, 18.042469024658203),
            new google.maps.LatLng(50.01568168937735, 18.042469024658203),
            new google.maps.LatLng(50.01612291059477, 18.046588897705078),
            new google.maps.LatLng(50.01910104783961, 18.045730590820312),
            new google.maps.LatLng(50.01921134567398, 18.046588897705078),
            new google.maps.LatLng(50.02207900048926, 18.04229736328125),
            new google.maps.LatLng(50.023843626065265, 18.045387268066406),
            new google.maps.LatLng(50.024725914545115, 18.047103881835938),
            new google.maps.LatLng(50.02682128473699, 18.04676055908203),
            new google.maps.LatLng(50.02737268275304, 18.048477172851562),
            new google.maps.LatLng(50.03608393128972, 18.044357299804688),
            new google.maps.LatLng(50.03839931378149, 18.030624389648438),
            new google.maps.LatLng(50.03884032635863, 18.02530288696289),
            new google.maps.LatLng(50.03685573785988, 18.02478790283203),
            new google.maps.LatLng(50.03575315324749, 18.022727966308594),
            new google.maps.LatLng(50.03156310080884, 18.017749786376953),
            new google.maps.LatLng(50.03046039466325, 18.011398315429688),
            new google.maps.LatLng(50.03222471234271, 18.008136749267578),
            new google.maps.LatLng(50.03861982057644, 18.004188537597656),
            new google.maps.LatLng(50.04126582312201, 18.005905151367188),
            new google.maps.LatLng(50.04710856212852, 18.00607681274414),
            new google.maps.LatLng(50.05317102992865, 18.005218505859375),
            new google.maps.LatLng(50.05416299720225, 18.010196685791016),
            new google.maps.LatLng(50.06066538593667, 18.020324707031246),
            new google.maps.LatLng(50.065954814811846, 18.033714294433594),
            new google.maps.LatLng(50.063971347333386, 18.039207458496094),
            new google.maps.LatLng(50.062648990114795, 18.042640686035156),
            new google.maps.LatLng(50.062318395114296, 18.046417236328125),
            new google.maps.LatLng(50.058351077396516, 18.049335479736328),
            new google.maps.LatLng(50.05923273190915, 18.0615234375),
            new google.maps.LatLng(50.05284036961384, 18.064098358154297),
            new google.maps.LatLng(50.05284036961384, 18.067874908447266),
            new google.maps.LatLng(50.04799042322258, 18.06598663330078),
            new google.maps.LatLng(50.04556526622524, 18.077316284179688),
            new google.maps.LatLng(50.046006212975385, 18.08624267578125),
            new google.maps.LatLng(50.04369119734518, 18.089332580566406),
            new google.maps.LatLng(50.036635222962936, 18.087615966796875),
            new google.maps.LatLng(50.03465054331602, 18.08521270751953),
            new google.maps.LatLng(50.031893907715165, 18.08521270751953),
            new google.maps.LatLng(50.03079120916551, 18.090190887451172),
            new google.maps.LatLng(50.025828752356176, 18.096885681152344),
            new google.maps.LatLng(50.026269880390814, 18.09894561767578),
            new google.maps.LatLng(50.02229958223122, 18.102893829345703),
            new google.maps.LatLng(50.01667443141906, 18.095855712890625),
            new google.maps.LatLng(50.01490954249781, 18.09345245361328),
            new google.maps.LatLng(50.013916763992015, 18.094482421875),
            new google.maps.LatLng(50.01137957017893, 18.095169067382812),
            new google.maps.LatLng(50.004208515595614, 18.101863861083984),
            new google.maps.LatLng(50.00056741685909, 18.105297088623047),
            new google.maps.LatLng(49.99791917183082, 18.112335205078125),
            new google.maps.LatLng(49.99681569335, 18.115596771240234),
            new google.maps.LatLng(49.99427759673479, 18.115596771240234),
            new google.maps.LatLng(49.99416724166898, 18.119544982910153),
            new google.maps.LatLng(49.99527078093052, 18.124523162841797),
            new google.maps.LatLng(49.998029518286025, 18.131046295166016),
            new google.maps.LatLng(49.99736743575603, 18.13465118408203),
            new google.maps.LatLng(49.993946530777606, 18.13568115234375),
            new google.maps.LatLng(49.991849726784764, 18.147010803222653),
            new google.maps.LatLng(49.98279931342137, 18.153705596923828),
            new google.maps.LatLng(49.983461596534646, 18.160743713378906),
            new google.maps.LatLng(49.984896512001, 18.162975311279297),
            new google.maps.LatLng(49.98555876624133, 18.167953491210938),
            new google.maps.LatLng(49.988649165474, 18.169841766357422),
            new google.maps.LatLng(49.990083926193925, 18.171558380126953),
            new google.maps.LatLng(49.99229116680205, 18.170185089111328),
            new google.maps.LatLng(49.99328439202532, 18.167781829833984),
            new google.maps.LatLng(49.998691591699, 18.167953491210938),
            new google.maps.LatLng(49.99847090157433, 18.173789978027344),
            new google.maps.LatLng(50.000015711174115, 18.172931671142578),
            new google.maps.LatLng(50.00034673534484, 18.18288803100586),
            new google.maps.LatLng(49.998581246763294, 18.19009780883789),
            new google.maps.LatLng(49.99449830610663, 18.193359375),
            new google.maps.LatLng(49.99791917183082, 18.20657730102539),
            new google.maps.LatLng(49.99251188529114, 18.21121215820312),
            new google.maps.LatLng(49.988649165474, 18.21155548095703),
            new google.maps.LatLng(49.98577951562862, 18.213443756103516),
            new google.maps.LatLng(49.983571976167084, 18.214130401611328),
            new google.maps.LatLng(49.98246816844554, 18.213958740234375),
            new google.maps.LatLng(49.97816307632653, 18.214473724365234),
            new google.maps.LatLng(49.97518240226389, 18.215675354003906),
            new google.maps.LatLng(49.97341598976347, 18.214130401611328),
            new google.maps.LatLng(49.971870325635074, 18.21430206298828),
            new google.maps.LatLng(49.96899967482812, 18.22031021118164),
            new google.maps.LatLng(49.9680059481165, 18.221683502197266),
            new google.maps.LatLng(49.96977255919705, 18.226490020751953),
            new google.maps.LatLng(49.969551736358106, 18.230953216552734),
            new google.maps.LatLng(49.970987066700765, 18.234558105468746),
            new google.maps.LatLng(49.970435021634835, 18.241939544677734),
            new google.maps.LatLng(49.96877884844304, 18.24777603149414),
            new google.maps.LatLng(49.969220500199995, 18.253612518310547),
            new google.maps.LatLng(49.966680947252286, 18.26202392578125),
            new google.maps.LatLng(49.96590801323716, 18.265113830566406),
            new google.maps.LatLng(49.96679136538411, 18.268203735351562),
            new google.maps.LatLng(49.96601843314208, 18.272666931152344),
            new google.maps.LatLng(49.96458295462077, 18.277473449707028),
            new google.maps.LatLng(49.95817799043337, 18.279533386230465),
            new google.maps.LatLng(49.95033627078014, 18.281593322753906),
            new google.maps.LatLng(49.940173269826396, 18.279190063476562),
            new google.maps.LatLng(49.93917894807068, 18.282623291015625),
            new google.maps.LatLng(49.93719024299726, 18.281936645507812),
            new google.maps.LatLng(49.93144463391753, 18.288116455078125),
            new google.maps.LatLng(49.92857157247926, 18.289661407470703),
            new google.maps.LatLng(49.92879258328582, 18.299274444580078),
            new google.maps.LatLng(49.92481423371192, 18.300991058349606),
            new google.maps.LatLng(49.92415114352604, 18.29944610595703),
            new google.maps.LatLng(49.91851450867772, 18.31592559814453),
            new google.maps.LatLng(49.916967081867064, 18.31523895263672),
            new google.maps.LatLng(49.9153090694608, 18.31918716430664),
            new google.maps.LatLng(49.916303883745705, 18.322792053222656),
            new google.maps.LatLng(49.924703719314344, 18.3306884765625),
            new google.maps.LatLng(49.9296766163778, 18.330173492431637),
            new google.maps.LatLng(49.93100263561308, 18.33120346069336),
            new google.maps.LatLng(49.93022912882622, 18.33412170410156),
            new google.maps.LatLng(49.927355994928085, 18.333606719970703),
            new google.maps.LatLng(49.92691395912691, 18.337383270263672),
            new google.maps.LatLng(49.925919363752655, 18.339614868164062),
            new google.maps.LatLng(49.92879258328582, 18.343563079833984),
            new google.maps.LatLng(49.930008124606914, 18.347339630126953),
            new google.maps.LatLng(49.92934510586846, 18.34939956665039),
            new google.maps.LatLng(49.93011862684324, 18.34991455078125),
            new google.maps.LatLng(49.931555132860254, 18.34218978881836),
            new google.maps.LatLng(49.93243911528137, 18.340988159179688),
            new google.maps.LatLng(49.93464900039598, 18.34270477294922),
            new google.maps.LatLng(49.9343175240892, 18.34819793701172),
            new google.maps.LatLng(49.93442801644479, 18.351287841796875),
            new google.maps.LatLng(49.935753904950985, 18.351974487304688),
            new google.maps.LatLng(49.937079756975294, 18.348712921142578),
            new google.maps.LatLng(49.940173269826396, 18.34716796875),
            new google.maps.LatLng(49.94006279064466, 18.34339141845703),
            new google.maps.LatLng(49.938405572518036, 18.341331481933594),
            new google.maps.LatLng(49.939510390935965, 18.33669662475586),
            new google.maps.LatLng(49.94094661700493, 18.334293365478516),
            new google.maps.LatLng(49.944813166695106, 18.334293365478516),
            new google.maps.LatLng(49.94912124222014, 18.333263397216797),
            new google.maps.LatLng(49.94580737216961, 18.337554931640625),
            new google.maps.LatLng(49.94426082145374, 18.355236053466797),
            new google.maps.LatLng(49.943377055894246, 18.357810974121094),
            new google.maps.LatLng(49.941057094159945, 18.36090087890625),
            new google.maps.LatLng(49.940504705851524, 18.363990783691406),
            new google.maps.LatLng(49.93829508928285, 18.366050720214844),
            new google.maps.LatLng(49.937079756975294, 18.368282318115234),
            new google.maps.LatLng(49.93719024299726, 18.373775482177734),
            new google.maps.LatLng(49.935532926066756, 18.376522064208984),
            new google.maps.LatLng(49.935201455840335, 18.382530212402344),
            new google.maps.LatLng(49.935201455840335, 18.388023376464844),
            new google.maps.LatLng(49.93398604550227, 18.391799926757812),
            new google.maps.LatLng(49.93498047442262, 18.398323059082028),
            new google.maps.LatLng(49.935753904950985, 18.402786254882812),
            new google.maps.LatLng(49.93696927070001, 18.412742614746094),
            new google.maps.LatLng(49.938626538228355, 18.42184066772461),
            new google.maps.LatLng(49.93818460579434, 18.430767059326172),
            new google.maps.LatLng(49.92835056065926, 18.432655334472656),
            new google.maps.LatLng(49.928240054369226, 18.437976837158203),
            new google.maps.LatLng(49.92614038672044, 18.440380096435547),
            new google.maps.LatLng(49.923377526781145, 18.444156646728516),
            new google.maps.LatLng(49.92348804421907, 18.450164794921875),
            new google.maps.LatLng(49.92249337815646, 18.45497131347656),
            new google.maps.LatLng(49.92282493579096, 18.460807800292965),
            new google.maps.LatLng(49.920835555779355, 18.465099334716797),
            new google.maps.LatLng(49.91641441739937, 18.465957641601562),
            new google.maps.LatLng(49.91497746013836, 18.47024917602539),
            new google.maps.LatLng(49.91066633142826, 18.48175048828125),
            new google.maps.LatLng(49.90967140084136, 18.483810424804688),
            new google.maps.LatLng(49.90779203151199, 18.484325408935547),
            new google.maps.LatLng(49.90746037049926, 18.486042022705075),
            new google.maps.LatLng(49.90646537377804, 18.48501205444336),
            new google.maps.LatLng(49.905580915017495, 18.488445281982422),
            new google.maps.LatLng(49.90502812005686, 18.490333557128906),
            new google.maps.LatLng(49.9031485698061, 18.491363525390625),
            new google.maps.LatLng(49.904696440039785, 18.492393493652344),
            new google.maps.LatLng(49.904917560304554, 18.494281768798828),
            new google.maps.LatLng(49.90613370364327, 18.494281768798828),
            new google.maps.LatLng(49.905580915017495, 18.496170043945312),
            new google.maps.LatLng(49.90381194884486, 18.497371673583984),
            new google.maps.LatLng(49.90303800574607, 18.498058319091797),
            new google.maps.LatLng(49.904364757742144, 18.499603271484375),
            new google.maps.LatLng(49.904917560304554, 18.5009765625),
            new google.maps.LatLng(49.9031485698061, 18.502178192138672),
            new google.maps.LatLng(49.90336969716595, 18.503379821777344),
            new google.maps.LatLng(49.902264050230855, 18.507671356201172),
            new google.maps.LatLng(49.902816876865835, 18.514881134033203),
            new google.maps.LatLng(49.90215348414364, 18.516254425048828),
            new google.maps.LatLng(49.90215348414364, 18.52020263671875),
            new google.maps.LatLng(49.9010478093348, 18.521232604980465),
            new google.maps.LatLng(49.89983153777739, 18.522262573242188),
            new google.maps.LatLng(49.89972096611543, 18.524150848388672),
            new google.maps.LatLng(49.900273821891346, 18.524322509765625),
            new google.maps.LatLng(49.90115837795597, 18.526382446289062),
            new google.maps.LatLng(49.900163251242965, 18.528270721435547),
            new google.maps.LatLng(49.9009372404602, 18.529300689697266),
            new google.maps.LatLng(49.89972096611543, 18.530502319335938),
            new google.maps.LatLng(49.90038439228633, 18.533077239990234),
            new google.maps.LatLng(49.89961039420002, 18.534278869628906),
            new google.maps.LatLng(49.90193235120907, 18.534622192382812),
            new google.maps.LatLng(49.90292744143267, 18.539600372314453),
            new google.maps.LatLng(49.904807000298874, 18.539772033691406),
            new google.maps.LatLng(49.90956085173141, 18.546810150146484),
            new google.maps.LatLng(49.910997970396316, 18.542003631591797),
            new google.maps.LatLng(49.91254558876119, 18.539600372314453),
            new google.maps.LatLng(49.914756385989854, 18.539772033691406),
            new google.maps.LatLng(49.916635483946564, 18.540973663330078),
            new google.maps.LatLng(49.918072391799285, 18.541316986083984),
            new google.maps.LatLng(49.91995136053499, 18.540802001953125),
            new google.maps.LatLng(49.922161818241676, 18.54320526123047),
            new google.maps.LatLng(49.92580885188871, 18.5394287109375),
            new google.maps.LatLng(49.92625089782431, 18.543548583984375),
            new google.maps.LatLng(49.924703719314344, 18.547840118408203),
            new google.maps.LatLng(49.92282493579096, 18.551101684570312),
            new google.maps.LatLng(49.92072503226061, 18.551616668701172),
            new google.maps.LatLng(49.919840834989266, 18.555049896240234),
            new google.maps.LatLng(49.91917767639419, 18.557281494140625),
            new google.maps.LatLng(49.918072391799285, 18.55916976928711),
            new google.maps.LatLng(49.92006188582734, 18.56861114501953),
            new google.maps.LatLng(49.921388169572616, 18.570499420166016),
            new google.maps.LatLng(49.921609213316316, 18.573246002197266),
            new google.maps.LatLng(49.91917767639419, 18.574962615966797),
            new google.maps.LatLng(49.91785133183984, 18.575649261474606),
            new google.maps.LatLng(49.915419605394845, 18.574275970458984),
            new google.maps.LatLng(49.91342991981491, 18.57616424560547),
            new google.maps.LatLng(49.91177178578665, 18.573589324951172),
            new google.maps.LatLng(49.910445237515994, 18.575305938720703),
            new google.maps.LatLng(49.90812369024422, 18.57341766357422),
            new google.maps.LatLng(49.90679704163232, 18.577709197998043),
            new google.maps.LatLng(49.905249238801304, 18.58011245727539),
            new google.maps.LatLng(49.9031485698061, 18.577880859375),
            new google.maps.LatLng(49.900052680341155, 18.577194213867188),
            new google.maps.LatLng(49.895850798301694, 18.573246002197266),
            new google.maps.LatLng(49.89153795992766, 18.571014404296875),
            new google.maps.LatLng(49.88987907330548, 18.573074340820312),
            new google.maps.LatLng(49.886892933697986, 18.573074340820312),
            new google.maps.LatLng(49.88534449228095, 18.570499420166016),
            new google.maps.LatLng(49.8846808593254, 18.570499420166016),
            new google.maps.LatLng(49.88457025294581, 18.568096160888672),
            new google.maps.LatLng(49.88324295662375, 18.56603622436523),
            new google.maps.LatLng(49.88080948525145, 18.56603622436523),
            new google.maps.LatLng(49.8761634265651, 18.571701049804688),
            new google.maps.LatLng(49.87384022957381, 18.569297790527344),
            new google.maps.LatLng(49.872070099704864, 18.572216033935547),
            new google.maps.LatLng(49.87251263825472, 18.57341766357422),
            new google.maps.LatLng(49.870189265628106, 18.575649261474606),
            new google.maps.LatLng(49.86930414189444, 18.579769134521484),
            new google.maps.LatLng(49.86731255418675, 18.579769134521484),
            new google.maps.LatLng(49.86653802567906, 18.58509063720703),
            new google.maps.LatLng(49.86753384576503, 18.590068817138672),
            new google.maps.LatLng(49.86664867336908, 18.594703674316406),
            new google.maps.LatLng(49.865874134216426, 18.597450256347656),
            new google.maps.LatLng(49.865874134216426, 18.600711822509766),
            new google.maps.LatLng(49.86432501865345, 18.603458404541016),
            new google.maps.LatLng(49.8616692763981, 18.605690002441406),
            new google.maps.LatLng(49.857021376155, 18.603801727294922),
            new google.maps.LatLng(49.85591466733915, 18.59212875366211),
            new google.maps.LatLng(49.85480793317645, 18.591442108154297),
            new google.maps.LatLng(49.85314778440677, 18.588180541992188),
            new google.maps.LatLng(49.85292642692847, 18.58560562133789),
            new google.maps.LatLng(49.85226234841019, 18.584575653076172),
            new google.maps.LatLng(49.850602112192306, 18.585433959960934),
            new google.maps.LatLng(49.849495256362545, 18.58509063720703),
            new google.maps.LatLng(49.84628523111388, 18.590068817138672),
            new google.maps.LatLng(49.84086091094119, 18.582515716552734),
            new google.maps.LatLng(49.838536015981035, 18.575649261474606),
            new google.maps.LatLng(49.834660942622065, 18.569297790527344),
            new google.maps.LatLng(49.831228475459234, 18.56964111328125),
            new google.maps.LatLng(49.828017237241085, 18.56912612915039),
            new google.maps.LatLng(49.825027272073896, 18.57341766357422),
            new google.maps.LatLng(49.82414132097689, 18.576679229736328),
            new google.maps.LatLng(49.82070810722465, 18.576679229736328),
            new google.maps.LatLng(49.81749617057038, 18.58285903930664),
            new google.maps.LatLng(49.812844022234934, 18.582172393798828),
            new google.maps.LatLng(49.808856110558736, 18.583030700683594),
            new google.maps.LatLng(49.804424712205396, 18.585262298583984),
            new google.maps.LatLng(49.802984420394544, 18.589382171630856),
            new google.maps.LatLng(49.80209806567449, 18.592815399169922),
            new google.maps.LatLng(49.79766604866522, 18.592815399169922),
            new google.maps.LatLng(49.79157136286054, 18.598308563232422),
            new google.maps.LatLng(49.78880079756777, 18.599681854248047),
            new google.maps.LatLng(49.78414589110286, 18.596935272216797),
            new google.maps.LatLng(49.780931527964064, 18.602256774902344),
            new google.maps.LatLng(49.775721589979824, 18.604660034179688),
            new google.maps.LatLng(49.770732826556014, 18.610496520996094),
            new google.maps.LatLng(49.768071942753394, 18.610668182373047),
            new google.maps.LatLng(49.76408034316069, 18.612384796142578),
            new google.maps.LatLng(49.76152998246085, 18.614444732666016),
            new google.maps.LatLng(49.75620705841216, 18.61307144165039),
            new google.maps.LatLng(49.7529908419698, 18.614616394042965),
            new google.maps.LatLng(49.75121628642191, 18.62285614013672),
            new google.maps.LatLng(49.75010715623328, 18.62628936767578),
            new google.maps.LatLng(49.74700145677514, 18.62955093383789),
            new google.maps.LatLng(49.74200973748363, 18.62903594970703),
            new google.maps.LatLng(49.73768316530468, 18.627147674560547),
            new google.maps.LatLng(49.73468762010671, 18.628005981445312),
            new google.maps.LatLng(49.733245254618254, 18.627662658691406),
            new google.maps.LatLng(49.73002751559271, 18.625946044921875),
            new google.maps.LatLng(49.726143753362926, 18.628864288330078),
            new google.maps.LatLng(49.72281456698852, 18.62508773803711),
            new google.maps.LatLng(49.722037723984776, 18.629379272460938),
            new google.maps.LatLng(49.72026203615833, 18.629379272460938),
            new google.maps.LatLng(49.717265415694975, 18.634357452392578),
            new google.maps.LatLng(49.71715442620044, 18.636760711669922),
            new google.maps.LatLng(49.7152675659811, 18.636417388916016),
            new google.maps.LatLng(49.71304763656802, 18.64053726196289),
            new google.maps.LatLng(49.71193763380935, 18.64654541015625),
            new google.maps.LatLng(49.710605597012744, 18.652896881103516),
            new google.maps.LatLng(49.707830403023536, 18.652896881103516),
            new google.maps.LatLng(49.710272582105695, 18.658733367919922),
            new google.maps.LatLng(49.71071660147438, 18.661651611328125),
            new google.maps.LatLng(49.70960654544208, 18.664913177490234),
            new google.maps.LatLng(49.70949553844358, 18.667659759521484),
            new google.maps.LatLng(49.703611804493306, 18.668346405029297),
            new google.maps.LatLng(49.70438894227455, 18.674354553222656),
            new google.maps.LatLng(49.70572114954987, 18.677959442138672),
            new google.maps.LatLng(49.70405588474763, 18.679676055908203),
            new google.maps.LatLng(49.703611804493306, 18.68122100830078),
            new google.maps.LatLng(49.70594318054406, 18.68671417236328),
            new google.maps.LatLng(49.70594318054406, 18.69049072265625),
            new google.maps.LatLng(49.706498253589906, 18.694438934326172),
            new google.maps.LatLng(49.70594318054406, 18.697357177734375),
            new google.maps.LatLng(49.70561013367223, 18.70096206665039),
            new google.maps.LatLng(49.70438894227455, 18.705596923828125),
            new google.maps.LatLng(49.70438894227455, 18.70868682861328),
            new google.maps.LatLng(49.70294567650098, 18.70800018310547),
            new google.maps.LatLng(49.701280316562986, 18.709716796875),
            new google.maps.LatLng(49.69961489954273, 18.71143341064453),
            new google.maps.LatLng(49.69506246843693, 18.708858489990234),
            new google.maps.LatLng(49.696061819115634, 18.71246337890625),
            new google.maps.LatLng(49.69595078116617, 18.716068267822262),
            new google.maps.LatLng(49.69484038771755, 18.715381622314453),
            new google.maps.LatLng(49.691509055146184, 18.71469497680664),
            new google.maps.LatLng(49.68917698648319, 18.71692657470703),
            new google.maps.LatLng(49.68595632676579, 18.717956542968746),
            new google.maps.LatLng(49.683623991698084, 18.717098236083984),
            new google.maps.LatLng(49.68384612366814, 18.720016479492184),
            new google.maps.LatLng(49.6826243852735, 18.723621368408203),
            new google.maps.LatLng(49.683957189272554, 18.727569580078125),
            new google.maps.LatLng(49.684401449153086, 18.729801177978516),
            new google.maps.LatLng(49.68273545366889, 18.73220443725586),
            new google.maps.LatLng(49.68240224772149, 18.73615264892578),
            new google.maps.LatLng(49.68062511076879, 18.737869262695312),
            new google.maps.LatLng(49.67962544268843, 18.739070892333984),
            new google.maps.LatLng(49.67707064199891, 18.739585876464844),
            new google.maps.LatLng(49.676515232783345, 18.74216079711914),
            new google.maps.LatLng(49.677626044871104, 18.746795654296875),
            new google.maps.LatLng(49.67673739723076, 18.75091552734375),
            new google.maps.LatLng(49.684845704974, 18.763961791992188),
            new google.maps.LatLng(49.68240224772149, 18.766708374023434),
            new google.maps.LatLng(49.683623991698084, 18.76962661743164),
            new google.maps.LatLng(49.683068657332775, 18.77237319946289),
            new google.maps.LatLng(49.683623991698084, 18.778038024902344),
            new google.maps.LatLng(49.685401019041414, 18.779926300048828),
            new google.maps.LatLng(49.684401449153086, 18.78335952758789),
            new google.maps.LatLng(49.68351292533247, 18.784732818603516),
            new google.maps.LatLng(49.681846899401286, 18.78936767578125),
            new google.maps.LatLng(49.679514367188624, 18.79400253295898),
            new google.maps.LatLng(49.67873683158557, 18.80481719970703),
            new google.maps.LatLng(49.67496005323295, 18.808765411376953),
            new google.maps.LatLng(49.671294076090255, 18.810138702392578),
            new google.maps.LatLng(49.66851663671608, 18.80859375),
            new google.maps.LatLng(49.66618346508232, 18.807048797607422),
            new google.maps.LatLng(49.66373907001364, 18.80773544311523),
            new google.maps.LatLng(49.661294552128304, 18.80807876586914),
            new google.maps.LatLng(49.656960786759136, 18.809280395507812),
            new google.maps.LatLng(49.65496045717795, 18.808765411376953),
            new google.maps.LatLng(49.651626391830476, 18.80636215209961),
            new google.maps.LatLng(49.64873668378412, 18.808422088623047),
            new google.maps.LatLng(49.64595795657323, 18.810653686523438),
            new google.maps.LatLng(49.639510698592794, 18.813400268554688),
            new google.maps.LatLng(49.63684261797811, 18.812713623046875),
            new google.maps.LatLng(49.634730283817326, 18.81237030029297),
            new google.maps.LatLng(49.63206194128714, 18.817005157470703),
            new google.maps.LatLng(49.629504642517176, 18.817176818847656),
            new google.maps.LatLng(49.62650242481776, 18.81906509399414),
            new google.maps.LatLng(49.62372242863982, 18.820781707763672),
            new google.maps.LatLng(49.619051677946835, 18.818893432617188),
            new google.maps.LatLng(49.61460292769182, 18.823699951171875),
            new google.maps.LatLng(49.61159979168594, 18.82404327392578),
            new google.maps.LatLng(49.609375127196984, 18.824729919433594),
            new google.maps.LatLng(49.606816637514605, 18.82335662841797),
            new google.maps.LatLng(49.60503673940847, 18.82335662841797),
            new google.maps.LatLng(49.60080922096696, 18.82455825805664),
            new google.maps.LatLng(49.59635880555737, 18.826961517333984),
            new google.maps.LatLng(49.5950236017335, 18.82953643798828),
            new google.maps.LatLng(49.59524613824268, 18.83829116821289),
            new google.maps.LatLng(49.5939109039565, 18.839149475097656),
            new google.maps.LatLng(49.59090649315784, 18.837432861328125),
            new google.maps.LatLng(49.58868088436398, 18.835372924804688),
            new google.maps.LatLng(49.58623259740649, 18.835716247558594),
            new google.maps.LatLng(49.585564861457115, 18.83228302001953),
            new google.maps.LatLng(49.58322771366294, 18.831768035888672),
            new google.maps.LatLng(49.58033394699376, 18.832111358642578),
            new google.maps.LatLng(49.57699477219821, 18.834857940673825),
            new google.maps.LatLng(49.573878002906426, 18.83279800415039),
            new google.maps.LatLng(49.57120632794776, 18.835372924804688),
            new google.maps.LatLng(49.56897982043876, 18.837261199951172),
            new google.maps.LatLng(49.56753253609858, 18.83708953857422),
            new google.maps.LatLng(49.56307908438638, 18.83708953857422),
            new google.maps.LatLng(49.56085220619185, 18.838806152343746),
            new google.maps.LatLng(49.560963552513634, 18.843612670898438),
            new google.maps.LatLng(49.56085220619185, 18.845500946044922),
            new google.maps.LatLng(49.55951603052614, 18.845672607421875),
            new google.maps.LatLng(49.55884792898251, 18.84807586669922),
            new google.maps.LatLng(49.556954924970455, 18.84876251220703),
            new google.maps.LatLng(49.55450504614626, 18.84927749633789),
            new google.maps.LatLng(49.55294596836365, 18.851680755615234),
            new google.maps.LatLng(49.55082999748555, 18.857688903808594),
            new google.maps.LatLng(49.54927080239457, 18.859233856201172),
            new google.maps.LatLng(49.54481568504451, 18.858718872070312),
            new google.maps.LatLng(49.53846644084436, 18.85751724243164),
            new google.maps.LatLng(49.53434456003848, 18.84979248046875),
            new google.maps.LatLng(49.535012996758276, 18.8470458984375),
            new google.maps.LatLng(49.53378752245533, 18.84532928466797),
            new google.maps.LatLng(49.533898930479836, 18.844127655029297),
            new google.maps.LatLng(49.530779409803756, 18.843441009521484),
            new google.maps.LatLng(49.52821679745314, 18.844985961914062),
            new google.maps.LatLng(49.526099755490556, 18.840694427490234),
            new google.maps.LatLng(49.52453977117134, 18.83777618408203),
            new google.maps.LatLng(49.522979737077335, 18.837947845458984),
            new google.maps.LatLng(49.521308216741346, 18.840694427490234),
            new google.maps.LatLng(49.518856550220974, 18.842926025390625),
            new google.maps.LatLng(49.51874510791316, 18.847217559814453),
            new google.maps.LatLng(49.51796500464744, 18.851680755615234),
            new google.maps.LatLng(49.5168505498239, 18.845500946044922),
            new google.maps.LatLng(49.51584751876879, 18.842411041259766),
            new google.maps.LatLng(49.515067369281645, 18.840694427490234),
            new google.maps.LatLng(49.51584751876879, 18.82558822631836),
            new google.maps.LatLng(49.51607041633655, 18.8115119934082),
            new google.maps.LatLng(49.5141757546298, 18.806018829345703),
            new google.maps.LatLng(49.50960597442683, 18.799839019775387),
            new google.maps.LatLng(49.508602794799486, 18.789024353027344),
            new google.maps.LatLng(49.505258714131955, 18.779582977294922),
            new google.maps.LatLng(49.50258328501896, 18.775291442871094),
            new google.maps.LatLng(49.49946176615334, 18.769283294677734),
            new google.maps.LatLng(49.49634004816085, 18.767223358154297),
            new google.maps.LatLng(49.49310663031507, 18.760356903076172),
            new google.maps.LatLng(49.49098806831772, 18.756065368652344),
            new google.maps.LatLng(49.48820034704196, 18.75469207763672),
            new google.maps.LatLng(49.48998450694659, 18.749542236328125),
            new google.maps.LatLng(49.48853488197713, 18.745765686035156),
            new google.maps.LatLng(49.489538473066496, 18.739070892333984),
            new google.maps.LatLng(49.49065355014669, 18.734779357910156),
            new google.maps.LatLng(49.49466761732389, 18.729286193847656),
            new google.maps.LatLng(49.49578257756505, 18.72516632080078),
            new google.maps.LatLng(49.4971204963273, 18.72241973876953),
            new google.maps.LatLng(49.500019194840725, 18.72018814086914),
            new google.maps.LatLng(49.499796224127714, 18.71469497680664),
            new google.maps.LatLng(49.50202588553997, 18.71194839477539),
            new google.maps.LatLng(49.502806243032644, 18.70868682861328),
            new google.maps.LatLng(49.50213736594376, 18.706626892089844),
            new google.maps.LatLng(49.50135699778374, 18.702507019042965),
            new google.maps.LatLng(49.50135699778374, 18.70147705078125),
            new google.maps.LatLng(49.49990770961123, 18.69821548461914),
            new google.maps.LatLng(49.50091106753317, 18.687400817871094),
            new google.maps.LatLng(49.50224884609353, 18.685169219970703),
            new google.maps.LatLng(49.50447839575257, 18.68499755859375),
            new google.maps.LatLng(49.505927548551895, 18.68276596069336),
            new google.maps.LatLng(49.50681931355564, 18.680362701416016),
            new google.maps.LatLng(49.507488126641384, 18.677101135253903),
            new google.maps.LatLng(49.5070422522668, 18.672637939453125),
            new google.maps.LatLng(49.50537018717021, 18.670406341552734),
            new google.maps.LatLng(49.50380954152213, 18.66954803466797),
            new google.maps.LatLng(49.502806243032644, 18.666458129882812),
            new google.maps.LatLng(49.502360325989315, 18.664569854736328),
            new google.maps.LatLng(49.502806243032644, 18.65701675415039),
            new google.maps.LatLng(49.50314067814833, 18.654956817626953),
            new google.maps.LatLng(49.5018029239705, 18.653926849365234),
            new google.maps.LatLng(49.50079958433558, 18.65169525146484),
            new google.maps.LatLng(49.501579961385076, 18.6492919921875),
            new google.maps.LatLng(49.50102255047678, 18.646717071533203),
            new google.maps.LatLng(49.500688100883984, 18.64276885986328),
            new google.maps.LatLng(49.49611706068451, 18.638648986816406),
            new google.maps.LatLng(49.49834688972943, 18.632297515869137),
            new google.maps.LatLng(49.49823540069011, 18.629894256591797),
            new google.maps.LatLng(49.49578257756505, 18.62079620361328),
            new google.maps.LatLng(49.49533659651652, 18.6163330078125),
            new google.maps.LatLng(49.49667452747045, 18.610496520996094),
            new google.maps.LatLng(49.49645154151805, 18.604660034179688),
            new google.maps.LatLng(49.49756646112032, 18.601741790771484),
            new google.maps.LatLng(49.500019194840725, 18.60157012939453),
            new google.maps.LatLng(49.503252156012245, 18.602256774902344),
            new google.maps.LatLng(49.50637343308561, 18.601913452148438),
            new google.maps.LatLng(49.50793399695234, 18.60157012939453),
            new google.maps.LatLng(49.51016328755294, 18.597106933593746),
            new google.maps.LatLng(49.50893719029436, 18.59058380126953),
            new google.maps.LatLng(49.50815693058395, 18.585777282714844),
            new google.maps.LatLng(49.50681931355564, 18.582687377929688),
            new google.maps.LatLng(49.50626196233315, 18.578739166259766),
            new google.maps.LatLng(49.50759959460009, 18.574275970458984),
            new google.maps.LatLng(49.50815693058395, 18.571872711181637),
            new google.maps.LatLng(49.50681931355564, 18.564834594726562),
            new google.maps.LatLng(49.50514724083969, 18.56037139892578),
            new google.maps.LatLng(49.50291772165853, 18.554534912109375),
            new google.maps.LatLng(49.50135699778374, 18.551959991455078),
            new google.maps.LatLng(49.50013067981624, 18.546810150146484),
            new google.maps.LatLng(49.500688100883984, 18.545093536376953),
            new google.maps.LatLng(49.49678602006565, 18.542861938476562),
            new google.maps.LatLng(49.49310663031507, 18.542003631591797),
            new google.maps.LatLng(49.49065355014669, 18.535137176513672),
            new google.maps.LatLng(49.48875790399725, 18.534793853759762),
            new google.maps.LatLng(49.48619308942395, 18.534107208251953),
            new google.maps.LatLng(49.48184374892171, 18.535995483398438),
            new google.maps.LatLng(49.478497839478514, 18.542346954345703),
            new google.maps.LatLng(49.4741478154209, 18.54320526123047),
            new google.maps.LatLng(49.47292081570237, 18.54269027709961),
            new google.maps.LatLng(49.471916883979446, 18.546123504638672),
            new google.maps.LatLng(49.46990895880499, 18.547325134277344),
            new google.maps.LatLng(49.46756627540957, 18.548011779785156),
            new google.maps.LatLng(49.46578129858125, 18.544750213623047),
            new google.maps.LatLng(49.46455408928758, 18.54045867919922),
            new google.maps.LatLng(49.463996256719895, 18.537025451660156),
            new google.maps.LatLng(49.46232272091106, 18.53445053100586),
            new google.maps.LatLng(49.45808284104222, 18.532905578613278),
            new google.maps.LatLng(49.45763651655841, 18.529644012451172),
            new google.maps.LatLng(49.45652068756555, 18.527240753173828),
            new google.maps.LatLng(49.45629751871841, 18.525009155273434),
            new google.maps.LatLng(49.453842594330744, 18.523292541503906),
            new google.maps.LatLng(49.45183392837305, 18.523292541503906),
            new google.maps.LatLng(49.449936779387244, 18.523635864257812),
            new google.maps.LatLng(49.44803955697885, 18.520374298095703),
            new google.maps.LatLng(49.44848596885694, 18.517284393310543),
            new google.maps.LatLng(49.44681190335408, 18.515567779541016),
            new google.maps.LatLng(49.445584218987825, 18.511962890625),
            new google.maps.LatLng(49.44368682813644, 18.509902954101562),
            new google.maps.LatLng(49.44268229737176, 18.505783081054688),
            new google.maps.LatLng(49.4400034480549, 18.503551483154293),
            new google.maps.LatLng(49.43732445239302, 18.50200653076172),
            new google.maps.LatLng(49.43576163733976, 18.500289916992188),
            new google.maps.LatLng(49.43576163733976, 18.49496841430664),
            new google.maps.LatLng(49.434533676290926, 18.492393493652344),
            new google.maps.LatLng(49.432635857835486, 18.489818572998047),
            new google.maps.LatLng(49.430626322964656, 18.493423461914062),
            new google.maps.LatLng(49.42939823335052, 18.494625091552734),
            new google.maps.LatLng(49.427388565847274, 18.49222183227539),
            new google.maps.LatLng(49.42604874177584, 18.48621368408203),
            new google.maps.LatLng(49.42470888111537, 18.48278045654297),
            new google.maps.LatLng(49.422475698704886, 18.481407165527344),
            new google.maps.LatLng(49.42102407563464, 18.481578826904297),
            new google.maps.LatLng(49.419907413282516, 18.47848892211914),
            new google.maps.LatLng(49.41666894876774, 18.476600646972656),
            new google.maps.LatLng(49.41298353954418, 18.477458953857422),
            new google.maps.LatLng(49.41007968889129, 18.47677230834961),
            new google.maps.LatLng(49.40806923011853, 18.475055694580078),
            new google.maps.LatLng(49.4070639698572, 18.47042083740234),
            new google.maps.LatLng(49.406058689012404, 18.467330932617188),
            new google.maps.LatLng(49.405835290473824, 18.463897705078125),
            new google.maps.LatLng(49.40404806557203, 18.460464477539062),
            new google.maps.LatLng(49.40281931071511, 18.45651626586914),
            new google.maps.LatLng(49.401031976032705, 18.453426361083984),
            new google.maps.LatLng(49.399244576294286, 18.451023101806637),
            new google.maps.LatLng(49.397568829954885, 18.449649810791016),
            new google.maps.LatLng(49.3935468054482, 18.450336456298828),
            new google.maps.LatLng(49.39321162187249, 18.44518661499023),
            new google.maps.LatLng(49.39321162187249, 18.439865112304688),
            new google.maps.LatLng(49.39265297749693, 18.434886932373047),
            new google.maps.LatLng(49.3939937133246, 18.430423736572266),
            new google.maps.LatLng(49.3935468054482, 18.428878784179688),
            new google.maps.LatLng(49.39555785887103, 18.422527313232422),
            new google.maps.LatLng(49.397233673825525, 18.419437408447266),
            new google.maps.LatLng(49.39835085202887, 18.412742614746094),
            new google.maps.LatLng(49.39868600053436, 18.40982437133789),
            new google.maps.LatLng(49.398015701236226, 18.406906127929688),
            new google.maps.LatLng(49.39712195460748, 18.403987884521484),
            new google.maps.LatLng(49.39466406751514, 18.403987884521484),
            new google.maps.LatLng(49.39265297749693, 18.40621948242187),
            new google.maps.LatLng(49.39097700624969, 18.408279418945312),
            new google.maps.LatLng(49.3870661843004, 18.408279418945312),
            new google.maps.LatLng(49.383378552741426, 18.410511016845703),
            new google.maps.LatLng(49.38036119378708, 18.410511016845703),
            new google.maps.LatLng(49.37834951821894, 18.411540985107422),
            new google.maps.LatLng(49.376002459312424, 18.410682678222656),
            new google.maps.LatLng(49.37343174238158, 18.412914276123047),
            new google.maps.LatLng(49.36996665030537, 18.414630889892578),
            new google.maps.LatLng(49.36795454927027, 18.41531753540039),
            new google.maps.LatLng(49.36638952486445, 18.414974212646484),
            new google.maps.LatLng(49.36515982788261, 18.411712646484375),
            new google.maps.LatLng(49.362588543901914, 18.410682678222656),
            new google.maps.LatLng(49.36012892905899, 18.407421112060547),
            new google.maps.LatLng(49.358563655560005, 18.401927947998047),
            new google.maps.LatLng(49.35688652152625, 18.398494720458984),
            new google.maps.LatLng(49.354538437796805, 18.39935302734375),
            new google.maps.LatLng(49.35241388449761, 18.401241302490234),
            new google.maps.LatLng(49.350401065147345, 18.404159545898434),
            new google.maps.LatLng(49.34961827982477, 18.400726318359375),
            new google.maps.LatLng(49.348723652775796, 18.398494720458984),
            new google.maps.LatLng(49.34861182325079, 18.39488983154297),
            new google.maps.LatLng(49.342908180407534, 18.38785171508789),
            new google.maps.LatLng(49.33015647028902, 18.378925323486325),
            new google.maps.LatLng(49.324898224458096, 18.365707397460938),
            new google.maps.LatLng(49.31952752141471, 18.33669662475586),
            new google.maps.LatLng(49.318744244947524, 18.328285217285156),
            new google.maps.LatLng(49.31706575342583, 18.324851989746094),
            new google.maps.LatLng(49.31438004800689, 18.322277069091793),
            new google.maps.LatLng(49.31001546436281, 18.300991058349606),
            new google.maps.LatLng(49.306098201071336, 18.30270767211914),
            new google.maps.LatLng(49.30441927860153, 18.297386169433594),
            new google.maps.LatLng(49.30430734840284, 18.293094635009762),
            new google.maps.LatLng(49.304195417949884, 18.28845977783203),
            new google.maps.LatLng(49.30329996517298, 18.286571502685547),
            new google.maps.LatLng(49.30363576187125, 18.28176498413086),
            new google.maps.LatLng(49.30285223268235, 18.277473449707028),
            new google.maps.LatLng(49.30162094735679, 18.273868560791016),
            new google.maps.LatLng(49.30229256134825, 18.271808624267578),
            new google.maps.LatLng(49.298262740098345, 18.264083862304688),
            new google.maps.LatLng(49.29837468402711, 18.26099395751953),
            new google.maps.LatLng(49.29691939312055, 18.255672454833984),
            new google.maps.LatLng(49.295911858859, 18.250350952148438),
            new google.maps.LatLng(49.2945684478059, 18.24880599975586),
            new google.maps.LatLng(49.2941206359849, 18.240737915039062),
            new google.maps.LatLng(49.29546405924294, 18.237648010253906),
            new google.maps.LatLng(49.29434454240395, 18.231983184814453),
            new google.maps.LatLng(49.29434454240395, 18.230781555175778),
            new google.maps.LatLng(49.2941206359849, 18.227691650390625),
            new google.maps.LatLng(49.29535210870325, 18.22254180908203),
            new google.maps.LatLng(49.293896728548795, 18.22031021118164),
            new google.maps.LatLng(49.29288913249991, 18.219280242919922),
            new google.maps.LatLng(49.2935608654876, 18.214130401611328),
            new google.maps.LatLng(49.29333695550878, 18.212242126464844),
            new google.maps.LatLng(49.29199347427707, 18.210010528564453),
            new google.maps.LatLng(49.29221739035841, 18.206233978271484),
            new google.maps.LatLng(49.29333695550878, 18.20383071899414),
            new google.maps.LatLng(49.29210543244487, 18.20056915283203),
            new google.maps.LatLng(49.2903140712471, 18.199024200439453),
            new google.maps.LatLng(49.28975425752336, 18.19507598876953),
            new google.maps.LatLng(49.289866220776666, 18.19112777709961),
            new google.maps.LatLng(49.28785084331299, 18.187522888183594),
            new google.maps.LatLng(49.286843123686374, 18.18408966064453),
            new google.maps.LatLng(49.28505157127188, 18.184432983398438),
            new google.maps.LatLng(49.28046042107949, 18.185462951660156),
            new google.maps.LatLng(49.279676523448416, 18.184776306152344),
            new google.maps.LatLng(49.275644853096075, 18.184261322021484),
            new google.maps.LatLng(49.27138884351881, 18.184776306152344),
            new google.maps.LatLng(49.26937271081527, 18.18460464477539),
            new google.maps.LatLng(49.26791656373178, 18.181686401367188),
            new google.maps.LatLng(49.268028576571716, 18.17859649658203),
            new google.maps.LatLng(49.26657238981664, 18.17790985107422),
            new google.maps.LatLng(49.2652281792813, 18.177566528320312),
            new google.maps.LatLng(49.26433201857972, 18.17310333251953),
            new google.maps.LatLng(49.263099771039634, 18.171558380126953),
            new google.maps.LatLng(49.26063518364422, 18.162975311279297),
            new google.maps.LatLng(49.25503339088541, 18.161087036132812),
            new google.maps.LatLng(49.253912956037574, 18.15988540649414),
            new google.maps.LatLng(49.25245635271393, 18.15267562866211),
            new google.maps.LatLng(49.2483104003097, 18.14718246459961),
            new google.maps.LatLng(49.244724430962506, 18.146324157714844),
            new google.maps.LatLng(49.239344988615166, 18.148212432861328),
            new google.maps.LatLng(49.23654296363889, 18.147525787353516),
            new google.maps.LatLng(49.2329561397047, 18.145809173583984),
            new google.maps.LatLng(49.22948115564424, 18.14443588256836),
            new google.maps.LatLng(49.22936905531454, 18.14992904663086),
            new google.maps.LatLng(49.22992955441942, 18.153533935546875),
            new google.maps.LatLng(49.22992955441942, 18.155765533447266),
            new google.maps.LatLng(49.22813593490041, 18.155765533447266),
            new google.maps.LatLng(49.219615352939535, 18.15284729003906),
            new google.maps.LatLng(49.21591516908271, 18.154563903808594),
            new google.maps.LatLng(49.21490597995439, 18.148899078369137),
            new google.maps.LatLng(49.210869017396, 18.148727416992188),
            new google.maps.LatLng(49.20514942275986, 18.149585723876953),
            new google.maps.LatLng(49.204925111448546, 18.146324157714844),
            new google.maps.LatLng(49.19752226732052, 18.142719268798828),
            new google.maps.LatLng(49.19449351169183, 18.139286041259766),
            new google.maps.LatLng(49.18944517351115, 18.13121795654297),
            new google.maps.LatLng(49.181030131697455, 18.130874633789062),
            new google.maps.LatLng(49.168461004953365, 18.129844665527344),
            new google.maps.LatLng(49.16094044806311, 18.136539459228516),
            new google.maps.LatLng(49.15970562061156, 18.133106231689453),
            new google.maps.LatLng(49.1576849274618, 18.130359649658203),
            new google.maps.LatLng(49.15532734792303, 18.12847137451172),
            new google.maps.LatLng(49.15521507943174, 18.125553131103512),
            new google.maps.LatLng(49.15375556588957, 18.123836517333984),
            new google.maps.LatLng(49.15375556588957, 18.122291564941406),
            new google.maps.LatLng(49.15229600934446, 18.118515014648438),
            new google.maps.LatLng(49.150275013903794, 18.117141723632812),
            new google.maps.LatLng(49.14713107934596, 18.117313385009766),
            new google.maps.LatLng(49.1447729975061, 18.118000030517578),
            new google.maps.LatLng(49.14320088060193, 18.117828369140625),
            new google.maps.LatLng(49.14241480344641, 18.11594009399414),
            new google.maps.LatLng(49.14174101310303, 18.114051818847656),
            new google.maps.LatLng(49.13769807866191, 18.109760284423828),
            new google.maps.LatLng(49.13477797645826, 18.10718536376953),
            new google.maps.LatLng(49.13107144515573, 18.10821533203125),
            new google.maps.LatLng(49.127813961593255, 18.11267852783203),
            new google.maps.LatLng(49.12579196759559, 18.117141723632812),
            new google.maps.LatLng(49.12275882199536, 18.11920166015625),
            new google.maps.LatLng(49.11927609269998, 18.12091827392578),
            new google.maps.LatLng(49.117927873763634, 18.1219482421875),
            new google.maps.LatLng(49.11725375055241, 18.121261596679688),
            new google.maps.LatLng(49.11871433926359, 18.11817169189453),
            new google.maps.LatLng(49.11837728414777, 18.11422348022461),
            new google.maps.LatLng(49.115343685031945, 18.112506866455078),
            new google.maps.LatLng(49.11377063466991, 18.110790252685547),
            new google.maps.LatLng(49.10972541896763, 18.11147689819336),
            new google.maps.LatLng(49.10545511121562, 18.11199188232422),
            new google.maps.LatLng(49.09814978542758, 18.11422348022461),
            new google.maps.LatLng(49.092079927749076, 18.11594009399414),
            new google.maps.LatLng(49.08893230193367, 18.114395141601562),
            new google.maps.LatLng(49.087245991729745, 18.111820220947262),
            new google.maps.LatLng(49.06734320603501, 18.097057342529297),
            new google.maps.LatLng(49.06903019207554, 18.093795776367188),
            new google.maps.LatLng(49.06779307457958, 18.091564178466797),
            new google.maps.LatLng(49.06408153727638, 18.090534210205078),
            new google.maps.LatLng(49.06160702505954, 18.090877532958984),
            new google.maps.LatLng(49.05935736157798, 18.09499740600586),
            new google.maps.LatLng(49.058120003257926, 18.09242248535156),
            new google.maps.LatLng(49.056095168652966, 18.089160919189453),
            new google.maps.LatLng(49.05339526087102, 18.08675765991211),
            new google.maps.LatLng(49.05215775413036, 18.08349609375),
            new google.maps.LatLng(49.049345124246955, 18.08177947998047),
            new google.maps.LatLng(49.046419820375704, 18.08177947998047),
            new google.maps.LatLng(49.0447320667783, 18.078861236572266),
            new google.maps.LatLng(49.041919016818326, 18.076457977294922),
            new google.maps.LatLng(49.041919016818326, 18.074054718017578),
            new google.maps.LatLng(49.04023111046298, 18.071136474609375),
            new google.maps.LatLng(49.03786794532641, 18.07079315185547),
            new google.maps.LatLng(49.036855125896516, 18.06804656982422),
            new google.maps.LatLng(49.03516704768443, 18.064956665039062),
            new google.maps.LatLng(49.034154173259665, 18.06118011474609),
            new google.maps.LatLng(49.03235345669396, 18.057918548583984),
            new google.maps.LatLng(49.03134052498211, 18.055686950683594),
            new google.maps.LatLng(49.031790719400156, 18.053627014160156),
            new google.maps.LatLng(49.03021502111417, 18.054141998291016),
            new google.maps.LatLng(49.02886438286371, 18.056888580322266),
            new google.maps.LatLng(49.03167817117755, 18.052425384521484),
            new google.maps.LatLng(49.027513707948714, 18.041954040527344),
            new google.maps.LatLng(49.02650067770122, 18.03731918334961),
            new google.maps.LatLng(49.02672579731631, 18.029766082763672),
            new google.maps.LatLng(49.02143521710116, 18.024616241455078),
            new google.maps.LatLng(49.02177293051566, 18.015174865722656),
            new google.maps.LatLng(49.02278605700956, 18.012256622314453),
            new google.maps.LatLng(49.02132264545374, 18.00848007202148),
            new google.maps.LatLng(49.023461463214126, 18.0010986328125),
            new google.maps.LatLng(49.026950915912934, 17.996292114257812),
            new google.maps.LatLng(49.0284141619659, 17.990283966064453),
            new google.maps.LatLng(49.026950915912934, 17.98410415649414),
            new google.maps.LatLng(49.023799162879016, 17.981185913085934),
            new google.maps.LatLng(49.02267348841762, 17.97414779663086),
            new google.maps.LatLng(49.02424942553418, 17.964534759521484),
            new google.maps.LatLng(49.024136860252305, 17.958698272705078),
            new google.maps.LatLng(49.02514993862271, 17.951831817626953),
            new google.maps.LatLng(49.02357403002371, 17.945995330810547),
            new google.maps.LatLng(49.02334889614992, 17.93466567993164),
            new google.maps.LatLng(49.019971765823975, 17.926254272460938),
            new google.maps.LatLng(49.01985919086641, 17.924365997314453),
            new google.maps.LatLng(49.01794537763023, 17.92316436767578),
            new google.maps.LatLng(49.017269896565764, 17.921104431152344),
            new google.maps.LatLng(49.015468568912354, 17.921104431152344),
            new google.maps.LatLng(49.01152793741105, 17.914581298828125),
            new google.maps.LatLng(49.005447494058096, 17.912349700927734),
            new google.maps.LatLng(49.00353312673325, 17.9132080078125),
            new google.maps.LatLng(49.00139345263396, 17.912521362304688),
            new google.maps.LatLng(48.996888575095596, 17.914752960205078),
            new google.maps.LatLng(48.99001785238229, 17.911319732666016),
            new google.maps.LatLng(48.98483602492272, 17.90393829345703),
            new google.maps.LatLng(48.980442314309585, 17.9022216796875),
            new google.maps.LatLng(48.975372166880604, 17.900333404541016),
            new google.maps.LatLng(48.97300592158682, 17.901020050048828),
            new google.maps.LatLng(48.96928730920069, 17.899475097656246),
            new google.maps.LatLng(48.963990624864145, 17.902908325195312),
            new google.maps.LatLng(48.95835523665583, 17.899818420410156),
            new google.maps.LatLng(48.952155574171876, 17.897071838378906),
            new google.maps.LatLng(48.94809719605915, 17.893466949462887),
            new google.maps.LatLng(48.9442639802859, 17.889175415039062),
            new google.maps.LatLng(48.93693495409401, 17.887115478515625),
            new google.maps.LatLng(48.92825148430565, 17.885913848876953),
            new google.maps.LatLng(48.92667250934945, 17.880077362060547),
            new google.maps.LatLng(48.92272485351708, 17.86977767944336),
            new google.maps.LatLng(48.924642325325806, 17.859477996826172),
            new google.maps.LatLng(48.92667250934945, 17.855186462402344),
            new google.maps.LatLng(48.927687570410114, 17.849349975585938),
            new google.maps.LatLng(48.92667250934945, 17.845230102539062),
            new google.maps.LatLng(48.927800353698686, 17.817249298095703),
            new google.maps.LatLng(48.926108577622024, 17.816219329833984),
            new google.maps.LatLng(48.925093484463865, 17.7813720703125),
            new google.maps.LatLng(48.92092010691461, 17.783260345458984),
            new google.maps.LatLng(48.91674638061428, 17.782573699951172),
            new google.maps.LatLng(48.91415172632352, 17.778453826904297),
            new google.maps.LatLng(48.911895395655606, 17.76987075805664),
            new google.maps.LatLng(48.90162780443572, 17.754077911376953),
            new google.maps.LatLng(48.898355271627125, 17.750473022460938),
            new google.maps.LatLng(48.895646806575506, 17.749099731445312),
            new google.maps.LatLng(48.893051056526005, 17.748069763183594),
            new google.maps.LatLng(48.890906639609454, 17.74566650390625),
            new google.maps.LatLng(48.88842351563988, 17.741374969482422),
            new google.maps.LatLng(48.88526299769019, 17.74068832397461),
            new google.maps.LatLng(48.88187650678903, 17.73691177368164),
            new google.maps.LatLng(48.87905425586569, 17.73193359375),
            new google.maps.LatLng(48.876231845692516, 17.72420883178711),
            new google.maps.LatLng(48.87307055723444, 17.718544006347656),
            new google.maps.LatLng(48.86832824998009, 17.715110778808594),
            new google.maps.LatLng(48.8641501307046, 17.708759307861328),
            new google.maps.LatLng(48.86008459874117, 17.703609466552734),
            new google.maps.LatLng(48.861665678191514, 17.69571304321289),
            new google.maps.LatLng(48.86234326838097, 17.69124984741211),
            new google.maps.LatLng(48.8607622103356, 17.684040069580078),
            new google.maps.LatLng(48.857938768171536, 17.677688598632812),
            new google.maps.LatLng(48.85805170891599, 17.67477035522461),
            new google.maps.LatLng(48.856470515304515, 17.673912048339844),
            new google.maps.LatLng(48.85387273165656, 17.667560577392578),
            new google.maps.LatLng(48.85545400732256, 17.660179138183594),
            new google.maps.LatLng(48.85579284560999, 17.65571594238281),
            new google.maps.LatLng(48.8542115806468, 17.64850616455078),
            new google.maps.LatLng(48.854776323867306, 17.64078140258789),
            new google.maps.LatLng(48.85511516674166, 17.637004852294922),
            new google.maps.LatLng(48.854776323867306, 17.632713317871094),
            new google.maps.LatLng(48.84686933903632, 17.62035369873047),
            new google.maps.LatLng(48.84212454876025, 17.62069702148437),
            new google.maps.LatLng(48.84088179130599, 17.602157592773438),
            new google.maps.LatLng(48.837266321559035, 17.597522735595703),
            new google.maps.LatLng(48.82879154174558, 17.595462799072266),
            new google.maps.LatLng(48.8254012284184, 17.589111328125),
            new google.maps.LatLng(48.82562725644306, 17.584819793701172),
            new google.maps.LatLng(48.82494916931076, 17.580699920654297),
            new google.maps.LatLng(48.82449710612528, 17.575893402099606),
            new google.maps.LatLng(48.82370598573833, 17.570571899414062),
            new google.maps.LatLng(48.82461012230393, 17.567481994628906),
            new google.maps.LatLng(48.828339513221444, 17.557010650634766),
            new google.maps.LatLng(48.83161662763493, 17.554264068603516),
            new google.maps.LatLng(48.828113497430216, 17.550487518310543),
            new google.maps.LatLng(48.82754845349205, 17.548255920410156),
            new google.maps.LatLng(48.822575792093346, 17.555465698242188),
            new google.maps.LatLng(48.82054137930562, 17.554264068603516),
            new google.maps.LatLng(48.818959001157616, 17.552204132080078),
            new google.maps.LatLng(48.81647230599555, 17.54688262939453),
            new google.maps.LatLng(48.81737657305468, 17.54293441772461),
            new google.maps.LatLng(48.81884597223549, 17.53881454467773),
            new google.maps.LatLng(48.816924441564105, 17.53469467163086),
            new google.maps.LatLng(48.814324606354575, 17.530746459960938),
            new google.maps.LatLng(48.81217681470277, 17.528343200683594),
            new google.maps.LatLng(48.81251594581751, 17.519760131835938),
            new google.maps.LatLng(48.815002837234, 17.518386840820312),
            new google.maps.LatLng(48.81726354056436, 17.51598358154297),
            new google.maps.LatLng(48.822010685713316, 17.515468597412106),
            new google.maps.LatLng(48.82607930943396, 17.516841888427734),
            new google.maps.LatLng(48.8293565716664, 17.519073486328125),
            new google.maps.LatLng(48.82438408969174, 17.515468597412106),
            new google.maps.LatLng(48.82551424255817, 17.515125274658203),
            new google.maps.LatLng(48.823140892101684, 17.513751983642578),
            new google.maps.LatLng(48.8204283539517, 17.511863708496094),
            new google.maps.LatLng(48.81941111429733, 17.512035369873047),
            new google.maps.LatLng(48.8212195260768, 17.509803771972656),
            new google.maps.LatLng(48.81952414194507, 17.50946044921875),
            new google.maps.LatLng(48.837266321559035, 17.482852935791016),
            new google.maps.LatLng(48.839526020732634, 17.481136322021484),
            new google.maps.LatLng(48.8414466848806, 17.476158142089844),
            new google.maps.LatLng(48.84517482268593, 17.461395263671875),
            new google.maps.LatLng(48.84483591253515, 17.456417083740234),
            new google.maps.LatLng(48.84664340683584, 17.453155517578125),
            new google.maps.LatLng(48.84562669931916, 17.45006561279297),
            new google.maps.LatLng(48.84223752518157, 17.447147369384762),
            new google.maps.LatLng(48.841107749500374, 17.443714141845703),
            new google.maps.LatLng(48.83760528293373, 17.443370819091793),
            new google.maps.LatLng(48.840542852103084, 17.43581771850586),
            new google.maps.LatLng(48.826983403182346, 17.426719665527344),
            new google.maps.LatLng(48.82709641375401, 17.422771453857422),
            new google.maps.LatLng(48.82901755447848, 17.41830825805664),
            new google.maps.LatLng(48.82178464137724, 17.40835189819336),
            new google.maps.LatLng(48.8204283539517, 17.402687072753906),
            new google.maps.LatLng(48.81624623668203, 17.400970458984375),
            new google.maps.LatLng(48.813194201165274, 17.3968505859375),
            new google.maps.LatLng(48.81635927146622, 17.38912582397461),
            new google.maps.LatLng(48.815794094996455, 17.38758087158203),
            new google.maps.LatLng(48.81737657305468, 17.382774353027344),
            new google.maps.LatLng(48.81737657305468, 17.380542755126953),
            new google.maps.LatLng(48.818959001157616, 17.378311157226562),
            new google.maps.LatLng(48.813872447337395, 17.364578247070312),
            new google.maps.LatLng(48.813307242831144, 17.361316680908203),
            new google.maps.LatLng(48.815794094996455, 17.358055114746094),
            new google.maps.LatLng(48.817715668996435, 17.358055114746094),
            new google.maps.LatLng(48.822010685713316, 17.35342025756836),
            new google.maps.LatLng(48.825175199374314, 17.348098754882812),
            new google.maps.LatLng(48.826531358347054, 17.34466552734375),
            new google.maps.LatLng(48.830034599161, 17.335052490234375),
            new google.maps.LatLng(48.83184262762491, 17.3309326171875),
            new google.maps.LatLng(48.835232505144106, 17.327327728271484),
            new google.maps.LatLng(48.83658839192869, 17.324409484863278),
            new google.maps.LatLng(48.84472294197522, 17.321834564208984),
            new google.maps.LatLng(48.84551373054311, 17.31891632080078),
            new google.maps.LatLng(48.84551373054311, 17.316341400146484),
            new google.maps.LatLng(48.843819168321446, 17.313594818115234),
            new google.maps.LatLng(48.84359322235957, 17.306385040283203),
            new google.maps.LatLng(48.84641747361601, 17.30020523071289),
            new google.maps.LatLng(48.848902682969765, 17.29848861694336),
            new google.maps.LatLng(48.850822987537555, 17.291278839111325),
            new google.maps.LatLng(48.853759781483475, 17.283382415771484),
            new google.maps.LatLng(48.856470515304515, 17.279434204101562),
            new google.maps.LatLng(48.86008459874117, 17.277717590332028),
            new google.maps.LatLng(48.8615527456014, 17.271881103515625),
            new google.maps.LatLng(48.86053634082343, 17.26673126220703),
            new google.maps.LatLng(48.860649275706926, 17.261409759521484),
            new google.maps.LatLng(48.863472564977805, 17.25128173828125),
            new google.maps.LatLng(48.86618277284446, 17.248363494873043),
            new google.maps.LatLng(48.86832824998009, 17.241840362548828),
            new google.maps.LatLng(48.86832824998009, 17.238235473632812),
            new google.maps.LatLng(48.86787657822752, 17.23583221435547),
            new google.maps.LatLng(48.86911866573677, 17.229995727539062),
            new google.maps.LatLng(48.87115110606428, 17.228107452392578),
            new google.maps.LatLng(48.871828567827116, 17.22484588623047),
            new google.maps.LatLng(48.87036072241377, 17.221755981445312),
            new google.maps.LatLng(48.8712640169951, 17.216949462890625),
            new google.maps.LatLng(48.87803820654905, 17.201671600341793),
            new google.maps.LatLng(48.87544154230615, 17.193603515625),
            new google.maps.LatLng(48.87239311228893, 17.189483642578125),
            new google.maps.LatLng(48.87036072241377, 17.186737060546875),
            new google.maps.LatLng(48.86742490239795, 17.18364715576172),
            new google.maps.LatLng(48.8641501307046, 17.180728912353516),
            new google.maps.LatLng(48.85929404028653, 17.174205780029297),
            new google.maps.LatLng(48.85579284560999, 17.16785430908203),
            new google.maps.LatLng(48.853646831055556, 17.161846160888672),
            new google.maps.LatLng(48.84901564410065, 17.157039642333984),
            new google.maps.LatLng(48.84551373054311, 17.15463638305664),
            new google.maps.LatLng(48.84336727537835, 17.149314880371094),
            new google.maps.LatLng(48.8428024034655, 17.143135070800778),
            new google.maps.LatLng(48.83365059084553, 17.115497589111328),
            new google.maps.LatLng(48.83105162319997, 17.11017608642578),
            new google.maps.LatLng(48.826757381274426, 17.106056213378903),
            new google.maps.LatLng(48.8216716188269, 17.10468292236328),
            new google.maps.LatLng(48.81726354056436, 17.10674285888672),
            new google.maps.LatLng(48.813307242831144, 17.106914520263672),
            new google.maps.LatLng(48.808107062398854, 17.105884552001953),
            new google.maps.LatLng(48.803019407490346, 17.101593017578125),
            new google.maps.LatLng(48.79894891193302, 17.094039916992188),
            new google.maps.LatLng(48.79408649818727, 17.090091705322266),
            new google.maps.LatLng(48.789562899473346, 17.09026336669922),
            new google.maps.LatLng(48.78684854447699, 17.089576721191406),
            new google.maps.LatLng(48.78175873310928, 17.079448699951172),
            new google.maps.LatLng(48.7802882470557, 17.071895599365234),
            new google.maps.LatLng(48.77768651234782, 17.06674575805664),
            new google.maps.LatLng(48.77304830297634, 17.062625885009766),
            new google.maps.LatLng(48.77055933104034, 17.05902099609375),
            new google.maps.LatLng(48.76807023571851, 17.050094604492188),
            new google.maps.LatLng(48.76592046318992, 17.043399810791016),
            new google.maps.LatLng(48.761620642037315, 17.041339874267578),
            new google.maps.LatLng(48.75562290827205, 17.04030990600586),
            new google.maps.LatLng(48.75200128832865, 17.039623260498047),
            new google.maps.LatLng(48.74973764328965, 17.0343017578125),
            new google.maps.LatLng(48.747587086042216, 17.030868530273438),
            new google.maps.LatLng(48.7395499785771, 17.02657699584961),
            new google.maps.LatLng(48.73717255965173, 17.02434539794922),
            new google.maps.LatLng(48.73128513361787, 17.01679229736328),
            new google.maps.LatLng(48.7274352899766, 17.01335906982422),
            new google.maps.LatLng(48.72075397941156, 17.013530731201172),
            new google.maps.LatLng(48.71690332951143, 17.010784149169922),
            new google.maps.LatLng(48.713392185933266, 17.003402709960938),
            new google.maps.LatLng(48.71056044003432, 16.998939514160153),
            new google.maps.LatLng(48.7065957280258, 16.996707916259766),
            new google.maps.LatLng(48.70183766127341, 16.99687957763672),
            new google.maps.LatLng(48.69741905364435, 16.99859619140625),
            new google.maps.LatLng(48.69300005813785, 16.998252868652344),
            new google.maps.LatLng(48.688580674746106, 16.993103027343746),
            new google.maps.LatLng(48.68552087440201, 16.98589324951172),
            new google.maps.LatLng(48.68268756016676, 16.979541778564453),
            new google.maps.LatLng(48.67815392584827, 16.97834014892578),
            new google.maps.LatLng(48.67430001584138, 16.975936889648438),
            new google.maps.LatLng(48.6712393478684, 16.970272064208984),
            new google.maps.LatLng(48.66772501831762, 16.967182159423828),
            new google.maps.LatLng(48.66398368849627, 16.96735382080078),
            new google.maps.LatLng(48.66012869453836, 16.968212127685547),
            new google.maps.LatLng(48.65559303004337, 16.96666717529297),
            new google.maps.LatLng(48.65151058307218, 16.967697143554684),
            new google.maps.LatLng(48.647654635180295, 16.96941375732422),
            new google.maps.LatLng(48.643911815538644, 16.96889877319336),
            new google.maps.LatLng(48.64062244169179, 16.964263916015625),
            new google.maps.LatLng(48.63880752291323, 16.962890625),
            new google.maps.LatLng(48.63426994027393, 16.962890625),
            new google.maps.LatLng(48.630526127344446, 16.96117401123047),
            new google.maps.LatLng(48.628937759146574, 16.958599090576172),
            new google.maps.LatLng(48.627008959117745, 16.957054138183594),
            new google.maps.LatLng(48.62371848303732, 16.95688247680664),
            new google.maps.LatLng(48.62269725718368, 16.95516586303711),
            new google.maps.LatLng(48.62212990055869, 16.948986053466797),
            new google.maps.LatLng(48.62088169353486, 16.946067810058594),
            new google.maps.LatLng(48.61838518688487, 16.942806243896484),
            new google.maps.LatLng(48.61668295246831, 16.940059661865234),
            new google.maps.LatLng(48.61815822561236, 16.93817138671875),
            new google.maps.LatLng(48.61917954330282, 16.934223175048828),
            new google.maps.LatLng(48.618952585601775, 16.92821502685547),
            new google.maps.LatLng(48.6200873639028, 16.92546844482422),
            new google.maps.LatLng(48.621789483522505, 16.91946029663086),
            new google.maps.LatLng(48.62292419804796, 16.918601989746094),
            new google.maps.LatLng(48.623945419309806, 16.91997528076172),
            new google.maps.LatLng(48.62587433642767, 16.917572021484375),
            new google.maps.LatLng(48.62825701461333, 16.921348571777344),
            new google.maps.LatLng(48.628824302362084, 16.92392349243164),
            new google.maps.LatLng(48.631206841266625, 16.92272186279297),
            new google.maps.LatLng(48.632341344063015, 16.925983428955078),
            new google.maps.LatLng(48.63517748945267, 16.925296783447266),
            new google.maps.LatLng(48.63926125872981, 16.928730010986325),
            new google.maps.LatLng(48.64084930194764, 16.927528381347656),
            new google.maps.LatLng(48.64300442349017, 16.928386688232422),
            new google.maps.LatLng(48.64323127303276, 16.92495346069336),
            new google.maps.LatLng(48.64538629279955, 16.92066192626953),
            new google.maps.LatLng(48.64946923562415, 16.920833587646484),
            new google.maps.LatLng(48.65071673555142, 16.919631958007812),
            new google.maps.LatLng(48.653778649977674, 16.919631958007812),
            new google.maps.LatLng(48.65581982296042, 16.92220687866211),
            new google.maps.LatLng(48.656953772242026, 16.921520233154297),
            new google.maps.LatLng(48.65842786817649, 16.923751831054688),
            new google.maps.LatLng(48.659221594287, 16.923065185546875),
            new google.maps.LatLng(48.66182946351226, 16.922378540039062),
            new google.maps.LatLng(48.663530175098636, 16.92169189453125),
            new google.maps.LatLng(48.66455057450464, 16.922550201416016),
            new google.maps.LatLng(48.6671581680164, 16.921348571777344),
            new google.maps.LatLng(48.66681805477509, 16.923065185546875),
            new google.maps.LatLng(48.667951756652755, 16.922378540039062),
            new google.maps.LatLng(48.66942553096393, 16.923751831054688),
            new google.maps.LatLng(48.670105719954485, 16.922550201416016),
            new google.maps.LatLng(48.67033244757764, 16.924610137939453),
            new google.maps.LatLng(48.671919512374565, 16.924781799316403),
            new google.maps.LatLng(48.672826384100354, 16.922550201416016),
            new google.maps.LatLng(48.672486309116, 16.92066192626953),
            new google.maps.LatLng(48.6723729502778, 16.91946029663086),
            new google.maps.LatLng(48.673506527182866, 16.91791534423828),
            new google.maps.LatLng(48.673846595281056, 16.913280487060547),
            new google.maps.LatLng(48.676227007697975, 16.91019058227539),
            new google.maps.LatLng(48.67838061725552, 16.910362243652344),
            new google.maps.LatLng(48.68098749511622, 16.911392211914062),
            new google.maps.LatLng(48.6817808659474, 16.912765502929688),
            new google.maps.LatLng(48.68223421509733, 16.91310882568359),
            new google.maps.LatLng(48.68427423577582, 16.91310882568359),
            new google.maps.LatLng(48.68438756783516, 16.914997100830078),
            new google.maps.LatLng(48.68427423577582, 16.91671371459961),
            new google.maps.LatLng(48.684840893522235, 16.916885375976562),
            new google.maps.LatLng(48.68574753265503, 16.915340423583984),
            new google.maps.LatLng(48.68688080861845, 16.915168762207028),
            new google.maps.LatLng(48.68778741102728, 16.918258666992188),
            new google.maps.LatLng(48.688807319227706, 16.917400360107422),
            new google.maps.LatLng(48.68948724655187, 16.915855407714844),
            new google.maps.LatLng(48.69232017824781, 16.91722869873047),
            new google.maps.LatLng(48.693679928847146, 16.918945312499996),
            new google.maps.LatLng(48.69526625813293, 16.91671371459961),
            new google.maps.LatLng(48.69866536686295, 16.916542053222656),
            new google.maps.LatLng(48.699571757095455, 16.91791534423828),
            new google.maps.LatLng(48.700591426598585, 16.916542053222656),
            new google.maps.LatLng(48.702517412636006, 16.916027069091797),
            new google.maps.LatLng(48.702743994383454, 16.913280487060547),
            new google.maps.LatLng(48.70580274813869, 16.911907196044922),
            new google.maps.LatLng(48.70704885377981, 16.909847259521484),
            new google.maps.LatLng(48.70818165031451, 16.907615661621094),
            new google.maps.LatLng(48.709314421349, 16.904010772705078),
            new google.maps.LatLng(48.711240073584975, 16.902809143066406),
            new google.maps.LatLng(48.71316565212629, 16.9024658203125),
            new google.maps.LatLng(48.71395851598828, 16.905555725097656),
            new google.maps.LatLng(48.71497789402255, 16.90624237060547),
            new google.maps.LatLng(48.71554420622792, 16.904354095458984),
            new google.maps.LatLng(48.71679007064025, 16.902637481689453),
            new google.maps.LatLng(48.71814916026477, 16.90195083618164),
            new google.maps.LatLng(48.71656355213294, 16.899547576904293),
            new google.maps.LatLng(48.71588399049119, 16.897315979003906),
            new google.maps.LatLng(48.716337032605665, 16.89525604248047),
            new google.maps.LatLng(48.71588399049119, 16.892337799072266),
            new google.maps.LatLng(48.716223772459536, 16.888561248779297),
            new google.maps.LatLng(48.716450292496816, 16.887187957763672),
            new google.maps.LatLng(48.715430944296834, 16.886157989501953),
            new google.maps.LatLng(48.7190551996152, 16.882038116455075),
            new google.maps.LatLng(48.720640729210054, 16.882038116455075),
            new google.maps.LatLng(48.7209804790496, 16.880664825439453),
            new google.maps.LatLng(48.722112961940624, 16.881694793701172),
            new google.maps.LatLng(48.72324541933301, 16.879291534423828),
            new google.maps.LatLng(48.72188646740231, 16.877059936523438),
            new google.maps.LatLng(48.71962146592205, 16.87602996826172),
            new google.maps.LatLng(48.71882869130752, 16.875343322753906),
            new google.maps.LatLng(48.71792264787728, 16.875343322753906),
            new google.maps.LatLng(48.717696134469804, 16.87414169311523),
            new google.maps.LatLng(48.71690332951143, 16.87276840209961),
            new google.maps.LatLng(48.715770729325094, 16.873626708984375),
            new google.maps.LatLng(48.71259931314642, 16.8695068359375),
            new google.maps.LatLng(48.711806427864694, 16.85405731201172),
            new google.maps.LatLng(48.711466616061855, 16.841354370117188),
            new google.maps.LatLng(48.716676811514105, 16.834144592285156),
            new google.maps.LatLng(48.71135334495091, 16.82727813720703),
            new google.maps.LatLng(48.710220619816496, 16.820411682128906),
            new google.maps.LatLng(48.709994071729625, 16.817493438720703),
            new google.maps.LatLng(48.71067371293025, 16.8145751953125),
            new google.maps.LatLng(48.711240073584975, 16.810970306396484),
            new google.maps.LatLng(48.712146237372565, 16.80599212646484),
            new google.maps.LatLng(48.70908786918211, 16.806163787841797),
            new google.maps.LatLng(48.706369163618795, 16.799983978271484),
            new google.maps.LatLng(48.70795509304759, 16.799468994140625),
            new google.maps.LatLng(48.710786985571204, 16.798095703124996),
            new google.maps.LatLng(48.710220619816496, 16.796035766601562),
            new google.maps.LatLng(48.711806427864694, 16.7926025390625),
            new google.maps.LatLng(48.71361871872025, 16.790370941162106),
            new google.maps.LatLng(48.71384525048727, 16.78985595703125),
            new google.maps.LatLng(48.7130523848403, 16.785564422607422),
            new google.maps.LatLng(48.712486044585454, 16.782646179199215),
            new google.maps.LatLng(48.71316565212629, 16.780242919921875),
            new google.maps.LatLng(48.71237277576949, 16.779556274414062),
            new google.maps.LatLng(48.714185046225296, 16.778697967529293),
            new google.maps.LatLng(48.712486044585454, 16.77560806274414),
            new google.maps.LatLng(48.711806427864694, 16.774921417236328),
            new google.maps.LatLng(48.71316565212629, 16.77114486694336),
            new google.maps.LatLng(48.71441157544235, 16.768226623535156),
            new google.maps.LatLng(48.71679007064025, 16.766338348388672),
            new google.maps.LatLng(48.718602181979904, 16.76342010498047),
            new google.maps.LatLng(48.716676811514105, 16.76067352294922),
            new google.maps.LatLng(48.71712984648877, 16.75689697265625),
            new google.maps.LatLng(48.71871543677123, 16.75861358642578),
            new google.maps.LatLng(48.71882869130752, 16.756038665771484),
            new google.maps.LatLng(48.719508213170656, 16.756038665771484),
            new google.maps.LatLng(48.719961222646276, 16.754150390625),
            new google.maps.LatLng(48.72449109301389, 16.751747131347656),
            new google.maps.LatLng(48.725849974568995, 16.751403808593746),
            new google.maps.LatLng(48.728454394919595, 16.74917221069336),
            new google.maps.LatLng(48.72969993958008, 16.749000549316406),
            new google.maps.LatLng(48.73026608604482, 16.74814224243164),
            new google.maps.LatLng(48.73185126223428, 16.747112274169922),
            new google.maps.LatLng(48.73151158582936, 16.74488067626953),
            new google.maps.LatLng(48.73151158582936, 16.743507385253906),
            new google.maps.LatLng(48.73083222613515, 16.740074157714844),
            new google.maps.LatLng(48.73083222613515, 16.737670898437496),
            new google.maps.LatLng(48.729247017818686, 16.736812591552734),
            new google.maps.LatLng(48.73026608604482, 16.73492431640625),
            new google.maps.LatLng(48.731738037020946, 16.736297607421875),
            new google.maps.LatLng(48.733323166804986, 16.733722686767578),
            new google.maps.LatLng(48.73377605184995, 16.732864379882812),
            new google.maps.LatLng(48.733096722752656, 16.729259490966797),
            new google.maps.LatLng(48.734342152419266, 16.72771453857422),
            new google.maps.LatLng(48.73536111738081, 16.729602813720703),
            new google.maps.LatLng(48.735813984067825, 16.72891616821289),
            new google.maps.LatLng(48.73649327644923, 16.72840118408203),
            new google.maps.LatLng(48.737851833675386, 16.725139617919922),
            new google.maps.LatLng(48.73841788835014, 16.720333099365234),
            new google.maps.LatLng(48.73807825631017, 16.713294982910156),
            new google.maps.LatLng(48.737059346422065, 16.709346771240234),
            new google.maps.LatLng(48.737059346422065, 16.706771850585938),
            new google.maps.LatLng(48.735587551234275, 16.705570220947266),
            new google.maps.LatLng(48.734795028285234, 16.7047119140625),
            new google.maps.LatLng(48.73660649095374, 16.701107025146484),
            new google.maps.LatLng(48.729247017818686, 16.687030792236325),
            new google.maps.LatLng(48.72788822805663, 16.682567596435547),
            new google.maps.LatLng(48.733662830971156, 16.679649353027344),
            new google.maps.LatLng(48.73717255965173, 16.675701141357422),
            new google.maps.LatLng(48.74113486206065, 16.673812866210938),
            new google.maps.LatLng(48.74441767602123, 16.67552947998047),
            new google.maps.LatLng(48.746568368905805, 16.678447723388672),
            new google.maps.LatLng(48.75132220552496, 16.680335998535156),
            new google.maps.LatLng(48.75584925085029, 16.67999267578125),
            new google.maps.LatLng(48.76343113791796, 16.678104400634766),
            new google.maps.LatLng(48.769088516900005, 16.675701141357422),
            new google.maps.LatLng(48.771690697216016, 16.67449951171875),
            new google.maps.LatLng(48.77293517056508, 16.66849136352539),
            new google.maps.LatLng(48.77553715152789, 16.664199829101562),
            new google.maps.LatLng(48.77734714570491, 16.664714813232422),
            new google.maps.LatLng(48.778365238750794, 16.666088104248047),
            new google.maps.LatLng(48.77881771792104, 16.6636848449707),
            new google.maps.LatLng(48.78040136289702, 16.66454315185547),
            new google.maps.LatLng(48.78153250728974, 16.66299819946289),
            new google.maps.LatLng(48.78175873310928, 16.657676696777344),
            new google.maps.LatLng(48.783002956890236, 16.65699005126953),
            new google.maps.LatLng(48.78221118168935, 16.65596008300781),
            new google.maps.LatLng(48.78311606661356, 16.653213500976562),
            new google.maps.LatLng(48.784360256745806, 16.65390014648437),
            new google.maps.LatLng(48.785038892908254, 16.650981903076172),
            new google.maps.LatLng(48.785265102923105, 16.646690368652344),
            new google.maps.LatLng(48.78605682994539, 16.641712188720703),
            new google.maps.LatLng(48.785830623499294, 16.637420654296875),
            new google.maps.LatLng(48.78549131191832, 16.63381576538086),
            new google.maps.LatLng(48.78402093522326, 16.631927490234375),
            new google.maps.LatLng(48.78221118168935, 16.631240844726562),
            new google.maps.LatLng(48.7802882470557, 16.630554199218746),
            new google.maps.LatLng(48.77994889800225, 16.626605987548825),
            new google.maps.LatLng(48.78096693827984, 16.626434326171875),
            new google.maps.LatLng(48.78119316664855, 16.621627807617188),
            new google.maps.LatLng(48.78175873310928, 16.616992950439453),
            new google.maps.LatLng(48.781080052591655, 16.61458969116211),
            new google.maps.LatLng(48.78096693827984, 16.61098480224609),
            new google.maps.LatLng(48.78096693827984, 16.604290008544922),
            new google.maps.LatLng(48.78288984691201, 16.59313201904297),
            new google.maps.LatLng(48.78718784688117, 16.592960357666016),
            new google.maps.LatLng(48.78944980427994, 16.587295532226562),
            new google.maps.LatLng(48.79148547876059, 16.584720611572266),
            new google.maps.LatLng(48.79216401856762, 16.580429077148438),
            new google.maps.LatLng(48.792955636744374, 16.577854156494137),
            new google.maps.LatLng(48.7935210706521, 16.574249267578125),
            new google.maps.LatLng(48.793294897853706, 16.570129394531246),
            new google.maps.LatLng(48.793294897853706, 16.566696166992188),
            new google.maps.LatLng(48.79397341319004, 16.56412124633789),
            new google.maps.LatLng(48.79713969676012, 16.561203002929688),
            new google.maps.LatLng(48.80075806185256, 16.55914306640625),
            new google.maps.LatLng(48.80245408063935, 16.556396484375),
            new google.maps.LatLng(48.804263104132126, 16.554508209228512),
            new google.maps.LatLng(48.8061851200967, 16.55038833618164),
            new google.maps.LatLng(48.808559273411795, 16.54678344726562),
            new google.maps.LatLng(48.81036807668223, 16.544551849365234),
            new google.maps.LatLng(48.813872447337395, 16.54043197631836),
            new google.maps.LatLng(48.81161159108057, 16.53390884399414),
            new google.maps.LatLng(48.808898428995235, 16.533565521240234),
            new google.maps.LatLng(48.80641123477908, 16.530818939208984),
            new google.maps.LatLng(48.80550676993227, 16.528244018554688),
            new google.maps.LatLng(48.80415004207552, 16.529102325439453),
            new google.maps.LatLng(48.801549544423395, 16.526012420654297),
            new google.maps.LatLng(48.799514278292484, 16.523609161376953),
            new google.maps.LatLng(48.79827046389008, 16.518802642822266),
            new google.maps.LatLng(48.803019407490346, 16.515884399414062),
            new google.maps.LatLng(48.80200181457053, 16.509532928466797),
            new google.maps.LatLng(48.801549544423395, 16.501808166503906),
            new google.maps.LatLng(48.801436476249386, 16.492023468017578),
            new google.maps.LatLng(48.80177568000675, 16.481380462646484),
            new google.maps.LatLng(48.80177568000675, 16.47897720336914),
            new google.maps.LatLng(48.80437616593385, 16.474857330322266),
            new google.maps.LatLng(48.80584594616148, 16.471939086914062),
            new google.maps.LatLng(48.8079940090084, 16.466617584228516),
            new google.maps.LatLng(48.80980283266952, 16.464385986328125),
            new google.maps.LatLng(48.809011480346605, 16.459407806396484),
            new google.maps.LatLng(48.80822011553441, 16.458892822265625),
            new google.maps.LatLng(48.8066373484419, 16.46249771118164),
            new google.maps.LatLng(48.80573288767331, 16.461124420166016),
            new google.maps.LatLng(48.80505453139158, 16.461639404296875),
            new google.maps.LatLng(48.80392391719761, 16.460094451904297),
            new google.maps.LatLng(48.800305780490156, 16.449279785156246),
            new google.maps.LatLng(48.798383539201154, 16.44824981689453),
            new google.maps.LatLng(48.7956696613839, 16.446876525878906),
            new google.maps.LatLng(48.792955636744374, 16.44704818725586),
            new google.maps.LatLng(48.79114620541586, 16.44756317138672),
            new google.maps.LatLng(48.7888843244893, 16.445846557617188),
            new google.maps.LatLng(48.786169932786066, 16.442584991455078),
            new google.maps.LatLng(48.78492578751847, 16.440868377685547),
            new google.maps.LatLng(48.783342285295475, 16.439838409423828),
            new google.maps.LatLng(48.78096693827984, 16.438121795654297),
            new google.maps.LatLng(48.77859147884576, 16.43726348876953),
            new google.maps.LatLng(48.77779963405229, 16.435718536376953),
            new google.maps.LatLng(48.77632903201041, 16.435375213623047),
            new google.maps.LatLng(48.77429274267509, 16.439151763916016),
            new google.maps.LatLng(48.771351290040066, 16.438121795654297),
            new google.maps.LatLng(48.768409665073385, 16.438121795654297),
            new google.maps.LatLng(48.76682564178745, 16.435890197753906),
            new google.maps.LatLng(48.7646758159776, 16.43280029296875),
            new google.maps.LatLng(48.76343113791796, 16.4300537109375),
            new google.maps.LatLng(48.76263905400075, 16.427822113037106),
            new google.maps.LatLng(48.76184695759155, 16.425247192382812),
            new google.maps.LatLng(48.76139432546335, 16.423702239990234),
            new google.maps.LatLng(48.761620642037315, 16.42232894897461),
            new google.maps.LatLng(48.75652827246622, 16.416149139404293),
            new google.maps.LatLng(48.75517022005627, 16.415977478027344),
            new google.maps.LatLng(48.75415165665625, 16.413917541503906),
            new google.maps.LatLng(48.753133072605415, 16.41529083251953),
            new google.maps.LatLng(48.752114467903624, 16.413230895996094),
            new google.maps.LatLng(48.75120902416534, 16.413917541503906),
            new google.maps.LatLng(48.75132220552496, 16.41185760498047),
            new google.maps.LatLng(48.74430447910931, 16.409454345703125),
            new google.maps.LatLng(48.74305929625056, 16.410140991210938),
            new google.maps.LatLng(48.74113486206065, 16.40533447265625),
            new google.maps.LatLng(48.741927285062566, 16.403789520263672),
            new google.maps.LatLng(48.740795248378255, 16.401729583740234),
            new google.maps.LatLng(48.74102165775483, 16.401042938232422),
            new google.maps.LatLng(48.739889600673365, 16.400184631347656),
            new google.maps.LatLng(48.73887072750052, 16.40052795410156),
            new google.maps.LatLng(48.737965045120255, 16.398639678955075),
            new google.maps.LatLng(48.73694613293745, 16.396236419677734),
            new google.maps.LatLng(48.736380061689765, 16.39383316040039),
            new google.maps.LatLng(48.73762541002072, 16.39263153076172),
            new google.maps.LatLng(48.73887072750052, 16.392459869384766),
            new google.maps.LatLng(48.73830467792511, 16.390399932861328),
            new google.maps.LatLng(48.73909714554591, 16.390056610107422),
            new google.maps.LatLng(48.738757518095376, 16.38833999633789),
            new google.maps.LatLng(48.73739898534616, 16.389198303222656),
            new google.maps.LatLng(48.735587551234275, 16.388854980468746),
            new google.maps.LatLng(48.73502146468838, 16.38662338256836),
            new google.maps.LatLng(48.73400249284259, 16.384220123291016),
            new google.maps.LatLng(48.732983500344034, 16.383190155029297),
            new google.maps.LatLng(48.732304160537886, 16.384906768798825),
            new google.maps.LatLng(48.73071899862706, 16.383705139160156),
            new google.maps.LatLng(48.73003962822387, 16.38284683227539),
            new google.maps.LatLng(48.7293602486415, 16.381473541259766),
            new google.maps.LatLng(48.729247017818686, 16.37958526611328),
            new google.maps.LatLng(48.72856762752726, 16.378555297851562),
            new google.maps.LatLng(48.72913378674089, 16.377010345458984),
            new google.maps.LatLng(48.73003962822387, 16.377525329589844),
            new google.maps.LatLng(48.730945453388294, 16.377182006835934),
            new google.maps.LatLng(48.72902055540814, 16.371002197265625),
            new google.maps.LatLng(48.72902055540814, 16.369457244873047),
            new google.maps.LatLng(48.728114695566745, 16.367568969726562),
            new google.maps.LatLng(48.72788822805663, 16.36310577392578),
            new google.maps.LatLng(48.728114695566745, 16.359329223632812),
            new google.maps.LatLng(48.73003962822387, 16.36087417602539),
            new google.maps.LatLng(48.73083222613515, 16.359672546386715),
            new google.maps.LatLng(48.730152857261835, 16.357097625732422),
            new google.maps.LatLng(48.73343638844867, 16.35177612304687),
            new google.maps.LatLng(48.73762541002072, 16.356582641601562),
            new google.maps.LatLng(48.73887072750052, 16.35641098022461),
            new google.maps.LatLng(48.739776393562906, 16.354694366455078),
            new google.maps.LatLng(48.74102165775483, 16.3531494140625),
            new google.maps.LatLng(48.74204048732868, 16.350231170654297),
            new google.maps.LatLng(48.74136126990745, 16.347312927246094),
            new google.maps.LatLng(48.741927285062566, 16.34405136108398),
            new google.maps.LatLng(48.74351209358682, 16.344223022460938),
            new google.maps.LatLng(48.74430447910931, 16.34267807006836),
            new google.maps.LatLng(48.74543643675551, 16.343364715576172),
            new google.maps.LatLng(48.74543643675551, 16.341991424560547),
            new google.maps.LatLng(48.74362529228349, 16.341476440429688),
            new google.maps.LatLng(48.742832896052654, 16.34044647216797),
            new google.maps.LatLng(48.7395499785771, 16.33941650390625),
            new google.maps.LatLng(48.732304160537886, 16.335811614990234),
            new google.maps.LatLng(48.731738037020946, 16.33237838745117),
            new google.maps.LatLng(48.731171907129664, 16.330490112304688),
            new google.maps.LatLng(48.73264383158835, 16.32946014404297),
            new google.maps.LatLng(48.73185126223428, 16.32568359375),
            new google.maps.LatLng(48.733323166804986, 16.311607360839844),
            new google.maps.LatLng(48.73547433443503, 16.307659149169922),
            new google.maps.LatLng(48.738757518095376, 16.30474090576172),
            new google.maps.LatLng(48.739889600673365, 16.30044937133789),
            new google.maps.LatLng(48.738983936650705, 16.298561096191406),
            new google.maps.LatLng(48.73762541002072, 16.297187805175778),
            new google.maps.LatLng(48.73841788835014, 16.292381286621094),
            new google.maps.LatLng(48.74011601412937, 16.28826141357422),
            new google.maps.LatLng(48.7396631861975, 16.285343170166016),
            new google.maps.LatLng(48.74124806611154, 16.281051635742188),
            new google.maps.LatLng(48.74136126990745, 16.268348693847656),
            new google.maps.LatLng(48.73728577262645, 16.263198852539062),
            new google.maps.LatLng(48.7395499785771, 16.249122619628906),
            new google.maps.LatLng(48.740002807528846, 16.240882873535156),
            new google.maps.LatLng(48.74034242656551, 16.226978302001953),
            new google.maps.LatLng(48.742832896052654, 16.205005645751953),
            new google.maps.LatLng(48.743172495967066, 16.190242767333984),
            new google.maps.LatLng(48.74498365675653, 16.178226470947266),
            new google.maps.LatLng(48.746228791937774, 16.17359161376953),
            new google.maps.LatLng(48.74690794357923, 16.16260528564453),
            new google.maps.LatLng(48.748832156719295, 16.15367889404297),
            new google.maps.LatLng(48.74679475227639, 16.15316390991211),
            new google.maps.LatLng(48.74521004726593, 16.15316390991211),
            new google.maps.LatLng(48.74430447910931, 16.15041732788086),
            new google.maps.LatLng(48.74305929625056, 16.14990234375),
            new google.maps.LatLng(48.74521004726593, 16.139430999755856),
            new google.maps.LatLng(48.743172495967066, 16.138916015625),
            new google.maps.LatLng(48.74679475227639, 16.117801666259766),
            new google.maps.LatLng(48.748153031083405, 16.116771697998047),
            new google.maps.LatLng(48.747021134627126, 16.11196517944336),
            new google.maps.LatLng(48.74611559910519, 16.11213684082031),
            new google.maps.LatLng(48.74543643675551, 16.104412078857422),
            new google.maps.LatLng(48.74634198451542, 16.09720230102539),
            new google.maps.LatLng(48.74996401238272, 16.080379486083984),
            new google.maps.LatLng(48.751888108498754, 16.07522964477539),
            new google.maps.LatLng(48.75437800586312, 16.064586639404297),
            new google.maps.LatLng(48.75822578635217, 16.05875015258789),
            new google.maps.LatLng(48.76184695759155, 16.05051040649414),
            new google.maps.LatLng(48.764110057047255, 16.040725708007812),
            new google.maps.LatLng(48.76863595003531, 16.02956771850586),
            new google.maps.LatLng(48.77203010209762, 16.02046966552734),
            new google.maps.LatLng(48.77384022271721, 16.01480484008789),
            new google.maps.LatLng(48.773613961208746, 16.012229919433594),
            new google.maps.LatLng(48.77587653040708, 16.007423400878906),
            new google.maps.LatLng(48.77757339038845, 16.000900268554688),
            new google.maps.LatLng(48.779043955976626, 15.994720458984373),
            new google.maps.LatLng(48.78288984691201, 15.990257263183594),
            new google.maps.LatLng(48.78865813078871, 15.98133087158203),
            new google.maps.LatLng(48.79216401856762, 15.974979400634766),
            new google.maps.LatLng(48.79487808603064, 15.970687866210938),
            new google.maps.LatLng(48.79759200667088, 15.96794128417969),
            new google.maps.LatLng(48.79872276360495, 15.962276458740234),
            new google.maps.LatLng(48.798383539201154, 15.958328247070314),
            new google.maps.LatLng(48.804715349809726, 15.95008850097656),
            new google.maps.LatLng(48.81115940759497, 15.950603485107422),
            new google.maps.LatLng(48.815568022624426, 15.953006744384766),
            new google.maps.LatLng(48.81794173168324, 15.95609664916992),
            new google.maps.LatLng(48.81997624998735, 15.959701538085936),
            new google.maps.LatLng(48.82212370749906, 15.959186553955078),
            new google.maps.LatLng(48.82359296752074, 15.957813262939451),
            new google.maps.LatLng(48.82359296752074, 15.954036712646483),
            new google.maps.LatLng(48.823140892101684, 15.950946807861328),
            new google.maps.LatLng(48.82223672902993, 15.94717025756836),
            new google.maps.LatLng(48.82359296752074, 15.945796966552734),
            new google.maps.LatLng(48.825062184469964, 15.94785690307617),
            new google.maps.LatLng(48.826531358347054, 15.94837188720703),
            new google.maps.LatLng(48.827774471831894, 15.945625305175781),
            new google.maps.LatLng(48.82800048915231, 15.942878723144531),
            new google.maps.LatLng(48.82687039235583, 15.940647125244142),
            new google.maps.LatLng(48.82427107300333, 15.941162109375),
            new google.maps.LatLng(48.821445572961586, 15.940990447998047),
            new google.maps.LatLng(48.819298086394696, 15.940303802490233),
            new google.maps.LatLng(48.81884597223549, 15.93463897705078),
            new google.maps.LatLng(48.82008927636075, 15.932750701904295),
            new google.maps.LatLng(48.8216716188269, 15.928287506103514),
            new google.maps.LatLng(48.82370598573833, 15.924510955810545),
            new google.maps.LatLng(48.825966296568524, 15.925025939941404),
            new google.maps.LatLng(48.826531358347054, 15.926914215087889),
            new google.maps.LatLng(48.83071261748071, 15.927085876464846),
            new google.maps.LatLng(48.83285961496447, 15.930347442626951),
            new google.maps.LatLng(48.833876581660704, 15.931034088134767),
            new google.maps.LatLng(48.83455454798976, 15.926914215087889),
            new google.maps.LatLng(48.83511951292218, 15.921592712402344),
            new google.maps.LatLng(48.83760528293373, 15.92090606689453),
            new google.maps.LatLng(48.838961105496054, 15.919017791748045),
            new google.maps.LatLng(48.838283198802166, 15.91592788696289),
            new google.maps.LatLng(48.836927357890694, 15.914039611816406),
            new google.maps.LatLng(48.837040346035, 15.91043472290039),
            new google.maps.LatLng(48.83579746243093, 15.908203125),
            new google.maps.LatLng(48.83568447148326, 15.904941558837889),
            new google.maps.LatLng(48.83568447148326, 15.899620056152342),
            new google.maps.LatLng(48.83466754148594, 15.89447021484375),
            new google.maps.LatLng(48.83557148028076, 15.891723632812498),
            new google.maps.LatLng(48.8398649668164, 15.890865325927734),
            new google.maps.LatLng(48.84212454876025, 15.891551971435545),
            new google.maps.LatLng(48.843141327377744, 15.893268585205076),
            new google.maps.LatLng(48.84212454876025, 15.893955230712892),
            new google.maps.LatLng(48.83975198504333, 15.895843505859377),
            new google.maps.LatLng(48.838170213461225, 15.897560119628904),
            new google.maps.LatLng(48.83794424201477, 15.89996337890625),
            new google.maps.LatLng(48.83805722786541, 15.90373992919922),
            new google.maps.LatLng(48.83850916871952, 15.905113220214842),
            new google.maps.LatLng(48.84088179130599, 15.904598236083984),
            new google.maps.LatLng(48.843141327377744, 15.902538299560547),
            new google.maps.LatLng(48.846756373063506, 15.899448394775389),
            new google.maps.LatLng(48.848902682969765, 15.897216796874998),
            new google.maps.LatLng(48.848902682969765, 15.893096923828125),
            new google.maps.LatLng(48.84573966784039, 15.892066955566408),
            new google.maps.LatLng(48.843706195467924, 15.891551971435545),
            new google.maps.LatLng(48.84189859515309, 15.887603759765623),
            new google.maps.LatLng(48.84212454876025, 15.885200500488281),
            new google.maps.LatLng(48.843706195467924, 15.882453918457031),
            new google.maps.LatLng(48.84585263610676, 15.8807373046875),
            new google.maps.LatLng(48.84833787349268, 15.880222320556639),
            new google.maps.LatLng(48.850822987537555, 15.880222320556639),
            new google.maps.LatLng(48.853646831055556, 15.880050659179686),
            new google.maps.LatLng(48.854663375732876, 15.8807373046875),
            new google.maps.LatLng(48.8583905296204, 15.877819061279295),
            new google.maps.LatLng(48.86008459874117, 15.875072479248047),
            new google.maps.LatLng(48.8607622103356, 15.872840881347656),
            new google.maps.LatLng(48.85974578950385, 15.870609283447267),
            new google.maps.LatLng(48.85872934803138, 15.871639251708984),
            new google.maps.LatLng(48.8583905296204, 15.87369918823242),
            new google.maps.LatLng(48.85714817582527, 15.875244140625),
            new google.maps.LatLng(48.854889271746934, 15.87472915649414),
            new google.maps.LatLng(48.853646831055556, 15.871467590332031),
            new google.maps.LatLng(48.85285617092493, 15.86700439453125),
            new google.maps.LatLng(48.85251731276078, 15.864429473876951),
            new google.maps.LatLng(48.85432452980058, 15.861167907714844),
            new google.maps.LatLng(48.855905791196136, 15.858592987060545),
            new google.maps.LatLng(48.857938768171536, 15.856876373291017),
            new google.maps.LatLng(48.85805170891599, 15.850181579589844),
            new google.maps.LatLng(48.8583905296204, 15.845375061035156),
            new google.maps.LatLng(48.8604234056851, 15.842113494873047),
            new google.maps.LatLng(48.862117406003776, 15.840568542480467),
            new google.maps.LatLng(48.863133778674346, 15.844688415527342),
            new google.maps.LatLng(48.863924276481605, 15.84829330444336),
            new google.maps.LatLng(48.865505234637915, 15.850353240966795),
            new google.maps.LatLng(48.866295694987045, 15.851211547851562),
            new google.maps.LatLng(48.86855408432749, 15.851726531982422),
            new google.maps.LatLng(48.87148983809234, 15.84726333618164),
            new google.maps.LatLng(48.87239311228893, 15.843830108642578),
            new google.maps.LatLng(48.8737479930069, 15.842800140380858),
            new google.maps.LatLng(48.875667344547686, 15.844001770019531),
            new google.maps.LatLng(48.876570543321755, 15.842628479003904),
            new google.maps.LatLng(48.87747372578843, 15.83953857421875),
            new google.maps.LatLng(48.87702213659352, 15.837650299072266),
            new google.maps.LatLng(48.87578024528625, 15.835933685302734),
            new google.maps.LatLng(48.87397380289261, 15.835075378417967),
            new google.maps.LatLng(48.87273183590832, 15.831642150878908),
            new google.maps.LatLng(48.87137692767112, 15.829410552978514),
            new google.maps.LatLng(48.871828567827116, 15.823917388916016),
            new google.maps.LatLng(48.872957650380535, 15.821685791015623),
            new google.maps.LatLng(48.87307055723444, 15.814990997314453),
            new google.maps.LatLng(48.87216729526863, 15.80881118774414),
            new google.maps.LatLng(48.87250602041687, 15.804519653320312),
            new google.maps.LatLng(48.87352218210199, 15.793190002441406),
            new google.maps.LatLng(48.87465122643438, 15.77962875366211),
            new google.maps.LatLng(48.86968324077576, 15.774650573730467),
            new google.maps.LatLng(48.86765074082236, 15.773963928222656),
            new google.maps.LatLng(48.86437598390832, 15.770702362060545),
            new google.maps.LatLng(48.8604234056851, 15.765724182128906),
            new google.maps.LatLng(48.856922290004306, 15.760917663574217),
            new google.maps.LatLng(48.85387273165656, 15.75662612915039),
            new google.maps.LatLng(48.85206549830757, 15.75284957885742),
            new google.maps.LatLng(48.854663375732876, 15.741004943847656),
            new google.maps.LatLng(48.85613168160397, 15.72813034057617),
            new google.maps.LatLng(48.857938768171536, 15.71319580078125),
            new google.maps.LatLng(48.85963285258174, 15.714740753173828),
            new google.maps.LatLng(48.8604234056851, 15.708045959472654),
            new google.maps.LatLng(48.85872934803138, 15.698776245117186),
            new google.maps.LatLng(48.85703523304219, 15.695514678955078),
            new google.maps.LatLng(48.85613168160397, 15.695514678955078),
            new google.maps.LatLng(48.855566953673204, 15.689678192138672),
            new google.maps.LatLng(48.85703523304219, 15.686588287353514),
            new google.maps.LatLng(48.86110101269274, 15.683670043945312),
            new google.maps.LatLng(48.8641501307046, 15.679893493652344),
            new google.maps.LatLng(48.865956927794876, 15.674400329589844),
            new google.maps.LatLng(48.86787657822752, 15.671138763427733),
            new google.maps.LatLng(48.87115110606428, 15.668563842773438),
            new google.maps.LatLng(48.87329637017783, 15.666160583496094),
            new google.maps.LatLng(48.875667344547686, 15.663585662841795),
            new google.maps.LatLng(48.87792531090653, 15.659294128417967),
            new google.maps.LatLng(48.87973161061079, 15.657405853271483),
            new google.maps.LatLng(48.88176361980966, 15.655174255371094),
            new google.maps.LatLng(48.884247074497864, 15.64830780029297),
            new google.maps.LatLng(48.88492435891923, 15.644702911376953),
            new google.maps.LatLng(48.88650465356476, 15.641956329345701),
            new google.maps.LatLng(48.8868432816345, 15.638351440429686),
            new google.maps.LatLng(48.88718190741112, 15.636463165283201),
            new google.maps.LatLng(48.88560163416802, 15.63680648803711),
            new google.maps.LatLng(48.88469859846461, 15.636463165283201),
            new google.maps.LatLng(48.8848114788193, 15.630970001220703),
            new google.maps.LatLng(48.88650465356476, 15.628223419189451),
            new google.maps.LatLng(48.88921361391561, 15.624790191650389),
            new google.maps.LatLng(48.890568039056824, 15.625991821289062),
            new google.maps.LatLng(48.892825332760836, 15.622386932373045),
            new google.maps.LatLng(48.89417966006481, 15.620155334472656),
            new google.maps.LatLng(48.89575966221592, 15.61929702758789),
            new google.maps.LatLng(48.897903870976286, 15.612945556640623),
            new google.maps.LatLng(48.89688820460747, 15.610542297363281),
            new google.maps.LatLng(48.896549644565184, 15.602474212646484),
            new google.maps.LatLng(48.897113910028416, 15.59904098510742),
            new google.maps.LatLng(48.89700105744533, 15.593891143798828),
            new google.maps.LatLng(48.8962110822299, 15.587368011474608),
            new google.maps.LatLng(48.89587251760159, 15.579299926757812),
            new google.maps.LatLng(48.8964367907082, 15.575180053710938),
            new google.maps.LatLng(48.89948375541988, 15.570030212402342),
            new google.maps.LatLng(48.90354608612109, 15.561790466308594),
            new google.maps.LatLng(48.90557712765307, 15.555095672607422),
            new google.maps.LatLng(48.90681827906492, 15.545997619628906),
            new google.maps.LatLng(48.910315903555315, 15.533466339111328),
            new google.maps.LatLng(48.911331297066184, 15.528144836425781),
            new google.maps.LatLng(48.91324920628473, 15.516986846923828),
            new google.maps.LatLng(48.91426454018195, 15.512351989746094),
            new google.maps.LatLng(48.91663357236046, 15.510292053222656),
            new google.maps.LatLng(48.91900249219245, 15.506858825683594),
            new google.maps.LatLng(48.921709691577746, 15.504798889160156),
            new google.maps.LatLng(48.926108577622024, 15.504798889160156),
            new google.maps.LatLng(48.92813870203602, 15.503082275390625),
            new google.maps.LatLng(48.93095818235513, 15.50342559814453),
            new google.maps.LatLng(48.933213651978896, 15.502223968505861),
            new google.maps.LatLng(48.93580731608049, 15.501880645751951),
            new google.maps.LatLng(48.93851360451849, 15.49793243408203),
            new google.maps.LatLng(48.940430470056214, 15.489864349365233),
            new google.maps.LatLng(48.94212176086727, 15.487632751464844),
            new google.maps.LatLng(48.94370024724888, 15.48042297363281),
            new google.maps.LatLng(48.944376726129164, 15.477161407470703),
            new google.maps.LatLng(48.94550417055202, 15.47750473022461),
            new google.maps.LatLng(48.94651884875415, 15.473041534423828),
            new google.maps.LatLng(48.94742076761307, 15.473384857177734),
            new google.maps.LatLng(48.951817388604084, 15.468406677246092),
            new google.maps.LatLng(48.95125374089685, 15.466861724853514),
            new google.maps.LatLng(48.951028280030975, 15.465831756591797),
            new google.maps.LatLng(48.94978822705676, 15.464286804199219),
            new google.maps.LatLng(48.94787172092932, 15.459651947021484),
            new google.maps.LatLng(48.94651884875415, 15.45896530151367),
            new google.maps.LatLng(48.94550417055202, 15.456047058105469),
            new google.maps.LatLng(48.94843540684353, 15.452098846435547),
            new google.maps.LatLng(48.94990096041889, 15.449695587158203),
            new google.maps.LatLng(48.950802818146265, 15.443172454833983),
            new google.maps.LatLng(48.950013693526294, 15.438365936279297),
            new google.maps.LatLng(48.95057735524269, 15.429611206054686),
            new google.maps.LatLng(48.95170465957206, 15.424461364746094),
            new google.maps.LatLng(48.95429736286702, 15.41828155517578),
            new google.maps.LatLng(48.95531186226096, 15.413818359374998),
            new google.maps.LatLng(48.958918804130434, 15.409011840820312),
            new google.maps.LatLng(48.96444142841345, 15.400257110595701),
            new google.maps.LatLng(48.96500492711942, 15.393905639648438),
            new google.maps.LatLng(48.96646999395574, 15.391502380371094),
            new google.maps.LatLng(48.969963441173306, 15.389957427978516),
            new google.maps.LatLng(48.971766414941875, 15.388755798339842),
            new google.maps.LatLng(48.972442513295746, 15.388927459716795),
            new google.maps.LatLng(48.97345664363535, 15.384635925292967),
            new google.maps.LatLng(48.976498910878114, 15.37811279296875),
            new google.maps.LatLng(48.97818897912187, 15.372791290283201),
            new google.maps.LatLng(48.97942832608162, 15.371932983398438),
            new google.maps.LatLng(48.98078030580144, 15.368328094482422),
            new google.maps.LatLng(48.98168160524064, 15.366954803466795),
            new google.maps.LatLng(48.98213224884806, 15.357685089111326),
            new google.maps.LatLng(48.98404743872055, 15.353736877441404),
            new google.maps.LatLng(48.9841600946563, 15.350990295410156),
            new google.maps.LatLng(48.984723370514985, 15.348243713378908),
            new google.maps.LatLng(48.98404743872055, 15.346870422363281),
            new google.maps.LatLng(48.98404743872055, 15.343093872070312),
            new google.maps.LatLng(48.98325884003952, 15.340690612792969),
            new google.maps.LatLng(48.98325884003952, 15.336055755615233),
            new google.maps.LatLng(48.984723370514985, 15.331935882568358),
            new google.maps.LatLng(48.982019588328214, 15.328674316406252),
            new google.maps.LatLng(48.980442314309585, 15.327644348144531),
            new google.maps.LatLng(48.97920299256283, 15.327301025390625),
            new google.maps.LatLng(48.976273564116056, 15.321636199951172),
            new google.maps.LatLng(48.980554978394885, 15.31219482421875),
            new google.maps.LatLng(48.97796364000019, 15.305843353271484),
            new google.maps.LatLng(48.979991655421706, 15.29914855957031),
            new google.maps.LatLng(48.980667642225484, 15.297260284423826),
            new google.maps.LatLng(48.9815689437021, 15.295543670654299),
            new google.maps.LatLng(48.982357569123735, 15.294170379638672),
            new google.maps.LatLng(48.984610715852575, 15.29073715209961),
            new google.maps.LatLng(48.98562459864604, 15.29245376586914),
            new google.maps.LatLng(48.98708905959677, 15.291595458984373),
            new google.maps.LatLng(48.98900405897688, 15.293655395507814),
            new google.maps.LatLng(48.989905209689226, 15.293483734130858),
            new google.maps.LatLng(48.99272120061698, 15.289535522460936),
            new google.maps.LatLng(48.993509649554724, 15.28249740600586),
            new google.maps.LatLng(48.99463598353408, 15.27872085571289),
            new google.maps.LatLng(48.993171744395084, 15.276660919189453),
            new google.maps.LatLng(48.990918984758885, 15.276660919189453),
            new google.maps.LatLng(48.988553477508745, 15.275287628173828),
            new google.maps.LatLng(48.98675111088969, 15.275630950927733),
            new google.maps.LatLng(48.98517398661786, 15.275802612304686),
            new google.maps.LatLng(48.982920865356135, 15.277862548828123),
            new google.maps.LatLng(48.98089296912269, 15.282154083251953),
            new google.maps.LatLng(48.97402004046564, 15.277862548828123),
            new google.maps.LatLng(48.96658268962184, 15.27168273925781),
            new google.maps.LatLng(48.967033469739306, 15.267391204833984),
            new google.maps.LatLng(48.96432872790815, 15.265159606933594),
            new google.maps.LatLng(48.963990624864145, 15.267047882080078),
            new google.maps.LatLng(48.961961958462446, 15.267391204833984),
            new google.maps.LatLng(48.95812980788307, 15.26876449584961),
            new google.maps.LatLng(48.95655177794697, 15.268249511718752),
            new google.maps.LatLng(48.957453515451924, 15.26498794555664),
            new google.maps.LatLng(48.957453515451924, 15.261898040771483),
            new google.maps.LatLng(48.95553730376894, 15.262069702148436),
            new google.maps.LatLng(48.95362101847589, 15.261554718017578),
            new google.maps.LatLng(48.95553730376894, 15.255889892578123),
            new google.maps.LatLng(48.957453515451924, 15.249881744384766),
            new google.maps.LatLng(48.958017093114634, 15.247650146484375),
            new google.maps.LatLng(48.95948236523749, 15.24576187133789),
            new google.maps.LatLng(48.95936965352547, 15.240783691406248),
            new google.maps.LatLng(48.95812980788307, 15.238552093505858),
            new google.maps.LatLng(48.958242522396795, 15.23529052734375),
            new google.maps.LatLng(48.95914422933736, 15.232372283935547),
            new google.maps.LatLng(48.95936965352547, 15.227222442626951),
            new google.maps.LatLng(48.959933209538505, 15.224647521972654),
            new google.maps.LatLng(48.958467950660165, 15.221557617187502),
            new google.maps.LatLng(48.95880609114492, 15.217437744140623),
            new google.maps.LatLng(48.95756623149388, 15.213489532470701),
            new google.maps.LatLng(48.956664496026534, 15.212631225585938),
            new google.maps.LatLng(48.95756623149388, 15.21005630493164),
            new google.maps.LatLng(48.95610090308156, 15.209712982177733),
            new google.maps.LatLng(48.95350829351923, 15.203189849853516),
            new google.maps.LatLng(48.95238102994353, 15.199584960937498),
            new google.maps.LatLng(48.94956275956837, 15.198211669921877),
            new google.maps.LatLng(48.94550417055202, 15.191688537597654),
            new google.maps.LatLng(48.94494045152457, 15.192890167236328),
            new google.maps.LatLng(48.943249256234296, 15.189628601074217),
            new google.maps.LatLng(48.943925741227844, 15.186710357666016),
            new google.maps.LatLng(48.94505319583951, 15.181560516357422),
            new google.maps.LatLng(48.94606788321152, 15.179843902587889),
            new google.maps.LatLng(48.947533506324206, 15.17709732055664),
            new google.maps.LatLng(48.94595514118904, 15.174179077148436),
            new google.maps.LatLng(48.944827706954925, 15.171947479248047),
            new google.maps.LatLng(48.94358749987732, 15.171775817871094),
            new google.maps.LatLng(48.94291101029878, 15.168514251708983),
            new google.maps.LatLng(48.94403848783526, 15.165767669677734),
            new google.maps.LatLng(48.942572762070746, 15.16284942626953),
            new google.maps.LatLng(48.94212176086727, 15.160617828369139),
            new google.maps.LatLng(48.94415123418794, 15.159931182861328),
            new google.maps.LatLng(48.945278683705205, 15.158901214599608),
            new google.maps.LatLng(48.946406107750576, 15.155811309814453),
            new google.maps.LatLng(48.950126426379, 15.157699584960938),
            new google.maps.LatLng(48.95170465957206, 15.160446166992186),
            new google.maps.LatLng(48.95373374317786, 15.161991119384766),
            new google.maps.LatLng(48.95711536579783, 15.162162780761719),
            new google.maps.LatLng(48.958242522396795, 15.16387939453125),
            new google.maps.LatLng(48.95869337790471, 15.16611099243164),
            new google.maps.LatLng(48.96173654599053, 15.16937255859375),
            new google.maps.LatLng(48.96387792334008, 15.169200897216797),
            new google.maps.LatLng(48.965343023286664, 15.16834259033203),
            new google.maps.LatLng(48.96737155215314, 15.168514251708983),
            new google.maps.LatLng(48.96872385888624, 15.16611099243164),
            new google.maps.LatLng(48.97086493620758, 15.16456604003906),
            new google.maps.LatLng(48.97165373099149, 15.159587860107422),
            new google.maps.LatLng(48.97424539741494, 15.161991119384766),
            new google.maps.LatLng(48.97582286753578, 15.16336441040039),
            new google.maps.LatLng(48.97728761652289, 15.162162780761719),
            new google.maps.LatLng(48.978076309688376, 15.158386230468748),
            new google.maps.LatLng(48.97931565944956, 15.15237808227539),
            new google.maps.LatLng(48.98145628190888, 15.15083312988281),
            new google.maps.LatLng(48.98438540576378, 15.15237808227539),
            new google.maps.LatLng(48.984610715852575, 15.15460968017578),
            new google.maps.LatLng(48.98427275033738, 15.155982971191406),
            new google.maps.LatLng(48.98517398661786, 15.157699584960938),
            new google.maps.LatLng(48.987314357461464, 15.157699584960938),
            new google.maps.LatLng(48.99001785238229, 15.158386230468748),
            new google.maps.LatLng(48.99260856403581, 15.156326293945312),
            new google.maps.LatLng(48.99452335128209, 15.151691436767578),
            new google.maps.LatLng(48.996212808322696, 15.147056579589842),
            new google.maps.LatLng(48.99700120199978, 15.141220092773436),
            new google.maps.LatLng(48.99801483267806, 15.136585235595703),
            new google.maps.LatLng(49.00049250972169, 15.132637023925781),
            new google.maps.LatLng(48.997451707070006, 15.129547119140623),
            new google.maps.LatLng(48.999028442729426, 15.124740600585938),
            new google.maps.LatLng(48.99767695807719, 15.122165679931642),
            new google.maps.LatLng(48.99891582040898, 15.115299224853516),
            new google.maps.LatLng(48.99936630816279, 15.109806060791014),
            new google.maps.LatLng(48.99767695807719, 15.106544494628908),
            new google.maps.LatLng(48.99587492149839, 15.104999542236328),
            new google.maps.LatLng(48.99384755242245, 15.102767944335938),
            new google.maps.LatLng(48.996438064932285, 15.093154907226562),
            new google.maps.LatLng(48.99767695807719, 15.08371353149414),
            new google.maps.LatLng(48.99824008113872, 15.07530212402344),
            new google.maps.LatLng(48.99981679184216, 15.063800811767578),
            new google.maps.LatLng(49.0027448364445, 15.064144134521484),
            new google.maps.LatLng(49.004434014641575, 15.065002441406248),
            new google.maps.LatLng(49.00578531594666, 15.067234039306639),
            new google.maps.LatLng(49.0118657180479, 15.064144134521484),
            new google.maps.LatLng(49.01377976503547, 15.065345764160154),
            new google.maps.LatLng(49.01456788064106, 15.061569213867186),
            new google.maps.LatLng(49.015355983769666, 15.058307647705078),
            new google.maps.LatLng(49.015243398372334, 15.05401611328125),
            new google.maps.LatLng(49.01445529346132, 15.049381256103514),
            new google.maps.LatLng(49.012879046208184, 15.046119689941408),
            new google.maps.LatLng(49.01209090386598, 15.04199981689453),
            new google.maps.LatLng(49.011640531211306, 15.040626525878906),
            new google.maps.LatLng(49.01265386395502, 15.035648345947264),
            new google.maps.LatLng(49.01513081272038, 15.032043457031248),
            new google.maps.LatLng(49.015355983769666, 15.028095245361326),
            new google.maps.LatLng(49.016481823738275, 15.027236938476562),
            new google.maps.LatLng(49.01918373577401, 15.025005340576172),
            new google.maps.LatLng(49.0204220631079, 15.020885467529297),
            new google.maps.LatLng(49.01884600479032, 15.018997192382812),
            new google.maps.LatLng(49.01794537763023, 15.016937255859377),
            new google.maps.LatLng(49.018057956916444, 15.015735626220703),
            new google.maps.LatLng(49.01681957076354, 15.012989044189455),
            new google.maps.LatLng(49.01501822681377, 15.012817382812498),
            new google.maps.LatLng(49.01434270602693, 15.009727478027344),
            new google.maps.LatLng(49.0131042274428, 15.007495880126953),
            new google.maps.LatLng(49.011753124756915, 15.003719329833984),
            new google.maps.LatLng(49.01254127244647, 15.0018310546875),
            new google.maps.LatLng(49.012879046208184, 14.99959945678711),
            new google.maps.LatLng(49.01490564065255, 14.995651245117188),
            new google.maps.LatLng(49.011753124756915, 14.993419647216799),
            new google.maps.LatLng(49.009501205463394, 14.989986419677734),
            new google.maps.LatLng(49.00871300964734, 14.991359710693358),
            new google.maps.LatLng(49.00657355810747, 14.992733001708983),
            new google.maps.LatLng(49.00454662448422, 14.996852874755858),
            new google.maps.LatLng(49.00454662448422, 14.999771118164062),
            new google.maps.LatLng(49.003307902209706, 15.000629425048826),
            new google.maps.LatLng(49.00094298321501, 15.000114440917969),
            new google.maps.LatLng(48.99936630816279, 14.998741149902342),
            new google.maps.LatLng(48.99587492149839, 14.996337890625),
            new google.maps.LatLng(48.99283383694349, 14.995136260986326),
            new google.maps.LatLng(48.99215801516449, 14.997882843017578),
            new google.maps.LatLng(48.991482184217716, 14.997196197509764),
            new google.maps.LatLng(48.99136954483527, 14.99582290649414),
            new google.maps.LatLng(48.989454636370375, 14.993762969970703),
            new google.maps.LatLng(48.988778768752134, 14.991874694824219),
            new google.maps.LatLng(48.98787759766659, 14.991359710693358),
            new google.maps.LatLng(48.987990244943596, 14.988269805908203),
            new google.maps.LatLng(48.9869764102824, 14.985179901123045),
            new google.maps.LatLng(48.984723370514985, 14.983463287353514),
            new google.maps.LatLng(48.98359681243084, 14.98260498046875),
            new google.maps.LatLng(48.9817942665245, 14.98157501220703),
            new google.maps.LatLng(48.980442314309585, 14.980716705322266),
            new google.maps.LatLng(48.97863965430907, 14.980545043945312),
            new google.maps.LatLng(48.980554978394885, 14.978485107421875),
            new google.maps.LatLng(48.97751295870069, 14.978313446044922),
            new google.maps.LatLng(48.97447075334554, 14.978141784667969),
            new google.maps.LatLng(48.97086493620758, 14.976081848144531),
            new google.maps.LatLng(48.96601920874445, 14.976940155029297),
            new google.maps.LatLng(48.96038404976431, 14.977970123291017),
            new google.maps.LatLng(48.955875464120645, 14.97659683227539),
            new google.maps.LatLng(48.947195289426645, 14.979686737060545),
            new google.maps.LatLng(48.94403848783526, 14.980716705322266),
            new google.maps.LatLng(48.941445251420404, 14.984664916992188),
            new google.maps.LatLng(48.94031771529768, 14.983978271484375),
            new google.maps.LatLng(48.93873912193207, 14.985523223876951),
            new google.maps.LatLng(48.93592008102812, 14.986209869384766),
            new google.maps.LatLng(48.93253702179063, 14.983978271484375),
            new google.maps.LatLng(48.931070958256306, 14.979515075683592),
            new google.maps.LatLng(48.92734921901588, 14.979515075683592),
            new google.maps.LatLng(48.924529534904444, 14.985008239746092),
            new google.maps.LatLng(48.923401616679705, 14.983806610107424),
            new google.maps.LatLng(48.919453702279995, 14.985523223876951),
            new google.maps.LatLng(48.916069527270054, 14.99032974243164),
            new google.maps.LatLng(48.909864610926675, 14.99032974243164),
            new google.maps.LatLng(48.90591562654988, 14.992733001708983),
            new google.maps.LatLng(48.90332040974438, 14.992904663085936),
            new google.maps.LatLng(48.89993514180326, 14.992389678955078),
            new google.maps.LatLng(48.89745246624902, 14.991531372070314),
            new google.maps.LatLng(48.89722676235673, 14.98964309692383),
            new google.maps.LatLng(48.895646806575506, 14.987583160400392),
            new google.maps.LatLng(48.894856809958604, 14.98861312866211),
            new google.maps.LatLng(48.891132372037255, 14.988441467285156),
            new google.maps.LatLng(48.89079377301335, 14.98329162597656),
            new google.maps.LatLng(48.87453832314776, 14.983978271484375),
            new google.maps.LatLng(48.87442541960633, 14.972991943359375),
            new google.maps.LatLng(48.863472564977805, 14.973163604736328),
            new google.maps.LatLng(48.86053634082343, 14.972305297851562),
            new google.maps.LatLng(48.85884228699207, 14.972648620605469),
            new google.maps.LatLng(48.855566953673204, 14.974021911621096),
            new google.maps.LatLng(48.85342092943525, 14.972991943359375),
            new google.maps.LatLng(48.85308207509357, 14.977970123291017),
            new google.maps.LatLng(48.85048411561242, 14.978828430175781),
            new google.maps.LatLng(48.84867675994344, 14.98037338256836),
            new google.maps.LatLng(48.846756373063506, 14.982433319091797),
            new google.maps.LatLng(48.84607857187498, 14.984664916992188),
            new google.maps.LatLng(48.84246347725967, 14.984493255615234),
            new google.maps.LatLng(48.84223752518157, 14.97213363647461),
            new google.maps.LatLng(48.83941303819501, 14.971790313720701),
            new google.maps.LatLng(48.837379308938786, 14.968700408935547),
            new google.maps.LatLng(48.83444155423872, 14.968528747558594),
            new google.maps.LatLng(48.83082561964199, 14.967498779296873),
            new google.maps.LatLng(48.827661462789415, 14.968528747558594),
            new google.maps.LatLng(48.82325391133874, 14.969387054443358),
            new google.maps.LatLng(48.820993478172554, 14.965782165527342),
            new google.maps.LatLng(48.8191850582372, 14.963893890380858),
            new google.maps.LatLng(48.81760263727072, 14.96114730834961),
            new google.maps.LatLng(48.81466372294123, 14.958229064941404),
            new google.maps.LatLng(48.81082026730451, 14.957714080810545),
            new google.maps.LatLng(48.80584594616148, 14.959087371826172),
            new google.maps.LatLng(48.80460228877266, 14.96063232421875),
            new google.maps.LatLng(48.8013234078205, 14.955482482910156),
            new google.maps.LatLng(48.799514278292484, 14.957027435302734),
            new google.maps.LatLng(48.79713969676012, 14.95445251464844),
            new google.maps.LatLng(48.795330416333336, 14.95290756225586),
            new google.maps.LatLng(48.792955636744374, 14.955310821533203),
            new google.maps.LatLng(48.7915985693657, 14.955482482910156),
            new google.maps.LatLng(48.79012837161679, 14.95445251464844),
            new google.maps.LatLng(48.78944980427994, 14.953079223632812),
            new google.maps.LatLng(48.787640246518, 14.957027435302734),
            new google.maps.LatLng(48.78662234159966, 14.960117340087889),
            new google.maps.LatLng(48.78402093522326, 14.971446990966795),
            new google.maps.LatLng(48.78153250728974, 14.976768493652344),
            new google.maps.LatLng(48.77881771792104, 14.979858398437502),
            new google.maps.LatLng(48.77644215677391, 14.977455139160154),
            new google.maps.LatLng(48.775424024724984, 14.980888366699219),
            new google.maps.LatLng(48.7711250173148, 14.978828430175781),
            new google.maps.LatLng(48.77021991621653, 14.976253509521484),
            new google.maps.LatLng(48.76852280768181, 14.974536895751953),
            new google.maps.LatLng(48.76705193388751, 14.970588684082031),
            new google.maps.LatLng(48.765015268276535, 14.9688720703125),
            new google.maps.LatLng(48.76388375169057, 14.968700408935547),
            new google.maps.LatLng(48.76388375169057, 14.966125488281252),
            new google.maps.LatLng(48.76286536496608, 14.962520599365234),
            new google.maps.LatLng(48.760489048969774, 14.95960235595703),
            new google.maps.LatLng(48.758678447033866, 14.95737075805664),
            new google.maps.LatLng(48.758112620544395, 14.956169128417967),
            new google.maps.LatLng(48.76173379994192, 14.952220916748045),
            new google.maps.LatLng(48.7609416892561, 14.95067596435547),
            new google.maps.LatLng(48.76320482950201, 14.947757720947266),
            new google.maps.LatLng(48.76116800786959, 14.94037628173828),
            new google.maps.LatLng(48.763317983837446, 14.934711456298826),
            new google.maps.LatLng(48.7661467593689, 14.932308197021483),
            new google.maps.LatLng(48.766599348667675, 14.929733276367188),
            new google.maps.LatLng(48.76852280768181, 14.919776916503906),
            new google.maps.LatLng(48.76965421974488, 14.917716979980469),
            new google.maps.LatLng(48.76739137012556, 14.91170883178711),
            new google.maps.LatLng(48.767278224967804, 14.905872344970703),
            new google.maps.LatLng(48.7711250173148, 14.899864196777346),
            new google.maps.LatLng(48.77236950468487, 14.89368438720703),
            new google.maps.LatLng(48.77044619302067, 14.888019561767576),
            new google.maps.LatLng(48.77157756174562, 14.886817932128906),
            new google.maps.LatLng(48.7721432365483, 14.884757995605469),
            new google.maps.LatLng(48.775650278075865, 14.884757995605469),
            new google.maps.LatLng(48.776102781718585, 14.886302947998049),
            new google.maps.LatLng(48.77813899763615, 14.884414672851564),
            new google.maps.LatLng(48.7802882470557, 14.880638122558594),
            new google.maps.LatLng(48.780740708891486, 14.86879348754883),
            new google.maps.LatLng(48.77938331114814, 14.86621856689453),
            new google.maps.LatLng(48.777460268174146, 14.862270355224608),
            new google.maps.LatLng(48.77757339038845, 14.856777191162108),
            new google.maps.LatLng(48.775424024724984, 14.858837127685545),
            new google.maps.LatLng(48.775650278075865, 14.856777191162108),
            new google.maps.LatLng(48.77723402298075, 14.855232238769531),
            new google.maps.LatLng(48.777460268174146, 14.851112365722658),
            new google.maps.LatLng(48.77915707462204, 14.849395751953125),
            new google.maps.LatLng(48.780062014608326, 14.8480224609375),
            new google.maps.LatLng(48.780627593814906, 14.84699249267578),
            new google.maps.LatLng(48.7794964290288, 14.846134185791016),
            new google.maps.LatLng(48.78040136289702, 14.845104217529295),
            new google.maps.LatLng(48.78221118168935, 14.844245910644531),
            new google.maps.LatLng(48.78390782753923, 14.842185974121094),
            new google.maps.LatLng(48.78311606661356, 14.841327667236326),
            new google.maps.LatLng(48.78187184563666, 14.834632873535156),
            new google.maps.LatLng(48.78040136289702, 14.828624725341797),
            new google.maps.LatLng(48.78402093522326, 14.825019836425781),
            new google.maps.LatLng(48.78221118168935, 14.820899963378906),
            new google.maps.LatLng(48.78130628045054, 14.819698333740233),
            new google.maps.LatLng(48.780062014608326, 14.811801910400389),
            new google.maps.LatLng(48.779043955976626, 14.809913635253904),
            new google.maps.LatLng(48.77927019301256, 14.808712005615234),
            new google.maps.LatLng(48.77553715152789, 14.808712005615234),
            new google.maps.LatLng(48.77372709209044, 14.810085296630858),
            new google.maps.LatLng(48.771351290040066, 14.806308746337892),
            new google.maps.LatLng(48.76739137012556, 14.810085296630858),
            new google.maps.LatLng(48.76422320934319, 14.811973571777342),
            new google.maps.LatLng(48.7625258981357, 14.811458587646483),
            new google.maps.LatLng(48.7593574304081, 14.810085296630858),
            new google.maps.LatLng(48.7569809484446, 14.807853698730467),
            new google.maps.LatLng(48.75222764722361, 14.803218841552734),
            new google.maps.LatLng(48.74939808773792, 14.801502227783203),
            new google.maps.LatLng(48.74634198451542, 14.800643920898438),
            new google.maps.LatLng(48.73422893281534, 14.807682037353514),
            new google.maps.LatLng(48.733549609837404, 14.806308746337892),
            new google.maps.LatLng(48.732304160537886, 14.80356216430664),
            new google.maps.LatLng(48.73185126223428, 14.802188873291014),
            new google.maps.LatLng(48.73287027768046, 14.80081558227539),
            new google.maps.LatLng(48.730945453388294, 14.798412322998045),
            new google.maps.LatLng(48.729586709522195, 14.794979095458984),
            new google.maps.LatLng(48.72856762752726, 14.793434143066406),
            new google.maps.LatLng(48.72618968922067, 14.792919158935547),
            new google.maps.LatLng(48.72426460918496, 14.791030883789062),
            new google.maps.LatLng(48.72199971479894, 14.787425994873047),
            new google.maps.LatLng(48.720527478753574, 14.787254333496094),
            new google.maps.LatLng(48.7184889269336, 14.785537719726562),
            new google.maps.LatLng(48.71599725140231, 14.781417846679688),
            new google.maps.LatLng(48.71316565212629, 14.775581359863281),
            new google.maps.LatLng(48.711240073584975, 14.773693084716797),
            new google.maps.LatLng(48.710786985571204, 14.769744873046875),
            new google.maps.LatLng(48.710107345900575, 14.761505126953127),
            new google.maps.LatLng(48.708974592716174, 14.757556915283205),
            new google.maps.LatLng(48.704443324975855, 14.756183624267578),
            new google.maps.LatLng(48.702517412636006, 14.753780364990236),
            new google.maps.LatLng(48.70308386509207, 14.750003814697266),
            new google.maps.LatLng(48.70240412137975, 14.744853973388672),
            new google.maps.LatLng(48.7000249460914, 14.738330841064453),
            new google.maps.LatLng(48.69798556347801, 14.734554290771484),
            new google.maps.LatLng(48.694359790375785, 14.73318099975586),
            new google.maps.LatLng(48.690167164695204, 14.730262756347658),
            new google.maps.LatLng(48.68733411186308, 14.72648620605469),
            new google.maps.LatLng(48.6817808659474, 14.725971221923826),
            new google.maps.LatLng(48.67906068535643, 14.727344512939453),
            new google.maps.LatLng(48.675773604480426, 14.724254608154295),
            new google.maps.LatLng(48.66965226164764, 14.719791412353516),
            new google.maps.LatLng(48.65604661485724, 14.71395492553711),
            new google.maps.LatLng(48.65037651135937, 14.712581634521483),
            new google.maps.LatLng(48.6491290030148, 14.713268280029297),
            new google.maps.LatLng(48.64946923562415, 14.716014862060545),
            new google.maps.LatLng(48.649355825009444, 14.718589782714846),
            new google.maps.LatLng(48.64754122048445, 14.718589782714846),
            new google.maps.LatLng(48.64561313162894, 14.717388153076172),
            new google.maps.LatLng(48.643911815538644, 14.718589782714846),
            new google.maps.LatLng(48.64243729516987, 14.720478057861326),
            new google.maps.LatLng(48.64084930194764, 14.71944808959961),
            new google.maps.LatLng(48.638920957249994, 14.719963073730467),
            new google.maps.LatLng(48.6381269115359, 14.7216796875),
            new google.maps.LatLng(48.63404305042837, 14.719963073730467),
            new google.maps.LatLng(48.617931263319434, 14.713783264160156),
            new google.maps.LatLng(48.60204136700653, 14.720649719238283),
            new google.maps.LatLng(48.60033858154095, 14.719619750976562),
            new google.maps.LatLng(48.600565622919646, 14.717559814453125),
            new google.maps.LatLng(48.59659225145668, 14.711551666259766),
            new google.maps.LatLng(48.59432161315689, 14.711723327636719),
            new google.maps.LatLng(48.59364040176667, 14.70897674560547),
            new google.maps.LatLng(48.59148317177015, 14.706058502197266),
            new google.maps.LatLng(48.589780030397606, 14.706916809082033),
            new google.maps.LatLng(48.587168435464555, 14.708118438720703),
            new google.maps.LatLng(48.58489737363862, 14.706230163574217),
            new google.maps.LatLng(48.58387536252086, 14.702968597412108),
            new google.maps.LatLng(48.583080450696784, 14.701251983642578),
            new google.maps.LatLng(48.584102477888585, 14.695415496826172),
            new google.maps.LatLng(48.585124484413754, 14.694728851318358),
            new google.maps.LatLng(48.58421603518974, 14.69146728515625),
            new google.maps.LatLng(48.58557870290236, 14.690437316894531),
            new google.maps.LatLng(48.58501092915375, 14.687862396240234),
            new google.maps.LatLng(48.583080450696784, 14.683055877685545),
            new google.maps.LatLng(48.582853330736455, 14.67567443847656),
            new google.maps.LatLng(48.58149058954227, 14.671726226806639),
            new google.maps.LatLng(48.58149058954227, 14.66743469238281),
            new google.maps.LatLng(48.58228552637059, 14.665374755859373),
            new google.maps.LatLng(48.58194484068934, 14.663486480712889),
            new google.maps.LatLng(48.59681930967379, 14.657993316650389),
            new google.maps.LatLng(48.60067914322632, 14.65524673461914),
            new google.maps.LatLng(48.60521974629159, 14.652843475341797),
            new google.maps.LatLng(48.60998694019372, 14.645805358886717),
            new google.maps.LatLng(48.608397925562606, 14.642028808593748),
            new google.maps.LatLng(48.60692236720366, 14.639110565185547),
            new google.maps.LatLng(48.60567378414743, 14.635162353515625),
            new google.maps.LatLng(48.60487921522095, 14.634647369384764),
            new google.maps.LatLng(48.604538681854244, 14.632415771484373),
            new google.maps.LatLng(48.603290039865286, 14.63155746459961),
            new google.maps.LatLng(48.60385760823255, 14.628639221191404),
            new google.maps.LatLng(48.60567378414743, 14.625205993652344),
            new google.maps.LatLng(48.608170919390595, 14.623832702636719),
            new google.maps.LatLng(48.61044093518991, 14.622974395751951),
            new google.maps.LatLng(48.61248386216023, 14.621257781982424),
            new google.maps.LatLng(48.61543461074921, 14.621772766113281),
            new google.maps.LatLng(48.61827170637617, 14.618339538574219),
            new google.maps.LatLng(48.62224337239389, 14.617309570312502),
            new google.maps.LatLng(48.624172354561914, 14.614906311035154),
            new google.maps.LatLng(48.62632818856487, 14.61404800415039),
            new google.maps.LatLng(48.628030097728164, 14.610099792480469),
            new google.maps.LatLng(48.6284839304781, 14.606666564941406),
            new google.maps.LatLng(48.6273493409504, 14.602546691894531),
            new google.maps.LatLng(48.62485315419584, 14.601688385009767),
            new google.maps.LatLng(48.625080085366385, 14.598941802978516),
            new google.maps.LatLng(48.62383195130112, 14.59859848022461),
            new google.maps.LatLng(48.62247031529897, 14.595851898193361),
            new google.maps.LatLng(48.62088169353486, 14.595508575439451),
            new google.maps.LatLng(48.62054126808031, 14.594135284423828),
            new google.maps.LatLng(48.61929302177067, 14.592418670654297),
            new google.maps.LatLng(48.61759081796677, 14.590015411376955),
            new google.maps.LatLng(48.618044744593455, 14.585895538330076),
            new google.maps.LatLng(48.617136887258404, 14.583663940429686),
            new google.maps.LatLng(48.616002042629965, 14.583492279052733),
            new google.maps.LatLng(48.61668295246831, 14.581432342529297),
            new google.maps.LatLng(48.61611552824078, 14.579715728759764),
            new google.maps.LatLng(48.61509414855946, 14.579715728759764),
            new google.maps.LatLng(48.61475368407372, 14.577999114990233),
            new google.maps.LatLng(48.61202988553221, 14.575939178466795),
            new google.maps.LatLng(48.611235416611315, 14.575424194335938),
            new google.maps.LatLng(48.611462409007125, 14.5733642578125),
            new google.maps.LatLng(48.61021393820204, 14.569931030273436),
            new google.maps.LatLng(48.61078142875832, 14.568729400634766),
            new google.maps.LatLng(48.608511428265935, 14.567871093749998),
            new google.maps.LatLng(48.60862493071415, 14.563751220703125),
            new google.maps.LatLng(48.60533325613824, 14.563064575195312),
            new google.maps.LatLng(48.603290039865286, 14.562206268310545),
            new google.maps.LatLng(48.604198146191436, 14.558944702148438),
            new google.maps.LatLng(48.60601430986055, 14.557056427001953),
            new google.maps.LatLng(48.60567378414743, 14.55413818359375),
            new google.maps.LatLng(48.60748989475176, 14.551563262939453),
            new google.maps.LatLng(48.609419440708415, 14.551563262939453),
            new google.maps.LatLng(48.61191639073743, 14.550189971923828),
            new google.maps.LatLng(48.61441321729201, 14.547271728515625),
            new google.maps.LatLng(48.61475368407372, 14.526844024658203),
            new google.maps.LatLng(48.616229013596495, 14.523410797119139),
            new google.maps.LatLng(48.619633455643644, 14.518604278564453),
            new google.maps.LatLng(48.619633455643644, 14.514141082763672),
            new google.maps.LatLng(48.61770430000611, 14.505558013916014),
            new google.maps.LatLng(48.617817781790336, 14.501781463623045),
            new google.maps.LatLng(48.619633455643644, 14.500064849853514),
            new google.maps.LatLng(48.62122211669348, 14.496631622314453),
            new google.maps.LatLng(48.623945419309806, 14.494743347167969),
            new google.maps.LatLng(48.630526127344446, 14.494056701660154),
            new google.maps.LatLng(48.6325682415612, 14.49371337890625),
            new google.maps.LatLng(48.633135480842654, 14.488220214843748),
            new google.maps.LatLng(48.63710597725179, 14.481182098388672),
            new google.maps.LatLng(48.63926125872981, 14.478778839111326),
            new google.maps.LatLng(48.641756732767966, 14.475860595703125),
            new google.maps.LatLng(48.64243729516987, 14.477062225341799),
            new google.maps.LatLng(48.64357154543355, 14.475517272949219),
            new google.maps.LatLng(48.644025238396864, 14.473114013671877),
            new google.maps.LatLng(48.646407059497, 14.47122573852539),
            new google.maps.LatLng(48.648221704833475, 14.469852447509766),
            new google.maps.LatLng(48.64606680622684, 14.467964172363281),
            new google.maps.LatLng(48.644365505441066, 14.459896087646484),
            new google.maps.LatLng(48.64300442349017, 14.459381103515627),
            new google.maps.LatLng(48.644365505441066, 14.45354461669922),
            new google.maps.LatLng(48.64334469742144, 14.44427490234375),
            new google.maps.LatLng(48.638580653474435, 14.444446563720703),
            new google.maps.LatLng(48.63597158159206, 14.447193145751951),
            new google.maps.LatLng(48.63154719478398, 14.452342987060547),
            new google.maps.LatLng(48.626895497996685, 14.45474624633789),
            new google.maps.LatLng(48.624172354561914, 14.45577621459961),
            new google.maps.LatLng(48.624739688227955, 14.45199966430664),
            new google.maps.LatLng(48.618952585601775, 14.447021484374998),
            new google.maps.LatLng(48.61407274821432, 14.448566436767578),
            new google.maps.LatLng(48.6106679311573, 14.446334838867188),
            new google.maps.LatLng(48.60590080154464, 14.444103240966797),
            new google.maps.LatLng(48.60294949578345, 14.442901611328125),
            new google.maps.LatLng(48.59999801755946, 14.441699981689451),
            new google.maps.LatLng(48.59806811162617, 14.436035156250002),
            new google.maps.LatLng(48.59568400838307, 14.434661865234375),
            new google.maps.LatLng(48.59114254808809, 14.43277359008789),
            new google.maps.LatLng(48.58921230384991, 14.4305419921875),
            new google.maps.LatLng(48.58909875777496, 14.426422119140625),
            new google.maps.LatLng(48.58853102357315, 14.425048828125),
            new google.maps.LatLng(48.591937333107666, 14.416294097900389),
            new google.maps.LatLng(48.59227795143187, 14.413890838623045),
            new google.maps.LatLng(48.59239149036303, 14.407882690429688),
            new google.maps.LatLng(48.592959181191695, 14.403419494628906),
            new google.maps.LatLng(48.592050872804194, 14.398612976074217),
            new google.maps.LatLng(48.591937333107666, 14.394836425781248),
            new google.maps.LatLng(48.593186255737216, 14.394836425781248),
            new google.maps.LatLng(48.59398100860989, 14.391403198242188),
            new google.maps.LatLng(48.59250502903901, 14.38608169555664),
            new google.maps.LatLng(48.58364824613257, 14.386940002441404),
            new google.maps.LatLng(48.58217196473199, 14.390716552734373),
            new google.maps.LatLng(48.5818312782853, 14.39157485961914),
            new google.maps.LatLng(48.57887856622341, 14.390888214111326),
            new google.maps.LatLng(48.57887856622341, 14.39311981201172),
            new google.maps.LatLng(48.577402145512224, 14.393463134765625),
            new google.maps.LatLng(48.57229112546091, 14.388484954833984),
            new google.maps.LatLng(48.57104168641604, 14.38608169555664),
            new google.maps.LatLng(48.57013298408231, 14.383678436279297),
            new google.maps.LatLng(48.56922426541838, 14.375610351562502),
            new google.maps.LatLng(48.56990580594728, 14.368400573730469),
            new google.maps.LatLng(48.57183678756225, 14.368228912353516),
            new google.maps.LatLng(48.574562753716684, 14.366168975830078),
            new google.maps.LatLng(48.57524422229134, 14.365997314453125),
            new google.maps.LatLng(48.57513064483345, 14.36393737792969),
            new google.maps.LatLng(48.574789910928864, 14.35758590698242),
            new google.maps.LatLng(48.57274545927705, 14.356555938720703),
            new google.maps.LatLng(48.5685427157037, 14.352436065673828),
            new google.maps.LatLng(48.566270816979376, 14.352951049804688),
            new google.maps.LatLng(48.56479402807606, 14.351921081542967),
            new google.maps.LatLng(48.56274917224952, 14.35312271118164),
            new google.maps.LatLng(48.56184032090034, 14.352264404296877),
            new google.maps.LatLng(48.56172671333344, 14.348487854003906),
            new google.maps.LatLng(48.55979534565516, 14.344367980957033),
            new google.maps.LatLng(48.556841346565335, 14.345226287841797),
            new google.maps.LatLng(48.55581876822905, 14.342823028564453),
            new google.maps.LatLng(48.55468254583598, 14.342823028564453),
            new google.maps.LatLng(48.5537735495488, 14.337329864501953),
            new google.maps.LatLng(48.55445529829526, 14.336643218994142),
            new google.maps.LatLng(48.5521827667489, 14.333553314208984),
            new google.maps.LatLng(48.55388717497782, 14.327030181884766),
            new google.maps.LatLng(48.55775028773465, 14.326686859130858),
            new google.maps.LatLng(48.56411241865319, 14.324111938476562),
            new google.maps.LatLng(48.56320359180008, 14.321537017822266),
            new google.maps.LatLng(48.56354440378376, 14.312610626220701),
            new google.maps.LatLng(48.566838801229046, 14.304370880126953),
            new google.maps.LatLng(48.56695239731351, 14.301109313964844),
            new google.maps.LatLng(48.5703601611967, 14.290294647216797),
            new google.maps.LatLng(48.57331337080622, 14.282913208007812),
            new google.maps.LatLng(48.57524422229134, 14.276905059814453),
            new google.maps.LatLng(48.57921927257163, 14.272441864013672),
            new google.maps.LatLng(48.58149058954227, 14.270725250244139),
            new google.maps.LatLng(48.581604152711776, 14.267120361328125),
            new google.maps.LatLng(48.58137702611765, 14.265060424804688),
            new google.maps.LatLng(48.5818312782853, 14.261112213134766),
            new google.maps.LatLng(48.58149058954227, 14.257850646972656),
            new google.maps.LatLng(48.58069564021177, 14.2547607421875),
            new google.maps.LatLng(48.58092276986765, 14.25201416015625),
            new google.maps.LatLng(48.57955997662351, 14.24875259399414),
            new google.maps.LatLng(48.57797000473492, 14.24823760986328),
            new google.maps.LatLng(48.57865142738219, 14.244976043701172),
            new google.maps.LatLng(48.577515717867044, 14.240856170654297),
            new google.maps.LatLng(48.57853785757886, 14.237937927246094),
            new google.maps.LatLng(48.58103633431287, 14.236907958984375),
            new google.maps.LatLng(48.58432959223574, 14.229698181152342),
            new google.maps.LatLng(48.58660067957588, 14.219398498535156),
            new google.maps.LatLng(48.587963282992824, 14.212703704833984),
            new google.maps.LatLng(48.58853102357315, 14.207725524902344),
            new google.maps.LatLng(48.59046129383531, 14.203605651855469),
            new google.maps.LatLng(48.59023420704329, 14.202232360839844),
            new google.maps.LatLng(48.59239149036303, 14.19382095336914),
            new google.maps.LatLng(48.592959181191695, 14.190559387207031),
            new google.maps.LatLng(48.592845643536215, 14.185752868652344),
            new google.maps.LatLng(48.59386747325061, 14.181461334228516),
            new google.maps.LatLng(48.59250502903901, 14.179401397705078),
            new google.maps.LatLng(48.59329979262728, 14.177513122558594),
            new google.maps.LatLng(48.591937333107666, 14.176483154296875),
            new google.maps.LatLng(48.591029006350475, 14.177684783935547),
            new google.maps.LatLng(48.591369630797935, 14.173736572265625),
            new google.maps.LatLng(48.59034775056686, 14.172019958496094),
            new google.maps.LatLng(48.59023420704329, 14.166526794433594),
            new google.maps.LatLng(48.58932584966972, 14.164810180664062),
            new google.maps.LatLng(48.59046129383531, 14.162406921386719),
            new google.maps.LatLng(48.591823793155974, 14.162921905517578),
            new google.maps.LatLng(48.59273210562563, 14.162235260009766),
            new google.maps.LatLng(48.59227795143187, 14.159317016601562),
            new google.maps.LatLng(48.59364040176667, 14.156742095947266),
            new google.maps.LatLng(48.59398100860989, 14.155540466308594),
            new google.maps.LatLng(48.595456945063326, 14.155197143554688),
            new google.maps.LatLng(48.59602460144916, 14.152450561523438),
            new google.maps.LatLng(48.59477574898104, 14.150218963623047),
            new google.maps.LatLng(48.594662215407716, 14.146785736083984),
            new google.maps.LatLng(48.594662215407716, 14.143180847167969),
            new google.maps.LatLng(48.59386747325061, 14.142837524414062),
            new google.maps.LatLng(48.59432161315689, 14.140605926513672),
            new google.maps.LatLng(48.59488928229926, 14.138717651367188),
            new google.maps.LatLng(48.59602460144916, 14.135627746582031),
            new google.maps.LatLng(48.59738695075181, 14.132022857666016),
            new google.maps.LatLng(48.59738695075181, 14.129447937011717),
            new google.maps.LatLng(48.595343413020785, 14.128246307373047),
            new google.maps.LatLng(48.594208078563014, 14.12515640258789),
            new google.maps.LatLng(48.59307271859202, 14.123268127441406),
            new google.maps.LatLng(48.59307271859202, 14.120349884033203),
            new google.maps.LatLng(48.590915464357714, 14.118804931640625),
            new google.maps.LatLng(48.5894393952344, 14.115715026855467),
            new google.maps.LatLng(48.58955294054395, 14.108333587646484),
            new google.maps.LatLng(48.590007119230734, 14.10369873046875),
            new google.maps.LatLng(48.59216441224562, 14.095802307128906),
            new google.maps.LatLng(48.59488928229926, 14.09494400024414),
            new google.maps.LatLng(48.59636519221907, 14.097518920898438),
            new google.maps.LatLng(48.59965745128183, 14.097347259521484),
            new google.maps.LatLng(48.599770973629504, 14.094600677490234),
            new google.maps.LatLng(48.59897631183817, 14.093399047851562),
            new google.maps.LatLng(48.59999801755946, 14.085845947265625),
            new google.maps.LatLng(48.59954392867905, 14.0789794921875),
            new google.maps.LatLng(48.599770973629504, 14.071598052978516),
            new google.maps.LatLng(48.596251662217554, 14.069538116455078),
            new google.maps.LatLng(48.59477574898104, 14.067134857177734),
            new google.maps.LatLng(48.5979545854516, 14.066276550292969),
            new google.maps.LatLng(48.60170081450566, 14.066104888916014),
            new google.maps.LatLng(48.604538681854244, 14.068679809570312),
            new google.maps.LatLng(48.60624132572704, 14.069709777832031),
            new google.maps.LatLng(48.60703587322351, 14.06850814819336),
            new google.maps.LatLng(48.60590080154464, 14.06747817993164),
            new google.maps.LatLng(48.60658184761339, 14.064044952392576),
            new google.maps.LatLng(48.60635483327761, 14.060440063476562),
            new google.maps.LatLng(48.60521974629159, 14.058895111083984),
            new google.maps.LatLng(48.6046521932316, 14.056663513183594),
            new google.maps.LatLng(48.60397112114062, 14.054260253906248),
            new google.maps.LatLng(48.60669535439859, 14.052371978759764),
            new google.maps.LatLng(48.60771690398517, 14.050827026367188),
            new google.maps.LatLng(48.60964644126787, 14.051856994628906),
            new google.maps.LatLng(48.612710848943564, 14.042243957519531),
            new google.maps.LatLng(48.613845767553634, 14.043445587158203),
            new google.maps.LatLng(48.614867172490726, 14.042243957519531),
            new google.maps.LatLng(48.616229013596495, 14.04275894165039),
            new google.maps.LatLng(48.616909920373566, 14.040870666503906),
            new google.maps.LatLng(48.61759081796677, 14.04052734375),
            new google.maps.LatLng(48.61906606457987, 14.045333862304688),
            new google.maps.LatLng(48.62247031529897, 14.046363830566406),
            new google.maps.LatLng(48.623945419309806, 14.045848846435547),
            new google.maps.LatLng(48.62712241998372, 14.047908782958984),
            new google.maps.LatLng(48.62859738802785, 14.044990539550781),
            new google.maps.LatLng(48.62916467195022, 14.041557312011719),
            new google.maps.LatLng(48.62814355629829, 14.038639068603516),
            new google.maps.LatLng(48.62768972048721, 14.033145904541016),
            new google.maps.LatLng(48.62632818856487, 14.029197692871094),
            new google.maps.LatLng(48.628824302362084, 14.03005599975586),
            new google.maps.LatLng(48.629278127969414, 14.02730941772461),
            new google.maps.LatLng(48.632341344063015, 14.023189544677733),
            new google.maps.LatLng(48.63426994027393, 14.019756317138672),
            new google.maps.LatLng(48.63710597725179, 14.018211364746092),
            new google.maps.LatLng(48.637446290975596, 14.015636444091797),
            new google.maps.LatLng(48.6396015579139, 14.01031494140625),
            new google.maps.LatLng(48.64039558041559, 14.013919830322266),
            new google.maps.LatLng(48.64357154543355, 14.017353057861326),
            new google.maps.LatLng(48.6450460326424, 14.02130126953125),
            new google.maps.LatLng(48.647427805533546, 14.024047851562498),
            new google.maps.LatLng(48.652531225805426, 14.024391174316406),
            new google.maps.LatLng(48.652644629278235, 14.027137756347656),
            new google.maps.LatLng(48.65423225111565, 14.032802581787108),
            new google.maps.LatLng(48.65423225111565, 14.03675079345703),
            new google.maps.LatLng(48.65468584817256, 14.041900634765625),
            new google.maps.LatLng(48.65389205064476, 14.047050476074219),
            new google.maps.LatLng(48.652531225805426, 14.051856994628906),
            new google.maps.LatLng(48.65468584817256, 14.05477523803711),
            new google.maps.LatLng(48.65752073731804, 14.05752182006836),
            new google.maps.LatLng(48.65967514645313, 14.058551788330078),
            new google.maps.LatLng(48.661489314308504, 14.057178497314451),
            new google.maps.LatLng(48.66500407872037, 14.060440063476562),
            new google.maps.LatLng(48.667498278962256, 14.059066772460938),
            new google.maps.LatLng(48.6705591741806, 14.059410095214844),
            new google.maps.LatLng(48.672146231836294, 14.058723449707031),
            new google.maps.LatLng(48.673506527182866, 14.05975341796875),
            new google.maps.LatLng(48.675093492002866, 14.056320190429686),
            new google.maps.LatLng(48.675886955667366, 14.053401947021483),
            new google.maps.LatLng(48.675093492002866, 14.050827026367188),
            new google.maps.LatLng(48.675886955667366, 14.048080444335938),
            new google.maps.LatLng(48.67747384550559, 14.04327392578125),
            new google.maps.LatLng(48.67600030659927, 14.038810729980467),
            new google.maps.LatLng(48.67747384550559, 14.03726577758789),
            new google.maps.LatLng(48.67702045350972, 14.034175872802734),
            new google.maps.LatLng(48.679740744276046, 14.033317565917969),
            new google.maps.LatLng(48.68393423806758, 14.023704528808594),
            new google.maps.LatLng(48.68472756248302, 14.025764465332031),
            new google.maps.LatLng(48.685180885109745, 14.029541015625),
            new google.maps.LatLng(48.68597418988793, 14.027137756347656),
            new google.maps.LatLng(48.68744743703667, 14.024906158447266),
            new google.maps.LatLng(48.68869399711442, 14.025421142578125),
            new google.maps.LatLng(48.690280483493154, 14.020099639892578),
            new google.maps.LatLng(48.691753604659716, 14.016151428222656),
            new google.maps.LatLng(48.694246480758544, 14.01803970336914),
            new google.maps.LatLng(48.6962860148509, 14.01803970336914),
            new google.maps.LatLng(48.69685253743531, 14.016494750976562),
            new google.maps.LatLng(48.69753235612112, 14.015121459960938),
            new google.maps.LatLng(48.69594609824006, 14.013748168945312),
            new google.maps.LatLng(48.69469971769733, 14.012718200683594),
            new google.maps.LatLng(48.69583279219307, 14.010143280029297),
            new google.maps.LatLng(48.6977589603096, 14.012889862060547),
            new google.maps.LatLng(48.69866536686295, 14.01357650756836),
            new google.maps.LatLng(48.70013824270284, 14.01151657104492),
            new google.maps.LatLng(48.69934516106739, 14.010658264160156),
            new google.maps.LatLng(48.70365031117296, 14.007911682128906),
            new google.maps.LatLng(48.70455661164196, 14.010143280029297),
            new google.maps.LatLng(48.7065957280258, 14.006710052490234),
            new google.maps.LatLng(48.705916031744714, 14.005165100097656),
            new google.maps.LatLng(48.70795509304759, 14.00430679321289),
            new google.maps.LatLng(48.710107345900575, 13.98782730102539),
            new google.maps.LatLng(48.71090025795713, 13.982677459716797),
            new google.maps.LatLng(48.709767522622755, 13.979415893554688),
            new google.maps.LatLng(48.711579886917804, 13.976497650146484),
            new google.maps.LatLng(48.711806427864694, 13.973579406738281),
            new google.maps.LatLng(48.7130523848403, 13.970489501953123),
            new google.maps.LatLng(48.71282584950335, 13.967914581298828),
            new google.maps.LatLng(48.71361871872025, 13.961906433105469),
            new google.maps.LatLng(48.714298310961325, 13.956241607666016),
            new google.maps.LatLng(48.71814916026477, 13.955726623535156),
            new google.maps.LatLng(48.720867229358085, 13.953495025634766),
            new google.maps.LatLng(48.721206977667705, 13.948516845703125),
            new google.maps.LatLng(48.72245270183567, 13.944568634033203),
            new google.maps.LatLng(48.721093728486146, 13.94216537475586),
            new google.maps.LatLng(48.72369839515037, 13.938388824462889),
            new google.maps.LatLng(48.7274352899766, 13.934440612792967),
            new google.maps.LatLng(48.73128513361787, 13.928260803222656),
            new google.maps.LatLng(48.73343638844867, 13.926029205322266),
            new google.maps.LatLng(48.735587551234275, 13.926029205322266),
            new google.maps.LatLng(48.737059346422065, 13.921222686767578),
            new google.maps.LatLng(48.740682043307494, 13.919677734375),
            new google.maps.LatLng(48.7429460962791, 13.915214538574219),
            new google.maps.LatLng(48.74736070624104, 13.910408020019531),
            new google.maps.LatLng(48.74973764328965, 13.905601501464844),
            new google.maps.LatLng(48.75517022005627, 13.898906707763672),
            new google.maps.LatLng(48.758565282245854, 13.888778686523438),
            new google.maps.LatLng(48.766599348667675, 13.875389099121094),
            new google.maps.LatLng(48.76954107968578, 13.868522644042969),
            new google.maps.LatLng(48.76976735954908, 13.862342834472654),
            new google.maps.LatLng(48.77146442602032, 13.85702133178711),
            new google.maps.LatLng(48.77021991621653, 13.852901458740234),
            new google.maps.LatLng(48.769993638392656, 13.847408294677734),
            new google.maps.LatLng(48.77270890497777, 13.843116760253906),
            new google.maps.LatLng(48.771690697216016, 13.839340209960938),
            new google.maps.LatLng(48.77078560631491, 13.835048675537108),
            new google.maps.LatLng(48.771011880569766, 13.830413818359375),
            new google.maps.LatLng(48.77225637074404, 13.827152252197266),
            new google.maps.LatLng(48.7721432365483, 13.822345733642576),
            new google.maps.LatLng(48.773387698680565, 13.817024230957031),
            new google.maps.LatLng(48.77384022271721, 13.812904357910156),
            new google.maps.LatLng(48.78040136289702, 13.805694580078125),
            new google.maps.LatLng(48.780740708891486, 13.803806304931639),
            new google.maps.LatLng(48.78322917608198, 13.807239532470703),
            new google.maps.LatLng(48.785038892908254, 13.808612823486328),
            new google.maps.LatLng(48.79001527769792, 13.810501098632812),
            new google.maps.LatLng(48.79318181107216, 13.81204605102539),
            new google.maps.LatLng(48.794425751649555, 13.813591003417967),
            new google.maps.LatLng(48.796687382771, 13.814964294433594),
            new google.maps.LatLng(48.8032455364465, 13.808269500732422),
            new google.maps.LatLng(48.808446221040896, 13.803119659423828),
            new google.maps.LatLng(48.815115874821835, 13.795223236083984),
            new google.maps.LatLng(48.81703747481906, 13.798141479492188),
            new google.maps.LatLng(48.82212370749906, 13.794364929199219),
            new google.maps.LatLng(48.82359296752074, 13.792133331298826),
            new google.maps.LatLng(48.82449710612528, 13.789386749267578),
            new google.maps.LatLng(48.8254012284184, 13.788013458251953),
            new google.maps.LatLng(48.82709641375401, 13.790245056152342),
            new google.maps.LatLng(48.828113497430216, 13.791790008544922),
            new google.maps.LatLng(48.82992159521573, 13.79281997680664),
            new google.maps.LatLng(48.830938621548405, 13.789558410644531),
            new google.maps.LatLng(48.83105162319997, 13.787326812744139),
            new google.maps.LatLng(48.830938621548405, 13.78458023071289),
            new google.maps.LatLng(48.83161662763493, 13.783721923828125),
            new google.maps.LatLng(48.83105162319997, 13.780632019042969),
            new google.maps.LatLng(48.832181625698475, 13.778743743896484),
            new google.maps.LatLng(48.83116462459668, 13.777027130126953),
            new google.maps.LatLng(48.83127762573854, 13.774967193603516),
            new google.maps.LatLng(48.83082561964199, 13.772048950195312),
            new google.maps.LatLng(48.83127762573854, 13.768787384033201),
            new google.maps.LatLng(48.83353759505566, 13.766899108886717),
            new google.maps.LatLng(48.83432856023283, 13.764152526855469),
            new google.maps.LatLng(48.83591045312373, 13.764324188232422),
            new google.maps.LatLng(48.83647540276501, 13.765182495117188),
            new google.maps.LatLng(48.83794424201477, 13.76535415649414),
            new google.maps.LatLng(48.83930005540253, 13.76260757446289),
            new google.maps.LatLng(48.8412207282153, 13.762950897216795),
            new google.maps.LatLng(48.84393214092012, 13.7603759765625),
            new google.maps.LatLng(48.84754712952161, 13.757972717285156),
            new google.maps.LatLng(48.85511516674166, 13.755054473876953),
            new google.maps.LatLng(48.860197534643945, 13.74887466430664),
            new google.maps.LatLng(48.863472564977805, 13.750247955322264),
            new google.maps.LatLng(48.86663445988588, 13.750934600830078),
            new google.maps.LatLng(48.869005749964536, 13.748188018798828),
            new google.maps.LatLng(48.8712640169951, 13.746986389160156),
            new google.maps.LatLng(48.87307055723444, 13.745098114013672),
            new google.maps.LatLng(48.87578024528625, 13.743381500244139),
            new google.maps.LatLng(48.87702213659352, 13.74063491821289),
            new google.maps.LatLng(48.87860268093964, 13.738574981689451),
            new google.maps.LatLng(48.8809734038198, 13.736515045166016),
            new google.maps.LatLng(48.88356978090396, 13.736858367919922),
            new google.maps.LatLng(48.88594026835275, 13.738059997558594),
            new google.maps.LatLng(48.88571451248439, 13.73617172241211),
            new google.maps.LatLng(48.88673040586604, 13.732051849365234),
            new google.maps.LatLng(48.886617529842795, 13.729476928710938),
            new google.maps.LatLng(48.88356978090396, 13.727245330810547),
            new google.maps.LatLng(48.88131206934425, 13.72467041015625),
            new google.maps.LatLng(48.88007028454358, 13.721752166748047),
            new google.maps.LatLng(48.87860268093964, 13.717803955078125),
            new google.maps.LatLng(48.87894136251639, 13.714027404785156),
            new google.maps.LatLng(48.87984450217651, 13.709907531738281),
            new google.maps.LatLng(48.88187650678903, 13.70269775390625),
            new google.maps.LatLng(48.88131206934425, 13.700809478759766),
            new google.maps.LatLng(48.88063473600221, 13.698062896728516),
            new google.maps.LatLng(48.88074762552955, 13.695487976074219),
            new google.maps.LatLng(48.87928004179994, 13.694286346435547),
            new google.maps.LatLng(48.87905425586569, 13.691024780273438),
            new google.maps.LatLng(48.87826399706969, 13.68844985961914),
            new google.maps.LatLng(48.87894136251639, 13.686046600341797),
            new google.maps.LatLng(48.87995739348743, 13.682956695556639),
            new google.maps.LatLng(48.87871557505334, 13.681068420410154),
            new google.maps.LatLng(48.87894136251639, 13.676261901855467),
            new google.maps.LatLng(48.87995739348743, 13.671283721923826),
            new google.maps.LatLng(48.88356978090396, 13.669395446777342),
            new google.maps.LatLng(48.88594026835275, 13.669395446777342),
            new google.maps.LatLng(48.88763340487954, 13.667850494384766),
            new google.maps.LatLng(48.89079377301335, 13.669910430908203),
            new google.maps.LatLng(48.894292519017405, 13.663902282714844),
            new google.maps.LatLng(48.894518236158234, 13.660297393798828),
            new google.maps.LatLng(48.8936153614802, 13.655147552490234),
            new google.maps.LatLng(48.89982229558958, 13.651714324951172),
            new google.maps.LatLng(48.91685918861334, 13.641242980957031),
            new google.maps.LatLng(48.916407955088566, 13.639698028564453),
            new google.maps.LatLng(48.919453702279995, 13.637466430664062),
            new google.maps.LatLng(48.924529534904444, 13.637294769287108),
            new google.maps.LatLng(48.924529534904444, 13.637294769287108),
            new google.maps.LatLng(48.92565742765472, 13.637981414794922),
            new google.maps.LatLng(48.92734921901588, 13.635406494140625),
            new google.maps.LatLng(48.930507076203064, 13.632831573486328),
            new google.maps.LatLng(48.930507076203064, 13.630599975585938),
            new google.maps.LatLng(48.93840084542962, 13.622188568115234),
            new google.maps.LatLng(48.942347261978476, 13.624076843261719),
            new google.maps.LatLng(48.94685707023662, 13.630943298339844),
            new google.maps.LatLng(48.94787172092932, 13.630256652832031),
            new google.maps.LatLng(48.94922455642541, 13.627853393554688),
            new google.maps.LatLng(48.94899908638986, 13.62527847290039),
            new google.maps.LatLng(48.948886350990044, 13.621845245361328),
            new google.maps.LatLng(48.94809719605915, 13.619441986083984),
            new google.maps.LatLng(48.947195289426645, 13.616523742675781),
            new google.maps.LatLng(48.94516593989971, 13.614807128906248),
            new google.maps.LatLng(48.943925741227844, 13.613262176513672),
            new google.maps.LatLng(48.94471496213056, 13.61000061035156),
            new google.maps.LatLng(48.94336200437002, 13.608283996582031),
            new google.maps.LatLng(48.942460012151976, 13.607769012451172),
            new google.maps.LatLng(48.94088148654309, 13.608627319335938),
            new google.maps.LatLng(48.93997944949375, 13.61000061035156),
            new google.maps.LatLng(48.93840084542962, 13.610172271728516),
            new google.maps.LatLng(48.94121974623364, 13.6065673828125),
            new google.maps.LatLng(48.942009009929606, 13.604679107666016),
            new google.maps.LatLng(48.944376726129164, 13.601760864257812),
            new google.maps.LatLng(48.94595514118904, 13.598499298095703),
            new google.maps.LatLng(48.9541846394386, 13.58957290649414),
            new google.maps.LatLng(48.95632634102366, 13.589057922363281),
            new google.maps.LatLng(48.95948236523749, 13.591632843017578),
            new google.maps.LatLng(48.96151113249982, 13.592491149902344),
            new google.maps.LatLng(48.96320170884709, 13.590774536132812),
            new google.maps.LatLng(48.96466682865992, 13.588199615478516),
            new google.maps.LatLng(48.96646999395574, 13.586997985839844),
            new google.maps.LatLng(48.96770963227473, 13.586654663085938),
            new google.maps.LatLng(48.97086493620758, 13.580131530761719),
            new google.maps.LatLng(48.97007612894399, 13.575839996337889),
            new google.maps.LatLng(48.96793501774901, 13.575153350830078),
            new google.maps.LatLng(48.966920775091985, 13.57481002807617),
            new google.maps.LatLng(48.966131905429314, 13.572235107421875),
            new google.maps.LatLng(48.96646999395574, 13.569488525390625),
            new google.maps.LatLng(48.96951268754365, 13.564682006835938),
            new google.maps.LatLng(48.97052687747987, 13.562278747558594),
            new google.maps.LatLng(48.967258858269886, 13.557300567626951),
            new google.maps.LatLng(48.967822325139224, 13.550949096679688),
            new google.maps.LatLng(48.967033469739306, 13.549060821533203),
            new google.maps.LatLng(48.967822325139224, 13.543739318847654),
            new google.maps.LatLng(48.97232983087348, 13.536701202392578),
            new google.maps.LatLng(48.97356932351078, 13.53687286376953),
            new google.maps.LatLng(48.97390736160892, 13.528289794921875),
            new google.maps.LatLng(48.97187909863756, 13.523998260498047),
            new google.maps.LatLng(48.968611168059276, 13.51593017578125),
            new google.maps.LatLng(48.96894923977609, 13.506832122802734),
            new google.maps.LatLng(48.96669538503323, 13.507862091064453),
            new google.maps.LatLng(48.965343023286664, 13.507518768310547),
            new google.maps.LatLng(48.96184925235382, 13.50563049316406),
            new google.maps.LatLng(48.95711536579783, 13.50563049316406),
            new google.maps.LatLng(48.95159193028531, 13.508033752441406),
            new google.maps.LatLng(48.94516593989971, 13.507690429687498),
            new google.maps.LatLng(48.942009009929606, 13.508548736572264),
            new google.maps.LatLng(48.94178350729008, 13.502712249755858),
            new google.maps.LatLng(48.94121974623364, 13.497390747070312),
            new google.maps.LatLng(48.94291101029878, 13.491382598876953),
            new google.maps.LatLng(48.94629336649227, 13.486404418945312),
            new google.maps.LatLng(48.94877361533547, 13.48348617553711),
            new google.maps.LatLng(48.951366470947725, 13.48348617553711),
            new google.maps.LatLng(48.95328284284176, 13.47696304321289),
            new google.maps.LatLng(48.95373374317786, 13.472671508789062),
            new google.maps.LatLng(48.958242522396795, 13.462886810302734),
            new google.maps.LatLng(48.96184925235382, 13.459625244140625),
            new google.maps.LatLng(48.963089005540155, 13.458595275878906),
            new google.maps.LatLng(48.96365251952788, 13.450698852539062),
            new google.maps.LatLng(48.96500492711942, 13.448638916015625),
            new google.maps.LatLng(48.96601920874445, 13.442630767822266),
            new google.maps.LatLng(48.969963441173306, 13.436965942382812),
            new google.maps.LatLng(48.97187909863756, 13.432674407958984),
            new google.maps.LatLng(48.97221714819654, 13.428211212158203),
            new google.maps.LatLng(48.974132719067626, 13.42529296875),
            new google.maps.LatLng(48.97694960134605, 13.424091339111328),
            new google.maps.LatLng(48.97886499037462, 13.420658111572266),
            new google.maps.LatLng(48.981906927553695, 13.412418365478516),
            new google.maps.LatLng(48.98720170865644, 13.40280532836914),
            new google.maps.LatLng(48.9947486155314, 13.401947021484375),
            new google.maps.LatLng(49.00319528956596, 13.409156799316404),
            new google.maps.LatLng(49.00724918431423, 13.408470153808594),
            new google.maps.LatLng(49.009501205463394, 13.405723571777344),
            new google.maps.LatLng(49.01265386395502, 13.401260375976562),
            new google.maps.LatLng(49.01558115380044, 13.399887084960938),
            new google.maps.LatLng(49.019971765823975, 13.401775360107422),
            new google.maps.LatLng(49.02109750139502, 13.401775360107422),
            new google.maps.LatLng(49.02222321150362, 13.405723571777344),
            new google.maps.LatLng(49.02391172892474, 13.405895233154297),
            new google.maps.LatLng(49.02560018905612, 13.403320312499998),
            new google.maps.LatLng(49.0283016061049, 13.40229034423828),
            new google.maps.LatLng(49.03122797574107, 13.401947021484375),
            new google.maps.LatLng(49.03392908725347, 13.40108871459961),
            new google.maps.LatLng(49.03584228584362, 13.399372100830076),
            new google.maps.LatLng(49.03764287612424, 13.400230407714844),
            new google.maps.LatLng(49.04045616795349, 13.392505645751953),
            new google.maps.LatLng(49.04281921011808, 13.39181900024414),
            new google.maps.LatLng(49.0441694695161, 13.396110534667969),
            new google.maps.LatLng(49.04506962208046, 13.398170471191406),
            new google.maps.LatLng(49.048220027740655, 13.39851379394531),
            new google.maps.LatLng(49.05137023380199, 13.396797180175781),
            new google.maps.LatLng(49.053057762087676, 13.39353561401367),
            new google.maps.LatLng(49.05418274912174, 13.391990661621094),
            new google.maps.LatLng(49.053170261936714, 13.389244079589844),
            new google.maps.LatLng(49.053170261936714, 13.385982513427734),
            new google.maps.LatLng(49.056207661628285, 13.38460922241211),
            new google.maps.LatLng(49.05755755747481, 13.382720947265625),
            new google.maps.LatLng(49.0571075962659, 13.379287719726562),
            new google.maps.LatLng(49.05834497978915, 13.376197814941406),
            new google.maps.LatLng(49.06093213670721, 13.374652862548828),
            new google.maps.LatLng(49.06250686193987, 13.374309539794922),
            new google.maps.LatLng(49.06464390923302, 13.372421264648438),
            new google.maps.LatLng(49.06610604653569, 13.371734619140625),
            new google.maps.LatLng(49.06779307457958, 13.36984634399414),
            new google.maps.LatLng(49.06801800732449, 13.36812973022461),
            new google.maps.LatLng(49.06948004534622, 13.366413116455078),
            new google.maps.LatLng(49.06903019207554, 13.363838195800781),
            new google.maps.LatLng(49.07195416553013, 13.361778259277344),
            new google.maps.LatLng(49.07364099501492, 13.357315063476562),
            new google.maps.LatLng(49.07600246007082, 13.355255126953125),
            new google.maps.LatLng(49.078813581625376, 13.354225158691406),
            new google.maps.LatLng(49.081849414209195, 13.34684371948242),
            new google.maps.LatLng(49.08387319950642, 13.34512710571289),
            new google.maps.LatLng(49.08623417811704, 13.346500396728516),
            new google.maps.LatLng(49.0890447205776, 13.343753814697266),
            new google.maps.LatLng(49.09028130886149, 13.34014892578125),
            new google.maps.LatLng(49.09297921275748, 13.337059020996092),
            new google.maps.LatLng(49.094890139312106, 13.333454132080078),
            new google.maps.LatLng(49.09635138645559, 13.328132629394531),
            new google.maps.LatLng(49.099610936614, 13.325042724609375),
            new google.maps.LatLng(49.10152160787703, 13.321609497070312),
            new google.maps.LatLng(49.10388174729461, 13.317317962646484),
            new google.maps.LatLng(49.104556052226336, 13.311309814453125),
            new google.maps.LatLng(49.11837728414777, 13.288993835449219),
            new google.maps.LatLng(49.12039958048527, 13.282470703124998),
            new google.maps.LatLng(49.12039958048527, 13.276119232177734),
            new google.maps.LatLng(49.11871433926359, 13.264789581298828),
            new google.maps.LatLng(49.11837728414777, 13.260326385498047),
            new google.maps.LatLng(49.11759081330329, 13.253974914550781),
            new google.maps.LatLng(49.11365827202097, 13.237152099609375),
            new google.maps.LatLng(49.11444480521893, 13.233203887939453),
            new google.maps.LatLng(49.11983783977385, 13.216209411621092),
            new google.maps.LatLng(49.122084764444836, 13.205223083496094),
            new google.maps.LatLng(49.12567963217808, 13.199386596679688),
            new google.maps.LatLng(49.1314084139986, 13.189773559570312),
            new google.maps.LatLng(49.13455334608644, 13.182220458984375),
            new google.maps.LatLng(49.14421153290871, 13.16986083984375),
            new google.maps.LatLng(49.15285738233554, 13.172950744628906),
            new google.maps.LatLng(49.15656228453343, 13.17432403564453),
            new google.maps.LatLng(49.16273650575962, 13.176727294921875),
            new google.maps.LatLng(49.16711412350537, 13.175697326660156),
            new google.maps.LatLng(49.170705725947265, 13.173809051513672),
            new google.maps.LatLng(49.174072616613564, 13.170375823974608),
            new google.maps.LatLng(49.174072616613564, 13.166427612304688),
            new google.maps.LatLng(49.174970415451256, 13.161277770996094),
            new google.maps.LatLng(49.17844923214641, 13.157329559326172),
            new google.maps.LatLng(49.18192780434099, 13.148918151855467),
            new google.maps.LatLng(49.18506953036687, 13.146686553955078),
            new google.maps.LatLng(49.18776227963434, 13.142738342285156),
            new google.maps.LatLng(49.19000612541631, 13.141193389892576),
            new google.maps.LatLng(49.19079144739839, 13.137245178222654),
            new google.maps.LatLng(49.19449351169183, 13.13192367553711),
            new google.maps.LatLng(49.19707357448532, 13.129520416259764),
            new google.maps.LatLng(49.19707357448532, 13.123512268066406),
            new google.maps.LatLng(49.19841964077981, 13.122482299804688),
            new google.maps.LatLng(49.199429166460156, 13.11716079711914),
            new google.maps.LatLng(49.2023454582315, 13.110637664794922),
            new google.maps.LatLng(49.20447648577327, 13.109607696533203),
            new google.maps.LatLng(49.208289674275754, 13.110980987548826),
            new google.maps.LatLng(49.21131758507162, 13.113727569580078),
            new google.maps.LatLng(49.21344822594888, 13.114070892333984),
            new google.maps.LatLng(49.21591516908271, 13.114757537841797),
            new google.maps.LatLng(49.218718364108305, 13.113727569580078),
            new google.maps.LatLng(49.21972747539876, 13.110980987548826),
            new google.maps.LatLng(49.2205123254911, 13.108234405517578),
            new google.maps.LatLng(49.22297891606676, 13.10394287109375),
            new google.maps.LatLng(49.22432427721752, 13.097763061523438),
            new google.maps.LatLng(49.22555749276215, 13.093814849853516),
            new google.maps.LatLng(49.22768751984635, 13.088665008544922),
            new google.maps.LatLng(49.22981745510715, 13.086261749267578),
            new google.maps.LatLng(49.23093843678383, 13.087635040283201),
            new google.maps.LatLng(49.23284404725998, 13.088665008544922),
            new google.maps.LatLng(49.23497376021566, 13.089179992675781),
            new google.maps.LatLng(49.23710338135142, 13.088150024414062),
            new google.maps.LatLng(49.23945706630773, 13.087120056152344),
            new google.maps.LatLng(49.24259513843715, 13.084888458251953),
            new google.maps.LatLng(49.24752599176914, 13.080253601074219),
            new google.maps.LatLng(49.24718981286537, 13.077850341796873),
            new google.maps.LatLng(49.24707775272211, 13.074417114257812),
            new google.maps.LatLng(49.24640538652154, 13.073043823242186),
            new google.maps.LatLng(49.24685363167258, 13.069953918457031),
            new google.maps.LatLng(49.248086284855496, 13.068065643310545),
            new google.maps.LatLng(49.249991233789146, 13.067378997802734),
            new google.maps.LatLng(49.24976712596486, 13.062400817871094),
            new google.maps.LatLng(49.2513358593714, 13.059139251708984),
            new google.maps.LatLng(49.2540250006668, 13.057422637939451),
            new google.maps.LatLng(49.25705010952243, 13.05673599243164),
            new google.maps.LatLng(49.26029909400806, 13.05776596069336),
            new google.maps.LatLng(49.26343584160231, 13.055877685546875),
            new google.maps.LatLng(49.26421999734763, 13.054161071777344),
            new google.maps.LatLng(49.26489212092552, 13.050556182861326),
            new google.maps.LatLng(49.26365988737252, 13.047466278076172),
            new google.maps.LatLng(49.26433201857972, 13.043346405029297),
            new google.maps.LatLng(49.26500414063174, 13.042488098144531),
            new google.maps.LatLng(49.26433201857972, 13.039569854736328),
            new google.maps.LatLng(49.26489212092552, 13.036651611328125),
            new google.maps.LatLng(49.26399595412051, 13.03476333618164),
            new google.maps.LatLng(49.26646037367071, 13.032188415527344),
            new google.maps.LatLng(49.27889261335716, 13.025150299072264),
            new google.maps.LatLng(49.28773887548269, 13.030471801757812),
            new google.maps.LatLng(49.29154563906309, 13.030471801757812),
            new google.maps.LatLng(49.304195417949884, 13.02927017211914),
            new google.maps.LatLng(49.30486699685377, 13.021888732910156),
            new google.maps.LatLng(49.30520278287325, 13.01450729370117),
            new google.maps.LatLng(49.30632205307832, 13.006954193115234),
            new google.maps.LatLng(49.306993602997146, 13.007469177246094),
            new google.maps.LatLng(49.30721745093609, 13.005237579345703),
            new google.maps.LatLng(49.31169419614404, 13.00455093383789),
            new google.maps.LatLng(49.31359668967443, 13.001976013183594),
            new google.maps.LatLng(49.31505148809065, 12.998542785644531),
            new google.maps.LatLng(49.31717765464028, 12.994422912597656),
            new google.maps.LatLng(49.319191833025634, 12.991161346435545),
            new google.maps.LatLng(49.32310805519368, 12.988243103027342),
            new google.maps.LatLng(49.32433880355428, 12.988243103027342),
            new google.maps.LatLng(49.33015647028902, 12.976398468017578),
            new google.maps.LatLng(49.333512503788164, 12.973308563232422),
            new google.maps.LatLng(49.335861591104106, 12.966270446777344),
            new google.maps.LatLng(49.33720387637876, 12.964038848876953),
            new google.maps.LatLng(49.33675645202128, 12.958717346191406),
            new google.maps.LatLng(49.34257265141462, 12.950305938720703),
            new google.maps.LatLng(49.3441384338078, 12.942924499511719),
            new google.maps.LatLng(49.342684494666464, 12.940177917480469),
            new google.maps.LatLng(49.342684494666464, 12.936744689941406),
            new google.maps.LatLng(49.343355548839206, 12.933483123779297),
            new google.maps.LatLng(49.344921306320444, 12.928504943847656),
            new google.maps.LatLng(49.344250273500776, 12.924556732177734),
            new google.maps.LatLng(49.34369107249382, 12.91940689086914),
            new google.maps.LatLng(49.34503314423402, 12.913398742675781),
            new google.maps.LatLng(49.34928279658785, 12.904644012451172),
            new google.maps.LatLng(49.34950645233331, 12.900524139404295),
            new google.maps.LatLng(49.34883548204658, 12.896232604980469),
            new google.maps.LatLng(49.350401065147345, 12.892112731933594),
            new google.maps.LatLng(49.3508483654537, 12.888336181640625),
            new google.maps.LatLng(49.350624715808905, 12.880439758300781),
            new google.maps.LatLng(49.34849999347158, 12.880268096923828),
            new google.maps.LatLng(49.34592783839135, 12.880439758300781),
            new google.maps.LatLng(49.3441384338078, 12.881126403808594),
            new google.maps.LatLng(49.342684494666464, 12.882328033447266),
            new google.maps.LatLng(49.34134235886687, 12.884044647216797),
            new google.maps.LatLng(49.34000018646153, 12.885074615478516),
            new google.maps.LatLng(49.337651296668845, 12.886619567871094),
            new google.maps.LatLng(49.335526014065636, 12.88747787475586),
            new google.maps.LatLng(49.333176910734124, 12.888851165771483),
            new google.maps.LatLng(49.332617583893, 12.886791229248045),
            new google.maps.LatLng(49.332841315392095, 12.88421630859375),
            new google.maps.LatLng(49.332841315392095, 12.87923812866211),
            new google.maps.LatLng(49.332505717762125, 12.877349853515625),
            new google.maps.LatLng(49.33932908653162, 12.857093811035156),
            new google.maps.LatLng(49.33832241947765, 12.85400390625),
            new google.maps.LatLng(49.33888168149418, 12.852115631103516),
            new google.maps.LatLng(49.34044758133061, 12.850742340087889),
            new google.maps.LatLng(49.3441384338078, 12.84799575805664),
            new google.maps.LatLng(49.345144981893405, 12.84353256225586),
            new google.maps.LatLng(49.34223712013387, 12.842845916748047),
            new google.maps.LatLng(49.34223712013387, 12.839584350585938),
            new google.maps.LatLng(49.340671277239935, 12.837181091308592),
            new google.maps.LatLng(49.34134235886687, 12.821216583251953),
            new google.maps.LatLng(49.34111866600805, 12.812461853027344),
            new google.maps.LatLng(49.34178974153402, 12.807483673095703),
            new google.maps.LatLng(49.34134235886687, 12.802848815917969),
            new google.maps.LatLng(49.34536865644953, 12.785682678222656),
            new google.maps.LatLng(49.34816450260881, 12.778987884521484),
            new google.maps.LatLng(49.35487388519263, 12.778987884521484),
            new google.maps.LatLng(49.35889907550381, 12.781906127929688),
            new google.maps.LatLng(49.3611351500006, 12.78053283691406),
            new google.maps.LatLng(49.36415368929453, 12.777099609375),
            new google.maps.LatLng(49.365495202836854, 12.768688201904297),
            new google.maps.LatLng(49.37510831215134, 12.758216857910154),
            new google.maps.LatLng(49.38259629228457, 12.7606201171875),
            new google.maps.LatLng(49.39477579232409, 12.757701873779297),
            new google.maps.LatLng(49.409967998897194, 12.732467651367188),
            new google.maps.LatLng(49.41421204003223, 12.714614868164062),
            new google.maps.LatLng(49.41599889494601, 12.714786529541016),
            new google.maps.LatLng(49.41711564623349, 12.714614868164062),
            new google.maps.LatLng(49.419907413282516, 12.713584899902344),
            new google.maps.LatLng(49.42493219376638, 12.708263397216797),
            new google.maps.LatLng(49.42627204832863, 12.68148422241211),
            new google.maps.LatLng(49.42604874177584, 12.679080963134766),
            new google.maps.LatLng(49.43486857780772, 12.65625),
            new google.maps.LatLng(49.440115069698244, 12.657794952392576),
            new google.maps.LatLng(49.443910054400504, 12.657279968261719),
            new google.maps.LatLng(49.44580743661371, 12.657108306884766),
            new google.maps.LatLng(49.44915557905232, 12.655563354492188),
            new google.maps.LatLng(49.45038317398936, 12.657623291015625),
            new google.maps.LatLng(49.468124067331644, 12.64852523803711),
            new google.maps.LatLng(49.469128076787385, 12.645263671875),
            new google.maps.LatLng(49.469574296607334, 12.641830444335938),
            new google.maps.LatLng(49.47091293168036, 12.640457153320312),
            new google.maps.LatLng(49.47236307839658, 12.639255523681639),
            new google.maps.LatLng(49.475486325513145, 12.637367248535154),
            new google.maps.LatLng(49.47637864525285, 12.63376235961914),
            new google.maps.LatLng(49.48005929233506, 12.635307312011719),
            new google.maps.LatLng(49.48162069540456, 12.637882232666016),
            new google.maps.LatLng(49.4828474771752, 12.638568878173828),
            new google.maps.LatLng(49.483628140481024, 12.641315460205076),
            new google.maps.LatLng(49.483628140481024, 12.643718719482422),
            new google.maps.LatLng(49.487865809820754, 12.644062042236328),
            new google.maps.LatLng(49.48976149051455, 12.643547058105469),
            new google.maps.LatLng(49.49310663031507, 12.644062042236328),
            new google.maps.LatLng(49.4951136044683, 12.64303207397461),
            new google.maps.LatLng(49.49856986704614, 12.640285491943358),
            new google.maps.LatLng(49.50091106753317, 12.639427185058594),
            new google.maps.LatLng(49.502360325989315, 12.640972137451172),
            new google.maps.LatLng(49.50458987056871, 12.640457153320312),
            new google.maps.LatLng(49.5067078438191, 12.642173767089842),
            new google.maps.LatLng(49.50982890043921, 12.642860412597656),
            new google.maps.LatLng(49.51250393334809, 12.643547058105469),
            new google.maps.LatLng(49.51573606960395, 12.64251708984375),
            new google.maps.LatLng(49.518856550220974, 12.642173767089842),
            new google.maps.LatLng(49.52075103059815, 12.643890380859375),
            new google.maps.LatLng(49.52309116973476, 12.644062042236328),
            new google.maps.LatLng(49.52498548605587, 12.642345428466797),
            new google.maps.LatLng(49.527659690035414, 12.640972137451172),
            new google.maps.LatLng(49.52921957480632, 12.640113830566406),
            new google.maps.LatLng(49.53189354718573, 12.63702392578125),
            new google.maps.LatLng(49.532116371614805, 12.63427734375),
            new google.maps.LatLng(49.531670721740866, 12.631702423095703),
            new google.maps.LatLng(49.529442411424725, 12.62929916381836),
            new google.maps.LatLng(49.52721399953014, 12.6287841796875),
            new google.maps.LatLng(49.52732542253738, 12.625694274902342),
            new google.maps.LatLng(49.526545456153805, 12.621402740478516),
            new google.maps.LatLng(49.527659690035414, 12.62002944946289),
            new google.maps.LatLng(49.52921957480632, 12.619171142578125),
            new google.maps.LatLng(49.52855105885639, 12.614364624023438),
            new google.maps.LatLng(49.53055657928003, 12.611446380615234),
            new google.maps.LatLng(49.53311906897554, 12.60028839111328),
            new google.maps.LatLng(49.5355700203748, 12.595138549804688),
            new google.maps.LatLng(49.53835504323125, 12.588787078857422),
            new google.maps.LatLng(49.5416968611641, 12.594966888427734),
            new google.maps.LatLng(49.54269936197924, 12.592735290527344),
            new google.maps.LatLng(49.54548397854706, 12.587928771972656),
            new google.maps.LatLng(49.54715467231055, 12.587242126464844),
            new google.maps.LatLng(49.548825308941815, 12.58432388305664),
            new google.maps.LatLng(49.55328006064948, 12.580890655517576),
            new google.maps.LatLng(49.55573000091982, 12.580032348632812),
            new google.maps.LatLng(49.55817981829832, 12.575912475585936),
            new google.maps.LatLng(49.55996142647716, 12.574024200439451),
            new google.maps.LatLng(49.56408114644009, 12.5738525390625),
            new google.maps.LatLng(49.56842317769344, 12.571964263916016),
            new google.maps.LatLng(49.56953645683683, 12.570762634277344),
            new google.maps.LatLng(49.57309877948297, 12.572822570800781),
            new google.maps.LatLng(49.575325099116725, 12.573165893554688),
            new google.maps.LatLng(49.57744000870589, 12.573680877685547),
            new google.maps.LatLng(49.58000003979616, 12.574024200439451),
            new google.maps.LatLng(49.581780851780515, 12.5738525390625),
            new google.maps.LatLng(49.58389548159964, 12.57659912109375),
            new google.maps.LatLng(49.58667774962876, 12.57659912109375),
            new google.maps.LatLng(49.590683936847924, 12.572650909423828),
            new google.maps.LatLng(49.593465817737766, 12.568531036376953),
            new google.maps.LatLng(49.59936288050905, 12.563209533691404),
            new google.maps.LatLng(49.60236677040661, 12.56338119506836),
            new google.maps.LatLng(49.60748408255119, 12.563037872314453),
            new google.maps.LatLng(49.61004253720457, 12.561836242675781),
            new google.maps.LatLng(49.611711022245174, 12.558917999267578),
            new google.maps.LatLng(49.612823313876966, 12.557373046874998),
            new google.maps.LatLng(49.6153814883029, 12.557201385498047),
            new google.maps.LatLng(49.61793952845622, 12.558746337890625),
            new google.maps.LatLng(49.61949653063617, 12.560977935791016),
            new google.maps.LatLng(49.6207198545919, 12.55359649658203),
            new google.maps.LatLng(49.62105348306787, 12.54913330078125),
            new google.maps.LatLng(49.62138710925949, 12.54587173461914),
            new google.maps.LatLng(49.619607743173944, 12.54140853881836),
            new google.maps.LatLng(49.61860682119642, 12.537803649902344),
            new google.maps.LatLng(49.61771709551226, 12.536258697509766),
            new google.maps.LatLng(49.618161960384896, 12.528018951416016),
            new google.maps.LatLng(49.62049743433884, 12.528018951416016),
            new google.maps.LatLng(49.622499180067, 12.526473999023438),
            new google.maps.LatLng(49.623500022092706, 12.53110885620117),
            new google.maps.LatLng(49.62539044538229, 12.533855438232422),
            new google.maps.LatLng(49.62650242481776, 12.534198760986328),
            new google.maps.LatLng(49.626836013699155, 12.5299072265625),
            new google.maps.LatLng(49.62639122801635, 12.527847290039062),
            new google.maps.LatLng(49.627836766637756, 12.524070739746094),
            new google.maps.LatLng(49.629838210840354, 12.522869110107422),
            new google.maps.LatLng(49.631728388192045, 12.522869110107422),
            new google.maps.LatLng(49.634063211889824, 12.522869110107422),
            new google.maps.LatLng(49.63617557498318, 12.526130676269531),
            new google.maps.LatLng(49.63817667655836, 12.528877258300781),
            new google.maps.LatLng(49.639955364483036, 12.528362274169922),
            new google.maps.LatLng(49.641400500582726, 12.52664566040039),
            new google.maps.LatLng(49.642400954296164, 12.523555755615234),
            new google.maps.LatLng(49.642067472009096, 12.521495819091797),
            new google.maps.LatLng(49.643290229228526, 12.517890930175781),
            new google.maps.LatLng(49.647514063352176, 12.517547607421873),
            new google.maps.LatLng(49.64929241019308, 12.520980834960938),
            new google.maps.LatLng(49.65051498596067, 12.521324157714842),
            new google.maps.LatLng(49.651848669959186, 12.523727416992188),
            new google.maps.LatLng(49.65362685844596, 12.524757385253906),
            new google.maps.LatLng(49.654182529025206, 12.525959014892578),
            new google.maps.LatLng(49.65596063224602, 12.523212432861328),
            new google.maps.LatLng(49.65818316991676, 12.523555755615234),
            new google.maps.LatLng(49.65985000655732, 12.522525787353516),
            new google.maps.LatLng(49.66185013515958, 12.524242401123045),
            new google.maps.LatLng(49.664294625131916, 12.528190612792967),
            new google.maps.LatLng(49.66585014571395, 12.529563903808594),
            new google.maps.LatLng(49.66840553584244, 12.529563903808594),
            new google.maps.LatLng(49.669849827407766, 12.52664566040039),
            new google.maps.LatLng(49.67540439532209, 12.524242401123045),
            new google.maps.LatLng(49.67918113916683, 12.52166748046875),
            new google.maps.LatLng(49.68073618373128, 12.522869110107422),
            new google.maps.LatLng(49.682513316624345, 12.522525787353516),
            new google.maps.LatLng(49.68662268766222, 12.521324157714842),
            new google.maps.LatLng(49.68795538205336, 12.514801025390625),
            new google.maps.LatLng(49.686289508355735, 12.512226104736328),
            new google.maps.LatLng(49.68640056837828, 12.508106231689453),
            new google.maps.LatLng(49.68506783136213, 12.50518798828125),
            new google.maps.LatLng(49.686289508355735, 12.500553131103516),
            new google.maps.LatLng(49.68562314289233, 12.496604919433594),
            new google.maps.LatLng(49.68573420443722, 12.492313385009766),
            new google.maps.LatLng(49.68773326885868, 12.486305236816404),
            new google.maps.LatLng(49.68773326885868, 12.484931945800781),
            new google.maps.LatLng(49.691509055146184, 12.485103607177734),
            new google.maps.LatLng(49.693729968898126, 12.484245300292969),
            new google.maps.LatLng(49.695173508416076, 12.479610443115234),
            new google.maps.LatLng(49.697727357913095, 12.468795776367186),
            new google.maps.LatLng(49.69850458981664, 12.468624114990234),
            new google.maps.LatLng(49.69939283962715, 12.462787628173828),
            new google.maps.LatLng(49.70239056286408, 12.457294464111328),
            new google.maps.LatLng(49.701169290537514, 12.452831268310547),
            new google.maps.LatLng(49.702168515633446, 12.44922637939453),
            new google.maps.LatLng(49.7022795393756, 12.446823120117188),
            new google.maps.LatLng(49.703611804493306, 12.443389892578123),
            new google.maps.LatLng(49.70438894227455, 12.441329956054688),
            new google.maps.LatLng(49.70583216517381, 12.43978500366211),
            new google.maps.LatLng(49.708274444716686, 12.439441680908201),
            new google.maps.LatLng(49.71293663743371, 12.434978485107422),
            new google.maps.LatLng(49.71426861030238, 12.434978485107422),
            new google.maps.LatLng(49.71637749263587, 12.432403564453125),
            new google.maps.LatLng(49.71793134733492, 12.433090209960938),
            new google.maps.LatLng(49.72037301855, 12.429828643798826),
            new google.maps.LatLng(49.72481210620893, 12.42828369140625),
            new google.maps.LatLng(49.72703149783928, 12.426738739013672),
            new google.maps.LatLng(49.730804230750955, 12.425708770751953),
            new google.maps.LatLng(49.73091518904465, 12.421245574951172),
            new google.maps.LatLng(49.73191380227349, 12.41678237915039),
            new google.maps.LatLng(49.73257953301161, 12.41231918334961),
            new google.maps.LatLng(49.73612994272839, 12.412490844726562),
            new google.maps.LatLng(49.7366846707841, 12.409915924072266),
            new google.maps.LatLng(49.73879257956461, 12.408027648925781),
            new google.maps.LatLng(49.740345716916465, 12.405624389648438),
            new google.maps.LatLng(49.74567038185036, 12.403907775878906),
            new google.maps.LatLng(49.74766698054141, 12.40579605102539),
            new google.maps.LatLng(49.74866524907081, 12.405624389648438),
            new google.maps.LatLng(49.753878095395926, 12.40081787109375),
            new google.maps.LatLng(49.75576345503211, 12.400474548339842),
            new google.maps.LatLng(49.75709425299859, 12.40133285522461),
            new google.maps.LatLng(49.75920127508898, 12.40150451660156),
            new google.maps.LatLng(49.76064286903077, 12.403221130371094),
            new google.maps.LatLng(49.76197353308923, 12.403221130371094),
            new google.maps.LatLng(49.762860622172774, 12.405109405517578),
            new google.maps.LatLng(49.76330416062798, 12.407169342041016),
            new google.maps.LatLng(49.78591924154692, 12.467079162597656),
            new google.maps.LatLng(49.78691672264467, 12.468109130859375),
            new google.maps.LatLng(49.78736004098412, 12.469825744628906),
            new google.maps.LatLng(49.7860300737943, 12.471199035644531),
            new google.maps.LatLng(49.78580840904597, 12.47222900390625),
            new google.maps.LatLng(49.78669506195353, 12.472400665283203),
            new google.maps.LatLng(49.78747086993506, 12.472400665283203),
            new google.maps.LatLng(49.78913327377064, 12.474117279052734),
            new google.maps.LatLng(49.79013068868654, 12.4749755859375),
            new google.maps.LatLng(49.79212545690163, 12.474632263183592),
            new google.maps.LatLng(49.792347092743114, 12.46999740600586),
            new google.maps.LatLng(49.79334444147842, 12.468795776367186),
            new google.maps.LatLng(49.79467420784331, 12.465705871582031),
            new google.maps.LatLng(49.796336364453474, 12.465190887451172),
            new google.maps.LatLng(49.79755524304215, 12.467594146728516),
            new google.maps.LatLng(49.799549705463726, 12.47068405151367),
            new google.maps.LatLng(49.80243045059615, 12.470512390136719),
            new google.maps.LatLng(49.80564338719267, 12.466392517089844),
            new google.maps.LatLng(49.80741595059053, 12.466907501220703),
            new google.maps.LatLng(49.809299228082466, 12.465019226074219),
            new google.maps.LatLng(49.81007467398775, 12.463817596435545),
            new google.maps.LatLng(49.81273325134745, 12.465705871582031),
            new google.maps.LatLng(49.813508642235576, 12.468280792236328),
            new google.maps.LatLng(49.81472708853153, 12.473430633544922),
            new google.maps.LatLng(49.81683160533214, 12.47274398803711),
            new google.maps.LatLng(49.818493001314714, 12.474803924560547),
            new google.maps.LatLng(49.81948981152359, 12.4749755859375),
            new google.maps.LatLng(49.82214787168569, 12.47446060180664),
            new google.maps.LatLng(49.82491652907408, 12.476520538330076),
            new google.maps.LatLng(49.82945678418646, 12.473602294921873),
            new google.maps.LatLng(49.83355372176794, 12.472572326660156),
            new google.maps.LatLng(49.8374288838513, 12.476005554199219),
            new google.maps.LatLng(49.83809316617108, 12.478065490722656),
            new google.maps.LatLng(49.8393109933889, 12.478923797607422),
            new google.maps.LatLng(49.841635851085705, 12.48373031616211),
            new google.maps.LatLng(49.841635851085705, 12.48647689819336),
            new google.maps.LatLng(49.84041808242466, 12.488536834716797),
            new google.maps.LatLng(49.839200283091095, 12.491283416748047),
            new google.maps.LatLng(49.838536015981035, 12.495403289794922),
            new google.maps.LatLng(49.8374288838513, 12.497806549072266),
            new google.maps.LatLng(49.84030737466178, 12.498664855957031),
            new google.maps.LatLng(49.84196796448816, 12.498836517333984),
            new google.maps.LatLng(49.84573175693888, 12.498664855957031),
            new google.maps.LatLng(49.8482776856731, 12.498664855957031),
            new google.maps.LatLng(49.85159826076684, 12.49746322631836),
            new google.maps.LatLng(49.85668936617165, 12.49746322631836),
            new google.maps.LatLng(49.857353383857145, 12.503299713134766),
            new google.maps.LatLng(49.85801739241788, 12.508621215820312),
            new google.maps.LatLng(49.85923471774692, 12.512054443359375),
            new google.maps.LatLng(49.861779935240186, 12.514114379882812),
            new google.maps.LatLng(49.86432501865345, 12.515487670898436),
            new google.maps.LatLng(49.86764449117398, 12.517890930175781),
            new google.maps.LatLng(49.87118501043983, 12.518749237060547),
            new google.maps.LatLng(49.8767165522324, 12.5189208984375),
            new google.maps.LatLng(49.88058825449894, 12.521839141845703),
            new google.maps.LatLng(49.88169439812429, 12.521495819091797),
            new google.maps.LatLng(49.88866252021069, 12.531623840332031),
            new google.maps.LatLng(49.89098500405564, 12.535228729248047),
            new google.maps.LatLng(49.89153795992766, 12.540721893310547),
            new google.maps.LatLng(49.89386030540831, 12.542438507080078),
            new google.maps.LatLng(49.896293118905824, 12.545013427734375),
            new google.maps.LatLng(49.90060553231608, 12.549476623535156),
            new google.maps.LatLng(49.904696440039785, 12.551021575927734),
            new google.maps.LatLng(49.90900810238101, 12.55136489868164),
            new google.maps.LatLng(49.912766673044906, 12.549476623535156),
            new google.maps.LatLng(49.91685654948027, 12.547931671142578),
            new google.maps.LatLng(49.91995136053499, 12.548274993896484),
            new google.maps.LatLng(49.92260389762134, 12.544326782226562),
            new google.maps.LatLng(49.92404062760829, 12.541065216064453),
            new google.maps.LatLng(49.9253668018993, 12.531967163085938),
            new google.maps.LatLng(49.926582429615706, 12.526302337646483),
            new google.maps.LatLng(49.92779802667553, 12.52166748046875),
            new google.maps.LatLng(49.92779802667553, 12.511711120605469),
            new google.maps.LatLng(49.928903088309056, 12.506904602050781),
            new google.maps.LatLng(49.93221812119619, 12.498321533203125),
            new google.maps.LatLng(49.93310209145644, 12.492485046386719),
            new google.maps.LatLng(49.93730072876585, 12.49420166015625),
            new google.maps.LatLng(49.93630634772798, 12.491798400878906),
            new google.maps.LatLng(49.93630634772798, 12.485790252685547),
            new google.maps.LatLng(49.935643415635546, 12.478408813476562),
            new google.maps.LatLng(49.93730072876585, 12.475318908691406),
            new google.maps.LatLng(49.94260374772961, 12.472057342529297),
            new google.maps.LatLng(49.94735387323262, 12.469482421875),
            new google.maps.LatLng(49.950225814904925, 12.472057342529297),
            new google.maps.LatLng(49.952213981900044, 12.47549057006836),
            new google.maps.LatLng(49.95541696719878, 12.476863861083984),
            new google.maps.LatLng(49.95718404030751, 12.47943878173828),
            new google.maps.LatLng(49.95873017608181, 12.482872009277344),
            new google.maps.LatLng(49.95806755254373, 12.488021850585938),
            new google.maps.LatLng(49.959392790500694, 12.49094009399414),
            new google.maps.LatLng(49.962153585755566, 12.490768432617188),
            new google.maps.LatLng(49.963920411634284, 12.49214172363281),
            new google.maps.LatLng(49.96712261825979, 12.493858337402344),
            new google.maps.LatLng(49.96977255919705, 12.493000030517578),
            new google.maps.LatLng(49.97231194902327, 12.49969482421875),
            new google.maps.LatLng(49.973747197046386, 12.497806549072266),
            new google.maps.LatLng(49.97772150663492, 12.492828369140625),
            new google.maps.LatLng(49.9799293145682, 12.491283416748047),
            new google.maps.LatLng(49.98147471984122, 12.490253448486326),
            new google.maps.LatLng(49.98081240937428, 12.4859619140625),
            new google.maps.LatLng(49.98103318054305, 12.483386993408201),
            new google.maps.LatLng(49.98114356574749, 12.480468749999998),
            new google.maps.LatLng(49.98092279508529, 12.47720718383789),
            new google.maps.LatLng(49.983571976167084, 12.475147247314453),
            new google.maps.LatLng(49.98544839116778, 12.473087310791016),
            new google.maps.LatLng(49.98853879749191, 12.46896743774414),
            new google.maps.LatLng(49.990083926193925, 12.468109130859375),
            new google.maps.LatLng(49.99074610901333, 12.46999740600586),
            new google.maps.LatLng(49.99251188529114, 12.467422485351562),
            new google.maps.LatLng(49.99328439202532, 12.464675903320312),
            new google.maps.LatLng(49.99449830610663, 12.46175765991211),
            new google.maps.LatLng(49.99482936826496, 12.459354400634766),
            new google.maps.LatLng(49.99405688634991, 12.455921173095703),
            new google.maps.LatLng(49.99339474911719, 12.453689575195312),
            new google.maps.LatLng(49.991739366147264, 12.45351791381836),
            new google.maps.LatLng(49.990304654813436, 12.448368072509766),
            new google.maps.LatLng(49.98677287533463, 12.440814971923828),
            new google.maps.LatLng(49.98577951562862, 12.43600845336914),
            new google.maps.LatLng(49.98467575856138, 12.43171691894531),
            new google.maps.LatLng(49.98710399067782, 12.4310302734375),
            new google.maps.LatLng(49.98842842925658, 12.432060241699219),
            new google.maps.LatLng(49.99063574584324, 12.426395416259766),
            new google.maps.LatLng(49.991518644112546, 12.42605209350586),
            new google.maps.LatLng(49.9926222441558, 12.428627014160156),
            new google.maps.LatLng(49.99306367708184, 12.432231903076172),
            new google.maps.LatLng(49.99405688634991, 12.436180114746094),
            new google.maps.LatLng(49.99736743575603, 12.435665130615233),
            new google.maps.LatLng(49.99924331257881, 12.434978485107422),
            new google.maps.LatLng(50.00023639420785, 12.432060241699219),
            new google.maps.LatLng(50.00222249592715, 12.431201934814453),
            new google.maps.LatLng(50.001891484671944, 12.427940368652344),
            new google.maps.LatLng(50.00100877684861, 12.424850463867186),
            new google.maps.LatLng(50.00056741685909, 12.424335479736328),
            new google.maps.LatLng(50.00156047113753, 12.41952896118164),
            new google.maps.LatLng(50.00365685169585, 12.416267395019531),
            new google.maps.LatLng(50.00476017316439, 12.41403579711914),
            new google.maps.LatLng(50.00509116466678, 12.408714294433594),
            new google.maps.LatLng(50.00509116466678, 12.404251098632812),
            new google.maps.LatLng(50.00520149466109, 12.401676177978516),
            new google.maps.LatLng(50.006856414187304, 12.402362823486328),
            new google.maps.LatLng(50.00751836604388, 12.402706146240234),
            new google.maps.LatLng(50.00851127673539, 12.400474548339842),
            new google.maps.LatLng(50.007628690467, 12.397556304931639),
            new google.maps.LatLng(50.009724806391574, 12.397556304931639),
            new google.maps.LatLng(50.01104862197962, 12.400474548339842),
            new google.maps.LatLng(50.01248271438353, 12.402706146240234),
            new google.maps.LatLng(50.013916763992015, 12.402877807617188),
            new google.maps.LatLng(50.014799234787844, 12.400646209716797),
            new google.maps.LatLng(50.014799234787844, 12.398757934570312),
            new google.maps.LatLng(50.01380645400302, 12.394466400146484),
            new google.maps.LatLng(50.01292396497497, 12.390174865722656),
            new google.maps.LatLng(50.013144588751366, 12.382621765136719),
            new google.maps.LatLng(50.014247692439646, 12.379875183105469),
            new google.maps.LatLng(50.01755685157043, 12.377643585205078),
            new google.maps.LatLng(50.018990749752, 12.378673553466797),
            new google.maps.LatLng(50.01921134567398, 12.375411987304688),
            new google.maps.LatLng(50.017887754949065, 12.371807098388672),
            new google.maps.LatLng(50.01755685157043, 12.367687225341797),
            new google.maps.LatLng(50.01877015281717, 12.367515563964844),
            new google.maps.LatLng(50.02075548876762, 12.365970611572266),
            new google.maps.LatLng(50.022630452945066, 12.365798950195312),
            new google.maps.LatLng(50.02527733661573, 12.359790802001953),
            new google.maps.LatLng(50.02461562937136, 12.359619140624998),
            new google.maps.LatLng(50.02682128473699, 12.355842590332031),
            new google.maps.LatLng(50.02902683882067, 12.3541259765625),
            new google.maps.LatLng(50.03035012265608, 12.351551055908203),
            new google.maps.LatLng(50.031893907715165, 12.3486328125),
            new google.maps.LatLng(50.0333273779768, 12.349491119384766),
            new google.maps.LatLng(50.034430018291424, 12.3486328125),
            new google.maps.LatLng(50.03718650830641, 12.346744537353516),
            new google.maps.LatLng(50.03817880597379, 12.342453002929688),
            new google.maps.LatLng(50.03906083112809, 12.339706420898438),
            new google.maps.LatLng(50.03950183762877, 12.338333129882812),
            new google.maps.LatLng(50.03828906000424, 12.334728240966797),
            new google.maps.LatLng(50.0358634128481, 12.334041595458984),
            new google.maps.LatLng(50.03431975539934, 12.332324981689451),
            new google.maps.LatLng(50.03299658094514, 12.329406738281248),
            new google.maps.LatLng(50.03211444438672, 12.328205108642578),
            new google.maps.LatLng(50.03365817272972, 12.32442855834961),
            new google.maps.LatLng(50.0358634128481, 12.324771881103516),
            new google.maps.LatLng(50.03696599492857, 12.325115203857422),
            new google.maps.LatLng(50.03828906000424, 12.324256896972656),
            new google.maps.LatLng(50.03917108313303, 12.324256896972656),
            new google.maps.LatLng(50.040494087443996, 12.322368621826172),
            new google.maps.LatLng(50.04258876970728, 12.320308685302734),
            new google.maps.LatLng(50.0458959766676, 12.315845489501953),
            new google.maps.LatLng(50.04821088596438, 12.31842041015625),
            new google.maps.LatLng(50.05052568361258, 12.319450378417969),
            new google.maps.LatLng(50.05151770556978, 12.318592071533203),
            new google.maps.LatLng(50.05295058997193, 12.318077087402344),
            new google.maps.LatLng(50.0536119068041, 12.316875457763672),
            new google.maps.LatLng(50.052289264025866, 12.313957214355469),
            new google.maps.LatLng(50.05416299720225, 12.312583923339844),
            new google.maps.LatLng(50.05592644394527, 12.309150695800781),
            new google.maps.LatLng(50.05780003509859, 12.300910949707031),
            new google.maps.LatLng(50.058571492543614, 12.298851013183594),
            new google.maps.LatLng(50.05813066123681, 12.295589447021484),
            new google.maps.LatLng(50.05791024406449, 12.293014526367188),
            new google.maps.LatLng(50.05691835425775, 12.291297912597656),
            new google.maps.LatLng(50.05658771976536, 12.28271484375),
            new google.maps.LatLng(50.05526515901145, 12.281341552734375),
            new google.maps.LatLng(50.05526515901145, 12.279109954833984),
            new google.maps.LatLng(50.05702856524891, 12.278938293457031),
            new google.maps.LatLng(50.05813066123681, 12.276878356933594),
            new google.maps.LatLng(50.05923273190915, 12.274818420410154),
            new google.maps.LatLng(50.061106193953364, 12.272586822509766),
            new google.maps.LatLng(50.06121639532464, 12.269840240478516),
            new google.maps.LatLng(50.06066538593667, 12.267265319824219),
            new google.maps.LatLng(50.05989396216112, 12.265377044677734),
            new google.maps.LatLng(50.05923273190915, 12.26297378540039),
            new google.maps.LatLng(50.058240869443225, 12.261600494384766),
            new google.maps.LatLng(50.05956334817432, 12.260570526123047),
            new google.maps.LatLng(50.06143679730778, 12.259368896484375),
            new google.maps.LatLng(50.06430193094225, 12.2607421875),
            new google.maps.LatLng(50.06573443358677, 12.262458801269531),
            new google.maps.LatLng(50.06694651779407, 12.26348876953125),
            new google.maps.LatLng(50.067828014342446, 12.264690399169922),
            new google.maps.LatLng(50.06959095883627, 12.267093658447264),
            new google.maps.LatLng(50.07223525407118, 12.270183563232422),
            new google.maps.LatLng(50.07642175666959, 12.27499008178711),
            new google.maps.LatLng(50.07752340712888, 12.270870208740233),
            new google.maps.LatLng(50.07873519339816, 12.26572036743164),
            new google.maps.LatLng(50.08016726495645, 12.26348876953125),
            new google.maps.LatLng(50.081929755842694, 12.262115478515623),
            new google.maps.LatLng(50.0830312797412, 12.25851058959961),
            new google.maps.LatLng(50.08435307500804, 12.259025573730469),
            new google.maps.LatLng(50.08523425160345, 12.256965637207031),
            new google.maps.LatLng(50.08688641405796, 12.253875732421875),
            new google.maps.LatLng(50.08864865790474, 12.252674102783203),
            new google.maps.LatLng(50.09008043331951, 12.253704071044922),
            new google.maps.LatLng(50.091842559724974, 12.25198745727539),
            new google.maps.LatLng(50.09074123831468, 12.250957489013672),
            new google.maps.LatLng(50.09096150462156, 12.248897552490234),
            new google.maps.LatLng(50.0923932109388, 12.248554229736326),
            new google.maps.LatLng(50.09217295121259, 12.246322631835938),
            new google.maps.LatLng(50.09338436717825, 12.245464324951172),
            new google.maps.LatLng(50.09448562784431, 12.244434356689453),
            new google.maps.LatLng(50.09558686320052, 12.245807647705078),
            new google.maps.LatLng(50.09525649525118, 12.246837615966797),
            new google.maps.LatLng(50.0960273502563, 12.247867584228516),
            new google.maps.LatLng(50.096908312219256, 12.247695922851562),
            new google.maps.LatLng(50.097348787126485, 12.246150970458984),
            new google.maps.LatLng(50.0966880732471, 12.244949340820312),
            new google.maps.LatLng(50.096577953381356, 12.243061065673828),
            new google.maps.LatLng(50.09613747138749, 12.241172790527344),
            new google.maps.LatLng(50.0962475922656, 12.239627838134766),
            new google.maps.LatLng(50.095366618154046, 12.23773956298828),
            new google.maps.LatLng(50.09459575251885, 12.235336303710938),
            new google.maps.LatLng(50.09437550291665, 12.23276138305664),
            new google.maps.LatLng(50.09437550291665, 12.231388092041016),
            new google.maps.LatLng(50.0962475922656, 12.23052978515625),
            new google.maps.LatLng(50.09712855017907, 12.227439880371094),
            new google.maps.LatLng(50.09977132673169, 12.227954864501953),
            new google.maps.LatLng(50.1005421090992, 12.22898483276367),
            new google.maps.LatLng(50.10197352916596, 12.229328155517578),
            new google.maps.LatLng(50.10241395750462, 12.227954864501953),
            new google.maps.LatLng(50.102303850799586, 12.225208282470703),
            new google.maps.LatLng(50.10307459242007, 12.223148345947264),
            new google.maps.LatLng(50.1038453216394, 12.221431732177734),
            new google.maps.LatLng(50.10274427610123, 12.218856811523438),
            new google.maps.LatLng(50.10252406395657, 12.216453552246094),
            new google.maps.LatLng(50.10263417015545, 12.21456527709961),
            new google.maps.LatLng(50.10197352916596, 12.21181869506836),
            new google.maps.LatLng(50.10164320525455, 12.209415435791016),
            new google.maps.LatLng(50.10274427610123, 12.208213806152344),
            new google.maps.LatLng(50.10439583491783, 12.207870483398438),
            new google.maps.LatLng(50.10692811450649, 12.206153869628906),
            new google.maps.LatLng(50.10846943653476, 12.202892303466797),
            new google.maps.LatLng(50.10879971337307, 12.20083236694336),
            new google.maps.LatLng(50.11067123910087, 12.2003173828125),
            new google.maps.LatLng(50.11166201722957, 12.199459075927734),
            new google.maps.LatLng(50.11243260826883, 12.200489044189453),
            new google.maps.LatLng(50.113423349955426, 12.20083236694336),
            new google.maps.LatLng(50.1144140711435, 12.201175689697266),
            new google.maps.LatLng(50.11518461789585, 12.202377319335938),
            new google.maps.LatLng(50.11639545202466, 12.201690673828123),
            new google.maps.LatLng(50.11705589409776, 12.199802398681639),
            new google.maps.LatLng(50.118596890173016, 12.198944091796875),
            new google.maps.LatLng(50.119367369610735, 12.199459075927734),
            new google.maps.LatLng(50.12057809796008, 12.198257446289062),
            new google.maps.LatLng(50.121788795689554, 12.196884155273436),
            new google.maps.LatLng(50.122889403418334, 12.196369171142578),
            new google.maps.LatLng(50.12509054296019, 12.196369171142578),
            new google.maps.LatLng(50.125970970435326, 12.197399139404297),
            new google.maps.LatLng(50.12718153177013, 12.196540832519531),
            new google.maps.LatLng(50.12938247393472, 12.196884155273436),
            new google.maps.LatLng(50.13092307322573, 12.196884155273436),
            new google.maps.LatLng(50.13224354742944, 12.195682525634766),
            new google.maps.LatLng(50.13422419041487, 12.196884155273436),
            new google.maps.LatLng(50.13565460380666, 12.197399139404297),
            new google.maps.LatLng(50.13774513107287, 12.19430923461914),
            new google.maps.LatLng(50.143136069320974, 12.194995880126953),
            new google.maps.LatLng(50.143686130902424, 12.198257446289062),
            new google.maps.LatLng(50.14544628545597, 12.200145721435547),
            new google.maps.LatLng(50.14577630722375, 12.203407287597656),
            new google.maps.LatLng(50.148636400491256, 12.201347351074219),
            new google.maps.LatLng(50.15094635096124, 12.20306396484375),
            new google.maps.LatLng(50.15160631631611, 12.199974060058594),
            new google.maps.LatLng(50.152926219701094, 12.201004028320312),
            new google.maps.LatLng(50.15875535718807, 12.210960388183594),
            new google.maps.LatLng(50.16777262241341, 12.215595245361328),
            new google.maps.LatLng(50.168872172531124, 12.214393615722654),
            new google.maps.LatLng(50.16876221865774, 12.210617065429688),
            new google.maps.LatLng(50.16865226453141, 12.207870483398438),
            new google.maps.LatLng(50.17008164844149, 12.207870483398438),
            new google.maps.LatLng(50.17162093714734, 12.207870483398438),
            new google.maps.LatLng(50.17447948462596, 12.20804214477539),
            new google.maps.LatLng(50.175578880429114, 12.20632553100586),
            new google.maps.LatLng(50.18019606656287, 12.204265594482422),
            new google.maps.LatLng(50.184043380808895, 12.202205657958984),
            new google.maps.LatLng(50.18712100909926, 12.201690673828123),
            new google.maps.LatLng(50.189209286782585, 12.200660705566406),
            new google.maps.LatLng(50.189758818364524, 12.199287414550781),
            new google.maps.LatLng(50.19107766836076, 12.19533920288086),
            new google.maps.LatLng(50.19371525908205, 12.190189361572266),
            new google.maps.LatLng(50.19547357195555, 12.188472747802734),
            new google.maps.LatLng(50.19712193146678, 12.18984603881836),
            new google.maps.LatLng(50.19767137199048, 12.191390991210938),
            new google.maps.LatLng(50.19778125933641, 12.194480895996094),
            new google.maps.LatLng(50.19789114642944, 12.196884155273436),
            new google.maps.LatLng(50.198550463675915, 12.197914123535156),
            new google.maps.LatLng(50.19964930551891, 12.196369171142578),
            new google.maps.LatLng(50.19964930551891, 12.193794250488281),
            new google.maps.LatLng(50.1986603489984, 12.191905975341797),
            new google.maps.LatLng(50.200858002332836, 12.190189361572266),
            new google.maps.LatLng(50.200528360782364, 12.187099456787108),
            new google.maps.LatLng(50.19964930551891, 12.185726165771484),
            new google.maps.LatLng(50.19931965562177, 12.182464599609375),
            new google.maps.LatLng(50.200088835174064, 12.181949615478516),
            new google.maps.LatLng(50.20107776210186, 12.181949615478516),
            new google.maps.LatLng(50.2018469133262, 12.18435287475586),
            new google.maps.LatLng(50.203165429448724, 12.185897827148438),
            new google.maps.LatLng(50.204044419963154, 12.184696197509766),
            new google.maps.LatLng(50.20437403723282, 12.183837890625),
            new google.maps.LatLng(50.20547274502523, 12.184181213378904),
            new google.maps.LatLng(50.20525300549011, 12.181434631347656),
            new google.maps.LatLng(50.20569248354865, 12.180404663085938),
            new google.maps.LatLng(50.204923394290546, 12.178688049316406),
            new google.maps.LatLng(50.20547274502523, 12.178001403808594),
            new google.maps.LatLng(50.20799967696486, 12.176971435546875),
            new google.maps.LatLng(50.209537743944495, 12.177486419677734),
            new google.maps.LatLng(50.21261372919115, 12.175254821777344),
            new google.maps.LatLng(50.2123940225349, 12.171306610107422),
            new google.maps.LatLng(50.212943287278684, 12.169246673583984),
            new google.maps.LatLng(50.2123940225349, 12.166500091552734),
            new google.maps.LatLng(50.21338269452136, 12.164783477783203),
            new google.maps.LatLng(50.21118561784258, 12.159461975097656),
            new google.maps.LatLng(50.212943287278684, 12.158260345458984),
            new google.maps.LatLng(50.21426149686718, 12.157917022705076),
            new google.maps.LatLng(50.2161288981097, 12.160148620605469),
            new google.maps.LatLng(50.217007649874674, 12.162723541259764),
            new google.maps.LatLng(50.21766670307656, 12.163753509521483),
            new google.maps.LatLng(50.21920445847496, 12.162723541259764),
            new google.maps.LatLng(50.219863481328936, 12.162723541259764),
            new google.maps.LatLng(50.22008315359044, 12.160148620605469),
            new google.maps.LatLng(50.221950326970465, 12.160320281982422),
            new google.maps.LatLng(50.22326828770586, 12.161521911621094),
            new google.maps.LatLng(50.22315845903549, 12.158775329589844),
            new google.maps.LatLng(50.22348794428793, 12.156543731689453),
            new google.maps.LatLng(50.2252451605284, 12.157917022705076),
            new google.maps.LatLng(50.22590409992796, 12.15860366821289),
            new google.maps.LatLng(50.2266728510544, 12.158260345458984),
            new google.maps.LatLng(50.22788086350316, 12.155857086181639),
            new google.maps.LatLng(50.229528103893756, 12.15036392211914),
            new google.maps.LatLng(50.22941828963789, 12.148132324218748),
            new google.maps.LatLng(50.22985754514409, 12.1453857421875),
            new google.maps.LatLng(50.23073604401821, 12.145214080810545),
            new google.maps.LatLng(50.23216357017069, 12.14864730834961),
            new google.maps.LatLng(50.2333714435354, 12.150707244873047),
            new google.maps.LatLng(50.23446948367872, 12.151908874511719),
            new google.maps.LatLng(50.23567729862959, 12.151222229003906),
            new google.maps.LatLng(50.23622629531058, 12.150192260742188),
            new google.maps.LatLng(50.23589689806059, 12.147960662841797),
            new google.maps.LatLng(50.235128295626836, 12.145557403564453),
            new google.maps.LatLng(50.23424987767306, 12.143669128417969),
            new google.maps.LatLng(50.2333714435354, 12.141952514648438),
            new google.maps.LatLng(50.23194395354427, 12.141094207763672),
            new google.maps.LatLng(50.23073604401821, 12.141952514648438),
            new google.maps.LatLng(50.230626232544004, 12.139205932617188),
            new google.maps.LatLng(50.23128509759595, 12.13714599609375),
            new google.maps.LatLng(50.23194395354427, 12.135257720947266),
            new google.maps.LatLng(50.23194395354427, 12.13216781616211),
            new google.maps.LatLng(50.23216357017069, 12.12890625),
            new google.maps.LatLng(50.232492993213754, 12.126846313476562),
            new google.maps.LatLng(50.23403027065588, 12.122554779052734),
            new google.maps.LatLng(50.23501849426766, 12.121524810791016),
            new google.maps.LatLng(50.23567729862959, 12.119121551513672),
            new google.maps.LatLng(50.236994880043426, 12.114486694335938),
            new google.maps.LatLng(50.23787324742315, 12.110881805419922),
            new google.maps.LatLng(50.238092836739405, 12.108478546142578),
            new google.maps.LatLng(50.24292354579811, 12.10813522338867),
            new google.maps.LatLng(50.24500938246365, 12.107105255126953),
            new google.maps.LatLng(50.24687558000108, 12.106246948242186),
            new google.maps.LatLng(50.24709512784832, 12.104015350341797),
            new google.maps.LatLng(50.246765805698175, 12.100753784179688),
            new google.maps.LatLng(50.246546256333815, 12.097663879394531),
            new google.maps.LatLng(50.24841239369225, 12.094917297363281),
            new google.maps.LatLng(50.24940031918085, 12.093029022216797),
            new google.maps.LatLng(50.25060775585359, 12.091999053955078),
            new google.maps.LatLng(50.25258349532525, 12.090110778808594),
            new google.maps.LatLng(50.2529127772726, 12.094058990478516),
            new google.maps.LatLng(50.25412012494403, 12.098865509033203),
            new google.maps.LatLng(50.25510793210134, 12.100582122802734),
            new google.maps.LatLng(50.25620547158976, 12.102298736572264),
            new google.maps.LatLng(50.259168701916714, 12.101612091064453),
            new google.maps.LatLng(50.26070511915273, 12.100067138671875),
            new google.maps.LatLng(50.26202200877066, 12.09817886352539),
            new google.maps.LatLng(50.26289991495639, 12.1014404296875),
            new google.maps.LatLng(50.26399727493418, 12.10470199584961),
            new google.maps.LatLng(50.26520434170851, 12.10813522338867),
            new google.maps.LatLng(50.26706974836985, 12.110881805419922),
            new google.maps.LatLng(50.26794756151673, 12.114143371582031),
            new google.maps.LatLng(50.26783783575824, 12.116546630859375),
            new google.maps.LatLng(50.266521106936445, 12.11843490600586),
            new google.maps.LatLng(50.26706974836985, 12.12015151977539),
            new google.maps.LatLng(50.26860591075851, 12.120323181152344),
            new google.maps.LatLng(50.2691545281742, 12.124271392822266),
            new google.maps.LatLng(50.27003230289287, 12.127876281738281),
            new google.maps.LatLng(50.271458652301526, 12.130451202392578),
            new google.maps.LatLng(50.272884958984925, 12.132682800292969),
            new google.maps.LatLng(50.27354323996707, 12.13491439819336),
            new google.maps.LatLng(50.274750064796706, 12.13663101196289),
            new google.maps.LatLng(50.275188902605095, 12.13834762573242),
            new google.maps.LatLng(50.277053918164945, 12.139549255371094),
            new google.maps.LatLng(50.27804124976567, 12.139892578125),
            new google.maps.LatLng(50.28023524667722, 12.13663101196289),
            new google.maps.LatLng(50.28330667247355, 12.135772705078125),
            new google.maps.LatLng(50.28462293714431, 12.135257720947266),
            new google.maps.LatLng(50.286048849459185, 12.13113784790039),
            new google.maps.LatLng(50.28868119072578, 12.126674652099608),
            new google.maps.LatLng(50.29076502429946, 12.123069763183594),
            new google.maps.LatLng(50.29383577060512, 12.122039794921875),
            new google.maps.LatLng(50.29591937844801, 12.122211456298828),
            new google.maps.LatLng(50.2981125512805, 12.119636535644531),
            new google.maps.LatLng(50.299976668692395, 12.119464874267578),
            new google.maps.LatLng(50.3019503604486, 12.12186813354492),
            new google.maps.LatLng(50.30425289732485, 12.12289810180664),
            new google.maps.LatLng(50.30567822143615, 12.125129699707031),
            new google.maps.LatLng(50.306774595531756, 12.12615966796875),
            new google.maps.LatLng(50.307980577843814, 12.124443054199219),
            new google.maps.LatLng(50.31050207839775, 12.121353149414062),
            new google.maps.LatLng(50.311159839161796, 12.118778228759766),
            new google.maps.LatLng(50.31203683936005, 12.117233276367188),
            new google.maps.LatLng(50.31280420126435, 12.114830017089844),
            new google.maps.LatLng(50.313790791229486, 12.112255096435547),
            new google.maps.LatLng(50.314338887919654, 12.109165191650389),
            new google.maps.LatLng(50.314448506499474, 12.105731964111328),
            new google.maps.LatLng(50.315325446039274, 12.104015350341797),
            new google.maps.LatLng(50.31664082502023, 12.102298736572264),
            new google.maps.LatLng(50.31806577784636, 12.10092544555664),
            new google.maps.LatLng(50.31960029466139, 12.1014404296875),
            new google.maps.LatLng(50.32113476194073, 12.104530334472656),
            new google.maps.LatLng(50.321573172065094, 12.105216979980467),
            new google.maps.LatLng(50.32212117903413, 12.10641860961914),
            new google.maps.LatLng(50.32091555536218, 12.108650207519531),
            new google.maps.LatLng(50.3201483243762, 12.110023498535156),
            new google.maps.LatLng(50.3201483243762, 12.111568450927734),
            new google.maps.LatLng(50.32021682764627, 12.111525535583496)
        ];
        const svgMarker = {
            url: 'wwwroot/images/icons/marker.png',
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        const polygon = new google.maps.Polygon({
            paths: [europeCoords, czechRepublicCoords],
            strokeColor: '#fff',
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor: '#fff',
            fillOpacity: 1
        });
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        const markers = references_1.references.map((position) => {
            const label = position.name.charAt(0);
            const marker = new google.maps.Marker({
                position,
                label,
                icon: svgMarker,
                title: position.name
            });
            marker.addListener('click', () => {
                infoWindow.setContent(`<div class='map__pop-up'><strong>${position.name}</strong><br><span>${new Date(position.date).toLocaleDateString("cs-CZ")}</span><p>${position.desc}</p><b>${position.price} Kč</b></div>`);
                infoWindow.open(map, marker);
            });
            return marker;
        });
        polygon.setMap(map);
        new markerclusterer_1.MarkerClusterer({
            map,
            markers,
            algorithm: new markerclusterer_1.GridAlgorithm({
                gridSize: 60,
                maxZoom: 17
            })
        });
    });
}
exports.initMap = initMap;


/***/ }),

/***/ "./Resources/Scripts/map/references.ts":
/*!*********************************************!*\
  !*** ./Resources/Scripts/map/references.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.references = void 0;
exports.references = [
    {
        "name": "Mikroregion Odersko",
        "lng": 17.8307,
        "lat": 49.66196,
        "desc": "Kompostuj s Mikroregionem Odersko",
        "date": "2022-01-19",
        "price": "4 906 050,36"
    },
    {
        "name": "BAUSET CZ, a.s.",
        "lng": 15.77308,
        "lat": 50.01842,
        "desc": "Pořízení technologií-BAUSET CZ, a.s.",
        "date": "2021-01-07",
        "price": "565 675"
    },
    {
        "name": "Dobrovolný svazek obcí Chomutovsko",
        "lng": 13.41685,
        "lat": 50.46086,
        "desc": "Chomutovsko předchází vzniku jednorázového nádobí",
        "date": "2021-02-12",
        "price": "4 590 000"
    },
    {
        "name": "EKO servis Zábřeh s.r.o.",
        "lng": 16.87497,
        "lat": 49.88661,
        "desc": "Vozidlo na alternativní pohon-EKO servis Zábřeh s.r.o.",
        "date": "2021-03-10",
        "price": "460 000"
    },
    {
        "name": "Město Břeclav",
        "lng": 16.86991,
        "lat": 48.74577,
        "desc": "Veřejné osvětlení Město Břeclav - ulice Kupkova, Veslařská, K.H.Máchy, Slovácká (sídliště), Čermákova, Haškova, U Splavu (parkoviště)",
        "date": "2021-03-03",
        "price": "656 194"
    },
    {
        "name": "Město Rájec - Jestřebí",
        "lng": 16.64166,
        "lat": 49.42075,
        "desc": "Vozidlo na alternativní pohon-Město Rájec - Jestřebí",
        "date": "2021-03-10",
        "price": "480 000"
    },
    {
        "name": "Město Šenov",
        "lng": 18.3821,
        "lat": 49.79161,
        "desc": "Pořízení vozidla na alternativní pohon-Město Šenov",
        "date": "2021-10-12",
        "price": "2 273 004"
    },
    {
        "name": "Městys Buchlovice",
        "lng": 17.33659,
        "lat": 49.08657,
        "desc": "Podpora domácího kompostování-Městys Buchlovice",
        "date": "2021-01-04",
        "price": "491 260"
    },
    {
        "name": "Městys Dub nad Moravou",
        "lng": 17.27842,
        "lat": 49.48237,
        "desc": "Podpora domácího kompostování-Městys Dub nad Moravou",
        "date": "2021-01-07",
        "price": "2 601 035,36"
    },
    {
        "name": "Obec Bezměrov",
        "lng": 17.3415,
        "lat": 49.32813,
        "desc": "Podpora domácího kompostování-obec Bezměrov",
        "date": "2021-05-11",
        "price": "1 525 743,66"
    },
    {
        "name": "Obec Dolní Vilémovice",
        "lng": 15.97955,
        "lat": 49.15855,
        "desc": "Podpora domácího kompostování-obec Dolní Vilémovice",
        "date": "2021-02-17",
        "price": "1 957 500"
    },
    {
        "name": "Obec Drahanovice",
        "lng": 17.05812,
        "lat": 49.57342,
        "desc": "Podpora domácího kompostování v obci Drahanovice",
        "date": "2021-01-07",
        "price": "901 174,01"
    },
    {
        "name": "Obec Držovice",
        "lng": 17.14119,
        "lat": 49.49587,
        "desc": "Rozšíření separace odpadů-Obec Držovice",
        "date": "2021-01-06",
        "price": "865 511,54"
    },
    {
        "name": "Obec Klenovice na Hané",
        "lng": 17.21338,
        "lat": 49.4069,
        "desc": "Vozidlo na alternativní pohon-obec Klenovice na Hané",
        "date": "2021-01-07",
        "price": "987 623,87"
    },
    {
        "name": "Obec Komňa",
        "lng": 17.80756,
        "lat": 48.9886,
        "desc": "Vozidlo na alternativní pohon-Obec Komňa",
        "date": "2021-03-10",
        "price": "200 000"
    },
    {
        "name": "Obec Merklín",
        "lng": 13.17881,
        "lat": 49.56255,
        "desc": "Podpora domácího kompostování-Obec Merklín",
        "date": "2021-03-10",
        "price": "500 000"
    },
    {
        "name": "Obec Nyklovice",
        "lng": 16.34495,
        "lat": 49.60493,
        "desc": "Novostavba přívodního řadu z vrtané studny do vodojemu-Obec Nyklovice",
        "date": "2021-05-24",
        "price": "624 997"
    },
    {
        "name": "Obec Ošelín",
        "lng": 12.84558,
        "lat": 49.76531,
        "desc": "Rozšíření systému separace odpadů-obec Ošelín",
        "date": "2021-06-07",
        "price": "1 768 898"
    },
    {
        "name": "Obec Račiněves",
        "lng": 14.21048,
        "lat": 50.38108,
        "desc": "Rozšíření systému separace odpadů v obci Račiněves",
        "date": "2021-01-07",
        "price": "743 502,65"
    },
    {
        "name": "Obec Trboušany",
        "lng": 16.46382,
        "lat": 49.04893,
        "desc": "Podpora domácího kompostování-obec Trboušany",
        "date": "2021-01-06",
        "price": "927 610,15"
    },
    {
        "name": "Obec Zbrašín",
        "lng": 13.76282,
        "lat": 50.29697,
        "desc": "Vodní nádrž Senkov-rekonstrukce",
        "date": "2021-03-18",
        "price": "1 374 119,65"
    },
    {
        "name": "Obec Žichovice",
        "lng": 13.63623,
        "lat": 49.26724,
        "desc": "Rozšíření systému separace odpadů-obec Žichovice",
        "date": "2021-01-07",
        "price": "1 524 987,8"
    },
    {
        "name": "S A P spol. s r.o.",
        "lng": 15.2229,
        "lat": 49.62855,
        "desc": "Sklad-S A P spol. s r.o.",
        "date": "2021-08-05",
        "price": "2 596 105"
    },
    {
        "name": "Správa majetku města Chropyně,příspěvková organizace",
        "lng": 17.36782,
        "lat": 49.35692,
        "desc": "Vozidlo na alternativní pohon-Správa majetku města Chropyně,příspěvková organizace",
        "date": "2021-03-10",
        "price": "530 000"
    },
    {
        "name": "Technické služby města Pelhřimova, příspěvková organizace",
        "lng": 15.2204,
        "lat": 49.41414,
        "desc": "Pořízení vozidla na alternativní pohon-Technické služby města Pelhřimova, příspěvková organizace",
        "date": "2021-03-04",
        "price": "1 790 316"
    },
    {
        "name": "Technické služby Zábřeh, příspěvková organizace",
        "lng": 16.85684,
        "lat": 49.8801,
        "desc": "Pořízení vozidla na alternativní pohon-Technické služby Zábřeh, příspěvková organizace",
        "date": "2021-03-10",
        "price": "500 000"
    },
    {
        "name": "Ašské služby s.r.o.",
        "lng": 12.18138,
        "lat": 50.2183,
        "desc": "Výstavba opěrné stěny a stavební úpravy ve sběrném dvoře v Aši",
        "date": "2020-05-06",
        "price": "300 000"
    },
    {
        "name": "Barbora Poláčková",
        "lng": 14.26473,
        "lat": 50.17718,
        "desc": "Investice do nezemědělských činností",
        "date": "2020-11-09",
        "price": "618 750"
    },
    {
        "name": "František Ratzka",
        "lng": 13.60519,
        "lat": 50.16232,
        "desc": "Pořízení zemědělského stroje",
        "date": "2020-08-18",
        "price": "1 852 000"
    },
    {
        "name": "HRAZDÍRA - ELEKTRO s.r.o.",
        "lng": 15.02711,
        "lat": 49.68743,
        "desc": "Úspora energie rekonstrukcí pro HRAZDÍRA - ELEKTRO s.r.o.",
        "date": "2020-07-13",
        "price": "702 700"
    },
    {
        "name": "IGRO s.r.o.",
        "lng": 12.60257,
        "lat": 49.78418,
        "desc": "Modernizace zařízení pro třídění a úpravu odpadů-IGRO s.r.o.",
        "date": "2020-11-23",
        "price": "4 974 237,4"
    },
    {
        "name": "Jan Hudík",
        "lng": 15.53872,
        "lat": 49.81062,
        "desc": "Strojní vybavení pro pěstování brambor",
        "date": "2020-08-11",
        "price": "825 000"
    },
    {
        "name": "Jiří Hamouz",
        "lng": 14.00822,
        "lat": 50.10192,
        "desc": "Investice do nezemědělských činností-Jiří Hamouz ",
        "date": "2020-07-13",
        "price": "1 387 441,35"
    },
    {
        "name": "Karel Mištera",
        "lng": 13.66746,
        "lat": 50.14622,
        "desc": "Rozšíření zemědělské činnosti nákupem traktoru pro chmelnici",
        "date": "2020-11-23",
        "price": "905 080"
    },
    {
        "name": "Město Bečov nad Teplou",
        "lng": 12.84393,
        "lat": 50.09713,
        "desc": "Rozšíření systému separace odpadů- Město Bečov nad Teplou",
        "date": "2020-07-30",
        "price": "565 675"
    },
    {
        "name": "Město Brušperk",
        "lng": 18.23148,
        "lat": 49.70466,
        "desc": "Podpora domácího kompostování-Město Brušperk",
        "date": "2020-11-23",
        "price": "1 178 403,87"
    },
    {
        "name": "Město Golčův Jeníkov",
        "lng": 15.46742,
        "lat": 49.81103,
        "desc": "Podpora domácího kompostování-Město Golčův Jeníkov",
        "date": "2020-11-24",
        "price": "1 770 305,62"
    },
    {
        "name": "Město Jaroměř",
        "lng": 15.92521,
        "lat": 50.35399,
        "desc": "Pořízení CAS pro jednotku SDH kategorie JPO III\/2 -Město Jaroměř ",
        "date": "2020-05-12",
        "price": "394 000"
    },
    {
        "name": "Město Konice",
        "lng": 16.90065,
        "lat": 49.58654,
        "desc": "Pořízení kompostérů-město Konice",
        "date": "2020-12-07",
        "price": "927 434,44"
    },
    {
        "name": "Město Krásná Hora nad Vltavou",
        "lng": 14.27903,
        "lat": 49.6012,
        "desc": "STAVEBNÍ ÚPRAVY ZŠ - TECHNICKÝ ATELIÉR",
        "date": "2020-05-06",
        "price": "300 000"
    },
    {
        "name": "Město Stochov",
        "lng": 13.95639,
        "lat": 50.16254,
        "desc": "Podpora domácího kompostování-Město Stochov",
        "date": "2020-11-23",
        "price": "1 988 730,84"
    },
    {
        "name": "Město Újezd u Brna",
        "lng": 16.75832,
        "lat": 49.0974,
        "desc": "Vozidlo na alternativní pohon-Město Újezd u Brna",
        "date": "2020-11-23",
        "price": "2 306 500"
    },
    {
        "name": "Město Úštěk",
        "lng": 14.36427,
        "lat": 50.59282,
        "desc": "Pořízení elektrovozidla-Město Úštěk",
        "date": "2020-12-03",
        "price": "500 000"
    },
    {
        "name": "Městys Okříšky",
        "lng": 15.7662,
        "lat": 49.24276,
        "desc": "Podpora domácího kompostování-Městys Okříšky",
        "date": "2020-11-19",
        "price": "1 614 642,15"
    },
    {
        "name": "Mikroregion Morkovsko",
        "lng": 17.20525,
        "lat": 49.24681,
        "desc": "Podpora domácího kompostování-Mikroregion Morkovsko",
        "date": "2020-11-19",
        "price": "765 923,95"
    },
    {
        "name": "Mikroregion Nepomucko",
        "lng": 13.5813,
        "lat": 49.48637,
        "desc": "Podpora domácího kompostování-Mikroregion Nepomucko",
        "date": "2020-11-23",
        "price": "4 438 975,14"
    },
    {
        "name": "Mikroregion Pobečví",
        "lng": 17.48175,
        "lat": 49.49161,
        "desc": "Podpora domácího kompostování-Mikroregion Pobečví",
        "date": "2020-12-07",
        "price": "1 094 118,3"
    },
    {
        "name": "Milský statek s.r.o.",
        "lng": 13.8667,
        "lat": 50.23108,
        "desc": "Investice do zemědělské činnosti-Milský statek s.r.o.",
        "date": "2020-08-11",
        "price": "514 500"
    },
    {
        "name": "Obec Bílá Lhota",
        "lng": 16.98543,
        "lat": 49.72073,
        "desc": "Kůrovcová kalamita-obec Bílá Lhota",
        "date": "2020-12-30",
        "price": "432 649"
    },
    {
        "name": "Obec Blatno",
        "lng": 13.36573,
        "lat": 50.10873,
        "desc": "Podpora domácího kompostování-obec Blatno",
        "date": "2020-06-23",
        "price": "1 922 060,8"
    },
    {
        "name": "Obec Česká Ves",
        "lng": 17.20794,
        "lat": 50.26276,
        "desc": "Opatření ke snížení energetické náročnosti VO",
        "date": "2020-11-30",
        "price": "518 109,9"
    },
    {
        "name": "Obec Děpoltovice",
        "lng": 12.82723,
        "lat": 50.28998,
        "desc": "Podpora domácího kompostování-obec Děpoltovice",
        "date": "2020-10-19",
        "price": "858 797,5"
    },
    {
        "name": "Obec Holedeč",
        "lng": 13.56146,
        "lat": 50.27779,
        "desc": "Rozšíření systému separace odpadů v obci Holedeč",
        "date": "2020-10-19",
        "price": "551 805,67"
    },
    {
        "name": "Obec Horní Domaslavice",
        "lng": 18.46304,
        "lat": 49.69329,
        "desc": "Podpora domácího kompostování-Obec Horní Domaslavice",
        "date": "2020-09-02",
        "price": "5 689 585,15"
    },
    {
        "name": "Obec Hulice",
        "lng": 15.09058,
        "lat": 49.70918,
        "desc": "Pořízení DA pro JPO V- obec Hulice",
        "date": "2020-11-20",
        "price": "3 257 259,5"
    },
    {
        "name": "Obec Jaroslavice",
        "lng": 16.23603,
        "lat": 48.75835,
        "desc": "Rozšíření systému separace odpadů-obec Jaroslavice",
        "date": "2020-12-07",
        "price": "1 357 856,55"
    },
    {
        "name": "Obec Jindřichov",
        "lng": 17.74508,
        "lat": 49.65041,
        "desc": "Rozšíření systému separace odpadů-obec Jindřichov",
        "date": "2020-10-19",
        "price": "574 725,8"
    },
    {
        "name": "Obec Jistebník",
        "lng": 18.13952,
        "lat": 49.74879,
        "desc": "Podpora domácího kompostování-obec Jistebník",
        "date": "2020-10-19",
        "price": "595 090,1"
    },
    {
        "name": "Obec Krmelín",
        "lng": 18.23645,
        "lat": 49.72947,
        "desc": "Rozšíření systému separovaných odpadů-obec Krmelín",
        "date": "2020-07-30",
        "price": "14 084 110,44"
    },
    {
        "name": "Obec Kuřimské Jestřabí",
        "lng": 16.31189,
        "lat": 49.34506,
        "desc": "Pořízení DA pro JPO V- obec Kuřimské Jestřabí",
        "date": "2020-10-19",
        "price": "564 647"
    },
    {
        "name": "Obec Kyselka",
        "lng": 12.98735,
        "lat": 50.2666,
        "desc": "Rozšíření systému separace odpadů-Obec Kyselka",
        "date": "2020-07-30",
        "price": "572 463,1"
    },
    {
        "name": "Obec Libčeves",
        "lng": 13.83889,
        "lat": 50.45574,
        "desc": "Rozšíření systému separace odpadů v obci Libčeves",
        "date": "2020-07-13",
        "price": "572 290,31"
    },
    {
        "name": "Obec Litovany",
        "lng": 16.04573,
        "lat": 49.05289,
        "desc": "Podpora domácího kompostování-Obec Litovany",
        "date": "2020-11-27",
        "price": "1 316 274,3"
    },
    {
        "name": "Obec Mouchnice",
        "lng": 17.11061,
        "lat": 49.10832,
        "desc": "Podpora domácího kompostování-obec Mouchnice",
        "date": "2020-10-21",
        "price": "3 266 666,67"
    },
    {
        "name": "Obec Nesovice",
        "lng": 17.08776,
        "lat": 49.14687,
        "desc": "Výstavba lesních oplocenek-obec Nesovice",
        "date": "2020-07-30",
        "price": "591 582,91"
    },
    {
        "name": "Obec Otradov",
        "lng": 16.04646,
        "lat": 49.7949,
        "desc": "Podpora domácího kompostování-obec Otradov",
        "date": "2020-11-20",
        "price": "1 071 902,7"
    },
    {
        "name": "Obec Pojbuky",
        "lng": 14.89915,
        "lat": 49.49908,
        "desc": "Rozšíření sběrných míst-obec Pojbuky",
        "date": "2020-10-17",
        "price": "570 200,4"
    },
    {
        "name": "Obec Přemyslovice",
        "lng": 16.95543,
        "lat": 49.55354,
        "desc": "Podpora domácího kompostování-obec Přemyslovice",
        "date": "2020-10-16",
        "price": "607 534,95"
    },
    {
        "name": "Obec Přerov nad Labem",
        "lng": 14.82734,
        "lat": 50.16408,
        "desc": "Rozšíření systému separace odpadů-obec Přerov nad Labem",
        "date": "2020-06-10",
        "price": "7 734 041,35"
    },
    {
        "name": "OBEC RAPOTICE",
        "lng": 16.25878,
        "lat": 49.19279,
        "desc": "Podpora domácího kompostování-OBEC RAPOTICE",
        "date": "2020-12-07",
        "price": "614 775,59"
    },
    {
        "name": "Obec Řícmanice",
        "lng": 16.6935,
        "lat": 49.25927,
        "desc": "Rozšíření systému separace odpadů-obec Řícmanice",
        "date": "2020-10-19",
        "price": "2 753 150"
    },
    {
        "name": "Obec Sadov",
        "lng": 12.92106,
        "lat": 50.25921,
        "desc": "Rozšíření systému separace odpadů-obec Sadov",
        "date": "2020-07-13",
        "price": "653 097,5"
    },
    {
        "name": "Obec Střítež nad Ludinou",
        "lng": 17.7422,
        "lat": 49.60874,
        "desc": "Rozšíření separace odpadů v obci Střítež nad Ludinou",
        "date": "2020-10-19",
        "price": "593 958,75"
    },
    {
        "name": "Obec Svratouch",
        "lng": 16.05226,
        "lat": 49.72774,
        "desc": "Výstavba víceúčelového hřiště-obec Svratouch",
        "date": "2020-07-13",
        "price": "1 478 211,62"
    },
    {
        "name": "Obec Šebetov",
        "lng": 16.72271,
        "lat": 49.5547,
        "desc": "Rozšíření systému separace odpadů-obec Šebetov",
        "date": "2020-05-06",
        "price": "300 000"
    },
    {
        "name": "Obec Šenov u Nového Jičína",
        "lng": 18.00963,
        "lat": 49.61979,
        "desc": "Rozšíření systému separovaných odpadů-obec Šenov u Nového Jičína",
        "date": "2020-11-20",
        "price": "1 038 579,3"
    },
    {
        "name": "Obec Tomice",
        "lng": 15.15551,
        "lat": 49.64014,
        "desc": "Pořízení DA pro JPO V-obec Tomice",
        "date": "2020-01-16",
        "price": "338 800"
    },
    {
        "name": "Obec Úněšov",
        "lng": 13.13964,
        "lat": 49.89163,
        "desc": "Rozšíření systému separace odpadů- obec Úněšov",
        "date": "2020-11-23",
        "price": "1 891 102,95"
    },
    {
        "name": "Obec Valy",
        "lng": 15.61448,
        "lat": 50.02704,
        "desc": "Podpora domácího kompostování-obec Valy",
        "date": "2020-12-14",
        "price": "450 000"
    },
    {
        "name": "Obec Věžky",
        "lng": 17.27742,
        "lat": 49.28715,
        "desc": "Vozidlo na alternativní pohon-obec Věžky",
        "date": "2020-07-29",
        "price": "100 000"
    },
    {
        "name": "Obec Výšovice",
        "lng": 17.13997,
        "lat": 49.4163,
        "desc": "Podpora domácího kompostování-obec Výšovice",
        "date": "2020-06-23",
        "price": "2 420 060,5"
    },
    {
        "name": "Obec Žihle",
        "lng": 13.34863,
        "lat": 50.05315,
        "desc": "Podpora domácího kompostování-obec Žihle",
        "date": "2020-12-07",
        "price": "4 116 731,69"
    },
    {
        "name": "Obec Žiželice",
        "lng": 15.39985,
        "lat": 50.12388,
        "desc": "Podpora domácího kompostování-obec Žiželice",
        "date": "2020-10-29",
        "price": "547 442,78"
    },
    {
        "name": "Pavel Šilhánek",
        "lng": 13.42131,
        "lat": 50.17582,
        "desc": "Likvidace brownfieldu a výstavba nové budovy-Pavel Šilhánek",
        "date": "2020-07-30",
        "price": "660 052,21"
    },
    {
        "name": "Richard Sůra",
        "lng": 13.11835,
        "lat": 50.38077,
        "desc": "Investice do nezemědělských činností-Richard Sůra",
        "date": "2020-10-19",
        "price": "571 331,75"
    },
    {
        "name": "Sdružení obcí povodí Stonávky",
        "lng": 18.53473,
        "lat": 49.70944,
        "desc": "Podpora domácího kompostování-Sdružení obcí povodí Stonávky",
        "date": "2020-11-20",
        "price": "2 773 247,4"
    },
    {
        "name": "STAVBY JZL s.r.o.",
        "lng": 16.6132,
        "lat": 49.19564,
        "desc": "Pořízení technologie-STAVBY JZL s.r.o.",
        "date": "2020-05-12",
        "price": "484 000"
    },
    {
        "name": "Svazek obcí mikroregionu Střední Haná",
        "lng": 17.3019,
        "lat": 49.35184,
        "desc": "Rozšíření systému separace odpadů-Svazek obcí mikroregionu Střední Haná",
        "date": "2020-07-30",
        "price": "577 893,58"
    },
    {
        "name": "Svazek obcí Větrník",
        "lng": 16.96531,
        "lat": 49.23844,
        "desc": "Podpora domácího kompostování-Svazek obcí Větrník",
        "date": "2020-12-07",
        "price": "1 904 543,38"
    },
    {
        "name": "TBS Světlá nad Sázavou, p.o.",
        "lng": 15.39303,
        "lat": 49.67285,
        "desc": "Vozidlo na alternativní pohon-TBS Světlá nad Sázavou, p.o.",
        "date": "2020-12-14",
        "price": "500 000"
    },
    {
        "name": "Technické služby Český Brod",
        "lng": 14.85366,
        "lat": 50.07043,
        "desc": "Vozidlo na alternativní pohon-Technické služby Český Brod",
        "date": "2020-11-19",
        "price": "1 419 638,55"
    },
    {
        "name": "Technické služby Horní Slavkov s.r.o.",
        "lng": 12.7998,
        "lat": 50.13155,
        "desc": "Pořízení svozového vozidla -Technické služby Horní Slavkov s.r.o.",
        "date": "2020-12-03",
        "price": "1 559 534,95"
    },
    {
        "name": "Technické služby Krnov s.r.o.",
        "lng": 17.70924,
        "lat": 50.087,
        "desc": "Podpora domácího kompostování-Technické služby Krnov s.r.o.",
        "date": "2020-12-10",
        "price": "1 879 650"
    },
    {
        "name": "Technické služby města Nymburka",
        "lng": 15.027,
        "lat": 50.18354,
        "desc": "Vozidlo na alternativní pohon-Technické služby města Nymburka",
        "date": "2020-12-07",
        "price": "677 452,38"
    },
    {
        "name": "Technické služby Morkovice-Slížany s.r.o.",
        "lng": 17.21227,
        "lat": 49.25367,
        "desc": "Vysokorychlostní internet-Město Morkovice-Slížany",
        "date": "2020-08-11",
        "price": "492 500"
    },
    {
        "name": "Technické služby Žacléř, spol. s r.o.",
        "lng": 15.91116,
        "lat": 50.66568,
        "desc": "Vozidlo na alternativní pohon-Technické služby Žacléř, spol. s r.o.",
        "date": "2020-12-07",
        "price": "661 839,75"
    },
    {
        "name": "Václav Matějovský",
        "lng": 13.85172,
        "lat": 50.03411,
        "desc": "Mladý začínající zemědělec",
        "date": "2020-11-18",
        "price": "1 200 000"
    },
    {
        "name": "Vladimír Škvor",
        "lng": 14.80281,
        "lat": 49.80709,
        "desc": "Sdílení zemědělské techniky-Vladimír Škvor",
        "date": "2020-07-30",
        "price": "955 826,19"
    },
    {
        "name": "Agrolesy Chříč, s.r.o.",
        "lng": 14.42579,
        "lat": 50.08302,
        "desc": "Pořízení lesní techniky-Agrolesy Chříč, s.r.o.",
        "date": "2019-11-25",
        "price": "855 000"
    },
    {
        "name": "Bergasto a.s.",
        "lng": 17.25932,
        "lat": 49.58263,
        "desc": "Snížení emisí TZL-Bergasto s.r.o.",
        "date": "2019-07-15",
        "price": "605 837,92"
    },
    {
        "name": "BIO svoz s.r.o.",
        "lng": 17.05198,
        "lat": 49.68707,
        "desc": "Pořízení svozového vozidla- BIO svoz s.r.o.",
        "date": "2019-07-15",
        "price": "2 036 919,56"
    },
    {
        "name": "GYPSTREND s.r.o.",
        "lng": 18.03534,
        "lat": 49.99938,
        "desc": "Snížení energetické náročnosti pořízením technologického vybavení-GYPSTREND s.r.o.",
        "date": "2019-07-30",
        "price": "1 200 000"
    },
    {
        "name": "HANES s.r.o.",
        "lng": 14.28895,
        "lat": 50.06549,
        "desc": "SNÍŽENÍ ENERGETICKÉ NÁROČNOSTI OCELOVÉ HALY A ZDĚNÉ BUDOVY NA POZEMCÍCH PARC.Č. 1706 A 1707, KATASTRÁLNÍ ÚZEMÍ VOTICE",
        "date": "2019-07-30",
        "price": "2 841 999,99"
    },
    {
        "name": "Hynek Bošina",
        "lng": 13.30294,
        "lat": 50.48573,
        "desc": "Investice do nezemědělských činností-Hynek Bošina",
        "date": "2019-11-25",
        "price": "1 683 000"
    },
    {
        "name": "Jihoměstská majetková a.s.",
        "lng": 14.52109,
        "lat": 50.0249,
        "desc": "Pořízení vozidel na alternativní pohon-Jihoměstská majetková a.s.",
        "date": "2019-07-30",
        "price": "1 200 000"
    },
    {
        "name": "Josef Štiller",
        "lng": 13.64521,
        "lat": 49.97699,
        "desc": "Pořízení lesní techniky-Josef Štiller",
        "date": "2019-11-25",
        "price": "256 500"
    },
    {
        "name": "Kámen Hudčice, s.r.o.",
        "lng": 13.91817,
        "lat": 49.52798,
        "desc": "INSTALACE FOTOVOLTAICKÉHO SYSTÉMU, HUDČICE 74, 262 72 HUDČICE",
        "date": "2019-01-23",
        "price": "2 177 128,8"
    },
    {
        "name": "Konstrukce a dopravní stavby s.r.o.",
        "lng": 15.18153,
        "lat": 49.81241,
        "desc": "Modernizace strojního vybavení společnosti Konstrukce a dopravní stavby s.r.o. (provozovna Kolín)",
        "date": "2019-11-25",
        "price": "5 841 400"
    },
    {
        "name": "Matěj Dudek",
        "lng": 13.23109,
        "lat": 50.16562,
        "desc": "Investice do nezemědělských činností-Matěj Dudek",
        "date": "2019-11-26",
        "price": "854 100"
    },
    {
        "name": "Město Blšany",
        "lng": 13.47215,
        "lat": 50.21746,
        "desc": "Pořízení kompostérů-Město Blšany",
        "date": "2019-07-15",
        "price": "1 900 338,88"
    },
    {
        "name": "Město Červená Řečice",
        "lng": 15.18033,
        "lat": 49.51139,
        "desc": "Pořízení elektromobilu-Město Červená Řečice",
        "date": "2019-03-27",
        "price": "9 332 325"
    },
    {
        "name": "Město Holešov",
        "lng": 17.57655,
        "lat": 49.33994,
        "desc": "Podpora domácího kompostování-Město Holešov",
        "date": "2019-11-25",
        "price": "1 527 322,5"
    },
    {
        "name": "Město Morkovice-Slížany",
        "lng": 17.20694,
        "lat": 49.24734,
        "desc": "Polopodzemní kontejnery-Město Morkovice-Slížany",
        "date": "2019-06-03",
        "price": "1 360 705,5"
    },
    {
        "name": "Město Vroutek",
        "lng": 13.34462,
        "lat": 50.17615,
        "desc": "Pořízení kompostérů-Město Vroutek",
        "date": "2019-02-02",
        "price": "100 000"
    },
    {
        "name": "Městys Křivsoudov",
        "lng": 15.08708,
        "lat": 49.63114,
        "desc": "Pořízení DA pro Městys Křivsoudov",
        "date": "2019-08-23",
        "price": "8 383 554,71"
    },
    {
        "name": "Městys Šatov",
        "lng": 16.0151,
        "lat": 48.7919,
        "desc": "Rozšíření systému separace odpadů-Městys Šatov",
        "date": "2019-09-11",
        "price": "450 000"
    },
    {
        "name": "Obec Březina",
        "lng": 16.75818,
        "lat": 49.28241,
        "desc": "Vozidlo na alternativní pohon-obec Březina",
        "date": "2019-09-11",
        "price": "450 000"
    },
    {
        "name": "Obec Dobříč",
        "lng": 14.26063,
        "lat": 50.01383,
        "desc": "Rozšíření systému separace odpadů-obec Dobříč",
        "date": "2019-07-15",
        "price": "5 938 453,61"
    },
    {
        "name": "Obec Grygov",
        "lng": 17.30276,
        "lat": 49.52118,
        "desc": "Podpora domácího kompostování-obec Grygov",
        "date": "2019-11-25",
        "price": "4 270 000"
    },
    {
        "name": "Obec Jimlín",
        "lng": 13.75656,
        "lat": 50.32861,
        "desc": "Rozšíření sběru separovaných odpadů v obci Jimlín",
        "date": "2019-11-25",
        "price": "103 250"
    },
    {
        "name": "Obec Kondrac",
        "lng": 14.88804,
        "lat": 49.68009,
        "desc": "Pořízení DA pro JPO V-Obec Kondrac",
        "date": "2019-05-07",
        "price": "707 093,75"
    },
    {
        "name": "Obec Košťálov",
        "lng": 15.41449,
        "lat": 50.5793,
        "desc": "Pořízení DA pro jednotku SDH obce Košťálov kategorie JPO III\/1",
        "date": "2019-11-25",
        "price": "667 072,93"
    },
    {
        "name": "Obec Křečovice",
        "lng": 14.47272,
        "lat": 49.72732,
        "desc": "Pořízení DA pro JPO V-Obec Křečovice",
        "date": "2019-07-01",
        "price": "822 800"
    },
    {
        "name": "Obec Křížkový Újezdec",
        "lng": 14.59016,
        "lat": 49.93803,
        "desc": "Pořízení DA pro JPO V-obec Křížkový Újezdec",
        "date": "2019-05-21",
        "price": "300 000"
    },
    {
        "name": "Obec Kunice",
        "lng": 14.67539,
        "lat": 49.9274,
        "desc": "Podpora domácího kompostování-obec Kunice",
        "date": "2019-11-25",
        "price": "1 088 564,4"
    },
    {
        "name": "Obec Kyselovice",
        "lng": 17.40469,
        "lat": 49.3768,
        "desc": "Podpora domácího kompostování-obec Kyselovice",
        "date": "2019-10-14",
        "price": "37 199 747,7"
    },
    {
        "name": "Obec Ohrozim",
        "lng": 17.01665,
        "lat": 49.48713,
        "desc": "Pořízení elektromobilu-obec Ohrozim",
        "date": "2019-01-23",
        "price": "883 481,5"
    },
    {
        "name": "Obec Olomučany",
        "lng": 16.66886,
        "lat": 49.32915,
        "desc": "Rozšíření systému separace odpadů-obec Olomučany",
        "date": "2019-11-25",
        "price": "1 405 080"
    },
    {
        "name": "Obec Pernarec",
        "lng": 13.10011,
        "lat": 49.85791,
        "desc": "Podpora domácího kompostování-obec Pernarec",
        "date": "2019-11-25",
        "price": "877 619,05"
    },
    {
        "name": "Obec Petrohrad",
        "lng": 13.43833,
        "lat": 50.13799,
        "desc": "Pořízení kompostérů-Obec Petrohrad",
        "date": "2019-07-15",
        "price": "724 064"
    },
    {
        "name": "Obec Poříčany",
        "lng": 14.92241,
        "lat": 50.10828,
        "desc": "Rozšíření systému sběru separovaných odpadů-obec Poříčany",
        "date": "2019-12-02",
        "price": "480 126"
    },
    {
        "name": "Obec Sebranice",
        "lng": 16.57531,
        "lat": 49.4968,
        "desc": "Pořízení elektromobilu-obec Sebranice",
        "date": "2019-08-27",
        "price": "245 872"
    },
    {
        "name": "Obec Střílky",
        "lng": 17.21409,
        "lat": 49.13975,
        "desc": "Sběrné místo odpadů Střílky, parc. č. 311\/1, 311\/2",
        "date": "2019-07-15",
        "price": "610 929"
    },
    {
        "name": "Obec Šetějovice",
        "lng": 15.22607,
        "lat": 49.65105,
        "desc": "Pořízení DA pro JPO V-obec Šetějovice",
        "date": "2019-06-10",
        "price": "980 818,74"
    },
    {
        "name": "Obec Úlice",
        "lng": 13.15188,
        "lat": 49.77183,
        "desc": "Podpora domácího kompostování-obec Úlice",
        "date": "2019-05-27",
        "price": "6 800 340,35"
    },
    {
        "name": "Obec Velká Hleďsebe",
        "lng": 12.66786,
        "lat": 49.96063,
        "desc": "Podpora domácího kompostování-obec Velká Hleďsebe",
        "date": "2019-05-02",
        "price": "8 840 482,8"
    },
    {
        "name": "POZEMNÍ KOMUNIKACE BOHEMIA, a.s.",
        "lng": 14.12523,
        "lat": 50.12286,
        "desc": "Snížení prašnosti v areálu společnosti-POZEMNÍ KOMUNIKACE BOHEMIA, a.s.",
        "date": "2019-06-23",
        "price": "2 289 167,48"
    },
    {
        "name": "SLUMBI spol. s r.o.",
        "lng": 17.99748,
        "lat": 49.75965,
        "desc": "Rozšíření systému separace odpadů-SLUMBI spol. s r.o.",
        "date": "2019-11-22",
        "price": "500 000"
    },
    {
        "name": "Správa a údržba silnic Pardubického kraje",
        "lng": 15.97827,
        "lat": 50.07255,
        "desc": "Pořízení elektromobilů-Správa a údržba silnic Pardubického kraje",
        "date": "2019-06-23",
        "price": "623 036"
    },
    {
        "name": "Správa města Sezimovo Ústí",
        "lng": 14.68286,
        "lat": 49.38431,
        "desc": "Pořízení svozového vozidla na separované odpady-Správa města Sezimovo Ústí",
        "date": "2019-06-23",
        "price": "4 096 150"
    },
    {
        "name": "Statek Bošina s.r.o.",
        "lng": 13.30294,
        "lat": 50.48573,
        "desc": "Sdílení zařízení a zdrojů-Statek Bošina s.r.o.",
        "date": "2019-11-25",
        "price": "854 100"
    },
    {
        "name": "Svazek obcí Krašov",
        "lng": 13.05564,
        "lat": 49.926,
        "desc": "Podpora domácího kompostování-Svazek obcí Krašov",
        "date": "2019-04-05",
        "price": "1 900 000"
    },
    {
        "name": "Technické služby Bučovice, příspěvková organizace",
        "lng": 17.00321,
        "lat": 49.15014,
        "desc": "Podpora domácího kompostování-Technické služby Bučovice, příspěvková organizace",
        "date": "2019-11-25",
        "price": "639 212,75"
    },
    {
        "name": "Technické služby Kdyně",
        "lng": 13.03549,
        "lat": 49.39355,
        "desc": "Pořízení elektromobilu-Technické služby Kdyně",
        "date": "2019-05-28",
        "price": "882 453"
    },
    {
        "name": "Technické služby Lanškroun, s.r.o.",
        "lng": 16.60211,
        "lat": 49.90873,
        "desc": "Pořízení svozového vozidla-Technické služby Lanškroun, s.r.o.",
        "date": "2019-11-25",
        "price": "4 410 094,5"
    },
    {
        "name": "Tělovýchovná jednota Sokol Dobříč, z.s.",
        "lng": 13.47101,
        "lat": 49.8844,
        "desc": "Objekt šaten TJ Sokol Dobříč ",
        "date": "2019-09-11",
        "price": "450 000"
    },
    {
        "name": "TEP - AGRO spol. s r.o.",
        "lng": 13.85365,
        "lat": 50.71566,
        "desc": "Pořízení minipivovaru-TEP - AGRO spol. s r.o.",
        "date": "2019-11-25",
        "price": "854 550"
    },
    {
        "name": "VESIBA, s.r.o.",
        "lng": 14.60034,
        "lat": 50.11176,
        "desc": "Pořízení silniční frézy s integrovaným nivelačním systémem-VESIBA, s.r.o.",
        "date": "2019-11-19",
        "price": "728 504"
    },
    {
        "name": "VRAMAT CZ s.r.o.",
        "lng": 14.32207,
        "lat": 50.19071,
        "desc": "Snížení energetické náročnosti výměnou mobilního zařízení-VRAMAT CZ s.r.o.",
        "date": "2019-07-01",
        "price": "500 000"
    },
    {
        "name": "ZD Březina nad Jizerou, družstvo",
        "lng": 15.03319,
        "lat": 50.54884,
        "desc": "Snížení energetické náročnosti pořízením technologie-ZD Březina nad Jizerou, družstvo",
        "date": "2019-09-11",
        "price": "450 000"
    },
    {
        "name": "ZKP Kladno, s.r.o.",
        "lng": 14.08768,
        "lat": 50.16295,
        "desc": "Snížení energetické náročnosti pořízením technologie-ZKP Kladno, s.r.o. (areál Mělník)",
        "date": "2019-11-25",
        "price": "2 915 299,99"
    },
    {
        "name": "MADEX TRADING, s.r.o.",
        "lng": 14.49369,
        "lat": 49.98534,
        "desc": "Kovošrot Petrovice-snížení energetické náročnosti provozovny",
        "date": "2019-09-20",
        "price": "6 055 215,58"
    },
    {
        "name": "EKO - Unimed, s.r.o.",
        "lng": 17.07751,
        "lat": 49.79694,
        "desc": "Pořízení svozového vozidla a biopopelnic pro společnost EKO - Unimed, s.r.o.",
        "date": "2018-05-28",
        "price": "12 601 063,8"
    },
    {
        "name": "LB MINERALS, s.r.o.",
        "lng": 13.37444,
        "lat": 49.8516,
        "desc": "Pořízení filtrů pro snížení emisí-LB MINERALS, s.r.o.",
        "date": "2018-08-21",
        "price": "589 207,08"
    },
    {
        "name": "Lersen CZ,s.r.o.",
        "lng": 14.84718,
        "lat": 50.86165,
        "desc": "Technologická inovace ve společnosti Lersen CZ s.r.o.",
        "date": "2018-07-03",
        "price": "3 629 500"
    },
    {
        "name": "Město Aš",
        "lng": 12.22522,
        "lat": 50.22395,
        "desc": "Pořízení nádob na separované odpady-Město Aš",
        "date": "2018-04-06",
        "price": "431 706"
    },
    {
        "name": "Město Jáchymov",
        "lng": 12.90452,
        "lat": 50.37246,
        "desc": "Podpora domácího kompostování-Město Jáchymov",
        "date": "2018-11-09",
        "price": "600 000"
    },
    {
        "name": "Město Mariánské Lázně",
        "lng": 12.68489,
        "lat": 49.99235,
        "desc": "Nákup domácích kompostérů",
        "date": "2018-11-09",
        "price": "600 000"
    },
    {
        "name": "Městská zeleň Znojmo",
        "lng": 16.07477,
        "lat": 48.85506,
        "desc": "Pořízení elektrovozidel-Městská zeleň Znojmo",
        "date": "2018-10-22",
        "price": "450 000"
    },
    {
        "name": "Městys Luka nad Jihlavou",
        "lng": 15.70577,
        "lat": 49.37347,
        "desc": "Rozšíření sběrného dvora-Městys Luka nad Jihlavou",
        "date": "2018-08-21",
        "price": "743 841,02"
    },
    {
        "name": "Obec Bedihošť",
        "lng": 17.15623,
        "lat": 49.44508,
        "desc": "Pořízení elektromobilu-obec Bedihošť",
        "date": "2018-05-18",
        "price": "1 687 500"
    },
    {
        "name": "Obec Hostěrádky - Rešov",
        "lng": 16.77984,
        "lat": 49.12091,
        "desc": "Pořízení elektromobilu -obec Hostěrádky - Rešov",
        "date": "2018-05-30",
        "price": "300 000"
    },
    {
        "name": "Obec Hybrálec",
        "lng": 15.5476,
        "lat": 49.441143,
        "desc": "Pořízení kontejnerů s drtičem-Obec Hybrálec",
        "date": "2018-08-21",
        "price": "848 512,5"
    },
    {
        "name": "Obec Mostkovice",
        "lng": 17.04695,
        "lat": 49.47613,
        "desc": "Pořízení elektromobilu-obec Mostkovice",
        "date": "2018-11-09",
        "price": "600 000"
    },
    {
        "name": "Obec Říčany",
        "lng": 14.66071,
        "lat": 49.98725,
        "desc": "Pořízení elektromobilu-obec Říčany",
        "date": "2018-08-10",
        "price": "600 000"
    },
    {
        "name": "Obec Strašín",
        "lng": 13.65903,
        "lat": 49.17093,
        "desc": "Rozšíření sběru separovaných odpadů v obci Strašín",
        "date": "2018-02-26",
        "price": "100 000"
    },
    {
        "name": "SERVIS VINCENCI s.r.o.",
        "lng": 15.99167,
        "lat": 49.83656,
        "desc": "Fotovoltaická výrobna elektrické energie s akumulací, SERVIS VINCENCI s.r.o.",
        "date": "2018-07-03",
        "price": "4 479 500"
    },
    {
        "name": "Svozová s.r.o.",
        "lng": 17.12348,
        "lat": 49.77051,
        "desc": "Svoz a separace BRO- Svozová s.r.o.",
        "date": "2018-03-27",
        "price": "4 718 000"
    },
    {
        "name": "SWONIA, a.s.",
        "lng": 14.68399,
        "lat": 48.93436,
        "desc": "Pořízení minipivovaru-SWONIA, a.s.",
        "date": "2018-11-27",
        "price": "1 909 181,19"
    },
    {
        "name": "Technické služby města Morkovice-Slížany, příspěvková organizace",
        "lng": 17.21227,
        "lat": 49.25367,
        "desc": "Předcházení vzniku odpadů-Technické služby města Morkovice-Slížany, příspěvková organizace",
        "date": "2018-08-21",
        "price": "3 697 840"
    },
    {
        "name": "Technické služby města Nového Jičína, příspěvková organizace",
        "lng": 18.02409,
        "lat": 49.60492,
        "desc": "Pořízení elektromobilů-Technické služby města Nového Jičína, příspěvková organizace",
        "date": "2018-06-07",
        "price": "1 200 000"
    },
    {
        "name": "3K značky s.r.o.",
        "lng": 14.6588,
        "lat": 49.99288,
        "desc": "Pořízení vozidla s kontejnery na svoz bioodpadů-3K značky s.r.o.",
        "date": "2017-03-22",
        "price": "1 812 150"
    },
    {
        "name": "goodooga s.r.o.",
        "lng": 14.67115,
        "lat": 49.93611,
        "desc": "Modernizace portálu \"Nevyhazuj to\" v rámci předcházení vzniku odpadů ",
        "date": "2017-05-29",
        "price": "1 426 241,52"
    },
    {
        "name": "Jiří Vincenci",
        "lng": 15.99156,
        "lat": 49.83919,
        "desc": "Snížení energetické náročnosti budov STK Skuteč",
        "date": "2017-11-16",
        "price": "2 886 522,1"
    },
    {
        "name": "LP STAVBY s.r.o.",
        "lng": 13.44893,
        "lat": 50.49848,
        "desc": "Pořízení mobilní drtící a třídící jednotky s příslušenstvím pro společnost LP STAVBY s.r.o.",
        "date": "2017-09-01",
        "price": "17 200 194,3"
    },
    {
        "name": "MERKURIA CL s.r.o.",
        "lng": 14.40196,
        "lat": 50.0892,
        "desc": "Snížení energetické náročnosti budov p.č.5412\/16 a 5412\/19 v k.ú. Česká Lípa-MERKURIA CL s.r.o.",
        "date": "2017-11-13",
        "price": "320 000"
    },
    {
        "name": "Město Březová nad Svitavou",
        "lng": 16.51301,
        "lat": 49.65861,
        "desc": "Pořízení kompostérů a štěpkovače – Město Březová nad Svitavou",
        "date": "2017-05-10",
        "price": "6 418 630,35"
    },
    {
        "name": "Město Český Krumlov",
        "lng": 14.31127,
        "lat": 48.81581,
        "desc": "Rozšíření separace složek odpadů-Město Český Krumlov",
        "date": "2017-03-09",
        "price": "2 167 440,5"
    },
    {
        "name": "Město Hluk",
        "lng": 17.5272,
        "lat": 48.9886,
        "desc": "Podpora domácího kompostování-Město Hluk",
        "date": "2017-07-28",
        "price": "1 260 957,44"
    },
    {
        "name": "Město Proseč",
        "lng": 16.09839,
        "lat": 49.79269,
        "desc": "Pořízení požárního vozidla pro město Proseč",
        "date": "2017-06-13",
        "price": "2 208 230,3"
    },
    {
        "name": "Město Vimperk",
        "lng": 13.76102,
        "lat": 49.04912,
        "desc": "Rozšíření systému separace odpadů- město Vimperk",
        "date": "2017-06-27",
        "price": "927 593,86"
    },
    {
        "name": "Město Znojmo",
        "lng": 16.06332,
        "lat": 48.86212,
        "desc": "Rozšíření separace odpadů ve městě Znojmo",
        "date": "2017-05-29",
        "price": "577 667,31"
    },
    {
        "name": "Městys Doubravice nad Svitavou",
        "lng": 16.62977,
        "lat": 49.43616,
        "desc": "Pořízení kompostérů pro městys Doubravice nad Svitavou",
        "date": "2017-12-21",
        "price": "880 650,76"
    },
    {
        "name": "Městys Jimramov",
        "lng": 16.22574,
        "lat": 49.63737,
        "desc": "Sběrné místo-městys Jimramov",
        "date": "2017-06-10",
        "price": "857 563,3"
    },
    {
        "name": "Městys Protivanov",
        "lng": 16.83633,
        "lat": 49.48272,
        "desc": "Pořízení kompostérů pro městys Protivanov",
        "date": "2017-12-21",
        "price": "944 034,14"
    },
    {
        "name": "Mikroregion Miroslavsko",
        "lng": 16.31221,
        "lat": 48.94581,
        "desc": "Pořízení kompostérů pro mikroregion Miroslavsko",
        "date": "2017-06-10",
        "price": "3 367 686,4"
    },
    {
        "name": "Mikroregion Porta Bohemica",
        "lng": 14.07764,
        "lat": 50.55811,
        "desc": "Pořízení kompostérů a štěpkovačů pro Mikroregion Porta Bohemica",
        "date": "2017-06-13",
        "price": "1 265 004"
    },
    {
        "name": "MOP BRNO, spol. s r.o.",
        "lng": 16.53295,
        "lat": 49.19729,
        "desc": "Pořízení nosiče kontejnerů s kontejnery-MOP BRNO, spol. s r.o.",
        "date": "2017-07-18",
        "price": "1 016 775,1"
    },
    {
        "name": "Obec Babice nad Svitavou",
        "lng": 16.69709,
        "lat": 49.28509,
        "desc": "Pořízení nosiče kontejnerů a štěpkovače pro obec Babice nad Svitavou",
        "date": "2017-07-18",
        "price": "1 067 075,1"
    },
    {
        "name": "Obec Bělá nad Svitavou",
        "lng": 16.48494,
        "lat": 49.64287,
        "desc": "Rozšíření sběru separovaných odpadů v obci Bělá nad Svitavou",
        "date": "2017-03-14",
        "price": "234 963,47"
    },
    {
        "name": "Obec Čermná nad Orlicí",
        "lng": 16.15005,
        "lat": 50.07972,
        "desc": "Domácí kompostování-obec Čermná nad Orlicí",
        "date": "2017-12-21",
        "price": "865 277,05"
    },
    {
        "name": "Obec Dětkovice",
        "lng": 17.14138,
        "lat": 49.27413,
        "desc": "Domácí kompostování-obec Dětkovice",
        "date": "2017-07-28",
        "price": "2 752 117,89"
    },
    {
        "name": "Obec Chlebičov",
        "lng": 17.97734,
        "lat": 49.96221,
        "desc": "Svoz bioodpadů v obci Chlebičov",
        "date": "2017-07-18",
        "price": "925 650"
    },
    {
        "name": "Obec Chraštice",
        "lng": 14.0728,
        "lat": 49.57648,
        "desc": "Půdní vestavba ZŠ Chraštice",
        "date": "2017-05-31",
        "price": "11 111 966,87"
    },
    {
        "name": "Obec Jaroměřice",
        "lng": 16.76966,
        "lat": 49.62023,
        "desc": "Rozšíření sběrného dvora pro obec Jaroměřice",
        "date": "2017-06-13",
        "price": "3 943 197,94"
    },
    {
        "name": "Obec Jindřichovice pod Smrkem",
        "lng": 15.25588,
        "lat": 50.95739,
        "desc": "Pořízení DA pro JPO III obec Jindřichovice pod Smrkem",
        "date": "2017-03-13",
        "price": "1 334 993"
    },
    {
        "name": "Obec Kunčina",
        "lng": 16.61381,
        "lat": 49.7951,
        "desc": "Pořízení kompostérů, štěpkovače a kontejneru na textil-obec Kunčina",
        "date": "2017-12-21",
        "price": "777 011,18"
    },
    {
        "name": "Obec Liboš",
        "lng": 17.21628,
        "lat": 49.70041,
        "desc": "Pořízení kompostérů a štěpkovače pro obec Liboš",
        "date": "2017-12-21",
        "price": "637 605,79"
    },
    {
        "name": "Obec Lipovec",
        "lng": 16.80598,
        "lat": 49.38386,
        "desc": "Pořízení nosiče kontejnerů s kontejnery na bioodpad a štěpkovače obec Lipovec",
        "date": "2017-07-18",
        "price": "1 647 483,18"
    },
    {
        "name": "Obec Loket",
        "lng": 15.1348,
        "lat": 49.67025,
        "desc": "Rozšíření separace a stavební úpravy sběrných míst v obci Loket",
        "date": "2017-06-13",
        "price": "1 260 290,98"
    },
    {
        "name": "Obec Loukov",
        "lng": 17.72675,
        "lat": 49.41893,
        "desc": "Domácí kompostování-obec Loukov",
        "date": "2017-12-21",
        "price": "1 578 953,2"
    },
    {
        "name": "Obec Mašovice",
        "lng": 15.97802,
        "lat": 48.86087,
        "desc": "Pořízení nosiče kontejnerů s kontejnery a drtiče dřevní hmoty-obec Mašovice",
        "date": "2017-06-21",
        "price": "5 478 250"
    },
    {
        "name": "Obec Měrovice nad Hanou",
        "lng": 17.24987,
        "lat": 49.35272,
        "desc": "Pořízení kompostérů a drtiče dřevní hmoty pro obec Měrovice nad Hanou",
        "date": "2017-07-28",
        "price": "846 661,2"
    },
    {
        "name": "Obec Otaslavice",
        "lng": 17.0607,
        "lat": 49.38965,
        "desc": "Výstavba sběrného dvora pro obec Otaslavice",
        "date": "2017-03-14",
        "price": "804 948"
    },
    {
        "name": "Obec Plískov",
        "lng": 13.73458,
        "lat": 49.84604,
        "desc": "Podpora domácího kompostování-obec Plískov",
        "date": "2017-07-28",
        "price": "947 865,6"
    },
    {
        "name": "Obec Radějov",
        "lng": 17.36208,
        "lat": 48.84973,
        "desc": "Domácí kompostování-obec Radějov",
        "date": "2017-12-20",
        "price": "1 466 229,6"
    },
    {
        "name": "Obec Rudíkov",
        "lng": 15.93529,
        "lat": 49.28859,
        "desc": "Pořízení CAS pro JPO III obec Rudíkov",
        "date": "2017-06-10",
        "price": "1 857 471"
    },
    {
        "name": "Obec Soutice",
        "lng": 15.05104,
        "lat": 49.73178,
        "desc": "Pořízení kompostérů a štěpkovače pro obec Soutice",
        "date": "2017-07-18",
        "price": "808 885"
    },
    {
        "name": "Obec Troubelice",
        "lng": 17.07634,
        "lat": 49.81553,
        "desc": "Pořízení kompostérů se štěpkovačem-obec Troubelice",
        "date": "2017-12-21",
        "price": "619 300,99"
    },
    {
        "name": "Obec Určice",
        "lng": 17.08664,
        "lat": 49.42754,
        "desc": "Podpora domácího kompostování v obci Určice",
        "date": "2017-07-28",
        "price": "2 066 050,8"
    },
    {
        "name": "Obec Velké Hostěrádky",
        "lng": 16.8734,
        "lat": 49.04209,
        "desc": "Pořízení kompostérů pro obec Velké Hostěrádky",
        "date": "2017-07-28",
        "price": "2 071 604,7"
    },
    {
        "name": "Obec Velký Týnec",
        "lng": 17.32925,
        "lat": 49.55353,
        "desc": "Výstavba sběrného dvora obec Velký Týnec",
        "date": "2017-05-29",
        "price": "532 950"
    },
    {
        "name": "Obec Veverské Knínice",
        "lng": 16.40646,
        "lat": 49.23489,
        "desc": "Rozšíření separace odpadů v obci Veverské Knínice",
        "date": "2017-06-13",
        "price": "1 152 212,5"
    },
    {
        "name": "Obec Vranová Lhota",
        "lng": 16.81745,
        "lat": 49.7082,
        "desc": "Pořízení kompostérů a štěpkovače pro obec Vranová Lhota",
        "date": "2017-12-21",
        "price": "1 536 208,74"
    },
    {
        "name": "Obec Všelibice",
        "lng": 14.95714,
        "lat": 50.63237,
        "desc": "Půdní vestavba hasičské zbrojnice Všelibice",
        "date": "2017-03-13",
        "price": "2 069 382,8"
    },
    {
        "name": "Obec Zlobice",
        "lng": 17.3101,
        "lat": 49.29544,
        "desc": "Pořízení kompostérů a drtiče pro obec Zlobice",
        "date": "2017-12-20",
        "price": "1 360 705,5"
    },
    {
        "name": "Oldřich Poláček",
        "lng": 14.29282,
        "lat": 50.17096,
        "desc": "Výstavba homogenizační jednotky-Oldřich Poláček",
        "date": "2017-03-16",
        "price": "1 726 851,5"
    },
    {
        "name": "Petr Očenášek",
        "lng": 17.24053,
        "lat": 49.59011,
        "desc": "Náhrada technologie za účelem snížení emisí TZL Petr Očenášek",
        "date": "2017-03-08",
        "price": "3 487 803,75"
    },
    {
        "name": "ROSTĚNICE,a.s.",
        "lng": 16.95787,
        "lat": 49.24211,
        "desc": "Pořízení technologického vybavení pro společnost ROSTĚNICE,a.s.",
        "date": "2017-12-20",
        "price": "2 200 455,18"
    },
    {
        "name": "Služby Kunice spol. s r.o.",
        "lng": 14.67115,
        "lat": 49.93611,
        "desc": "Svoz bioodpadů v obci Kunice",
        "date": "2017-06-13",
        "price": "1 347 000"
    },
    {
        "name": "Služby města Králíky s.r.o.",
        "lng": 16.76264,
        "lat": 50.08176,
        "desc": "Pořízení kompostérů se štěpkovačem-Služby města  Králíky, s.r.o.",
        "date": "2017-12-21",
        "price": "1 525 545,25"
    },
    {
        "name": "SPETRA CZ s.r.o.",
        "lng": 18.53048,
        "lat": 49.71328,
        "desc": "Zachycení a odsávání plynů z mytí automobilových cisteren",
        "date": "2017-06-21",
        "price": "3 852 035,1"
    },
    {
        "name": "Technické služby Města Bystré s.r.o.",
        "lng": 16.3441,
        "lat": 49.62863,
        "desc": "Svoz bioodpadů -Technické služby Města Bystré s.r.o.",
        "date": "2017-02-27",
        "price": "2 499 255"
    },
    {
        "name": "Technické služby města Úvaly, příspěvková organizace",
        "lng": 14.7318,
        "lat": 50.07223,
        "desc": "Pořízení biopopelnic pro Technické služby města Úvaly",
        "date": "2017-06-10",
        "price": "4 428 482,15"
    },
    {
        "name": "Technické služby města Vítkova, příspěvková organizace",
        "lng": 17.75785,
        "lat": 49.78024,
        "desc": "Pořízení kompostérů a kontejneru na textil-Technické služby města Vítkova, příspěvková organizace",
        "date": "2017-12-21",
        "price": "637 402,59"
    },
    {
        "name": "Vodovody a kanalizace Havlíčkův Brod, a. s.",
        "lng": 15.59811,
        "lat": 49.60646,
        "desc": "Vodovod v k.ú Stupárovice a Golčův Jeníkov",
        "date": "2017-05-31",
        "price": "5 062 387,5"
    },
    {
        "name": "ZKJD-TECH s.r.o.",
        "lng": 17.05198,
        "lat": 49.68707,
        "desc": "Pořízení drticí jednotky pro společnost ZKJD-TECH s.r.o.",
        "date": "2017-05-30",
        "price": "2 520 993,11"
    },
    {
        "name": "ADOS CZ a.s.",
        "lng": 15.42275,
        "lat": 50.78233,
        "desc": "Pořízení stavebních technologií pro společnost ADOS CZ a.s.",
        "date": "2016-06-16",
        "price": "8 216 171"
    },
    {
        "name": "CONKLINE a.s.",
        "lng": 14.73514,
        "lat": 50.13048,
        "desc": "Modernizace technologie ve společnosti Conkline a.s.",
        "date": "2016-06-13",
        "price": "807 518,7"
    },
    {
        "name": "FREKOMOS, s.r.o.",
        "lng": 17.98337,
        "lat": 49.46753,
        "desc": "Pořízení silniční frézy s 3D nivelačním systémem-FREKOMOS, s.r.o.",
        "date": "2016-03-21",
        "price": "3 245 980"
    },
    {
        "name": "CHPS s.r.o.",
        "lng": 13.42122,
        "lat": 50.45634,
        "desc": "Pořízení technologií ke snížení emisí CHPS s.r.o.",
        "date": "2016-06-02",
        "price": "841 500"
    },
    {
        "name": "Ing. Jan Kotrba",
        "lng": 14.41136,
        "lat": 50.01304,
        "desc": "Pořízení technologií pro modernizaci výroby Ing. Jan Kotrba",
        "date": "2016-06-30",
        "price": "4 316 274,92"
    },
    {
        "name": "Ing. Josef Korhoň",
        "lng": 17.04304,
        "lat": 49.47189,
        "desc": "Vybavení kompostárny Ing. Josef Korhoň",
        "date": "2016-03-21",
        "price": "1 445 000"
    },
    {
        "name": "Lombard řezivo s.r.o.",
        "lng": 17.14375,
        "lat": 49.67943,
        "desc": "Pořízení výrobní technologie Lombard řezivo s.r.o.",
        "date": "2016-03-21",
        "price": "5 399 200"
    },
    {
        "name": "Město Velké Pavlovice",
        "lng": 16.83694,
        "lat": 48.9015,
        "desc": "Pořízení velkokapacitní CAS Město Velké Pavlovice",
        "date": "2016-06-27",
        "price": "7 688 088"
    },
    {
        "name": "Obec Herálec",
        "lng": 15.99115,
        "lat": 49.68868,
        "desc": "Svoz bioodpadu v obci Obec Herálec",
        "date": "2016-07-28",
        "price": "9 900 000"
    },
    {
        "name": "Obec Kobylí",
        "lng": 16.90216,
        "lat": 48.94409,
        "desc": "Pořízení hasičského vozidla pro obec Kobylí",
        "date": "2016-06-27",
        "price": "6 849 981"
    },
    {
        "name": "Obec Kostelní Myslová",
        "lng": 15.4285,
        "lat": 49.14795,
        "desc": "Svoz bioodpadu v obci Kostelní Myslová",
        "date": "2016-04-19",
        "price": "5 567 500"
    },
    {
        "name": "Obec Malé Žernoseky",
        "lng": 14.03879,
        "lat": 50.53874,
        "desc": "Pořízení nosiče kontejnerů s rozšířením svozových míst pro obec Malé Žernoseky",
        "date": "2016-11-30",
        "price": "247 500"
    },
    {
        "name": "Obec Věž",
        "lng": 15.44886,
        "lat": 49.57076,
        "desc": "Rozšíření svozu bioodpadu a separovaného odpadu v obci Věž",
        "date": "2016-04-19",
        "price": "6 265 622"
    },
    {
        "name": "R A N s.r.o.",
        "lng": 13.43461,
        "lat": 50.17966,
        "desc": "Modernizace technologie ve společnosti R A N s.r.o.",
        "date": "2016-03-07",
        "price": "1 836 000"
    },
    {
        "name": "Radek Matoušek",
        "lng": 14.34917,
        "lat": 50.46252,
        "desc": "Vybudování kompostárny Radek Matoušek",
        "date": "2016-05-04",
        "price": "57 807 830,62"
    },
    {
        "name": "Skládka pod Haldou s.r.o.",
        "lng": 16.06649,
        "lat": 50.51644,
        "desc": "Vybavení kompostárny Skládka pod Haldou s.r.o.",
        "date": "2016-03-21",
        "price": "3 444 549"
    },
    {
        "name": "Šárka Matušíková",
        "lng": 14.34917,
        "lat": 50.46252,
        "desc": "Vybudování kompostárny Šárka Matušíková",
        "date": "2016-05-04",
        "price": "17 561 549,29"
    },
    {
        "name": "Tomáš Krpálek",
        "lng": 15.50271,
        "lat": 49.51503,
        "desc": "Kompostárna Tomáš Krpálek",
        "date": "2016-06-08",
        "price": "2 340 000"
    },
    {
        "name": "ALMIPA plus s.r.o.",
        "lng": 17.21042,
        "lat": 48.97379,
        "desc": "Modernizace výroby společnosti ALMIPA plus s.r.o.",
        "date": "2015-11-23",
        "price": "5 152 500"
    },
    {
        "name": "Fullcom systems, s.r.o.",
        "lng": 18.26581,
        "lat": 49.83094,
        "desc": "Inovace informačního systému FIS",
        "date": "2015-10-26",
        "price": "5 250 000"
    },
    {
        "name": "Jan Krpálek",
        "lng": 15.50271,
        "lat": 49.51503,
        "desc": "Svoz a separace BRO Jan Krpálek",
        "date": "2015-04-16",
        "price": "1 958 940"
    },
    {
        "name": "Josef Mázdra",
        "lng": 13.94683,
        "lat": 49.55808,
        "desc": "Svoz a separace BRO v obci Březnice a okolí",
        "date": "2015-04-15",
        "price": "748 012"
    },
    {
        "name": "KENVI CZ s.r.o.",
        "lng": 16.27804,
        "lat": 50.15083,
        "desc": "Separace a systém svozu bioodpadů KENVI CZ s.r.o. ",
        "date": "2015-04-16",
        "price": "2 212 574"
    },
    {
        "name": "Král & Král s.r.o.",
        "lng": 14.58462,
        "lat": 49.93169,
        "desc": "Svoz bioodpadu Král&Král s.r.o.",
        "date": "2015-04-13",
        "price": "549 405"
    },
    {
        "name": "Loštická lesní s.r.o.",
        "lng": 16.92724,
        "lat": 49.74484,
        "desc": "Svozové vozidlo a kontejnery",
        "date": "2015-04-20",
        "price": "4 679 100"
    },
    {
        "name": "Město Kraslice",
        "lng": 12.51075,
        "lat": 50.32971,
        "desc": "Dětská hřiště a zahrady v přírodním stylu ve městě Kraslice",
        "date": "2015-04-16",
        "price": "720 103"
    },
    {
        "name": "Město Lomnice nad Lužnicí",
        "lng": 14.71915,
        "lat": 49.08317,
        "desc": "Svoz bioodpadů ve městě Lomnice nad Lužnicí",
        "date": "2015-04-16",
        "price": "4 585 500"
    },
    {
        "name": "Město Raspenava",
        "lng": 15.13755,
        "lat": 50.88841,
        "desc": "Pořízení zametacího stroje pro město Raspenava",
        "date": "2015-04-17",
        "price": "5 138 000"
    },
    {
        "name": "Město Rotava",
        "lng": 12.55806,
        "lat": 50.30149,
        "desc": "Svoz biologicky rozložitelného odpadu pro město Rotava",
        "date": "2015-04-16",
        "price": "2 286 900"
    },
    {
        "name": "Městská část Praha-Lysolaje",
        "lng": 14.37371,
        "lat": 50.12524,
        "desc": "Systém svozu bioodpadů v městské části Praha-Lysolaje",
        "date": "2015-04-16",
        "price": "1 569 362"
    },
    {
        "name": "Městské služby Vimperk, s.r.o.",
        "lng": 13.78494,
        "lat": 49.05701,
        "desc": "Systém svozu a separace bioodpadu Městské služby Vimperk, s.r.o. ",
        "date": "2015-04-16",
        "price": "2 079 000"
    },
    {
        "name": "Městys Bobrová",
        "lng": 16.11515,
        "lat": 49.47899,
        "desc": "Svoz BRO a vybavení kompostárny-městys Bobrová",
        "date": "2015-04-16",
        "price": "1 189 387"
    },
    {
        "name": "Městys Křižanov",
        "lng": 16.11062,
        "lat": 49.38848,
        "desc": "Svoz biologicky rozložitelných odpadů v městyse Křižanov",
        "date": "2015-04-16",
        "price": "7 890 819"
    },
    {
        "name": "Městys Vrchotovy Janovice",
        "lng": 14.57777,
        "lat": 49.66864,
        "desc": "Svoz bioodpadu- Městys Vrchotovy Janovice",
        "date": "2015-04-13",
        "price": "5 558 400"
    },
    {
        "name": "Obec Bílá",
        "lng": 18.45268,
        "lat": 49.45003,
        "desc": "Svoz bioodpadu v obci Bílá",
        "date": "2015-04-16",
        "price": "1 606 500"
    },
    {
        "name": "Obec Damnice",
        "lng": 16.36487,
        "lat": 48.91564,
        "desc": "Svoz a a separace biologicky rozložitelných odpadů v obci Damnice",
        "date": "2015-04-16",
        "price": "860 894"
    },
    {
        "name": "Obec Habrovany",
        "lng": 16.87875,
        "lat": 49.22806,
        "desc": "Vybavení kompostárny pro obec Habrovany",
        "date": "2015-04-16",
        "price": "1 092 420"
    },
    {
        "name": "Obec Hořice",
        "lng": 15.18611,
        "lat": 49.59811,
        "desc": "Svoz a separace BRO v obci Hořice",
        "date": "2015-04-13",
        "price": "5 472 000"
    },
    {
        "name": "Obec Hrádek",
        "lng": 16.26876,
        "lat": 48.77609,
        "desc": "Separace a svoz BRO v obci Hrádek",
        "date": "2015-04-16",
        "price": "4 276 503"
    },
    {
        "name": "Obec Mokrá - Horákov",
        "lng": 16.74194,
        "lat": 49.22134,
        "desc": "Systém separace a svozu bioodpadu v obci Mokrá-Horákov",
        "date": "2015-04-16",
        "price": "2 601 347"
    },
    {
        "name": "Obec Niva",
        "lng": 16.85141,
        "lat": 49.44531,
        "desc": "Pořízení kompostérů a štěpkovače v rámci likvidace BRO v obci Niva",
        "date": "2015-04-15",
        "price": "728 202"
    },
    {
        "name": "Obec Radostice",
        "lng": 16.47749,
        "lat": 49.13769,
        "desc": "Likvidace bioodpadů v obci Radostice",
        "date": "2015-04-16",
        "price": "4 719 600"
    },
    {
        "name": "Obec Senožaty",
        "lng": 15.21468,
        "lat": 49.56947,
        "desc": "Separace a svoz bioodpadů v obci Senožaty ",
        "date": "2015-04-15",
        "price": "2 285 212"
    },
    {
        "name": "Obec Slatiny",
        "lng": 15.38311,
        "lat": 50.37139,
        "desc": "Svoz bioodpadu v obci Slatiny",
        "date": "2015-04-16",
        "price": "1 436 400"
    },
    {
        "name": "Obec Suchohrdly u Miroslavi",
        "lng": 16.37604,
        "lat": 48.94971,
        "desc": "Separace a svoz bioodpadů v obci Suchohrdly u Miroslavi",
        "date": "2015-04-16",
        "price": "794 654"
    },
    {
        "name": "PS Plasty CZ, s.r.o.",
        "lng": 17.14507,
        "lat": 49.47138,
        "desc": "Modernizace technologie ve společnosti PS PLASTY CZ s.r.o.",
        "date": "2015-04-16",
        "price": "3 552 535"
    },
    {
        "name": "REPROGEN, a.s.",
        "lng": 14.70867,
        "lat": 49.35797,
        "desc": "Separace a svoz BRO-společnost REPROGEN, a.s.",
        "date": "2015-04-16",
        "price": "4 527 000"
    },
    {
        "name": "Služby ŠVARC s.r.o.",
        "lng": 17.63101,
        "lat": 49.56957,
        "desc": "Nákup čistící techniky",
        "date": "2015-04-16",
        "price": "1 454 058"
    },
    {
        "name": "STROJÍRNY Rumburk s.r.o.",
        "lng": 14.58054,
        "lat": 50.94291,
        "desc": "Multifunkční soustružnicko frézovací centrum",
        "date": "2015-10-22",
        "price": "4 050 000"
    },
    {
        "name": "T E S Český Dub, s.r.o.",
        "lng": 14.98004,
        "lat": 50.65892,
        "desc": "Systém separace a svozu BRO ve městě Český Dub",
        "date": "2015-04-17",
        "price": "2 233 530"
    },
    {
        "name": "TECHNICKÁ A LESNÍ SPRÁVA CHOTĚBOŘ s.r.o.",
        "lng": 15.68642,
        "lat": 49.71227,
        "desc": "Zefektivnění svozu bioodpadu ve městě Chotěboř",
        "date": "2015-04-16",
        "price": "3 759 726"
    },
    {
        "name": "Technické služby města Kraslic, příspěvková organizace",
        "lng": 12.52071,
        "lat": 50.34267,
        "desc": "Pořízení sběrných nádob město Kraslice",
        "date": "2015-11-12",
        "price": "29 250 000"
    },
    {
        "name": "TRADUCI COMPANY s.r.o.",
        "lng": 18.25045,
        "lat": 49.82715,
        "desc": "Svoz a separace BRO TRADUCI COMPANY s.r.o",
        "date": "2015-04-16",
        "price": "5 558 400"
    },
    {
        "name": "Václav Plesník",
        "lng": 14.05419,
        "lat": 50.53481,
        "desc": "Svoz bioodpadu a vybavení kompostárny Václav Plesník",
        "date": "2015-04-15",
        "price": "738 062"
    },
    {
        "name": "A3 PLAST s.r.o.",
        "lng": 16.23368,
        "lat": 50.13452,
        "desc": "Zařízení na zefektivnění odpadu",
        "date": "2014-03-31",
        "price": "5 082 300"
    },
    {
        "name": "ARBOR MORAVIA s.r.o.",
        "lng": 18.37317,
        "lat": 49.82651,
        "desc": "Nákup technologie za účelem snížení prašnosti",
        "date": "2014-06-30",
        "price": "2 116 242"
    },
    {
        "name": "ARIETE automotive s.r.o.",
        "lng": 14.90193,
        "lat": 50.41165,
        "desc": "Snížení prašnosti v Mladé Boleslavi",
        "date": "2014-07-01",
        "price": "3 142 124"
    },
    {
        "name": "AUTO HELUS s.r.o.",
        "lng": 13.38283,
        "lat": 49.75298,
        "desc": "Pořízení čistícího stroje pro AUTO HELUS s.r.o.",
        "date": "2014-07-01",
        "price": "1 998 693"
    },
    {
        "name": "AXA truck a.s.",
        "lng": 18.27007,
        "lat": 49.85985,
        "desc": "Pravidelná údržba areálu společnosti",
        "date": "2014-10-10",
        "price": "2 475 000"
    },
    {
        "name": "AZPO Group s.r.o.",
        "lng": 14.41911,
        "lat": 50.79677,
        "desc": "Modernizace technologie pro výrobu pleteného zboží",
        "date": "2014-08-01",
        "price": "7 000 000"
    },
    {
        "name": "Beskydské rehabilitační centrum, spol. s r.o.",
        "lng": 18.30538,
        "lat": 49.53931,
        "desc": "Snížení prašnosti v areálu Beskydského rehabilitačního centra",
        "date": "2014-11-21",
        "price": "1 320 685"
    },
    {
        "name": "BETON - Těšovice, spol. s r.o.",
        "lng": 14.0255,
        "lat": 49.04948,
        "desc": "Snížení imisní zátěže v BETON-Těšovice",
        "date": "2014-07-01",
        "price": "1 842 748"
    },
    {
        "name": "BEUS, s.r.o.",
        "lng": 14.28606,
        "lat": 50.43082,
        "desc": "Pořízení obráběcího centra",
        "date": "2014-03-31",
        "price": "5 062 500"
    },
    {
        "name": "Brickyard a.s.",
        "lng": 18.27007,
        "lat": 49.85985,
        "desc": "Pravidelná údržba komunikací společnosti Brickyard a.s.",
        "date": "2014-06-30",
        "price": "5 467 800"
    },
    {
        "name": "ČEMAT, s.r.o.",
        "lng": 14.58813,
        "lat": 50.03902,
        "desc": "Pravidelnou údržbou k čistšímu ovzduší",
        "date": "2014-06-30",
        "price": "2 163 600"
    },
    {
        "name": "Čistá MORAVA s.r.o.",
        "lng": 17.03685,
        "lat": 49.69581,
        "desc": "ČISTÁ MORAVA",
        "date": "2014-11-06",
        "price": "4 364 100"
    },
    {
        "name": "DrakaBag,s.r.o.",
        "lng": 17.83755,
        "lat": 49.67107,
        "desc": "Zefektivnění výroby společnosti DrakaBag, s.r.o.",
        "date": "2014-05-01",
        "price": "5 135 595"
    },
    {
        "name": "Družstvo ZAGRA",
        "lng": 18.04593,
        "lat": 49.8319,
        "desc": "Čisté komunikace",
        "date": "2014-11-18",
        "price": "2 350 425"
    },
    {
        "name": "EKOSTAVBY Louny s.r.o.",
        "lng": 13.81924,
        "lat": 50.34517,
        "desc": "Pořízení zametacího stroje",
        "date": "2014-11-05",
        "price": "3 959 100"
    },
    {
        "name": "FIORINI INTERNATIONAL Czech Republic, s.r.o.",
        "lng": 14.50804,
        "lat": 50.09918,
        "desc": "Snížení prašnosti v areálu FIORINI ve Vysočanech",
        "date": "2014-07-08",
        "price": "2 047 027"
    },
    {
        "name": "FRAMA CZ s.r.o.",
        "lng": 18.27591,
        "lat": 49.80218,
        "desc": "Pravidelná údržba areálových komunikací",
        "date": "2014-11-18",
        "price": "1 530 900"
    },
    {
        "name": "JUREX VOS s.r.o.",
        "lng": 14.16618,
        "lat": 49.31275,
        "desc": "Nákup zametacího stroje za účelem snížení prašnosti",
        "date": "2014-06-30",
        "price": "2 286 900"
    },
    {
        "name": "Kaiser servis, s.r.o.",
        "lng": 16.64492,
        "lat": 49.36829,
        "desc": "Zkvalitnění služeb společnosti Kaiser servis, spol. s r. o.",
        "date": "2014-07-01",
        "price": "2 515 590"
    },
    {
        "name": "KARE, Praha, s.r.o.",
        "lng": 14.47212,
        "lat": 50.05268,
        "desc": "Snížení prašnosti v areálu KARE, Praha",
        "date": "2014-11-18",
        "price": "1 616 711"
    },
    {
        "name": "KILDATRANS-CZ, spol. s r.o.",
        "lng": 16.54131,
        "lat": 49.17414,
        "desc": "Pořízení zametacího stroje",
        "date": "2014-07-01",
        "price": "20 594 592"
    },
    {
        "name": "KOKEŠ Steel Group s.r.o.",
        "lng": 18.0031,
        "lat": 49.93339,
        "desc": "Modernizace výroby společnosti KOKEŠ Steel Group s.r.o.",
        "date": "2014-07-01",
        "price": "5 129 100"
    },
    {
        "name": "Kompostárna Nasobůrky s.r.o.",
        "lng": 17.07565,
        "lat": 49.70102,
        "desc": "KOMPOSTÁRNA NASOBŮRKY",
        "date": "2014-08-14",
        "price": "4 750 000"
    },
    {
        "name": "KOMPOSTÁRNA NOR s.r.o.",
        "lng": 16.23368,
        "lat": 50.13452,
        "desc": "Kompostárna odpadu",
        "date": "2014-07-08",
        "price": "4 904 100"
    },
    {
        "name": "Komunální služby, s.r.o.,Jablonné nad Orlicí",
        "lng": 16.59276,
        "lat": 50.0214,
        "desc": "Další rozšíření nakládání s odpady",
        "date": "2014-09-09",
        "price": "1 600 000"
    },
    {
        "name": "Komwag, podnik čistoty a údržby města ,a.s.",
        "lng": 14.15754,
        "lat": 50.21548,
        "desc": "Systém odděleného sběru - Mníšecký region",
        "date": "2014-03-31",
        "price": "3 477 600"
    },
    {
        "name": "KR OSTRAVA a.s.",
        "lng": 18.32223,
        "lat": 49.82609,
        "desc": "Čistý firemní areál KR OSTRAVA a.s.",
        "date": "2014-07-01",
        "price": "1 842 748"
    },
    {
        "name": "LASON CZ s.r.o.",
        "lng": 18.26356,
        "lat": 49.81419,
        "desc": "Vybavení pracoviště pro povrchovou ochranu kovů",
        "date": "2014-11-18",
        "price": "6 300 000"
    },
    {
        "name": "Lesostavby Frýdek-Místek a. s.",
        "lng": 18.38089,
        "lat": 49.67649,
        "desc": "Pravidelná údržba areálu společnosti",
        "date": "2014-11-26",
        "price": "4 041 000"
    },
    {
        "name": "LORAS, spol.s r.o.",
        "lng": 17.0961,
        "lat": 49.3075,
        "desc": "Nákup technologie za účelem pravidelné údržby - LORAS, spol. s r.o.",
        "date": "2014-11-11",
        "price": "3 491 775"
    },
    {
        "name": "Martin Kolek s.r.o.",
        "lng": 18.50216,
        "lat": 49.89796,
        "desc": "Úklid areálu Martin Kolek s.r.o.",
        "date": "2014-09-16",
        "price": "1 627 000"
    },
    {
        "name": "Město Janské Lázně",
        "lng": 15.76881,
        "lat": 50.64518,
        "desc": "Pro Janské lázně vzduch čistý krásně",
        "date": "2014-06-30",
        "price": "2 609 600"
    },
    {
        "name": "Město Klimkovice",
        "lng": 18.12298,
        "lat": 49.78841,
        "desc": "Pořízení samosběrného vozu pro Město Klimkovice",
        "date": "2014-07-01",
        "price": "1 916 184"
    },
    {
        "name": "Město Mnichovice",
        "lng": 14.7102,
        "lat": 49.93562,
        "desc": "Zkvalitnění nakládání s odpady v Mnichovicích",
        "date": "2014-10-31",
        "price": "4 566 600"
    },
    {
        "name": "Město Staňkov",
        "lng": 13.08603,
        "lat": 49.55873,
        "desc": "Snížení imisní zátěže ve městě Staňkov",
        "date": "2014-08-14",
        "price": "11 813 880"
    },
    {
        "name": "Město Židlochovice",
        "lng": 16.62742,
        "lat": 49.03637,
        "desc": "Čistší město Židlochovice",
        "date": "2014-08-20",
        "price": "1 714 050"
    },
    {
        "name": "MĚSTSKÁ ČÁST PRAHA 16",
        "lng": 14.36197,
        "lat": 49.98205,
        "desc": "Zametený Radotín, vyčištěný od zplodin",
        "date": "2014-08-20",
        "price": "3 338 550"
    },
    {
        "name": "Městys Rataje nad Sázavou",
        "lng": 14.95778,
        "lat": 49.84224,
        "desc": "pořízení zametacího stroje",
        "date": "2014-06-30",
        "price": "1 822 500"
    },
    {
        "name": "Městys Senomaty",
        "lng": 13.65451,
        "lat": 50.09807,
        "desc": "Nákup zametacího stroje pro Senomaty",
        "date": "2014-03-31",
        "price": "5 076 000"
    },
    {
        "name": "Mikov,s.r.o.",
        "lng": 14.34985,
        "lat": 50.96891,
        "desc": "Modernizace hrotové brusky",
        "date": "2014-07-01",
        "price": "3 402 000"
    },
    {
        "name": "MPL KAUF spol. s r.o.",
        "lng": 18.24361,
        "lat": 49.83441,
        "desc": "Snížení prašnosti v areálu MPL KAUF",
        "date": "2014-08-01",
        "price": "1 606 500"
    },
    {
        "name": "NORPLAST s.r.o.",
        "lng": 16.23368,
        "lat": 50.13452,
        "desc": "Zefektivnění třídění odpadu",
        "date": "2014-07-01",
        "price": "3 779 100"
    },
    {
        "name": "Obec Brzánky",
        "lng": 14.31048,
        "lat": 50.46617,
        "desc": "Snížení imisní zátěže v obci Brzánky",
        "date": "2014-07-08",
        "price": "3 044 186"
    },
    {
        "name": "Obec Březník",
        "lng": 16.19,
        "lat": 49.17018,
        "desc": "Obec Březník - snížení prašnosti",
        "date": "2014-07-01",
        "price": "2 047 027"
    },
    {
        "name": "Obec Cetkovice",
        "lng": 16.72379,
        "lat": 49.58061,
        "desc": "Pravidelnou údržbou obce k čistšímu ovzduší",
        "date": "2014-07-01",
        "price": "5 467 800"
    },
    {
        "name": "Obec Hejná",
        "lng": 13.67292,
        "lat": 49.28552,
        "desc": "Snížení imisní zátěže v obci Hejná",
        "date": "2014-07-01",
        "price": "1 842 748"
    },
    {
        "name": "Obec Hněvkovice",
        "lng": 15.20746,
        "lat": 49.68896,
        "desc": "Uklizené ulice v obci Hněvkovice",
        "date": "2014-07-01",
        "price": "4 861 499"
    },
    {
        "name": "Obec Horní Heřmanice",
        "lng": 16.7054,
        "lat": 49.96054,
        "desc": "Čista hlavní silnice v obci Horní Heřmanice",
        "date": "2014-07-08",
        "price": "4 049 100"
    },
    {
        "name": "Obec Horní Němčí",
        "lng": 17.62337,
        "lat": 48.93482,
        "desc": "Pravidelnou údržbou komunikací v obci Horní Němčí k čistšímu",
        "date": "2014-08-12",
        "price": "56 000"
    },
    {
        "name": "Obec Hostěradice",
        "lng": 16.26075,
        "lat": 48.95797,
        "desc": "Čistá obec Hostěradice",
        "date": "2014-07-01",
        "price": "2 085 128"
    },
    {
        "name": "Obec Hrobčice",
        "lng": 13.81753,
        "lat": 50.52278,
        "desc": "Čisté a uklizené ulice v Hrobčicích",
        "date": "2014-08-01",
        "price": "2 172 555"
    },
    {
        "name": "Obec Javorník",
        "lng": 15.02656,
        "lat": 49.68717,
        "desc": "Čisté a zametené ulice v obci Javorník",
        "date": "2014-07-01",
        "price": "4 679 100"
    },
    {
        "name": "Obec Jesenice",
        "lng": 14.5305,
        "lat": 49.97462,
        "desc": "Pořízení zametacího stroje pro obec Jesenice",
        "date": "2014-11-06",
        "price": "1 050 883"
    },
    {
        "name": "Obec Kameničky",
        "lng": 15.97681,
        "lat": 49.73901,
        "desc": "Čisto na silnicích v obci Kameničky",
        "date": "2014-11-18",
        "price": "2 443 552"
    },
    {
        "name": "Obec Kamýk nad Vltavou",
        "lng": 14.24865,
        "lat": 49.65142,
        "desc": "Prach způsobený dopravou zameteme v Kamýku nad Vltavou",
        "date": "2014-11-06",
        "price": "1 966 099"
    },
    {
        "name": "Obec Korytná",
        "lng": 17.68139,
        "lat": 48.93386,
        "desc": "Redukce prašnosti mobilní technikou v obci Korytná",
        "date": "2014-11-10",
        "price": "2 870 862"
    },
    {
        "name": "Obec Krásný Dvůr",
        "lng": 13.35408,
        "lat": 50.25734,
        "desc": "Pořízení zametacího stroje pro obec Krásný Dvůr",
        "date": "2014-08-01",
        "price": "2 172 555"
    },
    {
        "name": "Obec Křešice",
        "lng": 14.21331,
        "lat": 50.52386,
        "desc": "Čisté a uklizené ulice v Křešicích",
        "date": "2014-07-08",
        "price": "1 551 728"
    },
    {
        "name": "Obec Lety",
        "lng": 14.08583,
        "lat": 49.51793,
        "desc": "Čisté silnice v obci Lety",
        "date": "2014-07-08",
        "price": "1 878 170"
    },
    {
        "name": "Obec Loděnice",
        "lng": 16.45198,
        "lat": 49.0125,
        "desc": "Obec Loděnice - Nákup techniky pro čistší silnice",
        "date": "2014-12-18",
        "price": "1 954 755"
    },
    {
        "name": "Obec Lužná",
        "lng": 13.78171,
        "lat": 50.13529,
        "desc": "Vybavení zařízení pro schromažďování odpadů v obci Lužná",
        "date": "2014-08-19",
        "price": "3 811 500"
    },
    {
        "name": "Obec Nikolčice",
        "lng": 16.73278,
        "lat": 49.01186,
        "desc": "Snížení prašnosti v obci Nikolčice",
        "date": "2014-11-25",
        "price": "1 875 830"
    },
    {
        "name": "Obec Onšov",
        "lng": 15.13885,
        "lat": 49.58277,
        "desc": "Snížení prašnosti v obci Onšov",
        "date": "2014-10-30",
        "price": "1 275 750"
    },
    {
        "name": "Obec Perštejn",
        "lng": 13.08106,
        "lat": 50.38932,
        "desc": "Zateplení ZŠ Perštejn",
        "date": "2014-08-14",
        "price": "6 000 000"
    },
    {
        "name": "Obec Přestavlky",
        "lng": 17.48108,
        "lat": 49.38963,
        "desc": "Pravidelná údržba obce",
        "date": "2014-07-01",
        "price": "1 287 761"
    },
    {
        "name": "Obec Roštění",
        "lng": 17.54289,
        "lat": 49.3702,
        "desc": "Pravidelná údržba obce Roštění",
        "date": "2014-07-01",
        "price": "1 795 500"
    },
    {
        "name": "Obec Smilovy Hory",
        "lng": 14.89976,
        "lat": 49.53495,
        "desc": "Čistší Smilovy Hory",
        "date": "2014-10-30",
        "price": "3 582 810"
    },
    {
        "name": "Obec Snět",
        "lng": 15.22544,
        "lat": 49.62889,
        "desc": "K čistému vzduchu v obci Snět",
        "date": "2014-08-20",
        "price": "1 050 883"
    },
    {
        "name": "Obec Srch",
        "lng": 15.75088,
        "lat": 50.08489,
        "desc": "Pro čistý vzduch v obci Srch",
        "date": "2014-08-20",
        "price": "3 426 534"
    },
    {
        "name": "Obec Stachy",
        "lng": 13.63914,
        "lat": 49.09846,
        "desc": "Čisté Stachy",
        "date": "2014-08-01",
        "price": "1 984 500"
    },
    {
        "name": "OBEC SULICE",
        "lng": 14.55639,
        "lat": 49.92733,
        "desc": "Nákup zametacího stroje pro obec Sulice",
        "date": "2014-08-21",
        "price": "2 655 000"
    },
    {
        "name": "Obec Tuchoměřice",
        "lng": 14.28283,
        "lat": 50.13277,
        "desc": "Obec Tuchoměřice – snížení prašnosti",
        "date": "2014-06-30",
        "price": "2 270 835"
    },
    {
        "name": "Obec Vilémov",
        "lng": 16.98657,
        "lat": 49.6374,
        "desc": "K čistšímu ovzduší v obci Vilémov",
        "date": "2014-03-04",
        "price": "5 750 000"
    },
    {
        "name": "Obec Zalužany",
        "lng": 14.09476,
        "lat": 49.54388,
        "desc": "Čisté a uklizené ulice v záložanech",
        "date": "2014-06-09",
        "price": "1 337 314"
    },
    {
        "name": "Pavel Švestka, s.r.o.",
        "lng": 14.21716,
        "lat": 50.01877,
        "desc": "Čistý firemní areál Pavel Švestka",
        "date": "2014-06-30",
        "price": "1 732 500"
    },
    {
        "name": "Poláček Farma Hole s.r.o.",
        "lng": 14.26499,
        "lat": 50.1773,
        "desc": "Nákup zametacího stroje",
        "date": "2014-10-30",
        "price": "7 425 000"
    },
    {
        "name": "Race Control s.r.o.",
        "lng": 14.48871,
        "lat": 50.10756,
        "desc": "Snížení imisní zátěže",
        "date": "2014-07-08",
        "price": "1 998 693"
    },
    {
        "name": "Reichle & De-Massari Czech Republic a.s.",
        "lng": 14.18911,
        "lat": 50.73339,
        "desc": "Výroba optických kabelů",
        "date": "2014-08-14",
        "price": "2 000 000"
    },
    {
        "name": "SÁRA Viktor s.r.o.",
        "lng": 18.27437,
        "lat": 49.65872,
        "desc": "Pravidelnou údržbou k čistšímu ovzduší",
        "date": "2014-07-01",
        "price": "1 633 473"
    },
    {
        "name": "Schwarzmüller s.r.o.",
        "lng": 13.8892,
        "lat": 49.8617,
        "desc": "Nákup zametacího stroje za účelem snížení prašnosti",
        "date": "2014-07-08",
        "price": "1 517 400"
    },
    {
        "name": "Silnice LK a.s.",
        "lng": 15.14709,
        "lat": 50.74413,
        "desc": "Snížení prašnosti z plošných zdrojů",
        "date": "2014-07-08",
        "price": "2 158 734"
    },
    {
        "name": "STAEG Facility, spol. s r.o.",
        "lng": 17.00613,
        "lat": 49.29485,
        "desc": "Nákup technologie za účelem pravidelné údržby - STAEG Facility, spol. s r.o.",
        "date": "2014-11-18",
        "price": "2 173 500"
    },
    {
        "name": "STASPO, spol. s r.o.",
        "lng": 18.33037,
        "lat": 49.8198,
        "desc": "Snížení emisní zátěže",
        "date": "2014-11-26",
        "price": "2 350 425"
    },
    {
        "name": "Stavitelství SIZO s.r.o.",
        "lng": 18.20561,
        "lat": 49.81372,
        "desc": "Úklid areálu v Ostravě-Michálkovicích",
        "date": "2014-07-01",
        "price": "1 842 748"
    },
    {
        "name": "STAVORENOL s.r.o.",
        "lng": 18.61763,
        "lat": 49.74609,
        "desc": "Pravidelnou údržbou k čistšímu ovzduší",
        "date": "2014-07-01",
        "price": "2 201 951"
    },
    {
        "name": "STUCO PRAHA spol. s r.o.",
        "lng": 14.49262,
        "lat": 50.11966,
        "desc": "Inovace výroby dřevěných briket - nákup briketovací linky včetně balení a manipulace",
        "date": "2014-03-31",
        "price": "1 933 600"
    },
    {
        "name": "Štůsek - DVB s.r.o.",
        "lng": 18.07955,
        "lat": 49.42269,
        "desc": "INOVACE PILAŘSKÉHO PROVOZU -  nákup pásové pily a třídicích linek",
        "date": "2014-07-08",
        "price": "2 201 501"
    },
    {
        "name": "TEBYT AŠ, s.r.o.",
        "lng": 12.18807,
        "lat": 50.2221,
        "desc": "Zkvalitnění nakládání s odpady ve městě Aš",
        "date": "2014-07-01",
        "price": "1 455 440"
    },
    {
        "name": "Technické služby Doubravčice s.r.o.",
        "lng": 14.79141,
        "lat": 50.02287,
        "desc": "Snížení prašnosti z plošných zdrojů",
        "date": "2014-07-01",
        "price": "877 124"
    },
    {
        "name": "Technické služby Kaplice spol.s.r.o.",
        "lng": 14.48501,
        "lat": 48.73587,
        "desc": "Čisté ulice ve městě Kaplice",
        "date": "2014-08-20",
        "price": "1 088 983"
    },
    {
        "name": "Technické služby Kralice, s.r.o.",
        "lng": 16.2009,
        "lat": 49.19984,
        "desc": "Redukce prašnosti mobilní technikou",
        "date": "2014-08-20",
        "price": "1 543 183"
    },
    {
        "name": "Technické služby města Jaroměře",
        "lng": 15.92907,
        "lat": 50.36108,
        "desc": "Snížení prašnosti z plošných zdrojů",
        "date": "2014-07-01",
        "price": "4 507 670"
    },
    {
        "name": "Technické služby Třeboň, s.r.o.",
        "lng": 14.75719,
        "lat": 49.01716,
        "desc": "Zameteme pro zdraví ve městě Třeboni",
        "date": "2014-07-08",
        "price": "1 407 500"
    },
    {
        "name": "Technické služby Týnec s.r.o.",
        "lng": 14.59974,
        "lat": 49.83412,
        "desc": "Nákup svozové techniky a kontajnerů",
        "date": "2014-07-08",
        "price": "3 024 000"
    },
    {
        "name": "Transbeton Bohemia, s.r.o.",
        "lng": 15.20242,
        "lat": 50.02689,
        "desc": "Snížení prašnosti v areálu Transbeton",
        "date": "2014-11-18",
        "price": "2 173 500"
    },
    {
        "name": "Trávníkářství s.r.o.",
        "lng": 13.46768,
        "lat": 50.21524,
        "desc": "Nákup zametacího stroje za účelem snížení prašnosti",
        "date": "2014-07-01",
        "price": "5 467 800"
    },
    {
        "name": "TS Ledeč nad Sázavou, s.r.o.",
        "lng": 15.27318,
        "lat": 49.7002,
        "desc": "Snížení prašnosti z plošných zdrojů",
        "date": "2014-07-01",
        "price": "2 164 370"
    },
    {
        "name": "Údržba silnic Karlovarského kraje, a.s.",
        "lng": 12.87203,
        "lat": 50.25068,
        "desc": "Čistší silnice v Karlovarském kraji",
        "date": "2014-07-08",
        "price": "1 943 100"
    },
    {
        "name": "Václav Kádner",
        "lng": 15.08271,
        "lat": 49.83367,
        "desc": "Rozvoj společnosti Václava Kádnera",
        "date": "2014-11-05",
        "price": "4 319 100"
    },
    {
        "name": "VAV elektronic, s.r.o.",
        "lng": 17.08072,
        "lat": 49.47038,
        "desc": "12048",
        "date": "2014-08-12",
        "price": "4 521 000"
    },
    {
        "name": "VÍTKOVICE ARÉNA, a.s.",
        "lng": 18.24809,
        "lat": 49.80363,
        "desc": "Čisto okolo arény ve Vítkovicích",
        "date": "2014-07-01",
        "price": "4 506 812"
    },
    {
        "name": "WASTE TRADE, s.r.o.",
        "lng": 14.41726,
        "lat": 50.06808,
        "desc": "Svoz papíru ALBA WASTE",
        "date": "2014-02-17",
        "price": "8 200 000"
    },
    {
        "name": "Albera Morava, s.r.o.",
        "lng": 17.71622,
        "lat": 48.88397,
        "desc": "Snížení energetické náročnosti objektů společnosti Albera Morava s. r. o",
        "date": "2013-05-30",
        "price": "2 024 000"
    },
    {
        "name": "Aluminium Group, a.s.",
        "lng": 16.73653,
        "lat": 49.41401,
        "desc": "12057",
        "date": "2013-05-30",
        "price": "3 465 000"
    },
    {
        "name": "BMS Servis, s.r.o.",
        "lng": 16.60185,
        "lat": 49.14305,
        "desc": "STAVEBNÍ ÚPRAVY OBJEKTU FIRMY  BMS SERVIS, S.R.O",
        "date": "2013-01-25",
        "price": "300 500"
    },
    {
        "name": "Elimo reality, s.r.o.",
        "lng": 18.35454,
        "lat": 49.68136,
        "desc": "STAVEBNÍ ÚPRAVY DOMU 1177",
        "date": "2013-03-30",
        "price": "1 272 102"
    },
    {
        "name": "JAW.cz s.r.o.",
        "lng": 14.22508,
        "lat": 50.77788,
        "desc": "12040",
        "date": "2013-05-30",
        "price": "2 129 400"
    },
    {
        "name": "Město Loštice",
        "lng": 16.92724,
        "lat": 49.74484,
        "desc": "Svoz bioodpadu Loštice a okolí",
        "date": "2013-06-30",
        "price": "3 564 540"
    },
    {
        "name": "Obec Horní Podluží",
        "lng": 14.55258,
        "lat": 50.88541,
        "desc": "Pořízení zametacího stroje pro obec Horní Podluží",
        "date": "2013-05-16",
        "price": "2 639 999"
    },
    {
        "name": "Obec Keblov",
        "lng": 15.07988,
        "lat": 49.67872,
        "desc": "Snížení prašnosti v obci Keblov",
        "date": "2013-05-30",
        "price": "2 090 707"
    },
    {
        "name": "Obec Klíčany",
        "lng": 14.4288,
        "lat": 50.20441,
        "desc": "Pořízení zametacího stroje pro obec Klíčany",
        "date": "2013-05-16",
        "price": "3 204 000"
    },
    {
        "name": "Obec Paseka",
        "lng": 17.23396,
        "lat": 49.80085,
        "desc": "Redukce prašnosti mobilní technikou v obci Paseka",
        "date": "2013-05-16",
        "price": "1 666 028"
    },
    {
        "name": "Obec Prace",
        "lng": 16.76532,
        "lat": 49.14106,
        "desc": "Redukce prašnosti mobilní technikou v obci Prace",
        "date": "2013-05-30",
        "price": "1 869 000"
    },
    {
        "name": "Obec Slavkov",
        "lng": 17.61186,
        "lat": 48.9457,
        "desc": "Pravidelnou údržbou komunikací v obci Slavkov k čistšímu ovzduší",
        "date": "2013-12-08",
        "price": "750 000"
    },
    {
        "name": "Obec Tochovice",
        "lng": 14.00141,
        "lat": 49.5976,
        "desc": "Pořízení zametacího stroje pro obec Tochovice",
        "date": "2013-05-14",
        "price": "1 872 985"
    },
    {
        "name": "Obec Zaječice",
        "lng": 15.88131,
        "lat": 49.90112,
        "desc": "Zametené Zaječice, lehkost pro vaše plíce",
        "date": "2013-05-15",
        "price": "1 714 500"
    },
    {
        "name": "Oderská městská společnost, s.r.o.",
        "lng": 17.83147,
        "lat": 49.66173,
        "desc": "Nákup čistící techniky",
        "date": "2013-11-08",
        "price": "3 640 000"
    },
    {
        "name": "Podještědský FC Český Dub",
        "lng": 14.99249,
        "lat": 50.65421,
        "desc": "ZATEPLENÍ OBJEKTU \"B\" SPRÁVNÍ BUDOVY PODJEŠTĚDSKÉHO SPORTOVNÍHO AREÁLU V ČESKÉM DUBU",
        "date": "2013-05-30",
        "price": "1 429 200"
    },
    {
        "name": "Podnik místního hospodářství v Hluboké nad Vltavou",
        "lng": 14.44595,
        "lat": 49.05509,
        "desc": "Snížení imisní zátěže v Hluboké nad Vltavou",
        "date": "2013-05-30",
        "price": "1 978 200"
    },
    {
        "name": "ProfiOdpady s.r.o.",
        "lng": 14.4799,
        "lat": 50.38283,
        "desc": "Vybavení sběrného dvora Mělník",
        "date": "2013-05-30",
        "price": "4 252 500"
    },
    {
        "name": "TANNACO Poděbrady s.r.o.",
        "lng": 15.11363,
        "lat": 50.13005,
        "desc": "Pořízení zametacího stroje",
        "date": "2013-05-30",
        "price": "4 725 000"
    },
    {
        "name": "Technické služby Hustopeče, s.r.o.",
        "lng": 16.72825,
        "lat": 48.93426,
        "desc": "Redukce prašnosti mobilní technikou",
        "date": "2013-05-30",
        "price": "3 360 000"
    },
    {
        "name": "Technické služby Praha - Radotín",
        "lng": 14.34398,
        "lat": 49.99254,
        "desc": "Vyčistíme účinně silnice v Radotíně",
        "date": "2013-05-16",
        "price": "3 644 229"
    },
    {
        "name": "AVE Ústí nad Labem s.r.o.",
        "lng": 14.0671,
        "lat": 50.66774,
        "desc": "Čištění ulic za lepším ovzduším",
        "date": "2012-04-11",
        "price": "4 819 199"
    },
    {
        "name": "DRÁTĚNÝ PROGRAM s.r.o.",
        "lng": 14.03346,
        "lat": 50.4039,
        "desc": "Rozvoj společnosti DRÁTĚNÝ PROGRAM s.r.o.",
        "date": "2012-06-30",
        "price": "4 754 326"
    },
    {
        "name": "Laremo, s.r.o.",
        "lng": 13.38037,
        "lat": 49.75311,
        "desc": "Laremo s.r.o. snižuje prašnost v obchodních areálech",
        "date": "2012-03-30",
        "price": "3 528 000"
    },
    {
        "name": "MČ Praha - Lochkov",
        "lng": 14.35325,
        "lat": 50.00171,
        "desc": "Čištění městské části strojní technologií",
        "date": "2012-03-30",
        "price": "1 710 429"
    },
    {
        "name": "Město Chabařovice",
        "lng": 13.93919,
        "lat": 50.66799,
        "desc": "Snížení prašnosti ve městě Chabařovice",
        "date": "2012-03-30",
        "price": "3 642 818"
    },
    {
        "name": "Město Ivanovice na Hané",
        "lng": 17.10348,
        "lat": 49.31639,
        "desc": "Zdravé město Ivanovice na Hané",
        "date": "2012-03-28",
        "price": "1 890 000"
    },
    {
        "name": "Město Štramberk",
        "lng": 18.11352,
        "lat": 49.5869,
        "desc": "Čistší Štramberk",
        "date": "2012-03-30",
        "price": "3 780 000"
    },
    {
        "name": "Město Valtice",
        "lng": 16.75579,
        "lat": 48.74302,
        "desc": "Snížení prašnosti z plošných zdrojů v obci Valtice",
        "date": "2012-04-16",
        "price": "1 773 957"
    },
    {
        "name": "Městská Část Praha - Štěrboholy",
        "lng": 14.54959,
        "lat": 50.07141,
        "desc": "Zameteme ve Štěrboholech po prášících automobilech",
        "date": "2012-03-30",
        "price": "3 780 000"
    },
    {
        "name": "obec Horní Maršov",
        "lng": 15.82009,
        "lat": 50.66087,
        "desc": "Snížení prašnosti v Horním Maršově",
        "date": "2012-03-30",
        "price": "2 374 299"
    },
    {
        "name": "Obec Jirny",
        "lng": 14.69947,
        "lat": 50.11531,
        "desc": "Snížení imisní zátěže v obci Jirny",
        "date": "2012-04-16",
        "price": "2 969 999"
    },
    {
        "name": "Obec Letonice",
        "lng": 16.96359,
        "lat": 49.18258,
        "desc": "Čisté Letonice",
        "date": "2012-03-28",
        "price": "1 696 000"
    },
    {
        "name": "Obec Nivnice",
        "lng": 17.63934,
        "lat": 48.97699,
        "desc": "Čisté silnice, čisté Nivnice",
        "date": "2012-03-28",
        "price": "3 336 000"
    },
    {
        "name": "Obec Starovičky",
        "lng": 16.76975,
        "lat": 48.91191,
        "desc": "Čisté ovzduší v obci Starovičky",
        "date": "2012-03-30",
        "price": "5 040 000"
    },
    {
        "name": "Obec Vrbice",
        "lng": 16.89144,
        "lat": 48.91305,
        "desc": "Čisté silnice v obci Vrbice",
        "date": "2012-03-30",
        "price": "3 496 500"
    },
    {
        "name": "Obec Zbraslav",
        "lng": 16.29382,
        "lat": 49.2215,
        "desc": "Zametáme pro zdraví u Brna ve Zbraslavi",
        "date": "2012-03-30",
        "price": "2 730 000"
    },
    {
        "name": "Obec Zbůch",
        "lng": 13.23367,
        "lat": 49.68194,
        "desc": "Snížení prašnosti ve Zbůchu",
        "date": "2012-03-28",
        "price": "5 477 285"
    },
    {
        "name": "Odolena Voda",
        "lng": 14.41748,
        "lat": 50.23905,
        "desc": "Redukce imisní zátěže ve městě Odolena Voda",
        "date": "2012-03-30",
        "price": "4 410 000"
    },
    {
        "name": "Region povodí Mratínského potoka",
        "lng": 14.51966,
        "lat": 50.19891,
        "desc": "Nákup zametacího stroje pro Region Povodí Mratínského potoka",
        "date": "2012-03-30",
        "price": "5 033 700"
    },
    {
        "name": "Sdružení Povodí Sedlnice, dobrovolný svazek obcí",
        "lng": 18.10272,
        "lat": 49.61293,
        "desc": "Čistící technikou k lepšímu ovzduší v mikroregionu",
        "date": "2012-04-03",
        "price": "2 803 499"
    },
    {
        "name": "Sekos Morava a.s.",
        "lng": 18.29427,
        "lat": 49.79201,
        "desc": "Snížení imisní zátěže pořízením čistící techniky",
        "date": "2012-03-30",
        "price": "1 696 000"
    },
    {
        "name": "SILNICE MORAVA s.r.o.",
        "lng": 17.69448,
        "lat": 50.08901,
        "desc": "Pravidelnou údržbou k čistšímu ovzduší",
        "date": "2012-03-30",
        "price": "1 847 249"
    },
    {
        "name": "Stora Enso Wood Products Ždírec s.r.o.",
        "lng": 15.80938,
        "lat": 49.69949,
        "desc": "Snížení prašnosti v areálu společnosti Stora Enso ve Ždírci",
        "date": "2012-03-30",
        "price": "5 712 761"
    },
    {
        "name": "Sušické lesy a služby, s.r.o.",
        "lng": 13.51428,
        "lat": 49.22826,
        "desc": "Snížení prašnosti v městě Sušice a okolí",
        "date": "2012-03-30",
        "price": "3 360 000"
    },
    {
        "name": "TECHart systems, s.r.o.",
        "lng": 14.97715,
        "lat": 50.00106,
        "desc": "Tvorba nového SW řešení a aplikace",
        "date": "2012-03-30",
        "price": "2 021 500"
    },
    {
        "name": "Technické služby Hostivice",
        "lng": 14.26026,
        "lat": 50.08219,
        "desc": "Technické služby Hostivice snižují prašné imise",
        "date": "2012-03-30",
        "price": "1 884 999"
    },
    {
        "name": "TESMA Jaroměřice s.r.o.",
        "lng": 15.86884,
        "lat": 49.09394,
        "desc": "Nákup čistící techniky",
        "date": "2012-03-30",
        "price": "3 964 275"
    },
    {
        "name": "TREND ABC, s.r.o.",
        "lng": 17.53042,
        "lat": 48.98365,
        "desc": "Čisté komunikace - čistší ovzduší",
        "date": "2012-03-30",
        "price": "3 916 199"
    },
    {
        "name": "USK, s.r.o.",
        "lng": 14.89469,
        "lat": 50.40472,
        "desc": "Čisté silniční komunikace",
        "date": "2012-03-30",
        "price": "2 376 666"
    },
    {
        "name": "Zahradnictví Mijana, s.r.o.",
        "lng": 14.7371,
        "lat": 50.65675,
        "desc": "Mimoň - čištění komunikací",
        "date": "2012-03-30",
        "price": "3 780 000"
    },
    {
        "name": "Zámecký dvůr s.r.o.",
        "lng": 18.44312,
        "lat": 49.76379,
        "desc": "Snížení prašnosti",
        "date": "2012-02-21",
        "price": "365 000"
    }
];


/***/ }),

/***/ "./Resources/Scripts/navigation.ts":
/*!*****************************************!*\
  !*** ./Resources/Scripts/navigation.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initNav = void 0;
const menuBtn = document.getElementById('menuBtn');
const menu = document.querySelector('.nav__menu');
const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('.nav__item');
const htmlDoc = document.querySelector('body');
function toggleOpenMenuClasses() {
    menuBtn.classList.toggle('burger--open');
    menu.classList.toggle('nav__menu--open');
    nav.classList.toggle('nav--open');
    htmlDoc.classList.toggle('overflow-hidden');
}
function initNav() {
    menuBtn.addEventListener('click', () => {
        toggleOpenMenuClasses();
    });
    navItems.forEach(navItems => {
        navItems.addEventListener('click', () => {
            toggleOpenMenuClasses();
        });
    });
}
exports.initNav = initNav;


/***/ }),

/***/ "./Resources/Scripts/year.ts":
/*!***********************************!*\
  !*** ./Resources/Scripts/year.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setCurentYear = void 0;
function setCurentYear() {
    const years = document.querySelectorAll('time.year');
    years.forEach(year => {
        year.innerHTML = new Date().getFullYear().toString();
    });
}
exports.setCurentYear = setCurentYear;


/***/ }),

/***/ "./node_modules/@turf/clone/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@turf/clone/dist/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @name clone
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = turf.clone(line);
 */
function clone(geojson) {
    if (!geojson) {
        throw new Error("geojson is required");
    }
    switch (geojson.type) {
        case "Feature":
            return cloneFeature(geojson);
        case "FeatureCollection":
            return cloneFeatureCollection(geojson);
        case "Point":
        case "LineString":
        case "Polygon":
        case "MultiPoint":
        case "MultiLineString":
        case "MultiPolygon":
        case "GeometryCollection":
            return cloneGeometry(geojson);
        default:
            throw new Error("unknown GeoJSON type");
    }
}
/**
 * Clone Feature
 *
 * @private
 * @param {Feature<any>} geojson GeoJSON Feature
 * @returns {Feature<any>} cloned Feature
 */
function cloneFeature(geojson) {
    var cloned = { type: "Feature" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "properties":
            case "geometry":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add properties & geometry last
    cloned.properties = cloneProperties(geojson.properties);
    cloned.geometry = cloneGeometry(geojson.geometry);
    return cloned;
}
/**
 * Clone Properties
 *
 * @private
 * @param {Object} properties GeoJSON Properties
 * @returns {Object} cloned Properties
 */
function cloneProperties(properties) {
    var cloned = {};
    if (!properties) {
        return cloned;
    }
    Object.keys(properties).forEach(function (key) {
        var value = properties[key];
        if (typeof value === "object") {
            if (value === null) {
                // handle null
                cloned[key] = null;
            }
            else if (Array.isArray(value)) {
                // handle Array
                cloned[key] = value.map(function (item) {
                    return item;
                });
            }
            else {
                // handle generic Object
                cloned[key] = cloneProperties(value);
            }
        }
        else {
            cloned[key] = value;
        }
    });
    return cloned;
}
/**
 * Clone Feature Collection
 *
 * @private
 * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
 * @returns {FeatureCollection<any>} cloned Feature Collection
 */
function cloneFeatureCollection(geojson) {
    var cloned = { type: "FeatureCollection" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "features":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add features
    cloned.features = geojson.features.map(function (feature) {
        return cloneFeature(feature);
    });
    return cloned;
}
/**
 * Clone Geometry
 *
 * @private
 * @param {Geometry<any>} geometry GeoJSON Geometry
 * @returns {Geometry<any>} cloned Geometry
 */
function cloneGeometry(geometry) {
    var geom = { type: geometry.type };
    if (geometry.bbox) {
        geom.bbox = geometry.bbox;
    }
    if (geometry.type === "GeometryCollection") {
        geom.geometries = geometry.geometries.map(function (g) {
            return cloneGeometry(g);
        });
        return geom;
    }
    geom.coordinates = deepSlice(geometry.coordinates);
    return geom;
}
/**
 * Deep Slice coordinates
 *
 * @private
 * @param {Coordinates} coords Coordinates
 * @returns {Coordinates} all coordinates sliced
 */
function deepSlice(coords) {
    var cloned = coords;
    if (typeof cloned[0] !== "object") {
        return cloned.slice();
    }
    return cloned.map(function (coord) {
        return deepSlice(coord);
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clone);


/***/ }),

/***/ "./node_modules/@turf/clusters-dbscan/dist/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/clusters-dbscan/dist/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/clone */ "./node_modules/@turf/clone/dist/es/index.js");
/* harmony import */ var _turf_distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/distance */ "./node_modules/@turf/distance/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var density_clustering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! density-clustering */ "./node_modules/density-clustering/lib/index.js");





/**
 * Takes a set of {@link Point|points} and partition them into clusters according to {@link DBSCAN's|https://en.wikipedia.org/wiki/DBSCAN} data clustering algorithm.
 *
 * @name clustersDbscan
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {number} maxDistance Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mutate=false] Allows GeoJSON input to be mutated
 * @param {number} [options.minPoints=3] Minimum number of points to generate a single cluster,
 * points which do not meet this requirement will be classified as an 'edge' or 'noise'.
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersDbscan(points, maxDistance, options) {
    // Input validation being handled by Typescript
    // collectionOf(points, 'Point', 'points must consist of a FeatureCollection of only Points');
    // if (maxDistance === null || maxDistance === undefined) throw new Error('maxDistance is required');
    // if (!(Math.sign(maxDistance) > 0)) throw new Error('maxDistance is invalid');
    // if (!(minPoints === undefined || minPoints === null || Math.sign(minPoints) > 0)) throw new Error('options.minPoints is invalid');
    if (options === void 0) { options = {}; }
    // Clone points to prevent any mutations
    if (options.mutate !== true)
        points = (0,_turf_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(points);
    // Defaults
    options.minPoints = options.minPoints || 3;
    // create clustered ids
    var dbscan = new density_clustering__WEBPACK_IMPORTED_MODULE_4__.DBSCAN();
    var clusteredIds = dbscan.run((0,_turf_meta__WEBPACK_IMPORTED_MODULE_2__.coordAll)(points), (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_3__.convertLength)(maxDistance, options.units), options.minPoints, _turf_distance__WEBPACK_IMPORTED_MODULE_1__["default"]);
    // Tag points to Clusters ID
    var clusterId = -1;
    clusteredIds.forEach(function (clusterIds) {
        clusterId++;
        // assign cluster ids to input points
        clusterIds.forEach(function (idx) {
            var clusterPoint = points.features[idx];
            if (!clusterPoint.properties)
                clusterPoint.properties = {};
            clusterPoint.properties.cluster = clusterId;
            clusterPoint.properties.dbscan = "core";
        });
    });
    // handle noise points, if any
    // edges points are tagged by DBSCAN as both 'noise' and 'cluster' as they can "reach" less than 'minPoints' number of points
    dbscan.noise.forEach(function (noiseId) {
        var noisePoint = points.features[noiseId];
        if (!noisePoint.properties)
            noisePoint.properties = {};
        if (noisePoint.properties.cluster)
            noisePoint.properties.dbscan = "edge";
        else
            noisePoint.properties.dbscan = "noise";
    });
    return points;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clustersDbscan);


/***/ }),

/***/ "./node_modules/@turf/clusters-kmeans/dist/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/clusters-kmeans/dist/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/clone */ "./node_modules/@turf/clone/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var skmeans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! skmeans */ "./node_modules/skmeans/dist/node/main.js");



/**
 * Takes a set of {@link Point|points} and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @name clustersKmeans
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.numberOfClusters=Math.sqrt(numberOfPoints/2)] numberOfClusters that will be generated
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = turf.clustersKmeans(points, options);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersKmeans(points, options) {
    if (options === void 0) { options = {}; }
    // Default Params
    var count = points.features.length;
    options.numberOfClusters =
        options.numberOfClusters || Math.round(Math.sqrt(count / 2));
    // numberOfClusters can't be greater than the number of points
    // fallbacks to count
    if (options.numberOfClusters > count)
        options.numberOfClusters = count;
    // Clone points to prevent any mutations (enabled by default)
    if (options.mutate !== true)
        points = (0,_turf_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(points);
    // collect points coordinates
    var data = (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.coordAll)(points);
    // create seed to avoid skmeans to drift
    var initialCentroids = data.slice(0, options.numberOfClusters);
    // create skmeans clusters
    var skmeansResult = skmeans__WEBPACK_IMPORTED_MODULE_2__(data, options.numberOfClusters, initialCentroids);
    // store centroids {clusterId: [number, number]}
    var centroids = {};
    skmeansResult.centroids.forEach(function (coord, idx) {
        centroids[idx] = coord;
    });
    // add associated cluster number
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.featureEach)(points, function (point, index) {
        var clusterId = skmeansResult.idxs[index];
        point.properties.cluster = clusterId;
        point.properties.centroid = centroids[clusterId];
    });
    return points;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clustersKmeans);


/***/ }),

/***/ "./node_modules/@turf/distance/dist/es/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@turf/distance/dist/es/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");


//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
/**
 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @name distance
 * @param {Coord | Point} from origin point or coordinate
 * @param {Coord | Point} to destination point or coordinate
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.distance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
    if (options === void 0) { options = {}; }
    var coordinates1 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getCoord)(from);
    var coordinates2 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getCoord)(to);
    var dLat = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[1] - coordinates1[1]);
    var dLon = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[0] - coordinates1[0]);
    var lat1 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates1[1]);
    var lat2 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[1]);
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.radiansToLength)(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (distance);


/***/ }),

/***/ "./node_modules/@turf/helpers/dist/es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@turf/helpers/dist/es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "earthRadius": () => (/* binding */ earthRadius),
/* harmony export */   "factors": () => (/* binding */ factors),
/* harmony export */   "unitsFactors": () => (/* binding */ unitsFactors),
/* harmony export */   "areaFactors": () => (/* binding */ areaFactors),
/* harmony export */   "feature": () => (/* binding */ feature),
/* harmony export */   "geometry": () => (/* binding */ geometry),
/* harmony export */   "point": () => (/* binding */ point),
/* harmony export */   "points": () => (/* binding */ points),
/* harmony export */   "polygon": () => (/* binding */ polygon),
/* harmony export */   "polygons": () => (/* binding */ polygons),
/* harmony export */   "lineString": () => (/* binding */ lineString),
/* harmony export */   "lineStrings": () => (/* binding */ lineStrings),
/* harmony export */   "featureCollection": () => (/* binding */ featureCollection),
/* harmony export */   "multiLineString": () => (/* binding */ multiLineString),
/* harmony export */   "multiPoint": () => (/* binding */ multiPoint),
/* harmony export */   "multiPolygon": () => (/* binding */ multiPolygon),
/* harmony export */   "geometryCollection": () => (/* binding */ geometryCollection),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "radiansToLength": () => (/* binding */ radiansToLength),
/* harmony export */   "lengthToRadians": () => (/* binding */ lengthToRadians),
/* harmony export */   "lengthToDegrees": () => (/* binding */ lengthToDegrees),
/* harmony export */   "bearingToAzimuth": () => (/* binding */ bearingToAzimuth),
/* harmony export */   "radiansToDegrees": () => (/* binding */ radiansToDegrees),
/* harmony export */   "degreesToRadians": () => (/* binding */ degreesToRadians),
/* harmony export */   "convertLength": () => (/* binding */ convertLength),
/* harmony export */   "convertArea": () => (/* binding */ convertArea),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "validateBBox": () => (/* binding */ validateBBox),
/* harmony export */   "validateId": () => (/* binding */ validateId)
/* harmony export */ });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius * 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / earthRadius,
    yards: 1.0936133,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}


/***/ }),

/***/ "./node_modules/@turf/invariant/dist/es/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@turf/invariant/dist/es/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoord": () => (/* binding */ getCoord),
/* harmony export */   "getCoords": () => (/* binding */ getCoords),
/* harmony export */   "containsNumber": () => (/* binding */ containsNumber),
/* harmony export */   "geojsonType": () => (/* binding */ geojsonType),
/* harmony export */   "featureOf": () => (/* binding */ featureOf),
/* harmony export */   "collectionOf": () => (/* binding */ collectionOf),
/* harmony export */   "getGeom": () => (/* binding */ getGeom),
/* harmony export */   "getType": () => (/* binding */ getType)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" &&
            coord.geometry !== null &&
            coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) &&
        coord.length >= 2 &&
        !Array.isArray(coord[0]) &&
        !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[0]) &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            value.type);
    }
}
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            feature.geometry.type);
    }
}
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " +
                name +
                ": must be a " +
                type +
                ", given " +
                feature.geometry.type);
        }
    }
}
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message (unused)
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, _name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}


/***/ }),

/***/ "./node_modules/@turf/meta/dist/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/meta/dist/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coordAll": () => (/* binding */ coordAll),
/* harmony export */   "coordEach": () => (/* binding */ coordEach),
/* harmony export */   "coordReduce": () => (/* binding */ coordReduce),
/* harmony export */   "featureEach": () => (/* binding */ featureEach),
/* harmony export */   "featureReduce": () => (/* binding */ featureReduce),
/* harmony export */   "findPoint": () => (/* binding */ findPoint),
/* harmony export */   "findSegment": () => (/* binding */ findSegment),
/* harmony export */   "flattenEach": () => (/* binding */ flattenEach),
/* harmony export */   "flattenReduce": () => (/* binding */ flattenReduce),
/* harmony export */   "geomEach": () => (/* binding */ geomEach),
/* harmony export */   "geomReduce": () => (/* binding */ geomReduce),
/* harmony export */   "lineEach": () => (/* binding */ lineEach),
/* harmony export */   "lineReduce": () => (/* binding */ lineReduce),
/* harmony export */   "propEach": () => (/* binding */ propEach),
/* harmony export */   "propReduce": () => (/* binding */ propReduce),
/* harmony export */   "segmentEach": () => (/* binding */ segmentEach),
/* harmony export */   "segmentReduce": () => (/* binding */ segmentReduce)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");


/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (
          callback(
            (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geometry, properties, { bbox: bbox, id: id }),
            featureIndex,
            0
          ) === false
        )
          return false;
        return;
    }

    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback((0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (
      coordEach(
        feature,
        function (
          currentCoord,
          coordIndex,
          featureIndexCoord,
          multiPartIndexCoord,
          geometryIndex
        ) {
          // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
          if (
            previousCoords === undefined ||
            featureIndex > previousFeatureIndex ||
            multiPartIndexCoord > previousMultiIndex ||
            geometryIndex > prevGeomIndex
          ) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
            [previousCoords, currentCoord],
            feature.properties
          );
          if (
            callback(
              currentSegment,
              featureIndex,
              multiFeatureIndex,
              geometryIndex,
              segmentIndex
            ) === false
          )
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false
    )
      return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function (
      currentSegment,
      featureIndex,
      multiFeatureIndex,
      geometryIndex,
      segmentIndex
    ) {
      if (started === false && initialValue === undefined)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
  // validation
  if (!geojson) throw new Error("geojson is required");

  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    if (feature.geometry === null) return;
    var type = feature.geometry.type;
    var coords = feature.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (
          var geometryIndex = 0;
          geometryIndex < coords.length;
          geometryIndex++
        ) {
          if (
            callback(
              (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(coords[geometryIndex], feature.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
        }
        break;
    }
  });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find SegmentIndex
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex =
          coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find Coord Index
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex =
          coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./Resources/Scripts/init.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const navigation_1 = __webpack_require__(/*! ./navigation */ "./Resources/Scripts/navigation.ts");
const map_1 = __webpack_require__(/*! ./map */ "./Resources/Scripts/map.ts");
const boxAnim_1 = __webpack_require__(/*! ./boxAnim */ "./Resources/Scripts/boxAnim.ts");
const year_1 = __webpack_require__(/*! ./year */ "./Resources/Scripts/year.ts");
const email_1 = __webpack_require__(/*! ./email */ "./Resources/Scripts/email.ts");
document.addEventListener("DOMContentLoaded", function () {
    (0, navigation_1.initNav)();
    (0, boxAnim_1.initAnim)();
    (0, map_1.initMap)();
    (0, year_1.setCurentYear)();
    (0, email_1.initEmail)();
});

})();

/******/ })()
;
//# sourceMappingURL=init.js.map