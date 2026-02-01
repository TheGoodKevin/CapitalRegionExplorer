# Capital Region Explorer 🗺️

An interactive progressive web app for discovering landmarks, events, and attractions across New York's Capital Region (Albany, Troy, and Schenectady).

![Capital Region Explorer](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react)
![Leaflet](https://img.shields.io/badge/Maps-Leaflet-199900?style=for-the-badge&logo=leaflet)

## 🎯 Features

### Core Functionality
- **Interactive Map** - Explore 30+ landmarks across Albany, Troy, and Schenectady with OpenStreetMap integration
- **Photo Galleries** - View multiple photos for each landmark with an intuitive carousel
- **Location Tracking** - See your current position on the map with automatic centering
- **Smart Filters** - Filter landmarks by city, type, and experience tags
- **Nearby Discovery** - Find landmarks within 3 miles of your location, sorted by distance
- **Saved Landmarks** - Star your favorite places for future reference with persistent local storage
- **Drop a Pin** - Click anywhere on the map to explore custom locations
- **Events Banner** - Stay updated with upcoming local events
- **Dark Mode** - Comfortable viewing at any time of day
- **Navigation Links** - Direct integration with Google Maps, Apple Maps, and Waze

### User Experience
- Clean, modern purple gradient design
- Smooth animations and transitions
- Mobile-responsive interface
- Comprehensive "How to Use" guide
- Progressive Web App (PWA) capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capital-region-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in your terminal)
   - Allow location permissions when prompted for the best experience

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📁 Project Structure

```
capital-region-explorer/
├── public/
│   └── photos/           # Landmark photos organized by city/landmark
│       ├── Albany/
│       ├── Troy/
│       └── Schenectady/
├── src/
│   ├── assets/
│   │   └── logo.jpg      # App logo
│   ├── components/
│   │   ├── MapView.jsx   # Main map component
│   │   └── MapView.css   # Styles
│   ├── data/
│   │   ├── Albany.json   # Albany landmarks data
│   │   ├── Troy.json     # Troy landmarks data
│   │   └── Schenectady.json  # Schenectady landmarks data
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## 🎮 How to Use

### Exploring the Map
- Click any blue marker to see landmark details with photos and information
- Drag the map to pan around the Capital Region
- Use zoom controls (+/-) on the left side

### Location Features
1. **Enable Location** - Click "Use my location" when prompted to see your position
2. **Recenter** - Click the ◎ button (bottom-right) to center the map on your location
3. **Nearby Tab** - View landmarks within 3 miles, sorted by distance

### Filtering & Saving
1. **Filters Tab** - Narrow results by city, type (Museum, Park, etc.), or experience (Family, Outdoors, Free, etc.)
2. **Star Button** - Click ⭐ to save landmarks for later
3. **Saved Tab** - Access all your starred landmarks in one place

### Pin Dropping
1. Click the 📍 button in the top-right corner to enter pin mode
2. Click anywhere on the map to drop a pin and explore that location
3. Click 📍 again to exit pin mode

### Dark Mode
- Toggle dark mode using the 🌙/☀️ icon in the menu drawer

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Leaflet** - Interactive mapping library
- **React-Leaflet** - React components for Leaflet
- **OpenStreetMap** - Map tiles and data
- **LocalStorage** - Persistent data storage

## 📊 Data Structure

Each landmark contains:
- Name and description
- GPS coordinates (latitude/longitude)
- Address
- City
- Type tag (Museum, Park, Historic, etc.)
- Experience tags (Family, Outdoors, Free, Educational, etc.)
- Website URL
- Up to 3 photos

## 🎨 Customization

### Adding New Landmarks
Edit the JSON files in `src/data/` following this structure:

```json
{
  "city": "CityName",
  "landmarks": [
    {
      "id": 1,
      "name": "Landmark Name",
      "typetag": "Museum",
      "experiencetag": ["Family", "Educational", "Indoors"],
      "description": "Description here",
      "address": "123 Main St, City, NY",
      "latitude": 42.1234,
      "longitude": -73.5678,
      "website": "https://example.com"
    }
  ]
}
```

### Adding Photos
Place photos in `public/photos/{City}/{Landmark Name}/`:
- `download.jpg` or `download.png`
- `images.jpg` or `images.png`
- `imagess.jpg` or `imagess.png`

## 🏆 Hackathon Highlights

- **User-Centric Design** - Built with real exploration needs in mind
- **Performance** - Fast loading with optimized photo carousel
- **Accessibility** - ARIA labels, keyboard navigation, and semantic HTML
- **Scalability** - Easy to add new landmarks and features
- **Innovation** - Combines location tracking, filtering, and pin dropping in one seamless experience

## 🤝 Contributing

This project was built for a hackathon. Contributions, suggestions, and feedback are welcome!

## 📝 License

This project is open source and available under the MIT License.

## 👥 Team

Created with ❤️ for the Capital Region by our hackathon team.

---

**Happy Exploring! 🗺️✨**

Albany

Schenectady

Designed to grow with the community.
