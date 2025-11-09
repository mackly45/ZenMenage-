const Task = require('../models/Task');
const User = require('../models/User');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const familyId = req.user.family;
    
    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    // Get this week's date range
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    // Today's tasks
    const todayTasks = await Task.countDocuments({
      family: familyId,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    
    const todayCompletedTasks = await Task.countDocuments({
      family: familyId,
      status: 'completed',
      completedAt: { $gte: startOfDay, $lte: endOfDay }
    });
    
    // This week's tasks
    const weekTasks = await Task.countDocuments({
      family: familyId,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    });
    
    const weekCompletedTasks = await Task.countDocuments({
      family: familyId,
      status: 'completed',
      completedAt: { $gte: startOfWeek, $lte: endOfWeek }
    });
    
    // Overall tasks
    const totalTasks = await Task.countDocuments({ family: familyId });
    const completedTasks = await Task.countDocuments({ 
      family: familyId, 
      status: 'completed' 
    });
    
    // Calculate percentages
    const todayPercentage = todayTasks > 0 ? Math.round((todayCompletedTasks / todayTasks) * 100) : 0;
    const weekPercentage = weekTasks > 0 ? Math.round((weekCompletedTasks / weekTasks) * 100) : 0;
    const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Get tasks by room
    const tasksByRoom = await Task.aggregate([
      { $match: { family: familyId } },
      { $group: { 
          _id: '$room', 
          count: { $sum: 1 },
          completed: { 
            $sum: { 
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] 
            } 
          }
        } 
      }
    ]);
    
    // Get tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { family: familyId } },
      { $group: { 
          _id: '$priority', 
          count: { $sum: 1 }
        } 
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        today: {
          total: todayTasks,
          completed: todayCompletedTasks,
          percentage: todayPercentage
        },
        week: {
          total: weekTasks,
          completed: weekCompletedTasks,
          percentage: weekPercentage
        },
        overall: {
          total: totalTasks,
          completed: completedTasks,
          percentage: overallPercentage
        },
        byRoom: tasksByRoom,
        byPriority: tasksByPriority
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get weekly task completion data
exports.getWeeklyStats = async (req, res) => {
  try {
    const familyId = req.user.family;
    
    // Get data for the last 7 days
    const dates = [];
    const completedTasks = [];
    const createdTasks = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      dates.push(startOfDay.toISOString().split('T')[0]);
      
      const createdCount = await Task.countDocuments({
        family: familyId,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      
      const completedCount = await Task.countDocuments({
        family: familyId,
        status: 'completed',
        completedAt: { $gte: startOfDay, $lte: endOfDay }
      });
      
      createdTasks.push(createdCount);
      completedTasks.push(completedCount);
    }
    
    res.status(200).json({
      success: true,
      data: {
        dates,
        createdTasks,
        completedTasks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};