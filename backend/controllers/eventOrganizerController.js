import Service from '../models/Service.js';
import Quote from '../models/Quote.js';
import User from '../models/User.js';

// Get event organizer profile
export const getOrganizerProfile = async (req, res) => {
  try {
    const organizer = await User.findById(req.user._id)
      .select('-password')
      .populate('services');
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update event organizer profile
export const updateOrganizerProfile = async (req, res) => {
  try {
    const { name, email, phone, company, description } = req.body;
    const organizer = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        phone,
        company,
        description
      },
      { new: true }
    ).select('-password');
    
    res.json(organizer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get organizer's services
export const getOrganizerServices = async (req, res) => {
  try {
    const services = await Service.find({ organizer: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get organizer's quote requests
export const getOrganizerQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ service: { $in: req.user.services } })
      .populate('user', 'name email')
      .populate('service', 'name type')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quote status
export const updateQuoteStatus = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { status, response } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    // Check if the quote belongs to one of the organizer's services
    const service = await Service.findById(quote.service);
    if (service.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this quote' });
    }

    quote.status = status;
    quote.response = response;
    await quote.save();

    res.json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 