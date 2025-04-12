import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Get user data from the session
    const user = {
      id: session.user.id,
      role: session.user.role,
      email: session.user.email
    };

    // Check if user is approved
    const isApproved = await checkUserApproval(user.id);

    const response = {
      status: isApproved ? 'approved' : 'pending',
      role: user.role
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to check user approval
async function checkUserApproval(userId) {
  // In a real application, this would check your database
  // For now, we'll simulate with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate approval status
  return Math.random() > 0.5; // 50% chance of being approved
}