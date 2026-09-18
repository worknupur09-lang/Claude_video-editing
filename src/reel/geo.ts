/**
 * Geography for the reel, in real [lng, lat] WGS84 pairs.
 *
 * ---------------------------------------------------------------------------
 * ACCURACY NOTE - READ BEFORE PUBLISHING
 * ---------------------------------------------------------------------------
 * These outlines are hand-authored approximations, drawn to be recognisable and
 * correctly positioned relative to each other. They are NOT survey data.
 *
 * Before this reel goes out, replace the two that carry editorial weight:
 *   - MARSA_AL_SAADIYAT  -> Aldar's published masterplan boundary
 *   - CULTURAL_DISTRICT  -> the official district boundary
 * and spot-check the five museum pins.
 *
 * Every shape below is a plain [lng, lat][] array, so swapping in real GeoJSON
 * coordinates is a copy-paste with no code changes.
 * ---------------------------------------------------------------------------
 */

export type LngLat = readonly [number, number];
export type Ring = readonly LngLat[];

/** Saadiyat Island. ~9.3km WSW-ENE, ~4.3km N-S, ~27 km2. */
export const SAADIYAT: Ring = [
  [54.384, 24.533],
  [54.387, 24.5432],
  [54.396, 24.5531],
  [54.408, 24.561],
  [54.4251, 24.566],
  [54.4423, 24.568],
  [54.458, 24.5651],
  [54.47, 24.558],
  [54.4761, 24.548],
  [54.47, 24.54],
  [54.4551, 24.535],
  [54.438, 24.532],
  [54.42, 24.53],
  [54.402, 24.5291],
  [54.391, 24.529],
];

/** The northern shoreline - "one beach". Traced as an open line, not a polygon. */
export const SAADIYAT_BEACH: Ring = [
  [54.396, 24.5531],
  [54.408, 24.561],
  [54.4251, 24.566],
  [54.4423, 24.568],
  [54.458, 24.5651],
  [54.47, 24.558],
];

/** Al Reem Island - the comparison in "why does it cost double Reem?". */
export const AL_REEM: Ring = [
  [54.3952, 24.5201],
  [54.4062, 24.5175],
  [54.4185, 24.5111],
  [54.4262, 24.5022],
  [54.4231, 24.4948],
  [54.4121, 24.4921],
  [54.4008, 24.4964],
  [54.3941, 24.5052],
  [54.392, 24.5142],
];

/** Abu Dhabi main island, simplified - gives the viewer their bearings. */
export const ABU_DHABI_MAIN: Ring = [
  [54.3721, 24.5182],
  [54.3862, 24.5121],
  [54.3901, 24.5002],
  [54.3855, 24.4861],
  [54.3712, 24.4701],
  [54.3521, 24.4602],
  [54.3301, 24.4578],
  [54.3142, 24.4651],
  [54.3081, 24.4802],
  [54.3162, 24.4952],
  [54.3352, 24.5082],
  [54.3541, 24.5161],
];

/** Yas Island, east - context only, never a subject. */
export const YAS: Ring = [
  [54.5852, 24.5081],
  [54.6021, 24.5062],
  [54.6152, 24.4972],
  [54.6181, 24.4841],
  [54.6062, 24.4742],
  [54.5892, 24.4731],
  [54.5781, 24.4821],
  [54.5762, 24.4961],
];

/** Small islets that keep the channel from reading as empty space. */
export const ISLETS: readonly Ring[] = [
  [
    [54.4412, 24.5221],
    [54.4502, 24.5211],
    [54.4531, 24.5152],
    [54.4452, 24.5122],
    [54.4392, 24.5161],
  ],
  [
    [54.5012, 24.5262],
    [54.5142, 24.5241],
    [54.5171, 24.5172],
    [54.5051, 24.5151],
    [54.4982, 24.5201],
  ],
];

/** The southwest corner - "because of this corner". */
export const CULTURAL_DISTRICT: Ring = [
  [54.3841, 24.5331],
  [54.3871, 24.5432],
  [54.3962, 24.5452],
  [54.4021, 24.5411],
  [54.4012, 24.5331],
  [54.3941, 24.5291],
  [54.3891, 24.5292],
];

