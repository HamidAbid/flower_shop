import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      shippingCharges
    } = req.body;

    if (items && items.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    // Verify product stock and calculate prices
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ message: `Product not found: ${item.product}` });
        return;
      }
      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        return;
      }
      item.price = product.price;
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      shippingCharges: shippingCharges || 0
    });

    const createdOrder = await order.save();

    // Update product stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      if (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
        res.json(order);
      } else {
        res.status(401).json({ message: 'Not authorized' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';

      // Add tracking event for delivery
      order.trackingEvents.push({
        date: new Date(),
        description: 'Order has been delivered',
        location: req.body.location || 'Destination'
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order status to processing
// @route   PUT /api/orders/:id/process
// @access  Private/Admin
export const updateOrderToProcessing = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = 'processing';
      order.processingDate = Date.now();

      // Add tracking event
      order.trackingEvents.push({
        date: new Date(),
        description: 'Order is being processed',
        location: 'Processing Center'
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order status to shipped
// @route   PUT /api/orders/:id/ship
// @access  Private/Admin
export const updateOrderToShipped = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (!req.body.trackingNumber) {
        return res.status(400).json({ message: 'Tracking number is required' });
      }

      order.status = 'shipped';
      order.shippedDate = Date.now();
      order.trackingNumber = req.body.trackingNumber;
      
      // Set estimated delivery date (default to 3 days from now)
      const estimatedDays = req.body.estimatedDays || 3;
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);
      order.estimatedDelivery = estimatedDate;

      // Add tracking event
      order.trackingEvents.push({
        date: new Date(),
        description: 'Order has been shipped',
        location: req.body.location || 'Shipping Center'
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add tracking event to order
// @route   POST /api/orders/:id/tracking
// @access  Private/Admin
export const addTrackingEvent = async (req, res) => {
  try {
    const { description, location } = req.body;
    
    if (!description) {
      return res.status(400).json({ message: 'Description is required for tracking event' });
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      order.trackingEvents.push({
        date: new Date(),
        description,
        location: location || ''
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Track order by ID or tracking number
// @route   GET /api/orders/track/:identifier
// @access  Public
export const trackOrder = async (req, res) => {
  try {
    const { identifier } = req.params;
    let order;

    // Check if identifier is a valid MongoDB ID
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(identifier);
    }

    // If not found by ID, try to find by tracking number
    if (!order) {
      order = await Order.findOne({ trackingNumber: identifier });
    }

    if (order) {
      // Return limited information for public tracking
      const trackingInfo = {
        orderId: order._id,
        status: order.status,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt,
        processingDate: order.processingDate,
        shippedDate: order.shippedDate,
        deliveredAt: order.deliveredAt,
        estimatedDelivery: order.estimatedDelivery,
        trackingEvents: order.trackingEvents
      };
      
      res.json(trackingInfo);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 