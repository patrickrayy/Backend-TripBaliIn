import Accommodation from "../models/accommodation.js";

export const getAllAccommodations = async (req, res) => {
   try {
        const accommodations = await Accommodation.findAll();
        const accommodationsWithImage = accommodations.map(accommodation => {
            return {
                ...accommodation.toJSON(),
                image: accommodation.image
                    ? `data:image/png;base64,${accommodation.image.toString('base64')}`
                    : null,
            };  
        });
        res.status(200).json(accommodationsWithImage);
    }catch(error){
        console.log('Error fetching datas: ', error);
    }
};

export const getAccommodationById = async (req, res) => {
    try {
      const { id } = req.params;
      const accommodation = await Accommodation.findByPk(id);
  
      if (!accommodation) {
        return res.status(404).json({ message: 'Accommodation not found' });
      }
  
      res.status(200).json(accommodation);
    } catch (error) {
      console.error('Error fetching accommodation:', error);
      res.status(500).json({ message: 'Failed to fetch accommodation', error: error.message });
    }
  };