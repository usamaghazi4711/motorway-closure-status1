import express from 'express';
import Motorway from '../models/Motorway.js';

const router = express.Router();

// Get data by key
router.get('/:key', async (req, res) => {
  try {
    const data = await Motorway.findOne({ key: req.params.key });
    if (!data) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ key: data.key, value: data.value });
  } catch (error) {
    console.error('Get error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Set/Update data
router.post('/', async (req, res) => {
  try {
    const { key, value } = req.body;
    
    if (!key || !value) {
      return res.status(400).json({ error: 'Key and value are required' });
    }

    const data = await Motorway.findOneAndUpdate(
      { key },
      { key, value, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    
    res.json({ key: data.key, value: data.value });
  } catch (error) {
    console.error('Set error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete data
router.delete('/:key', async (req, res) => {
  try {
    const result = await Motorway.findOneAndDelete({ key: req.params.key });
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ deleted: true, key: req.params.key });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List keys
router.get('/', async (req, res) => {
  try {
    const prefix = req.query.prefix;
    const query = prefix ? { key: new RegExp(`^${prefix}`) } : {};
    const data = await Motorway.find(query).select('key -_id');
    res.json({ keys: data.map(d => d.key) });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