/**
 * Marsa Al Saadiyat. PLACEHOLDER FOOTPRINT.
 * Positioned on the northern stretch because the script says "now look north".
 * Replace with Aldar's published boundary before publishing.
 */
export const MARSA_AL_SAADIYAT: Ring = [
  [54.4351, 24.5642],
  [54.4512, 24.5671],
  [54.4661, 24.5631],
  [54.4741, 24.5551],
  [54.4702, 24.5471],
  [54.4551, 24.5452],
  [54.4401, 24.5501],
  [54.4341, 24.5571],
];

/** The marina basin inside Marsa - camera target for "350 berths". */
export const MARSA_MARINA: Ring = [
  [54.4562, 24.5602],
  [54.4651, 24.5612],
  [54.4702, 24.5571],
  [54.4671, 24.5522],
  [54.4581, 24.5518],
  [54.4541, 24.5561],
];

/** Residential parcels that light up one by one for "58,000 residents". */
export const MARSA_PARCELS: readonly Ring[] = [
  [
    [54.4392, 24.5601],
    [54.4452, 24.5612],
    [54.4472, 24.5572],
    [54.4412, 24.5561],
  ],
  [
    [54.4482, 24.5622],
    [54.4551, 24.5634],
    [54.4571, 24.5592],
    [54.4502, 24.5581],
  ],
  [
    [54.4432, 24.5541],
    [54.4501, 24.5552],
    [54.4521, 24.5512],
    [54.4452, 24.5501],
  ],
  [
    [54.4581, 24.5641],
    [54.4651, 24.5648],
    [54.4668, 24.5606],
    [54.4598, 24.5598],
  ],
  [
    [54.4531, 24.5482],
    [54.4601, 24.5492],
    [54.4618, 24.5458],
    [54.4548, 24.5448],
  ],
];

export type Poi = {
  id: string;
  label: string;
  meta: string;
  at: LngLat;
};

/** The five museums, west to east across the Cultural District. */
export const MUSEUMS: readonly Poi[] = [
  {
    id: "guggenheim",
    label: "Guggenheim Abu Dhabi",
    meta: "11 Dec 2025",
    at: [54.388, 24.5345],
  },
  {
    id: "nhm",
    label: "Natural History Museum",
    meta: "Nov 2025",
    at: [54.3905, 24.539],
  },
  {
    id: "teamlab",
    label: "teamLab Phenomena",
    meta: "Apr 2025",
    at: [54.3935, 24.5365],
  },
  {
    id: "zayed",
    label: "Zayed National Museum",
    meta: "Dec 2025",
    at: [54.3945, 24.5405],
  },
  {
    id: "louvre",
    label: "Louvre Abu Dhabi",
    meta: "2017",
    at: [54.398, 24.5335],
  },
];

/** Marsa amenities. Minimal map symbols, never illustrative icons. */
export const MARSA_AMENITIES: readonly (Poi & { kind: "hotel" | "school" | "rail" })[] = [
  { id: "hotel-1", kind: "hotel", label: "Hotel", meta: "", at: [54.4612, 24.5588] },
  { id: "hotel-2", kind: "hotel", label: "Hotel", meta: "", at: [54.4535, 24.5628] },
  { id: "school-1", kind: "school", label: "School", meta: "", at: [54.4422, 24.5585] },
  { id: "school-2", kind: "school", label: "School", meta: "", at: [54.4488, 24.5545] },
  { id: "school-3", kind: "school", label: "School", meta: "", at: [54.4572, 24.5512] },
  { id: "rail", kind: "rail", label: "Etihad Rail", meta: "", at: [54.4402, 24.5468] },
];

/** Etihad Rail alignment running in from the southwest to the Marsa station. */
export const RAIL_LINE: Ring = [
  [54.4021, 24.5352],
  [54.4142, 24.5391],
  [54.4262, 24.5428],
  [54.4402, 24.5468],
];

export const LABELS: readonly Poi[] = [
  { id: "saadiyat", label: "SAADIYAT ISLAND", meta: "", at: [54.428, 24.5495] },
  { id: "reem", label: "AL REEM", meta: "", at: [54.4092, 24.5062] },
  { id: "abudhabi", label: "ABU DHABI", meta: "", at: [54.3501, 24.4821] },
  { id: "yas", label: "YAS", meta: "", at: [54.5971, 24.4901] },
];
