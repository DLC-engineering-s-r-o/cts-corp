/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./Resources/Scripts/animationsAbout.ts":
/*!**********************************************!*\
  !*** ./Resources/Scripts/animationsAbout.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initAboutBox = void 0;
function initAboutBox() {
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;
    const aboutCards = document.querySelectorAll('.about__card');
    function addClassToAboutCards() {
        aboutCards.forEach(card => {
            card.classList.add('about__card--visible');
        });
    }
    document.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        if (scrollPosition >= header.offsetTop + (window.innerHeight / 2)) {
            addClassToAboutCards();
        }
        console.log(scrollPosition);
    });
}
exports.initAboutBox = initAboutBox;


/***/ }),

/***/ "./Resources/Scripts/map.ts":
/*!**********************************!*\
  !*** ./Resources/Scripts/map.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initMap = void 0;
/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" />
const markerclusterer_1 = __webpack_require__(/*! @googlemaps/markerclusterer */ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js");
let map;
const middleOfCzechia = { lat: 49.74378, lng: 15.33865 };
function initMap() {
    const mapOptions = {
        center: middleOfCzechia,
        mapId: "c2aa51b8ca67932f",
        zoom: 8,
        minZoom: 8,
        maxZoom: 17,
        dragabble: false,
        disableDefaultUI: true,
    };
    const markerIcon = {
        url: 'wwwroot/images/icons/marker.png',
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const infoWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
    });
    const markers = references.map((position) => {
        const label = position.name.charAt(0);
        const marker = new google.maps.Marker({
            position,
            label,
            icon: markerIcon,
            title: position.name
        });
        marker.addListener('click', () => {
            infoWindow.setContent(`<div class='map__pop-up'><strong>${position.name}</strong><br><span>${position.date}</span><p>${position.desc}</p><b>${position.price} Kč</b></div>`);
            infoWindow.open(map, marker);
        });
        return marker;
    });
    new markerclusterer_1.MarkerClusterer({
        map,
        markers,
    });
}
exports.initMap = initMap;
const references = [
    {
        name: 'Město Šenov',
        lng: 18.3821,
        lat: 49.79161,
        desc: 'Pořízení vozidla na alternativní pohon-Město Šenov',
        date: '10\/12\/2021',
        price: '2 273 004',
    },
    {
        name: 'Obec Zbrašín',
        lng: 13.76282,
        lat: 50.29697,
        desc: 'Pořízení DA pro JPO V-obec Zbrašín',
        date: '9\/15\/2021',
        price: '300 000',
    },
    {
        name: 'Obec Nyklovice',
        lng: 16.34495,
        lat: 49.60493,
        desc: 'Novostavba přívodního řadu z vrtané studny do vodojemu-Obec Nyklovice',
        date: '5\/24\/2021',
        price: '624 997',
    },
    {
        name: 'Město Břeclav',
        lng: 16.86991,
        lat: 48.74577,
        desc: 'Vozidla na alternativní pohon-Město Břeclav',
        date: '11\/3\/2020',
        price: '640 000',
    },
    {
        name: 'Barbora Poláčková',
        lng: 14.26473,
        lat: 50.17718,
        desc: 'Investice do nezemědělských činností',
        date: '11\/9\/2020',
        price: '618 750',
    },
    {
        name: 'Obec Komňa',
        lng: 17.80756,
        lat: 48.9886,
        desc: 'Vozidlo na alternativní pohon-Obec Komňa',
        date: '3\/10\/2021',
        price: '200 000',
    },
    {
        name: 'Technické služby města Pelhřimova, příspěvková organizace',
        lng: 15.2204,
        lat: 49.41414,
        desc: 'Pořízení vozidla na alternativní pohon-Technické služby města Pelhřimova, příspěvková organizace',
        date: '3\/4\/2021',
        price: '1 790 316',
    },
    {
        name: 'Technické služby Zábřeh, příspěvková organizace',
        lng: 16.85684,
        lat: 49.8801,
        desc: 'Pořízení vozidla na alternativní pohon-Technické služby Zábřeh, příspěvková organizace',
        date: '3\/10\/2021',
        price: '500 000',
    },
    {
        name: 'EKO servis Zábřeh s.r.o.',
        lng: 16.87497,
        lat: 49.88661,
        desc: 'Vozidlo na alternativní pohon-EKO servis Zábřeh s.r.o.',
        date: '3\/10\/2021',
        price: '460 000',
    },
    {
        name: 'TBS Světlá nad Sázavou, p.o.',
        lng: 15.39303,
        lat: 49.67285,
        desc: 'Vozidlo na alternativní pohon-TBS Světlá nad Sázavou, p.o.',
        date: '12\/14\/2020',
        price: '500 000',
    },
    {
        name: 'Město Úštěk',
        lng: 14.36427,
        lat: 50.59282,
        desc: 'Pořízení elektrovozidla-Město Úštěk',
        date: '12\/3\/2020',
        price: '500 000',
    },
    {
        name: 'Václav Matějovský',
        lng: 13.85172,
        lat: 50.03411,
        desc: 'Mladý začínající zemědělec',
        date: '11\/18\/2020',
        price: '1 200 000',
    },
    {
        name: 'Město Břeclav',
        lng: 16.86991,
        lat: 48.74577,
        desc: 'Veřejné osvětlení Město Břeclav - ulice Kupkova, Veslařská, K.H.Máchy, Slovácká (sídliště), Čermákova, Haškova, U Splavu (parkoviště)',
        date: '3\/3\/2021',
        price: '656 194',
    },
    {
        name: 'Obec Česká Ves',
        lng: 17.20794,
        lat: 50.26276,
        desc: 'Opatření ke snížení energetické náročnosti VO',
        date: '11\/30\/2020',
        price: '518 109,9',
    },
    {
        name: 'Město Rájec - Jestřebí',
        lng: 16.64166,
        lat: 49.42075,
        desc: 'Vozidlo na alternativní pohon-Město Rájec - Jestřebí',
        date: '3\/10\/2021',
        price: '480 000',
    },
    {
        name: 'Obec Zbrašín',
        lng: 13.76282,
        lat: 50.29697,
        desc: 'Vodní nádrž Senkov-rekonstrukce',
        date: '3\/18\/2021',
        price: '1 374 119,65',
    },
    {
        name: 'Obec Bílá Lhota',
        lng: 16.98543,
        lat: 49.72073,
        desc: 'Kůrovcová kalamita-obec Bílá Lhota',
        date: '12\/30\/2020',
        price: '432 649',
    },
    {
        name: 'František Ratzka',
        lng: 13.60519,
        lat: 50.16232,
        desc: 'Pořízení zemědělského stroje',
        date: '8\/18\/2020',
        price: '1 852 000',
    },
    {
        name: 'Svazek obcí Větrník',
        lng: 16.96531,
        lat: 49.23844,
        desc: 'Podpora domácího kompostování-Svazek obcí Větrník',
        date: '12\/7\/2020',
        price: '1 904 543,38',
    },
    {
        name: 'Městys Okříšky',
        lng: 15.7662,
        lat: 49.24276,
        desc: 'Podpora domácího kompostování-Městys Okříšky',
        date: '11\/19\/2020',
        price: '1 614 642,15',
    },
    {
        name: 'Milský statek s.r.o.',
        lng: 13.8667,
        lat: 50.23108,
        desc: 'Investice do zemědělské činnosti-Milský statek s.r.o.',
        date: '8\/11\/2020',
        price: '514 500',
    },
    {
        name: 'Mikroregion Nepomucko',
        lng: 13.5813,
        lat: 49.48637,
        desc: 'Podpora domácího kompostování-Mikroregion Nepomucko',
        date: '11\/23\/2020',
        price: '4 438 975,14',
    },
    {
        name: 'Sdružení obcí povodí Stonávky',
        lng: 18.53473,
        lat: 49.70944,
        desc: 'Podpora domácího kompostování-Sdružení obcí povodí Stonávky',
        date: '11\/20\/2020',
        price: '2 773 247,4',
    },
    {
        name: 'Jan Hudík',
        lng: 15.53872,
        lat: 49.81062,
        desc: 'Strojní vybavení pro pěstování brambor',
        date: '8\/11\/2020',
        price: '825 000',
    },
    {
        name: 'Mikroregion Pobečví',
        lng: 17.48175,
        lat: 49.49161,
        desc: 'Podpora domácího kompostování-Mikroregion Pobečví',
        date: '12\/7\/2020',
        price: '1 094 118,3',
    },
    {
        name: 'OBEC RAPOTICE',
        lng: 16.25878,
        lat: 49.19279,
        desc: 'Podpora domácího kompostování-OBEC RAPOTICE',
        date: '12\/7\/2020',
        price: '614 775,59',
    },
    {
        name: 'Obec Trboušany',
        lng: 16.46382,
        lat: 49.04893,
        desc: 'Podpora domácího kompostování-obec Trboušany',
        date: '1\/6\/2021',
        price: '927 610,15',
    },
    {
        name: 'S A P spol. s r.o.',
        lng: 15.2229,
        lat: 49.62855,
        desc: 'Sklad-S A P spol. s r.o.',
        date: '8\/5\/2021',
        price: '2 596 105',
    },
    {
        name: 'Správa majetku města Chropyně,příspěvková organizace',
        lng: 17.36782,
        lat: 49.35692,
        desc: 'Vozidlo na alternativní pohon-Správa majetku města Chropyně,příspěvková organizace',
        date: '3\/10\/2021',
        price: '530 000',
    },
    {
        name: 'Dobrovolný svazek obcí Chomutovsko',
        lng: 13.41685,
        lat: 50.46086,
        desc: 'Chomutovsko předchází vzniku jednorázového nádobí',
        date: '2\/12\/2021',
        price: '4 590 000',
    },
    {
        name: 'Obec Klenovice na Hané',
        lng: 17.21338,
        lat: 49.4069,
        desc: 'Vozidlo na alternativní pohon-obec Klenovice na Hané',
        date: '1\/7\/2021',
        price: '987 623,87',
    },
    {
        name: 'Obec Věžky',
        lng: 17.27742,
        lat: 49.28715,
        desc: 'Vozidlo na alternativní pohon-obec Věžky',
        date: '7\/29\/2020',
        price: '100 000',
    },
    {
        name: 'Obec Merklín',
        lng: 13.17881,
        lat: 49.56255,
        desc: 'Podpora domácího kompostování-Obec Merklín',
        date: '3\/10\/2021',
        price: '500 000',
    },
    {
        name: 'Město Konice',
        lng: 16.90065,
        lat: 49.58654,
        desc: 'Pořízení kompostérů-město Konice',
        date: '12\/7\/2020',
        price: '927 434,44',
    },
    {
        name: 'Karel Mištera',
        lng: 13.66746,
        lat: 50.14622,
        desc: 'Rozšíření zemědělské činnosti nákupem traktoru pro chmelnici',
        date: '11\/23\/2020',
        price: '905 080',
    },
    {
        name: 'Technické služby Morkovice-Slížany s.r.o.',
        lng: 17.21227,
        lat: 49.25367,
        desc: 'Vysokorychlostní internet-Město Morkovice-Slížany',
        date: '8\/11\/2020',
        price: '492 500',
    },
    {
        name: 'Mikroregion Odersko',
        lng: 17.8307,
        lat: 49.66196,
        desc: 'Kompostuj s Mikroregionem Odersko',
        date: '1\/19\/2022',
        price: '4 906 050,36',
    },
    {
        name: 'IGRO s.r.o.',
        lng: 12.60257,
        lat: 49.78418,
        desc: 'Modernizace zařízení pro třídění a úpravu odpadů-IGRO s.r.o.',
        date: '11\/23\/2020',
        price: '4 974 237,4',
    },
    {
        name: 'Obec Mouchnice',
        lng: 17.11061,
        lat: 49.10832,
        desc: 'Podpora domácího kompostování-obec Mouchnice',
        date: '10\/21\/2020',
        price: '3 266 666,67',
    },
    {
        name: 'Mikroregion Morkovsko',
        lng: 17.20525,
        lat: 49.24681,
        desc: 'Podpora domácího kompostování-Mikroregion Morkovsko',
        date: '11\/19\/2020',
        price: '765 923,95',
    },
    {
        name: 'Obec Žihle',
        lng: 13.34863,
        lat: 50.05315,
        desc: 'Podpora domácího kompostování-obec Žihle',
        date: '12\/7\/2020',
        price: '4 116 731,69',
    },
    {
        name: 'Město Brušperk',
        lng: 18.23148,
        lat: 49.70466,
        desc: 'Podpora domácího kompostování-Město Brušperk',
        date: '11\/23\/2020',
        price: '1 178 403,87',
    },
    {
        name: 'Město Golčův Jeníkov',
        lng: 15.46742,
        lat: 49.81103,
        desc: 'Podpora domácího kompostování-Město Golčův Jeníkov',
        date: '11\/24\/2020',
        price: '1 770 305,62',
    },
    {
        name: 'Technické služby Krnov s.r.o.',
        lng: 17.70924,
        lat: 50.087,
        desc: 'Podpora domácího kompostování-Technické služby Krnov s.r.o.',
        date: '12\/10\/2020',
        price: '1 879 650',
    },
    {
        name: 'BAUSET CZ, a.s.',
        lng: 15.77308,
        lat: 50.01842,
        desc: 'Pořízení technologií-BAUSET CZ, a.s.',
        date: '1\/7\/2021',
        price: '565 675',
    },
    {
        name: 'Obec Zbrašín',
        lng: 13.76687,
        lat: 50.29559,
        desc: 'Pořízení DA pro JPO V-obec Zbrašín',
        date: '12\/8\/2020',
        price: '1 134 877,5',
    },
    {
        name: 'Město Újezd u Brna',
        lng: 16.75832,
        lat: 49.0974,
        desc: 'Vozidlo na alternativní pohon-Město Újezd u Brna',
        date: '11\/23\/2020',
        price: '2 306 500',
    },
    {
        name: 'Obec Valy',
        lng: 15.61448,
        lat: 50.02704,
        desc: 'Podpora domácího kompostování-obec Valy',
        date: '12\/14\/2020',
        price: '450 000',
    },
    {
        name: 'Městys Buchlovice',
        lng: 17.33659,
        lat: 49.08657,
        desc: 'Podpora domácího kompostování-Městys Buchlovice',
        date: '1\/4\/2021',
        price: '491 260',
    },
    {
        name: 'Městys Dub nad Moravou',
        lng: 17.27842,
        lat: 49.48237,
        desc: 'Podpora domácího kompostování-Městys Dub nad Moravou',
        date: '1\/7\/2021',
        price: '2 601 035,36',
    },
    {
        name: 'Obec Otradov',
        lng: 16.04646,
        lat: 49.7949,
        desc: 'Podpora domácího kompostování-obec Otradov',
        date: '11\/20\/2020',
        price: '1 071 902,7',
    },
    {
        name: 'Město Stochov',
        lng: 13.95639,
        lat: 50.16254,
        desc: 'Podpora domácího kompostování-Město Stochov',
        date: '11\/23\/2020',
        price: '1 988 730,84',
    },
    {
        name: 'Technické služby Žacléř, spol. s r.o.',
        lng: 15.91116,
        lat: 50.66568,
        desc: 'Vozidlo na alternativní pohon-Technické služby Žacléř, spol. s r.o.',
        date: '12\/7\/2020',
        price: '661 839,75',
    },
    {
        name: 'Technické služby Český Brod',
        lng: 14.85366,
        lat: 50.07043,
        desc: 'Vozidlo na alternativní pohon-Technické služby Český Brod',
        date: '11\/19\/2020',
        price: '1 419 638,55',
    },
    {
        name: 'Město Jaroměř',
        lng: 15.92521,
        lat: 50.35399,
        desc: 'Pořízení CAS pro jednotku SDH kategorie JPO III\/2 -Město Jaroměř ',
        date: '5\/12\/2020',
        price: '394 000',
    },
    {
        name: 'STAVBY JZL s.r.o.',
        lng: 16.6132,
        lat: 49.19564,
        desc: 'Pořízení technologie-STAVBY JZL s.r.o.',
        date: '5\/12\/2020',
        price: '484 000',
    },
    {
        name: 'Obec Horní Domaslavice',
        lng: 18.46304,
        lat: 49.69329,
        desc: 'Podpora domácího kompostování-Obec Horní Domaslavice',
        date: '9\/2\/2020',
        price: '5 689 585,15',
    },
    {
        name: 'Obec Dolní Vilémovice',
        lng: 15.97955,
        lat: 49.15855,
        desc: 'Podpora domácího kompostování-obec Dolní Vilémovice',
        date: '2\/17\/2021',
        price: '1 957 500',
    },
    {
        name: 'Obec Litovany',
        lng: 16.04573,
        lat: 49.05289,
        desc: 'Podpora domácího kompostování-Obec Litovany',
        date: '11\/27\/2020',
        price: '1 316 274,3',
    },
    {
        name: 'Obec Drahanovice',
        lng: 17.05812,
        lat: 49.57342,
        desc: 'Podpora domácího kompostování v obci Drahanovice',
        date: '1\/7\/2021',
        price: '901 174,01',
    },
    {
        name: 'Technické služby města Nymburka',
        lng: 15.027,
        lat: 50.18354,
        desc: 'Vozidlo na alternativní pohon-Technické služby města Nymburka',
        date: '12\/7\/2020',
        price: '677 452,38',
    },
    {
        name: 'Obec Hulice',
        lng: 15.09058,
        lat: 49.70918,
        desc: 'Pořízení DA pro JPO V- obec Hulice',
        date: '11\/20\/2020',
        price: '3 257 259,5',
    },
    {
        name: 'Obec Tomice',
        lng: 15.15551,
        lat: 49.64014,
        desc: 'Pořízení DA pro JPO V-obec Tomice',
        date: '5\/12\/2020',
        price: '193 600',
    },
    {
        name: 'Ašské služby s.r.o.',
        lng: 12.18138,
        lat: 50.2183,
        desc: 'Výstavba opěrné stěny a stavební úpravy ve sběrném dvoře v Aši',
        date: '5\/6\/2020',
        price: '300 000',
    },
    {
        name: 'Obec Šebetov',
        lng: 16.72271,
        lat: 49.5547,
        desc: 'Rozšíření systému separace odpadů-obec Šebetov',
        date: '5\/6\/2020',
        price: '300 000',
    },
    {
        name: 'Obec Řícmanice',
        lng: 16.6935,
        lat: 49.25927,
        desc: 'Rozšíření systému separace odpadů-obec Řícmanice',
        date: '10\/19\/2020',
        price: '2 753 150',
    },
    {
        name: 'Obec Pojbuky',
        lng: 14.89915,
        lat: 49.49908,
        desc: 'Rozšíření sběrných míst-obec Pojbuky',
        date: '10\/17\/2020',
        price: '570 200,4',
    },
    {
        name: 'Svazek obcí Větrník',
        lng: 16.96531,
        lat: 49.23844,
        desc: 'Rozšíření systému separace odpadů-Svazek obcí Větrník',
        date: '7\/13\/2020',
        price: '1 093 587,59',
    },
    {
        name: 'Svazek obcí mikroregionu Střední Haná',
        lng: 17.3019,
        lat: 49.35184,
        desc: 'Rozšíření systému separace odpadů-Svazek obcí mikroregionu Střední Haná',
        date: '7\/30\/2020',
        price: '577 893,58',
    },
    {
        name: 'Obec Blatno',
        lng: 13.36573,
        lat: 50.10873,
        desc: 'Podpora domácího kompostování-obec Blatno',
        date: '6\/23\/2020',
        price: '1 922 060,8',
    },
    {
        name: 'Obec Výšovice',
        lng: 17.13997,
        lat: 49.4163,
        desc: 'Podpora domácího kompostování-obec Výšovice',
        date: '6\/23\/2020',
        price: '2 420 060,5',
    },
    {
        name: 'Obec Výšovice',
        lng: 17.13997,
        lat: 49.4163,
        desc: 'Rozšíření systému separace odpadů-obec Výšovice',
        date: '11\/23\/2020',
        price: '1 309 280,5',
    },
    {
        name: 'Technické služby Horní Slavkov s.r.o.',
        lng: 12.7998,
        lat: 50.13155,
        desc: 'Pořízení svozového vozidla -Technické služby Horní Slavkov s.r.o.',
        date: '12\/3\/2020',
        price: '1 559 534,95',
    },
    {
        name: 'Obec Žiželice',
        lng: 15.39985,
        lat: 50.12388,
        desc: 'Podpora domácího kompostování-obec Žiželice',
        date: '10\/29\/2020',
        price: '547 442,78',
    },
    {
        name: 'HRAZDÍRA - ELEKTRO s.r.o.',
        lng: 15.02711,
        lat: 49.68743,
        desc: 'Úspora energie rekonstrukcí pro HRAZDÍRA - ELEKTRO s.r.o.',
        date: '7\/13\/2020',
        price: '702 700',
    },
    {
        name: 'Obec Držovice',
        lng: 17.14119,
        lat: 49.49587,
        desc: 'Rozšíření separace odpadů-Obec Držovice',
        date: '1\/6\/2021',
        price: '865 511,54',
    },
    {
        name: 'Obec Bezměrov',
        lng: 17.3415,
        lat: 49.32813,
        desc: 'Podpora domácího kompostování-obec Bezměrov',
        date: '5\/11\/2021',
        price: '1 525 743,66',
    },
    {
        name: 'Obec Svratouch',
        lng: 16.05226,
        lat: 49.72774,
        desc: 'Výstavba víceúčelového hřiště-obec Svratouch',
        date: '7\/13\/2020',
        price: '1 478 211,62',
    },
    {
        name: 'Obec Šenov u Nového Jičína',
        lng: 18.00963,
        lat: 49.61979,
        desc: 'Rozšíření systému separovaných odpadů-obec Šenov u Nového Jičína',
        date: '11\/20\/2020',
        price: '1 038 579,3',
    },
    {
        name: 'Obec Ošelín',
        lng: 12.84558,
        lat: 49.76531,
        desc: 'Rozšíření systému separace odpadů-obec Ošelín',
        date: '6\/7\/2021',
        price: '1 768 898',
    },
    {
        name: 'Jiří Hamouz',
        lng: 14.00822,
        lat: 50.10192,
        desc: 'Investice do nezemědělských činností-Jiří Hamouz ',
        date: '7\/13\/2020',
        price: '1 387 441,35',
    },
    {
        name: 'Richard Sůra',
        lng: 13.11835,
        lat: 50.38077,
        desc: 'Investice do nezemědělských činností-Richard Sůra',
        date: '10\/19\/2020',
        price: '571 331,75',
    },
    {
        name: 'Matěj Dudek',
        lng: 13.23109,
        lat: 50.16562,
        desc: 'Investice do nezemědělských činností-Matěj Dudek',
        date: '11\/26\/2019',
        price: '854 100',
    },
    {
        name: 'TEP - AGRO spol. s r.o.',
        lng: 13.85365,
        lat: 50.71566,
        desc: 'Pořízení minipivovaru-TEP - AGRO spol. s r.o.',
        date: '11\/25\/2019',
        price: '854 550',
    },
    {
        name: 'Statek Bošina s.r.o.',
        lng: 13.30294,
        lat: 50.48573,
        desc: 'Sdílení zařízení a zdrojů-Statek Bošina s.r.o.',
        date: '11\/25\/2019',
        price: '854 100',
    },
    {
        name: 'Hynek Bošina',
        lng: 13.30294,
        lat: 50.48573,
        desc: 'Investice do nezemědělských činností-Hynek Bošina',
        date: '11\/25\/2019',
        price: '1 683 000',
    },
    {
        name: 'Josef Štiller',
        lng: 13.64521,
        lat: 49.97699,
        desc: 'Pořízení lesní techniky-Josef Štiller',
        date: '11\/25\/2019',
        price: '256 500',
    },
    {
        name: 'Agrolesy Chříč, s.r.o.',
        lng: 14.42579,
        lat: 50.08302,
        desc: 'Pořízení lesní techniky-Agrolesy Chříč, s.r.o.',
        date: '11\/25\/2019',
        price: '855 000',
    },
    {
        name: 'Obec Jimlín',
        lng: 13.75656,
        lat: 50.32861,
        desc: 'Rozšíření sběru separovaných odpadů v obci Jimlín',
        date: '11\/25\/2019',
        price: '103 250',
    },
    {
        name: 'Obec Olomučany',
        lng: 16.66886,
        lat: 49.32915,
        desc: 'Rozšíření systému separace odpadů-obec Olomučany',
        date: '11\/25\/2019',
        price: '1 405 080',
    },
    {
        name: 'Technické služby Horní Slavkov s.r.o.',
        lng: 12.7998,
        lat: 50.13155,
        desc: 'Rozšíření sběrného dvora-Technické služby Horní Slavkov s.r.o.',
        date: '7\/30\/2020',
        price: '572 689,37',
    },
    {
        name: 'Obec Přemyslovice',
        lng: 16.95543,
        lat: 49.55354,
        desc: 'Podpora domácího kompostování-obec Přemyslovice',
        date: '10\/16\/2020',
        price: '607 534,95',
    },
    {
        name: 'Obec Jaroslavice',
        lng: 16.23603,
        lat: 48.75835,
        desc: 'Podpora domácího kompostování-obec Jaroslavice',
        date: '7\/13\/2020',
        price: '537 625',
    },
    {
        name: 'Obec Jaroslavice',
        lng: 16.23603,
        lat: 48.75835,
        desc: 'Rozšíření systému separace odpadů-obec Jaroslavice',
        date: '12\/7\/2020',
        price: '1 357 856,55',
    },
    {
        name: 'Obec Žichovice',
        lng: 13.63623,
        lat: 49.26724,
        desc: 'Rozšíření systému separace odpadů-obec Žichovice',
        date: '1\/7\/2021',
        price: '1 524 987,8',
    },
    {
        name: 'Vladimír Škvor',
        lng: 14.80281,
        lat: 49.80709,
        desc: 'Sdílení zemědělské techniky-Vladimír Škvor',
        date: '7\/30\/2020',
        price: '955 826,19',
    },
    {
        name: 'Obec Holedeč',
        lng: 13.56146,
        lat: 50.27779,
        desc: 'Rozšíření systému separace odpadů v obci Holedeč',
        date: '10\/19\/2020',
        price: '551 805,67',
    },
    {
        name: 'Obec Otradov',
        lng: 16.04646,
        lat: 49.7949,
        desc: 'Rozšíření systému separace odpadů- obec Otradov',
        date: '11\/19\/2019',
        price: '961 444',
    },
    {
        name: 'Obec Sadov',
        lng: 12.92106,
        lat: 50.25921,
        desc: 'Rozšíření systému separace odpadů-obec Sadov',
        date: '7\/13\/2020',
        price: '653 097,5',
    },
    {
        name: 'Obec Kyselka',
        lng: 12.98735,
        lat: 50.2666,
        desc: 'Rozšíření systému separace odpadů-Obec Kyselka',
        date: '7\/30\/2020',
        price: '572 463,1',
    },
    {
        name: 'Obec Jistebník',
        lng: 18.13952,
        lat: 49.74879,
        desc: 'Podpora domácího kompostování-obec Jistebník',
        date: '10\/19\/2020',
        price: '595 090,1',
    },
    {
        name: 'Obec Jindřichov',
        lng: 17.74508,
        lat: 49.65041,
        desc: 'Rozšíření systému separace odpadů-obec Jindřichov',
        date: '10\/19\/2020',
        price: '574 725,8',
    },
    {
        name: 'Obec Úněšov',
        lng: 13.13964,
        lat: 49.89163,
        desc: 'Rozšíření systému separace odpadů- obec Úněšov',
        date: '11\/23\/2020',
        price: '1 891 102,95',
    },
    {
        name: 'Město Bečov nad Teplou',
        lng: 12.84393,
        lat: 50.09713,
        desc: 'Rozšíření systému separace odpadů- Město Bečov nad Teplou',
        date: '7\/30\/2020',
        price: '565 675',
    },
    {
        name: 'Obec Libčeves',
        lng: 13.83889,
        lat: 50.45574,
        desc: 'Rozšíření systému separace odpadů v obci Libčeves',
        date: '7\/13\/2020',
        price: '572 290,31',
    },
    {
        name: 'Obec Děpoltovice',
        lng: 12.82723,
        lat: 50.28998,
        desc: 'Podpora domácího kompostování-obec Děpoltovice',
        date: '10\/19\/2020',
        price: '858 797,5',
    },
    {
        name: 'Obec Střítež nad Ludinou',
        lng: 17.7422,
        lat: 49.60874,
        desc: 'Rozšíření separace odpadů v obci Střítež nad Ludinou',
        date: '10\/19\/2020',
        price: '593 958,75',
    },
    {
        name: 'Obec Račiněves',
        lng: 14.21048,
        lat: 50.38108,
        desc: 'Rozšíření systému separace odpadů v obci Račiněves',
        date: '1\/7\/2021',
        price: '743 502,65',
    },
    {
        name: 'Pavel Šilhánek',
        lng: 13.42131,
        lat: 50.17582,
        desc: 'Likvidace brownfieldu a výstavba nové budovy-Pavel Šilhánek',
        date: '7\/30\/2020',
        price: '660 052,21',
    },
    {
        name: 'Město Úštěk',
        lng: 14.36427,
        lat: 50.59282,
        desc: 'Pořízení vozidla na alternativní pohon-Město Úštěk',
        date: '7\/30\/2020',
        price: '565 675',
    },
    {
        name: 'Obec Přerov nad Labem',
        lng: 14.82734,
        lat: 50.16408,
        desc: 'Rozšíření systému separace odpadů-obec Přerov nad Labem',
        date: '6\/10\/2020',
        price: '7 734 041,35',
    },
    {
        name: 'Obec Tomice',
        lng: 15.15551,
        lat: 49.64014,
        desc: 'Pořízení DA pro JPO V-obec Tomice',
        date: '1\/16\/2020',
        price: '338 800',
    },
    {
        name: 'Obec Krmelín',
        lng: 18.23645,
        lat: 49.72947,
        desc: 'Rozšíření systému separovaných odpadů-obec Krmelín',
        date: '7\/30\/2020',
        price: '14 084 110,44',
    },
    {
        name: 'Městys Šatov',
        lng: 16.0151,
        lat: 48.7919,
        desc: 'Rozšíření systému separace odpadů-Městys Šatov',
        date: '9\/11\/2019',
        price: '450 000',
    },
    {
        name: 'Obec Nesovice',
        lng: 17.08776,
        lat: 49.14687,
        desc: 'Výstavba lesních oplocenek-obec Nesovice',
        date: '7\/30\/2020',
        price: '591 582,91',
    },
    {
        name: 'Obec Kuřimské Jestřabí',
        lng: 16.31189,
        lat: 49.34506,
        desc: 'Pořízení DA pro JPO V- obec Kuřimské Jestřabí',
        date: '10\/19\/2020',
        price: '564 647',
    },
    {
        name: 'Město Konice',
        lng: 16.90065,
        lat: 49.58654,
        desc: 'Rozšíření systému separace odpadů-město Konice',
        date: '11\/17\/2019',
        price: '235 110',
    },
    {
        name: 'ZD Březina nad Jizerou, družstvo',
        lng: 15.03319,
        lat: 50.54884,
        desc: 'Snížení energetické náročnosti pořízením technologie-ZD Březina nad Jizerou, družstvo',
        date: '9\/11\/2019',
        price: '450 000',
    },
    {
        name: 'Obec Držovice',
        lng: 17.14119,
        lat: 49.49587,
        desc: 'Pořízení vozidla na alternativní pohon-Obec Držovice',
        date: '7\/30\/2020',
        price: '707 608',
    },
    {
        name: 'ZKP Kladno, s.r.o.',
        lng: 14.08768,
        lat: 50.16295,
        desc: 'Snížení energetické náročnosti pořízením technologie-ZKP Kladno, s.r.o. (areál Tloskov)',
        date: '9\/18\/2019',
        price: '740 000',
    },
    {
        name: 'ZKP Kladno, s.r.o.',
        lng: 14.08768,
        lat: 50.16295,
        desc: 'Snížení energetické náročnosti pořízením technologie-ZKP Kladno, s.r.o. (areál Říčany)',
        date: '8\/9\/2019',
        price: '500 000',
    },
    {
        name: 'ZKP Kladno, s.r.o.',
        lng: 14.08768,
        lat: 50.16295,
        desc: 'Snížení energetické náročnosti pořízením technologie-ZKP Kladno, s.r.o. (areál Mělník)',
        date: '11\/25\/2019',
        price: '2 915 299,99',
    },
    {
        name: 'Konstrukce a dopravní stavby s.r.o.',
        lng: 15.18153,
        lat: 49.81241,
        desc: 'Modernizace strojního vybavení společnosti Konstrukce a dopravní stavby s.r.o. (provozovna Čáslav)',
        date: '11\/25\/2019',
        price: '2 915 299,99',
    },
    {
        name: 'Konstrukce a dopravní stavby s.r.o.',
        lng: 15.18153,
        lat: 49.81241,
        desc: 'Modernizace strojního vybavení společnosti Konstrukce a dopravní stavby s.r.o. (provozovna Kolín)',
        date: '11\/25\/2019',
        price: '5 841 400',
    },
    {
        name: 'Jihoměstská majetková a.s.',
        lng: 14.52109,
        lat: 50.0249,
        desc: 'Pořízení vozidel na alternativní pohon-Jihoměstská majetková a.s.',
        date: '7\/30\/2019',
        price: '1 200 000',
    },
    {
        name: 'GYPSTREND s.r.o.',
        lng: 18.03534,
        lat: 49.99938,
        desc: 'Snížení energetické náročnosti pořízením technologického vybavení-GYPSTREND s.r.o.',
        date: '7\/30\/2019',
        price: '1 200 000',
    },
    {
        name: 'VESIBA, s.r.o.',
        lng: 14.60034,
        lat: 50.11176,
        desc: 'Pořízení silniční frézy s integrovaným nivelačním systémem-VESIBA, s.r.o.',
        date: '11\/19\/2019',
        price: '728 504',
    },
    {
        name: 'Technické služby Lanškroun, s.r.o.',
        lng: 16.60211,
        lat: 49.90873,
        desc: 'Rozšíření sběrných míst pro separaci odpadů-Technické služby Lanškroun, s.r.o.',
        date: '10\/7\/2019',
        price: '2 612 905,99',
    },
    {
        name: 'Technické služby Lanškroun, s.r.o.',
        lng: 16.60211,
        lat: 49.90873,
        desc: 'Pořízení svozového vozidla-Technické služby Lanškroun, s.r.o.',
        date: '11\/25\/2019',
        price: '4 410 094,5',
    },
    {
        name: 'BIO svoz s.r.o.',
        lng: 17.05198,
        lat: 49.68707,
        desc: 'Pořízení svozového vozidla- BIO svoz s.r.o.',
        date: '7\/15\/2019',
        price: '2 036 919,56',
    },
    {
        name: 'EKO servis Zábřeh s.r.o.',
        lng: 16.87497,
        lat: 49.88661,
        desc: 'Sběrný dvůr-EKO servis Zábřeh s.r.o.',
        date: '7\/15\/2019',
        price: '1 146 983,2',
    },
    {
        name: 'Obec Košťálov',
        lng: 15.41449,
        lat: 50.5793,
        desc: 'Pořízení DA pro jednotku SDH obce Košťálov kategorie JPO III\/1',
        date: '11\/25\/2019',
        price: '667 072,93',
    },
    {
        name: 'Správa města Sezimovo Ústí',
        lng: 14.68286,
        lat: 49.38431,
        desc: 'Pořízení svozového vozidla na separované odpady-Správa města Sezimovo Ústí',
        date: '6\/23\/2019',
        price: '4 096 150',
    },
    {
        name: 'Obec Grygov',
        lng: 17.30276,
        lat: 49.52118,
        desc: 'Pořízení elektromobilu-obec Grygov',
        date: '5\/29\/2019',
        price: '933 902,25',
    },
    {
        name: 'Správa a údržba silnic Pardubického kraje',
        lng: 15.97827,
        lat: 50.07255,
        desc: 'Pořízení elektromobilů-Správa a údržba silnic Pardubického kraje',
        date: '6\/23\/2019',
        price: '623 036',
    },
    {
        name: 'Obec Poříčany',
        lng: 14.92241,
        lat: 50.10828,
        desc: 'Rozšíření systému sběru separovaných odpadů-obec Poříčany',
        date: '12\/2\/2019',
        price: '480 126',
    },
    {
        name: 'Technické služby Český Brod',
        lng: 14.85366,
        lat: 50.07043,
        desc: 'Rozšíření systému separovaných odpadů-Technické služby Český Brod',
        date: '12\/18\/2019',
        price: '1 000 000',
    },
    {
        name: 'Technické služby města Nymburka',
        lng: 15.027,
        lat: 50.18354,
        desc: 'Pořízení svozového vozidla-Technické služby města Nymburka',
        date: '11\/25\/2019',
        price: '2 132 594,75',
    },
    {
        name: 'Obec Dobříč',
        lng: 14.26063,
        lat: 50.01383,
        desc: 'Rozšíření systému separace odpadů-obec Dobříč',
        date: '7\/15\/2019',
        price: '5 938 453,61',
    },
    {
        name: 'Obec Hulice',
        lng: 15.09058,
        lat: 49.70918,
        desc: 'Pořízení DA pro JPO V- obec Hulice',
        date: '7\/15\/2019',
        price: '901 752,5',
    },
    {
        name: 'Obec Dobříč',
        lng: 14.26063,
        lat: 50.01383,
        desc: 'Územní plán Dobříče',
        date: '7\/15\/2019',
        price: '665 007,53',
    },
    {
        name: 'Obec Březina',
        lng: 16.75818,
        lat: 49.28241,
        desc: 'Vozidlo na alternativní pohon-obec Březina',
        date: '9\/11\/2019',
        price: '450 000',
    },
    {
        name: 'Obec Sebranice',
        lng: 16.57531,
        lat: 49.4968,
        desc: 'Pořízení elektromobilu-obec Sebranice',
        date: '8\/27\/2019',
        price: '245 872',
    },
    {
        name: 'VRAMAT CZ s.r.o.',
        lng: 14.32207,
        lat: 50.19071,
        desc: 'Snížení energetické náročnosti výměnou mobilního zařízení-VRAMAT CZ s.r.o.',
        date: '7\/1\/2019',
        price: '500 000',
    },
    {
        name: 'SLUMBI spol. s r.o.',
        lng: 17.99748,
        lat: 49.75965,
        desc: 'Rozšíření systému separace odpadů-SLUMBI spol. s r.o.',
        date: '11\/22\/2019',
        price: '500 000',
    },
    {
        name: 'HANES s.r.o.',
        lng: 14.28895,
        lat: 50.06549,
        desc: 'SNÍŽENÍ ENERGETICKÉ NÁROČNOSTI OCELOVÉ HALY A ZDĚNÉ BUDOVY NA POZEMCÍCH PARC.Č. 1706 A 1707, KATASTRÁLNÍ ÚZEMÍ VOTICE',
        date: '7\/30\/2019',
        price: '2 841 999,99',
    },
    {
        name: 'Obec Křečovice',
        lng: 14.47272,
        lat: 49.72732,
        desc: 'Pořízení DA pro JPO V-Obec Křečovice',
        date: '7\/1\/2019',
        price: '822 800',
    },
    {
        name: 'Městys Křivsoudov',
        lng: 15.08708,
        lat: 49.63114,
        desc: 'Pořízení DA pro Městys Křivsoudov',
        date: '8\/23\/2019',
        price: '8 383 554,71',
    },
    {
        name: 'Městys Křivsoudov',
        lng: 15.08708,
        lat: 49.63114,
        desc: 'Pořízení DA pro Městys Křivsoudov',
        date: '5\/21\/2019',
        price: '300 000',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'STAVEBNÍ ÚPRAVY ZŠ - TECHNICKÝ ATELIÉR',
        date: '5\/6\/2020',
        price: '300 000',
    },
    {
        name: 'Tělovýchovná jednota Sokol Dobříč, z.s.',
        lng: 13.47101,
        lat: 49.8844,
        desc: 'Objekt šaten TJ Sokol Dobříč ',
        date: '9\/11\/2019',
        price: '450 000',
    },
    {
        name: 'Svazek obcí Krašov',
        lng: 13.05564,
        lat: 49.926,
        desc: 'Podpora domácího kompostování-Svazek obcí Krašov',
        date: '4\/5\/2019',
        price: '1 900 000',
    },
    {
        name: 'Obec Grygov',
        lng: 17.30276,
        lat: 49.52118,
        desc: 'Podpora domácího kompostování-obec Grygov',
        date: '11\/25\/2019',
        price: '4 270 000',
    },
    {
        name: 'Městys Dub nad Moravou',
        lng: 17.27842,
        lat: 49.48237,
        desc: 'Pořízení elektromobilu-městys Dub nad Moravou',
        date: '1\/27\/2019',
        price: '1 816 331',
    },
    {
        name: 'Obec Kuřimské Jestřabí',
        lng: 16.31189,
        lat: 49.34506,
        desc: 'Podpora domácího kompostování-obec Kuřimské Jestřabí',
        date: '1\/24\/2019',
        price: '1 216 715,5',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'Stavební úpravy objektu č.p. 14 Komunitní centrum (Krásná Hora nad Vltavou)',
        date: '1\/28\/2019',
        price: '600 000',
    },
    {
        name: 'Obec Určice',
        lng: 17.08664,
        lat: 49.42754,
        desc: 'Novostavba MŠ v areálu ZŠ Určice',
        date: '1\/24\/2019',
        price: '1 057 452,27',
    },
    {
        name: 'Obec Úlice',
        lng: 13.15188,
        lat: 49.77183,
        desc: 'Podpora domácího kompostování-obec Úlice',
        date: '5\/27\/2019',
        price: '6 800 340,35',
    },
    {
        name: 'Obec Kyselovice',
        lng: 17.40469,
        lat: 49.3768,
        desc: 'Podpora domácího kompostování-obec Kyselovice',
        date: '10\/14\/2019',
        price: '37 199 747,7',
    },
    {
        name: 'Technické služby Bučovice, příspěvková organizace',
        lng: 17.00321,
        lat: 49.15014,
        desc: 'Podpora domácího kompostování-Technické služby Bučovice, příspěvková organizace',
        date: '11\/25\/2019',
        price: '639 212,75',
    },
    {
        name: 'Obec Pernarec',
        lng: 13.10011,
        lat: 49.85791,
        desc: 'Podpora domácího kompostování-obec Pernarec',
        date: '11\/25\/2019',
        price: '877 619,05',
    },
    {
        name: 'Město Morkovice-Slížany',
        lng: 17.20694,
        lat: 49.24734,
        desc: 'Využití dešťových vod z městských budov-Město Morkovice-Slížany',
        date: '6\/18\/2019',
        price: '876 282',
    },
    {
        name: 'Obec Kunice',
        lng: 14.67539,
        lat: 49.9274,
        desc: 'Podpora domácího kompostování-obec Kunice',
        date: '11\/25\/2019',
        price: '1 088 564,4',
    },
    {
        name: 'Obec Velká Hleďsebe',
        lng: 12.66786,
        lat: 49.96063,
        desc: 'Podpora domácího kompostování-obec Velká Hleďsebe',
        date: '5\/2\/2019',
        price: '8 840 482,8',
    },
    {
        name: 'Obec Ohrozim',
        lng: 17.01665,
        lat: 49.48713,
        desc: 'Pořízení elektromobilu-obec Ohrozim',
        date: '1\/23\/2019',
        price: '883 481,5',
    },
    {
        name: 'Kámen Hudčice, s.r.o.',
        lng: 13.91817,
        lat: 49.52798,
        desc: 'INSTALACE FOTOVOLTAICKÉHO SYSTÉMU, HUDČICE 74, 262 72 HUDČICE',
        date: '1\/23\/2019',
        price: '2 177 128,8',
    },
    {
        name: 'Obec Mostkovice',
        lng: 17.04695,
        lat: 49.47613,
        desc: 'Pořízení elektromobilu-obec Mostkovice',
        date: '11\/9\/2018',
        price: '600 000',
    },
    {
        name: 'SWONIA, a.s.',
        lng: 14.68399,
        lat: 48.93436,
        desc: 'Pořízení minipivovaru-SWONIA, a.s.',
        date: '11\/27\/2018',
        price: '1 909 181,19',
    },
    {
        name: 'Technické služby města Nymburka',
        lng: 15.027,
        lat: 50.18353,
        desc: 'Pořízení elektromobilu-Technické služby města Nymburka',
        date: '11\/9\/2018',
        price: '600 000',
    },
    {
        name: 'Obec Bedihošť',
        lng: 17.15623,
        lat: 49.44508,
        desc: 'Pořízení elektromobilu-obec Bedihošť',
        date: '5\/18\/2018',
        price: '1 687 500',
    },
    {
        name: 'Obec Křečovice',
        lng: 14.47272,
        lat: 49.72732,
        desc: 'Pořízení DA pro JPO V-Obec Křečovice',
        date: '7\/25\/2018',
        price: '600 000',
    },
    {
        name: 'Město Jáchymov',
        lng: 12.90452,
        lat: 50.37246,
        desc: 'Podpora domácího kompostování-Město Jáchymov',
        date: '11\/9\/2018',
        price: '600 000',
    },
    {
        name: 'Technické služby města Morkovice-Slížany, příspěvková organizace',
        lng: 16.87836,
        lat: 49.15016,
        desc: 'Pořízení elektromobilu-Technické služby města Morkovice-Slížany, příspěvková organizace',
        date: '10\/3\/2018',
        price: '450 000',
    },
    {
        name: 'Technické služby Kdyně',
        lng: 13.03549,
        lat: 49.39355,
        desc: 'Pořízení elektromobilu-Technické služby Kdyně',
        date: '5\/28\/2019',
        price: '882 453',
    },
    {
        name: 'Obec Říčany',
        lng: 14.66071,
        lat: 49.98725,
        desc: 'Pořízení elektromobilu-obec Říčany',
        date: '8\/10\/2018',
        price: '600 000',
    },
    {
        name: 'Město Mariánské Lázně',
        lng: 12.68489,
        lat: 49.99235,
        desc: 'Nákup domácích kompostérů',
        date: '11\/9\/2018',
        price: '600 000',
    },
    {
        name: 'Obec Kondrac',
        lng: 14.88804,
        lat: 49.68009,
        desc: 'Pořízení DA pro JPO V-Obec Kondrac',
        date: '7\/27\/2018',
        price: '600 000',
    },
    {
        name: 'Obec Šetějovice',
        lng: 15.22607,
        lat: 49.65105,
        desc: 'Pořízení DA pro JPO V-obec Šetějovice',
        date: '6\/10\/2019',
        price: '980 818,74',
    },
    {
        name: 'Obec Křížkový Újezdec',
        lng: 14.59016,
        lat: 49.93803,
        desc: 'Pořízení DA pro JPO V-obec Křížkový Újezdec',
        date: '5\/21\/2019',
        price: '300 000',
    },
    {
        name: 'Obec Hostěrádky - Rešov',
        lng: 16.77984,
        lat: 49.12091,
        desc: 'Rozšíření systému separovaných odpadů v obci Hostěrádky-Rešov',
        date: '5\/30\/2018',
        price: '300 000',
    },
    {
        name: 'Obec Hostěrádky - Rešov',
        lng: 16.77984,
        lat: 49.12091,
        desc: 'Pořízení elektromobilu -obec Hostěrádky - Rešov',
        date: '5\/30\/2018',
        price: '300 000',
    },
    {
        name: 'Obec Petrohrad',
        lng: 13.43833,
        lat: 50.13799,
        desc: 'Pořízení kompostérů-Obec Petrohrad',
        date: '7\/15\/2019',
        price: '724 064',
    },
    {
        name: 'Město Vroutek',
        lng: 13.34462,
        lat: 50.17615,
        desc: 'Pořízení kompostérů-Město Vroutek',
        date: '2\/2\/2019',
        price: '100 000',
    },
    {
        name: 'Obec Kondrac',
        lng: 14.88804,
        lat: 49.68009,
        desc: 'Pořízení DA pro JPO V-Obec Kondrac',
        date: '5\/7\/2019',
        price: '707 093,75',
    },
    {
        name: 'Město Morkovice-Slížany',
        lng: 17.20694,
        lat: 49.24734,
        desc: 'Polopodzemní kontejnery-Město Morkovice-Slížany',
        date: '6\/3\/2019',
        price: '1 360 705,5',
    },
    {
        name: 'Městská zeleň Znojmo',
        lng: 16.07477,
        lat: 48.85506,
        desc: 'Pořízení elektrovozidel-Městská zeleň Znojmo',
        date: '10\/22\/2018',
        price: '450 000',
    },
    {
        name: 'POZEMNÍ KOMUNIKACE BOHEMIA, a.s.',
        lng: 14.12523,
        lat: 50.12286,
        desc: 'Snížení prašnosti v areálu společnosti-POZEMNÍ KOMUNIKACE BOHEMIA, a.s.',
        date: '6\/23\/2019',
        price: '2 289 167,48',
    },
    {
        name: 'Technické služby města Nového Jičína, příspěvková organizace',
        lng: 18.02409,
        lat: 49.60492,
        desc: 'Pořízení elektromobilů-Technické služby města Nového Jičína, příspěvková organizace',
        date: '6\/7\/2018',
        price: '1 200 000',
    },
    {
        name: 'Lersen CZ,s.r.o.',
        lng: 14.84718,
        lat: 50.86165,
        desc: 'Technologická inovace ve společnosti Lersen CZ s.r.o.',
        date: '7\/3\/2018',
        price: '3 629 500',
    },
    {
        name: 'Město Úštěk',
        lng: 14.36427,
        lat: 50.59282,
        desc: 'Pořízení elektromobilu-Město Úštěk',
        date: '4\/25\/2018',
        price: '500 000',
    },
    {
        name: 'Město Červená Řečice',
        lng: 15.18033,
        lat: 49.51139,
        desc: 'Pořízení elektromobilu-Město Červená Řečice',
        date: '3\/27\/2019',
        price: '9 332 325',
    },
    {
        name: 'Obec Strašín',
        lng: 13.65903,
        lat: 49.17093,
        desc: 'Rozšíření sběru separovaných odpadů v obci Strašín',
        date: '2\/26\/2018',
        price: '100 000',
    },
    {
        name: 'Město Golčův Jeníkov',
        lng: 15.46742,
        lat: 49.81103,
        desc: 'Pořízení DA pro JPO II-Město Golčův Jeníkov',
        date: '2\/8\/2018',
        price: '600 000',
    },
    {
        name: 'Bergasto a.s.',
        lng: 17.25932,
        lat: 49.58263,
        desc: 'Snížení emisí TZL-Bergasto s.r.o.',
        date: '7\/15\/2019',
        price: '605 837,92',
    },
    {
        name: 'Bergasto a.s.',
        lng: 17.25932,
        lat: 49.58263,
        desc: 'Pořízení drticí jednotky se závěsným třídičem -Bergasto s.r.o.',
        date: '3\/21\/2018',
        price: '1 140 000',
    },
    {
        name: 'SERVIS VINCENCI s.r.o.',
        lng: 15.99167,
        lat: 49.83656,
        desc: 'Fotovoltaická výrobna elektrické energie s akumulací, SERVIS VINCENCI s.r.o.',
        date: '7\/3\/2018',
        price: '4 479 500',
    },
    {
        name: 'TBS Světlá nad Sázavou, p.o.',
        lng: 15.39303,
        lat: 49.67285,
        desc: 'Rozšíření sběrných míst pro separované odpady-TBS Světlá nad Sázavou, p.o.',
        date: '7\/3\/2018',
        price: '7 649 250',
    },
    {
        name: 'TBS Světlá nad Sázavou, p.o.',
        lng: 15.39303,
        lat: 49.67285,
        desc: 'Rozšíření sběrného dvora-TBS Světlá nad Sázavou, p.o.',
        date: '5\/28\/2018',
        price: '1 380 211,19',
    },
    {
        name: 'Obec Střílky',
        lng: 17.21409,
        lat: 49.13975,
        desc: 'Sběrné místo odpadů Střílky, parc. č. 311\/1, 311\/2',
        date: '7\/15\/2019',
        price: '610 929',
    },
    {
        name: 'Obec Hybrálec',
        lng: 15.5476,
        lat: 49.441143,
        desc: 'Pořízení kontejnerů s drtičem-Obec Hybrálec',
        date: '8\/21\/2018',
        price: '848 512,5',
    },
    {
        name: 'Správa majetku města Chropyně,příspěvková organizace',
        lng: 17.36782,
        lat: 49.35692,
        desc: 'Pořízení kontejnerů a štěpkovače-Správa majetku města Chropyně,příspěvková organizace',
        date: '7\/15\/2019',
        price: '791 718,73',
    },
    {
        name: 'Město Golčův Jeníkov',
        lng: 15.46742,
        lat: 49.81103,
        desc: 'Rekostrukce veřejného osvětlení-Město Golčův Jeníkov',
        date: '8\/21\/2018',
        price: '883 131,81',
    },
    {
        name: 'Městys Luka nad Jihlavou',
        lng: 15.70577,
        lat: 49.37347,
        desc: 'Rozšíření sběrného dvora-Městys Luka nad Jihlavou',
        date: '8\/21\/2018',
        price: '743 841,02',
    },
    {
        name: 'Město Aš',
        lng: 12.22522,
        lat: 50.22395,
        desc: 'Pořízení nádob na separované odpady-Město Aš',
        date: '4\/6\/2018',
        price: '431 706',
    },
    {
        name: 'VRAMAT CZ s.r.o.',
        lng: 14.32207,
        lat: 50.19071,
        desc: 'Pořízení technologie pro snížení emisí-VRAMAT CZ s.r.o.',
        date: '7\/3\/2018',
        price: '2 315 832,31',
    },
    {
        name: 'LB MINERALS, s.r.o.',
        lng: 13.37444,
        lat: 49.8516,
        desc: 'Pořízení filtrů pro snížení emisí-LB MINERALS, s.r.o.',
        date: '8\/21\/2018',
        price: '589 207,08',
    },
    {
        name: 'Technické služby města Morkovice-Slížany, příspěvková organizace',
        lng: 17.21227,
        lat: 49.25367,
        desc: 'Předcházení vzniku odpadů-Technické služby města Morkovice-Slížany, příspěvková organizace',
        date: '8\/21\/2018',
        price: '3 697 840',
    },
    {
        name: 'Technické služby Lanškroun, s.r.o.',
        lng: 16.60211,
        lat: 49.90873,
        desc: 'Podpora domácího kompostování-Technické služby Lanškroun, s.r.o.',
        date: '7\/3\/2018',
        price: '2 354 000',
    },
    {
        name: 'Obec Radějov',
        lng: 17.36208,
        lat: 48.84973,
        desc: 'Domácí kompostování-obec Radějov',
        date: '12\/20\/2017',
        price: '1 466 229,6',
    },
    {
        name: 'Obec Vranová Lhota',
        lng: 16.81745,
        lat: 49.7082,
        desc: 'Pořízení kompostérů a štěpkovače pro obec Vranová Lhota',
        date: '12\/21\/2017',
        price: '1 536 208,74',
    },
    {
        name: 'Obec Velké Hostěrádky',
        lng: 16.8734,
        lat: 49.04209,
        desc: 'Pořízení kompostérů pro obec Velké Hostěrádky',
        date: '7\/28\/2017',
        price: '2 071 604,7',
    },
    {
        name: 'Obec Měrovice nad Hanou',
        lng: 17.24987,
        lat: 49.35272,
        desc: 'Pořízení kompostérů a drtiče dřevní hmoty pro obec Měrovice nad Hanou',
        date: '7\/28\/2017',
        price: '846 661,2',
    },
    {
        name: 'Obec Střílky',
        lng: 17.21409,
        lat: 49.13975,
        desc: 'Pořízení kompostérů a štěpkovače obec Střílky',
        date: '7\/28\/2017',
        price: '733 217,65',
    },
    {
        name: 'Technické služby Bučovice, příspěvková organizace',
        lng: 17.00636,
        lat: 49.14642,
        desc: 'Pořízení kompostérů a štěpkovače pro Technické služby Bučovice, příspěvková organizace',
        date: '12\/21\/2017',
        price: '1 158 611,29',
    },
    {
        name: 'Městys Doubravice nad Svitavou',
        lng: 16.62977,
        lat: 49.43616,
        desc: 'Pořízení kompostérů pro městys Doubravice nad Svitavou',
        date: '12\/21\/2017',
        price: '880 650,76',
    },
    {
        name: 'Městys Protivanov',
        lng: 16.83633,
        lat: 49.48272,
        desc: 'Pořízení kompostérů pro městys Protivanov',
        date: '12\/21\/2017',
        price: '944 034,14',
    },
    {
        name: 'Obec Plískov',
        lng: 13.73458,
        lat: 49.84604,
        desc: 'Podpora domácího kompostování-obec Plískov',
        date: '7\/28\/2017',
        price: '947 865,6',
    },
    {
        name: 'Technické služby města Vítkova, příspěvková organizace',
        lng: 17.75785,
        lat: 49.78024,
        desc: 'Pořízení kompostérů a kontejneru na textil-Technické služby města Vítkova, příspěvková organizace',
        date: '12\/21\/2017',
        price: '637 402,59',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'Rozšíření sběrných míst-Město Krásná Hora nad Vltavou',
        date: '6\/10\/2019',
        price: '598 484,15',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'Podpora domácího kompostování-Město Krásná Hora nad Vltavou',
        date: '12\/20\/2017',
        price: '1 499 553',
    },
    {
        name: 'Město Blšany',
        lng: 13.47215,
        lat: 50.21746,
        desc: 'Pořízení kompostérů-Město Blšany',
        date: '7\/15\/2019',
        price: '1 900 338,88',
    },
    {
        name: 'Obec Kunčina',
        lng: 16.61381,
        lat: 49.7951,
        desc: 'Pořízení kompostérů, štěpkovače a kontejneru na textil-obec Kunčina',
        date: '12\/21\/2017',
        price: '777 011,18',
    },
    {
        name: 'Město Holešov',
        lng: 17.57655,
        lat: 49.33994,
        desc: 'Podpora domácího kompostování-Město Holešov',
        date: '11\/25\/2019',
        price: '1 527 322,5',
    },
    {
        name: 'Obec Bílá Lhota',
        lng: 16.98543,
        lat: 49.72073,
        desc: 'Domácí kompostování-obec Bílá Lhota',
        date: '7\/28\/2017',
        price: '1 627 292,7',
    },
    {
        name: 'Obec Loukov',
        lng: 17.72675,
        lat: 49.41893,
        desc: 'Domácí kompostování-obec Loukov',
        date: '12\/21\/2017',
        price: '1 578 953,2',
    },
    {
        name: 'Obec Dětkovice',
        lng: 17.14138,
        lat: 49.27413,
        desc: 'Domácí kompostování-obec Dětkovice',
        date: '7\/28\/2017',
        price: '2 752 117,89',
    },
    {
        name: 'Obec Čermná nad Orlicí',
        lng: 16.15005,
        lat: 50.07972,
        desc: 'Domácí kompostování-obec Čermná nad Orlicí',
        date: '12\/21\/2017',
        price: '865 277,05',
    },
    {
        name: 'Město Hluk',
        lng: 17.5272,
        lat: 48.9886,
        desc: 'Podpora domácího kompostování-Město Hluk',
        date: '7\/28\/2017',
        price: '1 260 957,44',
    },
    {
        name: 'Obec Určice',
        lng: 17.08664,
        lat: 49.42754,
        desc: 'Podpora domácího kompostování v obci Určice',
        date: '7\/28\/2017',
        price: '2 066 050,8',
    },
    {
        name: 'Služby města Králíky s.r.o.',
        lng: 16.76264,
        lat: 50.08176,
        desc: 'Pořízení kompostérů se štěpkovačem-Služby města  Králíky, s.r.o.',
        date: '12\/21\/2017',
        price: '1 525 545,25',
    },
    {
        name: 'Obec Březina',
        lng: 16.75818,
        lat: 49.28241,
        desc: 'Podpora domácího kompostování-obec Březina',
        date: '12\/21\/2017',
        price: '2 138 971,45',
    },
    {
        name: 'Městys Luka nad Jihlavou',
        lng: 15.70577,
        lat: 49.37347,
        desc: 'Pořízení kompostérů a štěpkovače-Městys Luka nad Jihlavou',
        date: '12\/20\/2017',
        price: '3 122 677,3',
    },
    {
        name: 'Obec Liboš',
        lng: 17.21628,
        lat: 49.70041,
        desc: 'Pořízení kompostérů a štěpkovače pro obec Liboš',
        date: '12\/21\/2017',
        price: '637 605,79',
    },
    {
        name: 'Obec Držovice',
        lng: 17.14119,
        lat: 49.49587,
        desc: 'Pořízení kompostérů se štěpkovačem-obec Držovice',
        date: '12\/20\/2017',
        price: '1 845 005,58',
    },
    {
        name: 'Obec Troubelice',
        lng: 17.07634,
        lat: 49.81553,
        desc: 'Pořízení kompostérů se štěpkovačem-obec Troubelice',
        date: '12\/21\/2017',
        price: '619 300,99',
    },
    {
        name: 'Obec Šetějovice',
        lng: 15.22607,
        lat: 49.65105,
        desc: 'Pořízení DA pro JPO V-obec Šetějovice',
        date: '12\/20\/2017',
        price: '2 516 739,5',
    },
    {
        name: 'ROSTĚNICE,a.s.',
        lng: 16.95787,
        lat: 49.24211,
        desc: 'Pořízení technologického vybavení pro společnost ROSTĚNICE,a.s.',
        date: '12\/20\/2017',
        price: '2 200 455,18',
    },
    {
        name: 'Obec Křížkový Újezdec',
        lng: 14.59016,
        lat: 49.93803,
        desc: 'Pořízení DA pro JPO V-obec Křížkový Újezdec',
        date: '2\/14\/2018',
        price: '450 000',
    },
    {
        name: 'MERKURIA CL s.r.o.',
        lng: 14.40196,
        lat: 50.0892,
        desc: 'Snížení energetické náročnosti budov p.č.5412\/16 a 5412\/19 v k.ú. Česká Lípa-MERKURIA CL s.r.o.',
        date: '11\/13\/2017',
        price: '320 000',
    },
    {
        name: 'Obec Bedihošť',
        lng: 17.15623,
        lat: 49.44508,
        desc: 'Pořízení kompostérů a drtiče bioodpadu pro obec Bedihošť',
        date: '2\/14\/2018',
        price: '450 000',
    },
    {
        name: 'MADEX TRADING, s.r.o.',
        lng: 14.49369,
        lat: 49.98534,
        desc: 'Kovošrot Petrovice-snížení energetické náročnosti provozovny',
        date: '9\/20\/2019',
        price: '6 055 215,58',
    },
    {
        name: 'Obec Zlobice',
        lng: 17.3101,
        lat: 49.29544,
        desc: 'Pořízení kompostérů a drtiče pro obec Zlobice',
        date: '12\/20\/2017',
        price: '1 360 705,5',
    },
    {
        name: 'Jiří Vincenci',
        lng: 15.99156,
        lat: 49.83919,
        desc: 'Snížení energetické náročnosti budov STK Skuteč',
        date: '11\/16\/2017',
        price: '2 886 522,1',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Splašková kanalizace, přečerpávání  na ČOV v k.ú. Stupárovice a Golčův Jeníkov',
        date: '7\/28\/2017',
        price: '1 278 952,09',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Vodovod Kyjov',
        date: '5\/2\/2017',
        price: '4 096 619,02',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Vodovod v k.ú Stupárovice a Golčův Jeníkov',
        date: '5\/31\/2017',
        price: '5 062 387,5',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Vodovod pro obec Římovice - Budka',
        date: '5\/31\/2017',
        price: '4 959 174,15',
    },
    {
        name: 'Obec Pojbuky',
        lng: 14.89915,
        lat: 49.49908,
        desc: 'Výtlačný řad VR 5-obec Pojbuky',
        date: '5\/31\/2017',
        price: '3 703 992,65',
    },
    {
        name: 'Obec Chraštice',
        lng: 14.0728,
        lat: 49.57648,
        desc: 'Půdní vestavba ZŠ Chraštice',
        date: '5\/31\/2017',
        price: '11 111 966,87',
    },
    {
        name: 'ZKJD-TECH s.r.o.',
        lng: 17.05198,
        lat: 49.68707,
        desc: 'Pořízení drticí jednotky pro společnost ZKJD-TECH s.r.o.',
        date: '5\/30\/2017',
        price: '2 520 993,11',
    },
    {
        name: 'LP STAVBY s.r.o.',
        lng: 13.44893,
        lat: 50.49848,
        desc: 'Pořízení mobilní drtící a třídící jednotky s příslušenstvím pro společnost LP STAVBY s.r.o.',
        date: '9\/1\/2017',
        price: '17 200 194,3',
    },
    {
        name: '3K značky s.r.o.',
        lng: 14.6588,
        lat: 49.99288,
        desc: 'Pořízení vozidla s kontejnery na svoz bioodpadů-3K značky s.r.o.',
        date: '3\/22\/2017',
        price: '1 812 150',
    },
    {
        name: 'Město Březová nad Svitavou',
        lng: 16.51301,
        lat: 49.65861,
        desc: 'Pořízení kompostérů a štěpkovače – Město Březová nad Svitavou',
        date: '5\/10\/2017',
        price: '6 418 630,35',
    },
    {
        name: 'Město Březová nad Svitavou',
        lng: 16.51301,
        lat: 49.65861,
        desc: 'Sběrný dvůr – Město Březová nad Svitavou',
        date: '6\/13\/2017',
        price: '972 250',
    },
    {
        name: 'Oldřich Poláček',
        lng: 14.29282,
        lat: 50.17096,
        desc: 'Výstavba homogenizační jednotky-Oldřich Poláček',
        date: '3\/16\/2017',
        price: '1 726 851,5',
    },
    {
        name: 'Technické služby města Úvaly, příspěvková organizace',
        lng: 14.7318,
        lat: 50.07223,
        desc: 'Pořízení biopopelnic pro Technické služby města Úvaly',
        date: '6\/10\/2017',
        price: '4 428 482,15',
    },
    {
        name: 'Obec Mašovice',
        lng: 15.97802,
        lat: 48.86087,
        desc: 'Pořízení nosiče kontejnerů s kontejnery a drtiče dřevní hmoty-obec Mašovice',
        date: '6\/21\/2017',
        price: '5 478 250',
    },
    {
        name: 'Služby města Králíky s.r.o.',
        lng: 16.76264,
        lat: 50.08176,
        desc: 'Rozšíření separace odpadů ve městě Králíky',
        date: '6\/13\/2017',
        price: '1 332 936',
    },
    {
        name: 'MOP BRNO, spol. s r.o.',
        lng: 16.53295,
        lat: 49.19729,
        desc: 'Pořízení nosiče kontejnerů s kontejnery-MOP BRNO, spol. s r.o.',
        date: '7\/18\/2017',
        price: '1 016 775,1',
    },
    {
        name: 'Mikroregion Porta Bohemica',
        lng: 14.07764,
        lat: 50.55811,
        desc: 'Rozšíření separace odpadů pro Mikroregion Porta Bohemica',
        date: '7\/18\/2017',
        price: '551 650',
    },
    {
        name: 'Mikroregion Porta Bohemica',
        lng: 14.07764,
        lat: 50.55811,
        desc: 'Pořízení kompostérů a štěpkovačů pro Mikroregion Porta Bohemica',
        date: '6\/13\/2017',
        price: '1 265 004',
    },
    {
        name: 'Obec Křížkový Újezdec',
        lng: 14.59016,
        lat: 49.93803,
        desc: 'Odbahnění a oprava rybníka na p.č. 58\/4 v k.ú. Křížkový Újezdec',
        date: '6\/10\/2017',
        price: '992 057,95',
    },
    {
        name: 'Město Český Krumlov',
        lng: 14.31127,
        lat: 48.81581,
        desc: 'Rozšíření separace složek odpadů-Město Český Krumlov',
        date: '3\/9\/2017',
        price: '2 167 440,5',
    },
    {
        name: 'Obec Bělá nad Svitavou',
        lng: 16.48494,
        lat: 49.64287,
        desc: 'Rozšíření sběru separovaných odpadů v obci Bělá nad Svitavou',
        date: '3\/14\/2017',
        price: '234 963,47',
    },
    {
        name: 'Obec Březina',
        lng: 16.75818,
        lat: 49.28241,
        desc: 'Pořízení malotraktoru pro obec Březina',
        date: '6\/13\/2017',
        price: '2 118 257,46',
    },
    {
        name: 'Město Znojmo',
        lng: 16.06332,
        lat: 48.86212,
        desc: 'Rozšíření separace odpadů ve městě Znojmo',
        date: '5\/29\/2017',
        price: '577 667,31',
    },
    {
        name: 'Obec Neslovice',
        lng: 16.39694,
        lat: 49.14395,
        desc: 'Rozšíření separace odpadů v obci Neslovice',
        date: '11\/30\/2016',
        price: '249 999',
    },
    {
        name: 'goodooga s.r.o.',
        lng: 14.67115,
        lat: 49.93611,
        desc: 'Modernizace portálu "Nevyhazuj to" v rámci předcházení vzniku odpadů ',
        date: '5\/29\/2017',
        price: '1 426 241,52',
    },
    {
        name: 'Obec Loket',
        lng: 15.1348,
        lat: 49.67025,
        desc: 'Rozšíření separace a stavební úpravy sběrných míst v obci Loket',
        date: '6\/13\/2017',
        price: '1 260 290,98',
    },
    {
        name: 'Obec Svratouch',
        lng: 16.05226,
        lat: 49.72774,
        desc: 'Přístavba a stavební úpravy Obecního úřadu Svratouch č.p. 290 na Hasičskou zbrojnici s Obecním úřadem',
        date: '2\/28\/2017',
        price: '864 688',
    },
    {
        name: 'EKO - Unimed, s.r.o.',
        lng: 17.07751,
        lat: 49.79694,
        desc: 'Rozšíření sběrných míst EKO - UNIMED s.r.o.',
        date: '7\/18\/2017',
        price: '1 419 576,84',
    },
    {
        name: 'EKO - Unimed, s.r.o.',
        lng: 17.07751,
        lat: 49.79694,
        desc: 'Pořízení svozového vozidla a biopopelnic pro společnost EKO - Unimed, s.r.o.',
        date: '5\/28\/2018',
        price: '12 601 063,8',
    },
    {
        name: 'Obec Kunice',
        lng: 16.49123,
        lat: 49.47925,
        desc: 'Rozšíření svozových míst a pořízení štěpkovače pro obec Kunice',
        date: '6\/13\/2017',
        price: '514 250',
    },
    {
        name: 'Služby Kunice spol. s r.o.',
        lng: 14.67115,
        lat: 49.93611,
        desc: 'Svoz bioodpadů v obci Kunice',
        date: '6\/13\/2017',
        price: '1 347 000',
    },
    {
        name: 'Obec Chlebičov',
        lng: 17.97734,
        lat: 49.96221,
        desc: 'Svoz bioodpadů v obci Chlebičov',
        date: '7\/18\/2017',
        price: '925 650',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'Sběrný dvůr-Město Krásná Hora nad Vltavou',
        date: '7\/18\/2017',
        price: '534 500',
    },
    {
        name: 'Obec Babice nad Svitavou',
        lng: 16.69709,
        lat: 49.28509,
        desc: 'Pořízení nosiče kontejnerů a štěpkovače pro obec Babice nad Svitavou',
        date: '7\/18\/2017',
        price: '1 067 075,1',
    },
    {
        name: 'Obec Nesovice',
        lng: 17.08776,
        lat: 49.14687,
        desc: 'Pořízení vyvážecího vleku za traktor-obec Nesovice',
        date: '6\/13\/2017',
        price: '5 584 457,76',
    },
    {
        name: 'Obec Babice nad Svitavou',
        lng: 16.69709,
        lat: 49.28509,
        desc: 'Pořízení malotraktoru pro lesní hospodářství- obec Babice nad Svitavou',
        date: '6\/10\/2017',
        price: '892 223,75',
    },
    {
        name: 'Obec Malé Žernoseky',
        lng: 14.03879,
        lat: 50.53874,
        desc: 'Pořízení nosiče kontejnerů s rozšířením svozových míst pro obec Malé Žernoseky',
        date: '11\/30\/2016',
        price: '247 500',
    },
    {
        name: 'Technické služby města Vsetína, příspěvková organizace',
        lng: 18.03928,
        lat: 49.34948,
        desc: 'Pořízení vozidla na svoz bioodpadů-Technické služby města Vsetína, příspěvková organizace',
        date: '11\/30\/2016',
        price: '249 999',
    },
    {
        name: 'Technické služby města Nového Jičína, příspěvková organizace',
        lng: 18.02409,
        lat: 49.60492,
        desc: 'Pořízení vozidla na svoz BRO pro město Nový Jičín',
        date: '6\/10\/2017',
        price: '829 064,5',
    },
    {
        name: 'Obec Soutice',
        lng: 15.05104,
        lat: 49.73178,
        desc: 'Pořízení kompostérů a štěpkovače pro obec Soutice',
        date: '7\/18\/2017',
        price: '808 885',
    },
    {
        name: 'Obec Veverské Knínice',
        lng: 16.40646,
        lat: 49.23489,
        desc: 'Rozšíření separace odpadů v obci Veverské Knínice',
        date: '6\/13\/2017',
        price: '1 152 212,5',
    },
    {
        name: 'Svazek obcí Větrník',
        lng: 16.96531,
        lat: 49.23844,
        desc: 'Pořízení kompostérů a štěpkovačů-Svazek obcí Větrník',
        date: '12\/21\/2017',
        price: '1 202 419,35',
    },
    {
        name: 'Město Vimperk',
        lng: 13.76102,
        lat: 49.04912,
        desc: 'Rozšíření systému separace odpadů- město Vimperk',
        date: '6\/27\/2017',
        price: '927 593,86',
    },
    {
        name: 'Mikroregion Miroslavsko',
        lng: 16.31221,
        lat: 48.94581,
        desc: 'Pořízení nádob na separované složky odpadů-mikroregion Miroslavsko ',
        date: '3\/9\/2017',
        price: '2 378 406,25',
    },
    {
        name: 'Mikroregion Miroslavsko',
        lng: 16.31221,
        lat: 48.94581,
        desc: 'Pořízení kompostérů pro mikroregion Miroslavsko',
        date: '6\/10\/2017',
        price: '3 367 686,4',
    },
    {
        name: 'Městys Jimramov',
        lng: 16.22574,
        lat: 49.63737,
        desc: 'Sběrné místo-městys Jimramov',
        date: '6\/10\/2017',
        price: '857 563,3',
    },
    {
        name: 'Obec Všelibice',
        lng: 14.95714,
        lat: 50.63237,
        desc: 'Půdní vestavba hasičské zbrojnice Všelibice',
        date: '3\/13\/2017',
        price: '2 069 382,8',
    },
    {
        name: 'Obec Lipovec',
        lng: 16.80598,
        lat: 49.38386,
        desc: 'Pořízení nosiče kontejnerů s kontejnery na bioodpad a štěpkovače obec Lipovec',
        date: '7\/18\/2017',
        price: '1 647 483,18',
    },
    {
        name: 'SPETRA CZ s.r.o.',
        lng: 18.53048,
        lat: 49.71328,
        desc: 'Zachycení a odsávání plynů z mytí automobilových cisteren',
        date: '6\/21\/2017',
        price: '3 852 035,1',
    },
    {
        name: 'Obec Říčany',
        lng: 14.66071,
        lat: 49.98725,
        desc: 'Pořízení kompostérů a štěpkovače obec Říčany',
        date: '6\/10\/2017',
        price: '667 496,5',
    },
    {
        name: 'Obec Otaslavice',
        lng: 17.0607,
        lat: 49.38965,
        desc: 'Výstavba sběrného dvora pro obec Otaslavice',
        date: '3\/14\/2017',
        price: '804 948',
    },
    {
        name: 'Technické služby Města Bystré s.r.o.',
        lng: 16.3441,
        lat: 49.62863,
        desc: 'Svoz bioodpadů -Technické služby Města Bystré s.r.o.',
        date: '2\/27\/2017',
        price: '2 499 255',
    },
    {
        name: 'Obec Křížkový Újezdec',
        lng: 14.59016,
        lat: 49.93803,
        desc: 'Pořízení kompostérů obec Křížkový Újezdec',
        date: '6\/13\/2017',
        price: '4 937 801,75',
    },
    {
        name: 'Obec Velký Týnec',
        lng: 17.32925,
        lat: 49.55353,
        desc: 'Výstavba sběrného dvora obec Velký Týnec',
        date: '5\/29\/2017',
        price: '532 950',
    },
    {
        name: 'Obec Jaroměřice',
        lng: 16.76966,
        lat: 49.62023,
        desc: 'Pořízení kompostérů, štěpkovače a kontejneru na textil pro obec Jaroměřice',
        date: '2\/27\/2017',
        price: '871 139',
    },
    {
        name: 'Obec Jaroměřice',
        lng: 16.76966,
        lat: 49.62023,
        desc: 'Rozšíření sběrného dvora pro obec Jaroměřice',
        date: '6\/13\/2017',
        price: '3 943 197,94',
    },
    {
        name: 'Obec Jindřichovice pod Smrkem',
        lng: 15.25588,
        lat: 50.95739,
        desc: 'Pořízení DA pro JPO III obec Jindřichovice pod Smrkem',
        date: '3\/13\/2017',
        price: '1 334 993',
    },
    {
        name: 'Obec Rudíkov',
        lng: 15.93529,
        lat: 49.28859,
        desc: 'Pořízení CAS pro JPO III obec Rudíkov',
        date: '6\/10\/2017',
        price: '1 857 471',
    },
    {
        name: 'Obec Svratouch',
        lng: 16.05226,
        lat: 49.72774,
        desc: 'Pořízení CAS pro obec Svratouch',
        date: '7\/11\/2016',
        price: '450 000',
    },
    {
        name: 'Obec Košťálov',
        lng: 15.41449,
        lat: 50.5793,
        desc: 'Pořízení CAS pro Obec Košťálov',
        date: '6\/9\/2016',
        price: '6 896 150',
    },
    {
        name: 'Město Hluk',
        lng: 17.5272,
        lat: 48.9886,
        desc: 'SBĚRNÝ DVŮR MĚSTA HLUK-ZVÝŠENÍ KAPACITY TŘÍDĚNÍ ODPADŮ VČETNĚ ROZŠÍŘENÍ DRUHOVÉ SKLADBY',
        date: '6\/27\/2016',
        price: '7 399 998',
    },
    {
        name: 'Město Golčův Jeníkov',
        lng: 15.46742,
        lat: 49.81103,
        desc: 'Pořízení CAS pro Město Golčův Jeníkov',
        date: '6\/27\/2016',
        price: '6 715 926,5',
    },
    {
        name: 'Obec Střílky',
        lng: 17.21409,
        lat: 49.13975,
        desc: 'KD Střílky – realizace úspor energie',
        date: '5\/29\/2017',
        price: '3 627 173,69',
    },
    {
        name: 'Město Velké Pavlovice',
        lng: 16.83694,
        lat: 48.9015,
        desc: 'Pořízení velkokapacitní CAS Město Velké Pavlovice',
        date: '6\/27\/2016',
        price: '7 688 088',
    },
    {
        name: 'Obec Troubelice',
        lng: 17.07634,
        lat: 49.81553,
        desc: 'Pořízení hasičské cisterny pro obec Troubelice',
        date: '8\/24\/2016',
        price: '1 466 008,8',
    },
    {
        name: 'Obec Říčany',
        lng: 16.393,
        lat: 49.21522,
        desc: 'Vybudování sběrného dvora obec Říčany',
        date: '7\/19\/2016',
        price: '7 128 642',
    },
    {
        name: 'Obec Kobylí',
        lng: 16.90216,
        lat: 48.94409,
        desc: 'Pořízení hasičského vozidla pro obec Kobylí',
        date: '6\/27\/2016',
        price: '6 849 981',
    },
    {
        name: 'Město Proseč',
        lng: 16.09839,
        lat: 49.79269,
        desc: 'Pořízení požárního vozidla pro město Proseč',
        date: '6\/13\/2017',
        price: '2 208 230,3',
    },
    {
        name: 'ADOS CZ a.s.',
        lng: 15.42275,
        lat: 50.78233,
        desc: 'Pořízení stavebních technologií pro společnost ADOS CZ a.s.',
        date: '6\/16\/2016',
        price: '8 216 171',
    },
    {
        name: 'Ing. Jan Kotrba',
        lng: 14.41136,
        lat: 50.01304,
        desc: 'Pořízení technologií pro modernizaci výroby Ing. Jan Kotrba',
        date: '6\/30\/2016',
        price: '4 316 274,92',
    },
    {
        name: 'Tomáš Krpálek',
        lng: 15.50271,
        lat: 49.51503,
        desc: 'Kompostárna Tomáš Krpálek',
        date: '6\/8\/2016',
        price: '2 340 000',
    },
    {
        name: 'Obec Herálec',
        lng: 15.99115,
        lat: 49.68868,
        desc: 'Svoz bioodpadu v obci Obec Herálec',
        date: '7\/28\/2016',
        price: '9 900 000',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Optimalizace procesu úpravy vody ÚV Světlá nad Sázavou',
        date: '6\/13\/2016',
        price: '4 624 765',
    },
    {
        name: 'Vodovody a kanalizace Havlíčkův Brod, a. s.',
        lng: 15.59811,
        lat: 49.60646,
        desc: 'Zvýšení kapacity vodovodu "Úpravna vody Želivka- Ledeč nad Sázavou- Havlíčkův Brod" - II. etapa',
        date: '3\/21\/2016',
        price: '1 332 936',
    },
    {
        name: 'Šárka Matušíková',
        lng: 14.34917,
        lat: 50.46252,
        desc: 'Vybudování kompostárny Šárka Matušíková',
        date: '5\/4\/2016',
        price: '17 561 549,29',
    },
    {
        name: 'Radek Matoušek',
        lng: 14.34917,
        lat: 50.46252,
        desc: 'Vybudování kompostárny Radek Matoušek',
        date: '5\/4\/2016',
        price: '57 807 830,62',
    },
    {
        name: 'Obec Věž',
        lng: 15.44886,
        lat: 49.57076,
        desc: 'Rozšíření svozu bioodpadu a separovaného odpadu v obci Věž',
        date: '4\/19\/2016',
        price: '6 265 622',
    },
    {
        name: 'Obec Kostelní Myslová',
        lng: 15.4285,
        lat: 49.14795,
        desc: 'Svoz bioodpadu v obci Kostelní Myslová',
        date: '4\/19\/2016',
        price: '5 567 500',
    },
    {
        name: 'CONKLINE a.s.',
        lng: 14.73514,
        lat: 50.13048,
        desc: 'Modernizace technologie ve společnosti Conkline a.s.',
        date: '6\/13\/2016',
        price: '807 518,7',
    },
    {
        name: 'CHPS s.r.o.',
        lng: 13.42122,
        lat: 50.45634,
        desc: 'Pořízení technologií ke snížení emisí CHPS s.r.o.',
        date: '6\/2\/2016',
        price: '841 500',
    },
    {
        name: 'Technické služby města Kraslic, příspěvková organizace',
        lng: 12.52071,
        lat: 50.34267,
        desc: 'Pořízení sběrných nádob město Kraslice',
        date: '11\/12\/2015',
        price: '29 250 000',
    },
    {
        name: 'R A N s.r.o.',
        lng: 13.43461,
        lat: 50.17966,
        desc: 'Modernizace technologie ve společnosti R A N s.r.o.',
        date: '3\/7\/2016',
        price: '1 836 000',
    },
    {
        name: 'Skládka pod Haldou s.r.o.',
        lng: 16.06649,
        lat: 50.51644,
        desc: 'Vybavení kompostárny Skládka pod Haldou s.r.o.',
        date: '3\/21\/2016',
        price: '3 444 549',
    },
    {
        name: 'STROJÍRNY Rumburk s.r.o.',
        lng: 14.58054,
        lat: 50.94291,
        desc: 'Multifunkční soustružnicko frézovací centrum',
        date: '10\/22\/2015',
        price: '4 050 000',
    },
    {
        name: 'Ing. Josef Korhoň',
        lng: 17.04304,
        lat: 49.47189,
        desc: 'Vybavení kompostárny Ing. Josef Korhoň',
        date: '3\/21\/2016',
        price: '1 445 000',
    },
    {
        name: 'Fullcom systems, s.r.o.',
        lng: 18.26581,
        lat: 49.83094,
        desc: 'Inovace informačního systému FIS',
        date: '10\/26\/2015',
        price: '5 250 000',
    },
    {
        name: 'Lombard řezivo s.r.o.',
        lng: 17.14375,
        lat: 49.67943,
        desc: 'Pořízení výrobní technologie Lombard řezivo s.r.o.',
        date: '3\/21\/2016',
        price: '5 399 200',
    },
    {
        name: 'Petr Očenášek',
        lng: 17.24053,
        lat: 49.59011,
        desc: 'Náhrada technologie za účelem snížení emisí TZL Petr Očenášek',
        date: '3\/8\/2017',
        price: '3 487 803,75',
    },
    {
        name: 'ALMIPA plus s.r.o.',
        lng: 17.21042,
        lat: 48.97379,
        desc: 'Modernizace výroby společnosti ALMIPA plus s.r.o.',
        date: '11\/23\/2015',
        price: '5 152 500',
    },
    {
        name: 'FREKOMOS, s.r.o.',
        lng: 17.98337,
        lat: 49.46753,
        desc: 'Pořízení silniční frézy s 3D nivelačním systémem-FREKOMOS, s.r.o.',
        date: '3\/21\/2016',
        price: '3 245 980',
    },
    {
        name: 'Obec Česká Ves',
        lng: 17.22285,
        lat: 50.25223,
        desc: 'Svoz a separace bioodpadů v obci Česká Ves',
        date: '10\/14\/2015',
        price: '1 125 000',
    },
    {
        name: 'Svozová s.r.o.',
        lng: 17.12348,
        lat: 49.77051,
        desc: 'Svoz a separace BRO- Svozová s.r.o.',
        date: '3\/27\/2018',
        price: '4 718 000',
    },
    {
        name: 'Jan Krpálek',
        lng: 15.50271,
        lat: 49.51503,
        desc: 'Svoz a separace BRO Jan Krpálek',
        date: '4\/16\/2015',
        price: '1 958 940',
    },
    {
        name: 'Obec Hořice',
        lng: 15.18611,
        lat: 49.59811,
        desc: 'Svoz a separace BRO v obci Hořice',
        date: '4\/13\/2015',
        price: '5 472 000',
    },
    {
        name: 'REPROGEN, a.s.',
        lng: 14.70867,
        lat: 49.35797,
        desc: 'Separace a svoz BRO-společnost REPROGEN, a.s.',
        date: '4\/16\/2015',
        price: '4 527 000',
    },
    {
        name: 'Obec Suchohrdly u Miroslavi',
        lng: 16.37604,
        lat: 48.94971,
        desc: 'Separace a svoz bioodpadů v obci Suchohrdly u Miroslavi',
        date: '4\/16\/2015',
        price: '794 654',
    },
    {
        name: 'Obec Všelibice',
        lng: 14.95714,
        lat: 50.63237,
        desc: 'Separace a svoz bioodpadů v obci Všelibice',
        date: '4\/16\/2015',
        price: '5 558 400',
    },
    {
        name: 'Město Kraslice',
        lng: 12.51075,
        lat: 50.32971,
        desc: 'Dětská hřiště a zahrady v přírodním stylu ve městě Kraslice',
        date: '4\/16\/2015',
        price: '720 103',
    },
    {
        name: 'Městys Bobrová',
        lng: 16.11515,
        lat: 49.47899,
        desc: 'Svoz BRO a vybavení kompostárny-městys Bobrová',
        date: '4\/16\/2015',
        price: '1 189 387',
    },
    {
        name: 'Městys Křižanov',
        lng: 16.11062,
        lat: 49.38848,
        desc: 'Svoz biologicky rozložitelných odpadů v městyse Křižanov',
        date: '4\/16\/2015',
        price: '7 890 819',
    },
    {
        name: 'Obec Hrádek',
        lng: 16.26876,
        lat: 48.77609,
        desc: 'Separace a svoz BRO v obci Hrádek',
        date: '4\/16\/2015',
        price: '4 276 503',
    },
    {
        name: 'Obec Senožaty',
        lng: 15.21468,
        lat: 49.56947,
        desc: 'Separace a svoz bioodpadů v obci Senožaty ',
        date: '4\/15\/2015',
        price: '2 285 212',
    },
    {
        name: 'Josef Mázdra',
        lng: 13.94683,
        lat: 49.55808,
        desc: 'Svoz a separace BRO v obci Březnice a okolí',
        date: '4\/15\/2015',
        price: '748 012',
    },
    {
        name: 'Obec Niva',
        lng: 16.85141,
        lat: 49.44531,
        desc: 'Pořízení kompostérů a štěpkovače v rámci likvidace BRO v obci Niva',
        date: '4\/15\/2015',
        price: '728 202',
    },
    {
        name: 'TRADUCI COMPANY s.r.o.',
        lng: 18.25045,
        lat: 49.82715,
        desc: 'Svoz a separace BRO TRADUCI COMPANY s.r.o',
        date: '4\/16\/2015',
        price: '5 558 400',
    },
    {
        name: 'Technické služby Města Bystré s.r.o.',
        lng: 16.3441,
        lat: 49.62863,
        desc: 'Vybavení komunitní kompostárny pro Technické služby města Bystré, s.r.o.',
        date: '4\/15\/2015',
        price: '726 090',
    },
    {
        name: 'Loštická lesní s.r.o.',
        lng: 16.92724,
        lat: 49.74484,
        desc: 'Svozové vozidlo a kontejnery',
        date: '4\/20\/2015',
        price: '4 679 100',
    },
    {
        name: 'Městská část Praha-Lysolaje',
        lng: 14.37371,
        lat: 50.12524,
        desc: 'Systém svozu bioodpadů v městské části Praha-Lysolaje',
        date: '4\/16\/2015',
        price: '1 569 362',
    },
    {
        name: 'Obec Bílá',
        lng: 18.45268,
        lat: 49.45003,
        desc: 'Svoz bioodpadu v obci Bílá',
        date: '4\/16\/2015',
        price: '1 606 500',
    },
    {
        name: 'T E S Český Dub, s.r.o.',
        lng: 14.98004,
        lat: 50.65892,
        desc: 'Systém separace a svozu BRO ve městě Český Dub',
        date: '4\/17\/2015',
        price: '2 233 530',
    },
    {
        name: 'Obec Lipovec',
        lng: 16.80598,
        lat: 49.38386,
        desc: 'Separace a svoz BRO v obci Lipovec',
        date: '4\/16\/2015',
        price: '2 853 756',
    },
    {
        name: 'Obec Řícmanice',
        lng: 16.6935,
        lat: 49.25927,
        desc: 'Likvidace BRO v obci Řícmanice ',
        date: '4\/16\/2015',
        price: '1 979 849',
    },
    {
        name: 'Obec Sebranice',
        lng: 16.57531,
        lat: 49.4968,
        desc: 'Svoz bioodpadu v obci Sebranice',
        date: '4\/20\/2015',
        price: '2 590 244',
    },
    {
        name: 'Město Červená Řečice',
        lng: 15.18033,
        lat: 49.51139,
        desc: 'Separace a svoz BRO v obci Červená Řečice',
        date: '4\/16\/2015',
        price: '737 478',
    },
    {
        name: 'Obec Damnice',
        lng: 16.36487,
        lat: 48.91564,
        desc: 'Svoz a a separace biologicky rozložitelných odpadů v obci Damnice',
        date: '4\/16\/2015',
        price: '860 894',
    },
    {
        name: 'Václav Plesník',
        lng: 14.05419,
        lat: 50.53481,
        desc: 'Svoz bioodpadu a vybavení kompostárny Václav Plesník',
        date: '4\/15\/2015',
        price: '738 062',
    },
    {
        name: 'Město Krásná Hora nad Vltavou',
        lng: 14.27903,
        lat: 49.6012,
        desc: 'Svoz a separace BRO ve městě Krásná Hora nad Vltavou',
        date: '4\/16\/2015',
        price: '546 210',
    },
    {
        name: 'Městská zeleň Znojmo',
        lng: 16.06798,
        lat: 48.85667,
        desc: 'Rozšíření svozu BRO ve městě Znojmo',
        date: '4\/16\/2015',
        price: '2 362 500',
    },
    {
        name: 'Technické služby Český Brod',
        lng: 14.85366,
        lat: 50.07043,
        desc: 'Rozšíření svozu a separace odpadů ve městě Český Brod ',
        date: '4\/17\/2015',
        price: '2 256 483',
    },
    {
        name: 'Město Vimperk',
        lng: 13.76102,
        lat: 49.04912,
        desc: 'Rozšíření svozu bioodpadu ve městě Vimperk',
        date: '4\/15\/2015',
        price: '5 548 225',
    },
    {
        name: 'Městys Vrchotovy Janovice',
        lng: 14.57777,
        lat: 49.66864,
        desc: 'Svoz bioodpadu- Městys Vrchotovy Janovice',
        date: '4\/13\/2015',
        price: '5 558 400',
    },
    {
        name: 'Obec Radostice',
        lng: 16.47749,
        lat: 49.13769,
        desc: 'Likvidace bioodpadů v obci Radostice',
        date: '4\/16\/2015',
        price: '4 719 600',
    },
    {
        name: 'Obec Mokrá - Horákov',
        lng: 16.74194,
        lat: 49.22134,
        desc: 'Systém separace a svozu bioodpadu v obci Mokrá-Horákov',
        date: '4\/16\/2015',
        price: '2 601 347',
    },
    {
        name: 'Obec Habrovany',
        lng: 16.87875,
        lat: 49.22806,
        desc: 'Vybavení kompostárny pro obec Habrovany',
        date: '4\/16\/2015',
        price: '1 092 420',
    },
    {
        name: 'Město Rotava',
        lng: 12.55806,
        lat: 50.30149,
        desc: 'Svoz biologicky rozložitelného odpadu pro město Rotava',
        date: '4\/16\/2015',
        price: '2 286 900',
    },
    {
        name: 'Obec Slatiny',
        lng: 15.38311,
        lat: 50.37139,
        desc: 'Svoz bioodpadu v obci Slatiny',
        date: '4\/16\/2015',
        price: '1 436 400',
    },
    {
        name: 'KENVI CZ s.r.o.',
        lng: 16.27804,
        lat: 50.15083,
        desc: 'Separace a systém svozu bioodpadů KENVI CZ s.r.o. ',
        date: '4\/16\/2015',
        price: '2 212 574',
    },
    {
        name: 'Král & Král s.r.o.',
        lng: 14.58462,
        lat: 49.93169,
        desc: 'Svoz bioodpadu Král&Král s.r.o.',
        date: '4\/13\/2015',
        price: '549 405',
    },
    {
        name: 'Městské služby Vimperk, s.r.o.',
        lng: 13.78494,
        lat: 49.05701,
        desc: 'Systém svozu a separace bioodpadu Městské služby Vimperk, s.r.o. ',
        date: '4\/16\/2015',
        price: '2 079 000',
    },
    {
        name: 'TECHNICKÁ A LESNÍ SPRÁVA CHOTĚBOŘ s.r.o.',
        lng: 15.68642,
        lat: 49.71227,
        desc: 'Zefektivnění svozu bioodpadu ve městě Chotěboř',
        date: '4\/16\/2015',
        price: '3 759 726',
    },
    {
        name: 'Město Lomnice nad Lužnicí',
        lng: 14.71915,
        lat: 49.08317,
        desc: 'Svoz bioodpadů ve městě Lomnice nad Lužnicí',
        date: '4\/16\/2015',
        price: '4 585 500',
    },
    {
        name: 'Obec Troubelice',
        lng: 17.07634,
        lat: 49.81553,
        desc: 'Svoz a separace biologicky rozložitelných odpadů v obci Troubelice',
        date: '4\/15\/2015',
        price: '2 086 087',
    },
    {
        name: 'PS Plasty CZ, s.r.o.',
        lng: 17.14507,
        lat: 49.47138,
        desc: 'Modernizace technologie ve společnosti PS PLASTY CZ s.r.o.',
        date: '4\/16\/2015',
        price: '3 552 535',
    },
    {
        name: 'Služby ŠVARC s.r.o.',
        lng: 17.63101,
        lat: 49.56957,
        desc: 'Nákup čistící techniky',
        date: '4\/16\/2015',
        price: '1 454 058',
    },
    {
        name: 'LASON CZ s.r.o.',
        lng: 18.26356,
        lat: 49.81419,
        desc: 'Vybavení pracoviště pro povrchovou ochranu kovů',
        date: '11\/18\/2014',
        price: '6 300 000',
    },
    {
        name: 'S A P spol. s r.o.',
        lng: 15.2229,
        lat: 49.62855,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '11\/6\/2014',
        price: '4 949 100',
    },
    {
        name: 'Obec Jaroslavice',
        lng: 16.23603,
        lat: 48.75835,
        desc: 'Pořízení zametacího stroje pro obec Jaroslavice',
        date: '10\/10\/2014',
        price: '1 080 000',
    },
    {
        name: 'KARE, Praha, s.r.o.',
        lng: 14.40084,
        lat: 50.01492,
        desc: 'Konzultace - Snížení prašnosti v areálu KARE, Praha',
        date: '6\/30\/2014',
        price: '3 675 000',
    },
    {
        name: 'Silnice LK a.s.',
        lng: 15.14709,
        lat: 50.74413,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '7\/8\/2014',
        price: '2 158 734',
    },
    {
        name: 'KOKEŠ Steel Group s.r.o.',
        lng: 18.0031,
        lat: 49.93339,
        desc: 'Modernizace výroby společnosti KOKEŠ Steel Group s.r.o.',
        date: '7\/1\/2014',
        price: '5 129 100',
    },
    {
        name: 'Brickyard a.s.',
        lng: 18.27007,
        lat: 49.85985,
        desc: 'Pravidelná údržba komunikací společnosti Brickyard a.s.',
        date: '6\/30\/2014',
        price: '5 467 800',
    },
    {
        name: 'AXA truck a.s.',
        lng: 18.27007,
        lat: 49.85985,
        desc: 'Pravidelná údržba areálu společnosti',
        date: '10\/10\/2014',
        price: '2 475 000',
    },
    {
        name: 'Čistá MORAVA s.r.o.',
        lng: 17.03685,
        lat: 49.69581,
        desc: 'ČISTÁ MORAVA',
        date: '11\/6\/2014',
        price: '4 364 100',
    },
    {
        name: 'CONKLINE a.s.',
        lng: 14.73514,
        lat: 50.13048,
        desc: 'Pořízení velkoformátové tiskové technologie',
        date: '11\/12\/2014',
        price: '2 220 750',
    },
    {
        name: 'Město Janské Lázně',
        lng: 15.76881,
        lat: 50.64518,
        desc: 'Pro Janské lázně vzduch čistý krásně',
        date: '6\/30\/2014',
        price: '2 609 600',
    },
    {
        name: 'Poláček Farma Hole s.r.o.',
        lng: 14.26499,
        lat: 50.1773,
        desc: 'Nákup zametacího stroje',
        date: '10\/30\/2014',
        price: '7 425 000',
    },
    {
        name: 'TS Ledeč nad Sázavou, s.r.o.',
        lng: 15.27318,
        lat: 49.7002,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '7\/1\/2014',
        price: '2 164 370',
    },
    {
        name: 'Technické služby Týnec s.r.o.',
        lng: 14.59974,
        lat: 49.83412,
        desc: 'Nákup svozové techniky a kontajnerů',
        date: '7\/8\/2014',
        price: '3 024 000',
    },
    {
        name: 'Městys Rataje nad Sázavou',
        lng: 14.95778,
        lat: 49.84224,
        desc: 'pořízení zametacího stroje',
        date: '6\/30\/2014',
        price: '1 822 500',
    },
    {
        name: 'Obec Pojbuky',
        lng: 14.89915,
        lat: 49.49908,
        desc: 'Pojbuky bez imisí',
        date: '6\/9\/2014',
        price: '5 355 000',
    },
    {
        name: 'Obec Březník',
        lng: 16.19,
        lat: 49.17018,
        desc: 'Obec Březník - snížení prašnosti',
        date: '7\/1\/2014',
        price: '2 047 027',
    },
    {
        name: 'Obec Loděnice',
        lng: 16.45198,
        lat: 49.0125,
        desc: 'Obec Loděnice - Nákup techniky pro čistší silnice',
        date: '12\/18\/2014',
        price: '1 954 755',
    },
    {
        name: 'ARBOR MORAVIA s.r.o.',
        lng: 18.37317,
        lat: 49.82651,
        desc: 'Nákup technologie za účelem snížení prašnosti',
        date: '6\/30\/2014',
        price: '2 116 242',
    },
    {
        name: 'ARIETE automotive s.r.o.',
        lng: 14.90193,
        lat: 50.41165,
        desc: 'Snížení prašnosti v Mladé Boleslavi',
        date: '7\/1\/2014',
        price: '3 142 124',
    },
    {
        name: 'Václav Kádner',
        lng: 15.08271,
        lat: 49.83367,
        desc: 'Rozvoj společnosti Václava Kádnera',
        date: '11\/5\/2014',
        price: '4 319 100',
    },
    {
        name: 'Trávníkářství s.r.o.',
        lng: 13.46768,
        lat: 50.21524,
        desc: 'Nákup zametacího stroje za účelem snížení prašnosti',
        date: '7\/1\/2014',
        price: '5 467 800',
    },
    {
        name: 'OBEC SULICE',
        lng: 14.55639,
        lat: 49.92733,
        desc: 'Nákup zametacího stroje pro obec Sulice',
        date: '8\/21\/2014',
        price: '2 655 000',
    },
    {
        name: 'VÍTKOVICE ARÉNA, a.s.',
        lng: 18.24809,
        lat: 49.80363,
        desc: 'Čisto okolo arény ve Vítkovicích',
        date: '7\/1\/2014',
        price: '4 506 812',
    },
    {
        name: 'Obec Hněvkovice',
        lng: 15.20746,
        lat: 49.68896,
        desc: 'Uklizené ulice v obci Hněvkovice',
        date: '7\/1\/2014',
        price: '4 861 499',
    },
    {
        name: 'Město Červená Řečice',
        lng: 15.18033,
        lat: 49.51139,
        desc: 'Čisté silnice v celé Červené Řečici',
        date: '7\/1\/2014',
        price: '1 960 828',
    },
    {
        name: 'Obec Lety',
        lng: 14.08583,
        lat: 49.51793,
        desc: 'Čisté silnice v obci Lety',
        date: '7\/8\/2014',
        price: '1 878 170',
    },
    {
        name: 'Kaiser servis, s.r.o.',
        lng: 16.64492,
        lat: 49.36829,
        desc: 'Zkvalitnění služeb společnosti Kaiser servis, spol. s r. o.',
        date: '7\/1\/2014',
        price: '2 515 590',
    },
    {
        name: 'Obec Perštejn',
        lng: 13.08106,
        lat: 50.38932,
        desc: 'Snížení prašnosti v obci Perštejn',
        date: '7\/1\/2014',
        price: '2 095 371',
    },
    {
        name: 'Obec Tuchoměřice',
        lng: 14.28283,
        lat: 50.13277,
        desc: 'Obec Tuchoměřice – snížení prašnosti',
        date: '6\/30\/2014',
        price: '2 270 835',
    },
    {
        name: 'Obec Hostěradice',
        lng: 16.26075,
        lat: 48.95797,
        desc: 'Čistá obec Hostěradice',
        date: '7\/1\/2014',
        price: '2 085 128',
    },
    {
        name: 'ČEMAT, s.r.o.',
        lng: 14.58813,
        lat: 50.03902,
        desc: 'Pravidelnou údržbou k čistšímu ovzduší',
        date: '6\/30\/2014',
        price: '2 163 600',
    },
    {
        name: 'Obec Smilovy Hory',
        lng: 14.89976,
        lat: 49.53495,
        desc: 'Čistší Smilovy Hory',
        date: '10\/30\/2014',
        price: '3 582 810',
    },
    {
        name: 'FRAMA CZ s.r.o.',
        lng: 18.27591,
        lat: 49.80218,
        desc: 'Pravidelná údržba areálových komunikací',
        date: '11\/18\/2014',
        price: '1 530 900',
    },
    {
        name: 'Obec Hrobčice',
        lng: 13.81753,
        lat: 50.52278,
        desc: 'Čisté a uklizené ulice v Hrobčicích',
        date: '8\/1\/2014',
        price: '2 172 555',
    },
    {
        name: 'Transbeton Bohemia, s.r.o.',
        lng: 15.20242,
        lat: 50.02689,
        desc: 'Snížení prašnosti v areálu Transbeton',
        date: '11\/18\/2014',
        price: '2 173 500',
    },
    {
        name: 'AUTO HELUS s.r.o.',
        lng: 13.38283,
        lat: 49.75298,
        desc: 'Pořízení čistícího stroje pro AUTO HELUS s.r.o.',
        date: '7\/1\/2014',
        price: '1 998 693',
    },
    {
        name: 'Technické služby města Jaroměře',
        lng: 15.92907,
        lat: 50.36108,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '7\/1\/2014',
        price: '4 507 670',
    },
    {
        name: 'Obec Klenovice na Hané',
        lng: 17.21338,
        lat: 49.4069,
        desc: 'Pravidelnou údržbou obce k čistšímu ovzduší',
        date: '7\/8\/2014',
        price: '4 661 100',
    },
    {
        name: 'Obec Žihle',
        lng: 13.34863,
        lat: 50.05315,
        desc: 'Nákup zametacího stroje pro obec Žihle',
        date: '6\/30\/2014',
        price: '1 993 767,3',
    },
    {
        name: 'Obec Kamýk nad Vltavou',
        lng: 14.24865,
        lat: 49.65142,
        desc: 'Prach způsobený dopravou zameteme v Kamýku nad Vltavou',
        date: '11\/6\/2014',
        price: '1 966 099',
    },
    {
        name: 'FIORINI INTERNATIONAL Czech Republic, s.r.o.',
        lng: 14.50804,
        lat: 50.09918,
        desc: 'Snížení prašnosti v areálu FIORINI ve Vysočanech',
        date: '7\/8\/2014',
        price: '2 047 027',
    },
    {
        name: 'Mikov,s.r.o.',
        lng: 14.34985,
        lat: 50.96891,
        desc: 'Modernizace technologie ve společnosti Mikov s.r.o.',
        date: '7\/1\/2014',
        price: '1 890 000',
    },
    {
        name: 'Obec Roštění',
        lng: 17.54289,
        lat: 49.3702,
        desc: 'Pravidelná údržba obce Roštění',
        date: '7\/1\/2014',
        price: '1 795 500',
    },
    {
        name: 'Martin Kolek s.r.o.',
        lng: 18.50216,
        lat: 49.89796,
        desc: 'Úklid areálu Martin Kolek s.r.o.',
        date: '9\/16\/2014',
        price: '1 627 000',
    },
    {
        name: 'KARE, Praha, s.r.o.',
        lng: 14.47212,
        lat: 50.05268,
        desc: 'Snížení prašnosti v areálu KARE, Praha',
        date: '11\/18\/2014',
        price: '1 616 711',
    },
    {
        name: 'KR OSTRAVA a.s.',
        lng: 18.32223,
        lat: 49.82609,
        desc: 'Čistý firemní areál KR OSTRAVA a.s.',
        date: '7\/1\/2014',
        price: '1 842 748',
    },
    {
        name: 'Obec Hořice',
        lng: 15.19206,
        lat: 49.59505,
        desc: 'Čisto kolem silnice v obci Hořice',
        date: '7\/1\/2014',
        price: '5 129 100',
    },
    {
        name: 'Stavitelství SIZO s.r.o.',
        lng: 18.20561,
        lat: 49.81372,
        desc: 'Úklid areálu v Ostravě-Michálkovicích',
        date: '7\/1\/2014',
        price: '1 842 748',
    },
    {
        name: 'TEBYT AŠ, s.r.o.',
        lng: 12.18807,
        lat: 50.2221,
        desc: 'Zkvalitnění nakládání s odpady ve městě Aš',
        date: '7\/1\/2014',
        price: '1 455 440',
    },
    {
        name: 'PS Plasty CZ, s.r.o.',
        lng: 17.14507,
        lat: 49.47138,
        desc: 'Pořízení vstřikovacího stroje',
        date: '7\/1\/2014',
        price: '1 842 748',
    },
    {
        name: 'Služby města Králíky s.r.o.',
        lng: 16.76264,
        lat: 50.08176,
        desc: 'Třídící linka',
        date: '3\/18\/2014',
        price: '4 230 000',
    },
    {
        name: 'Obec Vilémov',
        lng: 16.98657,
        lat: 49.6374,
        desc: 'K čistšímu ovzduší v obci Vilémov',
        date: '3\/4\/2014',
        price: '5 750 000',
    },
    {
        name: 'Obec Holedeč',
        lng: 13.56146,
        lat: 50.27779,
        desc: 'Snížení prašnosti v Holedči',
        date: '6\/30\/2014',
        price: '3 968 100',
    },
    {
        name: 'Obec Chraštice',
        lng: 14.0728,
        lat: 49.57648,
        desc: 'Čisté silnice v obci Chraštice',
        date: '11\/5\/2014',
        price: '1 941 578',
    },
    {
        name: 'Město Klimkovice',
        lng: 18.12298,
        lat: 49.78841,
        desc: 'Pořízení samosběrného vozu pro Město Klimkovice',
        date: '7\/1\/2014',
        price: '1 916 184',
    },
    {
        name: 'SÁRA Viktor s.r.o.',
        lng: 18.27437,
        lat: 49.65872,
        desc: 'Pravidelnou údržbou k čistšímu ovzduší',
        date: '7\/1\/2014',
        price: '1 633 473',
    },
    {
        name: 'Obec Damnice',
        lng: 16.36487,
        lat: 48.91564,
        desc: 'Čisté Damnice',
        date: '11\/26\/2014',
        price: '4 823 684',
    },
    {
        name: 'EKOSTAVBY Louny s.r.o.',
        lng: 13.81924,
        lat: 50.34517,
        desc: 'Pořízení zametacího stroje',
        date: '11\/5\/2014',
        price: '3 959 100',
    },
    {
        name: 'Družstvo ZAGRA',
        lng: 18.04593,
        lat: 49.8319,
        desc: 'Čisté komunikace',
        date: '11\/18\/2014',
        price: '2 350 425',
    },
    {
        name: 'Obec Horní Heřmanice',
        lng: 16.7054,
        lat: 49.96054,
        desc: 'Čista hlavní silnice v obci Horní Heřmanice',
        date: '7\/8\/2014',
        price: '4 049 100',
    },
    {
        name: 'Obec Onšov',
        lng: 15.13885,
        lat: 49.58277,
        desc: 'Snížení prašnosti v obci Onšov',
        date: '10\/30\/2014',
        price: '1 275 750',
    },
    {
        name: 'Obec Loket',
        lng: 15.11841,
        lat: 49.65805,
        desc: 'Další snížení prašnosti',
        date: '7\/1\/2014',
        price: '1 642 494',
    },
    {
        name: 'Obec Loket',
        lng: 15.11841,
        lat: 49.65805,
        desc: 'Zefektivnění nakládání s odpady v obci Loket',
        date: '7\/1\/2014',
        price: '1 486 484',
    },
    {
        name: 'JUREX VOS s.r.o.',
        lng: 14.16618,
        lat: 49.31275,
        desc: 'Nákup zametacího stroje za účelem snížení prašnosti',
        date: '6\/30\/2014',
        price: '2 286 900',
    },
    {
        name: 'Obec Libčeves',
        lng: 13.83889,
        lat: 50.45574,
        desc: 'Čisté a zametené komunikace v Libčevsi',
        date: '6\/30\/2014',
        price: '1 257 794,5',
    },
    {
        name: 'Obec Brzánky',
        lng: 14.31048,
        lat: 50.46617,
        desc: 'Snížení imisní zátěže v obci Brzánky',
        date: '7\/8\/2014',
        price: '3 044 186',
    },
    {
        name: 'Race Control s.r.o.',
        lng: 14.48871,
        lat: 50.10756,
        desc: 'Snížení imisní zátěže',
        date: '7\/8\/2014',
        price: '1 998 693',
    },
    {
        name: 'Údržba silnic Karlovarského kraje, a.s.',
        lng: 12.87203,
        lat: 50.25068,
        desc: 'Čistší silnice v Karlovarském kraji',
        date: '7\/8\/2014',
        price: '1 943 100',
    },
    {
        name: 'Lesostavby Frýdek-Místek a. s.',
        lng: 18.38089,
        lat: 49.67649,
        desc: 'Pravidelná údržba areálu společnosti',
        date: '11\/26\/2014',
        price: '4 041 000',
    },
    {
        name: 'Technické služby Města Bystré s.r.o.',
        lng: 16.3441,
        lat: 49.62863,
        desc: 'Zameteme Bystré',
        date: '8\/1\/2014',
        price: '2 646 000',
    },
    {
        name: 'TECHNICKÁ A LESNÍ SPRÁVA CHOTĚBOŘ s.r.o.',
        lng: 15.68642,
        lat: 49.71227,
        desc: 'Čisto v Chotěboři',
        date: '11\/7\/2014',
        price: '1 842 750',
    },
    {
        name: 'Technické služby Doubravčice s.r.o.',
        lng: 14.79141,
        lat: 50.02287,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '7\/1\/2014',
        price: '877 124',
    },
    {
        name: 'Mikov,s.r.o.',
        lng: 14.34985,
        lat: 50.96891,
        desc: 'Modernizace hrotové brusky',
        date: '7\/1\/2014',
        price: '3 402 000',
    },
    {
        name: 'Pavel Švestka, s.r.o.',
        lng: 14.21716,
        lat: 50.01877,
        desc: 'Čistý firemní areál Pavel Švestka',
        date: '6\/30\/2014',
        price: '1 732 500',
    },
    {
        name: 'TBS Světlá nad Sázavou, p.o.',
        lng: 15.39303,
        lat: 49.67285,
        desc: 'Svoz bioodpadu ve Světlé nad Sázavou',
        date: '7\/1\/2014',
        price: '323 000',
    },
    {
        name: 'Obec Cetkovice',
        lng: 16.72379,
        lat: 49.58061,
        desc: 'Pravidelnou údržbou obce k čistšímu ovzduší',
        date: '7\/1\/2014',
        price: '5 467 800',
    },
    {
        name: 'Obec Přestavlky',
        lng: 17.48108,
        lat: 49.38963,
        desc: 'Pravidelná údržba obce',
        date: '7\/1\/2014',
        price: '1 287 761',
    },
    {
        name: 'STASPO, spol. s r.o.',
        lng: 18.33037,
        lat: 49.8198,
        desc: 'Snížení emisní zátěže',
        date: '11\/26\/2014',
        price: '2 350 425',
    },
    {
        name: 'Beskydské rehabilitační centrum, spol. s r.o.',
        lng: 18.30538,
        lat: 49.53931,
        desc: 'Snížení prašnosti v areálu Beskydského rehabilitačního centra',
        date: '11\/21\/2014',
        price: '1 320 685',
    },
    {
        name: 'GYPSTREND s.r.o.',
        lng: 18.03534,
        lat: 49.99938,
        desc: 'Snížení imisní zátěže',
        date: '11\/19\/2014',
        price: '4 634 100',
    },
    {
        name: 'BETON - Těšovice, spol. s r.o.',
        lng: 14.0255,
        lat: 49.04948,
        desc: 'Snížení imisní zátěže v BETON-Těšovice',
        date: '7\/1\/2014',
        price: '1 842 748',
    },
    {
        name: 'Obec Stachy',
        lng: 13.63914,
        lat: 49.09846,
        desc: 'Čisté Stachy',
        date: '8\/1\/2014',
        price: '1 984 500',
    },
    {
        name: 'MPL KAUF spol. s r.o.',
        lng: 18.24361,
        lat: 49.83441,
        desc: 'Snížení prašnosti v areálu MPL KAUF',
        date: '8\/1\/2014',
        price: '1 606 500',
    },
    {
        name: 'Obec Krásný Dvůr',
        lng: 13.35408,
        lat: 50.25734,
        desc: 'Pořízení zametacího stroje pro obec Krásný Dvůr',
        date: '8\/1\/2014',
        price: '2 172 555',
    },
    {
        name: 'Obec Hejná',
        lng: 13.67292,
        lat: 49.28552,
        desc: 'Snížení imisní zátěže v obci Hejná',
        date: '7\/1\/2014',
        price: '1 842 748',
    },
    {
        name: 'Schwarzmüller s.r.o.',
        lng: 13.8892,
        lat: 49.8617,
        desc: 'Nákup zametacího stroje za účelem snížení prašnosti',
        date: '7\/8\/2014',
        price: '1 517 400',
    },
    {
        name: 'KILDATRANS-CZ, spol. s r.o.',
        lng: 16.54131,
        lat: 49.17414,
        desc: 'Pořízení zametacího stroje',
        date: '7\/1\/2014',
        price: '20 594 592',
    },
    {
        name: 'Technické služby Třeboň, s.r.o.',
        lng: 14.75719,
        lat: 49.01716,
        desc: 'Zameteme pro zdraví ve městě Třeboni',
        date: '7\/8\/2014',
        price: '1 407 500',
    },
    {
        name: 'KOMPOSTÁRNA NOR s.r.o.',
        lng: 16.23368,
        lat: 50.13452,
        desc: 'Kompostárna odpadu',
        date: '7\/8\/2014',
        price: '4 904 100',
    },
    {
        name: 'NORPLAST s.r.o.',
        lng: 16.23368,
        lat: 50.13452,
        desc: 'Zefektivnění třídění odpadu',
        date: '7\/1\/2014',
        price: '3 779 100',
    },
    {
        name: 'A3G LOGISTIC s.r.o.',
        lng: 16.23368,
        lat: 50.13452,
        desc: 'Systém odděleného sběru',
        date: '3\/31\/2014',
        price: '5 082 300',
    },
    {
        name: 'A3 PLAST s.r.o.',
        lng: 16.23368,
        lat: 50.13452,
        desc: 'Zařízení na zefektivnění odpadu',
        date: '3\/31\/2014',
        price: '5 082 300',
    },
    {
        name: 'Městys Senomaty',
        lng: 13.65451,
        lat: 50.09807,
        desc: 'Nákup zametacího stroje pro Senomaty',
        date: '3\/31\/2014',
        price: '5 076 000',
    },
    {
        name: 'Obec Česká Ves',
        lng: 17.22285,
        lat: 50.25223,
        desc: 'Česká Ves - čistý vzduch',
        date: '3\/31\/2014',
        price: '5 082 300',
    },
    {
        name: 'SPETRA CZ s.r.o.',
        lng: 18.53048,
        lat: 49.71328,
        desc: 'Pravidelnou údržbou k čistšímu ovzduší',
        date: '7\/8\/2014',
        price: '4 681 610',
    },
    {
        name: 'Obec Kameničky',
        lng: 15.97681,
        lat: 49.73901,
        desc: 'Čisto na silnicích v obci Kameničky',
        date: '11\/18\/2014',
        price: '2 443 552',
    },
    {
        name: 'SERVIS VINCENCI s.r.o.',
        lng: 15.99167,
        lat: 49.83656,
        desc: 'SERVIS VINCENCI s.r.o. zametá areál STK',
        date: '11\/11\/2014',
        price: '2 173 500',
    },
    {
        name: 'STAVORENOL s.r.o.',
        lng: 18.61763,
        lat: 49.74609,
        desc: 'Pravidelnou údržbou k čistšímu ovzduší',
        date: '7\/1\/2014',
        price: '2 201 951',
    },
    {
        name: 'Obec Javorník',
        lng: 15.02656,
        lat: 49.68717,
        desc: 'Čisté a zametené ulice v obci Javorník',
        date: '7\/1\/2014',
        price: '4 679 100',
    },
    {
        name: 'STAEG Facility, spol. s r.o.',
        lng: 17.00613,
        lat: 49.29485,
        desc: 'Nákup technologie za účelem pravidelné údržby - STAEG Facility, spol. s r.o.',
        date: '11\/18\/2014',
        price: '2 173 500',
    },
    {
        name: 'Obec Křešice',
        lng: 14.21331,
        lat: 50.52386,
        desc: 'Čisté a uklizené ulice v Křešicích',
        date: '7\/8\/2014',
        price: '1 551 728',
    },
    {
        name: 'LORAS, spol.s r.o.',
        lng: 17.0961,
        lat: 49.3075,
        desc: 'Nákup technologie za účelem pravidelné údržby - LORAS, spol. s r.o.',
        date: '11\/11\/2014',
        price: '3 491 775',
    },
    {
        name: 'Obec Troubelice',
        lng: 17.07634,
        lat: 49.81553,
        desc: 'Čisté Troubelice',
        date: '7\/1\/2014',
        price: '3 154 521',
    },
    {
        name: 'Město Mnichovice',
        lng: 14.7102,
        lat: 49.93562,
        desc: 'Zkvalitnění nakládání s odpady v Mnichovicích',
        date: '10\/31\/2014',
        price: '4 566 600',
    },
    {
        name: 'Obec Lužná',
        lng: 13.78171,
        lat: 50.13529,
        desc: 'Vybavení zařízení pro schromažďování odpadů v obci Lužná',
        date: '8\/19\/2014',
        price: '3 811 500',
    },
    {
        name: 'Obec Zalužany',
        lng: 14.09476,
        lat: 49.54388,
        desc: 'Čisté a uklizené ulice v záložanech',
        date: '6\/9\/2014',
        price: '1 337 314',
    },
    {
        name: 'Lombard wood s.r.o.',
        lng: 17.14375,
        lat: 49.67943,
        desc: 'Další rozvoj společnosti Lombart emotion s.r.o.',
        date: '7\/1\/2014',
        price: '2 216 005',
    },
    {
        name: 'Štůsek - DVB s.r.o.',
        lng: 18.07955,
        lat: 49.42269,
        desc: 'INOVACE PILAŘSKÉHO PROVOZU -  nákup pásové pily a třídicích linek',
        date: '7\/8\/2014',
        price: '2 201 501',
    },
    {
        name: 'AZPO Group s.r.o.',
        lng: 14.41911,
        lat: 50.79677,
        desc: 'Modernizace technologie pro výrobu pleteného zboží',
        date: '8\/1\/2014',
        price: '7 000 000',
    },
    {
        name: 'Komunální služby, s.r.o.,Jablonné nad Orlicí',
        lng: 16.59276,
        lat: 50.0214,
        desc: 'Další rozšíření nakládání s odpady',
        date: '9\/9\/2014',
        price: '1 600 000',
    },
    {
        name: 'WASTE TRADE, s.r.o.',
        lng: 14.41726,
        lat: 50.06808,
        desc: 'Svoz papíru ALBA WASTE',
        date: '2\/17\/2014',
        price: '8 200 000',
    },
    {
        name: 'Komwag, podnik čistoty a údržby města ,a.s.',
        lng: 14.15754,
        lat: 50.21548,
        desc: 'Systém odděleného sběru - Mníšecký region',
        date: '3\/31\/2014',
        price: '3 477 600',
    },
    {
        name: 'DrakaBag,s.r.o.',
        lng: 17.83755,
        lat: 49.67107,
        desc: 'Zefektivnění výroby společnosti DrakaBag, s.r.o.',
        date: '5\/1\/2014',
        price: '5 135 595',
    },
    {
        name: 'STUCO PRAHA spol. s r.o.',
        lng: 14.49262,
        lat: 50.11966,
        desc: 'Inovace výroby dřevěných briket - nákup briketovací linky včetně balení a manipulace',
        date: '3\/31\/2014',
        price: '1 933 600',
    },
    {
        name: 'Kompostárna Nasobůrky s.r.o.',
        lng: 17.07565,
        lat: 49.70102,
        desc: 'KOMPOSTÁRNA NASOBŮRKY',
        date: '8\/14\/2014',
        price: '4 750 000',
    },
    {
        name: 'ZKJD-TECH s.r.o.',
        lng: 17.05198,
        lat: 49.68707,
        desc: 'SYSTÉM ODDĚLENÉHO SBĚRU',
        date: '8\/20\/2014',
        price: '2 000 000',
    },
    {
        name: 'BEUS, s.r.o.',
        lng: 14.28606,
        lat: 50.43082,
        desc: 'Pořízení obráběcího centra',
        date: '3\/31\/2014',
        price: '5 062 500',
    },
    {
        name: 'STROJÍRNY Rumburk s.r.o.',
        lng: 14.58054,
        lat: 50.94291,
        desc: 'Vyvrtávací a frézovací centrum',
        date: '3\/31\/2014',
        price: '4 366 889',
    },
    {
        name: 'Reichle & De-Massari Czech Republic a.s.',
        lng: 14.18911,
        lat: 50.73339,
        desc: 'Výroba optických kabelů',
        date: '8\/14\/2014',
        price: '2 000 000',
    },
    {
        name: 'Obec Perštejn',
        lng: 13.08106,
        lat: 50.38932,
        desc: 'Zateplení ZŠ Perštejn',
        date: '8\/14\/2014',
        price: '6 000 000',
    },
    {
        name: 'R A N s.r.o.',
        lng: 13.43461,
        lat: 50.17966,
        desc: 'Zefektivnění výroby společnosti R A N s.r.o.',
        date: '6\/4\/2014',
        price: '10 000 000',
    },
    {
        name: 'Fullcom systems, s.r.o.',
        lng: 18.26581,
        lat: 49.83094,
        desc: 'Modulace informačního systému FIS',
        date: '6\/2\/2014',
        price: '1 693 487',
    },
    {
        name: 'EKO servis Zábřeh s.r.o.',
        lng: 16.87497,
        lat: 49.88661,
        desc: 'Zkvalitnění služeb společnosti EKO servis Zábřeh s.r.o.',
        date: '2\/13\/2014',
        price: '3 000 000',
    },
    {
        name: 'Loštická lesní s.r.o.',
        lng: 16.92724,
        lat: 49.74484,
        desc: 'Kompostárna Loštice',
        date: '11\/1\/2013',
        price: '2 061 000',
    },
    {
        name: 'Město Loštice',
        lng: 16.92724,
        lat: 49.74484,
        desc: 'Svoz bioodpadu Loštice a okolí',
        date: '6\/30\/2013',
        price: '3 564 540',
    },
    {
        name: 'Obec Korytná',
        lng: 17.68139,
        lat: 48.93386,
        desc: 'Redukce prašnosti mobilní technikou v obci Korytná',
        date: '11\/10\/2014',
        price: '2 870 862',
    },
    {
        name: 'Obec Nikolčice',
        lng: 16.73278,
        lat: 49.01186,
        desc: 'Snížení prašnosti v obci Nikolčice',
        date: '11\/25\/2014',
        price: '1 875 830',
    },
    {
        name: 'Obec Svratouch',
        lng: 16.05226,
        lat: 49.72774,
        desc: 'Snížení prašnosti z plošných zdrojů',
        date: '5\/30\/2013',
        price: '2 150 000',
    },
    {
        name: 'Bergasto a.s.',
        lng: 17.25932,
        lat: 49.58263,
        desc: 'Nákup čistící techniky',
        date: '5\/30\/2013',
        price: '1 683 422',
    },
    {
        name: 'Město Raspenava',
        lng: 15.13755,
        lat: 50.88841,
        desc: 'Pořízení zametacího stroje pro město Raspenava',
        date: '4\/17\/2015',
        price: '5 138 000',
    },
    {
        name: 'ProfiOdpady s.r.o.',
        lng: 14.4799,
        lat: 50.38283,
        desc: 'Vybavení sběrného dvora Mělník',
        date: '5\/30\/2013',
        price: '4 252 500',
    },
    {
        name: 'ProfiOdpady s.r.o.',
        lng: 15.07379,
        lat: 49.75018,
        desc: 'Vybavení sběrného dvora Chabeřice',
        date: '5\/16\/2013',
        price: '1 943 864',
    },
    {
        name: 'MĚSTSKÁ ČÁST PRAHA 16',
        lng: 14.36197,
        lat: 49.98205,
        desc: 'Zametený Radotín, vyčištěný od zplodin',
        date: '8\/20\/2014',
        price: '3 338 550',
    },
    {
        name: 'Město Židlochovice',
        lng: 16.62742,
        lat: 49.03637,
        desc: 'Čistší město Židlochovice',
        date: '8\/20\/2014',
        price: '1 714 050',
    },
    {
        name: 'Ašské služby s.r.o.',
        lng: 12.18992,
        lat: 50.22633,
        desc: 'Pořízení technologie pro sběr a svoz tříděného odpadu',
        date: '8\/20\/2014',
        price: '2 956 500',
    },
    {
        name: 'TANNACO Poděbrady s.r.o.',
        lng: 15.11363,
        lat: 50.13005,
        desc: 'Pořízení zametacího stroje',
        date: '5\/30\/2013',
        price: '4 725 000',
    },
    {
        name: 'Obec Zaječice',
        lng: 15.88131,
        lat: 49.90112,
        desc: 'Zametené Zaječice, lehkost pro vaše plíce',
        date: '5\/15\/2013',
        price: '1 714 500',
    },
    {
        name: 'Technické služby Praha - Radotín',
        lng: 14.34398,
        lat: 49.99254,
        desc: 'Vyčistíme účinně silnice v Radotíně',
        date: '5\/16\/2013',
        price: '3 644 229',
    },
    {
        name: 'Obec Snět',
        lng: 15.22544,
        lat: 49.62889,
        desc: 'K čistému vzduchu v obci Snět',
        date: '8\/20\/2014',
        price: '1 050 883',
    },
    {
        name: 'Technické služby Kaplice spol.s.r.o.',
        lng: 14.48501,
        lat: 48.73587,
        desc: 'Čisté ulice ve městě Kaplice',
        date: '8\/20\/2014',
        price: '1 088 983',
    },
    {
        name: 'Obec Jesenice',
        lng: 14.5305,
        lat: 49.97462,
        desc: 'Pořízení zametacího stroje pro obec Jesenice',
        date: '11\/6\/2014',
        price: '1 050 883',
    },
    {
        name: 'Obec Klíčany',
        lng: 14.4288,
        lat: 50.20441,
        desc: 'Pořízení zametacího stroje pro obec Klíčany',
        date: '5\/16\/2013',
        price: '3 204 000',
    },
    {
        name: 'Obec Horní Podluží',
        lng: 14.55258,
        lat: 50.88541,
        desc: 'Pořízení zametacího stroje pro obec Horní Podluží',
        date: '5\/16\/2013',
        price: '2 639 999',
    },
    {
        name: 'Obec Paseka',
        lng: 17.23396,
        lat: 49.80085,
        desc: 'Redukce prašnosti mobilní technikou v obci Paseka',
        date: '5\/16\/2013',
        price: '1 666 028',
    },
    {
        name: 'Obec Tochovice',
        lng: 14.00141,
        lat: 49.5976,
        desc: 'Pořízení zametacího stroje pro obec Tochovice',
        date: '5\/14\/2013',
        price: '1 872 985',
    },
    {
        name: 'Obec Keblov',
        lng: 15.07988,
        lat: 49.67872,
        desc: 'Snížení prašnosti v obci Keblov',
        date: '5\/30\/2013',
        price: '2 090 707',
    },
    {
        name: 'Skládka pod Haldou s.r.o.',
        lng: 16.06649,
        lat: 50.51644,
        desc: 'Tříděný odpad v Podkrkonoší',
        date: '5\/14\/2013',
        price: '1 943 865',
    },
    {
        name: 'Obec Perštejn',
        lng: 13.08106,
        lat: 50.39063,
        desc: 'Zkvalitnění nakládání s odpady v obci Perštejn',
        date: '8\/20\/2014',
        price: '1 050 883',
    },
    {
        name: 'Obec Srch',
        lng: 15.75088,
        lat: 50.08489,
        desc: 'Pro čistý vzduch v obci Srch',
        date: '8\/20\/2014',
        price: '3 426 534',
    },
    {
        name: 'Obec Perštejn',
        lng: 13.08106,
        lat: 50.39063,
        desc: 'Zateplení obecního úřadu',
        date: '5\/16\/2013',
        price: '811 800',
    },
    {
        name: 'Obec Perštejn',
        lng: 13.08106,
        lat: 50.39063,
        desc: 'Zateplaní domu služeb Perštejn',
        date: '8\/20\/2014',
        price: '1 844 983',
    },
    {
        name: 'Obec Česká Ves',
        lng: 17.22285,
        lat: 50.25223,
        desc: 'Snížení imisní zátěže v obci Česká Ves',
        date: '8\/20\/2014',
        price: '1 341 486',
    },
    {
        name: 'Technické služby Kralice, s.r.o.',
        lng: 16.2009,
        lat: 49.19984,
        desc: 'Redukce prašnosti mobilní technikou',
        date: '8\/20\/2014',
        price: '1 543 183',
    },
    {
        name: 'Obec Prace',
        lng: 16.76532,
        lat: 49.14106,
        desc: 'Redukce prašnosti mobilní technikou v obci Prace',
        date: '5\/30\/2013',
        price: '1 869 000',
    },
    {
        name: 'Technické služby Hustopeče, s.r.o.',
        lng: 16.72825,
        lat: 48.93426,
        desc: 'Redukce prašnosti mobilní technikou',
        date: '5\/30\/2013',
        price: '3 360 000',
    },
    {
        name: 'Albera Morava, s.r.o.',
        lng: 17.71622,
        lat: 48.88397,
        desc: 'Snížení energetické náročnosti objektů společnosti Albera Morava s. r. o',
        date: '5\/30\/2013',
        price: '2 024 000',
    },
    {
        name: 'Aluminium Group, a.s.',
        lng: 16.73653,
        lat: 49.41401,
        desc: '12057',
        date: '5\/30\/2013',
        price: '3 465 000',
    },
    {
        name: 'Obec Slavkov',
        lng: 17.61186,
        lat: 48.9457,
        desc: 'Pravidelnou údržbou komunikací v obci Slavkov k čistšímu ovzduší',
        date: '12\/8\/2013',
        price: '750 000',
    },
    {
        name: 'VAV elektronic, s.r.o.',
        lng: 17.08072,
        lat: 49.47038,
        desc: '12048',
        date: '8\/12\/2014',
        price: '4 521 000',
    },
    {
        name: 'Podnik místního hospodářství v Hluboké nad Vltavou',
        lng: 14.44595,
        lat: 49.05509,
        desc: 'Snížení imisní zátěže v Hluboké nad Vltavou',
        date: '5\/30\/2013',
        price: '1 978 200',
    },
    {
        name: 'Obec Horní Němčí',
        lng: 17.62337,
        lat: 48.93482,
        desc: 'Pravidelnou údržbou komunikací v obci Horní Němčí k čistšímu',
        date: '8\/12\/2014',
        price: '56 000',
    },
    {
        name: 'Obec Nivnice',
        lng: 17.63934,
        lat: 48.97699,
        desc: 'Čisté silnice, čisté Nivnice',
        date: '3\/28\/2012',
        price: '3 336 000',
    },
    {
        name: 'JAW.cz s.r.o.',
        lng: 14.22508,
        lat: 50.77788,
        desc: '12040',
        date: '5\/30\/2013',
        price: '2 129 400',
    },
    {
        name: 'EKO servis Zábřeh s.r.o.',
        lng: 16.87497,
        lat: 49.88661,
        desc: 'Redukce prašnosti mobilní technikou',
        date: '5\/30\/2013',
        price: '2 129 400',
    },
    {
        name: 'Podještědský FC Český Dub',
        lng: 14.99249,
        lat: 50.65421,
        desc: 'ZATEPLENÍ OBJEKTU "B" SPRÁVNÍ BUDOVY PODJEŠTĚDSKÉHO SPORTOVNÍHO AREÁLU V ČESKÉM DUBU',
        date: '5\/30\/2013',
        price: '1 429 200',
    },
    {
        name: 'BMS Servis, s.r.o.',
        lng: 16.60185,
        lat: 49.14305,
        desc: 'STAVEBNÍ ÚPRAVY OBJEKTU FIRMY  BMS SERVIS, S.R.O',
        date: '1\/25\/2013',
        price: '300 500',
    },
    {
        name: 'Elimo reality, s.r.o.',
        lng: 18.35454,
        lat: 49.68136,
        desc: 'STAVEBNÍ ÚPRAVY DOMU 1177',
        date: '3\/30\/2013',
        price: '1 272 102',
    },
    {
        name: 'EKO - Unimed, s.r.o.',
        lng: 17.07751,
        lat: 49.79694,
        desc: 'Zkvalitnění služeb firmy EKO - UNIMED s.r.o.',
        date: '9\/1\/2013',
        price: '1 200 000',
    },
    {
        name: 'VAV elektronic, s.r.o.',
        lng: 17.08072,
        lat: 49.47038,
        desc: '12001',
        date: '5\/30\/2013',
        price: '569 000',
    },
    {
        name: 'DRÁTĚNÝ PROGRAM s.r.o.',
        lng: 14.03346,
        lat: 50.4039,
        desc: 'Rozvoj společnosti DRÁTĚNÝ PROGRAM s.r.o.',
        date: '6\/30\/2012',
        price: '4 754 326',
    },
    {
        name: 'Oderská městská společnost, s.r.o.',
        lng: 17.83147,
        lat: 49.66173,
        desc: 'Nákup čistící techniky',
        date: '11\/8\/2013',
        price: '3 640 000',
    },
    {
        name: 'Region povodí Mratínského potoka',
        lng: 14.51966,
        lat: 50.19891,
        desc: 'Nákup zametacího stroje pro Region Povodí Mratínského potoka',
        date: '3\/30\/2012',
        price: '5 033 700',
    },
    {
        name: 'Sdružení Povodí Sedlnice, dobrovolný svazek obcí',
        lng: 18.10272,
        lat: 49.61293,
        desc: 'Čistící technikou k lepšímu ovzduší v mikroregionu',
        date: '4\/3\/2012',
        price: '2 803 499',
    },
    {
        name: 'Stora Enso Wood Products Ždírec s.r.o.',
        lng: 15.80938,
        lat: 49.69949,
        desc: 'Snížení prašnosti v areálu společnosti Stora Enso ve Ždírci',
        date: '3\/30\/2012',
        price: '5 712 761',
    },
    {
        name: 'Laremo, s.r.o.',
        lng: 13.38037,
        lat: 49.75311,
        desc: 'Laremo s.r.o. snižuje prašnost v obchodních areálech',
        date: '3\/30\/2012',
        price: '3 528 000',
    },
    {
        name: 'SILNICE MORAVA s.r.o.',
        lng: 17.69448,
        lat: 50.08901,
        desc: 'Pravidelnou údržbou k čistšímu ovzduší',
        date: '3\/30\/2012',
        price: '1 847 249',
    },
    {
        name: 'Odolena Voda',
        lng: 14.41748,
        lat: 50.23905,
        desc: 'Redukce imisní zátěže ve městě Odolena Voda',
        date: '3\/30\/2012',
        price: '4 410 000',
    },
    {
        name: 'Zámecký dvůr s.r.o.',
        lng: 18.44312,
        lat: 49.76379,
        desc: 'Snížení prašnosti',
        date: '2\/21\/2012',
        price: '365 000',
    },
    {
        name: 'Obec Vrbice',
        lng: 16.89144,
        lat: 48.91305,
        desc: 'Čisté silnice v obci Vrbice',
        date: '3\/30\/2012',
        price: '3 496 500',
    },
    {
        name: 'Sekos Morava a.s.',
        lng: 18.29427,
        lat: 49.79201,
        desc: 'Snížení imisní zátěže pořízením čistící techniky',
        date: '3\/30\/2012',
        price: '1 696 000',
    },
    {
        name: 'Technické služby Hostivice',
        lng: 14.26026,
        lat: 50.08219,
        desc: 'Technické služby Hostivice snižují prašné imise',
        date: '3\/30\/2012',
        price: '1 884 999',
    },
    {
        name: 'TESMA Jaroměřice s.r.o.',
        lng: 15.86884,
        lat: 49.09394,
        desc: 'Nákup čistící techniky',
        date: '3\/30\/2012',
        price: '3 964 275',
    },
    {
        name: 'Město Loštice',
        lng: 16.91604,
        lat: 49.7453,
        desc: 'Zdravý vzduch v Lošticích',
        date: '3\/30\/2012',
        price: '1 526 400',
    },
    {
        name: 'Obec Zbraslav',
        lng: 16.29382,
        lat: 49.2215,
        desc: 'Zametáme pro zdraví u Brna ve Zbraslavi',
        date: '3\/30\/2012',
        price: '2 730 000',
    },
    {
        name: 'Kaiser servis, s.r.o.',
        lng: 16.64492,
        lat: 49.36829,
        desc: 'Redukce prašnosti mobilní technikou',
        date: '3\/30\/2012',
        price: '4 084 500',
    },
    {
        name: 'Městys Okříšky',
        lng: 15.75804,
        lat: 49.24255,
        desc: 'Čisté komunikace v Městysi Okříšky',
        date: '3\/30\/2012',
        price: '3 014 978',
    },
    {
        name: 'Město Štramberk',
        lng: 18.11352,
        lat: 49.5869,
        desc: 'Čistší Štramberk',
        date: '3\/30\/2012',
        price: '3 780 000',
    },
    {
        name: 'Obec Letonice',
        lng: 16.96359,
        lat: 49.18258,
        desc: 'Čisté Letonice',
        date: '3\/28\/2012',
        price: '1 696 000',
    },
    {
        name: 'TREND ABC, s.r.o.',
        lng: 17.53042,
        lat: 48.98365,
        desc: 'Čisté komunikace - čistší ovzduší',
        date: '3\/30\/2012',
        price: '3 916 199',
    },
    {
        name: 'Město Valtice',
        lng: 16.75579,
        lat: 48.74302,
        desc: 'Snížení prašnosti z plošných zdrojů v obci Valtice',
        date: '4\/16\/2012',
        price: '1 773 957',
    },
    {
        name: 'Zahradnictví Mijana, s.r.o.',
        lng: 14.7371,
        lat: 50.65675,
        desc: 'Mimoň - čištění komunikací',
        date: '3\/30\/2012',
        price: '3 780 000',
    },
    {
        name: 'MČ Praha - Lochkov',
        lng: 14.35325,
        lat: 50.00171,
        desc: 'Čištění městské části strojní technologií',
        date: '3\/30\/2012',
        price: '1 710 429',
    },
    {
        name: 'AVE Ústí nad Labem s.r.o.',
        lng: 14.0671,
        lat: 50.66774,
        desc: 'Čištění ulic za lepším ovzduším',
        date: '4\/11\/2012',
        price: '4 819 199',
    },
    {
        name: 'Sušické lesy a služby, s.r.o.',
        lng: 13.51428,
        lat: 49.22826,
        desc: 'Snížení prašnosti v městě Sušice a okolí',
        date: '3\/30\/2012',
        price: '3 360 000',
    },
    {
        name: 'Město Ivanovice na Hané',
        lng: 17.10348,
        lat: 49.31639,
        desc: 'Zdravé město Ivanovice na Hané',
        date: '3\/28\/2012',
        price: '1 890 000',
    },
    {
        name: 'Městská Část Praha - Štěrboholy',
        lng: 14.54959,
        lat: 50.07141,
        desc: 'Zameteme ve Štěrboholech po prášících automobilech',
        date: '3\/30\/2012',
        price: '3 780 000',
    },
    {
        name: 'TBS Světlá nad Sázavou, p.o.',
        lng: 15.39303,
        lat: 49.67285,
        desc: 'Prach způsobený dopravou zameteme ve Světlé nad Sázavou',
        date: '4\/19\/2012',
        price: '2 002 807',
    },
    {
        name: 'Obec Zbůch',
        lng: 13.23367,
        lat: 49.68194,
        desc: 'Snížení prašnosti ve Zbůchu',
        date: '3\/28\/2012',
        price: '5 477 285',
    },
    {
        name: 'Město Staňkov',
        lng: 13.08603,
        lat: 49.55873,
        desc: 'Snížení imisní zátěže ve městě Staňkov',
        date: '8\/14\/2014',
        price: '11 813 880',
    },
    {
        name: 'Město Chabařovice',
        lng: 13.93919,
        lat: 50.66799,
        desc: 'Snížení prašnosti ve městě Chabařovice',
        date: '3\/30\/2012',
        price: '3 642 818',
    },
    {
        name: 'obec Horní Maršov',
        lng: 15.82009,
        lat: 50.66087,
        desc: 'Snížení prašnosti v Horním Maršově',
        date: '3\/30\/2012',
        price: '2 374 299',
    },
    {
        name: 'Obec Jirny',
        lng: 14.69947,
        lat: 50.11531,
        desc: 'Snížení imisní zátěže v obci Jirny',
        date: '4\/16\/2012',
        price: '2 969 999',
    },
    {
        name: 'Technické služby Horní Slavkov s.r.o.',
        lng: 12.7998,
        lat: 50.13155,
        desc: 'Nákup technologie - snížení imisní zátěže v Horním Slavkově',
        date: '3\/28\/2012',
        price: '3 000 000',
    },
    {
        name: 'Obec Starovičky',
        lng: 16.76975,
        lat: 48.91191,
        desc: 'Čisté ovzduší v obci Starovičky',
        date: '3\/30\/2012',
        price: '5 040 000',
    },
    {
        name: 'TECHart systems, s.r.o.',
        lng: 14.97715,
        lat: 50.00106,
        desc: 'Tvorba nového SW řešení a aplikace',
        date: '3\/30\/2012',
        price: '2 021 500',
    },
    {
        name: 'USK, s.r.o.',
        lng: 14.89469,
        lat: 50.40472,
        desc: 'Čisté silniční komunikace',
        date: '3\/30\/2012',
        price: '2 376 666',
    },
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
const animationsAbout_1 = __webpack_require__(/*! ./animationsAbout */ "./Resources/Scripts/animationsAbout.ts");
document.addEventListener("DOMContentLoaded", function () {
    (0, navigation_1.initNav)();
    (0, animationsAbout_1.initAboutBox)();
    (0, map_1.initMap)();
});

})();

/******/ })()
;
//# sourceMappingURL=init.js.map