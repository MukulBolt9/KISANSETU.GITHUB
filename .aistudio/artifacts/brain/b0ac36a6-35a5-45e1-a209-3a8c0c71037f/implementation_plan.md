# KisanSetu AI: India-Wide Stats, State-Locked Maps & Quota Resilience

This update introduces a dedicated "India Stats" dashboard with national commodity averages, enhanced map controls that strictly lock the viewport to the selected Indian state, and a robust "Zero-Failure" data strategy to handle Gemini API quota limits (Error 429).

## User Review & Critical Decisions

> [!IMPORTANT]
> **Quota Resilience**: To address the `429 RESOURCE_EXHAUSTED` errors, the app will transition from "Live-Every-Time" fetching to a **Stale-While-Revalidate** caching model. National averages and district stores will be cached for 24 hours, significantly reducing API hits.

- **Confirmed: India Stats Tab**: A new primary navigation tab for national statistics.
- **Confirmed: Map Locking**: The map will strictly prevent users from scrolling outside state boundaries (e.g., locking to Maharashtra only) when a state is selected.
- **Confirmed: Categorized Items**: Commodities (Bhindi, Garlic, Onion, etc.) will be grouped by category and sorted alphabetically.
- **Confirmed: Real Data Fallbacks**: When API limits are reached, the app will serve realistic "Standard Indian Averages" from a local data sheet instead of showing error logs.

## 1. Overview & Core Concept

### What It Does
- **National Intelligence**: Provides a "big picture" view of agricultural prices across India, helping farmers understand if their local mandi rate is above or below the national average.
- **Hyper-Local Focus**: Maps that stay centered on the farmer's selected state, removing international or irrelevant regional clutter.
- **Always-On Reliability**: Ensures the app remains functional even during high-traffic periods or API outages.

### Key Value
Farmers gain a broader market perspective while the app remains lightning-fast and reliable under any network or quota conditions.

## 2. User Experience & Visual Design

### Key User Flows
1. **National Trend Watch**: User taps the new "India Stats" tab to see a categorized list of commodities (e.g., "Vegetables" -> "Bhindi").
2. **State Lockdown**: User selects "Punjab" from the location modal. The Map tab automatically updates its bounds to Punjab and disables panning outside its borders.
3. **Resilient Browsing**: If Gemini hits a quota limit, a small "Offline/Cached Data" indicator appears, but prices and store listings continue to display correctly using fallback datasets.

### Visual Identity & Theme
- **Tab Layout**: Uses a clean vertical accordion or sectioned list for categories.
- **Map UI**: Clear visual boundary indicators at the edge of the locked state.
- **Data Status**: Subtle badges (e.g., "Live" vs "Verified Benchmark") to communicate data freshness.

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Server-Side Caching (FS-Cache)
- *Chosen Approach*: Implement a simple file-based cache in `server.ts` for `/api/gemini/india-stats` and `/api/gemini/stores`.
- *Why*: Daily updates were requested, but a 429 error breaks the UI. Caching once per 24 hours solves both.

### Decision 2: Static Benchmark Data Sheet
- *Chosen Approach*: Create `src/utils/mandiAverages.ts` containing baseline prices for all items in the Kaggle dataset.
- *Why*: Provides an immediate "Offline First" experience and a reliable fallback for the "India Average" feature.

## 4. Technical Architecture & Data Strategy

```drawio
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                   │
├─────────────────────────────────────────────────────────┤
│  ┌────────────┐   ┌─────────────┐   ┌────────────────┐  │
│  │ Voice Tab  │   │ Budget Tab  │   │ India Stats Tab│  │
│  └────────────┘   └─────────────┘   └────────────────┘  │
│          ▲               ▲                  ▲           │
└──────────┼───────────────┼──────────────────┼───────────┘
           │               │                  │
┌──────────▼───────────────▼──────────────────▼───────────┐
│                      Express Server                     │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────┐  ┌───────────────────────┐  │
│  │ Cache Manager (24h)    │  │ Fallback Data Engine  │  │
│  └────────────────────────┘  └───────────────────────┘  │
│              │                          │               │
│              ▼                          ▼               │
│      ┌────────────────┐         ┌────────────────┐      │
│      │ Gemini 3.8     │         │ Static Bench-  │      │
│      │ Grounding API  │         │ mark Sheets    │      │
│      └────────────────┘         └────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

### Data Model & State
- **State Boundaries**: `LatLngBounds` dictionary in `src/utils/indianDistricts.ts`.
- **Categorized Items**: Static index of 60+ commodities (Bhindi, Garlic, etc.) mapped to categories.

### Key Sequences
- **Daily Grounding**: The server attempts a fresh grounding call daily. If successful, the cache is updated. If a 429 is returned, the server silently returns the previous day's cached data or the static benchmark.
