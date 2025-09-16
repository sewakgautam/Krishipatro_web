import cron from 'node-cron';

// Run daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  try {
    const response = await fetch('/api/scheduler/update-market-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SCHEDULER_SECRET}`,
      },
      body: JSON.stringify({ daysBack: 2 }),
    });
    console.log('Scheduled update:', await response.json());
  } catch (error) {
    console.error('Scheduled update failed:', error);
  }
});
