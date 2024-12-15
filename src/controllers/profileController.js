import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({message:'User not found'});

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            tanggal_lahir: user.tanggal_lahir,
            // password: user.password
        });
    }catch (error){
        res.status(500).json({message: 'Error fetching user profile'});
    }
};

export const updateProfile = async (req, res) => {
    const { id, email, location, name, password, phone, role, tanggal_lahir } = req.body;
  
    try {
      // Cek apakah email sudah digunakan oleh user lain
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash password jika diubah
      let hashedPassword = password;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      // Objek pembaruan
      const updateObject = {
        email,
        location,
        name,
        phone,
        role,
        tanggal_lahir,
      };
  
      // Tambahkan password jika ada
      if (password) {
        updateObject.password = hashedPassword;
      }
  
      // Update data di database
      const [updated] = await User.update(updateObject, { where: { id } });
  
      if (updated === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Ambil data terbaru dari database untuk respon
      const updatedUser = await User.findByPk(id, {
        attributes: ['name', 'email', 'phone', 'location', 'tanggal_lahir'],
      });
  
      res.json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  };
  