const axios = require('axios');

const API_BASE = 'http://localhost:3000/api/v1';
const ADMIN_TOKEN = 'YOUR_ADMIN_TOKEN_HERE'; // Replace with actual admin token

const sampleElements = [
  {
    imageUrl: 'https://via.placeholder.com/64x64/228B22/FFFFFF?text=Tree',
    width: 64,
    height: 64,
    static: true
  },
  {
    imageUrl: 'https://via.placeholder.com/64x64/8B4513/FFFFFF?text=Rock',
    width: 64,
    height: 64,
    static: true
  },
  {
    imageUrl: 'https://via.placeholder.com/64x64/4682B4/FFFFFF?text=Water',
    width: 64,
    height: 64,
    static: true
  },
  {
    imageUrl: 'https://via.placeholder.com/64x64/FFD700/FFFFFF?text=Gold',
    width: 64,
    height: 64,
    static: false
  },
  {
    imageUrl: 'https://via.placeholder.com/64x64/FF6347/FFFFFF?text=Fire',
    width: 64,
    height: 64,
    static: true
  }
];

const sampleMaps = [
  {
    name: 'Forest Clearing',
    thumbnail: 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Forest',
    dimensions: '1024x768',
    defaultElements: [
      { elementId: '', x: 100, y: 100 }, // Will be filled with actual element IDs
      { elementId: '', x: 200, y: 150 },
      { elementId: '', x: 300, y: 200 },
      { elementId: '', x: 400, y: 250 }
    ]
  },
  {
    name: 'Mountain Pass',
    thumbnail: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Mountain',
    dimensions: '1280x720',
    defaultElements: [
      { elementId: '', x: 150, y: 100 },
      { elementId: '', x: 250, y: 150 },
      { elementId: '', x: 350, y: 200 },
      { elementId: '', x: 450, y: 250 },
      { elementId: '', x: 550, y: 300 }
    ]
  }
];

async function createElement(elementData) {
  try {
    const response = await axios.post(`${API_BASE}/admin/element`, elementData, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Created element: ${elementData.imageUrl.split('text=')[1]}`);
    return response.data.id;
  } catch (error) {
    console.error(`❌ Failed to create element: ${elementData.imageUrl.split('text=')[1]}`, error.response?.data || error.message);
    return null;
  }
}

async function createMap(mapData, elementIds) {
  try {
    // Replace placeholder element IDs with actual IDs
    const mapWithElements = {
      ...mapData,
      defaultElements: mapData.defaultElements.map((elem, index) => ({
        ...elem,
        elementId: elementIds[index % elementIds.length] // Cycle through available elements
      }))
    };

    const response = await axios.post(`${API_BASE}/admin/map`, mapWithElements, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Created map: ${mapData.name}`);
    return response.data.id;
  } catch (error) {
    console.error(`❌ Failed to create map: ${mapData.name}`, error.response?.data || error.message);
    return null;
  }
}

async function seedData() {
  console.log('🌱 Starting data seeding...\n');

  // Step 1: Create elements
  console.log('📦 Creating elements...');
  const elementIds = [];
  for (const element of sampleElements) {
    const elementId = await createElement(element);
    if (elementId) {
      elementIds.push(elementId);
    }
  }

  if (elementIds.length === 0) {
    console.error('❌ No elements were created. Cannot proceed with maps.');
    return;
  }

  console.log(`\n✅ Created ${elementIds.length} elements\n`);

  // Step 2: Create maps
  console.log('🗺️ Creating maps...');
  for (const map of sampleMaps) {
    await createMap(map, elementIds);
  }

  console.log('\n🎉 Data seeding completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Visit http://localhost:3001/admin to manage your content');
  console.log('2. Create a user account and log in');
  console.log('3. Create spaces using the maps you just created');
}

// Check if admin token is set
if (ADMIN_TOKEN === 'YOUR_ADMIN_TOKEN_HERE') {
  console.error('❌ Please set your admin token in the script first!');
  console.log('\nTo get an admin token:');
  console.log('1. Create an admin user: POST /api/v1/signup with type: "admin"');
  console.log('2. Sign in: POST /api/v1/signin');
  console.log('3. Copy the token from the response');
  console.log('4. Update the ADMIN_TOKEN variable in this script');
} else {
  seedData().catch(console.error);
} 