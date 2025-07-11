import { useState } from 'react';

const ProfileSection = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    street: profile?.address?.street || '',
    city: profile?.address?.city || '',
    state: profile?.address?.state || '',
    zipCode: profile?.address?.zipCode || '',
    country: profile?.address?.country || ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle address field changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Format data for API
      const profileData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };
      
      const result = await onUpdate(profileData);
      
      if (result.success) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setIsEditing(false);
      } else {
        setMessage({ text: result.message || 'Failed to update profile', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      // Reset form if canceling edit
      setFormData({
        name: profile?.name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        street: profile?.address?.street || '',
        city: profile?.address?.city || '',
        state: profile?.address?.state || '',
        zipCode: profile?.address?.zipCode || '',
        country: profile?.address?.country || ''
      });
    }
    setIsEditing(!isEditing);
    setMessage({ text: '', type: '' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <button
          onClick={toggleEdit}
          className={`px-4 py-2 rounded ${
            isEditing 
              ? 'bg-gray-300 hover:bg-gray-400' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
          disabled={loading}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      {message.text && (
        <div className={`p-3 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">ZIP/Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <h3 className="text-sm text-gray-500">Name</h3>
            <p className="font-medium">{profile?.name || 'Not set'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500">Email</h3>
            <p className="font-medium">{profile?.email || 'Not set'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500">Phone</h3>
            <p className="font-medium">{profile?.phone || 'Not set'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500">Address</h3>
            {profile?.address?.street ? (
              <div>
                <p className="font-medium">{profile.address.street}</p>
                <p className="font-medium">
                  {profile.address.city}{profile.address.city && profile.address.state ? ', ' : ''}{profile.address.state} {profile.address.zipCode}
                </p>
                <p className="font-medium">{profile.address.country}</p>
              </div>
            ) : (
              <p className="font-medium">Not set</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection; 