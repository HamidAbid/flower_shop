import Service from '../models/Service.js';
import Quote from '../models/Quote.js';

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get service by type
export const getServiceByType = async (req, res) => {
  try {
    const { type } = req.params;
    const service = await Service.findOne({ type });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service (admin only)
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service (admin only)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service (admin only)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a quote request
export const submitQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    const savedQuote = await quote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all quotes (admin only)
export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate('service', 'name type')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quote status (admin only)
export const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const quote = await Quote.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    res.json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 