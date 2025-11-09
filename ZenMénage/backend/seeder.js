const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Family = require('./models/Family');
const Task = require('./models/Task');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zenmenage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    name: 'Thomas Bernard',
    email: 'thomas@example.com',
    password: 'password123',
    role: 'member'
  },
  {
    name: 'Emma Laurent',
    email: 'emma@example.com',
    password: 'password123',
    role: 'member'
  },
  {
    name: 'Lucas Petit',
    email: 'lucas@example.com',
    password: 'password123',
    role: 'member'
  }
];

const families = [
  {
    name: 'Famille Martin',
  }
];

const tasks = [
  {
    title: 'Passer l\'aspirateur',
    room: 'Salon',
    priority: 'high',
    status: 'todo'
  },
  {
    title: 'Nettoyer la salle de bain',
    room: 'Salle de bain',
    priority: 'medium',
    status: 'completed'
  },
  {
    title: 'Sortir les poubelles',
    room: 'Cuisine',
    priority: 'high',
    status: 'todo'
  },
  {
    title: 'Faire la vaisselle',
    room: 'Cuisine',
    priority: 'medium',
    status: 'todo'
  },
  {
    title: 'Ranger la chambre',
    room: 'Chambre',
    priority: 'low',
    status: 'completed'
  }
];

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Family.deleteMany();
    await Task.deleteMany();
    
    console.log('Existing data cleared');
    
    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Users created:', createdUsers.length);
    
    // Create family
    const familyData = {
      ...families[0],
      createdBy: createdUsers[0]._id,
      members: createdUsers.map(user => user._id)
    };
    
    const createdFamily = await Family.create(familyData);
    console.log('Family created:', createdFamily.name);
    
    // Update users with family reference
    await User.updateMany(
      { _id: { $in: createdUsers.map(user => user._id) } },
      { family: createdFamily._id }
    );
    
    // Create tasks
    const tasksWithRefs = tasks.map(task => ({
      ...task,
      assignedTo: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
      family: createdFamily._id,
      createdBy: createdUsers[0]._id
    }));
    
    const createdTasks = await Task.insertMany(tasksWithRefs);
    console.log('Tasks created:', createdTasks.length);
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedData();